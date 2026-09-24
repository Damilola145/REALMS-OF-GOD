import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  prefix?: string;
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  prefix = '',
  target,
  suffix = '',
  decimals = 0,
  duration = 2000,
}) => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!countRef.current) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * target;

      setValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, target, duration]);

  const formattedValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span ref={countRef} className="tabular-nums">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

export const ImpactMetricsSection: React.FC = () => {
  return (
    <section className="bg-[#0B1E37] text-slate-100 py-12 lg:py-16 border-b border-[#1A3356] relative overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#173760]/40 via-[#0B1E37] to-[#061120] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#F6864C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-slate-200">
          
          {/* Disbursed Funds */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#112A4B]/80 border border-slate-700/60 backdrop-blur-sm shadow-sm hover:border-[#F6864C]/40 transition-colors">
            <span className="text-[#F6864C] font-serif text-3xl sm:text-4xl font-bold block">
              <AnimatedCounter prefix="₦" target={48.6} suffix="M+" decimals={1} duration={2200} />
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 block">
              Direct Relief &amp; Benevolence Disbursed
            </span>
          </div>

          {/* Ministers & Widows */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#112A4B]/80 border border-slate-700/60 backdrop-blur-sm shadow-sm hover:border-[#F6864C]/40 transition-colors">
            <span className="text-[#F6864C] font-serif text-3xl sm:text-4xl font-bold block">
              <AnimatedCounter target={184} suffix="+" duration={1900} />
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 block">
              Ministers &amp; Widows Sustained
            </span>
          </div>

          {/* Schooling Terms */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#112A4B]/80 border border-slate-700/60 backdrop-blur-sm shadow-sm hover:border-[#F6864C]/40 transition-colors">
            <span className="text-[#F6864C] font-serif text-3xl sm:text-4xl font-bold block">
              <AnimatedCounter target={420} suffix="+" duration={2000} />
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 block">
              Orphan Schooling Terms Sponsored
            </span>
          </div>

          {/* Delivery percentage */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#112A4B]/80 border border-slate-700/60 backdrop-blur-sm shadow-sm hover:border-[#F6864C]/40 transition-colors">
            <span className="text-[#F6864C] font-serif text-3xl sm:text-4xl font-bold block">
              <AnimatedCounter target={100} suffix="%" duration={1600} />
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 block">
              Direct Field &amp; Hospital Settlement
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
