import React from 'react';
import { 
  Navbar, 
  Hero, 
  About, 
  Edge, 
  Services, 
  Gallery, 
  CTA, 
  Contact, 
  Footer 
} from '../components';

export const LandingPage: React.FC = () => {
  return (
    <div className="text-white selection:bg-luxury-gold/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Edge />
        <Services />
        <Gallery />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
