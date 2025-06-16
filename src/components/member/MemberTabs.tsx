
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, FileVideo, Book, Target, CreditCard } from 'lucide-react';
import ContentList from '@/components/member/ContentList';
import SubscriptionCard from '@/components/subscription/SubscriptionCard';
import ActionsSection from './ActionsSection';
import { memberContent } from '@/types/memberTypes';

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
  // Filtrer les contenus par type
  const pdfContent = memberContent.filter(item => item.type === 'pdf');
  const videoContent = memberContent.filter(item => item.type === 'video');
  const courseContent = memberContent.filter(item => item.type === 'course');

  return (
    <Tabs defaultValue="subscription" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="subscription">
          <CreditCard className="mr-2 h-4 w-4" /> Abonnement
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
      </TabsList>

      <TabsContent value="subscription">
        <div className="max-w-2xl mx-auto">
          <SubscriptionCard />
        </div>
      </TabsContent>

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
      
      <TabsContent value="actions">
        <ActionsSection 
          actions={actions}
          completedActions={completedActions}
          loadingActions={loadingActions}
        />
      </TabsContent>
    </Tabs>
  );
};

export default MemberTabs;
