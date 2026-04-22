'use client';

import { motion } from 'framer-motion';
import { AnimatedTimelineLine } from '@/components/ui/AnimatedTimelineLine';

const timelineData = [
  {
    year: '2023',
    title: 'The Spark 🔥',
    description: 'Realized developers needed free, no-login tools. Started learning and building in spare time while working full-time in IT.',
  },
  {
    year: 'Early 2024',
    title: 'LadeStack is Born 🚀',
    description: 'Officially launched LadeStack as a brand. Registered the domain, built the foundation, started shipping the first tools.',
  },
  {
    year: 'Mid 2024',
    title: 'First Tools Go Live ✅',
    description: 'Shipped the Code Editor, Land Converter, and Resume Builder — three fully free, no-login tools used by real developers.',
  },
  {
    year: 'Late 2024',
    title: 'Going AI 🤖',
    description: 'Started building AI-powered products: LadeStack Builder (AI website generator) and an AI-powered image editor — both in active development.',
  },
  {
    year: '2025',
    title: 'Building the Stack 🏗️',
    description: 'Expanding LadeStack into a full developer toolkit. Self-hosted infrastructure on DigitalOcean, Supabase backend, n8n automations. 500+ tools in the arsenal.',
  },
  {
    year: 'Now ∞',
    title: 'Still Building 🔥',
    description: 'Every week, a new feature. Every month, a new product. Solo, bootstrapped, and unstoppable. LadeStack is just getting started.',
  },
];

export function TimelineSection() {
  const timelineHeight = timelineData.length * 180;

  return (
    <section id="journey" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-border" />
          <span className="text-primary font-mono text-sm tracking-widest">MY JOURNEY</span>
          <span className="h-px w-16 bg-border" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-center mt-4"
        >
          Building in Public
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center mt-2"
        >
          From Pandharpur to the Internet — one commit at a time.
        </motion.p>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Animated SVG Line */}
          <AnimatedTimelineLine height={timelineHeight} />

          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              className={`relative flex items-center mb-[100px] last:mb-0 ${
                index % 2 === 0 
                  ? 'md:flex-row' 
                  : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Timeline Dot */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
                style={{
                  boxShadow: '0 0 10px rgba(212,175,55,0.6)',
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.2 }}
              />

              {/* Card Container */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-8`}>
                <div className="metallic-panel rounded-2xl p-5 border border-border/50 max-w-xs ml-auto">
                  <span className="text-xs font-mono text-primary bg-primary/10 rounded-full px-2 py-0.5 inline-block">
                    {item.year}
                  </span>
                  <h4 className="font-semibold text-foreground mt-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                </div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Footer Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-border pt-8 mt-16 text-center"
        >
          <p className="text-muted-foreground italic">
            &quot;The best time to start was yesterday. The second best time is now.&quot;
          </p>
          <p className="text-sm text-foreground mt-2">— Girish Lade, Solo Founder</p>
        </motion.div>
      </div>
    </section>
  );
}