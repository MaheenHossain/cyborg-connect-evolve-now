import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Scene } from './3D/Scene';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-cyborg-dark overflow-hidden pt-20 lg:pt-0"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          style={{ opacity }}
          className="flex-1 text-center lg:text-left z-10 mt-16 lg:mt-0"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-cyber animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(to_right,#0ea5e9,#a855f7,#0ea5e9)] bg-[length:200%_auto]">
            Evolution Beyond Humanity
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0"
          >
            Premium cybernetic enhancements designed to transcend physical limitations. 
            Experience the future with Cybrix Core technology.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button 
              onClick={scrollToProducts} 
              size="lg" 
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-size-200 hover:bg-right-bottom transition-all duration-500 group"
            >
              <span className="relative z-10">Explore Products</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex-1 h-[400px] lg:h-[600px] w-full relative reveal-on-scroll"
          style={{ y, opacity }}
        >
          <Scene />
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Button variant="ghost" size="icon" onClick={scrollToProducts}>
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
