
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileVideo, Book, ExternalLink, Eye } from 'lucide-react';
import { useFileManagement, MemberContent } from '@/hooks/useFileManagement';

interface ContentCardProps {
  content: MemberContent;
}

const ContentCard = ({ content }: ContentCardProps) => {
  const { downloadSecureFile, incrementViews, getThumbnailUrl } = useFileManagement();

  const handleAction = async () => {
    // Incrémenter les vues
    await incrementViews(content.id);

    if (content.content_type === 'pdf' && content.file_path) {
      // Téléchargement sécurisé depuis Supabase Storage
      const signedUrl = await downloadSecureFile(content.id, content.file_path);
      if (signedUrl) {
        const link = document.createElement('a');
        link.href = signedUrl;
        link.download = content.title + '.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else if (content.download_url) {
      // Téléchargement direct via URL
      const link = document.createElement('a');
      link.href = content.download_url;
      link.download = content.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (content.external_url) {
      // Redirection vers URL externe
      window.open(content.external_url, '_blank');
    }
  };

  // Obtenir l'URL de la miniature
  const imageUrl = content.thumbnail_path 
    ? getThumbnailUrl(content.thumbnail_path)
    : `https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={content.title} 
          className="w-full h-full object-cover"
        />
        {content.content_type === 'pdf' && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">PDF</div>
        )}
        {content.content_type === 'video' && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">Vidéo</div>
        )}
        {content.content_type === 'course' && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">Formation</div>
        )}
        {content.is_premium && (
          <div className="absolute top-2 left-2 bg-liberty-gold text-white px-2 py-1 rounded text-xs">Premium</div>
        )}
        {/* Statistiques */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {content.view_count}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{content.title}</CardTitle>
        <CardDescription>
          Publié le {new Date(content.created_at).toLocaleDateString('fr-FR')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{content.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleAction}
        >
          {content.content_type === 'pdf' ? (
            <>
              <Download className="h-4 w-4" /> Télécharger
            </>
          ) : content.content_type === 'video' ? (
            <>
              <FileVideo className="h-4 w-4" /> Visionner
            </>
          ) : (
            <>
              <Book className="h-4 w-4" /> Accéder au cours
            </>
          )}
        </Button>
        
        {/* Bouton lien d'affiliation si présent */}
        {content.affiliate_link && (
          <Button 
            variant="secondary" 
            size="sm"
            className="w-full text-xs"
            onClick={() => window.open(content.affiliate_link, '_blank')}
          >
            <ExternalLink className="h-3 w-3 mr-1" /> Lien d'affiliation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
