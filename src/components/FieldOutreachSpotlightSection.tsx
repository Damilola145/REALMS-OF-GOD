import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FieldOutreachSpotlightSectionProps {
  onOpenAbout?: () => void;
  onOpenDonate: () => void;
}

const OUTREACH_SLIDES = [
  {
    id: 'slide-1',
    image: '/grouppicture1.jpg',
    title: 'Fellowship & Pure Religion in Action',
    caption: 'Gathering with late pastors’ widows for direct fellowship, prayer, and dignified relief.',
  },
  {
    id: 'slide-2',
    image: '/grouppicture2.jpg',
    title: 'Standing Shoulder-to-Shoulder',
    caption: 'Honoring mothers of faith whose husbands poured out their lives shepherding congregations.',
  }
];

export const FieldOutreachSpotlightSection: React.FC<FieldOutreachSpotlightSectionProps> = ({
  onOpenAbout,
  onOpenDonate,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Slower, dignified automated interval animation (Cycles every 7.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % OUTREACH_SLIDES.length);
    }, 7500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = OUTREACH_SLIDES[currentSlideIndex];

  return (
    <section id="outreach-story" className="py-16 lg:py-24 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6864C]/10 text-[#F6864C] text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Compassion in Action</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E37] tracking-tight leading-tight">
            Seen, Cherished, and Never Alone
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-light leading-relaxed">
            Beyond sending aid, we show up in person. For over 12 months, Realms of God Ministry has met with pastors’ widows, hearing their stories, and assuring them that their labor of love is honored and they will never walk this journey alone.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Automated Mini-Carousel (Mobile & Desktop) */}
          <div 
            className="lg:col-span-7 flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Frame - High-Dignity Unobstructed View */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950 aspect-[16/9]">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950"
                >
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/images/grouppicture')) {
                        target.src = activeSlide.id === 'slide-1' ? '/images/grouppicture1.jpg' : '/images/grouppicture2.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-center"
                  />

                

                  {/* Progress Interval Bars (Bottom Right overlay, subtle) */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 bg-[#0B1E37]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-md">
                    {OUTREACH_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setCurrentSlideIndex(idx)}
                        className="focus:outline-none cursor-pointer group py-1"
                        aria-label={`Show photo ${idx + 1}`}
                      >
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentSlideIndex 
                              ? 'w-6 bg-[#F6864C]' 
                              : 'w-2 bg-white/40 group-hover:bg-white/70'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

          {/* Right Column: Narrative & Story CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1E37] tracking-tight leading-snug">
                &ldquo;We don&apos;t just wire relief from afar. We sit with them, so they know they are deeply seen and not alone.&rdquo;
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                When a faithful shepherd goes home to be with the Lord, the hardest part for his family is often the sudden, echoing silence. The parsonage is vacated, congregations move on, and the woman who labored faithfully beside him for decades is left to carry both grief and survival alone.
              </p>

            </div>

            {/* Action Button: Donate */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenDonate}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F6864C] hover:bg-[#e0753d] active:bg-[#c9632f] text-white text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current text-white" />
                <span>Support a Widow</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
