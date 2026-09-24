import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageCircle, 
  FileCheck
} from 'lucide-react';
import { Beneficiary } from '../types';
import { formatCurrency } from '../utils/receiptGenerator';
import { getShareUrls, copyToClipboard } from '../utils/socialShare';
import { BeneficiaryCaseHeader } from './BeneficiaryCaseHeader';

interface BeneficiaryDetailModalProps {
  beneficiary: Beneficiary | null;
  onClose: () => void;
  onDonate: (beneficiary: Beneficiary) => void;
}

export const BeneficiaryDetailModal: React.FC<BeneficiaryDetailModalProps> = ({
  beneficiary,
  onClose,
  onDonate,
}) => {
  const [copied, setCopied] = useState(false);

  if (!beneficiary) return null;

  const percentFunded = Math.min(100, Math.round((beneficiary.raisedAmount / beneficiary.targetAmount) * 100));
  const remaining = Math.max(0, beneficiary.targetAmount - beneficiary.raisedAmount);

  const shareUrls = getShareUrls({
    title: `Sponsor ${beneficiary.name} - The Realm of God Ministry`,
    text: `Support ${beneficiary.name} (${beneficiary.roleTitle}). ${beneficiary.shortSummary}`,
  });

  const handleCopy = async () => {
    const success = await copyToClipboard(
      `Please help sponsor ${beneficiary.name} (${beneficiary.roleTitle}) through The Realm of God Ministry. ${beneficiary.shortSummary} Give securely: https://therealmofgodministry.org/`
    );
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Beneficiary Profile
            </span>
            {beneficiary.urgent && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#0B1E37] text-[#F6864C] text-[11px] font-mono flex items-center gap-1 border border-[#F6864C]/40 font-bold">
                <AlertCircle className="w-3 h-3 text-[#F6864C]" />
                Urgent Priority
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-[#0B1E37] hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 bg-white">
          
          {/* Official Beneficiary Case Dossier (Presbytery Certified, Pastoral Dignity Protected) */}
          <BeneficiaryCaseHeader beneficiary={beneficiary} size="modal" />

          {/* Funding Status Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif text-sm font-bold text-[#0B1E37]">
                {formatCurrency(beneficiary.raisedAmount)} <span className="font-sans font-normal text-xs text-slate-500">raised of {formatCurrency(beneficiary.targetAmount)} goal</span>
              </span>
              <span className="font-mono text-xs font-bold text-[#F6864C]">{percentFunded}%</span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full bg-[#F6864C] rounded-full transition-all duration-300"
                style={{ width: `${percentFunded}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono font-medium">
              <span>{beneficiary.donorsCount} contributors</span>
              <span className="text-[#0B1E37] font-semibold">{formatCurrency(remaining)} remaining</span>
            </div>
          </div>

          {/* Full Narrative Biography */}
          <div className="space-y-2.5">
            <h3 className="font-serif font-bold text-base text-[#0B1E37] border-b border-slate-100 pb-1.5">
              Field Background &amp; Situation
            </h3>
            <div className="text-xs sm:text-sm text-slate-700 space-y-2.5 leading-relaxed font-normal">
              {beneficiary.fullStory.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Immediate Needs Checklist */}
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-base text-[#0B1E37]">
              Immediate Requirements Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {beneficiary.immediateNeeds.map((need, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-[#0B1E37] flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F6864C] shrink-0" />
                  <span>{need}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Transparency Notes */}
          <div className="p-3.5 rounded-xl bg-[#EBF2FA] border border-[#0B1E37]/15 space-y-1.5 text-xs text-[#0B1E37]">
            <div className="flex items-center gap-1.5 font-bold text-[#0B1E37]">
              <FileCheck className="w-3.5 h-3.5 text-[#F6864C]" />
              <span>Direct Disbursement Protocol</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              100% of contributions designated to this minister are settled directly to their local hospital, educational institution, or landlord with audited field receipts provided to donors.
            </p>
          </div>

          {/* Share Box */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-xs text-slate-600 font-mono font-medium">Share this appeal:</span>
            <div className="flex items-center gap-2">
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-medium flex items-center gap-1 shadow-xs"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#0B1E37] border border-slate-200 text-[11px] font-mono flex items-center gap-1 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3 h-3 text-[#F6864C]" /> : <Copy className="w-3 h-3 text-slate-500" />}
                <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-[#0B1E37] hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onDonate(beneficiary);
            }}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#F6864C] hover:bg-[#e07238] active:bg-[#c95f29] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>Support {beneficiary.name} Directly</span>
          </button>
        </div>

      </div>
    </div>
  );
};
