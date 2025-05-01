
import React, { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LetterGlitch from './animations/LetterGlitch';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { CyborgHead } from './models/parts/CyborgHead';
import { CyborgBody } from './models/parts/CyborgBody';
import { CyborgArms } from './models/parts/CyborgArms';

// Create a Cyborg component that assembles all parts
const Cyborg = () => {
  const groupRef = useRef();
  
  return (
    <group ref={groupRef} position={[0, -1, 0]} rotation={[0, Math.PI * 0.25, 0]} scale={2.5}>
      <CyborgHead />
      <CyborgBody />
      <CyborgArms />
    </group>
  );
};

// Loader component for suspense fallback
const ModelLoader = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial color="#4a9eff" wireframe />
  </mesh>
);

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden flex items-center">
      <LetterGlitch
        glitchColors={['#2b4539', '#61dca3', '#61b3dc', '#8B5CF6']}
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      
      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
                  Elevate Humanity
                </span>
                <br />
                with Advanced Cybernetic Enhancements
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-medium bg-black/70 backdrop-blur-sm p-6 rounded-lg text-white max-w-xl border border-blue-900/50 shadow-lg shadow-blue-500/20"
            >
              Experience the future with our cutting-edge cybernetic implants and augmentations. Designed to enhance human capabilities beyond natural limitations.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Explore Products
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30">
                Learn More
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-md aspect-square relative">
              <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a9eff" />
                <Suspense fallback={<ModelLoader />}>
                  <Cyborg />
                  <Environment preset="city" />
                  <OrbitControls 
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                  />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
