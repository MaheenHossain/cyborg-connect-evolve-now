
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative pt-12 pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-radial from-cyborg-purple/20 to-transparent blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-radial from-cyborg-blue/20 to-transparent blur-3xl"></div>
      
      {/* Floating cyber elements */}
      <div className="absolute top-1/4 left-1/4 h-8 w-8 rounded-full bg-cyborg-purple/40 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 right-1/3 h-6 w-6 rounded-full bg-cyborg-blue/40 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/4 h-5 w-5 rounded-full bg-cyborg-purple-light/40 animate-float" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="md:max-w-xl lg:max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="block text-gradient">Connect. Evolve.</span>
              <span className="block">The Cybernetic Community.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 md:pr-12">
              Join a revolutionary platform where human and technology combine to create the most advanced community experience. Evolve together in our cybernetic ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Button className="bg-gradient-to-r from-cyborg-purple to-cyborg-blue text-white hover:opacity-90 text-lg px-8 py-6">
                Get Started
              </Button>
              <Button variant="outline" className="border-cyborg-purple-light text-cyborg-purple-light hover:bg-cyborg-purple hover:text-white text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block mt-12 md:mt-0 md:ml-10 lg:ml-20 relative">
            <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-cyborg-purple/30 p-1 animate-glow">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-cyborg-dark-light to-cyborg-dark overflow-hidden">
                {/* Simulating a cyborg/futuristic image */}
                <div className="absolute inset-0 bg-cyber-grid opacity-40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-cyborg-purple/40 to-cyborg-blue/40 animate-pulse-slow"></div>
                </div>
              </div>
            </div>
            {/* Tech nodes around the circle */}
            <div className="absolute top-1/4 -left-4 h-6 w-6 rounded-full bg-cyborg-purple animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 -right-4 h-8 w-8 rounded-full bg-cyborg-blue animate-pulse-slow"></div>
            <div className="absolute -top-4 right-1/4 h-5 w-5 rounded-full bg-cyborg-purple-light animate-pulse-slow"></div>
            <div className="absolute -bottom-4 left-1/4 h-7 w-7 rounded-full bg-cyborg-blue-light animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
