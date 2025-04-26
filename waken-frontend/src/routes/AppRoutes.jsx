import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Features from '../pages/Features';
import Join from '../pages/Join';
import Contact from '../pages/Contact';
import VitaSection from '../components/VitaSection';
import HeroSection from '../components/HeroSection';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/vita" element={<VitaSection />} />
      <Route path="/join" element={<Join />} />
      <Route path="/contact" element={<Contact />} />
      {/* Define other routes as needed */}
    </Routes>
  );
} 