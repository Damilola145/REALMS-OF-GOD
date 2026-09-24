import { DonationRecord, DonationFrequency, PaymentMethodType, CurrencyType } from '../types';

export const TAX_EXEMPT_ID = 'EIN: 83-4928104 (501(c)(3) Tax-Exempt Religious Benevolence NGO)';
export const NIGERIAN_CAC_REG = 'CAC/IT/NO: 148291 (Federal Republic of Nigeria Incorporated Trustees)';
export const NIGERIAN_SCUML_ID = 'SCUML/RN/2021/49102 (Special Control Unit Anti-Money Laundering)';
export const MINISTRY_NAME = 'The Realm of God Ministry';
export const MINISTRY_ADDRESS = '144 Grace Benevolence Way, Suite 300, Dallas, TX 75201 & West Africa Regional Field Office (Plot 12 Bishop Abiodun Crescent, Lagos/Abuja, Nigeria)';
export const MINISTRY_EMAIL = 'support@therealmofgodministry.org';
export const MINISTRY_PHONE = '+234 (800) 463-MINISTRY / +1 (800) 746-REALM';

const STORAGE_KEY = 'rgm_donations_ledger_v1';

export function generateReceiptNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `RGM-${new Date().getFullYear()}-${timestamp}${random}`;
}

export function saveDonationRecord(donation: DonationRecord): void {
  try {
    const existing = getStoredDonations();
    const updated = [donation, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to store donation record in localStorage', err);
  }
}

export function getStoredDonations(): DonationRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to parse stored donations', err);
    return [];
  }
}

export function createDonationRecord(params: {
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  frequency: DonationFrequency;
  currency?: CurrencyType;
  designationCategory: string;
  beneficiaryId?: string;
  beneficiaryName?: string;
  specificOutreachDescription: string;
  paymentMethod: PaymentMethodType;
  gatewayProvider?: 'Paystack' | 'Flutterwave' | 'NIBSS NIP Transfer' | 'USSD Banking' | 'Direct Non-Profit Account' | 'PayPal';
  paymentReference?: string;
  bankName?: string;
  ussdCode?: string;
  isAnonymous: boolean;
  coverProcessingFee: boolean;
}): DonationRecord {
  const currency: CurrencyType = params.currency || 'NGN';
  
  // Processing fee calculation (Paystack is 1.5% + N100 for NGN, or 2.9% + $0.30 for USD)
  let processingFee = 0;
  if (params.coverProcessingFee) {
    if (currency === 'NGN') {
      processingFee = Number((params.amount * 0.015 + (params.amount > 2500 ? 100 : 0)).toFixed(2));
    } else {
      processingFee = Number((params.amount * 0.029 + 0.30).toFixed(2));
    }
  }
  const totalCharged = Number((params.amount + processingFee).toFixed(2));
  
  const record: DonationRecord = {
    id: 'don-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    receiptNumber: generateReceiptNumber(),
    donorName: params.isAnonymous ? 'Anonymous Donor' : params.donorName,
    donorEmail: params.donorEmail,
    donorPhone: params.donorPhone,
    amount: params.amount,
    frequency: params.frequency,
    currency: currency,
    designationCategory: params.designationCategory,
    beneficiaryId: params.beneficiaryId,
    beneficiaryName: params.beneficiaryName,
    specificOutreachDescription: params.specificOutreachDescription,
    paymentMethod: params.paymentMethod,
    gatewayProvider: params.gatewayProvider || (currency === 'NGN' ? 'Paystack' : 'Paystack'),
    paymentReference: params.paymentReference || `PSTK-${currency}-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    bankName: params.bankName,
    ussdCode: params.ussdCode,
    isAnonymous: params.isAnonymous,
    coverProcessingFee: params.coverProcessingFee,
    processingFeeAmount: processingFee,
    totalCharged: totalCharged,
    timestamp: new Date().toISOString(),
    status: 'completed',
    taxDeductibleEligible: true,
    cacRegNumber: NIGERIAN_CAC_REG,
    scumlNumber: NIGERIAN_SCUML_ID
  };

  saveDonationRecord(record);
  return record;
}

export function formatCurrency(amount: number, currency: CurrencyType | string = 'NGN'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // NGN Nigerian Naira formatting with Naira symbol ₦
  const formattedNumber = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `₦${formattedNumber}`;
}

export function formatDate(isoString: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}
