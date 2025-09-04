import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const PublicCallout: React.FC = () => {
  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Accès Membre Exclusif</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Vous ne voyez qu'un aperçu de nos programmes d'affiliation. 
              <strong> Créez votre compte gratuit</strong> pour accéder à notre bibliothèque complète avec :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-orange-500" />
                <span className="text-sm">+200 programmes premium</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm">Commissions jusqu'à 70%</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Accès communauté VIP</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/login">
                Créer mon compte gratuit
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/member-area">
                Déjà membre ? Se connecter
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicCallout;