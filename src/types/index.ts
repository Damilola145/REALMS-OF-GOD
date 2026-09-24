export type BeneficiaryCategory = 
  | 'pastor'
  | 'widow'
  | 'orphan'
  | 'evangelist'
  | 'emergency_medical';

export interface Beneficiary {
  id: string;
  name: string;
  category: BeneficiaryCategory;
  roleTitle: string;
  location: string;
  yearsInMinistry?: number;
  familyMembersCount?: number;
  urgent: boolean;
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  shortSummary: string;
  fullStory: string[];
  immediateNeeds: string[];
  financialBreakdown: { item: string; cost: number }[];
  image?: string;
  caseCode?: string;
  presbyteryDistrict?: string;
  verificationStatus: 'Fully Verified by District Presbytery' | 'Medical Board Verified' | 'Field Inspector Verified';
  verifiedDate: string;
  updates?: { date: string; title: string; note: string }[];
}

export type DonationFrequency = 'one_time' | 'monthly' | 'quarterly';

export type CurrencyType = 'NGN' | 'USD';

export type PaymentMethodType = 
  | 'paystack_card' 
  | 'card' 
  | 'bank_transfer' 
  | 'ussd' 
  | 'opay_palmpay' 
  | 'direct_bank_account' 
  | 'paypal' 
  | 'apple_pay' 
  | 'google_pay';

export interface DonationRecord {
  id: string;
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  frequency: DonationFrequency;
  currency: CurrencyType;
  designationCategory: string;
  beneficiaryId?: string;
  beneficiaryName?: string;
  specificOutreachDescription: string; // User-requested custom description for who they want to reach
  paymentMethod: PaymentMethodType;
  gatewayProvider?: 'Paystack' | 'Flutterwave' | 'NIBSS NIP Transfer' | 'USSD Banking' | 'Direct Non-Profit Account' | 'PayPal';
  paymentReference?: string;
  bankName?: string;
  ussdCode?: string;
  isAnonymous: boolean;
  coverProcessingFee: boolean;
  processingFeeAmount: number;
  totalCharged: number;
  timestamp: string;
  status: 'completed' | 'pending';
  taxDeductibleEligible: boolean;
  cacRegNumber?: string;
  scumlNumber?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Field Reports' | 'Ministry Impact' | 'Widow Care' | 'Orphan Support' | 'Biblical Stewardship';
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  scriptureAnchor?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  churchOrRegion: string;
  category: 'Beneficiary Pastor' | 'Pastors Widow' | 'Partner Church' | 'Orphan Guardian' | 'WIDOW';
  quote: string;
  fullTestimony: string;
  avatar: string;
  yearAssisted: string;
  aidType: string;
}

export interface MinisterNomination {
  id: string;
  nomineeName: string;
  category: BeneficiaryCategory;
  location: string;
  contactNumber: string;
  churchAffiliation: string;
  currentStruggle: string;
  urgentMedicalNeeds: string;
  estimatedFinancialNeed: number;
  submitterName: string;
  submitterRole: string;
  submitterEmail: string;
  submitterPhone: string;
  status: 'Received' | 'Under Vetting' | 'Approved' | 'Disbursed';
  submittedAt: string;
}

export interface PrayerBlessing {
  id: string;
  donorName: string;
  location: string;
  forWhom: string;
  message: string;
  scriptureRef?: string;
  heartsCount: number;
  createdAt: string;
}
