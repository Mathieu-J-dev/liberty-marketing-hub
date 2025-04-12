
import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
  duration: string;
}

const VideoPlayer = ({ thumbnailUrl, videoUrl, title, duration }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg aspect-video relative">
      {!isPlaying ? (
        <div className="absolute inset-0 flex items-center justify-center bg-liberty-blue/20">
          <button 
            onClick={toggleVideo}
            className="bg-liberty-gold text-white rounded-full p-4 hover:bg-liberty-gold/90 transition-all transform hover:scale-105"
          >
            <Play className="h-8 w-8" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-white bg-black/40 p-3 rounded">
            <p className="font-medium">{title}</p>
            <p className="text-sm">Durée: {duration}</p>
          </div>
        </div>
      ) : (
        <iframe 
          width="100%" 
          height="100%" 
          src={`${videoUrl}?autoplay=1`}
          title={title}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      )}
      <img 
        src={thumbnailUrl} 
        alt={`${title} Thumbnail`} 
        className={`w-full h-full object-cover ${isPlaying ? 'hidden' : 'block'}`}
      />
    </div>
  );
};

export default VideoPlayer;
