import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/HeroSection';
// import FeaturesWave from '../components/FeaturesWave'; // Removed
import Features from '../components/Features';
import VitaSection from '../components/VitaSection';
import PersonalizedDashboard from '../components/PersonalizedDashboard';
import JoinAccordion from '../components/JoinAccordion';
// import ContactWave from '../components/ContactWave'; // Removed
import ContactSection from '../components/ContactSection';
// We might remove NamePrompt if it's not in the final design image
// import NamePrompt from '../components/NamePrompt'; 

// TODO: Add ContactSection component once created

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | WAKEN Health</title>
        <meta name="description" content="WAKEN Health - Physically, Mentally, Nutritionally empowered." />
      </Helmet>
      <Hero />
      {/* <FeaturesWave /> Removed */}
      <Features /> 
      <VitaSection />
      <PersonalizedDashboard />
      {/* <NamePrompt /> */}
      <JoinAccordion />
      {/* <ContactWave /> Removed */}
      <ContactSection />
      {/* TODO: <ContactSection /> */}
    </>
  );
};

export default Home; 