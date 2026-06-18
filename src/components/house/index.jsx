import {
  useGLTF,
  useTexture,
  Center,
  TransformControls,
} from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// https://gltf.report/

export default function House() {
  const { nodes } = useGLTF('./gltf/tendaUnifyv1.glb');
  const bakedTestureHouse = useTexture('./bake/bake.jpg');
  bakedTestureHouse.flipY = false;
  bakedTestureHouse.colorSpace = THREE.SRGBColorSpace;
  bakedTestureHouse.anisotropy = 16;

  // console.log('...........', nodes.lampada.position);

  const donationLight = new THREE.MeshStandardMaterial({
    color: 0xff6600,
    emissive: new THREE.Color(0xff4400),
    emissiveIntensity: 3.0,
    roughness: 0.1,
    metalness: 0.8,
  });

  // const transformRef = useRef();
  // const meshRef = useRef();

  // const getPosition = () => {
  //   const object = transformRef.current?.object;
  //   console.log('position obj', object?.position);
  // };

  // nodes.vidro_mesa.position.x = 0.819228437991848;
  // nodes.vidro_mesa.position.y = -8.817037406785715;
  // nodes.vidro_mesa.position.z = 0.149929950065959;

  nodes.lampada.position.x = 4.936184232853194;
  nodes.lampada.position.y = -3.808529372444565;
  nodes.lampada.position.z = -6.375673738390482;

  return (
    <>
      <color attach="background" args={['#000000']} />
      <Center>
        <mesh geometry={nodes.tenda.geometry}>
          <meshStandardMaterial
            color="white"
            emissive="yellow"
            emissiveMap={bakedTestureHouse}
            emissiveIntensity={0.6}
            roughness={1}
            metalness={1}
          />
        </mesh>
      </Center>
      {/* <TransformControls ref={transformRef} onObjectChange={getPosition}> */}
      <mesh
        // ref={meshRef}
        geometry={nodes.lampada.geometry}
        material={donationLight}
        position={nodes.lampada.position}
        rotation={nodes.lampada.rotation}
      />
      {/* </TransformControls> */}
      {/* <mesh
        material={glassTableMaterial}
        geometry={nodes.vidro_janela.geometry}
        position={nodes.vidro_janela.position}
        rotation={nodes.vidro_janela.rotation}
        scale={nodes.vidro_janela.scale}
      /> */}
    </>
  );
}
