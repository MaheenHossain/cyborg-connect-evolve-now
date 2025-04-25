
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-cyborg-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
