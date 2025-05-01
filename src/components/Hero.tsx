
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LetterGlitch from './animations/LetterGlitch';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center">
      <LetterGlitch
        glitchColors={['#2b4539', '#61dca3', '#61b3dc', '#8B5CF6']}
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      
      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-black/60 p-6 rounded-lg backdrop-blur-sm border border-blue-900/30"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 filter drop-shadow-[0_3px_10px_rgba(14,165,233,0.9)]">
                  Elevate Humanity
                </span>
                <br />
                <span className="text-white filter drop-shadow-[0_3px_10px_rgba(0,0,0,1)]">
                  with Advanced Cybernetic Enhancements
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-medium bg-black/80 backdrop-blur-sm p-6 rounded-lg text-white max-w-xl border border-blue-900/50 shadow-lg shadow-blue-500/20"
            >
              Experience the future with our cutting-edge cybernetic implants and augmentations. Designed to enhance human capabilities beyond natural limitations.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Explore Products
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30">
                Learn More
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-md aspect-square relative">
              <motion.div
                className="w-full h-full relative"
                initial={{ y: 20 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <img 
                  src="https://bijcexwmtiunnlxvibvz.supabase.co/storage/v1/object/sign/maheen07/Hero%20Page%20Cyborg.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRjZWRjNTM1LTA2ZmItNDYzNy05OWJmLTMwM2JlOTNjN2M2NiJ9.eyJ1cmwiOiJtYWhlZW4wNy9IZXJvIFBhZ2UgQ3lib3JnLnBuZyIsImlhdCI6MTc0NjA5Njc1MCwiZXhwIjoxNzQ4Njg4NzUwfQ._GEXKXL3DNuxPAua9DUlqtorNt3LlcxVmS9l7EllkkQ" 
                  alt="Cybernetic Enhancement" 
                  className="object-contain w-full h-full drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
