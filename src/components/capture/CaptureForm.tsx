
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Mail, Download, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CaptureForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'download'>('email');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name || !acceptTerms) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs et accepter les conditions.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ name, email, source: 'capture-page' }]);

      if (error) {
        if (error.code === '23505') { // Gère la violation de contrainte unique (email déjà existant)
          toast({
            variant: "destructive",
            title: "Email déjà enregistré",
            description: "Cet email est déjà dans notre liste. Essayez avec une autre adresse.",
          });
        } else {
          throw error;
        }
      } else {
        // Succès de l'appel API
        toast({
          title: "Inscription réussie!",
          description: deliveryMethod === 'email' 
            ? "Consultez votre email pour accéder à votre guide exclusif."
            : "Téléchargement de votre guide exclusif en cours...",
        });
        
        if (deliveryMethod === 'download') {
          // Simuler un téléchargement direct du PDF
          setTimeout(() => {
            const link = document.createElement('a');
            link.href = "/pdf/analyse_niche_2025.pdf";
            link.download = "analyse_niche_2025.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 1000);
        }
        
        // Réinitialiser le formulaire
        setEmail('');
        setName('');
        setAcceptTerms(false);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Une erreur est survenue",
        description: "Impossible de traiter votre demande pour le moment. Veuillez réessayer.",
      });
      console.error("Erreur lors de l'insertion du prospect :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Recevez Notre Guide Exclusif</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Votre Nom</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="Jean Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div>
          <Label htmlFor="email">Votre Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="jean@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Comment souhaitez-vous recevoir votre guide?</Label>
          <div className="flex flex-col md:flex-row gap-4">
            <div 
              className={`flex items-center p-3 border rounded-md transition-all ${deliveryMethod === 'email' ? 'border-liberty-gold bg-liberty-gold/10' : 'border-gray-200'} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !isLoading && setDeliveryMethod('email')}
            >
              <Mail className={`h-5 w-5 mr-2 ${deliveryMethod === 'email' ? 'text-liberty-gold' : 'text-gray-500'}`} />
              <span>Par email</span>
            </div>
            <div 
              className={`flex items-center p-3 border rounded-md transition-all ${deliveryMethod === 'download' ? 'border-liberty-gold bg-liberty-gold/10' : 'border-gray-200'} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => !isLoading && setDeliveryMethod('download')}
            >
              <Download className={`h-5 w-5 mr-2 ${deliveryMethod === 'download' ? 'text-liberty-gold' : 'text-gray-500'}`} />
              <span>Téléchargement direct</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            disabled={isLoading}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            J'accepte de recevoir des communications marketing d'Affi-Liberty
          </label>
        </div>
        
        <Button type="submit" className="w-full bg-liberty-gold hover:bg-liberty-gold/90 text-white py-6" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            deliveryMethod === 'email' ? 'Recevoir par Email' : 'Télécharger Maintenant'
          )}
        </Button>
      </form>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Nous respectons votre vie privée. Consultez notre politique de confidentialité.
      </p>
      
      <div className="flex items-center justify-center space-x-4 mt-6">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-liberty-gold" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm ml-1">Accès Immédiat</span>
        </div>
        <div className="flex items-center">
          <svg className="h-5 w-5 text-liberty-gold" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm ml-1">100% Gratuit</span>
        </div>
      </div>
    </div>
  );
};

export default CaptureForm;
