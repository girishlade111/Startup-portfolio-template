'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ExternalLink, Zap, Unlock, Code2, User } from 'lucide-react';
import { useTheme } from 'next-themes';

const brandStory = [
  {
    text: "Every great tool was once just an idea someone couldn't afford to build.",
    large: true,
  },
  {
    text: "Growing up in Pandharpur and moving to Mumbai with nothing but ambition, I saw how expensive, paywalled, and login-heavy developer tools created barriers for people like me — developers with big ideas but limited resources.",
    large: false,
  },
  {
    text: "So I built LadeStack. Not with investor money. Not with a team. Just me, my laptop, and a stubborn belief that powerful tools should be free and accessible to every developer on earth — no credit card, no login, no catch.",
    large: false,
  },
  {
    text: "Every product I ship is a promise: whatever I build, you'll always be able to use it for free. Because the best way to grow as a developer is to have access to great tools — and I'm here to make sure you do.",
    large: false,
  },
];

const values = [
  {
    icon: Zap,
    title: "Always Free",
    description: "No paywalls. No catch. Ever.",
  },
  {
    icon: Unlock,
    title: "No Login Required",
    description: "Use our tools instantly, no account needed.",
  },
  {
    icon: Code2,
    title: "Built for Developers",
    description: "Every feature designed with developer experience first.",
  },
  {
    icon: User,
    title: "Solo but Serious",
    description: "One founder, enterprise-grade quality.",
  },
];

export function BrandSection() {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="brand"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at top, rgba(212,175,55,0.15), transparent 60%), radial-gradient(ellipse at bottom, rgba(16,185,129,0.08), transparent 60%)'
          : 'radial-gradient(ellipse at top, rgba(180,140,20,0.08), transparent 60%), radial-gradient(ellipse at bottom, rgba(6,78,59,0.06), transparent 60%)',
      }}
    >
      {/* Top Metallic Divider */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(16,185,129,0.3), transparent)',
      }} />

      {/* Bottom Metallic Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(16,185,129,0.3), transparent)',
      }} />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Part 1: Brand Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-border" />
            <span className="text-primary font-mono text-xs tracking-[0.3em]">LADESTACK</span>
            <span className="h-px w-16 bg-border" />
          </div>
          <h2 className="font-display text-5xl mt-4 gradient-text">LadeStack</h2>
        </motion.div>

        {/* Part 2: Emotional Story */}
        <div className="mt-16">
          {brandStory.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={paragraph.large
                ? 'font-display text-2xl md:text-3xl text-foreground'
                : 'text-lg text-muted-foreground leading-relaxed'
              }
              style={{ marginTop: i === 0 ? 0 : '1.5rem' }}
            >
              {paragraph.text}
            </motion.p>
          ))}

          {/* Final Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-display text-3xl gradient-text mt-10"
          >
            From Pandharpur to the Internet. For every developer who ever said &quot;I wish I had this for free.&quot;
          </motion.p>
        </div>

        {/* Part 3: Brand Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
              className="metallic-panel rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full gradient-text bg-primary/10 flex items-center justify-center mx-auto">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-foreground font-semibold mt-4">{value.title}</h3>
              <p className="text-muted-foreground text-sm mt-2">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Part 4: Mission Statement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-20 max-w-2xl mx-auto text-left border-l-4 border-primary"
        >
          <p className="pl-6 font-display text-xl md:text-2xl text-foreground">
            Mission: To build a world where every developer — regardless of budget — has access to powerful, free, AI-driven tools that help them build faster, better, and smarter.
          </p>
        </motion.div>

        {/* Part 5: Brand CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-row gap-4 mt-12 justify-center flex-wrap"
        >
          <a
            href="https://www.ladestack.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-3 font-medium hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Explore LadeStack
            <ExternalLink className="w-4 h-4" />
          </a>
          
          <a
            href="#products"
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 border border-border bg-transparent text-foreground rounded-full px-8 py-3 hover:bg-muted transition-all"
          >
            See All Products
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}