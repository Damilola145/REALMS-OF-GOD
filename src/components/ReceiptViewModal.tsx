import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Mail, 
  Check, 
  ShieldCheck, 
  CheckCircle2, 
  Share2,
  MessageCircle,
  Copy
} from 'lucide-react';
import { DonationRecord } from '../types';
import { 
  formatCurrency, 
  formatDate, 
  TAX_EXEMPT_ID, 
  NIGERIAN_CAC_REG,
  NIGERIAN_SCUML_ID,
  MINISTRY_NAME, 
  MINISTRY_ADDRESS, 
  MINISTRY_EMAIL, 
  MINISTRY_PHONE 
} from '../utils/receiptGenerator';
import { getShareUrls, copyToClipboard } from '../utils/socialShare';

interface ReceiptViewModalProps {
  donation: DonationRecord | null;
  onClose: () => void;
  onOpenEmailPreview: (donation: DonationRecord) => void;
}

export const ReceiptViewModal: React.FC<ReceiptViewModalProps> = ({
  donation,
  onClose,
  onOpenEmailPreview,
}) => {
  const [copied, setCopied] = useState(false);

  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  const shareUrls = getShareUrls({
    title: `I just supported God's servants through ${MINISTRY_NAME}!`,
    text: `I just supported ${donation.designationCategory} through Realms of God Ministry. Stand with struggling pastors, widows, and orphans:`,
  });

  const handleCopyShare = async () => {
    const success = await copyToClipboard(
      `I just supported ${donation.designationCategory} through Realms of God Ministry. Stand with faithful pastors, widows, and orphans: https://realmsofgodministry.org/`
    );
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Bar */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 text-[#0B1E37] flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-white text-slate-600 border border-[#F6864C]">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-xs sm:text-sm text-[#0B1E37]">
                Official Tax Receipt #{donation.receiptNumber}
              </h3>
              <p className="text-[10px] text-slate-600 font-mono">
                Verified Benevolence Contribution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-200/40 text-[#0B1E37] border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={() => onOpenEmailPreview(donation)}
              className="px-2.5 py-1.5 rounded-lg bg-[#F6864C] hover:bg-[#0B1E37] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#F6864C]/50"
              title="Preview Automated Email Receipt"
            >
              <Mail className="w-3.5 h-3.5 text-[#F6864C]" />
              <span className="hidden sm:inline">Email Copy</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-600 hover:text-[#0B1E37] hover:bg-slate-200/50 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div id="printable-tax-receipt" className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-white text-[#0B1E37]">
          
          {/* Header */}
          <div className="border-b-2 border-[#0B1E37] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B1E37] text-[#F6864C] flex items-center justify-center font-serif text-lg font-bold">
                †
              </div>
              <div>
                <h1 className="font-serif font-bold text-lg text-[#0B1E37] leading-tight">
                  {MINISTRY_NAME}
                </h1>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-semibold">
                  Charitable Contribution Receipt
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600 space-y-0.5 font-mono">
              <div className="font-bold text-[#0B1E37] text-sm">
                #{donation.receiptNumber}
              </div>
              <div>Date: {formatDate(donation.timestamp)}</div>
              <div>Gateway: {donation.gatewayProvider || 'Paystack Nigeria'}</div>
              <div>Status: <span className="text-slate-600 font-bold uppercase">Verified</span></div>
              {donation.paymentReference && (
                <div className="text-[10px] text-slate-600/70">Ref: {donation.paymentReference}</div>
              )}
            </div>
          </div>

          {/* Donor & Ministry Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="font-mono text-slate-600 uppercase tracking-wider text-[10px] block mb-1 font-bold">
                Donor Details
              </span>
              <div className="font-bold text-[#0B1E37] text-sm">{donation.donorName}</div>
              <div className="text-[#0B1E37]">{donation.donorEmail}</div>
              {donation.donorPhone && <div className="text-[#0B1E37]">{donation.donorPhone}</div>}
              <div className="text-[11px] text-slate-600 mt-1 font-mono">
                Channel: <span className="capitalize">{donation.paymentMethod.replace(/_/g, ' ')}</span>
              </div>
            </div>

            <div>
              <span className="font-mono text-slate-600 uppercase tracking-wider text-[10px] block mb-1 font-bold">
                Ministry Office
              </span>
              <div className="text-[#0B1E37] font-light leading-relaxed">{MINISTRY_ADDRESS}</div>
              <div className="text-[#0B1E37] mt-1">{MINISTRY_EMAIL}</div>
              <div className="text-[#0B1E37]">{MINISTRY_PHONE}</div>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-slate-600 font-bold">
              Contribution Itemization
            </h4>
            
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="p-3 bg-slate-50 font-mono text-[11px] text-[#0B1E37] font-bold flex justify-between">
                <span>Designation & Description</span>
                <span>Amount ({donation.currency || 'NGN'})</span>
              </div>

              <div className="p-3 bg-white space-y-1.5">
                <div className="flex justify-between font-bold text-[#0B1E37]">
                  <span>{donation.designationCategory}</span>
                  <span>{formatCurrency(donation.amount, donation.currency)}</span>
                </div>

                {donation.specificOutreachDescription && (
                  <div className="p-2.5 bg-white/50 rounded-lg border border-slate-200 text-xs text-[#0B1E37] font-light">
                    <span className="font-semibold text-[#0B1E37] block mb-0.5">
                      Donor Directive:
                    </span>
                    <p className="italic">“{donation.specificOutreachDescription}”</p>
                  </div>
                )}

                <div className="text-[11px] text-slate-600 font-mono">
                  Frequency: {donation.frequency === 'monthly' ? 'Monthly Partner' : 'One-Time Contribution'}
                </div>
              </div>

              {donation.coverProcessingFee && (
                <div className="p-2.5 bg-slate-50/50 flex justify-between text-slate-600 text-xs">
                  <span>Voluntary Gateway Fee Coverage</span>
                  <span>{formatCurrency(donation.processingFeeAmount, donation.currency)}</span>
                </div>
              )}

              <div className="p-3 bg-[#0B1E37] text-white font-medium flex justify-between text-sm">
                <span>Total Tax-Deductible Contribution</span>
                <span className="font-mono font-bold text-[#F6864C]">{formatCurrency(donation.totalCharged, donation.currency)}</span>
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-[#0B1E37] space-y-1 leading-relaxed font-light">
            <p className="font-bold text-[#0B1E37] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              Charitable Substantiation Notice
            </p>
            <p>
              Realms of God Ministry is an authorized non-profit entity registered with the CAC (148291), SCUML (2021/49102), and IRS 501(c)(3). No goods or services were provided in exchange for this contribution other than intangible religious benefits. Retain this official receipt for tax filing purposes.
            </p>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 print:hidden">
          <span className="text-xs text-slate-600 font-mono font-medium">Share this mission:</span>

          <div className="flex items-center gap-2">
            <a
              href={shareUrls.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#F6864C] hover:bg-[#0B1E37] text-white text-xs font-medium flex items-center gap-1"
              title="Share to WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={handleCopyShare}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-200/40 text-[#0B1E37] border border-slate-200 text-xs font-mono flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-slate-600" /> : <Copy className="w-3 h-3 text-slate-600" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#F6864C] hover:bg-[#0B1E37] text-white text-xs font-bold cursor-pointer border border-[#F6864C]/50"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
