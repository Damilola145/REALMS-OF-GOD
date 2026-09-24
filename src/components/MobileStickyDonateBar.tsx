import React from 'react';
import { Heart, Receipt } from 'lucide-react';

interface MobileStickyDonateBarProps {
  onOpenDonate: () => void;
  onOpenReceipts: () => void;
}

export const MobileStickyDonateBar: React.FC<MobileStickyDonateBarProps> = ({
  onOpenDonate,
  onOpenReceipts,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg safe-area-bottom">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={onOpenReceipts}
          className="p-2.5 rounded-xl bg-slate-50 text-[#0B1E37] hover:bg-slate-200/50 text-xs font-medium flex items-center justify-center border border-slate-200 shrink-0 cursor-pointer"
          title="My Tax Receipts"
          aria-label="View Tax Receipts"
        >
          <Receipt className="w-4 h-4 text-slate-600" />
        </button>

        <button
          onClick={onOpenDonate}
          className="flex-1 py-2.5 px-4 rounded-full bg-[#F6864C] hover:bg-[#0B1E37] text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-md cursor-pointer border border-[#F6864C]/50"
        >
          <Heart className="w-3.5 h-3.5 fill-white text-[#F6864C]" />
          <span>Donate</span>
        </button>
      </div>
    </div>
  );
};
