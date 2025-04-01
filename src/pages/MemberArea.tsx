
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { FileText, FileVideo, Book, Download, LogOut } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Types pour les différents contenus
type ContentItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  type: 'pdf' | 'video' | 'course';
  date: string;
  premium: boolean;
};

// Contenus fictifs pour simuler l'espace membre
const memberContent: ContentItem[] = [
  {
    id: '1',
    title: 'Guide Complet de l\'Affiliation Marketing',
    description: 'Un guide PDF complet pour comprendre et maîtriser l\'affiliation marketing en 2025.',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#pdf-guide',
    type: 'pdf',
    date: '15 Mai 2025',
    premium: true
  },
  {
    id: '2',
    title: 'Formation: Trafic Qualifié pour Affiliés',
    description: 'Comment générer du trafic ciblé pour maximiser vos conversions d\'affiliation.',
    imageUrl: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#video-course',
    type: 'video',
    date: '28 Mars 2025',
    premium: true
  },
  {
    id: '3',
    title: 'Masterclass SEO pour Affiliés',
    description: 'Optimisez votre contenu pour les moteurs de recherche et boostez vos commissions.',
    imageUrl: 'https://images.unsplash.com/photo-1572177215652-08fca998a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#course',
    type: 'course',
    date: '10 Avril 2025',
    premium: true
  },
  {
    id: '4',
    title: 'Webinaire: Stratégies de Conversion Avancées',
    description: 'Techniques psychologiques pour augmenter vos taux de conversion en affiliation.',
    imageUrl: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#video-webinar',
    type: 'video',
    date: '22 Juin 2025',
    premium: true
  },
  {
    id: '5',
    title: 'Les Secrets des Super Affiliés',
    description: 'PDF exclusif révélant les habitudes et stratégies des affiliés qui gagnent +10K€/mois.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    url: '#pdf-secrets',
    type: 'pdf',
    date: '5 Février 2025',
    premium: true
  }
];

const MemberArea = () => {
  const { user, logout, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Rediriger si non connecté
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/');
  };

  // Filtrer les contenus par type
  const pdfContent = memberContent.filter(item => item.type === 'pdf');
  const videoContent = memberContent.filter(item => item.type === 'video');
  const courseContent = memberContent.filter(item => item.type === 'course');

  // Afficher un message de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <Layout>
        <div className="section py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold">Chargement de votre espace membre...</h2>
            <p className="mt-2">Veuillez patienter pendant que nous vérifions votre identité.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Si l'utilisateur n'est pas connecté, on ne render rien (la redirection se fera via useEffect)
  if (!user) return null;

  // Fonction pour afficher un contenu (carte)
  const renderContentCard = (content: ContentItem) => (
    <Card key={content.id} className="hover:shadow-md transition-shadow">
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

  return (
    <Layout>
      <div className="section py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Bienvenue, {user.name}</h1>
              <p className="text-gray-600">Accédez à vos ressources exclusives</p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 md:mt-0"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Déconnexion
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">Tous les contenus</TabsTrigger>
              <TabsTrigger value="pdf">
                <FileText className="mr-2 h-4 w-4" /> Documents PDF
              </TabsTrigger>
              <TabsTrigger value="video">
                <FileVideo className="mr-2 h-4 w-4" /> Vidéos
              </TabsTrigger>
              <TabsTrigger value="course">
                <Book className="mr-2 h-4 w-4" /> Formations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memberContent.map(content => renderContentCard(content))}
              </div>
            </TabsContent>

            <TabsContent value="pdf">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pdfContent.map(content => renderContentCard(content))}
              </div>
            </TabsContent>

            <TabsContent value="video">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoContent.map(content => renderContentCard(content))}
              </div>
            </TabsContent>

            <TabsContent value="course">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseContent.map(content => renderContentCard(content))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MemberArea;
