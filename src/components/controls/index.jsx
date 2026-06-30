import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';

export default function PointerLockControlsCustom({
  otherTypeCam,
  cameraSpawn,
  peopleViewCam,
}) {
  const { camera, gl } = useThree();
  const [isMobile, setIsMobile] = useState(false);
  const dragState = useRef({ active: false, x: 0, y: 0 });

  const ANGLE = {
    DEG_30: Math.PI / 6,
    DEG_45: Math.PI / 4,
    DEG_60: Math.PI / 3,
    DEG_90: Math.PI / 2,
    DEG_75: Math.PI / 2.4,
    DEG_180: Math.PI,
  };

  useEffect(() => {
    if (cameraSpawn && !otherTypeCam) {
      camera.position.copy(cameraSpawn.position);
      camera.quaternion.copy(cameraSpawn.quaternion);
    }
    if (peopleViewCam && otherTypeCam) {
      camera.position.copy(peopleViewCam.position);
      camera.quaternion.copy(peopleViewCam.quaternion);
    }
  }, [cameraSpawn, peopleViewCam, otherTypeCam]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      const hasTouchScreen =
        window.matchMedia('(pointer: coarse)').matches ||
        navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 1024;

      setIsMobile(hasTouchScreen && isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const domElement = gl.domElement;
    domElement.style.touchAction = 'none';

    const onPointerDown = event => {
      if (event.pointerType !== 'touch') return;
      dragState.current.active = true;
      dragState.current.x = event.clientX;
      dragState.current.y = event.clientY;
      event.preventDefault();
    };

    const onPointerMove = event => {
      if (!dragState.current.active || event.pointerType !== 'touch') return;

      const deltaX = event.clientX - dragState.current.x;
      const deltaY = event.clientY - dragState.current.y;

      dragState.current.x = event.clientX;
      dragState.current.y = event.clientY;

      camera.rotation.order = 'YXZ';
      camera.rotation.y -= deltaX * 0.005;
      camera.rotation.x -= deltaY * 0.005;
      camera.rotation.x = Math.max(
        -Math.PI / 2 + 0.1,
        Math.min(Math.PI / 2 - 0.1, camera.rotation.x)
      );

      event.preventDefault();
    };

    const stopDragging = () => {
      dragState.current.active = false;
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', stopDragging);
    domElement.addEventListener('pointerleave', stopDragging);
    domElement.addEventListener('pointercancel', stopDragging);

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', stopDragging);
      domElement.removeEventListener('pointerleave', stopDragging);
      domElement.removeEventListener('pointercancel', stopDragging);
    };
  }, [camera, gl, isMobile]);

  if (!otherTypeCam) {
    return (
      <OrbitControls
        makeDefault
        minPolarAngle={ANGLE.DEG_30}
        maxPolarAngle={ANGLE.DEG_75}
        enableZoom={false}
      />
    );
  }

  if (isMobile) {
    return null;
  }

  return <PointerLockControls />;
}
