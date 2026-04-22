'use client';

import { motion } from 'framer-motion';
import { Code, Link2 } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://github.com/girishlade111',
    label: 'GitHub',
    Component: Code,
  },
  {
    href: 'https://instagram.com/girish_lade_',
    label: 'Instagram',
    Component: Link2,
  },
  {
    href: 'https://ladestack.in',
    label: 'LadeStack',
    Component: Link2,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Girish Lade · LadeStack
          </p>

          {/* Middle - Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display text-2xl font-bold gradient-text"
          >
            GL
          </motion.div>

          {/* Right - Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label={link.label}
              >
                <link.Component className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Framer Motion & ☕ — No investors harmed in the making of LadeStack.
          </p>
        </div>
      </div>
    </footer>
  );
}