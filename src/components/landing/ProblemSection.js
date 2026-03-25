const PAIN_CARDS = [
  {
    icon: '🩺',
    title: 'Doctor appointment bhool gaye?',
    body: 'Slot milta nahi. Waiting list mein hafte lagte hain. Ek bhool ki itni badi keemat?',
    tag: 'Health risk + wasted time',
    tagColor: 'bg-red-50 text-red-600',
  },
  {
    icon: '💳',
    title: 'EMI ya credit card late hua?',
    body: '₹500 to ₹1,500 late fee. CIBIL score down. Ek yaad na rehne ki wajah se itna nuksaan?',
    tag: '₹500–₹1,500 lost per slip',
    tagColor: 'bg-orange-50 text-orange-600',
  },
  {
    icon: '💊',
    title: 'Medicine lena bhool gaye... phir se?',
    body: 'BP, diabetes, thyroid — consistency hi treatment hai. Bhool gaye to mahino ki mehnat kharab.',
    tag: 'Health consistency broken',
    tagColor: 'bg-yellow-50 text-yellow-700',
  },
];

export default function ProblemSection() {
  return (
    <section data-testid="problem-section" className="py-20 lg:py-32" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 scroll-fade-up">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-rm-text tracking-tight">
            Kitni baar hua aisa?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-rm-muted font-body">
            Chote chote bhool... bade bade nuksan
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PAIN_CARDS.map((card, i) => (
            <div
              key={i}
              data-testid={`pain-card-${i}`}
              className={`scroll-fade-up scroll-fade-up-delay-${i + 1} bg-white rounded-2xl p-8 shadow-[0px_12px_32px_rgba(27,28,26,0.05)] hover:-translate-y-2 hover:shadow-[0px_20px_48px_rgba(27,28,26,0.1)] transition-all duration-400 cursor-default`}
            >
              <span className="text-5xl block mb-5">{card.icon}</span>
              <h3 className="font-heading font-bold text-xl text-rm-text mb-3">{card.title}</h3>
              <p className="text-rm-muted text-[15px] leading-relaxed mb-6 font-body">{card.body}</p>
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${card.tagColor}`}>
                {card.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p className="scroll-fade-up text-center mt-14 text-lg sm:text-xl font-heading font-bold text-rm-primary">
          RemindMe India yeh sab hone se pehle rok deta hai. Forever.
        </p>
      </div>
    </section>
  );
}
