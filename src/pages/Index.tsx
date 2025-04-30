
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CoreTechnology from '@/components/CoreTechnology';
import Products from '@/components/Products';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { motion, AnimatePresence } from 'framer-motion';
import SplashCursor from '@/components/animations/SplashCursor';
import Dock from '@/components/animations/Dock';

const Index = () => {
  const [showCart, setShowCart] = React.useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key="index-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-cyborg-dark text-white overflow-x-hidden"
      >
        <SplashCursor 
          BACK_COLOR={{ r: 0.05, g: 0.08, b: 0.16 }}
          SPLAT_RADIUS={0.3}
          COLOR_UPDATE_SPEED={5}
          CURL={4}
          SPLAT_FORCE={8000}
          SHADING={true}
          DENSITY_DISSIPATION={2.5}
        />
        
        <div className="interactive-bg">
          <Navbar onCartClick={() => setShowCart(true)} />
          
          <Hero />
          <CoreTechnology />
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            transition={{ staggerChildren: 0.2 }}
          >
            <Products />
            <About />
          </motion.div>
          
          <Footer />
          <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
          
          <Dock />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
