import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

export default function () {
  const ref = useRef();

  useHelper(ref, THREE.AxesHelper, 2);

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <ringGeometry args={[0.8, 1.2, 32]} />{' '}
      <meshBasicMaterial color="white" transparent opacity={0.5} />
    </mesh>
  );
}
