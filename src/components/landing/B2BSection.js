import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';

const B2B_WHATSAPP = 'https://wa.me/916269915175?text=' + encodeURIComponent(
  `Hi, I'm interested in RemindMe India for my business.\n\nBusiness type: \nCity: `
);

const STATS = [
  { value: 98, suffix: '%', label: 'delivery rate' },
  { value: 999, prefix: '₹', label: 'starts per month' },
  { value: 5, suffix: ' min', label: 'setup time' },
];

const USE_CASES = [
  {
    icon: '💪',
    title: 'Gyms & Fitness Centers',
    desc: 'Member subscription renewal reminders. Automatic. 7 din pehle se yaad dilana.',
  },
  {
    icon: '🏥',
    title: 'Clinics & Salons',
    desc: 'Patient appointment reminders. Service follow-ups. Before every visit.',
  },
  {
    icon: '📚',
    title: 'Coaching & Tuition',
    desc: 'Class reminders, fee alerts, exam notifications for every student.',
  },
];

const VIEWPORT = { once: true, margin: '-80px' };

function CountStat({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduceMotion) {
      setDisplay(stat.value);
      return undefined;
    }
    const controls = animate(0, stat.value, {
      duration: 1.6,
      delay: 0.3 + index * 0.12,
      ease: [0.165, 0.84, 0.44, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, stat.value, index]);

  return (
    <div ref={ref}>
      <p className="font-heading font-extrabold text-3xl lg:text-4xl text-rm-green tabular-nums" style={{ letterSpacing: '-0.02em' }}>
        {stat.prefix}
        {display.toLocaleString('en-IN')}
        {stat.suffix}
      </p>
      <p className="text-sm text-white/60 font-body mt-1">{stat.label}</p>
    </div>
  );
}

export default function B2BSection() {
  const reduceMotion = useReducedMotion();

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 36, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
      };

  const cardVariants = reduceMotion
    ? itemVariants
    : {
        hidden: { opacity: 0, x: 48, scale: 0.97 },
        show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
      };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };

  return (
    <section
      id="for-business"
      data-testid="b2b-section"
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #00351A 0%, #00471F 40%, #005A28 100%)' }}
    >
      {/* Internal atmosphere: drifting glow, saffron accent, dot grid, hairline edges */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 right-[-10%] w-[640px] h-[640px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37, 211, 102, 0.22) 0%, transparent 65%)',
            filter: 'blur(80px)',
            animation: reduceMotion ? 'none' : 'auroraDrift2 30s ease-in-out infinite alternate',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[-8%] w-[480px] h-[480px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 153, 51, 0.12) 0%, transparent 65%)',
            filter: 'blur(70px)',
            animation: reduceMotion ? 'none' : 'auroraDrift3 36s ease-in-out infinite alternate',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)',
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37, 211, 102, 0.5), transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37, 211, 102, 0.5), transparent)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            className="flex-1 text-white"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-rm-green bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm"
            >
              🏢 For Business — B2B
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl mb-4"
              style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
            >
              Apne{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #25D366, #7CF2A8, #FFB366)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Business
              </span>{' '}
              ke liye
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl text-white/85 font-heading font-semibold mb-4">
              Customers ko automatically WhatsApp pe remind karo. No tech team needed.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base text-white/60 font-body leading-relaxed mb-8 max-w-lg">
              Clinics, coaching centers, salons, retailers — jo bhi business appointment ya payment pe dependent hai, RemindMe India unke liye banaya gaya hai.
            </motion.p>

            {/* Count-up stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 lg:gap-10 mb-10">
              {STATS.map((s, i) => (
                <CountStat key={s.label} stat={s} index={i} />
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                to="/business"
                data-testid="b2b-cta"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-rm-primary font-heading font-bold text-base px-8 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(0,0,0,0.25),0_12px_32px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.3),0_16px_40px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
              >
                Business Plans Dekho →
              </Link>
              <a
                href={B2B_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="b2b-whatsapp-cta"
                className="inline-flex items-center justify-center gap-2 text-rm-green font-heading font-bold text-sm hover:text-white transition-colors duration-200"
              >
                💬 Ya WhatsApp pe seedha baat karo →
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Use case cards */}
          <motion.div
            className="flex-1 grid gap-5 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={i}
                data-testid={`b2b-use-case-${i}`}
                variants={cardVariants}
                whileHover={reduceMotion ? {} : { y: -5, x: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 flex items-start gap-4 border border-white/40 shadow-[0_2px_4px_rgba(0,0,0,0.1),0_12px_32px_rgba(0,0,0,0.18)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: '0 20px 48px rgba(37, 211, 102, 0.25), 0 8px 24px rgba(0, 0, 0, 0.2)' }}
                />
                <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-3xl flex-shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(27,28,26,0.06)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
                  {uc.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-lg text-rm-text mb-1">{uc.title}</h3>
                  <p className="text-sm text-rm-muted font-body leading-relaxed">{uc.desc}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="self-center text-rm-green text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out"
                >
                  →
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
