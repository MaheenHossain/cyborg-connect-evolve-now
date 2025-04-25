
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for logo on hover
  const logoAnimation = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 bg-blue-500 rounded-full overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="absolute w-full h-full flex items-center justify-center">
              <div className="w-6 h-6 border-t-2 border-l-2 border-white rounded-full rotate-45"></div>
            </div>
            <div className="absolute w-full h-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            CYBRIX CORE
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <a href="#products" className="hover:text-cyan-400 transition-colors">Products</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <Button 
            onClick={onCartClick}
            variant="ghost" 
            size="icon"
            className="relative hover:bg-blue-800/20 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <Button 
            onClick={onCartClick} 
            variant="ghost" 
            size="icon"
            className="relative mr-2 hover:bg-blue-800/20"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
          <Button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            variant="ghost" 
            size="icon"
            className="hover:bg-blue-800/20"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <a href="#products" className="py-2 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Products</a>
            <a href="#about" className="py-2 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
