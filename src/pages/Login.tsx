
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, UserCheck } from 'lucide-react';

const Login = () => {
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Si déjà authentifié, rediriger vers l'espace membre
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/espace-membre');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Connexion réussie!",
          description: "Bienvenue dans votre espace membre.",
        });
        navigate('/espace-membre');
      } else {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur s'est produite lors de la connexion.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="section py-16">
        <div className="container mx-auto max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Espace Membre</CardTitle>
              <CardDescription className="text-center">
                Connectez-vous pour accéder à vos contenus exclusifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <a href="#" className="text-sm text-liberty-blue hover:underline">
                      Mot de passe oublié?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-liberty-blue hover:bg-liberty-blue/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                  <Lock className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <p>
                  Pas encore membre?{' '}
                  <a 
                    href="/capture" 
                    className="text-liberty-blue hover:underline"
                  >
                    Inscrivez-vous gratuitement
                  </a>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-center text-gray-500 w-full">
                En vous connectant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
