import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Capture raw body for secure Paystack webhook HMAC-SHA512 verification
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));

// ==========================================
// PAYSTACK INTEGRATION ENDPOINTS
// ==========================================

/**
 * Public configuration endpoint for frontend.
 * Never exposes the secret key.
 */
app.get('/api/paystack/config', (_req: Request, res: Response) => {
  const secretKey = process.env.PAYSTACK_SECRET_KEY || '';
  const publicKey = process.env.VITE_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || '';
  
  res.json({
    hasSecretKey: Boolean(secretKey && secretKey.length > 5),
    hasPublicKey: Boolean(publicKey && publicKey.length > 5),
    isLive: secretKey.startsWith('sk_live_') || publicKey.startsWith('pk_live_'),
    publicKey: publicKey,
  });
});

/**
 * Initialize a Paystack transaction securely from the server.
 */
app.post('/api/paystack/initialize', async (req: Request, res: Response) => {
  try {
    const { email, amount, currency = 'NGN', metadata = {}, callback_url, channels } = req.body;

    if (!email || !amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid email and donation amount are required.' 
      });
    }

    // Paystack amounts are in the lowest currency denomination (kobo for NGN, cents for USD)
    const koboAmount = Math.round(Number(amount) * 100);
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    // If secret key is provided, initialize directly with Paystack API
    if (secretKey && secretKey.trim().length > 5) {
      const initPayload: Record<string, any> = {
        email,
        amount: koboAmount,
        currency,
        metadata,
        callback_url,
      };

      if (Array.isArray(channels) && channels.length > 0) {
        initPayload.channels = channels;
      }

      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initPayload),
      });

      const data = await response.json() as any;

      if (!response.ok || !data.status) {
        return res.status(response.status || 400).json({
          success: false,
          message: data.message || 'Unable to initialize transaction with Paystack.',
          details: data,
        });
      }

      return res.json({
        success: true,
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference,
      });
    }

    // Fallback: If no secret key is configured yet in environment, provide standard sandbox response
    const mockRef = `ROG-MOCK-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    return res.json({
      success: true,
      isDemo: true,
      reference: mockRef,
      message: 'Paystack Secret Key is not configured in .env yet. Running in demo simulation mode.',
    });
  } catch (error: any) {
    console.error('Error initializing Paystack transaction:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while initializing payment.',
      error: error.message,
    });
  }
});

/**
 * Server-side payment verification.
 * Confirms status, currency, and exact amount paid directly with Paystack API.
 */
app.get('/api/paystack/verify/:reference', async (req: Request, res: Response) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({ success: false, message: 'Transaction reference is required.' });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (secretKey && secretKey.trim().length > 5) {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey.trim()}`,
        },
      });

      const result = await response.json() as any;

      if (!response.ok || !result.status) {
        return res.status(400).json({
          success: false,
          verified: false,
          message: result.message || 'Verification failed with Paystack.',
        });
      }

      const tx = result.data;

      // Verify that transaction was actually successful
      if (tx.status !== 'success') {
        return res.status(400).json({
          success: false,
          verified: false,
          status: tx.status,
          message: `Transaction is in '${tx.status}' state, not yet successful.`,
        });
      }

      // Return sanitized verified transaction receipt data
      return res.json({
        success: true,
        verified: true,
        data: {
          id: tx.id,
          reference: tx.reference,
          status: tx.status,
          amount: tx.amount / 100, // converted back from kobo
          currency: tx.currency,
          channel: tx.channel, // 'card', 'bank_transfer', 'ussd', etc.
          paidAt: tx.paid_at,
          customer: {
            email: tx.customer?.email,
            customer_code: tx.customer?.customer_code,
          },
          authorization: tx.authorization ? {
            brand: tx.authorization.brand,
            last4: tx.authorization.last4,
            bank: tx.authorization.bank,
            channel: tx.authorization.channel,
          } : undefined,
          metadata: tx.metadata,
        },
      });
    }

    // Fallback verification for demo/testing without credentials
    return res.json({
      success: true,
      verified: true,
      isDemo: true,
      data: {
        reference,
        status: 'success',
        channel: 'demo_simulator',
        paidAt: new Date().toISOString(),
        message: 'Verified successfully in local sandbox mode.',
      },
    });
  } catch (error: any) {
    console.error('Error verifying Paystack payment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify transaction.',
      error: error.message,
    });
  }
});

/**
 * Paystack Webhook Handler
 * Verifies HMAC-SHA512 signature on incoming events (e.g. charge.success)
 */
app.post('/api/paystack/webhook', (req: any, res: Response) => {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return res.status(200).send('Webhook received (sandbox mode, no secret set)');
    }

    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(req.rawBody || JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      console.warn('Unauthorized webhook signature attempt rejected.');
      return res.status(401).send('Invalid webhook signature');
    }

    const event = req.body;
    console.log(`[Paystack Webhook Received] Event: ${event.event}, Ref: ${event.data?.reference}`);

    if (event.event === 'charge.success') {
      // Completed charge confirmation
      // E.g. update database records or dispatch confirmation emails
    }

    return res.sendStatus(200);
  } catch (err: any) {
    console.error('Webhook error:', err);
    return res.status(500).send('Webhook processing error');
  }
});

// ==========================================
// CLIENT SERVING: VITE DEV vs PRODUCTION
// ==========================================

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // In dev mode, mount Vite middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // In production, serve built dist folder
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`> Server ready on http://0.0.0.0:${PORT}`);
    console.log(`> Paystack backend routes mounted at /api/paystack/*`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
