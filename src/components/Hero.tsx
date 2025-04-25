
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      heroRef.current.style.setProperty('--mouse-x', `${x * 20}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y * 20}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-cyborg-dark overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(
          circle at calc(50% + var(--mouse-x, 0)) calc(50% + var(--mouse-y, 0)),
          rgba(0, 100, 200, 0.15),
          transparent 40%
        )`
      }}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="flex-1 text-center lg:text-left mb-10 lg:mb-0 z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(to_right,#0ea5e9,#2563eb,#0ea5e9)] bg-[length:200%_auto]">
            Evolution Beyond Humanity
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0">
            Premium cybernetic enhancements designed to transcend physical limitations. 
            Experience the future with Cybrix Core technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              onClick={scrollToProducts} 
              size="lg" 
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all group"
            >
              <span className="relative z-10">Explore Products</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
            <img 
              src="/cyborg-hero.png" 
              alt="Cybrix Core Enhancement" 
              className="relative z-10 w-full h-full object-contain animate-float"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToProducts}>
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
