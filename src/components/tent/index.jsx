import { useGLTF, useTexture, TransformControls } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

// https://gltf.report/

export default function Tent({ setCameraSpawn, setPeopleViewCam }) {
  const { nodes } = useGLTF('./gltf/tendaUnifyv2.glb');
  const bakedTestureHouse = useTexture('./bake/bake.jpg');
  const bakeGround = useTexture('./bake/bakeGround.jpg');
  const bakeTent = useTexture('./bake/bakeTent.jpg');

  bakeGround.flipY = false;
  bakeGround.colorSpace = THREE.SRGBColorSpace;
  bakeGround.anisotropy = 16;

  bakedTestureHouse.flipY = false;
  bakedTestureHouse.colorSpace = THREE.SRGBColorSpace;
  bakedTestureHouse.anisotropy = 16;

  bakeTent.flipY = false;
  bakeTent.colorSpace = THREE.SRGBColorSpace;
  bakeTent.anisotropy = 16;

  const donationLight = new THREE.MeshStandardMaterial({
    color: 0xfffad9,
    emissive: new THREE.Color(0xfffad9),
    emissiveIntensity: 3.0,
    roughness: 0.1,
    metalness: 0.8,
  });

  useEffect(() => {
    if (nodes.cameraSpawn) {
      setCameraSpawn({
        position: nodes.cameraSpawn.position.clone(),
        quaternion: nodes.cameraSpawn.quaternion.clone(),
      });
    }
    if (nodes.PeopleView) {
      setPeopleViewCam({
        position: nodes.PeopleView.position.clone(),
        quaternion: nodes.PeopleView.quaternion.clone(),
      });
    }
  }, [nodes]);

  // const transformRef = useRef();
  // const meshRef = useRef();

  // const getPosition = () => {
  //   const object = transformRef.current?.object;
  //   console.log('position obj', object?.position);
  // };

  return (
    <>
      <color attach="background" args={['#000000']} />
      <mesh geometry={nodes.cena.geometry}>
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveMap={bakedTestureHouse}
          emissiveIntensity={1}
          roughness={1}
          metalness={1}
        />
      </mesh>
      <mesh geometry={nodes.chao.geometry}>
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveMap={bakeGround}
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh geometry={nodes.tenda.geometry}>
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveMap={bakeTent}
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh geometry={nodes.lampada.geometry} material={donationLight}></mesh>
    </>
  );
}
