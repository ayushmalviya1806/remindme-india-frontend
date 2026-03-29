const WA_LINK = 'https://wa.me/916269915175?text=Hi';

const STEPS = [
  {
    num: '1',
    icon: '💬',
    title: 'Message Bhejo',
    desc: 'Apni language mein WhatsApp karo. "Kal doctor 3 baje" — bas itna kaafi hai.',
    example: 'Kal subah 10 baje meeting hai',
    bg: 'bg-rm-green',
  },
  {
    num: '2',
    icon: '🤖',
    title: 'AI Samajh Jaata Hai',
    desc: 'GPT-4 AI tumhara message samajhta hai — task, date, time, language sab extract karta hai automatically.',
    example: '✅ Meeting set for tomorrow 10 AM',
    bg: 'bg-rm-primary',
  },
  {
    num: '3',
    icon: '🔔',
    title: 'Time Pe Notification',
    desc: 'Bilkul sahi time par WhatsApp notification. Reply "Done" to mark complete, "Snooze" for later.',
    example: '🔔 Meeting in 30 minutes!',
    bg: 'bg-rm-green',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 scroll-fade-up">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-rm-text tracking-tight">
            Kaise Kaam Karta Hai?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-rm-muted font-body max-w-lg mx-auto">
            Koi app download nahi. Koi account banana nahi. Bas WhatsApp.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[16.5%] right-[16.5%] h-[2px] border-t-2 border-dashed border-rm-green/30" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, i) => (
              <div
                key={i}
                data-testid={`step-${i + 1}`}
                className={`scroll-fade-up scroll-fade-up-delay-${i + 1} flex flex-col items-center text-center`}
              >
                {/* Step number circle */}
                <div className={`relative z-10 w-[72px] h-[72px] ${step.bg} rounded-full flex items-center justify-center shadow-lg mb-6`}>
                  <span className="text-white font-heading font-extrabold text-2xl">{step.num}</span>
                </div>

                {/* Icon + Title */}
                <span className="text-3xl mb-3">{step.icon}</span>
                <h3 className="font-heading font-bold text-xl text-rm-text mb-3">{step.title}</h3>
                <p className="text-rm-muted text-[15px] leading-relaxed max-w-xs font-body mb-5">{step.desc}</p>

                {/* Example bubble */}
                <div className="bg-rm-surface rounded-2xl px-5 py-3 text-sm text-rm-text font-body shadow-sm max-w-xs">
                  {step.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 scroll-fade-up">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="how-it-works-cta"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-lg px-8 py-4 shadow-[0px_12px_32px_rgba(0,109,47,0.3)] hover:shadow-[0px_16px_40px_rgba(0,109,47,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            � Abhi Try Karo — Free Hai
          </a>
          <p className="mt-3 text-sm text-rm-muted font-body">Setup time: sirf 30 seconds ⚡</p>
        </div>
      </div>
    </section>
  );
}
