
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { motion } from 'framer-motion';

const Index = () => {
  const [showCart, setShowCart] = useState(false);
  
  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const revealElements = document.querySelectorAll('.reveal-element');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-cyborg-dark text-white overflow-x-hidden"
    >
      <div className="interactive-bg">
        <Navbar onCartClick={() => setShowCart(true)} />
        
        <section className="reveal-element">
          <Hero />
        </section>
        
        <section className="reveal-element">
          <Products />
        </section>
        
        <section className="reveal-element">
          <About />
        </section>
        
        <Footer />
        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      </div>
    </motion.div>
  );
};

export default Index;
