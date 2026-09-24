export interface NigerianBank {
  id: string;
  name: string;
  ussdPrefix: string; // e.g. *737#
  ussdFormat: (amount: number, account: string) => string;
  code: string;
  type: 'commercial' | 'fintech';
  logoColor: string;
}

export const NIGERIAN_BANKS: NigerianBank[] = [
  {
    id: 'gtbank',
    name: 'Guaranty Trust Bank (GTBank)',
    ussdPrefix: '*737#',
    ussdFormat: (amt, acc) => `*737*2*${amt}*${acc}#`,
    code: '058',
    type: 'commercial',
    logoColor: 'bg-orange-600'
  },
  {
    id: 'zenith',
    name: 'Zenith Bank',
    ussdPrefix: '*966#',
    ussdFormat: (amt, acc) => `*966*6*${amt}*${acc}#`,
    code: '057',
    type: 'commercial',
    logoColor: 'bg-red-600'
  },
  {
    id: 'access',
    name: 'Access Bank',
    ussdPrefix: '*901#',
    ussdFormat: (amt, acc) => `*901*0*${amt}*${acc}#`,
    code: '044',
    type: 'commercial',
    logoColor: 'bg-orange-500'
  },
  {
    id: 'firstbank',
    name: 'First Bank of Nigeria',
    ussdPrefix: '*894#',
    ussdFormat: (amt, acc) => `*894*${amt}*${acc}#`,
    code: '011',
    type: 'commercial',
    logoColor: 'bg-blue-800'
  },
  {
    id: 'uba',
    name: 'United Bank for Africa (UBA)',
    ussdPrefix: '*919#',
    ussdFormat: (amt, acc) => `*919*4*${amt}*${acc}#`,
    code: '033',
    type: 'commercial',
    logoColor: 'bg-red-700'
  },
  {
    id: 'stanbic',
    name: 'Stanbic IBTC Bank',
    ussdPrefix: '*909#',
    ussdFormat: (amt, acc) => `*909*11*${amt}*${acc}#`,
    code: '221',
    type: 'commercial',
    logoColor: 'bg-blue-600'
  },
  {
    id: 'fcmb',
    name: 'First City Monument Bank (FCMB)',
    ussdPrefix: '*329#',
    ussdFormat: (amt, acc) => `*329*${amt}*${acc}#`,
    code: '214',
    type: 'commercial',
    logoColor: 'bg-purple-700'
  },
  {
    id: 'fidelity',
    name: 'Fidelity Bank',
    ussdPrefix: '*770#',
    ussdFormat: (amt, acc) => `*770*${acc}*${amt}#`,
    code: '070',
    type: 'commercial',
    logoColor: 'bg-green-700'
  },
  {
    id: 'wema',
    name: 'Wema Bank / ALAT',
    ussdPrefix: '*945#',
    ussdFormat: (amt, acc) => `*945*${acc}*${amt}#`,
    code: '035',
    type: 'commercial',
    logoColor: 'bg-purple-900'
  },
  {
    id: 'opay',
    name: 'OPay Digital Services',
    ussdPrefix: '*955#',
    ussdFormat: (amt, acc) => `*955*${amt}*${acc}#`,
    code: '999992',
    type: 'fintech',
    logoColor: 'bg-emerald-600'
  },
  {
    id: 'palmpay',
    name: 'PalmPay Nigeria',
    ussdPrefix: '*652#',
    ussdFormat: (amt, acc) => `*652*${amt}*${acc}#`,
    code: '999991',
    type: 'fintech',
    logoColor: 'bg-indigo-600'
  },
  {
    id: 'kuda',
    name: 'Kuda Microfinance Bank',
    ussdPrefix: '*5573#',
    ussdFormat: (amt, acc) => `*5573*${amt}*${acc}#`,
    code: '50211',
    type: 'fintech',
    logoColor: 'bg-purple-600'
  }
];

export interface DedicatedMinistryAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  sortCode?: string;
  branch: string;
  swiftBic?: string;
}

export const DEDICATED_MINISTRY_ACCOUNTS: DedicatedMinistryAccount[] = [
  {
    bankName: 'Zenith Bank Plc (Nigeria)',
    accountNumber: '1019284710',
    accountName: 'The Realm of God Ministry NGO',
    sortCode: '057150013',
    branch: 'Victoria Island Central, Lagos',
    swiftBic: 'ZEIBNGLA'
  },
  {
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0294810294',
    accountName: 'The Realm of God Ministry - Benevolence Relief',
    sortCode: '058152010',
    branch: 'Abuja Central District',
    swiftBic: 'GTBINGLA'
  },
  {
    bankName: 'First Bank of Nigeria',
    accountNumber: '3182940182',
    accountName: 'The Realm of God Ministry - Pastoral Care Trust',
    sortCode: '011151003',
    branch: 'Ibadan Commercial Hub',
    swiftBic: 'FBNINGLA'
  }
];

// Test Card definitions for Real-Life Sandbox simulation
export interface TestCardPreset {
  id: string;
  name: string;
  brand: 'Verve' | 'Mastercard' | 'Visa' | 'Declined';
  cardNumber: string;
  expiry: string;
  cvv: string;
  pin: string;
  otp: string;
  description: string;
  expectedOutcome: 'success' | 'decline';
}

export const NIGERIAN_TEST_CARDS: TestCardPreset[] = [
  {
    id: 'verve-success',
    name: 'Verve Card (Nigeria Standard)',
    brand: 'Verve',
    cardNumber: '5061 0000 0000 0000',
    expiry: '12/28',
    cvv: '888',
    pin: '1234',
    otp: '123456',
    description: 'Simulates successful Verve debit payment with 3DS OTP verification.',
    expectedOutcome: 'success'
  },
  {
    id: 'mastercard-success',
    name: 'Mastercard (Naira / USD 3DS)',
    brand: 'Mastercard',
    cardNumber: '5123 4567 8901 2345',
    expiry: '11/27',
    cvv: '567',
    pin: '4321',
    otp: '123456',
    description: 'Simulates successful Mastercard online authorization with Bank OTP.',
    expectedOutcome: 'success'
  },
  {
    id: 'visa-success',
    name: 'Visa Card (Instant Debit)',
    brand: 'Visa',
    cardNumber: '4084 0841 0841 0841',
    expiry: '09/29',
    cvv: '321',
    pin: '1111',
    otp: '123456',
    description: 'Simulates instant verified Visa card contribution.',
    expectedOutcome: 'success'
  },
  {
    id: 'decline-test',
    name: 'Test Decline (Insufficient Balance)',
    brand: 'Declined',
    cardNumber: '5061 0000 0000 0002',
    expiry: '05/27',
    cvv: '000',
    pin: '9999',
    otp: '000000',
    description: 'Simulates a declined transaction to test error handling & user retry.',
    expectedOutcome: 'decline'
  }
];

export interface DynamicVirtualAccount {
  accountNumber: string;
  bankName: string;
  beneficiaryName: string;
  reference: string;
  expiresInMinutes: number;
  amount: number;
  currency: 'NGN' | 'USD';
  createdAt: string;
}

export function generateDynamicVirtualAccount(amount: number, currency: 'NGN' | 'USD' = 'NGN'): DynamicVirtualAccount {
  const banks = [
    'Wema Bank (ALAT NIP)',
    'Providus Bank',
    'Titan Trust Bank',
    'Zenith Bank Virtual NIP'
  ];
  const chosenBank = banks[Math.floor(Math.random() * banks.length)];
  const randomSuffix = Math.floor(1000000 + Math.random() * 9000000);
  const accountNumber = `99${randomSuffix}`;
  const refCode = `PSTK-NIP-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    accountNumber,
    bankName: chosenBank,
    beneficiaryName: 'The Realm of God Ministry / Paystack Checkout',
    reference: refCode,
    expiresInMinutes: 30,
    amount,
    currency,
    createdAt: new Date().toISOString()
  };
}

export function generatePaystackReference(currency: 'NGN' | 'USD'): string {
  const prefix = currency === 'NGN' ? 'pstk_ngn_' : 'pstk_usd_';
  return `${prefix}${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
}

export function generateNIPSessionId(): string {
  return `999057${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
}

// Helper to dynamically load Paystack Inline JS script if user connects real key
export async function loadPaystackInlineScript(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if ((window as any).PaystackPop) return true;

  return new Promise((resolve) => {
    const existingScript = document.getElementById('paystack-inline-js');
    if (existingScript) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load Paystack inline.js from CDN, fallback simulator will be active.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
