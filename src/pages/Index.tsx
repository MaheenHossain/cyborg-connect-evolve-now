
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CoreTechnology from '@/components/CoreTechnology';
import Products from '@/components/Products';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { motion, AnimatePresence } from 'framer-motion';

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
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
