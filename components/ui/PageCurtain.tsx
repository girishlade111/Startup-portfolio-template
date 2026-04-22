'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function PageCurtain() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (revealed) return null;

  return (
    <>
      {/* Top Curtain */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 h-[50vh] bg-background z-[1000]"
      >
        {/* Center Logo */}
        <div className="flex items-center justify-center h-full">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="font-display text-6xl font-bold gradient-text"
          >
            GL
          </motion.span>
        </div>
      </motion.div>

      {/* Bottom Curtain */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 h-[50vh] bg-background z-[1000]"
      />
    </>
  );
}