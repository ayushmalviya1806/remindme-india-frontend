import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AdminDashboard from "@/pages/AdminDashboard";
import ProCheckout from "@/pages/ProCheckout";

function LandingPage() {
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
      
      {/* Floating WhatsApp CTA Button — DESKTOP ONLY */}
      <a
        href="https://wa.me/916269915175?text=Hi"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          backgroundColor: '#25D366',
          borderRadius: '50px',
          padding: '12px 20px',
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

      {/* Sticky Mobile CTA Bar — MOBILE ONLY */}
      <a
        href="https://wa.me/916269915175?text=Hi"
        target="_blank"
        rel="noopener noreferrer"
        className="lg:hidden"
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: 9999,
          backgroundColor: '#25D366',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0px -4px 20px rgba(37, 211, 102, 0.3)',
          textDecoration: 'none',
          color: 'white',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: '800',
          fontSize: '16px',
          letterSpacing: '0.5px',
        }}
      >
        � WhatsApp pe Start Karo — Free hai
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pro" element={<ProCheckout />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
