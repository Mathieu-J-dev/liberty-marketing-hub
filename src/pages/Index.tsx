
import React from 'react';
import Layout from '@/components/layout/Layout';
import CaptureSection from '@/components/capture/CaptureSection';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import CTA from '@/components/home/CTA';

const Index = () => {
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
