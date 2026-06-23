import { useEffect, useRef, useState } from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { TransformControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function TouchSistem({ IsTimeToShow }) {
  const ref = useRef();
  const [showRing, setShowRing] = useState(false);

  // const controlRef = useRef();
  // useHelper(ref, THREE.AxesHelper, 2);
  // const transformRef = useRef();

  // const getPosition = () => {
  //   const object = transformRef.current?.object;
  //   console.log('position obj', object?.position);
  // };

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
      {/* <TransformControls
      ref={transformRef}
      mode="translate"
      enabled={true}
      onObjectChange={getPosition}
    > */}

      {showRing && (
        <mesh
          ref={ref}
          position={[-9.306830224712446, 5.32323169803203, -4.874134627868665]}
          rotation={[0, 1, 0]}
        >
          <ringGeometry args={[0.8, 1.2, 32]} />
          <meshBasicMaterial
            color="white"
            transparent
            opacity={colorPower.current}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* </TransformControls> */}
    </>
  );
}
