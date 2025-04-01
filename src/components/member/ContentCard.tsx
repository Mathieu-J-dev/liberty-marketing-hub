
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileVideo } from 'lucide-react';
import { ContentItem } from '@/types/memberTypes';

interface ContentCardProps {
  content: ContentItem;
}

const ContentCard = ({ content }: ContentCardProps) => {
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
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{content.title}</CardTitle>
        <CardDescription>Publié le {content.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{content.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          {content.type === 'pdf' ? (
            <>
              <Download className="h-4 w-4" /> Télécharger
            </>
          ) : (
            <>
              <FileVideo className="h-4 w-4" /> Accéder
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
