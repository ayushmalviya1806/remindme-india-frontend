import "@/App.css";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import SocialProof from "@/components/landing/SocialProof";
import Pricing from "@/components/landing/Pricing";
import B2BSection from "@/components/landing/B2BSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

function App() {
  useScrollAnimation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F5' }}>
      <Navbar />
      <Hero />
      <StatsBar />
      <ProblemSection />
      <HowItWorks />
      <FeaturesGrid />
      <SocialProof />
      <Pricing />
      <B2BSection />
      <FinalCTA />
      <Footer />
      
      {/* Floating WhatsApp CTA Button */}
      <a
        href="https://wa.me/916269915175?text=Hi"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          backgroundColor: '#25D366',
          borderRadius: '50px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0px 8px 24px rgba(37, 211, 102, 0.4)',
          textDecoration: 'none',
          color: 'white',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: '700',
          fontSize: '14px',
        }}
      >
        💬 Try Free
      </a>
    </div>
  );
}

export default App;
