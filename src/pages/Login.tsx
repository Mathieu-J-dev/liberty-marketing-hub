
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, UserCheck, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const { toast } = useToast();
  const { login, signup, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Si déjà authentifié, rediriger vers l'espace membre
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/espace-membre');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Connexion réussie!",
          description: "Bienvenue dans votre espace membre.",
        });
        navigate('/espace-membre');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await signup(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
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
                Accédez à vos contenus exclusifs Affi-Liberty
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" onValueChange={(value) => setIsSigningUp(value === 'signup')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-login">Email</Label>
                      <Input 
                        id="email-login" 
                        type="email" 
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password-login">Mot de passe</Label>
                        <a href="#" className="text-sm text-liberty-blue hover:underline">
                          Mot de passe oublié?
                        </a>
                      </div>
                      <Input 
                        id="password-login" 
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
                      disabled={loading}
                    >
                      {loading ? 'Connexion...' : 'Se connecter'}
                      <UserCheck className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input 
                        id="email-signup" 
                        type="email" 
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Mot de passe</Label>
                      <Input 
                        id="password-signup" 
                        type="password" 
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <p className="text-xs text-gray-500">Le mot de passe doit contenir au moins 6 caractères</p>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-liberty-gold hover:bg-liberty-gold/90"
                      disabled={loading}
                    >
                      {loading ? 'Inscription...' : 'S\'inscrire'}
                      <UserPlus className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-center text-gray-500 w-full">
                En vous {isSigningUp ? 'inscrivant' : 'connectant'}, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
