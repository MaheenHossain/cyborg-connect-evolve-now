
import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cyborg-dark-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="h-8 w-8 rounded-full bg-gradient-to-r from-cyborg-purple to-cyborg-blue flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </span>
              <span className="text-lg font-bold text-gradient">CyborgConnect</span>
            </Link>
            <p className="text-gray-400 text-sm">
              The next evolution of community building. Connect, collaborate, and evolve together.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Features</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Security</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">FAQ</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Community Guidelines</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Support</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Partners</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 CyborgConnect. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Terms of Service</Link>
            <Link to="/" className="text-gray-400 hover:text-cyborg-purple-light text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
