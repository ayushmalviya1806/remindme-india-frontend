import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Bell } from 'lucide-react';

const WA_LINK = 'https://wa.me/916269915175?text=Hi';

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'For Business', href: '#for-business' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <nav
      data-testid="sticky-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-[0px_4px_20px_rgba(27,28,26,0.06)]'
          : ''
      }`}
      style={{
        backgroundColor: 'rgba(250, 249, 245, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" data-testid="nav-logo">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-extrabold text-lg text-rm-primary tracking-tight">
              RemindMe India
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-testid={`nav-link-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                className="text-sm font-medium text-rm-muted hover:text-rm-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-rm-green after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="nav-cta-button"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-sm px-6 py-2.5 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Try Free on WhatsApp
            <span className="text-base">→</span>
          </a>

          <a
            href="https://rzp.io/rzp/kGQ6Iujq"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1 rounded-full border-2 border-rm-primary text-rm-primary font-heading font-bold text-sm px-5 py-2.5 hover:bg-rm-primary hover:text-white transition-all duration-300"
          >
            Get Pro ₹99 →
          </a>

          {/* Mobile Hamburger */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-rm-text hover:bg-rm-surface transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        data-testid="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{
          backgroundColor: 'rgba(250, 249, 245, 0.98)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="px-4 pb-6 pt-2 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-rm-text hover:bg-rm-surface transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            data-testid="mobile-cta-button"
            className="block mt-3 text-center rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-sm px-6 py-3 shadow-lg"
          >
            Try Free on WhatsApp →
          </a>
        </div>
      </div>
    </nav>
  );
}
