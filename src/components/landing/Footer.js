import { Bell } from 'lucide-react';

const B2B_EMAIL = 'mailto:ayushmalviya1806@gmail.com?subject=B2B%20Inquiry';

const QUICK_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'For Business', href: '#for-business' },
];

const SUPPORT_LINKS = [
  { label: 'Contact Support', href: 'mailto:ayushmalviya1806@gmail.com' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export default function Footer() {
  return (
    <footer data-testid="footer-section" className="bg-[#1B1C1A] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 - Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">RemindMe India</span>
            </div>
            <p className="text-sm text-white/40 font-body leading-relaxed mb-6">
              The AI-powered WhatsApp assistant that makes sure you never forget anything important again.
            </p>
            <p className="text-xs text-white/25 font-body">
              &copy; 2026 RemindMe India. Made with ❤️ in Indore, India 🇮🇳
            </p>
          </div>

          {/* Col 2 - Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white/80 mb-4 uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/40 hover:text-rm-green transition-colors font-body"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 - Support */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white/80 mb-4 uppercase tracking-wider">Support</h4>
            <div className="space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-white/40 hover:text-rm-green transition-colors font-body"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 - Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white/80 mb-4 uppercase tracking-wider">Contact</h4>
            <a
              href={B2B_EMAIL}
              className="block text-sm text-white/40 hover:text-rm-green transition-colors font-body mb-4"
              data-testid="footer-email"
            >
              ayushmalviya1806@gmail.com
            </a>
            <p className="text-xs text-white/25 font-body leading-relaxed">
              Powered by OpenAI GPT-4 + Meta WhatsApp API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
