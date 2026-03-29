const STATS = [
  '� 1,000+ reminders delivered by Indians',
  '�📱 850 Million Indians use WhatsApp daily',
  '📬 98% WhatsApp open rate vs 20% email',
  '⏰ Setup in 30 seconds — no app download',
  '🇮🇳 India ka pehla WhatsApp AI reminder',
  '☕ Pro plan — chai se bhi sasta (₹3.3/day)',
];

export default function StatsBar() {
  const doubled = [...STATS, ...STATS, ...STATS, ...STATS];

  return (
    <section data-testid="stats-bar" className="bg-rm-primary py-4 overflow-hidden">
      <div className="animate-marquee flex gap-12 whitespace-nowrap">
        {doubled.map((stat, i) => (
          <span
            key={i}
            className="text-white text-sm sm:text-base font-medium font-body flex-shrink-0 flex items-center gap-2"
          >
            {stat}
            {i < doubled.length - 1 && (
              <span className="text-rm-green/40 mx-4">•</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
