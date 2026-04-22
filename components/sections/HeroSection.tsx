'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { ScrambleText } from '@/components/ui/ScrambleText';
import ScrollMorphHero from '@/components/ui/scroll-morph-hero';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | undefined>();
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition(undefined);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Scroll Morph Hero as Background */}
      <div className="absolute inset-0 z-0">
        <ScrollMorphHero />
      </div>

      {/* Gradient Overlay for Content Readability */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-background/60 via-background/40 to-background/80 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 rounded-full px-4 py-1 text-sm text-primary mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Solo Founder · LadeStack</span>
        </motion.div>

        {/* Main Heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold">
          <ScrambleText text="Girish Lade" delay={0.5} />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mt-4"
        >
          Full-Stack Developer<span className="animate-pulse mx-1">·</span> AI Builder<span className="animate-pulse mx-1">·</span> Solo Founder
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4"
        >
          Building free, powerful developer tools from Mumbai, India. One line of code at a time — no investors, no shortcuts, just craft.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-row gap-4 mt-8 justify-center flex-wrap"
        >
          <a
            href="#products"
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-3 font-medium hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
          >
            Explore My Work
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="https://www.ladestack.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border bg-transparent text-foreground rounded-full px-8 py-3 hover:bg-muted hover:scale-102 transition-all cursor-pointer"
          >
            View LadeStack
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 rounded-full border border-border flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          </div>
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}
