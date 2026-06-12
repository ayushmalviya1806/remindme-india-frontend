import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useDesktopPointer } from '@/hooks/useDesktopPointer';

const FEATURES = [
  {
    span: 'col-span-1 md:col-span-2',
    surface: 'linear-gradient(135deg, #E8F5E9 0%, #DCEFDE 100%)',
    dark: false,
    icon: '🗣️',
    iconBg: 'bg-white/70',
    title: 'Hinglish Support — Bol do kisi bhi tarah',
    body: '"Kal sham 6 baje gym jana hai", "remind me tomorrow at 8am", "aaj raat 10 baje medicine" — AI samjhega. Guaranteed.',
    hasDemo: true,
  },
  {
    span: 'col-span-1',
    surface: 'linear-gradient(135deg, #F7F7F3 0%, #EFEFE9 100%)',
    dark: false,
    icon: '📱',
    iconBg: 'bg-white/80',
    title: 'No App Download',
    body: 'Phone storage full? Koi problem nahi. WhatsApp ke andar hi kaam karta hai.',
  },
  {
    span: 'col-span-1 md:col-span-2',
    surface: 'linear-gradient(135deg, #FFF8E1 0%, #FFF1C9 100%)',
    dark: false,
    icon: '🎤',
    iconBg: 'bg-white/70',
    title: 'Voice Notes — Hindi mein bolo, reminder set!',
    body: 'Type karne ka mann nahi? Bas voice note bhejo! "Shaam 6:30 baje gym jaana hai" — AI sunega, samjhega, aur time pe yaad dilayega. Hindi, Hinglish, English — sab chalega.',
    hasDemo: false,
  },
  {
    span: 'col-span-1',
    surface: 'linear-gradient(135deg, #00582A 0%, #006D2F 60%, #00853A 100%)',
    dark: true,
    icon: '🤖',
    iconBg: 'bg-white/15',
    title: 'GPT-4 Powered AI',
    body: "World's most advanced AI. Natural language samjhta hai — bilkul friend ki tarah.",
  },
  {
    span: 'col-span-1',
    surface: 'linear-gradient(135deg, #F7F7F3 0%, #EFEFE9 100%)',
    dark: false,
    icon: '🔁',
    iconBg: 'bg-white/80',
    title: 'Recurring Reminders',
    body: 'Daily medicine, monthly EMI, weekly meeting — ek baar set karo, hamesha yaad.',
  },
  {
    span: 'col-span-1',
    surface: 'linear-gradient(135deg, #F7F7F3 0%, #EFEFE9 100%)',
    dark: false,
    icon: '🔒',
    iconBg: 'bg-white/80',
    title: '100% Private',
    body: 'Tumhara data sirf tumhara. No ads. No selling. No tracking. Ever.',
  },
  {
    span: 'col-span-1',
    surface: 'linear-gradient(135deg, #2EDB6F 0%, #1FBF5B 100%)',
    dark: false,
    icon: '⚡',
    iconBg: 'bg-white/40',
    title: '30 Seconds Setup',
    body: '"Hi" bhejo — aur tum ready ho. Seriously.',
  },
];

const DEMO_BUBBLES = [
  { text: 'kal sham 6 baje gym', lang: 'Hinglish' },
  { text: 'remind me at 8am tomorrow', lang: 'English' },
  { text: 'aaj raat 10 baje medicine', lang: 'Hindi' },
];

const VIEWPORT = { once: true, margin: '-80px' };

/* Bento card: 3D tilt toward cursor + cursor-following glare (desktop only) */
function TiltCard({ feature, index, variants, reduceMotion }) {
  const desktop = useDesktopPointer();
  const active = desktop && !reduceMotion;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 220, damping: 22 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255, 255, 255, ${
    feature.dark ? 0.14 : 0.45
  }), transparent 60%)`;

  const handleMouseMove = (e) => {
    if (!active) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      variants={variants}
      data-testid={`feature-card-${index}`}
      className={feature.span}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={reduceMotion ? {} : { y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`group relative h-full rounded-3xl p-7 sm:p-8 overflow-hidden ${
          feature.dark ? 'border border-white/10' : 'border border-black/[0.05]'
        } shadow-[0_1px_2px_rgba(27,28,26,0.04),0_10px_28px_rgba(27,28,26,0.06)]`}
        style={{
          background: feature.surface,
          rotateX: active ? rotateX : 0,
          rotateY: active ? rotateY : 0,
          transformStyle: 'preserve-3d',
          willChange: active ? 'transform' : 'auto',
        }}
      >
        {/* Hover glow */}
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: '0 24px 56px rgba(0, 109, 47, 0.16), 0 10px 28px rgba(27, 28, 26, 0.08)' }}
        />

        {/* Inner top highlight */}
        <div
          aria-hidden="true"
          className={`absolute top-0 inset-x-6 h-px ${feature.dark ? 'opacity-30' : 'opacity-70'}`}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)' }}
        />

        {/* Cursor-following glare */}
        {active && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: glare }}
          />
        )}

        {/* Ambient glow inside the dark card */}
        {feature.dark && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 80% 0%, rgba(37, 211, 102, 0.25), transparent 55%)' }}
          />
        )}

        <div style={{ transform: active ? 'translateZ(28px)' : 'none' }}>
          <div
            className={`w-14 h-14 rounded-2xl ${feature.iconBg} backdrop-blur-sm flex items-center justify-center text-3xl mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_8px_rgba(27,28,26,0.06)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3`}
          >
            {feature.icon}
          </div>
          <h3 className={`font-heading font-bold text-lg sm:text-xl mb-2 ${feature.dark ? 'text-white' : 'text-rm-text'}`}>
            {feature.title}
          </h3>
          <p
            className={`text-[15px] leading-relaxed font-body ${
              feature.dark ? 'text-white/80' : 'text-rm-muted'
            }`}
          >
            {feature.body}
          </p>

          {/* Demo bubbles for Hinglish card */}
          {feature.hasDemo && (
            <div className="mt-5 flex flex-wrap gap-2">
              {DEMO_BUBBLES.map((d, j) => (
                <motion.div
                  key={j}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + j * 0.12, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={reduceMotion ? {} : { scale: 1.06 }}
                  className="bg-white/90 backdrop-blur-sm border border-black/[0.04] rounded-xl px-3 py-2 text-xs flex items-center gap-2 shadow-[0_1px_2px_rgba(27,28,26,0.06),0_4px_12px_rgba(27,28,26,0.05)]"
                >
                  <span className="text-rm-text font-medium">{d.text}</span>
                  <span className="text-[10px] text-rm-muted/60 font-body">{d.lang}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturesGrid() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  const itemVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 36, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
      };

  return (
    <section id="features" data-testid="features-section" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Soft green bloom behind the grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(37, 211, 102, 0.07), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <span className="inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-rm-primary bg-[#E8F5E9] border border-rm-green/20 rounded-full px-4 py-1.5 mb-5">
            ✨ Features
          </span>
          <h2
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-rm-text"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            Sab kuch, <span className="gradient-text">WhatsApp ke andar.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-rm-muted font-body max-w-xl mx-auto">
            Koi app nahi, koi setup nahi — bas bolo aur bhool jao. Yaad rakhna hamara kaam.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {FEATURES.map((f, i) => (
            <TiltCard key={i} feature={f} index={i} variants={itemVariants} reduceMotion={reduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
