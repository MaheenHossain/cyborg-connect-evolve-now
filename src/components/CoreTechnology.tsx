
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import StarBorder from './animations/StarBorder';

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
          {/* Quantum Arc Reactor Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[400px] w-full relative mb-8 lg:mb-0 flex items-center justify-center"
          >
            <div className="w-[300px] h-[300px] relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/30 animate-[spin_20s_linear_infinite]">
                <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(14,165,233,0.8)]"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]"></div>
              </div>
              
              {/* Middle ring */}
              <div className="absolute inset-[40px] rounded-full border-2 border-purple-500/40 animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_2px_rgba(96,165,250,0.8)]"></div>
              </div>
              
              {/* Inner ring */}
              <div className="absolute inset-[80px] rounded-full border border-cyan-500/50 animate-[spin_10s_linear_infinite]">
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_2px_rgba(6,182,212,0.8)]"></div>
              </div>
              
              {/* Core */}
              <div className="absolute inset-[100px] rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_40px_10px_rgba(139,92,246,0.6)] flex items-center justify-center">
                {/* Energy pulses */}
                <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
                
                {/* Inner core */}
                <div className="w-[60px] h-[60px] rounded-full bg-white animate-pulse shadow-[0_0_20px_5px_rgba(255,255,255,0.8)]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 animate-ping" style={{animationDuration: '1.5s'}}></div>
                  </div>
                </div>
                
                {/* Energy beams */}
                <div className="absolute h-[180%] w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse"></div>
                <div className="absolute h-[2px] w-[180%] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                
                {/* Particles */}
                {Array.from({length: 8}).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_5px_2px_rgba(59,130,246,0.6)]" 
                    style={{
                      top: `${50 + Math.sin(i * (Math.PI / 4)) * 30}%`,
                      left: `${50 + Math.cos(i * (Math.PI / 4)) * 30}%`,
                      animationDuration: `${2 + i * 0.5}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Circuit traces */}
              <div className="absolute inset-0 rounded-full">
                <div className="absolute top-[50%] -right-[80px] h-[2px] w-[80px] bg-blue-500/50"></div>
                <div className="absolute top-[50%] -left-[80px] h-[2px] w-[80px] bg-blue-500/50"></div>
                <div className="absolute left-[50%] -top-[80px] w-[2px] h-[80px] bg-purple-500/50"></div>
                <div className="absolute left-[50%] -bottom-[80px] w-[2px] h-[80px] bg-purple-500/50"></div>
              </div>
            </div>
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
                <StarBorder color="#0ea5e9" className="w-full h-full">
                  <div className="p-2">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Efficiency</h4>
                    <p className="text-4xl font-bold text-white">99.99%</p>
                    <p className="text-gray-400 text-sm">Energy conversion</p>
                  </div>
                </StarBorder>
              </div>
              
              <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-lg text-center">
                <StarBorder color="#0ea5e9" className="w-full h-full">
                  <div className="p-2">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Lifespan</h4>
                    <p className="text-4xl font-bold text-white">20+ yrs</p>
                    <p className="text-gray-400 text-sm">Self-regenerating</p>
                  </div>
                </StarBorder>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoreTechnology;
