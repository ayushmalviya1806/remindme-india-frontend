import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const TICKER = [
  '🚀 600+ reminders delivered by Indians',
  '📱 850 Million Indians use WhatsApp daily',
  '📬 98% WhatsApp open rate vs 20% email',
  '⏰ Setup in 30 seconds — no app download',
  '🇮🇳 India ka smartest WhatsApp AI reminder',
  '☕ Pro plan — chai se bhi sasta (₹3.3/day)',
];

const METRICS = [
  { value: 600, suffix: '+', label: 'Reminders delivered', live: true },
  { value: 98, suffix: '%', label: 'WhatsApp delivery rate' },
  { value: 30, suffix: ' sec', label: 'Setup — koi app nahi' },
  { value: 850, suffix: 'M+', label: 'Indians on WhatsApp' },
];

function MetricCard({ metric, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setDisplay(metric.value);
      return undefined;
    }
    const controls = animate(0, metric.value, {
      duration: 1.8,
      delay: index * 0.12,
      ease: [0.165, 0.84, 0.44, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, metric.value, index]);

  return (
    <div
      ref={ref}
      className={`scroll-fade-up scroll-fade-up-delay-${index + 1} group relative rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 px-6 py-7 text-center shadow-[0_1px_2px_rgba(27,28,26,0.04),0_8px_24px_rgba(27,28,26,0.06),0_24px_56px_rgba(27,28,26,0.05)] hover:shadow-[0_2px_4px_rgba(27,28,26,0.05),0_12px_32px_rgba(0,109,47,0.1),0_32px_72px_rgba(27,28,26,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out`}
    >
      {/* inner top highlight */}
      <div aria-hidden="true" className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      {metric.live && (
        <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-rm-primary/70">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          LIVE
        </span>
      )}

      <div className="font-heading font-extrabold text-4xl lg:text-5xl gradient-text tabular-nums" style={{ letterSpacing: '-0.02em' }}>
        {display.toLocaleString('en-IN')}
        {metric.suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-rm-muted">{metric.label}</div>
    </div>
  );
}

export default function StatsBar() {
  const doubled = [...TICKER, ...TICKER, ...TICKER, ...TICKER];

  return (
    <section data-testid="stats-bar" className="relative">
      {/* Marquee ticker strip */}
      <div
        className="marquee-hover-pause py-4 overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, #00471F 0%, #006D2F 50%, #00471F 100%)',
        }}
      >
        <div
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <div className="animate-marquee flex gap-12 whitespace-nowrap" style={{ willChange: 'transform' }}>
            {doubled.map((stat, i) => (
              <span
                key={i}
                className="text-white text-sm sm:text-base font-medium font-body flex-shrink-0 flex items-center gap-2"
              >
                {stat}
                {i < doubled.length - 1 && (
                  <span className="text-rm-green/50 mx-4">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Count-up metrics */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
