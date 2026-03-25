const TESTIMONIALS = [
  {
    stars: 5,
    quote: 'Pehli baar poore saal koi EMI miss nahi hui. ₹1,200 late fee bachaya. Yeh app meri zindagi mein rehna chahiye.',
    name: 'Rahul S.',
    role: 'Tech Lead, Bengaluru',
    initials: 'RS',
    color: 'bg-blue-500',
  },
  {
    stars: 5,
    quote: 'Mere parents ke liye medicine reminders set kiye. Hinglish mein type karta hoon, perfectly samjhta hai. Koi app nahi sikhana pada unhe — WhatsApp toh pehle se aata hai.',
    name: 'Priya K.',
    role: 'Mumbai',
    initials: 'PK',
    color: 'bg-purple-500',
  },
  {
    stars: 5,
    quote: 'Clinic mein patient no-shows 60% kam ho gaye. Har appointment ke liye automatically WhatsApp reminder jaata hai. Game changer for my practice.',
    name: 'Dr. Ashish Mehta',
    role: 'Pediatrician, Indore',
    initials: 'AM',
    color: 'bg-emerald-500',
  },
];

const TRUST_ITEMS = [
  '4.9/5 rating',
  '🔒 Data stored in India',
  '✅ Powered by Meta WhatsApp API',
  '🤖 GPT-4 AI Engine',
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section data-testid="social-proof-section" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 scroll-fade-up">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-rm-text tracking-tight">
            Indians Ka Bharosa
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              data-testid={`testimonial-card-${i}`}
              className={`scroll-fade-up scroll-fade-up-delay-${i + 1} bg-white rounded-2xl p-7 shadow-[0px_12px_32px_rgba(27,28,26,0.05)] hover:-translate-y-1 hover:shadow-[0px_16px_40px_rgba(27,28,26,0.08)] transition-all duration-400`}
            >
              <StarRating count={t.stars} />
              <p className="text-rm-text text-[15px] leading-relaxed font-body mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white text-sm font-bold font-heading`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-rm-text">{t.name}</p>
                  <p className="text-xs text-rm-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="scroll-fade-up mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-rm-muted font-body" data-testid="trust-strip">
          {TRUST_ITEMS.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i === 0 && <span className="text-yellow-400">⭐</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
