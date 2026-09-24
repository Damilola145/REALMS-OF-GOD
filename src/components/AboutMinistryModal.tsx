import React, { useEffect } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  BookOpen, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Sparkles,
  Award
} from 'lucide-react';

interface AboutMinistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDonate: () => void;
  onOpenNominate: () => void;
}

export const AboutMinistryModal: React.FC<AboutMinistryModalProps> = ({
  isOpen,
  onClose,
  onOpenDonate,
  onOpenNominate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F6864C]/10 text-[#F6864C] text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                1-Year Milestone & Vision
              </span>
              <span className="text-[11px] font-mono text-slate-600">Est. 2025</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1E37] tracking-tight">
              About Realms of God Ministry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              A sacred covenant to stand with late pastors’ widows and vulnerable servants of God.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-600 hover:text-[#0B1E37] hover:bg-slate-200/50 transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1 text-[#0B1E37]">
          
          {/* Visual Highlight Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
            <div className="rounded-xl overflow-hidden aspect-[16/9] relative group bg-slate-950">
              <img 
                src="/grouppicture1.jpg" 
                alt="Visionary fellowship with widows"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/images/grouppicture1')) {
                    target.src = '/images/grouppicture1.jpg';
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-[#0B1E37]/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-mono flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#F6864C]" />
                Field Fellowship Gathering
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-[16/9] relative group bg-slate-950">
              <img 
                src="/grouppicture2.jpg" 
                alt="Joy and dignity restored"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/images/grouppicture2')) {
                    target.src = '/images/grouppicture2.jpg';
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 bg-[#0B1E37]/85 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-mono flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 text-[#F6864C]" />
                12+ Months of Active Outreach
              </div>
            </div>
          </div>

          {/* Section 1: The Origin Story */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#F6864C]">
              <BookOpen className="w-4 h-4" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                The Divine Burden • How It Began Over A Year Ago
              </h3>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1E37]">
              When the Shepherd Passes, Who Cares for His Family?
            </h4>
            <div className="prose prose-slate text-sm sm:text-base leading-relaxed text-slate-700 space-y-3">
              <p>
                Across thousands of rural and suburban congregations, dedicated men and women of God pour out their youth, health, and finances to shepherd souls—often receiving little to no formal remuneration or retirement pension. When tragedy strikes and a pastor dies, his grieving widow is often faced with an agonizing reality: sudden eviction from church parsonages, abrupt loss of community standing, and children on the verge of dropping out of school.
              </p>
              <p>
                Over a year ago, this heartbreaking silence became a divine conviction for the visionary of <strong>Realms of God Ministry</strong>. Instead of waiting for institutional policy or committee reports, he began physically visiting the homes of late pastors’ wives, sitting on their living room floors, listening to their untold stories of grief, and providing immediate, dignified relief.
              </p>
            </div>
          </div>

          {/* Visionary Quote Callout */}
          <div className="p-5 rounded-2xl bg-[#0B1E37] text-white space-y-3 border-l-4 border-[#F6864C] shadow-sm">
            <p className="font-serif italic text-base sm:text-lg text-slate-100 leading-relaxed">
              &ldquo;These mothers are not charity statistics. Their late husbands stood in prayer for our communities, conducted our weddings, and dedicated our infants. When they pass on, honoring their wives is not optional generosity—it is our sacred Christian duty.&rdquo;
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
              <span className="font-mono text-[#F6864C] font-semibold">Dr. Franklyn Akinyosoye &bull; Visionary, Realms of God Ministry</span>
              <span className="text-slate-400 font-mono text-[11px]">12+ Months in the Field</span>
            </div>
          </div>

          {/* Section 2: What We Do (The Four Pillars) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#F6864C]">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold">
                Our Core Pillars of Service
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6864C]/10 text-[#F6864C] flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h5 className="font-bold text-sm text-[#0B1E37]">The Ministry of Presence</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We don&apos;t just wire funds; we physically visit widows in their homes. We bring warm fellowship, shared prayer, pastoral listening, and remind them that they are seen and loved.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6864C]/10 text-[#F6864C] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h5 className="font-bold text-sm text-[#0B1E37]">Emergency Hardship Intervention</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Immediate, rapid-response cash grants for urgent rent arrears, emergency food supplies, and critical prescription medications or dialysis treatments.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6864C]/10 text-[#F6864C] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h5 className="font-bold text-sm text-[#0B1E37]">Livelihood & Economic Dignity</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equipping able widows with vocational tools: sewing and tailoring machines, small retail stock, poultry or food processing grants to generate long-term recurring income.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#F6864C]/10 text-[#F6864C] flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h5 className="font-bold text-sm text-[#0B1E37]">Children&apos;s Education Continuity</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Covering school tuition, exam fees, and textbooks for late pastors’ orphans so their academic futures are never cut short by grief.
                </p>
              </div>

            </div>
          </div>

          {/* Section 3: 1-Year Milestones Tracker */}
          <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#0B1E37] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#F6864C]" />
              What God Has Done in Our First Year
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#0B1E37]">12+</span>
                <span className="text-[11px] font-mono text-slate-600 uppercase">Months Active</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#F6864C]">100%</span>
                <span className="text-[11px] font-mono text-slate-600 uppercase">Direct Giving</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#0B1E37]">Personal</span>
                <span className="text-[11px] font-mono text-slate-600 uppercase">Home Visits</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#0B1E37]">Vetted</span>
                <span className="text-[11px] font-mono text-slate-600 uppercase">Beneficiaries</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 italic text-center">
              &ldquo;Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world.&rdquo; — James 1:27
            </p>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenNominate();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#0B1E37] hover:bg-white hover:border-[#0B1E37] transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-slate-600" />
            Nominate a Pastor&apos;s Widow
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0B1E37] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenDonate();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#F6864C] hover:bg-[#e07238] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Support This Mission
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
