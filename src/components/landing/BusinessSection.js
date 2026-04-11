import { Link } from 'react-router-dom';

export default function BusinessSection() {
  return (
    <section className="py-20 bg-white" data-testid="business-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-rm-text tracking-tight mb-4">
            Run a Gym, Clinic, or Coaching Center?
          </h2>
          <p className="text-xl text-rm-muted font-heading font-semibold mb-8 max-w-2xl mx-auto">
            Auto-remind your members about subscription renewals on WhatsApp. ₹999/month.
          </p>
          <Link
            to="/business"
            className="inline-flex items-center gap-2 rounded-full border-2 border-rm-primary text-rm-primary font-heading font-bold text-base px-8 py-4 hover:bg-rm-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Learn More
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
