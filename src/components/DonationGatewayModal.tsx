import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  CreditCard, 
  Check, 
  ArrowRight, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Building, 
  CheckCircle2, 
  PhoneCall, 
  Smartphone, 
  Copy, 
  Clock, 
  AlertCircle,
  Lock,
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Beneficiary, DonationFrequency, PaymentMethodType, DonationRecord, CurrencyType } from '../types';
import { createDonationRecord, formatCurrency } from '../utils/receiptGenerator';
import { 
  NIGERIAN_BANKS, 
  NigerianBank, 
  DEDICATED_MINISTRY_ACCOUNTS, 
  NIGERIAN_TEST_CARDS, 
  TestCardPreset, 
  DynamicVirtualAccount, 
  generateDynamicVirtualAccount, 
  generatePaystackReference 
} from '../utils/nigerianPaymentService';
import { getPaystackConfig, openPaystackInlineCheckout, PaystackConfig } from '../utils/paystack';

interface DonationGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiaries: Beneficiary[];
  selectedBeneficiaryId?: string;
  presetAmount?: number;
  onDonationSuccess: (donation: DonationRecord) => void;
}

export const DonationGatewayModal: React.FC<DonationGatewayModalProps> = ({
  isOpen,
  onClose,
  beneficiaries,
  selectedBeneficiaryId,
  presetAmount,
  onDonationSuccess,
}) => {
  // Navigation & Step state
  const [step, setStep] = useState<'amount' | 'details' | 'payment' | 'otp' | 'ussd_screen' | 'processing'>('amount');
  const [currency, setCurrency] = useState<CurrencyType>('NGN');
  const [frequency, setFrequency] = useState<DonationFrequency>('one_time');
  
  // Amounts
  const [amount, setAmount] = useState<number>(presetAmount || 25000);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  // Designation & Specific outreach note
  const [designation, setDesignation] = useState<string>('general');
  const [beneficiaryId, setBeneficiaryId] = useState<string>(selectedBeneficiaryId || '');
  const [specificDescription, setSpecificDescription] = useState<string>('');

  // Donor Details
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [coverFee, setCoverFee] = useState<boolean>(false);

  // Payment Rails & Method
  const [activeTab, setActiveTab] = useState<'card' | 'bank_transfer' | 'ussd' | 'opay_palmpay' | 'direct_accounts'>('card');
  
  // Card Details (Nigerian Verve / Mastercard / Visa)
  const [cardNumber, setCardNumber] = useState<string>('5061 0000 0000 0000');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('888');
  const [cardPin, setCardPin] = useState<string>('1234');
  const [selectedCardBrand, setSelectedCardBrand] = useState<'Verve' | 'Mastercard' | 'Visa'>('Verve');

  // Bank Transfer (Virtual NIP Dynamic Account)
  const [virtualAccount, setVirtualAccount] = useState<DynamicVirtualAccount | null>(null);
  const [virtualTimeLeft, setVirtualTimeLeft] = useState<number>(1800); // 30 mins
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // USSD Banking
  const [selectedBank, setSelectedBank] = useState<NigerianBank>(NIGERIAN_BANKS[0]); // default GTBank
  const [ussdInputPin, setUssdInputPin] = useState<string>('');

  // 3DS OTP Simulator
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpTimeLeft, setOtpTimeLeft] = useState<number>(120);
  const [simulationError, setSimulationError] = useState<string | null>(null);

  // Paystack Integration State
  const [paystackConfig, setPaystackConfig] = useState<PaystackConfig | null>(null);
  const [isPaystackLoading, setIsPaystackLoading] = useState<boolean>(false);

  useEffect(() => {
    getPaystackConfig().then(setPaystackConfig).catch(() => {});
  }, []);

  // Sync preset values when props change
  useEffect(() => {
    if (selectedBeneficiaryId) {
      setBeneficiaryId(selectedBeneficiaryId);
      setDesignation('specific_beneficiary');
      const b = beneficiaries.find(item => item.id === selectedBeneficiaryId);
      if (b) {
        setSpecificDescription(`Emergency relief contribution designated for ${b.name} (${b.roleTitle})`);
      }
    }
  }, [selectedBeneficiaryId, beneficiaries]);

  useEffect(() => {
    if (presetAmount) {
      setAmount(presetAmount);
      setCustomAmount('');
    }
  }, [presetAmount]);

  // Virtual account countdown timer
  useEffect(() => {
    if (step === 'payment' && activeTab === 'bank_transfer') {
      const timer = setInterval(() => {
        setVirtualTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, activeTab]);

  // OTP Countdown timer
  useEffect(() => {
    if (step === 'otp') {
      const timer = setInterval(() => {
        setOtpTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  if (!isOpen) return null;

  const standardAmountsNGN = [5000, 10000, 25000, 50000, 100000, 250000];
  const standardAmountsUSD = [25, 50, 100, 250, 500, 1000];
  const currentAmounts = currency === 'NGN' ? standardAmountsNGN : standardAmountsUSD;

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;
  
  // Fee Calculation
  let processingFee = 0;
  if (coverFee) {
    if (currency === 'NGN') {
      processingFee = Number((finalAmount * 0.015 + (finalAmount > 2500 ? 100 : 0)).toFixed(2));
    } else {
      processingFee = Number((finalAmount * 0.029 + 0.30).toFixed(2));
    }
  }
  const totalCharge = Number((finalAmount + processingFee).toFixed(2));

  // Copy helper
  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSelectBeneficiaryDropdown = (bId: string) => {
    setBeneficiaryId(bId);
    if (bId) {
      setDesignation('specific_beneficiary');
      const target = beneficiaries.find(b => b.id === bId);
      if (target) {
        setSpecificDescription(`Direct aid contribution for ${target.name} - ${target.roleTitle}`);
      }
    } else {
      setDesignation('general');
      setSpecificDescription('');
    }
  };

  // 1-Click Sandbox Test Card loader
  const applyTestCardPreset = (preset: TestCardPreset) => {
    setCardNumber(preset.cardNumber);
    setCardExpiry(preset.expiry);
    setCardCvc(preset.cvv);
    setCardPin(preset.pin);
    setSelectedCardBrand(preset.brand as any);
    setSimulationError(null);
  };

  // Generate Virtual Account when switching to Bank Transfer
  const handleSwitchToBankTransfer = () => {
    setActiveTab('bank_transfer');
    if (!virtualAccount) {
      setVirtualAccount(generateDynamicVirtualAccount(totalCharge, currency));
      setVirtualTimeLeft(1800);
    }
  };

  // Finalize and dispatch donation record
  const finalizeDonationSuccess = (params: {
    method: PaymentMethodType;
    provider: 'Paystack' | 'Flutterwave' | 'NIBSS NIP Transfer' | 'USSD Banking' | 'Direct Non-Profit Account';
    bankName?: string;
    reference?: string;
    ussdCode?: string;
  }) => {
    setStep('processing');
    setSimulationError(null);

    setTimeout(() => {
      const targetBeneficiary = beneficiaryId ? beneficiaries.find(b => b.id === beneficiaryId) : undefined;
      
      const record = createDonationRecord({
        donorName: donorName || 'Faithful Partner',
        donorEmail: donorEmail || 'donor@realmsofgodministry.org',
        donorPhone: donorPhone,
        amount: finalAmount,
        frequency: frequency,
        currency: currency,
        designationCategory: designation === 'specific_beneficiary' 
          ? `Beneficiary: ${targetBeneficiary?.name || 'Designated Minister'}`
          : designation === 'widows_fund' 
            ? 'Pastors Widows Livelihood Fund' 
            : designation === 'orphan_fund' 
              ? 'Orphan Education & Child Support' 
              : designation === 'medical_emergency' 
                ? 'Ministerial Medical Emergency Aid' 
                : 'General Ministry Relief Fund',
        beneficiaryId: targetBeneficiary?.id,
        beneficiaryName: targetBeneficiary?.name,
        specificOutreachDescription: specificDescription || 'General Ministry Benevolence and Emergency Relief Support',
        paymentMethod: params.method,
        gatewayProvider: params.provider,
        paymentReference: params.reference || generatePaystackReference(currency),
        bankName: params.bankName,
        ussdCode: params.ussdCode,
        isAnonymous: isAnonymous,
        coverProcessingFee: coverFee
      });

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      onDonationSuccess(record);
      onClose();
      setStep('amount');
    }, 1500);
  };

  // Secure Paystack Official Checkout
  const handlePaystackCheckout = async (preferredChannel?: 'card' | 'bank_transfer' | 'all') => {
    if (!donorEmail || !donorEmail.includes('@')) {
      alert('Please enter a valid donor email address to receive your official tax receipt.');
      setStep('details');
      return;
    }

    setIsPaystackLoading(true);
    setSimulationError(null);

    const targetBeneficiary = beneficiaryId ? beneficiaries.find(b => b.id === beneficiaryId) : undefined;

    // Define channel routing based on user choice
    const channels = preferredChannel === 'card'
      ? ['card']
      : preferredChannel === 'bank_transfer'
        ? ['bank_transfer', 'bank']
        : ['card', 'bank_transfer', 'bank', 'ussd', 'qr', 'mobile_money'];

    await openPaystackInlineCheckout({
      email: donorEmail,
      amount: totalCharge,
      currency: currency,
      channels,
      metadata: {
        donor_name: donorName || 'Faithful Partner',
        beneficiary_id: targetBeneficiary?.id,
        beneficiary_name: targetBeneficiary?.name || 'General Ministry Relief',
        cover_fee: coverFee,
        is_anonymous: isAnonymous,
      },
      onSuccess: (verifiedData) => {
        setIsPaystackLoading(false);
        finalizeDonationSuccess({
          method: verifiedData.channel === 'bank_transfer' || verifiedData.channel === 'bank' ? 'bank_transfer' : 'paystack_card',
          provider: 'Paystack',
          reference: verifiedData.reference,
          bankName: verifiedData.authorization?.bank || 'Paystack Official Gateway',
        });
      },
      onError: (errorMsg) => {
        setIsPaystackLoading(false);
        setSimulationError(errorMsg);
      },
      onClose: () => {
        setIsPaystackLoading(false);
      }
    });
  };

  // Initiation from Step 3: Payment
  const handleInitiatePayment = async () => {
    if (!donorEmail || !donorEmail.includes('@')) {
      alert('Please enter a valid donor email address to receive your official tax receipt.');
      setStep('details');
      return;
    }

    if (activeTab === 'card') {
      if (cardNumber.includes('0002')) {
        setSimulationError('Transaction Declined: Insufficient funds in card account. (Simulated test failure)');
        return;
      }
      setStep('otp');
      setEnteredOtp('');
      setOtpError(null);
      setOtpTimeLeft(120);
      return;
    }

    if (activeTab === 'bank_transfer') {
      finalizeDonationSuccess({
        method: 'bank_transfer',
        provider: 'NIBSS NIP Transfer',
        bankName: virtualAccount?.bankName || 'Wema Bank NIP',
        reference: virtualAccount?.reference || `NIP-${Date.now()}`
      });
      return;
    }

    if (activeTab === 'ussd') {
      setStep('ussd_screen');
      setUssdInputPin('');
      return;
    }

    if (activeTab === 'opay_palmpay') {
      finalizeDonationSuccess({
        method: 'opay_palmpay',
        provider: 'Paystack',
        bankName: 'OPay / PalmPay Instant Gateway',
        reference: `OPAY-NIP-${Date.now().toString(36).toUpperCase()}`
      });
      return;
    }

    if (activeTab === 'direct_accounts') {
      finalizeDonationSuccess({
        method: 'direct_bank_account',
        provider: 'Direct Non-Profit Account',
        bankName: 'Zenith Bank Plc (Nigeria)',
        reference: `DIRECT-CBN-${Date.now().toString(36).toUpperCase()}`
      });
      return;
    }
  };

  // Submit OTP Verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredOtp || enteredOtp.length < 4) {
      setOtpError('Please enter the 6-digit OTP sent to your registered mobile number.');
      return;
    }
    if (enteredOtp === '000000') {
      setOtpError('Invalid OTP entered. Please try with test OTP: 123456');
      return;
    }

    finalizeDonationSuccess({
      method: 'paystack_card',
      provider: 'Paystack',
      bankName: selectedCardBrand === 'Verve' ? 'Interswitch Verve 3DS' : 'Bank 3D Secure Verification',
      reference: generatePaystackReference(currency)
    });
  };

  // Submit USSD PIN
  const handleVerifyUssd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ussdInputPin || ussdInputPin.length < 4) {
      alert('Please enter a 4-digit USSD PIN to authorize.');
      return;
    }

    const ussdString = selectedBank.ussdFormat(totalCharge, '0294810294');
    finalizeDonationSuccess({
      method: 'ussd',
      provider: 'USSD Banking',
      bankName: selectedBank.name,
      ussdCode: ussdString,
      reference: `USSD-${selectedBank.code}-${Date.now().toString(36).toUpperCase()}`
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-600 hover:text-[#0B1E37] hover:bg-slate-200/50 transition-colors cursor-pointer"
            aria-label="Close donation window"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-bold">
                Secure Giving Gateway
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0B1E37] tracking-tight">
              Support The Ministry
            </h2>
            <p className="text-xs text-slate-600 font-light">
              Emergency assistance for struggling pastors, evangelists, and widows.
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center gap-1.5 mt-4">
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step === 'amount' || step === 'details' || step === 'payment' || step === 'otp' || step === 'ussd_screen' ? 'bg-[#F6864C]' : 'bg-slate-200'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step === 'details' || step === 'payment' || step === 'otp' || step === 'ussd_screen' ? 'bg-[#F6864C]' : 'bg-slate-200'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step === 'payment' || step === 'otp' || step === 'ussd_screen' ? 'bg-[#F6864C]' : 'bg-slate-200'}`} />
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-white/70">
          
          {/* STEP 1: AMOUNT & CURRENCY */}
          {step === 'amount' && (
            <div className="space-y-4">
              
              {/* Amount Selection Grid */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase text-slate-600 font-bold">
                  Select Amount ({currency})
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {currentAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        amount === amt && !customAmount
                          ? 'border-[#0B1E37] bg-[#F6864C] text-white shadow-xs'
                          : 'border-slate-200 hover:border-[#F6864C] text-[#0B1E37] bg-white'
                      }`}
                    >
                      {formatCurrency(amt, currency)}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative pt-1">
                  <span className="absolute left-3.5 top-[18px] text-xs font-mono text-slate-600 font-bold">
                    {currency === 'NGN' ? '₦' : '$'}
                  </span>
                  <input
                    type="number"
                    placeholder={`Or enter custom amount in ${currency}...`}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(0);
                    }}
                    className={`w-full pl-8 pr-4 py-2 text-xs rounded-xl border outline-none transition-all placeholder:text-slate-400 ${
                      customAmount
                        ? 'border-slate-300 bg-white text-[#0B1E37] font-bold ring-2 ring-[#F6864C]/20'
                        : 'border-slate-200 text-[#0B1E37] bg-white'
                    }`}
                    min={currency === 'NGN' ? '500' : '5'}
                  />
                </div>
              </div>

              {/* Designation Dropdown */}
              <div>
                <select
                  aria-label="Allocation / Hardship Fund"
                  value={beneficiaryId || designation}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.startsWith('ben-')) {
                      handleSelectBeneficiaryDropdown(val);
                    } else {
                      setBeneficiaryId('');
                      setDesignation(val);
                      if (val === 'widows_fund') {
                        setSpecificDescription('Dedicated to Pastors Widows Housing & Livelihood Micro-Grants');
                      } else if (val === 'orphan_fund') {
                        setSpecificDescription('Dedicated to School Tuition & Care for Children of Late Ministers');
                      } else if (val === 'medical_emergency') {
                        setSpecificDescription('Dedicated to Urgent Pastoral Dialysis & Surgeries');
                      } else {
                        setSpecificDescription('');
                      }
                    }
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-[#0B1E37] font-medium focus:outline-none focus:ring-2 focus:ring-[#F6864C]"
                >
                  <option value="general">General Relief & Benevolence (Most Urgent)</option>
                  <option value="widows_fund">Pastors Widows Housing & Livelihood Fund</option>
                  <option value="orphan_fund">Orphan Scholarship & Education Fund</option>
                  <option value="medical_emergency">Urgent Pastoral Medical Emergency Fund</option>
                  <optgroup label="Direct Support to Individual Beneficiary">
                    {beneficiaries.map((b) => (
                      <option key={b.id} value={b.id}>
                        Direct: {b.name} ({b.roleTitle})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Specific Outreach Description */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <label className="block text-[11px] font-semibold text-[#0B1E37]">
                  Specific Outreach Note / Beneficiary Direction
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 'Allocate for Pastor Emmanuel Adebayo's dialysis'..."
                  value={specificDescription}
                  onChange={(e) => setSpecificDescription(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-200 bg-white text-[#0B1E37] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F6864C]"
                />
              </div>

              {/* Next Step CTA */}
              <button
                type="button"
                onClick={() => {
                  if (finalAmount <= 0) {
                    alert('Please specify a valid contribution amount.');
                    return;
                  }
                  setStep('details');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#F6864C] hover:bg-[#0B1E37] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-[#F6864C]/50"
              >
                <span>Continue to Donor Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F6864C]" />
              </button>
            </div>
          )}

          {/* STEP 2: DONOR INFORMATION */}
          {step === 'details' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#0B1E37] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Olumide Johnson / Pastor Grace"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#0B1E37] mb-1">
                    Email Address <span className="text-[#F6864C]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="e.g. donor@gmail.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#0B1E37] mb-1">
                    Phone Number <span className="text-slate-600 font-normal">(for SMS notification)</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. +234 803 123 4567"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C] placeholder:text-slate-400"
                    />
                  </div>
                </div>

               

              {/* Navigation Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('amount')}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 text-[#0B1E37] font-semibold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!donorEmail || !donorEmail.includes('@')) {
                      alert('Please enter a valid email address.');
                      return;
                    }
                    setStep('payment');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#F6864C] hover:bg-[#0B1E37] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-[#F6864C]/50"
                >
                  <span>Select Payment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F6864C]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT RAILS */}
          {step === 'payment' && (
            <div className="space-y-4">
              
              {/* Summary */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#0B1E37]">
                    {formatCurrency(totalCharge, currency)} ({frequency === 'monthly' ? 'Monthly' : 'One-Time'})
                  </span>
                  <span className="text-slate-600 text-[11px] truncate max-w-[240px] block">
                    {specificDescription || 'General Ministry Relief Fund'}
                  </span>
                </div>
                <button
                  onClick={() => setStep('amount')}
                  className="text-slate-600 font-mono text-[11px] underline font-bold cursor-pointer hover:text-[#0B1E37]"
                >
                  Change
                </button>
              </div>

              {/* Primary Secure Paystack Checkout Card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0B1E37] to-[#16335C] text-white border border-[#F6864C]/50 space-y-3.5 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Official Paystack Gateway
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-mono">
                    Cards &bull; Bank Transfer &bull; USSD
                  </span>
                </div>

                <p className="text-[11px] text-slate-200 leading-snug">
                  Choose your preferred payment method on Paystack. You will receive an instant verified confirmation and tax receipt.
                </p>

                {/* Primary Card & Transfer Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isPaystackLoading}
                    onClick={() => handlePaystackCheckout('card')}
                    className="py-3 px-3 rounded-xl bg-[#F6864C] hover:bg-[#e0753d] active:bg-[#c9632f] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isPaystackLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <CreditCard className="w-4 h-4 text-white" />
                    )}
                    <span>Pay with Card (Verve/Visa)</span>
                  </button>

                  <button
                    type="button"
                    disabled={isPaystackLoading}
                    onClick={() => handlePaystackCheckout('bank_transfer')}
                    className="py-3 px-3 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-bold text-xs transition-all border border-white/25 flex items-center justify-center gap-2"
                  >
                    {isPaystackLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <Building className="w-4 h-4 text-[#F6864C]" />
                    )}
                    <span>Pay via Bank Transfer</span>
                  </button>
                </div>

                {/* All Paystack Options Button */}
                <button
                  type="button"
                  disabled={isPaystackLoading}
                  onClick={() => handlePaystackCheckout('all')}
                  className="w-full py-2 px-3 rounded-lg bg-black/20 hover:bg-black/30 text-slate-200 text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-transparent"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open Paystack Checkout ({formatCurrency(totalCharge, currency)}) with all payment methods</span>
                  <ExternalLink className="w-3 h-3 text-slate-300" />
                </button>
              </div>

              {/* Error Banner */}
              {simulationError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{simulationError}</span>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-600 pt-2 font-medium">
                <span>CAC & 501(c)(3) Certified</span>
                <span>&bull;</span>
                <span>Instant Verifiable Tax Receipt</span>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-slate-600 hover:text-[#0B1E37] font-semibold cursor-pointer"
                >
                  &larr; Back to Donor Details
                </button>
              </div>

            </div>
          )}

          {/* STEP 3.5: OTP VERIFICATION */}
          {step === 'otp' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0B1E37]">
                    Bank 3D Secure / OTP Verification
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Interswitch Verve & Mastercard SecureCode
                  </p>
                </div>

                <span className="text-xs font-mono text-[#0B1E37] font-bold bg-white border border-[#F6864C] px-2 py-0.5 rounded">
                  {Math.floor(otpTimeLeft / 60)}:{(otpTimeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* OTP Prompt */}
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">Charged Amount:</span>
                  <span className="font-bold text-[#0B1E37]">{formatCurrency(totalCharge, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Card:</span>
                  <span className="font-mono text-[#0B1E37]">{cardNumber.slice(0, 4)} •••• •••• {cardNumber.slice(-4)}</span>
                </div>
              </div>

              {/* Test OTP Helper */}
              <div className="p-2 rounded-lg bg-white border border-[#F6864C] text-xs text-[#0B1E37] flex items-center justify-between">
                <span className="text-[11px]">
                  Simulated OTP: <strong className="text-[#0B1E37]">123456</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setEnteredOtp('123456')}
                  className="px-2 py-0.5 rounded bg-[#F6864C] text-white text-[10px] font-bold hover:bg-[#0B1E37] cursor-pointer"
                >
                  Fill 123456
                </button>
              </div>

              {/* OTP Form */}
              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <div>
                  <input
                    type="text"
                    maxLength={6}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.trim())}
                    placeholder="123456"
                    className="w-full py-2.5 px-3 text-center font-mono text-lg tracking-widest rounded-xl border border-slate-200 bg-white text-[#0B1E37] focus:outline-none focus:ring-2 focus:ring-[#F6864C]"
                    autoFocus
                  />
                  {otpError && (
                    <p className="text-xs text-rose-600 mt-1">{otpError}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="py-2 px-3 rounded-xl border border-slate-200 text-[#0B1E37] text-xs hover:bg-slate-50 cursor-pointer font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 rounded-xl bg-[#F6864C] hover:bg-[#0B1E37] text-white text-xs font-bold cursor-pointer border border-[#F6864C]/50"
                  >
                    Authorize Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3.6: USSD SCREEN */}
          {step === 'ussd_screen' && (
            <div className="p-4 rounded-xl bg-[#0B1E37] text-white space-y-3 animate-in zoom-in-95 border border-[#F6864C]/30">
              <div className="flex items-center justify-between border-b border-slate-300 pb-2">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#F6864C]" />
                  <span className="font-mono text-xs text-[#F6864C] font-bold">
                    USSD &bull; {selectedBank.ussdPrefix}
                  </span>
                </div>
                <span className="text-[10px] text-slate-300 font-mono">
                  {selectedBank.name}
                </span>
              </div>

              <div className="p-3 bg-[#061120] rounded-lg border border-slate-300 text-xs font-mono space-y-1 text-stone-200">
                <p className="text-[#F6864C] font-bold">Realms of God Ministry</p>
                <p>Donation: {formatCurrency(totalCharge, currency)}</p>
                <p className="text-slate-300">Enter 4-digit bank PIN:</p>
              </div>

              <form onSubmit={handleVerifyUssd} className="space-y-3">
                <input
                  type="password"
                  maxLength={4}
                  value={ussdInputPin}
                  onChange={(e) => setUssdInputPin(e.target.value)}
                  placeholder="••••"
                  className="w-full py-2 px-3 text-center font-mono text-xl tracking-widest rounded-xl border border-slate-300 bg-[#061120] text-white focus:outline-none focus:ring-2 focus:ring-[#F6864C]"
                  autoFocus
                />

                <div className="grid grid-cols-3 gap-1.5">
                  {['1','2','3','4','5','6','7','8','9','C','0','✓'].map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => {
                        if (k === 'C') {
                          setUssdInputPin('');
                        } else if (k === '✓') {
                          if (ussdInputPin.length >= 4) {
                            handleVerifyUssd({ preventDefault: () => {} } as any);
                          } else {
                            setUssdInputPin('1234');
                          }
                        } else {
                          if (ussdInputPin.length < 4) {
                            setUssdInputPin(prev => prev + k);
                          }
                        }
                      }}
                      className="py-1.5 rounded-lg bg-[#F6864C] hover:bg-[#061120] text-white font-mono text-xs cursor-pointer border border-[#F6864C]/20"
                    >
                      {k === '✓' ? 'Send (1234)' : k}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="py-2 px-3 rounded-xl border border-slate-300 text-slate-300 text-xs hover:bg-[#061120] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-3 rounded-xl bg-[#F6864C] hover:bg-white text-[#0B1E37] font-bold text-xs cursor-pointer"
                  >
                    Confirm PIN
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: PROCESSING OVERLAY */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-3">
              <div className="w-10 h-10 border-3 border-slate-200 border-t-[#F6864C] rounded-full animate-spin mx-auto" />
              <h3 className="font-serif font-bold text-base text-[#0B1E37]">
                Verifying Contribution...
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto font-light">
                Securing settlement with NIBSS & Paystack, allocating your benevolence, and generating your official tax receipt.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
