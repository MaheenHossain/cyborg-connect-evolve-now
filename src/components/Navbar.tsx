
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import AuthModal from '@/components/AuthModal';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import ChipTabs from './animations/ChipTabs';
import StarBorder from './animations/StarBorder';

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const { totalItems: cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: "Welcome to Cybrix Core.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out.",
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, [toast]);

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'Products') {
      const element = document.querySelector("#products");
      element?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === 'About') {
      const element = document.querySelector("#about");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-md shadow-xl' : 'bg-black/60 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse opacity-40"></div>
            <div className="absolute w-10 h-10 rounded-full bg-black flex items-center justify-center z-10">
              <div className="w-8 h-8 rounded-full border-2 border-t-blue-500 border-r-blue-500 border-b-cyan-400 border-l-cyan-400 flex items-center justify-center relative">
                <div className="absolute w-5 h-5 rounded-full border-2 border-t-blue-300 border-r-transparent border-b-transparent border-l-blue-300 animate-spin"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
            CYBRIX CORE
          </span>
        </Link>
        
        <div className="hidden md:block mx-auto">
          <ChipTabs 
            tabs={["Home", "Products", "About"]} 
            onTabChange={handleTabChange} 
          />
        </div>

        <div className="flex items-center space-x-2">
          {user ? (
            <StarBorder 
              as="button" 
              onClick={handleSignOut}
              color="#0ea5e9"
              className="hover:bg-blue-800/20 transition-colors flex items-center gap-2 px-4 py-2 rounded-md text-white"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </StarBorder>
          ) : (
            <StarBorder 
              as="button" 
              onClick={handleSignIn}
              color="#0ea5e9"
              className="hover:bg-blue-800/20 transition-colors flex items-center gap-2 px-4 py-2 rounded-md text-white"
            >
              <User className="w-4 h-4" />
              Sign In
            </StarBorder>
          )}
          
          <Button 
            onClick={onCartClick}
            variant="ghost" 
            size="icon"
            className="relative hover:bg-blue-800/20 transition-colors text-white"
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
            className="md:hidden hover:bg-blue-800/20 text-white"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <ChipTabs 
              tabs={["Home", "Products", "About"]} 
              onTabChange={(tab) => {
                handleTabChange(tab);
                setIsMenuOpen(false);
              }} 
              className="justify-center"
            />
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          product={null}
        />
      )}
    </nav>
  );
};

export default Navbar;
