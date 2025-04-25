
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cyborg-dark to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            About Cybrix Core
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="space-y-6"
          >
            <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Our Vision</h3>
              <p className="text-gray-300">
                At Cybrix Core, we're redefining human potential through cutting-edge cybernetic enhancement technology. 
                We believe that the future of humanity lies in the seamless integration of advanced technology with 
                human biology, enabling capabilities that were once considered impossible.
              </p>
            </div>
            
            <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Quality Assurance</h3>
              <p className="text-gray-300">
                Every Cybrix Core product undergoes rigorous testing and quality control processes. 
                Our cybernetic enhancements are designed with longevity and performance in mind, 
                using only the highest-quality materials and cutting-edge manufacturing techniques.
              </p>
            </div>
            
            <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Ethical Innovation</h3>
              <p className="text-gray-300">
                We're committed to ethical advancement in human enhancement technology. 
                Our research and development processes adhere to strict ethical guidelines, 
                ensuring that our products improve lives without compromising human dignity or autonomy.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-8 rounded-xl border border-blue-800/30">
              <h3 className="text-2xl font-bold mb-4 text-white">Founder</h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-bold text-white">SH</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-blue-400">Shaikh Maheen Hossain</h4>
                  <p className="text-gray-400 mb-2">CEO & Chief Innovation Officer</p>
                  <p className="text-gray-300">
                    With a vision to transcend human limitations through technology, 
                    Shaikh Maheen Hossain founded Cybrix Core to pioneer the next generation 
                    of cybernetic enhancements.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Contact Information</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="bg-blue-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  Dhaka, Bangladesh
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  Mirpur Cantonment Public School & College
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="M22 7l-10 7L2 7"></path>
                    </svg>
                  </div>
                  contact@cybrixcore.com
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-blue-900/30 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  +880 123 456 7890
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
