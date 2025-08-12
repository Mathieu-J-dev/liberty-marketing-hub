import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ChatbotSupport from '@/components/ChatbotSupport';

const INCLUDE_KEY = 'ai_include_affiliate_links';

const AssistantWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [includeAff, setIncludeAff] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem(INCLUDE_KEY);
    if (saved !== null) setIncludeAff(saved === 'true');
  }, []);

  const onToggle = (val: boolean) => {
    setIncludeAff(val);
    localStorage.setItem(INCLUDE_KEY, String(val));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="shadow-lg">
            <MessageCircle className="mr-2 h-5 w-5" /> Assistant IA
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Assistant IA Affi-Liberty</DialogTitle>
            <DialogDescription>Discutez avec votre assistant. Activez ou désactivez les recommandations d’affiliation ci-dessous.</DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between rounded-md border p-3 mb-4">
            <div>
              <Label htmlFor="aff-toggle" className="font-medium">Inclure des liens d’affiliation</Label>
              <p className="text-sm text-muted-foreground">Ajoute 2-3 recommandations pertinentes dans les réponses</p>
            </div>
            <Switch id="aff-toggle" checked={includeAff} onCheckedChange={onToggle} />
          </div>

          <ChatbotSupport includeAffiliateLinks={includeAff} title="Assistant IA Affi-Liberty" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssistantWidget;
