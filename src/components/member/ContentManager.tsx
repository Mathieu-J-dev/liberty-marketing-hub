import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import ContentList from './ContentList';
import FileUploader from './FileUploader';
import { useFileManagement, MemberContent } from '@/hooks/useFileManagement';

const ContentManager: React.FC = () => {
  const { fetchContent, loading } = useFileManagement();
  const [content, setContent] = useState<MemberContent[]>([]);
  const [showUploader, setShowUploader] = useState(false);

  // Charger le contenu au montage
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    const data = await fetchContent();
    setContent(data);
  };

  const handleContentCreated = () => {
    setShowUploader(false);
    loadContent(); // Recharger la liste
  };

  // Filtrer par type
  const pdfContent = content.filter(item => item.content_type === 'pdf');
  const videoContent = content.filter(item => item.content_type === 'video');
  const courseContent = content.filter(item => item.content_type === 'course');

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Chargement du contenu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bouton d'ajout */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion du contenu</h2>
        <Button 
          onClick={() => setShowUploader(!showUploader)}
          className="bg-liberty-blue hover:bg-liberty-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter du contenu
        </Button>
      </div>

      {/* Formulaire d'upload */}
      {showUploader && (
        <div className="mb-8">
          <FileUploader onContentCreated={handleContentCreated} />
        </div>
      )}

      {/* Onglets de contenu */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            Tout ({content.length})
          </TabsTrigger>
          <TabsTrigger value="pdf">
            PDF ({pdfContent.length})
          </TabsTrigger>
          <TabsTrigger value="video">
            Vidéos ({videoContent.length})
          </TabsTrigger>
          <TabsTrigger value="course">
            Formations ({courseContent.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {content.length > 0 ? (
            <ContentList items={content} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Upload className="mx-auto h-12 w-12 mb-4" />
              <p>Aucun contenu disponible.</p>
              <p className="text-sm">Commencez par ajouter du contenu.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pdf">
          {pdfContent.length > 0 ? (
            <ContentList items={pdfContent} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun document PDF disponible.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="video">
          {videoContent.length > 0 ? (
            <ContentList items={videoContent} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune vidéo disponible.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="course">
          {courseContent.length > 0 ? (
            <ContentList items={courseContent} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Aucune formation disponible.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;