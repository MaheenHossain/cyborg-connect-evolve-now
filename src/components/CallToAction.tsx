
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CallToAction = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyborg-purple/20 to-cyborg-blue/20"></div>
      <div className="absolute inset-0 bg-cyber-grid opacity-30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 h-40 w-40 rounded-full bg-cyborg-purple/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-cyborg-blue/20 blur-3xl"></div>
      
      <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="cyber-card border-opacity-40 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to <span className="text-gradient">Evolve</span> Your Connections?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of members already experiencing the future of community building through our cybernetic platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-gradient-to-r from-cyborg-purple to-cyborg-blue text-white hover:opacity-90 text-lg px-8 py-6">
              Join the Community
            </Button>
            <Button variant="outline" className="border-cyborg-purple-light text-cyborg-purple-light hover:bg-cyborg-purple hover:text-white text-lg px-8 py-6">
              Schedule a Demo
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center space-x-2">
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-cyborg-dark">
                <AvatarFallback className="bg-cyborg-purple text-white text-xs">U1</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-cyborg-dark">
                <AvatarFallback className="bg-cyborg-blue text-white text-xs">U2</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-cyborg-dark">
                <AvatarFallback className="bg-cyborg-purple-light text-white text-xs">U3</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm text-gray-300">Join 5000+ members</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
