'use client';

import { motion } from 'framer-motion';

interface AnimatedTimelineLineProps {
  height: number;
}

export function AnimatedTimelineLine({ height }: AnimatedTimelineLineProps) {
  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full" style={{ height }}>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox={`0 0 2 ${height}`}
      >
        <motion.path
          d={`M 1 0 L 1 ${height}`}
          stroke="#D4AF37"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}