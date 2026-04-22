'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/ui/ProductCard';

type TabType = 'live' | 'dev';

const liveProducts = [
  {
    icon: '⌨️',
    name: 'Code Editor',
    description: 'A powerful browser-based code editor. Write, edit, and run code directly in your browser — no installation, no setup, no login required.',
    tags: ['Browser-Based', 'No Login', 'Free', 'Developer Tool'],
    link: 'https://code.ladestack.in',
    cardStyle: 'terminal' as const,
  },
  {
    icon: '🗺️',
    name: 'Land Converter',
    description: 'Instantly convert land measurements between different units. Simple, fast, and accurate — built for real estate professionals and everyday users.',
    tags: ['Utility Tool', 'No Login', 'Free', 'Conversion'],
    link: 'https://land.ladestack.in',
    cardStyle: 'minimal' as const,
  },
  {
    icon: '📄',
    name: 'Resume Builder',
    description: 'Create a professional resume in minutes. Choose from templates, fill your details, and export — completely free with no account needed.',
    tags: ['Career Tool', 'No Login', 'Free', 'Templates'],
    link: 'https://resume.ladestack.in',
    cardStyle: 'glass' as const,
  },
];

const devProducts = [
  {
    icon: '🤖',
    name: 'LadeStack Builder',
    description: 'An AI-powered website builder. Describe your website and AI builds it for you — like Lovable.dev and Bolt.new, powered by DeepSeek V3. No code required.',
    tags: ['AI-Powered', 'No Login', 'Free', 'Website Builder', 'DeepSeek V3'],
    link: '#',
    cardStyle: 'neon' as const,
    status: 'Dev' as const,
  },
  {
    icon: '🎨',
    name: 'Visual Website Builder',
    description: 'Drag-and-drop website builder like Wix or WordPress. Build beautiful websites visually with ready-to-use templates — no coding, no login, completely free.',
    tags: ['Drag & Drop', 'No Login', 'Free', 'Templates', 'No-Code'],
    link: '#',
    cardStyle: 'gradient' as const,
    status: 'Dev' as const,
  },
  {
    icon: '🖼️',
    name: 'AI Image Editor',
    description: 'A browser-based Photoshop-style image editor with AI features. Edit images with professional tools powered by AI — targeting semi-pro designers, no login required.',
    tags: ['AI-Powered', 'No Login', 'Free', 'Design Tool', 'Image Editing'],
    link: '#',
    cardStyle: 'glass' as const,
    status: 'Dev' as const,
  },
];

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('live');

  return (
    <section id="products" className="py-24 px-6">
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
          <span className="text-primary font-mono text-sm tracking-widest">PRODUCTS</span>
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
          Tools I&apos;ve Shipped
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center mt-2"
        >
          Free for everyone. No login. No paywalls. Just build.
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-3 mt-8"
        >
          <button
            onClick={() => setActiveTab('live')}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeTab === 'live'
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            Live Now ✅
          </button>
          <button
            onClick={() => setActiveTab('dev')}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeTab === 'dev'
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            In Development 🔧
          </button>
        </motion.div>

        {/* Products Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          >
            {activeTab === 'live'
              ? liveProducts.map((product, i) => (
                  <ProductCard key={product.name} {...product} index={i} />
                ))
              : devProducts.map((product, i) => (
                  <ProductCard key={product.name} {...product} index={i} status={product.status} />
                ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Text with Animated Dots */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-muted-foreground text-sm text-center mt-8 flex justify-center items-center gap-1"
        >
          <span>More tools coming soon. LadeStack is always building.</span>
          <span className="flex gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-dot-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-dot-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-dot-bounce" style={{ animationDelay: '0.4s' }} />
          </span>
        </motion.p>
      </div>
    </section>
  );
}