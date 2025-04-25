
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

const Index = () => {
  const [showCart, setShowCart] = useState(false);
  
  return (
    <div className="min-h-screen bg-cyborg-dark text-white overflow-x-hidden">
      <div className="interactive-bg">
        <Navbar onCartClick={() => setShowCart(true)} />
        <Hero />
        <Products />
        <About />
        <Footer />
        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      </div>
    </div>
  );
};

export default Index;
