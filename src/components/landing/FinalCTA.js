const WA_LINK = 'https://wa.me/916269915175?text=Hi';

const TRUST_ITEMS = [
  '🔒 100% Free to start',
  '✅ No spam ever',
  '🇮🇳 Made in India',
  '⚡ Works instantly',
];

export default function FinalCTA() {
  return (
    <section
      data-testid="final-cta-section"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #006D2F 0%, #25D366 100%)' }}
    >
      {/* Background decorative element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-[500px] h-[500px] opacity-[0.08]"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="scroll-fade-up font-heading font-extrabold text-white tracking-tight" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1 }}>
          Ek WhatsApp message.<br />
          Bas. Kabhi kuch mat bhoolo.
        </h2>

        <p className="scroll-fade-up scroll-fade-up-delay-1 mt-6 text-lg sm:text-xl text-white/80 font-body max-w-md mx-auto leading-relaxed">
          30 second mein ready. Koi app nahi. Koi credit card nahi.<br />
          Hindi, Hinglish, English — jo bolo, yaad rakhega.
        </p>

        <div className="scroll-fade-up scroll-fade-up-delay-2 mt-10">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="final-cta-button"
            className="inline-flex items-center gap-2 rounded-full bg-white text-rm-primary font-heading font-bold text-xl px-10 py-5 shadow-[0px_16px_48px_rgba(0,0,0,0.2)] hover:shadow-[0px_20px_56px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            � Abhi Hi Bolo — Free Hai →
          </a>
          <p className="mt-4 text-sm text-white/60 font-body">
            👆 Tap to open WhatsApp directly
          </p>
          <p className="mt-6 text-white/60 text-sm font-body">
            Already decided?{' '}
            <a
              href="/pro"
              className="text-white underline font-semibold hover:opacity-80 transition-opacity"
            >
              Seedha Pro lelo — ₹99/month (Chai se sasta ☕) →
            </a>
          </p>
        </div>

        {/* Trust row */}
        <div className="scroll-fade-up scroll-fade-up-delay-3 mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6" data-testid="final-trust-row">
          {TRUST_ITEMS.map((item, i) => (
            <span key={i} className="text-sm text-white/70 font-body">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
