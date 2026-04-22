'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Target, Zap, Brain, Calendar, Code, Link2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { number: '3+', label: 'Live Products' },
  { number: '500+', label: 'Tools Mastered' },
  { number: '100%', label: 'Bootstrap Built' },
  { number: '∞', label: 'Lines of Code' },
];

const infoItems = [
  { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
  { icon: Briefcase, label: 'Day Job', value: 'Automation Test Engineer' },
  { icon: Target, label: 'Brand', value: 'LadeStack' },
  { icon: Zap, label: 'Focus', value: 'Free AI Developer Tools' },
  { icon: Brain, label: 'Type', value: 'Solo Founder, Bootstrapped' },
  { icon: Calendar, label: 'Building Since', value: '2024' },
];

const quickLinks = [
  { icon: Code, href: 'https://github.com/girishlade111', label: 'GitHub' },
  { icon: Link2, href: 'https://instagram.com/girish_lade_', label: 'Instagram' },
  { icon: ExternalLink, href: 'https://ladestack.in', label: 'LadeStack' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 justify-center"
        >
          <span className="h-px flex-1 max-w-[100px] bg-border" />
          <span className="text-primary font-mono text-sm tracking-widest">ABOUT ME</span>
          <span className="h-px flex-1 max-w-[100px] bg-border" />
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-center mt-4"
        >
          The Person Behind the Code
        </motion.h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Left Column - Photo + Status */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            {/* Photo Container */}
            <div className="relative w-[320px] h-[320px] rounded-2xl">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B48C14, #10B981)',
                  padding: '2px',
                }}
              >
                <div className="w-full h-full rounded-[calc(0.5rem-2px)] bg-card flex items-center justify-center overflow-hidden animate-pulse-glow">
                  <Image
                    src="/images/girish.jpg"
                    alt="Girish Lade - LadeStack Founder"
                    width={320}
                    height={320}
                    priority
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Hide broken image, show fallback initials
                      (e.target as HTMLImageElement).style.display = 'none';
                      const fallback = (e.target as HTMLImageElement).parentElement?.querySelector('.photo-fallback');
                      if (fallback) (fallback as HTMLElement).style.display = 'flex';
                    }}
                  />
                  {/* Fallback shown when photo not yet available */}
                  <div className="photo-fallback hidden absolute inset-0 items-center justify-center">
                    <div className="text-center">
                      <span className="font-display text-8xl gradient-text">GL</span>
                      <p className="text-muted-foreground text-sm mt-2">Photo Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="metallic-panel rounded-full px-4 py-2 mt-6 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm">Available for Collaboration</span>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-[320px]">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <span className="font-display text-2xl gradient-text block">{stat.number}</span>
                  <span className="text-muted-foreground text-xs">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Bio + Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            {/* Bio Heading */}
            <h3 className="font-display text-2xl">Hi, I&apos;m Girish 👋</h3>

            {/* Bio Paragraphs */}
            <p className="text-muted-foreground leading-relaxed mt-4">
              Born in Pandharpur, Maharashtra, and now building from Mumbai — I&apos;m a solo founder, full-stack developer, and automation test engineer by profession. By night (and weekends), I build LadeStack: a growing suite of free developer tools powered by AI. No investors. No co-founders. Just code, conviction, and coffee.
            </p>

            <p className="text-muted-foreground leading-relaxed mt-4">
              I work in the IT sector specializing in automation and manual testing. Outside of my 9-to-5, I&apos;ve been quietly building products that thousands of developers use for free — because great tools shouldn&apos;t cost a fortune.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {infoItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                  className="metallic-panel rounded-lg p-3 flex items-center gap-3"
                >
                  <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm truncate">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex gap-3 mt-6"
            >
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border rounded-full p-2.5 hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}