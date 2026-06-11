import { useGLTF, useTexture, Center } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

// https://gltf.report/

export default function House() {
  const { nodes } = useGLTF('./gltf/tendaUnify.glb');
  console.log('...........', nodes.tenda.geometry);

  const bakedTestureHouse = useTexture('./bake/bake.jpg');
  bakedTestureHouse.flipY = false;

  // const glassTableMaterial = useMemo(
  //   () =>
  //     new THREE.MeshPhysicalMaterial({
  //       transmission: 1.0,
  //       transparent: true,
  //       roughness: 0.0,
  //       metalness: 0.0,
  //       ior: 1.5,
  //       thickness: 0.6,
  //       attenuationColor: new THREE.Color(0x88ccee),
  //       attenuationDistance: 0.5,
  //       envMapIntensity: 1.5,
  //     }),
  //   []
  // );

  // nodes.vidro_mesa.position.x = 0.819228437991848;
  // nodes.vidro_mesa.position.y = -8.817037406785715;
  // nodes.vidro_mesa.position.z = 0.149929950065959;

  // nodes.vidro_janela.position.x = 0.819228437991848;
  // nodes.vidro_janela.position.y = -8.817037406785715;
  // nodes.vidro_janela.position.z = 0.149929950065959;

  return (
    <>
      <color attach="background" args={['#000000']} />
      <Center>
        <mesh geometry={nodes.tenda.geometry}>
          <meshStandardMaterial
            color="white"
            emissive="white"
            emissiveMap={bakedTestureHouse}
            emissiveIntensity={0.4}
            roughness={0.9}
            metalness={0.9}
          />
        </mesh>
      </Center>

      {/* <mesh
        // ref={meshRef}
        geometry={nodes.vidro_mesa.geometry}
        material={glassTableMaterial}
        position={nodes.vidro_mesa.position}
        rotation={nodes.vidro_mesa.rotation}
        scale={nodes.vidro_mesa.scale}
      />

      <mesh
        material={glassTableMaterial}
        geometry={nodes.vidro_janela.geometry}
        position={nodes.vidro_janela.position}
        rotation={nodes.vidro_janela.rotation}
        scale={nodes.vidro_janela.scale}
      /> */}
    </>
  );
}
