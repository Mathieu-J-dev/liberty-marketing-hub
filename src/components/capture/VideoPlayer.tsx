
import React, { useState } from 'react';
import { Play, Volume2, Maximize } from 'lucide-react';

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
  duration: string;
}

const VideoPlayer = ({ thumbnailUrl, videoUrl, title, duration }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVideo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsPlaying(true);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-900 group">
      {!isPlaying ? (
        <>
          {/* Image de prévisualisation */}
          <div className="aspect-video relative">
            <img 
              src={thumbnailUrl} 
              alt={`${title} - Aperçu de la masterclass`} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
            
            {/* Badge durée */}
            <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
              📹 {duration}
            </div>
            
            {/* Badge qualité */}
            <div className="absolute top-4 left-4 bg-liberty-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
              HD GRATUIT
            </div>
            
            {/* Bouton Play central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={toggleVideo}
                disabled={isLoading}
                className="bg-liberty-gold hover:bg-liberty-gold/90 text-white rounded-full p-6 hover:scale-110 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                aria-label={`Lire la vidéo: ${title}`}
              >
                {isLoading ? (
                  <div className="animate-spin h-10 w-10 border-3 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <Play className="h-10 w-10 ml-1" fill="currentColor" />
                )}
              </button>
            </div>
            
            {/* Informations vidéo */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                {title}
              </h3>
              <div className="flex items-center space-x-4 text-white/90">
                <div className="flex items-center space-x-1">
                  <Volume2 className="h-4 w-4" />
                  <span className="text-sm">Audio français</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Maximize className="h-4 w-4" />
                  <span className="text-sm">Plein écran</span>
                </div>
              </div>
              
              {/* Barre de progression simulée */}
              <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-liberty-gold w-0 rounded-full transition-all duration-300 group-hover:w-2"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Lecteur vidéo intégré */
        <div className="aspect-video">
          <video 
            width="100%" 
            height="100%" 
            controls
            autoPlay
            className="rounded-xl"
            src={videoUrl}
          >
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>
      )}
      
      {/* Points de confiance */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
        <div className="bg-white px-6 py-2 rounded-full shadow-lg border border-gray-100">
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center text-green-600">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Gratuit
            </span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center text-blue-600">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sécurisé
            </span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center text-purple-600">
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Accès immédiat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
