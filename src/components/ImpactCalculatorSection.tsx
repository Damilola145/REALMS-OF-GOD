import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Stethoscope, 
  GraduationCap, 
  ShoppingBag, 
  Car, 
  Home, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { CurrencyType } from '../types';
import { formatCurrency } from '../utils/receiptGenerator';

interface ImpactCalculatorSectionProps {
  onOpenDonate: (beneficiaryId?: string, beneficiaryName?: string, presetAmount?: number) => void;
}

export const ImpactCalculatorSection: React.FC<ImpactCalculatorSectionProps> = ({
  onOpenDonate,
}) => {
  const currency: CurrencyType = 'NGN';
  const [activeTierIdx, setActiveTierIdx] = useState<number>(1); // Default to Tier 2

  const tiersNGN = [
    {
      amount: 15000,
      label: '₦15,000',
      title: 'Family Relief & Sustenance Pack',
      subtitle: 'Nutritional security for a rural minister’s home',
      highlights: [
        { icon: ShoppingBag, title: '2-Week Staple Food Basket', desc: 'Rice, beans, yams, and cooking oil for pastor & 4 children.' },
        { icon: Stethoscope, title: 'Essential Clinical Meds', desc: 'Basic blood pressure & malaria treatments for 1 month.' },
      ],
      impactQuote: '“When our local village parish could not raise stipends, this relief basket kept my family nourished.” — Pastor Silas'
    },
    {
      amount: 45000,
      label: '₦45,000',
      title: 'Monthly Dialysis & Medical Care',
      subtitle: 'Lifesaving clinical support for acute organ failure',
      highlights: [
        { icon: Stethoscope, title: 'Clinical Dialysis & Diagnostics', desc: 'Direct payment to teaching hospital dialysis center.' },
        { icon: Heart, title: 'Specialized Prescription Meds', desc: 'Hypertension and nephrology pharmaceuticals.' },
      ],
      impactQuote: '“My dialysis sessions were guaranteed within 24 hours of notification. I can stand and preach again.” — Pastor Emmanuel'
    },
    {
      amount: 90000,
      label: '₦90,000',
      title: 'Orphan Education & Welfare Term',
      subtitle: 'Preventing school dropout for children of deceased pastors',
      highlights: [
        { icon: GraduationCap, title: 'Full Academic Term Tuition', desc: 'Primary & secondary enrollment fees paid to school bursar.' },
        { icon: ShoppingBag, title: 'Uniforms, Shoes & Textbooks', desc: 'Complete educational starter bundle and study materials.' },
      ],
      impactQuote: '“My 3 children are back at the top of their classes thanks to your generous education sponsorships.” — Sister Grace'
    },
    {
      amount: 180000,
      label: '₦180,000',
      title: 'Widow Livelihood & Trade Grant',
      subtitle: 'Dignified micro-enterprise startup for pastoral widows',
      highlights: [
        { icon: Home, title: 'Industrial Sewing Machine', desc: 'Commercial overlock and garment fabrication asset.' },
        { icon: ShoppingBag, title: 'Initial Fabric & Haberdashery Stock', desc: 'Wholesale textile inventory to begin trade immediately.' },
      ],
      impactQuote: '“I now run my own dressmaking shop and provide for my children without begging.” — Mama Eunice'
    },
    {
      amount: 350000,
      label: '₦350,000',
      title: 'Emergency Surgery & Hospital Stabilization',
      subtitle: 'Complete surgical intervention & 6-month parsonage shelter',
      highlights: [
        { icon: Stethoscope, title: 'Major Surgical Procedure', desc: 'Direct surgeon & hospital theatre settlement.' },
        { icon: Home, title: '6-Month Safe Housing Buffer', desc: 'Rent protection while recovering from physical trauma.' },
      ],
      impactQuote: '“A major spine surgery was settled in full. God used your hands to preserve our family’s shelter.” — Pastor Timothy'
    }
  ];

  const tiersUSD = [
    {
      amount: 25,
      label: '$25',
      title: 'Family Relief & Sustenance Pack',
      subtitle: 'Nutritional security for a rural minister’s home',
      highlights: [
        { icon: ShoppingBag, title: '2-Week Staple Food Basket', desc: 'Wholesome grains, staples, and fresh pantry provisions.' },
        { icon: Stethoscope, title: 'Essential Clinical Meds', desc: 'Basic blood pressure & emergency clinical medications.' },
      ],
      impactQuote: '“When our local village parish could not raise stipends, this relief basket kept my family nourished.” — Pastor Silas'
    },
    {
      amount: 60,
      label: '$60',
      title: 'Monthly Dialysis & Medical Care',
      subtitle: 'Lifesaving clinical support for acute organ failure',
      highlights: [
        { icon: Stethoscope, title: 'Clinical Dialysis & Diagnostics', desc: 'Direct payment to teaching hospital nephrology department.' },
        { icon: Heart, title: 'Specialized Prescription Meds', desc: 'Hypertension and kidney maintenance pharmaceuticals.' },
      ],
      impactQuote: '“My dialysis sessions were guaranteed within 24 hours of notification. I can stand and preach again.” — Pastor Emmanuel'
    },
    {
      amount: 120,
      label: '$120',
      title: 'Orphan Education & Welfare Term',
      subtitle: 'Preventing school dropout for children of deceased pastors',
      highlights: [
        { icon: GraduationCap, title: 'Full Academic Term Tuition', desc: 'Direct school tuition and exam fees settlement.' },
        { icon: ShoppingBag, title: 'Uniforms, Shoes & Textbooks', desc: 'Complete educational essentials and study materials.' },
      ],
      impactQuote: '“My 3 children are back at the top of their classes thanks to your generous education sponsorships.” — Sister Grace'
    },
    {
      amount: 250,
      label: '$250',
      title: 'Widow Livelihood & Trade Grant',
      subtitle: 'Dignified micro-enterprise startup for pastoral widows',
      highlights: [
        { icon: Home, title: 'Commercial Tailoring / Kiosk Assets', desc: 'Machinery and equipment for sustainable enterprise.' },
        { icon: ShoppingBag, title: 'Wholesale Starter Inventory', desc: 'Merchandise stock to start earning revenue immediately.' },
      ],
      impactQuote: '“I now run my own dressmaking shop and provide for my children without begging.” — Mama Eunice'
    },
    {
      amount: 500,
      label: '$500',
      title: 'Emergency Surgery & Hospital Stabilization',
      subtitle: 'Complete surgical intervention & 6-month parsonage shelter',
      highlights: [
        { icon: Stethoscope, title: 'Major Surgical Operation', desc: 'Direct surgical hospital bill payment and post-op care.' },
        { icon: Home, title: '6-Month Safe Housing Buffer', desc: 'Rent protection while the family stabilizes.' },
      ],
      impactQuote: '“A major spine surgery was settled in full. God used your hands to preserve our family’s shelter.” — Pastor Timothy'
    }
  ];

  const currentTiers = currency === 'NGN' ? tiersNGN : tiersUSD;
  const activeTier = currentTiers[activeTierIdx];

  const handleCommitImpact = () => {
    onOpenDonate(undefined, undefined, activeTier.amount);
  };

  return (
    <section id="impact-calculator" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E37] tracking-tight">
            See the exact impact of your generosity
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every contribution is mapped directly to verified field requirements. Select an amount below to see the lives touched and medical emergencies resolved.
          </p>

          {/* Currency Indicator */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-2xl border border-slate-200 shadow-xs mt-2 text-xs font-bold text-slate-600">
            <span>Denominated in Nigerian Naira (₦ NGN)</span>
          </div>
        </div>

        {/* Tier Selection Matrix Slider & Chips */}
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {currentTiers.map((tier, idx) => {
              const isSelected = activeTierIdx === idx;
              return (
                <button
                  key={tier.amount}
                  onClick={() => setActiveTierIdx(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all relative cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B1E37] text-white border-[#0B1E37] shadow-lg scale-102 ring-2 ring-[#F6864C]'
                      : 'bg-white text-[#0B1E37] border-slate-200 hover:border-[#F6864C] hover:shadow-xs'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-2.5 right-3 bg-[#F6864C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                      Selected
                    </span>
                  )}
                  <span className={`text-xs font-semibold block uppercase tracking-wider ${isSelected ? 'text-[#F6864C]' : 'text-slate-500'}`}>
                    Tier 0{idx + 1}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold block mt-1">
                    {tier.label}
                  </span>
                  <span className={`text-xs block mt-1 line-clamp-1 ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                    {tier.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Tier Spotlight Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-50 text-[#0B1E37] text-xs font-bold border border-slate-200">
                    Contribution: {activeTier.label} ({currency})
                  </span>
                  <span className="text-xs text-slate-600 font-medium">100% Direct Field Settlement</span>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1E37]">
                  {activeTier.title}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {activeTier.subtitle}
                </p>
              </div>

              {/* Tangible Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {activeTier.highlights.map((h, i) => {
                  const Icon = h.icon;
                  return (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="w-8 h-8 rounded-xl bg-[#F6864C]/15 text-[#F6864C] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-[#0B1E37] text-sm">
                        {h.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">
                        {h.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Real Testimony Quote */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-[#0B1E37] italic leading-relaxed">
                {activeTier.impactQuote}
              </div>

            </div>

            {/* Right Column: Instant Action Commitment Card */}
            <div className="lg:col-span-5 bg-[#0B1E37] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 flex flex-col justify-between border border-[#F6864C]/30">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F6864C] text-xs font-semibold border border-[#F6864C]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Immediate Field Deployment</span>
                </div>

                <div>
                  <span className="text-xs text-slate-300 uppercase tracking-wider block font-semibold">
                    Your Generosity Amount
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F6864C] mt-1">
                    {activeTier.label}
                    <span className="text-sm font-sans font-normal text-white ml-2">
                      {currency}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-white">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F6864C] shrink-0" />
                    <span>Direct settlement with hospitals & suppliers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F6864C] shrink-0" />
                    <span>Instant downloadable tax receipt</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#F6864C] shrink-0" />
                    <span>Quarterly progress update from field coordinator</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/15">
                <button
                  onClick={handleCommitImpact}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#F6864C] hover:bg-[#E07238] border border-[#F6864C] text-white font-bold text-sm transition-all shadow-lg hover:shadow-[#F6864C]/30 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>Sponsor This Package Now</span>
                </button>

                <p className="text-center text-[11px] text-slate-300">
                  Secured via Paystack, Verve, Mastercard & Bank Transfer
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
