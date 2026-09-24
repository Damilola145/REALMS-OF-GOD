import React from 'react';
import { 
  Heart, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Beneficiary } from '../types';
import { BeneficiaryCaseHeader } from './BeneficiaryCaseHeader';

interface BeneficiaryStoriesSectionProps {
  beneficiaries: Beneficiary[];
  onSelectBeneficiary: (beneficiary: Beneficiary) => void;
  onDonateToBeneficiary: (beneficiary: Beneficiary) => void;
}

export const BeneficiaryStoriesSection: React.FC<BeneficiaryStoriesSectionProps> = ({
  beneficiaries,
  onSelectBeneficiary,
  onDonateToBeneficiary,
}) => {
  return (
    <section id="stories" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2FA] border border-[#0B1E37]/15 text-[#0B1E37] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#F6864C]" />
              <span>Direct Benevolence Cases</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E37] tracking-tight">
              Verified Beneficiary Profiles
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Every appeal undergoes in-person verification by local presbyteries, district overseers, and registered healthcare facilities. You can designate your gift directly to a specific minister or family below.
            </p>
          </div>
        </div>

        {/* Beneficiaries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {beneficiaries.map((beneficiary) => {
            return (
              <div
                key={beneficiary.id}
                id={`beneficiary-card-${beneficiary.id}`}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-xl hover:border-[#F6864C]/50 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Official Case Dossier Header (Presbytery Vetted, No AI Portraits) */}
                <BeneficiaryCaseHeader beneficiary={beneficiary} size="card" />

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-[#0B1E37] group-hover:text-[#F6864C] transition-colors leading-snug">
                      {beneficiary.name}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {beneficiary.shortSummary}
                    </p>

                    {/* Immediate Itemized Needs Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {beneficiary.immediateNeeds.slice(0, 2).map((need, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-semibold border border-slate-200 truncate max-w-full">
                          &bull; {need}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => onSelectBeneficiary(beneficiary)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-[#0B1E37] bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#0B1E37]" />
                      <span>Read Story</span>
                    </button>

                    <button
                      onClick={() => onDonateToBeneficiary(beneficiary)}
                      className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#F6864C] hover:bg-[#e07238] active:bg-[#c95f29] transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Sponsor Now</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
