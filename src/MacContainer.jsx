import React from 'react';
import { useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MacContainer = () => {
  const model = useGLTF("./mac.glb");
  const texture = useTexture("./red.jpg");

  let meshes = {};
  model.scene.traverse((e) => {
    meshes[e.name] = e;
  });

  // Initial setup for the laptop screen and matte material
  meshes.screen.rotation.x = THREE.MathUtils.degToRad(180); // Closed position
  meshes.matte.material.map = texture;
  meshes.matte.material.emissiveIntensity = 0;
  meshes.matte.material.metalness = 0;
  meshes.matte.material.roughness = 1;

  const scrollData = useScroll();

  useFrame(() => {
    // Rotate the laptop screen to simulate opening
    const rotationX = THREE.MathUtils.degToRad(180 - scrollData.offset * 90); // Rotate from 180° (closed) to 90° (open)
    meshes.screen.rotation.x = Math.max(rotationX, THREE.MathUtils.degToRad(90)); // Ensure it doesn't go beyond 90°
  });

  return (
    <group position={[0, -10, 20]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default MacContainer;
