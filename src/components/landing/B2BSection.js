const B2B_WHATSAPP = 'https://wa.me/916269915175?text=' + encodeURIComponent(
  `Hi, I'm interested in RemindMe India for my business.\n\nBusiness type: \nCity: ` 
);

const STATS = [
  { value: '60%', label: 'fewer no-shows' },
  { value: '98%', label: 'WhatsApp open rate' },
  { value: '₹0', label: 'setup cost' },
];

const USE_CASES = [
  {
    icon: '🏥',
    title: 'Clinics & Hospitals',
    desc: 'Patient appointment reminders. Automatically. Before every visit.',
  },
  {
    icon: '🏪',
    title: 'Retailers & Businesses',
    desc: 'Payment dues, order updates, follow-ups — sab automated.',
  },
  {
    icon: '📚',
    title: 'Coaching & Education',
    desc: 'Class reminders, fee alerts, exam notifications for every student.',
  },
];

export default function B2BSection() {
  return (
    <section id="for-business" data-testid="b2b-section" className="py-20 lg:py-32 bg-rm-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="flex-1 text-white scroll-fade-up">
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              Apne Business ke liye
            </h2>
            <p className="text-xl text-white/80 font-heading font-semibold mb-4">
              Customers ko automatically WhatsApp pe remind karo. No tech team needed.
            </p>
            <p className="text-base text-white/60 font-body leading-relaxed mb-8 max-w-lg">
              Clinics, coaching centers, salons, retailers — jo bhi business appointment ya payment pe dependent hai, RemindMe India unke liye banaya gaya hai.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              {STATS.map((s, i) => (
                <div key={i}>
                  <p className="font-heading font-extrabold text-3xl text-rm-green">{s.value}</p>
                  <p className="text-sm text-white/60 font-body mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <a
              href={B2B_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="b2b-cta"
              className="inline-flex items-center gap-2 rounded-full bg-white text-rm-primary font-heading font-bold text-base px-8 py-4 hover:bg-rm-beige transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              💬 WhatsApp pe Baat Karo →
            </a>
          </div>

          {/* Right - Use case cards */}
          <div className="flex-1 grid gap-5">
            {USE_CASES.map((uc, i) => (
              <div
                key={i}
                data-testid={`b2b-use-case-${i}`}
                className={`scroll-fade-up scroll-fade-up-delay-${i + 1} bg-white rounded-2xl p-6 flex items-start gap-4 hover:-translate-y-1 hover:shadow-[0px_12px_32px_rgba(27,28,26,0.1)] transition-all duration-300`}
              >
                <span className="text-3xl flex-shrink-0">{uc.icon}</span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-rm-text mb-1">{uc.title}</h3>
                  <p className="text-sm text-rm-muted font-body leading-relaxed">{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
