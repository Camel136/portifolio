import { useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';

export default function Target() {
  const lightRef = useRef();
  const { camera } = useThree();
  const direction = new THREE.Vector3();

  useHelper(lightRef, THREE.SpotLightHelper, 'white');

  useFrame(() => {
    if (!lightRef.current) return;

    // spotlight segue posição da câmera
    lightRef.current.position.copy(camera.position);

    // pega frente da câmera baseada no quaternion
    direction.set(0, 0, -1);

    direction.applyQuaternion(camera.quaternion);

    // move target da spotlight
    lightRef.current.target.position.copy(
      direction.clone().add(camera.position)
    );

    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <spotLight
      ref={lightRef}
      angle={0.01}
      penumbra={1}
      intensity={0}
      distance={1}
      decay={2}
      color="#ffffff"
      castShadow
      shadow-mapSize={[1024, 1024]}
    />
  );
}
