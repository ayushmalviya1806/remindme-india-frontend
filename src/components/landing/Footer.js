import { Bell, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const B2B_WHATSAPP = 'https://wa.me/916269915175?text=' + encodeURIComponent(
  `Hi, I'm interested in RemindMe India for my business.\n\nBusiness type: \nCity: `
);

const QUICK_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'For Business', href: '#for-business' },
  { label: 'Admin', href: '/admin' },
];

const SUPPORT_LINKS = [
  { label: 'Contact Support', href: 'mailto:hello.remindmeindia@gmail.com' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms-b2b' },
  { label: 'Data Processing Agreement', href: '/dpa' },
];

const VIEWPORT = { once: true, margin: '-40px' };

const LINK_CLASS =
  'group block text-sm text-white/40 hover:text-rm-green font-body transition-colors duration-200';

function FooterLink({ link }) {
  const inner = (
    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
      {link.label}
    </span>
  );
  if (link.href.startsWith('/')) {
    return (
      <Link key={link.href} to={link.href} className={LINK_CLASS}>
        {inner}
      </Link>
    );
  }
  return (
    <a key={link.href} href={link.href} className={LINK_CLASS}>
      {inner}
    </a>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const colVariants = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
      };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };

  return (
    <footer data-testid="footer-section" className="relative bg-[#141511] pt-16 lg:pt-20 pb-10 overflow-hidden">
      {/* Top seam: green hairline + rising glow */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 pointer-events-none">
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37, 211, 102, 0.5), transparent)' }} />
        <div
          className="mx-auto h-40 max-w-3xl"
          style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(37, 211, 102, 0.1), transparent 70%)' }}
        />
      </div>

      {/* Giant watermark wordmark */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-heading font-extrabold whitespace-nowrap leading-none translate-y-[30%]"
          style={{
            fontSize: 'clamp(90px, 16vw, 240px)',
            letterSpacing: '-0.04em',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 85%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          RemindMe
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {/* Col 1 - Brand */}
          <motion.div variants={colVariants} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">RemindMe India</span>
            </div>
            <p className="text-sm text-white/40 font-body leading-relaxed mb-6">
              The AI-powered WhatsApp assistant that makes sure you never forget anything important again.
            </p>
          </motion.div>

          {/* Col 2 - Quick Links */}
          <motion.div variants={colVariants}>
            <h4 className="font-heading font-bold text-sm text-white/80 mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <FooterLink key={link.href} link={link} />
              ))}
            </div>
          </motion.div>

          {/* Col 3 - Support */}
          <motion.div variants={colVariants}>
            <h4 className="font-heading font-bold text-sm text-white/80 mb-4 uppercase tracking-wider">Support</h4>
            <div className="space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <FooterLink key={link.label} link={link} />
              ))}
            </div>
          </motion.div>

          {/* Col 4 - Contact */}
          <motion.div variants={colVariants}>
            <h4 className="font-heading font-bold text-sm text-white/80 mb-4 uppercase tracking-wider">Contact</h4>
            <a
              href={B2B_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group block text-sm text-white/40 hover:text-rm-green transition-colors duration-200 font-body mb-4"
              data-testid="footer-email"
            >
              <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                💬 WhatsApp pe contact karein
              </span>
            </a>
            <a
              href="mailto:hello.remindmeindia@gmail.com"
              className="group block text-sm text-white/40 hover:text-rm-green transition-colors duration-200 font-body mb-4"
            >
              <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                📧 hello.remindmeindia@gmail.com
              </span>
            </a>
            <p className="text-xs text-white/25 font-body leading-relaxed">
              ✓ Meta Verified Business · Made with ❤️ in Indore, India 🇮🇳
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4"
          variants={colVariants}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <p className="text-xs text-white/25 font-body text-center sm:text-left">
            &copy; 2026 RemindMe India. Made with ❤️ in Indore, India 🇮🇳 | Proudly Indian
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold text-white/50 hover:text-rm-green bg-white/[0.06] hover:bg-white/10 border border-white/10 rounded-full px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
