import React, { useState } from 'react';
import { 
  Heart 
} from 'lucide-react';
import { CurrencyType } from '../types';

interface QuickDonationSectionProps {
  onOpenDonate: (beneficiaryId?: string, beneficiaryName?: string, presetAmount?: number) => void;
}

export const QuickDonationSection: React.FC<QuickDonationSectionProps> = ({
  onOpenDonate,
}) => {
  const currency: CurrencyType = 'NGN';
  const [selectedAmount, setSelectedAmount] = useState<number>(25000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedDesignation, setSelectedDesignation] = useState<string>('urgent_pastor');

  const presets = [10000, 25000, 50000, 100000, 250000];

  const handleQuickDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (finalAmount > 0) {
      if (selectedDesignation === 'urgent_pastor') {
        onOpenDonate('ben-01', 'Pastor Emmanuel Adebayo', finalAmount);
      } else if (selectedDesignation === 'urgent_widow') {
        onOpenDonate('ben-02', 'Sister Grace Mthembu', finalAmount);
      } else if (selectedDesignation === 'orphan_fund') {
        onOpenDonate('ben-04', 'Children of Late Pastor David Okafor', finalAmount);
      } else {
        onOpenDonate(undefined, undefined, finalAmount);
      }
    }
  };

  return (
    <section id="direct-giving" className="py-16 lg:py-24 bg-[#0B1E37] text-slate-100 border-b border-[#1A3356] relative overflow-hidden">
      {/* Ambient background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#173760]/60 via-[#0B1E37] to-[#061120] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Context Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142B4B] border border-[#F6864C]/30 text-slate-200 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#F6864C] animate-pulse" />
              <span className="text-[#F6864C] font-semibold">Immediate Direct Benevolence</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Support a Minister with <span className="text-[#F6864C] italic font-normal">Immediate Relief</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Choose an urgent case or give to the general ministerial relief fund. 100% of your designated contribution goes directly to the healthcare facility, school bursar, or certified minister’s family across Nigeria.
            </p>
          </div>

          {/* Right Column: The Giving Box */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-[#0B1E37] border border-slate-200 relative">
              
              {/* Box Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1E37]">
                    Make an Impact Today
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Direct benevolence with instant verifiable receipt
                  </p>
                </div>

                {/* Currency Indicator */}
                <div className="flex items-center px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-[#0B1E37]">
                  <span>₦ NGN (Naira)</span>
                </div>
              </div>

              {/* Giving Form */}
              <form onSubmit={handleQuickDonate} className="mt-5 space-y-4">
                
                {/* Designation Target */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Direct Contribution To:
                  </label>
                  <select
                    value={selectedDesignation}
                    onChange={(e) => setSelectedDesignation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-[#0B1E37] font-medium focus:outline-none focus:ring-2 focus:ring-[#F6864C]"
                  >
                    <option value="urgent_pastor">🚨 Pastor Emmanuel Adebayo (Urgent Kidney Dialysis)</option>
                    <option value="urgent_widow">🧵 Sister Grace Mthembu (Widow Housing & Tailoring)</option>
                    <option value="orphan_fund">🎓 Children of Late Pastor David (Orphan Tuition)</option>
                    <option value="general">❤️ Most Urgent Pastoral Need (General Benevolence)</option>
                  </select>
                </div>

                {/* Amount Presets */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    <span>Select Amount (₦)</span>
                    <span className="text-[#F6864C] font-semibold">₦ NGN</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {presets.slice(0, 3).map((amt) => {
                      const isSelected = selectedAmount === amt && !customAmount;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0B1E37] text-white border-[#0B1E37] shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-[#F6864C] hover:text-[#0B1E37]'
                          }`}
                        >
                          ₦{amt.toLocaleString()}
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {presets.slice(3, 5).map((amt) => {
                      const isSelected = selectedAmount === amt && !customAmount;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0B1E37] text-white border-[#0B1E37] shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-[#F6864C] hover:text-[#0B1E37]'
                          }`}
                        >
                          ₦{amt.toLocaleString()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Or Enter Custom Amount (₦)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="e.g. 75000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-[#0B1E37] placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#F6864C]"
                    />
                  </div>
                </div>

                {/* Submit Action CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#F6864C] hover:bg-[#e07238] active:bg-[#c95f29] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[#F6864C]/30 active:scale-[0.99] cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>
                    Proceed with ₦
                    {customAmount
                      ? parseFloat(customAmount || '0').toLocaleString()
                      : selectedAmount.toLocaleString()}
                  </span>
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
