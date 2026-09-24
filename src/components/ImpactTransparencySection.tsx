import React from 'react';
import { 
  ShieldCheck, 
  FileCheck, 
  Eye, 
  Users, 
  CheckCircle2,
  ArrowRight,
  Award,
  Lock,
  Building,
  HeartHandshake
} from 'lucide-react';
import { TAX_EXEMPT_ID } from '../utils/receiptGenerator';

export const ImpactTransparencySection: React.FC = () => {
  const pillars = [
    {
      step: '01',
      title: 'Presbytery & District Vetting',
      description: 'Every pastoral hardship appeal is inspected on the ground by district presbyteries, ministerial councils, and village parish leadership.'
    },
    {
      step: '02',
      title: 'Direct Institution Settlement',
      description: 'Hospital dialysis fees, surgeries, pharmaceuticals, and school tuition are disbursed directly to registered healthcare and educational institutions.'
    },
    {
      step: '03',
      title: '100% Designated Gift Promise',
      description: 'When you donate to an individual pastor, widow, or orphan, 100% of the funds are locked exclusively to their verified relief budget.'
    },
    {
      step: '04',
      title: 'Quarterly Audited Reports',
      description: 'Donors receive instant 501(c)(3) tax receipts with CAC/SCUML credentials and access to regular financial accountability reviews.'
    }
  ];

  const missionAreas = [
    {
      title: 'Struggling Rural Pastors',
      desc: 'Critical medical procedures, dialysis care, and emergency family sustenance for pioneer frontline ministers.',
      tag: 'Medical & Sustenance'
    },
    {
      title: 'Widows of Pastors',
      desc: 'Safe rent protection, dignity living stipends, and micro-grant equipment to launch independent tailoring or food stores.',
      tag: 'Housing & Enterprise'
    },
    {
      title: 'Orphans of Ministers',
      desc: 'Full annual tuition coverage, textbooks, uniforms, and nutritional care packages to ensure zero school dropouts.',
      tag: 'Education Grant'
    },
    {
      title: 'Frontier Missionaries',
      desc: 'Emergency provisions, logistics, transit repair, and medical outposts across remote wilderness settlements.',
      tag: 'Field Outreach'
    }
  ];

  return (
    <section id="transparency" className="py-16 lg:py-24 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2FA] border border-[#0B1E37]/15 text-[#0B1E37] text-xs font-semibold mx-auto">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F6864C]" />
            <span>Audited Accountability Framework</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E37] tracking-tight">
            The 100% Direct Impact Model
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            We hold every contribution as a sacred covenant before God and our donors. Our audited operational framework guarantees maximum relief delivery with zero administrative bloat.
          </p>
        </div>

        {/* Bento Grid: Focus Areas */}
        <div id="mission" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {missionAreas.map((area, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-[#E2E8F0] hover:border-[#F6864C]/50 hover:shadow-md shadow-xs flex flex-col space-y-3 transition-all">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0B1E37] text-[10px] font-bold border border-slate-200 inline-block shadow-xs">
                  {area.tag}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0B1E37]">
                  {area.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {area.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
