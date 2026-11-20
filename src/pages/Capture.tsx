import React from 'react';
import Layout from '@/components/layout/Layout';
import CaptureSection from '@/components/capture/CaptureSection';
import { useSeo } from '@/hooks/useSeo';

const Capture = () => {
  useSeo({title: "Masterclass gratuite : Les 5 Secrets de l'Affiliation Rentable | Affi-Liberty", description: "Recevez la masterclass vidéo et les guides PDF qui révèlent les secrets de l'affiliation rentable. Inscription gratuite."});
  return (
    <Layout>
      <div id="top"></div>
      <CaptureSection />
    </Layout>
  );
};

export default Capture;