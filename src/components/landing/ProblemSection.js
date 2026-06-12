import { motion, useReducedMotion } from 'framer-motion';

const PAIN_CARDS = [
  {
    icon: '🩺',
    title: 'Doctor appointment bhool gaye?',
    body: 'Slot milta nahi. Waiting list mein hafte lagte hain. Ek bhool ki itni badi keemat?',
    tag: 'Health risk + wasted time',
    tagColor: 'bg-red-50 text-red-600',
    iconBg: 'bg-red-50',
    accent: '#DC2626',
    glowRGB: '220, 38, 38',
  },
  {
    icon: '💳',
    title: 'EMI ya credit card late hua?',
    body: '₹500 to ₹1,500 late fee. CIBIL score down. Ek yaad na rehne ki wajah se itna nuksaan?',
    tag: '₹500–₹1,500 lost per slip',
    tagColor: 'bg-orange-50 text-orange-600',
    iconBg: 'bg-orange-50',
    accent: '#EA580C',
    glowRGB: '234, 88, 12',
  },
  {
    icon: '💊',
    title: 'Medicine lena bhool gaye... phir se?',
    body: 'BP, diabetes, thyroid — consistency hi treatment hai. Bhool gaye to mahino ki mehnat kharab.',
    tag: 'Health consistency broken',
    tagColor: 'bg-yellow-50 text-yellow-700',
    iconBg: 'bg-yellow-50',
    accent: '#D97706',
    glowRGB: '217, 119, 6',
  },
];

const VIEWPORT = { once: true, margin: '-80px' };

export default function ProblemSection() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
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
    <section data-testid="problem-section" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Soft warning-tinted bloom behind the cards */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 42%, rgba(220, 38, 38, 0.05), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <span className="inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-red-500/90 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-5">
            Roz ka scene 😤
          </span>
          <h2
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-rm-text"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            Kitni baar hua aisa?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-rm-muted font-body">
            Chote chote bhool... <span className="font-semibold text-rm-text">bade bade nuksan</span>
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {PAIN_CARDS.map((card, i) => (
            <motion.div
              key={i}
              data-testid={`pain-card-${i}`}
              variants={itemVariants}
              whileHover={reduceMotion ? {} : { y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative bg-white/85 backdrop-blur-sm rounded-3xl p-8 border border-black/[0.05] shadow-[0_1px_2px_rgba(27,28,26,0.04),0_10px_28px_rgba(27,28,26,0.06)] cursor-default"
            >
              {/* Hover glow (opacity-only, per-card colour) */}
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 24px 56px rgba(${card.glowRGB}, 0.16), 0 10px 28px rgba(27, 28, 26, 0.08)`,
                }}
              />

              {/* Top accent hairline */}
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-8 h-px opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${card.accent}55, transparent)`,
                }}
              />

              <div
                className={`w-16 h-16 rounded-2xl ${card.iconBg} flex items-center justify-center text-3xl mb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(27,28,26,0.06)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3`}
              >
                {card.icon}
              </div>
              <h3 className="font-heading font-bold text-xl text-rm-text mb-3">{card.title}</h3>
              <p className="text-rm-muted text-[15px] leading-relaxed mb-6 font-body">{card.body}</p>
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${card.tagColor}`}>
                {card.tag}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.p
          className="text-center mt-14 text-xl sm:text-2xl font-heading font-bold text-rm-primary"
          style={{ letterSpacing: '-0.01em' }}
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          RemindMe India yeh sab hone se pehle rok deta hai. <span className="gradient-text">Forever.</span>
        </motion.p>

        {/* CTA after pain points */}
        <motion.div
          className="text-center mt-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <a
            href="https://wa.me/916269915175?text=Hi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-base px-8 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_4px_rgba(0,109,47,0.15),0_8px_20px_rgba(0,109,47,0.25),0_20px_48px_rgba(37,211,102,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_8px_rgba(0,109,47,0.18),0_12px_28px_rgba(0,109,47,0.3),0_28px_64px_rgba(37,211,102,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
          >
            📱 Abhi Try Karo — Free Hai
          </a>
          <p className="mt-3 text-sm text-rm-muted font-body">Sirf 30 second. Koi app nahi. Koi signup nahi.</p>
        </motion.div>
      </div>
    </section>
  );
}
