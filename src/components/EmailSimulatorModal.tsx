import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Check, 
  Send, 
  FileText, 
  ShieldCheck, 
  Download, 
  Clock
} from 'lucide-react';
import { DonationRecord } from '../types';
import { 
  formatCurrency, 
  MINISTRY_NAME, 
  MINISTRY_ADDRESS 
} from '../utils/receiptGenerator';

interface EmailSimulatorModalProps {
  donation: DonationRecord | null;
  onClose: () => void;
  onViewOfficialReceipt: (donation: DonationRecord) => void;
}

export const EmailSimulatorModal: React.FC<EmailSimulatorModalProps> = ({
  donation,
  onClose,
  onViewOfficialReceipt,
}) => {
  const [isResent, setIsResent] = useState(false);

  if (!donation) return null;

  const handleResend = () => {
    setIsResent(true);
    setTimeout(() => setIsResent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Email Window Header */}
        <div className="px-5 py-3.5 bg-[#0B1E37] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#F6864C] flex items-center gap-1.5 font-bold">
              <Mail className="w-3.5 h-3.5 text-[#F6864C]" />
              Automated Email Dispatch &bull; Donor Transparency Simulator
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Headers */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-1 font-mono text-[11px]">
              <div>
                <span className="text-slate-600">From: </span>
                <span className="font-bold text-[#0B1E37]">Realms of God Ministry &lt;receipts@realmsofgodministry.org&gt;</span>
              </div>
              <div>
                <span className="text-slate-600">To: </span>
                <span className="font-bold text-[#0B1E37]">{donation.donorName} &lt;{donation.donorEmail}&gt;</span>
              </div>
            </div>
            
            <button
              onClick={handleResend}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-200/30 text-[#0B1E37] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer font-semibold"
            >
              {isResent ? (
                <>
                  <Check className="w-3 h-3 text-slate-600" />
                  <span className="text-slate-600 font-bold">Dispatched!</span>
                </>
              ) : (
                <>
                  <Send className="w-3 h-3 text-slate-600" />
                  <span>Resend Email</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[#0B1E37]">
            <div>
              <span className="text-slate-600 font-mono text-[11px] font-semibold">Subject: </span>
              <span className="font-bold text-[#0B1E37] text-xs">
                Official Tax Receipt #{donation.receiptNumber}: Your Contribution to {MINISTRY_NAME}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1 font-semibold">
              <Clock className="w-3 h-3 text-slate-600" /> Dispatched
            </span>
          </div>
        </div>

        {/* Rendered HTML Email Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 bg-white font-sans text-[#0B1E37] text-xs sm:text-sm">
          
          {/* Email Branding */}
          <div className="text-center pb-4 border-b border-slate-200 space-y-1">
            <div className="w-9 h-9 rounded-lg bg-[#0B1E37] text-[#F6864C] flex items-center justify-center font-serif text-base font-bold mx-auto">
              †
            </div>
            <h2 className="font-serif font-bold text-base text-[#0B1E37]">
              Realms of God Ministry
            </h2>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 font-semibold">
              Benevolence for Gospel Servants, Widows & Orphans
            </p>
          </div>

          {/* Salutation */}
          <div className="space-y-2">
            <p className="font-bold text-[#0B1E37]">
              Dear {donation.donorName},
            </p>
            <p className="text-[#0B1E37] leading-relaxed font-light">
              Thank you sincerely for your contribution of <strong className="text-[#0B1E37] font-bold">{formatCurrency(donation.totalCharged, donation.currency)}</strong>. Your gift directly strengthens the hands of God’s servants who labor in challenging mission fields and provides essential relief to struggling pastors, widows, and orphans.
            </p>
          </div>

          {/* Receipt Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-mono text-[#0B1E37] text-[11px] uppercase tracking-wider font-bold">Contribution Summary</span>
              <span className="font-mono text-slate-600 font-bold">#{donation.receiptNumber}</span>
            </div>

            <div className="space-y-1.5 font-light">
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Designation:</span>
                <span className="font-bold text-[#0B1E37]">{donation.designationCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Base Contribution:</span>
                <span className="font-bold text-[#0B1E37]">{formatCurrency(donation.amount, donation.currency)}</span>
              </div>
              {donation.coverProcessingFee && (
                <div className="flex justify-between">
                  <span className="text-slate-600 font-medium">Processing Fee Covered by Donor:</span>
                  <span className="font-bold text-[#0B1E37]">{formatCurrency(donation.processingFeeAmount, donation.currency)}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-slate-200 font-medium text-xs text-[#0B1E37]">
                <span className="font-bold">Total Tax-Deductible Contribution:</span>
                <span className="font-mono font-bold text-slate-600">{formatCurrency(donation.totalCharged, donation.currency)}</span>
              </div>
            </div>

            {donation.specificOutreachDescription && (
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-[#0B1E37] block mb-0.5">Your Specific Outreach Allocation Note:</span>
                <p className="italic text-slate-600 font-light">“{donation.specificOutreachDescription}”</p>
              </div>
            )}
          </div>

          {/* Attached PDF Badge */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs text-[#0B1E37] font-bold">
                  Official_Tax_Receipt_{donation.receiptNumber}.pdf
                </div>
                <div className="text-[10px] text-slate-600 font-mono">
                  128 KB &bull; Audited &bull; 501(c)(3) Compliant
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewOfficialReceipt(donation)}
              className="px-2.5 py-1.5 rounded-lg bg-[#F6864C] hover:bg-[#0B1E37] text-white text-xs font-bold flex items-center gap-1 cursor-pointer border border-[#F6864C]/50"
            >
              <Download className="w-3 h-3 text-[#F6864C]" />
              <span>View & Print</span>
            </button>
          </div>

          {/* Signoff */}
          <div className="space-y-1 pt-1 text-xs text-slate-600 font-light">
            <p className="font-serif italic text-xs text-[#0B1E37] font-medium">
              “Whoever gives one of these little ones even a cup of cold water in the name of a disciple, truly I say to you, he will by no means lose his reward.” — Matthew 10:42
            </p>
            <p className="pt-2 font-bold text-[#0B1E37]">
              With prayers and gratitude,
            </p>
            <p className="text-[#0B1E37]">Realms of God Ministry Benevolence Board</p>
            <p className="text-[10px] text-slate-600 font-mono">{MINISTRY_ADDRESS}</p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-600 font-mono flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            Verified Automated Transactional Mailer
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-[#F6864C] text-white text-xs font-bold hover:bg-[#0B1E37] cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
