
import React from 'react';
import Layout from '@/components/layout/Layout';
import CaptureSection from '@/components/capture/CaptureSection';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import CTA from '@/components/home/CTA';
import { useSeo } from '@/hooks/useSeo';

const Index = () => {
  useSeo({title: "Affi-Liberty | Plateforme de Web Marketing et Affiliation", description: "Découvrez les meilleures opportunités d'affiliation et outils IA pour maximiser vos revenus en ligne avec Affi-Liberty."});
  return (
    <Layout>
      <div id="top"></div>
      <CaptureSection />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

export default Index;
