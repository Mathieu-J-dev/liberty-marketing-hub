
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { Play, Download, Mail } from 'lucide-react';

const Capture = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'download'>('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name || !acceptTerms) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs et accepter les conditions.",
      });
      return;
    }
    
    // Simulate API call
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
        link.href = "https://example.com/guide-affiliation-2025.pdf"; // Remplacez par le lien réel de votre PDF
        link.download = "Guide-Affiliation-Affi-Liberty-2025.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1000);
    }
    
    // Reset form
    setEmail('');
    setName('');
    setAcceptTerms(false);
  };

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Layout>
      <div className="section">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Découvrez Comment Générer <span className="gradient-text">€3000/mois</span> en Affiliation grâce à notre Méthode V.I.B.E
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Accédez à notre masterclass gratuite et recevez un guide exclusif sur les meilleures stratégies d'affiliation en 2025.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg aspect-video relative">
                {!isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-liberty-blue/20">
                    <button 
                      onClick={toggleVideo}
                      className="bg-liberty-gold text-white rounded-full p-4 hover:bg-liberty-gold/90 transition-all transform hover:scale-105"
                    >
                      <Play className="h-8 w-8" />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 text-white bg-black/40 p-3 rounded">
                      <p className="font-medium">Masterclass: Les 5 Secrets de l'Affiliation Rentable</p>
                      <p className="text-sm">Durée: 45 minutes</p>
                    </div>
                  </div>
                ) : (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                    title="Masterclass Affiliation" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                )}
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Masterclass Thumbnail" 
                  className={`w-full h-full object-cover ${isPlaying ? 'hidden' : 'block'}`}
                />
              </div>
              
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
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Comment souhaitez-vous recevoir votre guide?</Label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div 
                        className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${deliveryMethod === 'email' ? 'border-liberty-gold bg-liberty-gold/10' : 'border-gray-200'}`}
                        onClick={() => setDeliveryMethod('email')}
                      >
                        <Mail className={`h-5 w-5 mr-2 ${deliveryMethod === 'email' ? 'text-liberty-gold' : 'text-gray-500'}`} />
                        <span>Par email</span>
                      </div>
                      <div 
                        className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${deliveryMethod === 'download' ? 'border-liberty-gold bg-liberty-gold/10' : 'border-gray-200'}`}
                        onClick={() => setDeliveryMethod('download')}
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
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      J'accepte de recevoir des communications marketing d'Affi-Liberty
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-liberty-gold hover:bg-liberty-gold/90 text-white py-6">
                    {deliveryMethod === 'email' ? 'Recevoir par Email' : 'Télécharger Maintenant'} 
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Capture;
