'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RingProgress } from '@mantine/core';
import { InfiniteMarquee } from '@/components/ui/InfiniteMarquee';
import { cn } from '@/lib/utils';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Python', icon: '🐍' },
  { name: 'Three.js', icon: '📦' },
  { name: 'Tailwind CSS', icon: '💨' },
  { name: 'Framer Motion', icon: '🎬' },
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'Figma', icon: '🎯' },
  { name: 'Redux', icon: '🔄' },
  { name: 'GraphQL', icon: '◼️' },
  { name: 'REST API', icon: '🔗' },
];

const toolsAndPlatforms = [
  { name: 'Node.js', icon: '🟢' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Redis', icon: '🔴' },
  { name: 'Docker', icon: '🐳' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Azure', icon: '☁️' },
  { name: 'DigitalOcean', icon: '🌊' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Supabase', icon: '⚡' },
  { name: 'Claude AI', icon: '🤖' },
  { name: 'n8n', icon: '🔀' },
  { name: 'VS Code', icon: '💻' },
  { name: 'Postman', icon: '📮' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Nginx', icon: '🚦' },
  { name: 'PostgreSQL', icon: '🐘' },
];

const categories = [
  {
    icon: '🎨',
    name: 'Frontend Development',
    count: '8 skills',
    skills: ['React', 'Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML/CSS'],
  },
  {
    icon: '⚙️',
    name: 'Backend & Database',
    count: '7 skills',
    skills: ['Node.js', 'Python', 'MongoDB', 'Redis', 'PostgreSQL', 'REST API', 'GraphQL'],
  },
  {
    icon: '☁️',
    name: 'DevOps & Cloud',
    count: '7 skills',
    skills: ['Docker', 'DigitalOcean', 'Azure', 'Vercel', 'GitHub', 'Nginx', 'Linux'],
  },
  {
    icon: '🤖',
    name: 'AI & Automation',
    count: '6 skills',
    skills: ['Claude AI', 'n8n', 'Automation Testing', 'Manual Testing', 'AI Integration', 'Prompt Engineering'],
  },
  {
    icon: '🎯',
    name: 'Testing',
    count: '5 skills',
    skills: ['Automation Testing', 'Manual Testing', 'Test Planning', 'Bug Tracking', 'QA Processes'],
  },
  {
    icon: '🛠️',
    name: 'Design & Tools',
    count: '6 skills',
    skills: ['Figma', 'UI/UX Design', 'v0.dev', 'VS Code', 'Postman', 'Responsive Design'],
  },
];

const proficiency = [
  { skill: 'React/Next.js', percentage: 90 },
  { skill: 'UI/UX Design', percentage: 85 },
  { skill: 'Automation Testing', percentage: 88 },
  { skill: 'Node.js/Backend', percentage: 80 },
  { skill: 'AI Integration', percentage: 82 },
  { skill: 'DevOps/Cloud', percentage: 75 },
];

function AnimatedRing({ skill, percentage }: { skill: string; percentage: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 20, stiffness: 100 });
  const displayValue = useTransform(spring, (v) => Math.round(v));

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        motionValue.set(percentage);
      }}
    >
      <RingProgress
        size={120}
        thickness={10}
        sections={[{ value: percentage, color: '#D4AF37' }]}
        rootColor="var(--border)"
        style={{ transform: 'scale(1)' }}
      />
      <div className="text-center -mt-8">
        <motion.span
          className="text-2xl font-bold text-foreground"
          style={{ display: 'block' }}
        >
          {percentage}%
        </motion.span>
        <span className="text-xs text-muted-foreground">{skill}</span>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-border" />
          <span className="text-primary font-mono text-sm tracking-widest">SKILLS & TOOLS</span>
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
          The Stack Behind LadeStack
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center mt-2"
        >
          Comfortable with 500+ tools. Here are the ones I use most.
        </motion.p>
      </div>

      {/* Marquee Rows */}
      <div className="mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <InfiniteMarquee items={technologies} direction="left" speed="normal" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <InfiniteMarquee items={toolsAndPlatforms} direction="right" speed="normal" />
        </motion.div>
      </div>

      {/* Bottom Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-muted-foreground text-sm text-center mt-8"
      >
        And 500+ more tools across testing, automation, and development...
      </motion.p>

      {/* Skill Category Grid */}
      <div className="max-w-6xl mx-auto mt-20 px-6">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl mb-8"
        >
          Core Expertise
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="metallic-panel rounded-2xl p-6 border border-border/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-text bg-primary/10 flex items-center justify-center text-xl">
                  {category.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground">{category.name}</h4>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-3 py-1 text-xs border border-border/50 bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Proficiency Rings */}
      <div className="max-w-6xl mx-auto mt-16 px-6">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl text-center mb-12"
        >
          Key Proficiencies
        </motion.h3>

        <div className="flex flex-wrap justify-center gap-8">
          {proficiency.map((item, i) => (
            <AnimatedRing key={item.skill} skill={item.skill} percentage={item.percentage} />
          ))}
        </div>
      </div>
    </section>
  );
}