import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import BusinessSection from "@/components/landing/BusinessSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import AdminDashboard from "@/pages/AdminDashboard";
import ProCheckout from "@/pages/ProCheckout";
import BusinessLanding from "@/pages/BusinessLanding";
import JoinPage from "./pages/JoinPage";
import B2BSuccess from "./pages/B2BSuccess";

function LandingPage() {
  useScrollAnimation();

  const [showExitBanner, setShowExitBanner] = useState(false);
  const [exitBannerShown, setExitBannerShown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let maxScrollY = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      
      // Track maximum scroll position
      if (currentY > maxScrollY) maxScrollY = currentY;
      
      // If user has scrolled down at least 500px and is now scrolling back up significantly
      if (!exitBannerShown && maxScrollY > 500 && currentY < maxScrollY - 200 && currentY > 100) {
        setShowExitBanner(true);
        setExitBannerShown(true);
        // Auto-hide after 8 seconds
        setTimeout(() => setShowExitBanner(false), 8000);
      }
      
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [exitBannerShown]);

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
      <BusinessSection />
      <FinalCTA />
      <Footer />
      
      {/* Floating WhatsApp CTA Button — DESKTOP ONLY */}
      <a
        href="https://wa.me/916269915175?text=Hi"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex wa-pulse"
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
    {/* Mobile Exit Intent Banner */}
      {showExitBanner && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            bottom: '56px',
            left: '12px',
            right: '12px',
            zIndex: 9998,
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '16px 20px',
            boxShadow: '0px 12px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideUp 0.4s ease-out',
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: '700', fontSize: '14px', color: '#1B1C1A', marginBottom: '2px' }}>
              Ruko! Ek reminder try kar lo 🔔
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>
              Free hai. 30 second. Koi app nahi.
            </p>
          </div>
          <a
            href="https://wa.me/916269915175?text=Hi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#25D366',
              color: 'white',
              borderRadius: '12px',
              padding: '10px 16px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: '700',
              fontSize: '13px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Hi bolo →
          </a>
          <button
            onClick={() => setShowExitBanner(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              fontSize: '16px',
              color: '#9CA3AF',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ✕
          </button>
        </div>
      )}
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
        <Route path="/business" element={<BusinessLanding />} />
        <Route path="/b2b-success" element={<B2BSuccess />} />
        <Route path="/join/:code" element={<JoinPage />} />
      </Routes>
    </Router>
  );
}

export default App;
