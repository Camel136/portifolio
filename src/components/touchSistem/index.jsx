import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TransformControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function TouchSistem({
  IsTimeToShow,
  setInsideOfTent = () => {},
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  side = THREE.DoubleSide,
}) {
  const ref = useRef();
  const [showRing, setShowRing] = useState(false);
  const colorPower = useRef(1);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;

    const pulse = Math.sin(time.current * 2) * 0.5 + 0.5;
    colorPower.current = 0.01 + pulse * 1;

    if (ref.current) {
      ref.current.material.opacity = colorPower.current;
    }
  });

  if (IsTimeToShow) {
    setTimeout(() => {
      setShowRing(true);
    }, 10000);
  }

  return (
    <>
      {showRing && (
        <mesh
          ref={ref}
          position={position}
          rotation={rotation}
          onPointerDown={() => setInsideOfTent(true)}
        >
          <ringGeometry args={[0.8, 1.2, 32]} />
          <meshBasicMaterial
            color="white"
            transparent
            opacity={colorPower.current}
            side={side}
          />
        </mesh>
      )}
    </>
  );
}
