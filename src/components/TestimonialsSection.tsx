import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft,
  Quote,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onOpenDonate: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onOpenDonate,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const activeTestimonial = testimonials[activeIdx];

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF2FA] text-[#0B1E37] text-xs font-semibold border border-[#0B1E37]/15">
            <Sparkles className="w-3.5 h-3.5 text-[#F6864C]" />
            <span>Impacting Lives</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E37] tracking-tight">
            Restored Lives &amp; Partner Testimonies
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Real field dispatches from healed gospel ministers, self-reliant widows, and partner network bishops whose tears turned to joy across Nigeria.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
          <Quote className="w-32 h-32 text-slate-100 absolute -right-6 -bottom-6 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Author Profile */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-4">
              <div className="relative">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('/images/')) {
                      target.src = `/images${activeTestimonial.avatar}`;
                    }
                  }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#0B1E37] shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 bg-[#0B1E37] text-[#F6864C] p-1.5 rounded-full shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#0B1E37] text-[10px] font-bold border border-slate-200 inline-block uppercase tracking-wider">
                  {activeTestimonial.category}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#0B1E37]">
                  {activeTestimonial.name}
                </h3>
                <p className="text-xs text-[#F6864C] font-semibold">
                  {activeTestimonial.role}
                </p>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-xs text-[#0B1E37] font-bold border border-slate-200">
                Relief: {activeTestimonial.aidType}
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="lg:col-span-8 space-y-5 lg:border-l lg:border-slate-100 lg:pl-10">
              
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#0B1E37] italic font-medium leading-relaxed">
                “{activeTestimonial.quote}”
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {activeTestimonial.fullTestimony}
              </p>

              {/* Slider Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeIdx === i ? 'w-8 bg-[#F6864C]' : 'w-2 bg-slate-200 hover:bg-[#F6864C]'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B1E37] border border-slate-200 transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className="p-2.5 rounded-xl bg-[#F6864C] hover:bg-[#e07238] active:bg-[#c95f29] text-white transition-colors cursor-pointer shadow-sm"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
