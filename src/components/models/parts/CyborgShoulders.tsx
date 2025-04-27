
import * as THREE from 'three';

export const CyborgShoulders = () => {
  return (
    <group>
      {/* Left shoulder */}
      <mesh position={[-0.35, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Left shoulder plate */}
      <mesh position={[-0.4, 0.45, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.2]} />
        <meshStandardMaterial 
          color={new THREE.Color("#4a9eff")} 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      
      {/* Right shoulder */}
      <mesh position={[0.35, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color("#303540")}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Right shoulder plate */}
      <mesh position={[0.4, 0.45, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.2]} />
        <meshStandardMaterial 
          color={new THREE.Color("#4a9eff")} 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};
