import React from 'react';
import { 
  ShieldCheck, 
  Church, 
  HeartHandshake, 
  GraduationCap, 
  Compass, 
  Activity, 
  CheckCircle2,
  Award
} from 'lucide-react';
import { Beneficiary, BeneficiaryCategory } from '../types';

interface BeneficiaryCaseHeaderProps {
  beneficiary: Beneficiary;
  size?: 'card' | 'modal';
}

// Category visual themes: dignified heraldic colors, icons & titles
const CATEGORY_THEMES: Record<BeneficiaryCategory, {
  label: string;
  bgGradient: string;
  crestBg: string;
  crestBorder: string;
  accentText: string;
  icon: React.ElementType;
  watermarkIcon: React.ElementType;
}> = {
  pastor: {
    label: 'Frontline Minister',
    bgGradient: 'from-[#0B1E37] via-[#142D4F] to-[#0A1728]',
    crestBg: 'bg-[#18365E]',
    crestBorder: 'border-[#F6864C]/50',
    accentText: 'text-[#F6864C]',
    icon: Church,
    watermarkIcon: Church,
  },
  widow: {
    label: "Ministers' Widow Relief",
    bgGradient: 'from-[#2A1625] via-[#1E1933] to-[#0D1322]',
    crestBg: 'bg-[#3D1E35]',
    crestBorder: 'border-rose-400/50',
    accentText: 'text-rose-300',
    icon: HeartHandshake,
    watermarkIcon: HeartHandshake,
  },
  orphan: {
    label: 'Orphan Education Care',
    bgGradient: 'from-[#0F2838] via-[#15344D] to-[#0A1A26]',
    crestBg: 'bg-[#1A415F]',
    crestBorder: 'border-amber-400/50',
    accentText: 'text-amber-300',
    icon: GraduationCap,
    watermarkIcon: GraduationCap,
  },
  evangelist: {
    label: 'Frontier Outreach',
    bgGradient: 'from-[#112922] via-[#16362D] to-[#091713]',
    crestBg: 'bg-[#1C4539]',
    crestBorder: 'border-emerald-400/50',
    accentText: 'text-emerald-300',
    icon: Compass,
    watermarkIcon: Compass,
  },
  emergency_medical: {
    label: 'Emergency Medical Care',
    bgGradient: 'from-[#2C1417] via-[#201724] to-[#0D121B]',
    crestBg: 'bg-[#401C20]',
    crestBorder: 'border-red-400/50',
    accentText: 'text-red-300',
    icon: Activity,
    watermarkIcon: Activity,
  },
};

export const BeneficiaryCaseHeader: React.FC<BeneficiaryCaseHeaderProps> = ({
  beneficiary,
  size = 'card',
}) => {
  const theme = CATEGORY_THEMES[beneficiary.category] || CATEGORY_THEMES.pastor;
  const CategoryIcon = theme.icon;
  const WatermarkIcon = theme.watermarkIcon;

  // Derive monogram initials from beneficiary name
  const initials = beneficiary.name
    .split(' ')
    .filter(word => !['Pastor', 'Sister', 'Brother', 'Rev', 'Late', 'Evangelist', 'Children', 'of', '&', 'and'].includes(word))
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase() || 'RG';

  if (size === 'card') {
    return (
      <div className={`relative h-44 sm:h-48 w-full overflow-hidden bg-gradient-to-br ${theme.bgGradient} p-5 flex flex-col justify-between border-b border-white/10 select-none`}>
        
        {/* Subtle Security Guilloche Texture / Watermark Background */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />
        <WatermarkIcon className="absolute -right-8 -bottom-8 w-44 h-44 text-white/5 pointer-events-none" />

        {/* Top Row: Category Label + Urgent / Verification Badge */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.accentText}`}>
            {theme.label}
          </span>

          <div className="flex items-center gap-1.5">
            {beneficiary.urgent ? (
              <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-200 text-[10px] font-bold flex items-center gap-1 shadow-sm border border-red-500/40 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Urgent Priority
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 text-[10px] font-semibold flex items-center gap-1 border border-emerald-500/30 backdrop-blur-sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Presbytery Vetted
              </span>
            )}
          </div>
        </div>

        {/* Middle: Official Heraldic Monogram Crest & Pastoral Category */}
        <div className="relative z-10 flex items-center gap-3.5 my-auto py-1">
          
          {/* Circular Wax-Seal / Crest Badge */}
          <div className="relative shrink-0">
            <div className={`w-14 h-14 rounded-2xl ${theme.crestBg} border-2 ${theme.crestBorder} flex flex-col items-center justify-center shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform`}>
              <CategoryIcon className={`w-5 h-5 ${theme.accentText} mb-0.5`} />
              <span className="text-[11px] font-mono font-bold text-white tracking-widest leading-none">
                {initials}
              </span>
            </div>
            
            {/* Presbytery Audit Tick Seal */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0B1E37] border border-[#F6864C] flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-3 h-3 text-[#F6864C]" />
            </div>
          </div>

          {/* Case Designation Info */}
          <div className="space-y-0.5 flex-1 min-w-0">
            <h4 className="font-serif text-lg font-bold text-white truncate drop-shadow-sm">
              {beneficiary.name}
            </h4>
            <p className="text-xs text-slate-300 truncate font-medium">
              {beneficiary.roleTitle}
            </p>
          </div>

        </div>

      </div>
    );
  }

  // Modal Detailed Dossier Header
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-br ${theme.bgGradient} p-6 sm:p-7 text-white border border-white/15 shadow-xl select-none`}>
      
      {/* Background Watermark & Certificate Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      <WatermarkIcon className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        
        {/* Top Header Row: Category Tag + Urgent Badge */}
        <div className="flex items-center justify-between gap-2 pb-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${theme.accentText}`}>
            {theme.label}
          </span>
          {beneficiary.urgent && (
            <span className="px-3 py-1 rounded-full bg-red-950/90 border border-red-500/50 text-red-200 text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span>Urgent Priority</span>
            </span>
          )}
        </div>

        {/* Profile Middle Section: Heraldic Crest + Beneficiary Credentials */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          
          {/* Heraldic Emblem Crest */}
          <div className="relative shrink-0">
            <div className={`w-20 h-20 rounded-2xl ${theme.crestBg} border-2 ${theme.crestBorder} flex flex-col items-center justify-center shadow-2xl relative`}>
              <CategoryIcon className={`w-8 h-8 ${theme.accentText} mb-0.5`} />
              <span className="text-sm font-mono font-bold text-white tracking-widest leading-none">
                {initials}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0B1E37] border-2 border-[#F6864C] flex items-center justify-center shadow-md">
              <Award className="w-4 h-4 text-[#F6864C]" />
            </div>
          </div>

          {/* Narrative Credentials */}
          <div className="space-y-1.5 flex-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {beneficiary.name}
            </h2>
            <p className="text-sm text-slate-200 font-medium">
              {beneficiary.roleTitle}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
