import { PointerLockControls, OrbitControls } from '@react-three/drei';
import { useEffect, useContext } from 'react';
import { useThree } from '@react-three/fiber';
import { Context } from '../context/context';

const MIN_POLAR_ANGLE = Math.PI / 6; // 30deg
const MAX_POLAR_ANGLE = Math.PI / 2.4; // 75deg
const TOUCH_SENSITIVITY = 0.005;
const PITCH_LIMIT = Math.PI / 2 - 0.1;

function applyPose(camera, pose) {
  camera.position.copy(pose.position);
  camera.quaternion.copy(pose.quaternion);
}

// Lives outside the component so three.js objects are mutated in plain
// event handlers instead of inside React render scope.
function attachTouchLook(domElement, camera) {
  const drag = { active: false, x: 0, y: 0 };
  domElement.style.touchAction = 'none';

  const onPointerDown = event => {
    if (event.pointerType !== 'touch') return;
    drag.active = true;
    drag.x = event.clientX;
    drag.y = event.clientY;
    event.preventDefault();
  };

  const onPointerMove = event => {
    if (!drag.active || event.pointerType !== 'touch') return;

    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;

    camera.rotation.order = 'YXZ';
    camera.rotation.y -= deltaX * TOUCH_SENSITIVITY;
    camera.rotation.x = Math.max(
      -PITCH_LIMIT,
      Math.min(PITCH_LIMIT, camera.rotation.x - deltaY * TOUCH_SENSITIVITY)
    );

    event.preventDefault();
  };

  const stopDragging = () => {
    drag.active = false;
  };

  const listeners = [
    ['pointerdown', onPointerDown],
    ['pointermove', onPointerMove],
    ['pointerup', stopDragging],
    ['pointerleave', stopDragging],
    ['pointercancel', stopDragging],
  ];

  listeners.forEach(([type, fn]) => domElement.addEventListener(type, fn));
  return () =>
    listeners.forEach(([type, fn]) => domElement.removeEventListener(type, fn));
}

export default function PointerLockControlsCustom({
  otherTypeCam,
  cameraSpawn,
  peopleViewCam,
}) {
  const { camera, gl } = useThree();
  const { isMobile } = useContext(Context);

  useEffect(() => {
    const pose = otherTypeCam ? peopleViewCam : cameraSpawn;
    if (pose) applyPose(camera, pose);
  }, [camera, cameraSpawn, peopleViewCam, otherTypeCam]);

  useEffect(() => {
    if (!isMobile) return;
    return attachTouchLook(gl.domElement, camera);
  }, [camera, gl, isMobile]);

  if (!otherTypeCam) {
    return (
      <OrbitControls
        makeDefault
        minPolarAngle={MIN_POLAR_ANGLE}
        maxPolarAngle={MAX_POLAR_ANGLE}
        enableZoom={false}
      />
    );
  }

  if (isMobile) return null;

  return <PointerLockControls />;
}
