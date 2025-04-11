
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileVideo, Book, ExternalLink } from 'lucide-react';
import { ContentItem } from '@/types/memberTypes';

interface ContentCardProps {
  content: ContentItem;
}

const ContentCard = ({ content }: ContentCardProps) => {
  const handleAction = () => {
    if (content.type === 'pdf' && content.downloadUrl) {
      // Téléchargement direct
      const link = document.createElement('a');
      link.href = content.downloadUrl;
      link.download = content.title + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Redirection vers l'URL
      window.open(content.url, '_blank');
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={content.imageUrl} 
          alt={content.title} 
          className="w-full h-full object-cover"
        />
        {content.type === 'pdf' && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">PDF</div>
        )}
        {content.type === 'video' && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded">Vidéo</div>
        )}
        {content.type === 'course' && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded">Formation</div>
        )}
        {content.premium && (
          <div className="absolute top-2 left-2 bg-liberty-gold text-white px-2 py-1 rounded">Premium</div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{content.title}</CardTitle>
        <CardDescription>Publié le {content.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{content.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleAction}
        >
          {content.type === 'pdf' ? (
            <>
              <Download className="h-4 w-4" /> Télécharger
            </>
          ) : content.type === 'video' ? (
            <>
              <FileVideo className="h-4 w-4" /> Visionner
            </>
          ) : (
            <>
              <Book className="h-4 w-4" /> Accéder au cours
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
