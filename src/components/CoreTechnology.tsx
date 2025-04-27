
import React from 'react';
import { motion } from 'framer-motion';
import { Scene } from './3D/Scene';
import { Badge } from './ui/badge';

const CoreTechnology = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-cyborg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="border-blue-500 bg-blue-900/20 text-blue-400 mb-4">
            Revolutionary Technology
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
              Quantum Arc Reactor Technology
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The core of all our enhancements, Cybrix Core's proprietary Arc Reactor 
            technology delivers unmatched power and performance in a compact form factor.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Model */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[400px] w-full relative mb-8 lg:mb-0"
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <Scene model="arcReactor" />
            </div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-20 pointer-events-none"></div>
          </motion.div>
          
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Clean Energy Source</h3>
              <p className="text-gray-300 leading-relaxed">
                Our proprietary Arc Reactor technology produces 3 gigajoules per second of clean, 
                sustainable energy. Each unit is capable of powering all your cybernetic enhancements 
                with minimal heat generation and zero emissions.
              </p>
            </div>
            
            <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Neural Integration</h3>
              <p className="text-gray-300 leading-relaxed">
                The Arc Reactor features advanced AI integration capabilities, allowing seamless 
                communication between your biological neural network and cybernetic enhancements, 
                resulting in response times measured in nanoseconds.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-lg text-center">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Efficiency</h4>
                <p className="text-4xl font-bold text-white">99.99%</p>
                <p className="text-gray-400 text-sm">Energy conversion</p>
              </div>
              
              <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-lg text-center">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Lifespan</h4>
                <p className="text-4xl font-bold text-white">20+ yrs</p>
                <p className="text-gray-400 text-sm">Self-regenerating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoreTechnology;
