import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WaveDivider, GeometricAccent } from '@/components/ui/DecorativeSVG';

const BrandSection = dynamic(() => import('@/components/sections/BrandSection').then(mod => mod.BrandSection), {
  loading: () => <div className="py-24" />,
});

const ProductsSection = dynamic(() => import('@/components/sections/ProductsSection').then(mod => mod.ProductsSection), {
  loading: () => <div className="py-24" />,
});

const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection').then(mod => mod.SkillsSection), {
  loading: () => <div className="py-24" />,
});

const TimelineSection = dynamic(() => import('@/components/sections/TimelineSection').then(mod => mod.TimelineSection), {
  loading: () => <div className="py-24" />,
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection').then(mod => mod.ContactSection), {
  loading: () => <div className="py-24" />,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <WaveDivider variant="gold" />
      <AboutSection />
      <GeometricAccent />
      <BrandSection />
      <WaveDivider variant="mixed" flip />
      <ProductsSection />
      <GeometricAccent />
      <SkillsSection />
      <WaveDivider variant="emerald" />
      <TimelineSection />
      <GeometricAccent />
      <ContactSection />
    </>
  );
}
