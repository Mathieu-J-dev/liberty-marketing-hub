
import React from 'react';
import Layout from '@/components/layout/Layout';
import VideoPlayer from '@/components/capture/VideoPlayer';
import CaptureForm from '@/components/capture/CaptureForm';

const Capture = () => {
  return (
    <Layout>
      <div id="top"></div>
      
      {/* Section principale */}
      <div className="section bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* En-tête avec titre principal */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Découvrez Comment Générer{' '}
                <span className="gradient-text text-liberty-gold">3000€/mois</span>{' '}
                en Affiliation
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-4 leading-relaxed">
                Sans vous ruiner dans des formations inutiles. Avec notre plan d'action clair et nos outils efficaces, 
                devenez l'entrepreneur digital qui construit un vrai revenu passif.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Stratégies 2025</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Outils inclus</span>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                  <svg className="h-5 w-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Guide PDF offert</span>
                </div>
              </div>
            </div>
            
            {/* Contenu principal en deux colonnes */}
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
              
              {/* Colonne vidéo */}
              <div className="relative">
                <VideoPlayer 
                  thumbnailUrl="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  videoUrl="/Les_5_Secrets_Affiliation_Rentable.mp4"
                  title="Les 5 Secrets de l'Affiliation Rentable en 2025"
                  duration="5 min"
                />
                
                {/* Points clés sous la vidéo */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-bold text-lg mb-4 text-liberty-blue">🎯 Ce que vous allez apprendre :</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-liberty-gold mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Les niches les plus rentables en 2025</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-liberty-gold mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Comment automatiser vos revenus</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-liberty-gold mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Les outils IA qui changent tout</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Colonne formulaire */}
              <div className="lg:sticky lg:top-8">
                <CaptureForm />
              </div>
            </div>
            
            {/* Section de social proof */}
            <div className="text-center py-12 border-t border-gray-200">
              <p className="text-gray-600 mb-6">Déjà plus de 2,847 entrepreneurs nous font confiance</p>
              <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
                <span className="text-2xl font-bold text-gray-400">★★★★★</span>
                <span className="text-sm text-gray-500">4.8/5 - Trustpilot</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500">2,847+ membres actifs</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500">Depuis 2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Capture;
