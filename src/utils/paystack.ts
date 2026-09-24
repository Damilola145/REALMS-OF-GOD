/**
 * Paystack Integration Helper for Realms of God Ministry
 * Secure client-side wrapper communicating exclusively through backend proxy endpoints.
 */

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number; // in kobo or lowest denomination
        currency?: string;
        ref?: string;
        metadata?: Record<string, any>;
        channels?: string[];
        callback: (response: { reference: string; status?: string; message?: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export interface PaystackConfig {
  hasSecretKey: boolean;
  hasPublicKey: boolean;
  isLive: boolean;
  publicKey: string;
}

export interface VerifiedPaystackPayment {
  reference: string;
  amount: number;
  currency: string;
  channel: string;
  paidAt: string;
  status: string;
  customer?: {
    email: string;
  };
  authorization?: {
    brand?: string;
    last4?: string;
    bank?: string;
  };
  isDemo?: boolean;
}

/**
 * Fetch public configuration and status from backend
 */
export async function getPaystackConfig(): Promise<PaystackConfig> {
  try {
    const res = await fetch('/api/paystack/config');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Unable to load Paystack config from server:', err);
  }

  // Fallback defaults
  const clientKey = (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || '';
  return {
    hasSecretKey: false,
    hasPublicKey: Boolean(clientKey),
    isLive: clientKey.startsWith('pk_live_'),
    publicKey: clientKey,
  };
}

/**
 * Initialize payment session with the backend server
 */
export async function initializePaystackPayment(params: {
  email: string;
  amount: number; // In Naira or USD
  currency: 'NGN' | 'USD';
  metadata?: Record<string, any>;
  channels?: string[];
}): Promise<{
  success: boolean;
  reference: string;
  authorization_url?: string;
  access_code?: string;
  isDemo?: boolean;
  message?: string;
}> {
  const res = await fetch('/api/paystack/initialize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: params.email,
      amount: params.amount,
      currency: params.currency,
      metadata: params.metadata,
      channels: params.channels,
      callback_url: window.location.origin,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to initialize Paystack payment');
  }

  return data;
}

/**
 * Verify payment reference with the backend server
 */
export async function verifyPaystackPayment(reference: string): Promise<VerifiedPaystackPayment> {
  const res = await fetch(`/api/paystack/verify/${encodeURIComponent(reference)}`);
  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || 'Transaction could not be verified by payment gateway.');
  }

  return result.data;
}

/**
 * Open Paystack Inline Checkout modal if available, with smooth fallback
 */
export async function openPaystackInlineCheckout(params: {
  email: string;
  amount: number;
  currency: 'NGN' | 'USD';
  metadata?: Record<string, any>;
  channels?: string[];
  onSuccess: (verifiedData: VerifiedPaystackPayment) => void;
  onError: (error: string) => void;
  onClose?: () => void;
}) {
  try {
    // 1. Fetch server config to obtain public key or server status
    const config = await getPaystackConfig();
    const effectivePublicKey = config.publicKey || (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY;

    // 2. Initialize transaction on server to generate verified reference
    const initResponse = await initializePaystackPayment({
      email: params.email,
      amount: params.amount,
      currency: params.currency,
      metadata: params.metadata,
      channels: params.channels,
    });

    const reference = initResponse.reference;

    // If client Paystack library is available and public key is provided, launch official popup
    if (typeof window !== 'undefined' && window.PaystackPop && effectivePublicKey) {
      const handler = window.PaystackPop.setup({
        key: effectivePublicKey,
        email: params.email,
        amount: Math.round(params.amount * 100),
        currency: params.currency,
        ref: reference,
        metadata: params.metadata,
        channels: params.channels || ['card', 'bank_transfer', 'bank', 'ussd', 'qr', 'mobile_money'],
        callback: function (response: { reference: string }) {
          verifyPaystackPayment(response.reference)
            .then(function (verified) {
              params.onSuccess(verified);
            })
            .catch(function (err: any) {
              params.onError(err?.message || 'Payment verification failed.');
            });
        },
        onClose: function () {
          if (typeof params.onClose === 'function') {
            params.onClose();
          }
        },
      });

      handler.openIframe();
      return;
    }

    // If authorization_url is returned from server (standard redirect checkout), open it
    if (initResponse.authorization_url) {
      window.location.href = initResponse.authorization_url;
      return;
    }

    // If running in sandbox simulator mode (no live keys supplied yet), simulate secure round-trip verification
    const verified = await verifyPaystackPayment(reference);
    params.onSuccess(verified);
  } catch (err: any) {
    params.onError(err.message || 'Payment failed to initiate.');
  }
}
