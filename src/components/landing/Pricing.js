import { Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const WA_LINK = 'https://wa.me/916269915175?text=Hi';
const RAZORPAY_LINK = '/pro';

const FREE_FEATURES = [
  '10 free reminders/month',
  'Hindi + English + Hinglish',
  'WhatsApp notifications',
  'AI reminder extraction',
  'No app download needed',
];

const PRO_FEATURES = [
  'Unlimited reminders',
  'Recurring (daily/weekly/monthly)',
  'Priority WhatsApp support',
  'Reminder history & analytics',
  'Snooze & reschedule',
  'Multi-reminder in one message',
  'Advanced GPT-4 AI',
];

const VIEWPORT = { once: true, margin: '-80px' };

function FeatureRow({ text, index, dark, reduceMotion }) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : { duration: 0.35, ease: [0.23, 1, 0.32, 1], delay: 0.25 + index * 0.05 }
      }
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
          dark ? 'bg-white/15' : 'bg-rm-green/10'
        }`}
      >
        <Check className="w-3 h-3 text-rm-green" />
      </div>
      <span className={`text-sm font-body ${dark ? 'text-white/90' : 'text-rm-text'}`}>{text}</span>
    </motion.div>
  );
}

export default function Pricing() {
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
    <section id="pricing" data-testid="pricing-section" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Ambient bloom — green with a saffron hint behind the Pro card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 45% at 62% 45%, rgba(37, 211, 102, 0.09), transparent 70%), radial-gradient(ellipse 30% 35% at 75% 30%, rgba(255, 153, 51, 0.05), transparent 70%)',
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
          <span className="inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-rm-primary bg-[#E8F5E9] border border-rm-green/20 rounded-full px-4 py-1.5 mb-5">
            💸 No hidden charges
          </span>
          <h2
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-rm-text"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            Kitna <span className="gradient-text">lagega?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-rm-muted font-body">
            Koi hidden charges nahi. Chai se bhi sasta. ☕
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="max-w-[920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* Free Card */}
          <motion.div
            data-testid="pricing-free-card"
            variants={itemVariants}
            whileHover={reduceMotion ? {} : { y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="group relative bg-white/85 backdrop-blur-sm rounded-3xl p-8 border border-black/[0.06] shadow-[0_1px_2px_rgba(27,28,26,0.04),0_10px_28px_rgba(27,28,26,0.06)]"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: '0 20px 48px rgba(27, 28, 26, 0.1)' }}
            />

            <div className="mb-6">
              <p className="text-rm-muted text-xs font-heading font-bold tracking-[0.15em] mb-2">FREE TRIAL</p>
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-5xl text-rm-text" style={{ letterSpacing: '-0.02em' }}>₹0</span>
                <span className="text-rm-muted text-sm font-body">/month</span>
              </div>
              <p className="text-sm text-rm-muted mt-2 font-body">Koi credit card nahi • 30 sec setup</p>
            </div>

            <div className="space-y-3 mb-8">
              {FREE_FEATURES.map((f, i) => (
                <FeatureRow key={i} text={f} index={i} dark={false} reduceMotion={reduceMotion} />
              ))}
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="pricing-free-cta"
              className="block text-center rounded-full border-2 border-rm-primary text-rm-primary font-heading font-bold text-base px-6 py-3.5 hover:bg-rm-primary hover:text-white hover:shadow-[0_4px_16px_rgba(0,109,47,0.2)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
            >
              Start Free Now →
            </a>
            <p className="text-center text-xs text-rm-muted mt-3 font-body">Setup in 30 seconds • 🔒 Data 100% private</p>
          </motion.div>

          {/* Pro Card — animated moving border, visually dominant */}
          <motion.div
            data-testid="pricing-pro-card"
            variants={itemVariants}
            whileHover={reduceMotion ? {} : { y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative lg:scale-[1.05]"
          >
            {/* Floating Most Popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rm-green to-[#00C853] text-rm-text text-xs font-bold font-heading px-4 py-1.5 rounded-full shadow-[0_2px_8px_rgba(37,211,102,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] whitespace-nowrap">
                ⭐ Most Popular
              </span>
            </div>

            <div className="moving-border shadow-[0_2px_4px_rgba(27,28,26,0.08),0_20px_56px_rgba(0,109,47,0.28),0_40px_96px_rgba(27,28,26,0.12)]">
              <div
                className="relative rounded-[26px] p-8 text-white overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #00471F 0%, #006D2F 55%, #0A7A3C 100%)' }}
              >
                {/* Inner ambient glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 85% 0%, rgba(37, 211, 102, 0.3), transparent 50%)' }}
                />

                <div className="relative">
                  {/* Urgency Badge */}
                  <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold mb-4 shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                    🔥 Limited Beta Price
                  </div>

                  <div className="mb-6">
                    <p className="text-white/60 text-xs font-heading font-bold tracking-[0.15em] mb-2">PRO</p>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-extrabold text-6xl text-white" style={{ letterSpacing: '-0.02em' }}>₹99</span>
                      <span className="text-white/60 text-sm font-body">/month</span>
                    </div>
                    <p className="text-sm text-white/70 mt-2 font-body">= ₹3.3/day — chai se bhi sasta ☕</p>
                    <p className="text-sm text-white/50 mt-1 font-body">Cancel anytime. No lock-in.</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {PRO_FEATURES.map((f, i) => (
                      <FeatureRow key={i} text={f} index={i} dark reduceMotion={reduceMotion} />
                    ))}
                  </div>

                  <a
                    href={RAZORPAY_LINK}
                    data-testid="pricing-pro-cta"
                    className="block text-center rounded-full bg-white text-rm-primary font-heading font-bold text-base px-6 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(0,0,0,0.2),0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.25),0_12px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
                  >
                    ☕ Pro lelo — Chai se sasta hai →
                  </a>
                  <p className="text-center text-xs text-white/50 mt-3 font-body">
                    🔒 Razorpay Secure Payments • UPI, Cards, NetBanking
                  </p>
                  <p className="text-center text-sm text-white/80 mt-2 font-body">
                    🎓 Student? WhatsApp pe <strong className="text-white">STUDENT50</strong> type karo — sirf ₹49 first month!
                  </p>
                  <p className="text-center text-xs text-white/40 mt-1 font-body">
                    🇮🇳 Made in India • Aapka data safe hai
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Cost comparison box */}
        <motion.div
          className="max-w-2xl mx-auto mt-14 bg-white/85 backdrop-blur-sm rounded-3xl p-6 border border-black/[0.05] shadow-[0_1px_2px_rgba(27,28,26,0.04),0_10px_28px_rgba(27,28,26,0.06)]"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <p className="text-center font-heading font-bold text-lg text-rm-text mb-4">Sochiye zara...</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100">
              <p className="font-heading font-extrabold text-2xl text-red-500">₹500+</p>
              <p className="text-sm text-rm-muted font-body mt-1">Ek missed appointment ka nuksaan</p>
            </div>
            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100">
              <p className="font-heading font-extrabold text-2xl text-red-500">₹500+</p>
              <p className="text-sm text-rm-muted font-body mt-1">Ek late EMI ki penalty</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-rm-green/25 ring-1 ring-rm-green/20">
              <p className="font-heading font-extrabold text-2xl text-green-600">₹99</p>
              <p className="text-sm text-rm-muted font-body mt-1">RemindMe Pro — poore mahine</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="text-center mt-8 text-base sm:text-lg text-rm-muted font-body max-w-lg mx-auto"
          variants={itemVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          💬 "Pehle free try karo. Pasand aaye toh Pro lo. Pasand na aaye toh kuch nahi."
        </motion.p>
      </div>
    </section>
  );
}
