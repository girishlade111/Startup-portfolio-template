'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

interface ScrambleTextProps {
  text: string;
  delay?: number;
}

export function ScrambleText({ text, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const originalText = text;
    const chars = originalText.split('');
    const finalChars = chars.map(char => char === ' ' ? ' ' : char);
    
    let iteration = 0;
    const maxIterations = 20;
    const intervalSpeed = 30;
    
    const interval = setInterval(() => {
      iteration += 1;
      
      const scrambled = finalChars.map((char, i) => {
        if (char === ' ') return ' ';
        
        if (iteration >= maxIterations) {
          return finalChars[i];
        }
        
        const shouldReveal = Math.random() > (iteration / maxIterations);
        return shouldReveal ? finalChars[i] : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      });
      
      setDisplayText(scrambled.join(''));
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
      }
    }, intervalSpeed);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayText(originalText);
    }, delay * 1000 + maxIterations * intervalSpeed);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      {displayText}
    </motion.span>
  );
}