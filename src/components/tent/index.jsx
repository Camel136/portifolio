import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect, useContext } from 'react';
import * as THREE from 'three';
import TouchSistem from '../touchSistem';
import { Context } from '../context/context';

// https://gltf.report/

const MODEL_URL = './gltf/tendaUnifyv2.glb';
const TEXTURE_URLS = [
  './bake/bake.jpg',
  './bake/bakeGround.jpg',
  './bake/bakeTent.jpg',
];

// Runs before drei uploads the textures to the GPU.
function configureBakedTextures(textures) {
  textures.forEach(texture => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
  });
}

useGLTF.preload(MODEL_URL);
useTexture.preload(TEXTURE_URLS);

export default function Tent({ setCameraSpawn, setPeopleViewCam }) {
  const { nodes } = useGLTF(MODEL_URL);
  const [bakeHouse, bakeGround, bakeTent] = useTexture(
    TEXTURE_URLS,
    configureBakedTextures
  );
  const { smartphoneRef, pcLeftRef, pcRightRef } = useContext(Context);

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
  }, [nodes, setCameraSpawn, setPeopleViewCam]);

  return (
    <>
      <color attach="background" args={['#000000']} />
      <mesh geometry={nodes.cena.geometry}>
        <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveMap={bakeHouse}
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
      <mesh geometry={nodes.lampada.geometry}>
        <meshStandardMaterial
          color={0xfffad9}
          emissive={0xfffad9}
          emissiveIntensity={3.0}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      <TouchSistem
        IsTimeToShow
        position={[6.036360674943395, 3.9437996881855018, -4.548282089719551]}
        rotation={[1.5, 0, 0]}
        args={[0.7, 0.2, 32]}
        ref={smartphoneRef}
        name="smartphoneRef"
      />
      <TouchSistem
        IsTimeToShow
        position={[-0.9746321190187572, 5.173910287828369, 7.274120799127293]}
        rotation={[0, -0.3, 0]}
        args={[0.5, 0.1, 32]}
        ref={pcLeftRef}
        name="pcLeftRef"
      />
      <TouchSistem
        IsTimeToShow
        position={[-3.4260952732574075, 5.206571605452476, 6.4372730871748916]}
        rotation={[0, -0.1, 0]}
        args={[0.5, 0.1, 32]}
        ref={pcRightRef}
        name="pcRightRef"
      />
    </>
  );
}
