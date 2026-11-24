import { forwardRef, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const SHOW_DELAY_MS = 10000;
const MIN_OPACITY = 0.01;

function TouchSistem(
  {
    IsTimeToShow,
    setInsideOfTent,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    side = THREE.DoubleSide,
    args = [0.8, 1.1, 32],
    name,
  },
  ref
) {
  const localRef = useRef();
  const meshRef = ref || localRef;
  const [showRing, setShowRing] = useState(false);
  const time = useRef(0);

  useEffect(() => {
    if (!IsTimeToShow) return;
    const timer = setTimeout(() => setShowRing(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [IsTimeToShow]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    time.current += delta;
    const pulse = Math.sin(time.current * 2) * 0.5 + 0.5;
    meshRef.current.material.opacity = MIN_OPACITY + pulse * 0.2;
  });

  if (!showRing) return null;

  return (
    <mesh
      name={name}
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerDown={setInsideOfTent && (() => setInsideOfTent(true))}
    >
      <ringGeometry args={args} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={MIN_OPACITY}
        side={side}
      />
    </mesh>
  );
}

export default forwardRef(TouchSistem);
