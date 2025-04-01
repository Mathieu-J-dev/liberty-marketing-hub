
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { FileText, FileVideo, Book } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/member/ProfileHeader';
import ContentList from '@/components/member/ContentList';
import { memberContent } from '@/types/memberTypes';

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

  return (
    <Layout>
      <div className="section py-8">
        <div className="container mx-auto">
          <ProfileHeader user={user} onLogout={handleLogout} />

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
              <ContentList items={memberContent} />
            </TabsContent>

            <TabsContent value="pdf">
              <ContentList items={pdfContent} />
            </TabsContent>

            <TabsContent value="video">
              <ContentList items={videoContent} />
            </TabsContent>

            <TabsContent value="course">
              <ContentList items={courseContent} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MemberArea;
