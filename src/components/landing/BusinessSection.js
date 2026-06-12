import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const ICONS = ['💪', '🏥', '📚'];

const VIEWPORT = { once: true, margin: '-80px' };

export default function BusinessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 overflow-hidden" data-testid="business-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT}
          transition={reduceMotion ? { duration: 0.2 } : { duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="relative text-center bg-white/80 backdrop-blur-md rounded-[32px] px-6 py-12 sm:px-12 border border-black/[0.05] shadow-[0_2px_4px_rgba(27,28,26,0.04),0_16px_40px_rgba(27,28,26,0.08),0_32px_80px_rgba(0,109,47,0.06)] overflow-hidden"
        >
          {/* Inner blooms */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 12% 0%, rgba(37, 211, 102, 0.1), transparent 45%), radial-gradient(circle at 90% 100%, rgba(255, 153, 51, 0.08), transparent 45%)',
            }}
          />
          {/* Inner top highlight */}
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-10 h-px opacity-70"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)' }}
          />

          <div className="relative">
            {/* Icon trio */}
            <div className="flex justify-center gap-3 mb-6">
              {ICONS.map((icon, i) => (
                <motion.span
                  key={icon}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={
                    reduceMotion
                      ? { duration: 0.2 }
                      : { type: 'spring', stiffness: 380, damping: 18, delay: 0.15 + i * 0.1 }
                  }
                  className="w-14 h-14 rounded-2xl bg-[#E8F5E9] border border-rm-green/15 flex items-center justify-center text-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(27,28,26,0.06)]"
                >
                  {icon}
                </motion.span>
              ))}
            </div>

            <h2
              className="font-heading font-extrabold text-4xl sm:text-5xl text-rm-text mb-4"
              style={{ letterSpacing: '-0.025em', lineHeight: 1.12 }}
            >
              Gym, Clinic, ya <span className="gradient-text">Coaching Center</span> hai?
            </h2>
            <p className="text-lg sm:text-xl text-rm-muted font-heading font-semibold mb-8 max-w-2xl mx-auto">
              Members ke subscription expiry se pehle WhatsApp pe automatic reminder. Setup 5 min. Starts ₹999/month.
            </p>
            <Link
              to="/business"
              className="inline-flex items-center gap-2 rounded-full border-2 border-rm-primary text-rm-primary font-heading font-bold text-base px-8 py-4 hover:bg-rm-primary hover:text-white hover:shadow-[0_4px_16px_rgba(0,109,47,0.22),0_12px_32px_rgba(0,109,47,0.16)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
            >
              Learn More
              <span className="text-lg">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
