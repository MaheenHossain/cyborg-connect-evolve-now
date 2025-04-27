
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  Float, 
  useTexture,
  Sparkles
} from '@react-three/drei';
import { Suspense } from 'react';
import { CyborgModel } from '../models/CyborgModel';
import * as THREE from 'three';

// Floor/platform component
const CyberPlatform = () => {
  return (
    <mesh 
      receiveShadow 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -1.5, 0]}
    >
      <cylinderGeometry args={[2.5, 2, 0.1, 36]} />
      <meshStandardMaterial 
        color="#1a1a2e"
        metalness={0.6}
        roughness={0.2}
      >
        <gridTexture 
          args={[10, 10]}
          colorA="#0099ff" 
          colorB="#001933" 
          thickness={0.05}
          attach="map"
        />
      </meshStandardMaterial>
    </mesh>
  );
};

// Background elements - holographic rings
const HolographicRings = () => {
  return (
    <group position={[0, 0, -0.5]}>
      <mesh>
        <torusGeometry args={[3, 0.04, 16, 100]} />
        <meshBasicMaterial 
          color="#4a9eff" 
          transparent 
          opacity={0.5}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshBasicMaterial 
          color="#8A2BE2" 
          transparent 
          opacity={0.4}
        />
      </mesh>
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial 
          color="#00ffff" 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

// Ambient floating particles
const AmbientParticles = () => {
  return (
    <Sparkles 
      count={100}
      size={1}
      scale={10}
      speed={0.3}
      color="#4a9eff"
    />
  );
};

export const Scene = () => {
  return (
    <Canvas className="w-full h-full" shadows>
      <color attach="background" args={['#050810']} />
      
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.5}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 2, 2]} intensity={1} color="#4a9eff" />
      
      <Suspense fallback={null}>
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <CyborgModel />
        </Float>
        
        <CyberPlatform />
        <HolographicRings />
        <AmbientParticles />
        
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};
