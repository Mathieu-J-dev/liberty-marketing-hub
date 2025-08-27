import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  return <div className="fixed bottom-6 right-6 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="lg" className="shadow-lg bg-liberty-600 hover:bg-liberty-700 border-0 rounded-full text-slate-400">
            <MessageCircle className="mr-2 h-5 w-5" /> Assistant IA
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4 bg-card text-card-foreground border-liberty-200 dark:border-liberty-800 shadow-xl" side="top" align="end" sideOffset={10}>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-liberty-900 dark:text-liberty-100">Assistant IA Affi-Liberty</h3>
              <p className="text-sm text-liberty-700 dark:text-liberty-300">Discutez avec votre assistant personnalisé</p>
            </div>

            <div className="flex items-center justify-between rounded-md border border-liberty-200 dark:border-liberty-700 bg-liberty-50 dark:bg-liberty-900/20 p-3">
              <div>
                <Label htmlFor="aff-toggle" className="font-medium text-liberty-900 dark:text-liberty-100">Liens d'affiliation</Label>
                <p className="text-xs text-liberty-600 dark:text-liberty-400">Recommandations dans les réponses</p>
              </div>
              <Switch id="aff-toggle" checked={includeAff} onCheckedChange={onToggle} />
            </div>

            <div className="max-h-96 overflow-hidden">
              <ChatbotSupport includeAffiliateLinks={includeAff} title="Assistant IA" />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>;
};
export default AssistantWidget;