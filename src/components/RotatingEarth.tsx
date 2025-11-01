// @ts-nocheck
import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// Earth with real-time cursor drag rotation
function Earth() {
  const meshRef = useRef(null);
  const navigate = useNavigate();
  const previousMouse = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rotationVelocity = useRef({ x: 0, y: 0 });

  // Load your NASA Black Marble image as texture
  const earthTexture = useLoader(TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-night.jpg');

  // Rotate the Earth with mouse drag influence
  useFrame(() => {
    if (meshRef.current) {
      // Base rotation (keeping existing rotation)
      meshRef.current.rotation.y += 0.005;
      
      // Apply accumulated rotation from mouse movement
      meshRef.current.rotation.x += rotationVelocity.current.x;
      meshRef.current.rotation.y += rotationVelocity.current.y;
      
      // Damping - gradually slow down rotation when not moving mouse
      rotationVelocity.current.x *= 0.95;
      rotationVelocity.current.y *= 0.95;
    }
  });

  const handlePointerMove = (event) => {
    if (isHovering.current) {
      // Calculate mouse movement delta
      const currentX = event.clientX;
      const currentY = event.clientY;
      
      const deltaX = currentX - previousMouse.current.x;
      const deltaY = currentY - previousMouse.current.y;
      
      // Convert mouse movement to rotation velocity (very slow)
      // Horizontal movement rotates around Y axis, vertical around X axis
      rotationVelocity.current.y += deltaX * 0.0005;
      rotationVelocity.current.x += deltaY * 0.0005;
      
      // Update previous mouse position
      previousMouse.current.x = currentX;
      previousMouse.current.y = currentY;
    }
  };

  const handlePointerEnter = (event) => {
    isHovering.current = true;
    document.body.style.cursor = 'grab';
    
    // Initialize mouse position
    previousMouse.current.x = event.clientX;
    previousMouse.current.y = event.clientY;
  };

  const handlePointerLeave = () => {
    isHovering.current = false;
    document.body.style.cursor = 'default';
  };

  const handlePointerDown = () => {
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    if (isHovering.current) {
      document.body.style.cursor = 'grab';
    }
  };

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <mesh
      ref={meshRef}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial 
        map={earthTexture}
        transparent={false}
        opacity={1}
        color="#ffffff"
      />
    </mesh>
  );
}

// Loading component
function LoadingEarth() {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color="#4A90E2" />
    </mesh>
  );
}

// Main RotatingEarth component
const RotatingEarth = () => {
  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      {/* Header with welcome message */}
      <div className="absolute top-0 left-0 w-full z-10 flex justify-center pt-8">
        <h1 className="text-white text-4xl font-bold text-center tracking-wide">
          Welcome to SHAKTI-AI
        </h1>
      </div>

      {/* Footer with call-to-action */}
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center pb-8">
        <p className="text-white text-xl text-center tracking-wide opacity-80 hover:opacity-100 transition-opacity duration-300">
          Let's begin, Click on the earth &gt;
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
      >
        {/* Brighter lighting setup to enhance continents */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 5]} intensity={1.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4A90E2" />

        {/* Starry background */}
        <Stars
          radius={300}
          depth={60}
          count={12000}
          factor={10}
          saturation={0}
          fade={true}
          speed={0.5}
        />

        {/* Earth with texture loading fallback */}
        <Suspense fallback={<LoadingEarth />}>
          <Earth />
        </Suspense>

        {/* Orbital controls */}
        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default RotatingEarth;