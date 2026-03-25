const FEATURES = [
  {
    span: 'col-span-1 md:col-span-2',
    bg: 'bg-[#E8F5E9]',
    textColor: 'text-rm-text',
    icon: '🗣️',
    title: 'Hinglish Support — Bol do kisi bhi tarah',
    body: '"Kal sham 6 baje gym jana hai", "remind me tomorrow at 8am", "aaj raat 10 baje medicine" — AI samjhega. Guaranteed.',
    hasDemo: true,
  },
  {
    span: 'col-span-1',
    bg: 'bg-rm-surface',
    textColor: 'text-rm-text',
    icon: '📱',
    title: 'No App Download',
    body: 'Phone storage full? Koi problem nahi. WhatsApp ke andar hi kaam karta hai.',
  },
  {
    span: 'col-span-1',
    bg: 'bg-rm-primary',
    textColor: 'text-white',
    icon: '🤖',
    title: 'GPT-4 Powered AI',
    body: "World's most advanced AI. Natural language samjhta hai — bilkul friend ki tarah.",
  },
  {
    span: 'col-span-1',
    bg: 'bg-rm-surface',
    textColor: 'text-rm-text',
    icon: '🔁',
    title: 'Recurring Reminders',
    body: 'Daily medicine, monthly EMI, weekly meeting — ek baar set karo, hamesha yaad.',
  },
  {
    span: 'col-span-1',
    bg: 'bg-rm-surface',
    textColor: 'text-rm-text',
    icon: '🔒',
    title: '100% Private',
    body: 'Tumhara data sirf tumhara. No ads. No selling. No tracking. Ever.',
  },
  {
    span: 'col-span-1',
    bg: 'bg-rm-green',
    textColor: 'text-rm-text',
    icon: '⚡',
    title: '30 Seconds Setup',
    body: '"Hi" bhejo — aur tum ready ho. Seriously.',
  },
];

const DEMO_BUBBLES = [
  { text: 'kal sham 6 baje gym', lang: 'Hinglish' },
  { text: 'remind me at 8am tomorrow', lang: 'English' },
  { text: 'aaj raat 10 baje medicine', lang: 'Hindi' },
];

export default function FeaturesGrid() {
  return (
    <section id="features" data-testid="features-section" className="py-20 lg:py-32" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              data-testid={`feature-card-${i}`}
              className={`scroll-fade-up ${f.span} ${f.bg} ${f.textColor} rounded-2xl p-7 sm:p-8 hover:-translate-y-1 hover:shadow-[0px_16px_40px_rgba(27,28,26,0.08)] transition-all duration-400`}
            >
              <span className="text-4xl block mb-4">{f.icon}</span>
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">{f.title}</h3>
              <p className={`text-[15px] leading-relaxed font-body ${f.bg === 'bg-rm-primary' ? 'text-white/80' : f.bg === 'bg-rm-green' ? 'text-rm-text/70' : 'text-rm-muted'}`}>
                {f.body}
              </p>

              {/* Demo bubbles for Hinglish card */}
              {f.hasDemo && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {DEMO_BUBBLES.map((d, j) => (
                    <div key={j} className="bg-white/80 rounded-xl px-3 py-2 text-xs flex items-center gap-2 shadow-sm">
                      <span className="text-rm-text font-medium">{d.text}</span>
                      <span className="text-[10px] text-rm-muted/60 font-body">{d.lang}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
