
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FileVideo, Book, Target, CreditCard, Settings, GraduationCap } from 'lucide-react';
import ContentList from '@/components/member/ContentList';
import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import ActionsSection from './ActionsSection';
import ContentManager from './ContentManager';
import StarterPackCourse from '@/components/courses/StarterPackCourse';
import { useFileManagement, MemberContent } from '@/hooks/useFileManagement';

type Action = {
  id: string;
  title: string;
  description: string | null;
  xp_reward: number;
  type: string;
};

type CompletedAction = {
  id: string;
  action_id: string;
  completed_at: string;
};

interface MemberTabsProps {
  actions: Action[];
  completedActions: CompletedAction[];
  loadingActions: boolean;
}

const MemberTabs: React.FC<MemberTabsProps> = ({ 
  actions, 
  completedActions, 
  loadingActions 
}) => {
  const { fetchContent, loading } = useFileManagement();
  const [content, setContent] = useState<MemberContent[]>([]);

  // Charger le contenu au montage
  useEffect(() => {
    const loadContent = async () => {
      const data = await fetchContent();
      setContent(data);
    };
    loadContent();
  }, [fetchContent]);

  // Filtrer les contenus par type
  const pdfContent = content.filter(item => item.content_type === 'pdf');
  const videoContent = content.filter(item => item.content_type === 'video');
  const courseContent = content.filter(item => item.content_type === 'course');

  return (
    <Tabs defaultValue="subscription" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="subscription">
          <CreditCard className="mr-2 h-4 w-4" /> Abonnement
        </TabsTrigger>
        <TabsTrigger value="starter-pack">
          <GraduationCap className="mr-2 h-4 w-4" /> Starter Pack
        </TabsTrigger>
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
        <TabsTrigger value="actions">
          <Target className="mr-2 h-4 w-4" /> Actions
        </TabsTrigger>
        <TabsTrigger value="admin">
          <Settings className="mr-2 h-4 w-4" /> Administration
        </TabsTrigger>
      </TabsList>

      <TabsContent value="subscription">
        <div className="max-w-2xl mx-auto">
          <SubscriptionCard />
        </div>
      </TabsContent>

      <TabsContent value="starter-pack">
        <StarterPackCourse />
      </TabsContent>

      <TabsContent value="all">
        {loading ? (
          <div className="text-center py-8">Chargement du contenu...</div>
        ) : (
          <ContentList items={content} />
        )}
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
      
      <TabsContent value="actions">
        <ActionsSection 
          actions={actions}
          completedActions={completedActions}
          loadingActions={loadingActions}
        />
      </TabsContent>

      <TabsContent value="admin">
        <ContentManager />
      </TabsContent>
    </Tabs>
  );
};

export default MemberTabs;
