
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { toast } from 'sonner';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: false, amount: 0.3 });
  
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
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else if (!entry.target.classList.contains('once')) {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.scroll-observed').forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      document.querySelectorAll('.scroll-observed').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-cyborg-dark overflow-hidden pt-24 sm:pt-20 lg:pt-0"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          ref={textRef}
          style={{ opacity }}
          className="flex-1 text-center lg:text-left z-10 mt-16 lg:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2 font-cyber animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(to_right,#0ea5e9,#a855f7,#0ea5e9)] bg-[length:200%_auto]">
              Evolution Beyond Humanity
            </h1>
            <div className="h-1 w-24 bg-blue-500 mx-auto lg:mx-0 mt-4"></div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0"
          >
            Premium cybernetic enhancements designed to transcend physical limitations. 
            Experience the future with Cybrix Core technology.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
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
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-500 text-blue-400 hover:bg-blue-950/30"
            >
              Learn More
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="size-3 rounded-full bg-blue-500 animate-pulse"></div>
              <p className="text-blue-400 font-semibold">AI-Enhanced Neural Integration</p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex-1 h-[400px] lg:h-[600px] w-full relative z-0"
          style={{ y, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 z-10 bg-gradient-radial from-transparent to-cyborg-dark opacity-50 pointer-events-none"></div>
            
            <div className="absolute top-1/4 left-0 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm border border-blue-500/30 px-3 py-2 rounded-lg text-xs text-blue-400 hidden lg:block">
              Neural Capacity: 12.8 TB
            </div>
            
            <div className="absolute bottom-1/4 right-0 transform translate-x-1/2 bg-black/50 backdrop-blur-sm border border-blue-500/30 px-3 py-2 rounded-lg text-xs text-blue-400 hidden lg:block">
              Power Output: 1.21 GW
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Button variant="ghost" size="icon" onClick={scrollToProducts} className="border border-blue-500/30">
          <ArrowDown className="h-6 w-6 text-blue-400" />
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
