'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#brand', label: 'Brand' },
  { href: '#products', label: 'Products' },
  { href: '#skills', label: 'Skills' },
  { href: '#journey', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const themeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleThemeToggle = () => {
    // Get button position for circular transition
    if (themeButtonRef.current) {
      const rect = themeButtonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Dispatch custom event with position
      window.dispatchEvent(new CustomEvent('themechange', { 
        detail: { x, y } 
      }));
    }
    
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-display text-xl font-semibold gradient-text">
              Girish Lade
            </span>
            <span className="text-xs text-muted-foreground -mt-0.5">
              LadeStack Founder
            </span>
          </Link>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
                    activeSection === link.href.replace('#', '')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  )}
                />
              </a>
            ))}
          </div>

          {/* Right: Theme Toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              ref={themeButtonRef}
              onClick={handleThemeToggle}
              className="rounded-full border border-border p-2 hover:bg-muted transition-all"
            >
              <motion.span
                animate={{ rotate: isMounted && theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMounted && theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </motion.span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-sm hover:opacity-90 transition-all"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile: Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="container flex flex-col h-full pt-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center gap-8 flex-1 justify-center">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      'text-2xl font-display',
                      activeSection === link.href.replace('#', '')
                        ? 'text-primary'
                        : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </a>
                ))}

                <div className="flex items-center gap-4 mt-8">
                  <button
                    ref={themeButtonRef}
                    onClick={handleThemeToggle}
                    className="rounded-full border border-border p-3 hover:bg-muted transition-all"
                  >
                    {isMounted && theme === 'dark' ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                  <a
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, '#contact')}
                    className="rounded-full bg-primary text-primary-foreground px-6 py-2 text-sm hover:opacity-90 transition-all"
                  >
                    Let&apos;s Talk
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}