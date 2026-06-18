import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PointerLockControlsCustom({ otherTypeCam }) {
  const touchStart = useRef({ x: 0, y: 0 });
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  const ANGLE = {
    DEG_30: Math.PI / 6,
    DEG_45: Math.PI / 4,
    DEG_60: Math.PI / 3,
    DEG_90: Math.PI / 2,
    DEG_75: Math.PI / 2.4,
    DEG_180: Math.PI,
  };

  if (otherTypeCam) {
    return <OrbitControls makeDefault minPolarAngle={ANGLE.DEG_75} />;
  }

  return <PointerLockControls />;

  return null;
}
