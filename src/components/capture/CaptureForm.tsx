
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

  // Validation d'email côté client
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation améliorée
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "Nom requis",
        description: "Veuillez saisir votre nom.",
      });
      return;
    }

    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Email requis",
        description: "Veuillez saisir votre adresse email.",
      });
      return;
    }

    if (!isEmailValid(email)) {
      toast({
        variant: "destructive",
        title: "Email invalide",
        description: "Veuillez saisir une adresse email valide.",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Conditions requises",
        description: "Veuillez accepter les conditions pour continuer.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          name: name.trim(), 
          email: email.trim().toLowerCase(), 
          source: 'capture-page' 
        }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            variant: "destructive",
            title: "Email déjà enregistré",
            description: "Cet email est déjà dans notre liste. Essayez avec une autre adresse.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Inscription réussie!",
          description: deliveryMethod === 'email' 
            ? "Consultez votre email pour accéder à votre guide exclusif."
            : "Téléchargement de votre guide exclusif en cours...",
        });
        
        if (deliveryMethod === 'download') {
          // Téléchargement direct d'un PDF depuis les assets publics
          setTimeout(() => {
            try {
              const link = document.createElement('a');
              link.href = "/guide-affiliation-2025.pdf"; // Fichier dans public/
              link.download = "Guide-Affiliation-Affi-Liberty-2025.pdf";
              link.style.display = 'none';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              toast({
                title: "Téléchargement démarré",
                description: "Votre guide exclusif est en cours de téléchargement.",
              });
            } catch (downloadError) {
              console.error('Erreur de téléchargement:', downloadError);
              toast({
                variant: "destructive",
                title: "Erreur de téléchargement",
                description: "Une erreur s'est produite. Nous vous enverrons le guide par email.",
              });
            }
          }, 1000);
        }
        
        // Réinitialiser le formulaire
        setEmail('');
        setName('');
        setAcceptTerms(false);
      }
    } catch (error: any) {
      console.error("Erreur lors de l'insertion du prospect:", error);
      toast({
        variant: "destructive",
        title: "Une erreur est survenue",
        description: "Impossible de traiter votre demande pour le moment. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-liberty-blue mb-2">
          🎯 Recevez Notre Guide Exclusif
        </h2>
        <p className="text-gray-600 text-sm">
          Stratégies d'affiliation qui génèrent vraiment des revenus
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Votre Nom *
          </Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="Jean Dupont"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Votre Email *
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="jean@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className={`mt-1 ${email && !isEmailValid(email) ? 'border-red-300 focus:border-red-500' : ''}`}
          />
          {email && !isEmailValid(email) && (
            <p className="text-red-500 text-xs mt-1">Format d'email invalide</p>
          )}
        </div>
        
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Comment souhaitez-vous recevoir votre guide? *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div 
              className={`flex items-center p-3 border rounded-lg transition-all cursor-pointer ${
                deliveryMethod === 'email' 
                  ? 'border-liberty-gold bg-liberty-gold/10 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isLoading && setDeliveryMethod('email')}
            >
              <Mail className={`h-5 w-5 mr-2 ${
                deliveryMethod === 'email' ? 'text-liberty-gold' : 'text-gray-500'
              }`} />
              <span className="text-sm font-medium">Par email</span>
            </div>
            <div 
              className={`flex items-center p-3 border rounded-lg transition-all cursor-pointer ${
                deliveryMethod === 'download' 
                  ? 'border-liberty-gold bg-liberty-gold/10 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !isLoading && setDeliveryMethod('download')}
            >
              <Download className={`h-5 w-5 mr-2 ${
                deliveryMethod === 'download' ? 'text-liberty-gold' : 'text-gray-500'
              }`} />
              <span className="text-sm font-medium">Téléchargement direct</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 py-2">
          <Checkbox 
            id="terms" 
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            disabled={isLoading}
            className="mt-1"
          />
          <label
            htmlFor="terms"
            className="text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            J'accepte de recevoir des communications marketing d'Affi-Liberty et j'ai lu la{' '}
            <span className="text-liberty-blue underline cursor-pointer">politique de confidentialité</span>
          </label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-liberty-gold hover:bg-liberty-gold/90 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Traitement en cours...
            </>
          ) : (
            <>
              {deliveryMethod === 'email' ? (
                <>
                  <Mail className="h-5 w-5 mr-2" />
                  Recevoir par Email
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Télécharger Maintenant
                </>
              )}
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 mb-4">
          🔒 Nous respectons votre vie privée. Aucun spam, désabonnement facile.
        </p>
        
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-liberty-gold mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Accès Immédiat</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-liberty-gold mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">100% Gratuit</span>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-liberty-gold mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Sans Engagement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptureForm;
