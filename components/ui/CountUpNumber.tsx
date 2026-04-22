'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';

interface CountUpNumberProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function CountUpNumber({ end, suffix = '', prefix = '', duration = 2 }: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: duration,
  });

  const display = useTransform(spring, (current) => {
    return Math.round(current);
  });

  useEffect(() => {
    if (isInView && end) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  // For static values like ∞
  if (suffix === '∞' || end === 0) {
    return <span>{prefix}{suffix}</span>;
  }

  return (
    <motion.span ref={ref}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}