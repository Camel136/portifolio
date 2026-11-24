import './App.css';
import { Canvas } from '@react-three/fiber';
import Tent from './components/tent';
import PointerLockControlsCustom from './components/controls';
import { useCallback, useContext, useEffect, useState } from 'react';
import TouchSistem from './components/touchSistem';
import * as THREE from 'three';
import useInstruction from './components/utils/useInstruction';
import Target from './components/target';
import { Context } from './components/context/context';
import Modal from './components/modal';
import LanguageSwitcher from './i18n/LanguageSwitcher';
import { useTranslation } from './i18n/i18nContext';

// npm run lint -- --fix

const GL_OPTIONS = { antialias: true, powerPreference: 'high-performance' };
const CAMERA_OPTIONS = { fov: 75, near: 0.1, far: 1000 };
const ENTRANCE_POSITION = [
  -9.306830224712446, 5.32323169803203, -4.874134627868665,
];
const ENTRANCE_ROTATION = [0, 1, 0];
const ENTRANCE_ARGS = [0.2, 1.1, 32];

function App() {
  const [insideOfTent, setInsideOfTent] = useState(false);
  const [cameraSpawn, setCameraSpawn] = useState(null);
  const [peopleViewCam, setPeopleViewCam] = useState(null);

  const { t } = useTranslation();
  const instructionKey = useInstruction(insideOfTent);
  const { modalOpen, setModalOpen } = useContext(Context);
  const closeModal = useCallback(() => setModalOpen(false), [setModalOpen]);

  useEffect(() => {
    if (modalOpen && document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, [modalOpen]);

  const sceneReady = cameraSpawn !== null;

  return (
    <div className="app">
      <header className="section header">
        <LanguageSwitcher />
      </header>

      <div className="section canvas-container">
        <Canvas dpr={[1, 2]} gl={GL_OPTIONS} camera={CAMERA_OPTIONS}>
          <PointerLockControlsCustom
            otherTypeCam={insideOfTent}
            cameraSpawn={cameraSpawn}
            peopleViewCam={peopleViewCam}
          />
          <Tent
            setCameraSpawn={setCameraSpawn}
            setPeopleViewCam={setPeopleViewCam}
          />
          <TouchSistem
            IsTimeToShow={sceneReady}
            setInsideOfTent={setInsideOfTent}
            position={ENTRANCE_POSITION}
            rotation={ENTRANCE_ROTATION}
            side={THREE.BackSide}
            args={ENTRANCE_ARGS}
          />
          {insideOfTent && <Target />}
        </Canvas>
        <Modal open={modalOpen} onClose={closeModal} />
      </div>

      {!modalOpen && (
        <footer className="section footer">
          <p>{t(instructionKey)}</p>
        </footer>
      )}
    </div>
  );
}

export default App;
