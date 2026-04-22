'use client';

import { motion } from 'framer-motion';

interface WaveDividerProps {
  variant?: 'gold' | 'emerald' | 'mixed';
  flip?: boolean;
}

export function WaveDivider({ variant = 'gold', flip = false }: WaveDividerProps) {
  const colors = {
    gold: { start: '#D4AF37', end: '#B48C14' },
    emerald: { start: '#10B981', end: '#064E3B' },
    mixed: { start: '#D4AF37', end: '#10B981' },
  };

  const { start, end } = colors[variant];

  return (
    <div
      className="w-full overflow-hidden pointer-events-none select-none"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`wave-grad-${variant}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={start} stopOpacity="0.15" />
            <stop offset="50%" stopColor={end} stopOpacity="0.08" />
            <stop offset="100%" stopColor={start} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={`url(#wave-grad-${variant})`}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40"
          stroke={start}
          strokeWidth="1"
          strokeOpacity="0.2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

export function GeometricAccent() {
  return (
    <div className="flex justify-center py-8" aria-hidden="true">
      <svg width="200" height="2" viewBox="0 0 200 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="0" y1="1" x2="80" y2="1"
          stroke="#D4AF37"
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.circle
          cx="100" cy="1" r="2"
          fill="#D4AF37"
          fillOpacity="0.5"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
        <motion.line
          x1="120" y1="1" x2="200" y2="1"
          stroke="#10B981"
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </svg>
    </div>
  );
}
