'use client';

import { useMemo, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

interface ParticleFieldProps {
  mousePosition?: { x: number; y: number };
}

function Particles({ mousePosition }: ParticleFieldProps) {
  const { theme } = useTheme();
  const pointsRef = useRef<THREE.Points>(null);
  const { camera, size } = useThree();
  
  const isMobile = useMemo(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return true;
    }
    return false;
  }, []);
  
  const particleCount = isMobile ? 300 : 1000;

  const [positions, velocities, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const isDark = theme === 'dark';
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 1;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
      
      const isEmerald = Math.random() > 0.7;
      if (isDark) {
        // Gold: #D4AF37 (0.831, 0.686, 0.216) / Emerald: #10B981 (0.063, 0.725, 0.506)
        colors[i3] = isEmerald ? 0.063 : 0.831;
        colors[i3 + 1] = isEmerald ? 0.725 : 0.686;
        colors[i3 + 2] = isEmerald ? 0.506 : 0.216;
      } else {
        // Deep Gold: #B48C14 (0.706, 0.549, 0.078) / Deep Emerald: #064E3B (0.024, 0.306, 0.231)
        colors[i3] = isEmerald ? 0.024 : 0.706;
        colors[i3 + 1] = isEmerald ? 0.306 : 0.549;
        colors[i3 + 2] = isEmerald ? 0.231 : 0.078;
      }
    }
    
    return [positions, velocities, colors];
  }, [particleCount, theme]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  useFrame(() => {
    if (!pointsRef.current || !geometry) return;
    
    const positionAttr = geometry.attributes.position;
    if (!positionAttr) return;
    
    const pos = positionAttr.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];
      
      const dist = Math.sqrt(pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2);
      if (dist > 3) {
        const scale = (3 - 0.1) / dist;
        pos[i3] *= scale;
        pos[i3 + 1] *= scale;
        pos[i3 + 2] *= scale;
      }
      
      if (mousePosition && !isMobile) {
        const mouseX = ((mousePosition.x / size.width) * 2 - 1) * 5;
        const mouseY = -((mousePosition.y / size.height) * 2 - 1) * 3;
        
        const dx = pos[i3] - mouseX;
        const dy = pos[i3 + 1] - mouseY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distToMouse < 1.5) {
          const force = (1.5 - distToMouse) / 1.5;
          pos[i3] += (dx / distToMouse) * force * 0.05;
          pos[i3 + 1] += (dy / distToMouse) * force * 0.05;
        }
      }
    }
    
    positionAttr.needsUpdate = true;
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  const isDark = theme === 'dark';
  const opacity = isDark ? 1 : 0.4;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}

export function ParticleField({ mousePosition }: ParticleFieldProps) {
  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ fov: 60, position: [0, 0, 5] }}
        gl={{ antialias: true, alpha: true }}
        frameloop="demand"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <Particles mousePosition={mousePosition} />
      </Canvas>
    </Suspense>
  );
}