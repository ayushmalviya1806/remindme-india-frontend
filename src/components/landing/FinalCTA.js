import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useDesktopPointer } from '@/hooks/useDesktopPointer';

const WA_LINK = 'https://wa.me/916269915175?text=Hi';

const TRUST_ITEMS = [
  '🔒 100% Free to start',
  '✅ Meta Verified Business',
  '🇮🇳 Made in Indore, India',
  '⚡ Setup in 30 seconds',
];

const HEADLINE_LINES = [
  ['Ek', 'WhatsApp', 'message.'],
  ['Bas.', 'Kabhi', 'kuch', 'mat', 'bhoolo.'],
];

const VIEWPORT = { once: true, margin: '-80px' };

/* Word-by-word rising reveal */
function AnimatedHeadline({ reduceMotion }) {
  let wordIndex = 0;

  return (
    <h2
      className="font-heading font-extrabold text-white"
      style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.12, letterSpacing: '-0.025em' }}
    >
      {HEADLINE_LINES.map((line, li) => (
        <span key={li} className="block">
          {line.map((word) => {
            const delay = 0.08 * wordIndex;
            wordIndex += 1;
            return (
              <span key={`${li}-${word}-${delay}`} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
                <motion.span
                  className="inline-block"
                  initial={reduceMotion ? { opacity: 0 } : { y: '110%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={
                    reduceMotion
                      ? { duration: 0.3 }
                      : { duration: 0.55, ease: [0.23, 1, 0.32, 1], delay }
                  }
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

/* Button gently follows the cursor (desktop only) */
function MagneticWrap({ children }) {
  const desktop = useDesktopPointer();
  const reduceMotion = useReducedMotion();
  const active = desktop && !reduceMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e) => {
    if (!active) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="inline-block p-6 -m-6" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div className="inline-block" style={{ x: active ? sx : 0, y: active ? sy : 0 }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function FinalCTA() {
  const reduceMotion = useReducedMotion();

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
      };

  return (
    <section
      data-testid="final-cta-section"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(140deg, #00582A 0%, #007D36 45%, #1FBF5B 100%)' }}
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Saffron corner bloom */}
        <div
          className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255, 153, 51, 0.18) 0%, transparent 65%)', filter: 'blur(70px)' }}
        />
        {/* Deep green anchor bloom */}
        <div
          className="absolute -bottom-40 -left-24 w-[520px] h-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0, 53, 26, 0.55) 0%, transparent 65%)', filter: 'blur(70px)' }}
        />

        {/* Floating soft bubbles (desktop) */}
        <div
          className="hidden md:block absolute top-[22%] left-[10%] w-20 h-20 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), rgba(255,255,255,0.03))',
            filter: 'blur(6px)',
            animation: reduceMotion ? 'none' : 'orbFloat1 15s ease-in-out infinite alternate',
            willChange: 'transform',
          }}
        />
        <div
          className="hidden md:block absolute bottom-[18%] right-[12%] w-28 h-28 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(255,255,255,0.02))',
            filter: 'blur(8px)',
            animation: reduceMotion ? 'none' : 'orbFloat2 19s ease-in-out infinite alternate',
            willChange: 'transform',
          }}
        />

        {/* Grain */}
        <div className="aurora-grain" style={{ opacity: 0.05 }} />

        {/* WhatsApp watermark — gently breathing */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={reduceMotion ? {} : { y: [0, -18, 0], rotate: [0, 2, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-[500px] h-[500px] opacity-[0.08]" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
        </motion.div>

        {/* Top hairline */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedHeadline reduceMotion={reduceMotion} />

        <motion.p
          className="mt-6 text-lg sm:text-xl text-white/85 font-body max-w-md mx-auto leading-relaxed"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          transition={{ delay: 0.5 }}
        >
          30 second mein ready. Koi app nahi. Koi credit card nahi.<br />
          Hindi, Hinglish, English — jo bolo, yaad rakhega.
        </motion.p>

        <motion.div
          className="mt-10"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <MagneticWrap>
            <span className="relative inline-block">
              {/* Expanding ring pulse */}
              <span aria-hidden="true" className="cta-ring absolute inset-0 rounded-full" />
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="final-cta-button"
                className="btn-shimmer btn-shimmer-dark relative inline-flex items-center gap-2 rounded-full bg-white text-rm-primary font-heading font-bold text-xl px-10 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.18),0_20px_56px_rgba(0,0,0,0.28)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_6px_16px_rgba(0,0,0,0.22),0_28px_72px_rgba(0,0,0,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
              >
                🚀 Abhi Hi Bolo — Free Hai →
              </a>
            </span>
          </MagneticWrap>
          <p className="mt-4 text-sm text-white/60 font-body">
            👆 Tap to open WhatsApp directly
          </p>
          <p className="mt-6 text-white/70 text-sm font-body">
            Already decided?{' '}
            <a
              href="/pro"
              className="text-white underline font-semibold hover:opacity-80 transition-opacity"
            >
              Seedha Pro lelo — ₹99/month (Chai se sasta ☕) →
            </a>
          </p>
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
          data-testid="final-trust-row"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          transition={{ delay: 0.2 }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <span
              key={i}
              className="text-sm text-white/85 font-body bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
