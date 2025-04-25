
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4 px-4 md:px-8 relative z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-gradient-to-r from-cyborg-purple to-cyborg-blue flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </span>
          <span className="text-lg font-bold text-gradient">CyborgConnect</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-200 hover:text-cyborg-purple-light transition-colors">Home</Link>
          <Link to="/" className="text-gray-200 hover:text-cyborg-purple-light transition-colors">Features</Link>
          <Link to="/" className="text-gray-200 hover:text-cyborg-purple-light transition-colors">Community</Link>
          <Link to="/" className="text-gray-200 hover:text-cyborg-purple-light transition-colors">About</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex border-cyborg-purple text-cyborg-purple hover:bg-cyborg-purple hover:text-white">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-cyborg-purple to-cyborg-blue text-white hover:opacity-90">
            Join Now
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
