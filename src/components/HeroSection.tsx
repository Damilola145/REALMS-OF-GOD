import React from 'react';
import { 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDonate: (beneficiaryId?: string, beneficiaryName?: string, presetAmount?: number) => void;
  onExploreStories: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDonate,
  onExploreStories,
}) => {
  return (
    <section 
      id="hero" 
      className="relative bg-[#0B1E37] text-slate-100 overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#1A3356]"
    >
      {/* Ambient background light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#173760]/50 via-[#0B1E37] to-[#061120] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F6864C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Grid Layout: Left Content & Right Visionary Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Narrative (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142B4B] border border-[#F6864C]/40 text-slate-200 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F6864C] animate-pulse" />
              <span className="text-[#F6864C]">REALMS OF GOD MINISTRY</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white leading-[1.12]">
              No faithful minister, widow, or orphan should <span className="text-[#F6864C] italic font-normal">suffer in silence</span>.
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              A verified benevolent bridge providing emergency medical care, food sustenance, and orphan education to frontline servants of the gospel and bereaved families across Nigeria.
            </p>

            {/* Scriptural Quote */}
            <div className="p-4 rounded-xl bg-[#112A4B]/80 border-l-4 border-[#F6864C] border-y border-r border-[#1C3E69] text-slate-200 max-w-xl">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F6864C] mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Scriptural Mandate &bull; Galatians 6:2</span>
              </div>
              <blockquote className="font-serif text-sm sm:text-base italic text-white leading-snug">
                &ldquo;Bear ye one another&rsquo;s burdens, and so fulfil the law of Christ.&rdquo;
              </blockquote>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreStories}
                className="px-6 py-3.5 rounded-xl bg-[#F6864C] hover:bg-[#e07238] active:bg-[#c95f29] text-white font-bold text-sm transition-all shadow-lg hover:shadow-[#F6864C]/30 active:scale-98 flex items-center gap-2 cursor-pointer"
              >
                <span>View Verified Cases</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => onOpenDonate()}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer hover:border-[#F6864C]/50"
              >
                <Heart className="w-4 h-4 text-[#F6864C] fill-[#F6864C]" />
                <span>Send Direct Relief</span>
              </button>
            </div>

            {/* Direct Giving Guarantee */}
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#F6864C] shrink-0" />
              <span className="font-medium">100% Direct Relief Delivery &bull; Verified Field Presbyteries</span>
            </div>

          </div>

          {/* Right Column: Visionary Card (Col 5) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-sm lg:max-w-none">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#F6864C]/30 via-transparent to-[#28558F]/40 blur-xl opacity-75" />

              {/* Card Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#10243E] border border-white/15 shadow-2xl">
                
                {/* Image Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                  <img
                    src="/dr_franklyn_akinyosoye.jpg"
                    alt="Dr Franklyn Akinyosoye - Visionary for Realms of God Ministry"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/images/dr_franklyn_akinyosoye')) {
                        target.src = '/images/dr_franklyn_akinyosoye.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient shade at bottom of image for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E37] via-[#0B1E37]/30 to-transparent pointer-events-none" />

                
                </div>

                {/* Card Bio Footer */}
                <div className="p-4 sm:p-5 bg-gradient-to-b from-[#10243E] to-[#0A1A2F] border-t border-white/10 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                        Dr. Franklyn Akinyosoye
                      </h3>
                      <p className="text-xs font-mono text-[#F6864C] font-medium">
                        Visionary, Realms of God Ministry
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
