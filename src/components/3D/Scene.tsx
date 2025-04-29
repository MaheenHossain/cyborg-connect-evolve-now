
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Float, 
  Sparkles,
  Grid,
  useDetectGPU
} from '@react-three/drei';
import { Suspense, useEffect, useState, useTransition } from 'react';
import { ArcReactor } from '../models/ArcReactor';
import { CyborgModel } from '../models/CyborgModel';
import { useIsMobile } from '@/hooks/use-mobile';
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
      />
      <Grid
        position={[0, 0.051, 0]}
        args={[5, 5]}
        cellSize={0.2}
        cellThickness={0.5}
        cellColor="#0099ff"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#001933"
        fadeDistance={5}
        fadeStrength={1}
      />
    </mesh>
  );
};

// Background elements - holographic rings
const HolographicRings = ({ isMobile }: { isMobile: boolean }) => {
  // Reduce complexity for mobile
  const ringCount = isMobile ? 1 : 3;
  
  return (
    <group position={[0, 0, -0.5]}>
      {ringCount > 0 && (
        <mesh>
          <torusGeometry args={[3, 0.04, 16, 60]} />
          <meshBasicMaterial 
            color="#4a9eff" 
            transparent 
            opacity={0.5}
          />
        </mesh>
      )}
      
      {ringCount > 1 && (
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.03, 16, 60]} />
          <meshBasicMaterial 
            color="#8A2BE2" 
            transparent 
            opacity={0.4}
          />
        </mesh>
      )}
      
      {ringCount > 2 && (
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[3.5, 0.02, 16, 60]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

// Ambient floating particles
const AmbientParticles = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <Sparkles 
      count={isMobile ? 50 : 100}
      size={1}
      scale={isMobile ? 5 : 10}
      speed={0.3}
      color="#4a9eff"
    />
  );
};

// Loading component inside canvas
const CanvasLoader = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#4a9eff" wireframe />
    </mesh>
  );
};

// Fallback component when WebGL is not available or performance is poor
const FallbackDisplay = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-radial from-blue-900/20 to-black/80 rounded-xl">
      <div className="text-center p-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
        <h3 className="text-lg font-cyber text-blue-400">Cybernetic Enhancement</h3>
        <p className="text-sm text-blue-300/70">Interactive display unavailable</p>
      </div>
    </div>
  );
};

// Custom environment to replace the Environment component
const CustomEnvironment = () => {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} />
      
      {/* Key light (primary directional light) */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        color="#ffffff" 
      />
      
      {/* Fill light (secondary, softer light) */}
      <directionalLight 
        position={[-5, 3, -5]} 
        intensity={0.4} 
        color="#a0a0ff" 
      />
      
      {/* Rim light for edge highlighting */}
      <directionalLight 
        position={[0, -5, 0]} 
        intensity={0.3} 
        color="#0077ff" 
      />
      
      {/* Point lights for additional accents */}
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#4a9eff" />
      <pointLight position={[-2, 1, -2]} intensity={0.3} color="#aa00ff" />
    </>
  );
};

// Lazy loaded model component to prevent suspension during initial render
const ModelComponent = ({ modelType }: { modelType: 'arcReactor' | 'cyborgModel' }) => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      {modelType === 'arcReactor' ? <ArcReactor /> : <CyborgModel />}
    </Float>
  );
};

type SceneProps = {
  model: 'arcReactor' | 'cyborgModel';
};

export const Scene: React.FC<SceneProps> = ({ model }) => {
  const isMobile = useIsMobile();
  const [hasWebGLContext, setHasWebGLContext] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const gpuInfo = useDetectGPU();

  // Check for WebGL support
  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          console.log('WebGL not supported');
          setHasWebGLContext(false);
          return false;
        }
        
        return true;
      } catch (e) {
        console.log('Error checking WebGL support:', e);
        setHasWebGLContext(false);
        return false;
      }
    };

    // Use startTransition for the WebGL check to avoid suspension
    startTransition(() => {
      const hasWebGL = checkWebGL();
      if (hasWebGL) {
        // Add a small delay to ensure everything is ready
        setTimeout(() => setIsLoading(false), 100);
      }
    });
  }, []);

  // If WebGL is not available or GPU tier is too low, show fallback
  if (!hasWebGLContext || (gpuInfo && gpuInfo.tier < 1)) {
    return <FallbackDisplay />;
  }

  return (
    <div className="w-full h-full relative">
      {/* Show loading state during scene initialization */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-radial from-blue-900/20 to-black/80">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <Canvas 
        className="w-full h-full" 
        shadows={!isMobile}
        dpr={[1, isMobile ? 1.5 : 2]} // Lower resolution on mobile
        gl={{ 
          powerPreference: "high-performance",
          antialias: !isMobile,
          depth: true,
          stencil: false,
          alpha: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#050810'));
          startTransition(() => setIsLoading(false));
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
        
        {/* Custom lighting setup */}
        <CustomEnvironment />
        
        {/* Wrap 3D content in Suspense with a simple fallback */}
        <Suspense fallback={<CanvasLoader />}>
          {/* Use ModelComponent to prevent suspension during initial render */}
          <ModelComponent modelType={model} />
          
          <CyberPlatform />
          <HolographicRings isMobile={isMobile} />
          <AmbientParticles isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};
