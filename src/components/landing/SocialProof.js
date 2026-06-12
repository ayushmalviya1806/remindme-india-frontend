import { motion, useReducedMotion } from 'framer-motion';

const TESTIMONIALS = [
  {
    stars: 5,
    quote: 'Voice note mein bola "shaam 6:30 baje gym" aur sach mein 6:30 pe WhatsApp pe reminder aa gaya. No app download, bas WhatsApp. Kamaal hai!',
    name: 'Piyush M.',
    role: 'Pro User, Indore',
    initials: 'PM',
    avatar: 'linear-gradient(135deg, #3B82F6, #2563EB)',
    featured: false,
  },
  {
    stars: 5,
    quote: 'Mummy ke liye daily medicine reminder set kiya — Hindi mein. Ab roz time pe yaad aa jaata hai. Unhone koi naya app nahi seekha — WhatsApp toh pehle se chalati hain!',
    name: 'Ayush M.',
    role: "Mom's Reminder Setter, Indore",
    initials: 'AM',
    avatar: 'linear-gradient(135deg, #10B981, #059669)',
    featured: true,
  },
  {
    stars: 5,
    quote: 'EMI bhoolne ki aadat thi, ₹500 late fee lag jaati thi har mahine. Ab har mahine 5 tareekh ko reminder aa jaata hai. Ek saal mein ₹6,000 bachaya!',
    name: 'Dollar M.',
    role: 'Pro User, Indore',
    initials: 'DM',
    avatar: 'linear-gradient(135deg, #A855F7, #7C3AED)',
    featured: false,
  },
];

const TRUST_ITEMS = [
  { icon: '🔒', label: 'Data stored in India (Mumbai)' },
  { icon: '✅', label: 'Meta Verified Business' },
  { icon: '🛡️', label: 'DPDP Act 2023 Compliant' },
];

const VIEWPORT = { once: true, margin: '-80px' };

function StarRating({ baseDelay, reduceMotion }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label="5 star review">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.3, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={VIEWPORT}
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { type: 'spring', stiffness: 420, damping: 17, delay: baseDelay + i * 0.07 }
          }
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const reduceMotion = useReducedMotion();

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 36, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
      };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };

  return (
    <section data-testid="social-proof-section" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Ambient bloom + giant background quote glyphs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(37, 211, 102, 0.06), transparent 70%)',
        }}
      />
      <span
        aria-hidden="true"
        className="absolute top-12 left-[4%] font-serif text-[180px] leading-none text-rm-primary/[0.06] select-none pointer-events-none"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-8 right-[4%] font-serif text-[180px] leading-none text-rm-primary/[0.06] select-none pointer-events-none"
      >
        ”
      </span>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <span className="inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-rm-primary bg-[#E8F5E9] border border-rm-green/20 rounded-full px-4 py-1.5 mb-5">
            💚 Real users, real reviews
          </span>
          <h2
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-rm-text"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            Log kya <span className="gradient-text">keh rahe</span> hain
          </h2>
          <p className="mt-4 text-base sm:text-lg text-rm-muted font-body">
            Hundreds of users across India — yeh unme se kuch hain.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 lg:items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              data-testid={`testimonial-card-${i}`}
              variants={itemVariants}
              whileHover={reduceMotion ? {} : { y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={`group relative bg-white/85 backdrop-blur-sm rounded-3xl p-7 border border-black/[0.05] cursor-default ${
                t.featured
                  ? 'shadow-[0_2px_4px_rgba(27,28,26,0.05),0_16px_40px_rgba(0,109,47,0.1),0_32px_72px_rgba(27,28,26,0.08)] lg:scale-[1.04] lg:border-rm-green/20'
                  : 'shadow-[0_1px_2px_rgba(27,28,26,0.04),0_10px_28px_rgba(27,28,26,0.06)]'
              }`}
            >
              {/* Hover glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: '0 24px 56px rgba(0, 109, 47, 0.14), 0 10px 28px rgba(27, 28, 26, 0.08)' }}
              />

              {/* Decorative quote mark */}
              <span
                aria-hidden="true"
                className="absolute top-4 right-6 font-serif text-6xl leading-none text-rm-green/15 select-none"
              >
                ”
              </span>

              <StarRating baseDelay={reduceMotion ? 0 : 0.3 + i * 0.12} reduceMotion={reduceMotion} />

              <p className="text-rm-text text-[15px] leading-relaxed font-body mb-6 italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold font-heading ring-2 ring-white shadow-[0_2px_8px_rgba(27,28,26,0.15)]"
                  style={{ background: t.avatar }}
                >
                  {t.initials}
                </div>
                <div className="flex-1">
                  <p className="font-heading font-bold text-sm text-rm-text">{t.name}</p>
                  <p className="text-xs text-rm-muted">{t.role}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-rm-primary bg-[#E8F5E9] border border-rm-green/20 rounded-full px-2 py-1">
                  💬 via WhatsApp
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          data-testid="trust-strip"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {TRUST_ITEMS.map((item, i) => (
            <motion.span
              key={i}
              variants={itemVariants}
              whileHover={reduceMotion ? {} : { y: -3 }}
              className="flex items-center gap-2 text-sm text-rm-text font-medium font-body bg-white/80 backdrop-blur-sm border border-black/[0.06] rounded-full px-4 py-2.5 shadow-[0_1px_2px_rgba(27,28,26,0.04),0_4px_12px_rgba(27,28,26,0.05)]"
            >
              <span>{item.icon}</span>
              {item.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
