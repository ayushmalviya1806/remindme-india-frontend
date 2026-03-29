import { Check } from 'lucide-react';

const WA_LINK = 'https://wa.me/916269915175?text=Hi';
const RAZORPAY_LINK = '/pro';

const FREE_FEATURES = [
  '10 free reminders',
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

export default function Pricing() {
  return (
    <section id="pricing" data-testid="pricing-section" className="py-20 lg:py-32" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 scroll-fade-up">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-rm-text tracking-tight">
            Kitna lagega?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-rm-muted font-body">
            Koi hidden charges nahi. Chai se bhi sasta. ☕
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Free Card */}
          <div
            data-testid="pricing-free-card"
            className="scroll-fade-up scroll-fade-up-delay-1 bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-[0px_12px_32px_rgba(27,28,26,0.05)] hover:-translate-y-1 hover:shadow-[0px_16px_40px_rgba(27,28,26,0.08)] transition-all duration-400"
          >
            <div className="mb-6">
              <p className="text-rm-muted text-sm font-body mb-1">FREE TRIAL</p>
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-5xl text-rm-text">₹0</span>
                <span className="text-rm-muted text-sm font-body">/month</span>
              </div>
              <p className="text-sm text-rm-muted mt-2 font-body">Koi credit card nahi • 30 sec setup</p>
            </div>

            <div className="space-y-3 mb-8">
              {FREE_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-rm-green/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-rm-green" />
                  </div>
                  <span className="text-sm text-rm-text font-body">{f}</span>
                </div>
              ))}
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="pricing-free-cta"
              className="block text-center rounded-full border-2 border-rm-primary text-rm-primary font-heading font-bold text-base px-6 py-3.5 hover:bg-rm-primary hover:text-white transition-all duration-300"
            >
              Start Free Now →
            </a>
            <p className="text-center text-xs text-rm-muted mt-3 font-body">Setup in 30 seconds</p>
          </div>

          {/* Pro Card */}
          <div
            data-testid="pricing-pro-card"
            className="scroll-fade-up scroll-fade-up-delay-2 relative rounded-3xl p-8 text-white shadow-[0px_16px_48px_rgba(0,109,47,0.25)] hover:-translate-y-1 hover:shadow-[0px_20px_56px_rgba(0,109,47,0.35)] transition-all duration-400"
            style={{ background: 'linear-gradient(135deg, #006D2F, #1a5c3a)' }}
          >
            {/* Badge */}
            <span className="absolute top-6 right-6 bg-rm-green text-rm-text text-xs font-bold font-heading px-3 py-1 rounded-full">
              Most Popular
            </span>

            {/* Urgency Badge */}
            <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold mb-4">
              🔥 Limited Beta Price
            </div>

            <div className="mb-6">
              <p className="text-white/60 text-sm font-body mb-1">PRO</p>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-2xl text-white/40 line-through">₹199</span>
                <span className="font-heading font-extrabold text-5xl text-white">₹99</span>
                <span className="text-white/60 text-sm font-body">/month</span>
              </div>
              <p className="text-sm text-white/60 mt-2 font-body">= ₹3.3/day — chai se bhi sasta ☕</p>
              <p className="text-sm text-white/40 mt-1 font-body">Cancel anytime. No lock-in.</p>
            </div>

            <div className="space-y-3 mb-8">
              {PRO_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-rm-green" />
                  </div>
                  <span className="text-sm text-white/90 font-body">{f}</span>
                </div>
              ))}
            </div>

            <a
              href={RAZORPAY_LINK}
              data-testid="pricing-pro-cta"
              className="block text-center rounded-full bg-white text-rm-primary font-heading font-bold text-base px-6 py-3.5 hover:bg-rm-beige transition-all duration-300 shadow-lg"
            >
              ☕ Pro lelo — Chai se sasta hai →
            </a>
            <p className="text-center text-xs text-white/50 mt-3 font-body">
              🔒 Secured by Razorpay • UPI, Cards, NetBanking
            </p>
          </div>
        </div>

        {/* Cost comparison box */}
        <div className="scroll-fade-up max-w-2xl mx-auto mt-12 bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-center font-heading font-bold text-lg text-rm-text mb-4">Sochiye zara...</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3">
              <p className="font-heading font-extrabold text-2xl text-red-500">₹500+</p>
              <p className="text-sm text-rm-muted font-body mt-1">Ek missed appointment ka nuksaan</p>
            </div>
            <div className="p-3">
              <p className="font-heading font-extrabold text-2xl text-red-500">₹500+</p>
              <p className="text-sm text-rm-muted font-body mt-1">Ek late EMI ki penalty</p>
            </div>
            <div className="p-3">
              <p className="font-heading font-extrabold text-2xl text-green-600">₹99</p>
              <p className="text-sm text-rm-muted font-body mt-1">RemindMe Pro — poore mahine</p>
            </div>
          </div>
        </div>

        <p className="scroll-fade-up text-center mt-8 text-base sm:text-lg text-rm-muted font-body max-w-lg mx-auto">
          💬 "Pehle free try karo. Pasand aaye toh Pro lo. Pasand na aaye toh kuch nahi."
        </p>
      </div>
    </section>
  );
}
