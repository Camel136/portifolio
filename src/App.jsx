import './App.css';
import { Canvas } from '@react-three/fiber';
import Tent from './components/tent';
// import { Perf } from 'r3f-perf';
import PointerLockControlsCustom from './components/controls';
import { useState } from 'react';
// import FlashLight from './components/flashLight';
// import TextCustom from './components/text';
import TouchSistem from './components/touchSistem';

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

  const [cameraSpawn, setCameraSpawn] = useState(null);
  const positionCam = [-3, -2, -2];
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
            position: positionCam,
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <>
            <PointerLockControlsCustom
              otherTypeCam={true}
              cameraSpawn={cameraSpawn}
            />

            <Tent setCameraSpawn={setCameraSpawn} />
            <TouchSistem />
            {/* <TextCustom
                rot={[0, 1.7, 0]}
                pos={[-7, -2, 6]}
                text="aperte ESC pra sair "
                color="white"
              /> */}
            {/* <FlashLight /> */}
          </>

          {/* <Perf /> */}
        </Canvas>
      </div>

      <footer className="section footer"></footer>
    </div>
  );
}

export default App;
