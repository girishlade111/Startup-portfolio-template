'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Code, Link2, Globe, MapPin } from 'lucide-react';
import { toast } from 'sonner';
// TODO: Re-enable magnetic effect once cursor is stable
// import { useMagneticEffect } from '@/hooks/useMagneticEffect';

const contactItems = [
  {
    icon: '📧',
    label: 'Direct Message',
    value: '@girish_lade_',
    href: 'https://instagram.com/girish_lade_',
    Component: Mail,
  },
  {
    icon: '🐙',
    label: 'Open Source Work',
    value: 'github.com/girishlade111',
    href: 'https://github.com/girishlade111',
    Component: Code,
  },
  {
    icon: '📸',
    label: 'Follow the Journey',
    value: 'instagram.com/girish_lade_',
    href: 'https://instagram.com/girish_lade_',
    Component: Link2,
  },
  {
    icon: '🌐',
    label: 'Brand Website',
    value: 'ladestack.in',
    href: 'https://ladestack.in',
    Component: Globe,
  },
];

const availability = [
  'Freelance collaborations',
  'Open source contributions',
  'Developer community projects',
  'Product feedback and testing',
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  // TODO: Re-enable magnetic effect once cursor is stable
  // const { ref: buttonRef, x: buttonX, y: buttonY } = useMagneticEffect<HTMLButtonElement>(0.3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message received! I\'ll get back to you soon. 🚀');
    setFormData({ name: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-border" />
          <span className="text-primary font-mono text-sm tracking-widest">CONTACT</span>
          <span className="h-px w-16 bg-border" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl text-center mt-4 gradient-text"
        >
          Let&apos;s Build Together
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-center mt-2 max-w-2xl mx-auto"
        >
          Have a project in mind? Want to collaborate? Or just say hi? I&apos;m always open to interesting conversations.
        </motion.p>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Reach me at</h3>

            <div className="flex flex-col gap-4">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="metallic-panel rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full gradient-text bg-primary/10 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-4 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Currently based in: Mumbai, India</span>
            </div>

            {/* Availability Status */}
            <div className="metallic-panel rounded-2xl p-5 mt-6">
              <h4 className="text-foreground font-medium mb-3">🟢 Open to:</h4>
              <ul className="text-sm text-muted-foreground">
                {availability.map((item) => (
                  <li key={item} className="mb-1">→ {item}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* TODO: Connect to a form backend like Formspree or EmailJS */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors w-full"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors w-full"
                  required
                />
              </div>

              <div>
                <textarea
                  placeholder="Tell me what you're building..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors w-full resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-xl px-6 py-3 font-medium hover:opacity-90 hover:scale-[1.01] transition-all"
              >
                Send Message →
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}