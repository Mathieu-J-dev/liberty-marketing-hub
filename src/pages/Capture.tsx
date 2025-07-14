
import React from 'react';
import Layout from '@/components/layout/Layout';
import VideoPlayer from '@/components/capture/VideoPlayer';
import CaptureForm from '@/components/capture/CaptureForm';

const Capture = () => {
  return (
    <Layout>
      <div id="top"></div>
      <div className="section">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Découvrez Comment Générer <span className="gradient-text">€3000/mois</span> en Affiliation grâce à notre Méthode V.I.B.E
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Accédez à notre masterclass gratuite et recevez un guide exclusif sur les meilleures stratégies d'affiliation en 2025.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <VideoPlayer 
                thumbnailUrl="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Masterclass: Les 5 Secrets de l'Affiliation Rentable"
                duration="45 minutes"
              />
              
              <CaptureForm />
            </div>
            
            <div className="mt-16 pt-16 border-t">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Formulaire de contact</h2>
                <p className="text-gray-600">Avez-vous des questions ? Contactez-nous directement</p>
              </div>
              <iframe 
                className="airtable-embed w-full rounded-lg shadow-lg"
                src="https://airtable.com/embed/appYMx5GvmF4c7XAx/pagfSad5XLDIGvrWo/form" 
                frameBorder="0" 
                width="100%" 
                height="533" 
                style={{ background: 'transparent', border: '1px solid #ccc' }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Capture;
