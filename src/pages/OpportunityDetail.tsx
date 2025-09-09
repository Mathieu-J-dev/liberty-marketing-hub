import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { opportunities } from '@/data/opportunities';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ArrowLeft, CheckCircle, DollarSign, Users, TrendingUp, Calendar, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const OpportunityDetail: React.FC = () => {
  const { id } = useParams();
  const opportunity = opportunities.find(opp => opp.id === parseInt(id || '0'));

  if (!opportunity) {
    return <Navigate to="/opportunities" replace />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb et retour */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/opportunities">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour aux opportunités
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* En-tête */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-4">{opportunity.category}</Badge>
                  <h1 className="text-4xl font-bold text-liberty-blue mb-4">{opportunity.title}</h1>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-semibold">{opportunity.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-liberty-gold">
                      <DollarSign className="h-5 w-5" />
                      <span className="font-semibold">{opportunity.commission}</span>
                    </div>
                    {opportunity.recurring && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Récurrent
                      </Badge>
                    )}
                  </div>
                </div>

                <img 
                  src={opportunity.image} 
                  alt={opportunity.title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Description détaillée */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-liberty-gold" />
                    À propos de cette opportunité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {opportunity.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Cette opportunité d'affiliation représente l'une des meilleures options disponibles sur le marché français en 2025. 
                    Avec un taux de conversion élevé et un support marketing complet, vous disposez de tous les outils nécessaires 
                    pour maximiser vos revenus d'affiliation.
                  </p>
                </CardContent>
              </Card>

              {/* Avantages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Pourquoi choisir ce programme ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Forte demande</h4>
                        <p className="text-sm text-gray-600">Marché en croissance avec une demande constante</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Support dédié</h4>
                        <p className="text-sm text-gray-600">Équipe support disponible 7j/7</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Paiements rapides</h4>
                        <p className="text-sm text-gray-600">Commissions versées sous 15 jours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Shield className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Garantie qualité</h4>
                        <p className="text-sm text-gray-600">Produit testé et approuvé par nos experts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stratégies de promotion */}
              <Card>
                <CardHeader>
                  <CardTitle>💡 Stratégies de promotion recommandées</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-liberty-gold rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-semibold">Contenu éducatif</h4>
                        <p className="text-sm text-gray-600">Créez des tutoriels et guides pratiques pour démontrer la valeur du produit</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-liberty-gold rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-semibold">Réseaux sociaux</h4>
                        <p className="text-sm text-gray-600">Partagez des témoignages clients et des cas d'usage concrets</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-liberty-gold rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-semibold">Email marketing</h4>
                        <p className="text-sm text-gray-600">Intégrez dans vos séquences d'emails avec une approche consultative</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar avec CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Card className="border-liberty-gold/20 shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-liberty-blue">Commencer maintenant</CardTitle>
                    <p className="text-gray-600">Rejoignez le programme d'affiliation</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-liberty-gold mb-2">{opportunity.earnings}</div>
                      <p className="text-sm text-gray-600">Revenus potentiels par client</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Commission</span>
                        <span className="font-semibold text-liberty-gold">{opportunity.commission}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Type</span>
                        <span className="font-semibold">{opportunity.recurring ? 'Récurrent' : 'Unique'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-gray-600">Note</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{opportunity.rating}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-liberty-gold hover:bg-liberty-gold/90 text-white font-semibold py-3">
                      Rejoindre le programme
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      🔒 Inscription gratuite • Validation sous 24h
                    </p>
                  </CardContent>
                </Card>

                {/* Informations complémentaires */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ℹ️ Informations pratiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <strong>Durée des cookies :</strong> 60 jours
                    </div>
                    <div>
                      <strong>Paiement minimum :</strong> 50€
                    </div>
                    <div>
                      <strong>Fréquence de paiement :</strong> Mensuelle
                    </div>
                    <div>
                      <strong>Méthodes de paiement :</strong> Virement, PayPal
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OpportunityDetail;