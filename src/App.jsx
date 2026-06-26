import './App.css';
import { Canvas } from '@react-three/fiber';
import Tent from './components/tent';
// import { Perf } from 'r3f-perf';
import PointerLockControlsCustom from './components/controls';
import { useState, useContext } from 'react';
import TouchSistem from './components/touchSistem';
import * as THREE from 'three';
import useInstruction from './components/utils/useInstruction';
import Target from './components/target';
import { Context } from './components/context/context';

import Modal from './components/modal';

// npm run lint -- --fix

function App() {
  // //castShadow e receiveshadow (fazer ou receber sombra)
  const ANGLE = {
    DEG_30: Math.PI / 6,
    DEG_45: Math.PI / 4,
    DEG_60: Math.PI / 3,
    DEG_90: Math.PI / 2,
    DEG_75: Math.PI / 2.4,
    DEG_180: Math.PI,
  };

  // 180/ deg = graus

  const [insideOfTent, setInsideOfTent] = useState(false);
  const [cameraSpawn, setCameraSpawn] = useState(null);
  const [peopleViewCam, setPeopleViewCam] = useState(null);

  const instruction = useInstruction(insideOfTent);
  const { modalOpen, setModalOpen } = useContext(Context);
  if (modalOpen) {
    document.exitPointerLock();
  }

  let init = false;

  if (cameraSpawn !== null) {
    init = true;
  }

  return (
    <div className="app">
      <header className="section header"></header>

      <div className="section canvas-container">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
          }}
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <>
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
              IsTimeToShow={init}
              setInsideOfTent={setInsideOfTent}
              position={[
                -9.306830224712446, 5.32323169803203, -4.874134627868665,
              ]}
              rotation={[0, 1, 0]}
              side={THREE.BackSide}
              args={[0.2, 1.1, 32]}
            />
            {/* <TextCustom
              rot={[0, 1, 0]}
              pos={[0, 0, 0]}
              text="aperte ESC pra sair "
              color="white"
              IsTimeToShow={init}
            /> */}
            {insideOfTent && <Target />}
          </>
        </Canvas>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>

      {!modalOpen && (
        <footer className="section footer">
          <p>{instruction}</p>
        </footer>
      )}
    </div>
  );
}

export default App;
