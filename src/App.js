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
    </div>
  );
}

export default App;
