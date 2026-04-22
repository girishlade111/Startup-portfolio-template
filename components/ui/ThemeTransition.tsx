'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';

interface ThemeTransitionState {
  active: boolean;
  x: number;
  y: number;
}

export function ThemeTransition() {
  const [state, setState] = useState<ThemeTransitionState>({ active: false, x: 0, y: 0 });
  const { resolvedTheme } = useTheme();
  
  const maxSize = typeof window !== 'undefined' 
    ? Math.ceil(Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2)
    : 2000;
  
  const scale = useSpring(0, { stiffness: 400, damping: 90 });
  
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent<ThemeTransitionState>) => {
      setState({ active: true, x: e.detail.x, y: e.detail.y });
      scale.set(0);
      setTimeout(() => scale.set(1), 10);
      
      setTimeout(() => {
        setState({ active: false, x: 0, y: 0 });
      }, 700);
    };
    
    window.addEventListener('themechange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themechange', handleThemeChange as EventListener);
  }, [scale]);
  
  if (!state.active) return null;
  
  const bgColor = resolvedTheme === 'dark' ? '#0A1628' : '#FAF8F3';
  const currentSize = scale.get() * maxSize;
  const leftPos = state.x - currentSize / 2;
  const topPos = state.y - currentSize / 2;
  
  return (
    <motion.div
      className="fixed rounded-full z-[999] pointer-events-none"
      style={{
        width: currentSize,
        height: currentSize,
        left: leftPos,
        top: topPos,
        backgroundColor: bgColor,
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    />
  );
}