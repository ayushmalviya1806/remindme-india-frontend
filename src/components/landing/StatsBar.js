const STATS = [
  '📱 853 Million Indians use WhatsApp daily',
  '📬 98% WhatsApp open rate vs 20% email',
  '⏰ 80% messages read within 5 minutes',
  '🇮🇳 Zero competitors in India doing this',
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
