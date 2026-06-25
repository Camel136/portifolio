import { useContext, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';
import { Context } from '../context/context';

export default function Target() {
  const lightRef = useRef();
  const { camera } = useThree();
  const direction = new THREE.Vector3();
  const raycaster = new THREE.Raycaster();
  const { smartphoneRef, pcLeftRef, pcRightRef } = useContext(Context);

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

    ///hita a mira
    raycaster.set(lightRef.current.position, direction);

    const targets = [
      smartphoneRef.current,
      pcLeftRef.current,
      pcRightRef.current,
    ].filter(Boolean);

    const hits = raycaster.intersectObjects(targets, false);

    if (hits.length > 0) {
      console.log('hit:', hits[0].object);
    }
    ////
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <spotLight
      ref={lightRef}
      angle={0.02}
      penumbra={1}
      intensity={0}
      distance={9}
      decay={2}
      color="#ffffff"
      castShadow
      shadow-mapSize={[1024, 1024]}
    />
  );
}
