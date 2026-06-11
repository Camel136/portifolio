import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PointerLockControlsCustom({ otherTypeCam }) {
  const [isMobile, setIsMobile] = useState(false);
  const { camera, gl } = useThree();

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

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    setIsMobile(isTouchDevice);

    if (isTouchDevice) {
      const handleTouchStart = e => {
        touchStart.current = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
        };
      };

      const handleTouchMove = e => {
        const sensitivity = 0.004;

        const deltaX = e.touches[0].pageX - touchStart.current.x;
        const deltaY = e.touches[0].pageY - touchStart.current.y;

        euler.current.setFromQuaternion(camera.quaternion);

        euler.current.y -= deltaX * sensitivity;
        euler.current.x -= deltaY * sensitivity;

        euler.current.x = Math.max(
          -ANGLE.DEG_90 + 0.1,
          Math.min(ANGLE.DEG_90 - 0.1, euler.current.x)
        );

        camera.quaternion.setFromEuler(euler.current);

        touchStart.current = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
        };
      };

      gl.domElement.addEventListener('touchstart', handleTouchStart);
      gl.domElement.addEventListener('touchmove', handleTouchMove);

      return () => {
        gl.domElement.removeEventListener('touchstart', handleTouchStart);
        gl.domElement.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [camera, gl]);

  if (otherTypeCam) {
    return (
      <OrbitControls
        makeDefault
        minPolarAngle={ANGLE.DEG_75}
        maxPolarAngle={-ANGLE.DEG_75}
        minAzimuthAngle={-ANGLE.DEG_30}
        maxAzimuthAngle={ANGLE.DEG_90}
      />
    );
  }

  if (!isMobile) {
    return <PointerLockControls />;
  }

  return null;
}
