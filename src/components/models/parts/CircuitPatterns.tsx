
import * as THREE from 'three';

export const CircuitPatterns = () => {
  return (
    <group>
      <mesh position={[0, 0.4, 0.26]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.4, 0.02]} />
        <meshStandardMaterial 
          color={new THREE.Color("#00ffff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      
      <mesh position={[0, 0.36, 0.26]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.3, 0.01]} />
        <meshStandardMaterial 
          color={new THREE.Color("#00ffff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      
      <mesh position={[0, 0.32, 0.26]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.35, 0.015]} />
        <meshStandardMaterial 
          color={new THREE.Color("#00ffff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      
      <mesh position={[-0.1, 0.3, 0.26]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.1, 0.01]} />
        <meshStandardMaterial 
          color={new THREE.Color("#00ffff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      
      <mesh position={[0.1, 0.3, 0.26]} rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[0.1, 0.01]} />
        <meshStandardMaterial 
          color={new THREE.Color("#00ffff")}
          emissive={new THREE.Color("#00ffff")}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
