'use client';

import { useEffect, useRef, useState } from 'react';
import { useMusicContext } from '@/components/music/MusicPlayerProvider';

const BAR_COUNT = 28;
const CANVAS_HEIGHT = 40;

interface FakeBarProps {
  index: number;
}

function FakeBar({ index }: FakeBarProps) {
  const delay = (index / BAR_COUNT) * 1.4;
  
  return (
    <div
      className="w-1 rounded-full"
      style={{
        height: `${Math.random() * 70 + 10}%`,
        background: `linear-gradient(to top, #D4AF37, ${index > BAR_COUNT * 0.7 ? '#10B981' : '#B48C14'})`,
        animation: `fakeBar ${1 + Math.random()}s ease-in-out infinite ${delay}s`,
      }}
    />
  );
}

function FakeVisualizer() {
  return (
    <div className="flex items-end justify-center gap-1 h-10">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <FakeBar key={i} index={i} />
      ))}
    </div>
  );
}

export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isPlaying, isMinimized } = useMusicContext();
  const [fallback, setFallback] = useState(false);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMinimized) return;
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setFallback(true);
      return;
    }

    const draw = () => {
      if (!isPlaying) {
        // Draw minimal bars when paused
        const barWidth = (canvas.width - (BAR_COUNT - 1) * 2) / BAR_COUNT;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < BAR_COUNT; i++) {
          const x = i * (barWidth + 2);
          const height = 3; // Minimum height
          const gradient = ctx.createLinearGradient(0, canvas.height - height, 0, canvas.height);
          gradient.addColorStop(0, '#D4AF37');
          gradient.addColorStop(1, '#B48C14');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, canvas.height - height, barWidth, height, 2);
          ctx.fill();
        }
        return;
      }

      // Generate random frequency-like data for visualization
      // (In production, this would come from WebAudio API analyser)
      const barWidth = (canvas.width - (BAR_COUNT - 1) * 2) / BAR_COUNT;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < BAR_COUNT; i++) {
        // Simulate frequency data with smooth random values
        const time = Date.now() / 1000;
        const frequency = Math.sin(time * (2 + i * 0.3)) * 0.5 + 0.5;
        const noise = Math.random() * 0.3;
        const height = Math.max(3, (frequency + noise) * canvas.height * 0.9);
        
        const x = i * (barWidth + 2);
        
        // Gradient from violet to cyan based on position
        const ratio = i / BAR_COUNT;
        const gradient = ctx.createLinearGradient(0, canvas.height - height, 0, canvas.height);

        if (ratio < 0.7) {
          // Violet to purple
          gradient.addColorStop(0, '#D4AF37');
          gradient.addColorStop(1, '#B48C14');
        } else {
          // Purple to cyan
          gradient.addColorStop(0, '#10B981');
          gradient.addColorStop(1, '#064E3B');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - height, barWidth, height, 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isMinimized]);

  if (isMinimized) return null;

  // Style the canvas
  const canvasStyle: React.CSSProperties = {
    width: '100%',
    height: CANVAS_HEIGHT,
    borderRadius: '4px',
  };

  return fallback ? (
    <FakeVisualizer />
  ) : (
    <canvas
      ref={canvasRef}
      width={280}
      height={CANVAS_HEIGHT}
      style={canvasStyle}
      className="w-full"
    />
  );
}