import { motion, useReducedMotion } from 'framer-motion';

const WA_LINK = 'https://wa.me/916269915175?text=Hi';

const STEPS = [
  {
    num: '1',
    icon: '💬',
    title: 'Message Bhejo',
    desc: 'Apni language mein WhatsApp karo. "Kal doctor 3 baje" — bas itna kaafi hai.',
    example: 'Kal subah 10 baje meeting hai',
    bubble: 'user',
    badge: 'linear-gradient(135deg, #2EDB6F 0%, #1FBF5B 100%)',
    glow: 'rgba(37, 211, 102, 0.45)',
  },
  {
    num: '2',
    icon: '🤖',
    title: 'AI Samajh Jaata Hai',
    desc: 'GPT-4 AI tumhara message samajhta hai — task, date, time, language sab extract karta hai automatically.',
    example: '✅ Meeting set for tomorrow 10 AM',
    bubble: 'bot',
    badge: 'linear-gradient(135deg, #00582A 0%, #006D2F 60%, #00853A 100%)',
    glow: 'rgba(0, 109, 47, 0.45)',
  },
  {
    num: '3',
    icon: '🔔',
    title: 'Time Pe Notification',
    desc: 'Bilkul sahi time par WhatsApp notification. Reply "Done" to mark complete, "Snooze" for later.',
    example: '🔔 Meeting in 30 minutes!',
    bubble: 'alert',
    badge: 'linear-gradient(135deg, #2EDB6F 0%, #1FBF5B 100%)',
    glow: 'rgba(37, 211, 102, 0.45)',
  },
];

const VIEWPORT = { once: true, margin: '-80px' };

function ExampleBubble({ step, delay, reduceMotion }) {
  const isUser = step.bubble === 'user';
  const isAlert = step.bubble === 'alert';

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : { type: 'spring', stiffness: 320, damping: 22, delay }
      }
      style={{ transformOrigin: isUser ? '85% 100%' : '15% 100%' }}
      className={`relative px-4 py-2.5 text-sm text-rm-text font-body max-w-xs text-left shadow-[0_1px_1.5px_rgba(11,20,26,0.13),0_6px_16px_rgba(27,28,26,0.07)] ${
        isUser
          ? 'bg-white rounded-2xl rounded-tr-sm'
          : 'bg-[#DCF8C6] rounded-2xl rounded-tl-sm'
      } ${isAlert ? 'ring-1 ring-rm-green/30' : ''}`}
    >
      {step.example}
      <span className="block text-[10px] mt-1 text-rm-muted/50 text-right">
        9:41 AM{isUser && <span className="text-[#53BDEB]"> ✓✓</span>}
      </span>
    </motion.div>
  );
}

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  const headerVariants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 36, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
      };

  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Ambient bloom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 50% 40%, rgba(37, 211, 102, 0.06), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <span className="inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-rm-primary bg-[#E8F5E9] border border-rm-green/20 rounded-full px-4 py-1.5 mb-5">
            ⚡ Sirf 3 steps
          </span>
          <h2
            className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-rm-text"
            style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            Kaise <span className="gradient-text">Kaam</span> Karta Hai?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-rm-muted font-body max-w-lg mx-auto">
            Koi app download nahi. Koi account banana nahi. Bas WhatsApp.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Self-drawing connector line + travelling message dot (desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[16.5%] right-[16.5%] h-[3px]" aria-hidden="true">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #25D366, #006D2F, #FF9933, #006D2F, #25D366)',
                transformOrigin: 'left center',
                opacity: 0.35,
              }}
              initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
            />
            {/* Message dot flowing 1 → 2 → 3 */}
            {!reduceMotion && (
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  animate={{ x: ['0%', '100%'], opacity: [0, 1, 1, 1, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6, repeatDelay: 0.8 }}
                >
                  <div className="w-3 h-3 -mt-[5px] rounded-full bg-rm-green shadow-[0_0_14px_rgba(37,211,102,0.9),0_0_4px_rgba(37,211,102,1)]" />
                </motion.div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, i) => (
              <div
                key={i}
                data-testid={`step-${i + 1}`}
                className="group flex flex-col items-center text-center"
              >
                {/* Step number badge — pops as the line reaches it */}
                <motion.div
                  className="relative z-10 mb-6"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={
                    reduceMotion
                      ? { duration: 0.2 }
                      : { type: 'spring', stiffness: 380, damping: 18, delay: 0.15 + i * 0.4 }
                  }
                >
                  <div
                    className="w-[88px] h-[88px] rounded-full flex flex-col items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105"
                    style={{
                      background: step.badge,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 6px rgba(27,28,26,0.12), 0 12px 28px ${step.glow}`,
                    }}
                  >
                    <span className="text-2xl leading-none mb-0.5">{step.icon}</span>
                    <span className="text-white font-heading font-extrabold text-lg leading-none">{step.num}</span>
                  </div>
                </motion.div>

                {/* Title + description */}
                <motion.div
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={
                    reduceMotion
                      ? { duration: 0.2 }
                      : { duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 + i * 0.4 }
                  }
                >
                  <h3 className="font-heading font-bold text-xl text-rm-text mb-3">{step.title}</h3>
                  <p className="text-rm-muted text-[15px] leading-relaxed max-w-xs font-body mb-5">{step.desc}</p>
                </motion.div>

                {/* Example as a real WhatsApp bubble */}
                <ExampleBubble step={step} delay={0.45 + i * 0.4} reduceMotion={reduceMotion} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="how-it-works-cta"
            className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-lg px-8 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_4px_rgba(0,109,47,0.15),0_8px_20px_rgba(0,109,47,0.25),0_20px_48px_rgba(37,211,102,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_8px_rgba(0,109,47,0.18),0_12px_28px_rgba(0,109,47,0.3),0_28px_64px_rgba(37,211,102,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
          >
            🚀 Abhi Try Karo — Free Hai
          </a>
          <p className="mt-3 text-sm text-rm-muted font-body">Setup time: sirf 30 seconds ⚡</p>
        </motion.div>
      </div>
    </section>
  );
}
