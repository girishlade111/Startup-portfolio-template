'use client';

import { cn } from '@/lib/utils';

interface MarqueeItem {
  name: string;
  icon: string;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const speedMap = {
  slow: '40s',
  normal: '25s',
  fast: '15s',
};

export function InfiniteMarquee({
  items,
  direction = 'left',
  speed = 'normal',
  className,
}: InfiniteMarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className={cn('relative overflow-hidden py-2', className)}>
      {/* Fade gradient mask */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div 
        className="flex animate-marquee"
        style={{
          animationDirection: direction === 'left' ? 'normal' : 'reverse',
          animationDuration: speedMap[speed],
        }}
        onMouseEnter={(e) => {
          const anim = e.currentTarget as HTMLElement;
          anim.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          const anim = e.currentTarget as HTMLElement;
          anim.style.animationPlayState = 'running';
        }}
      >
        {duplicatedItems.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 metallic-panel mx-3 whitespace-nowrap hover:border-primary/50 hover:text-primary transition-colors cursor-default"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium text-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}