
import * as THREE from 'three';

export const CyborgArms = () => {
  return (
    <group>
      {/* Left upper arm */}
      <mesh position={[-0.35, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.5, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Left elbow joint */}
      <mesh position={[-0.35, -0.15, 0]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#404550")}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Left forearm */}
      <mesh position={[-0.35, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Right upper arm */}
      <mesh position={[0.35, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.5, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Right elbow joint */}
      <mesh position={[0.35, -0.15, 0]} castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#404550")}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Right forearm */}
      <mesh position={[0.35, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.4, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};
