import { useContext, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { useHelper } from '@react-three/drei';
import { Context } from '../context/context';

const FOCUS_SECONDS = 2;
const DESTINY_BY_TARGET = {
  smartphoneRef: 2,
  pcLeftRef: 1,
  pcRightRef: 0,
};

// Scratch objects reused every frame to avoid per-frame allocations.
const direction = new THREE.Vector3();
const raycaster = new THREE.Raycaster();

export default function Target() {
  const lightRef = useRef();
  const camera = useThree(state => state.camera);
  const { smartphoneRef, pcLeftRef, pcRightRef, setModalOpen, setDestiny } =
    useContext(Context);
  const currentTarget = useRef(null);
  const focusTime = useRef(0);
  const activated = useRef(false);

  // The helper's cone is what the user sees as the crosshair.
  useHelper(lightRef, THREE.SpotLightHelper, 'white');

  useFrame((_, delta) => {
    const light = lightRef.current;
    if (!light) return;

    light.position.copy(camera.position);
    direction.set(0, 0, -1).applyQuaternion(camera.quaternion);
    light.target.position.copy(camera.position).add(direction);
    light.target.updateMatrixWorld();

    raycaster.set(light.position, direction);

    const targets = [
      smartphoneRef.current,
      pcLeftRef.current,
      pcRightRef.current,
    ].filter(Boolean);
    const hit = raycaster.intersectObjects(targets, false)[0];

    if (!hit) {
      currentTarget.current = null;
      focusTime.current = 0;
      activated.current = false;
      return;
    }

    if (currentTarget.current !== hit.object) {
      currentTarget.current = hit.object;
      focusTime.current = 0;
      activated.current = false;
    }

    focusTime.current += delta;
    if (activated.current || focusTime.current < FOCUS_SECONDS) return;

    activated.current = true;
    const destiny = DESTINY_BY_TARGET[hit.object.name];
    if (destiny !== undefined) setDestiny(destiny);
    setModalOpen(true);
  });

  // No castShadow: the scene is fully baked, so a shadow pass was pure cost.
  return (
    <spotLight
      ref={lightRef}
      angle={0.02}
      penumbra={1}
      intensity={0}
      distance={9}
      decay={2}
      color="#ffffff"
    />
  );
}
