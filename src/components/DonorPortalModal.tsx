import React, { useState } from 'react';
import { 
  X, 
  Receipt, 
  Search, 
  ShieldCheck, 
  FileText,
  Heart
} from 'lucide-react';
import { DonationRecord } from '../types';
import { getStoredDonations, formatCurrency, formatDate } from '../utils/receiptGenerator';

interface DonorPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReceipt: (donation: DonationRecord) => void;
  onDonateAgain: () => void;
}

export const DonorPortalModal: React.FC<DonorPortalModalProps> = ({
  isOpen,
  onClose,
  onSelectReceipt,
  onDonateAgain,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const allDonations = getStoredDonations();

  if (!isOpen) return null;

  const filtered = allDonations.filter((d) => 
    d.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.donorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.designationCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDonated = allDonations.reduce((sum, d) => sum + d.totalCharged, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#0B1E37]">
              Tax Receipts & Giving Ledger
            </h3>
            <p className="text-[11px] text-slate-600 font-mono">
              Official Charitable Records & Transparency Archive
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0B1E37] hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-white/70">
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-bold block">
                Total Contributions Logged
              </span>
              <div className="font-serif text-xl font-bold text-[#0B1E37] mt-0.5">
                {formatCurrency(totalDonated)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-bold block">
                Receipts Generated
              </span>
              <div className="font-serif text-xl font-bold text-[#0B1E37] mt-0.5">
                {allDonations.length}
              </div>
            </div>
          </div>

          {/* Search Filter */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by receipt # (e.g. RGM-2026-...), email, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white/30 text-[#0B1E37] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F6864C] focus:bg-white"
            />
          </div>

          {/* Donations List */}
          {allDonations.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-5 space-y-2.5">
              <Receipt className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="font-serif font-bold text-[#0B1E37] text-sm">No recorded contributions found</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-light">
                When you make a contribution to support pastors, widows, or orphans, your tax receipt will be stored securely here.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onDonateAgain();
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-[#F6864C] hover:bg-[#0B1E37] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer border border-[#F6864C]/50"
              >
                <Heart className="w-3.5 h-3.5 fill-white text-[#F6864C]" />
                <span>Make a Contribution</span>
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-600 font-mono">
              No receipts matched your search query "{searchQuery}".
            </div>
          ) : (
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block font-bold">
                Recorded Receipts ({filtered.length})
              </span>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {filtered.map((d) => (
                  <div
                    key={d.id}
                    className="p-3.5 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#0B1E37] font-bold bg-white border border-[#F6864C] px-1.5 py-0.5 rounded">
                          #{d.receiptNumber}
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono">
                          {formatDate(d.timestamp)}
                        </span>
                      </div>

                      <div className="font-bold text-xs text-[#0B1E37]">
                        {d.designationCategory}
                      </div>

                      {d.specificOutreachDescription && (
                        <p className="text-xs text-slate-600 italic line-clamp-1 font-light">
                          “{d.specificOutreachDescription}”
                        </p>
                      )}

                      <div className="text-[10px] text-slate-500 font-mono">
                        {d.donorName} &bull; {d.donorEmail}
                      </div>
                    </div>

                    <div className="text-right space-y-1.5">
                      <div className="font-mono font-bold text-xs text-[#0B1E37]">
                        {formatCurrency(d.totalCharged)}
                      </div>
                      
                      <button
                        onClick={() => {
                          onClose();
                          onSelectReceipt(d);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#F6864C] hover:bg-[#0B1E37] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3 h-3 text-[#F6864C]" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-[#0B1E37]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            Official Tax Records
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200/40 border border-slate-200 text-[#0B1E37] text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
