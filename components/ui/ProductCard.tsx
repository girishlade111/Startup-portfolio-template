'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  icon: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  cardStyle?: 'terminal' | 'minimal' | 'glass' | 'neon' | 'gradient';
  status?: 'Live' | 'Dev';
  index: number;
}

export function ProductCard({
  icon,
  name,
  description,
  tags,
  link,
  cardStyle = 'minimal',
  status = 'Live',
  index,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const cardStyles = {
    terminal: 'bg-muted/50 border-border/30',
    minimal: 'bg-card border-border/50',
    glass: 'glass-card border-border/30',
    neon: 'bg-card border-primary/50 animate-neon-border',
    gradient: 'bg-card border-border/50',
  };

  const gradientStyles = {
    gradient: {
      background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, transparent 50%)',
    },
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`metallic-panel shimmer-hover ${cardStyles[cardStyle]} rounded-2xl p-6 border border-border/50 transition-all duration-300 hover:translate-y-[-6px] hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 group`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: 'preserve-3d',
        ...(cardStyle === 'gradient' ? gradientStyles.gradient : {}),
      }}
    >
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-text bg-primary/10 flex items-center justify-center text-xl">
            {icon}
          </div>
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs border ${
          status === 'Live' 
            ? 'border-green-500/50 text-green-500' 
            : 'border-emerald-500/50 text-emerald-500'
        }`}>
          {status === 'Live' ? 'Live ✅' : 'Dev 🔧'}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-full px-2.5 py-0.5 text-xs ${
              cardStyle === 'terminal'
                ? 'bg-muted text-muted-foreground font-mono border-border/30'
                : 'bg-muted text-muted-foreground border border-border/50'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/30">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
        >
          Try it free
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}