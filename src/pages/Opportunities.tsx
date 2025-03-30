
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Filter, Star, DollarSign, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const opportunities = [
  {
    id: 1,
    title: 'Marketing Automation Pro',
    category: 'Marketing',
    rating: 4.9,
    commission: 'Jusqu\'à 40%',
    recurring: true,
    earnings: '€200-500/client',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Plateforme leader d\'automatisation du marketing avec commissions récurrentes. Idéal pour les clients B2B.'
  },
  {
    id: 2,
    title: 'Finance Intelligence Suite',
    category: 'Finance',
    rating: 4.7,
    commission: 'Jusqu\'à 35%',
    recurring: true,
    earnings: '€150-400/client',
    image: 'https://images.unsplash.com/photo-1565514501974-5ed5210d39f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Outils de gestion financière et d\'investissement. Très demandé par les professionnels et particuliers.'
  },
  {
    id: 3,
    title: 'E-commerce Empire Builder',
    category: 'E-commerce',
    rating: 4.8,
    commission: 'Jusqu\'à 45%',
    recurring: false,
    earnings: '€300-800/vente',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Solution complète de création et gestion de boutiques en ligne. Formation incluse pour vos clients.'
  },
  {
    id: 4,
    title: 'Health & Wellness Program',
    category: 'Santé',
    rating: 4.6,
    commission: 'Jusqu\'à 30%',
    recurring: true,
    earnings: '€80-250/client',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Programme de bien-être et de santé avec abonnement mensuel. Marché en forte croissance.'
  },
  {
    id: 5,
    title: 'Learning Management System',
    category: 'Éducation',
    rating: 4.8,
    commission: 'Jusqu\'à 50%',
    recurring: true,
    earnings: '€100-350/client',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Plateforme LMS complète pour créateurs de contenu éducatif. Idéal pour coaches et formateurs.'
  },
  {
    id: 6,
    title: 'AI Content Creation Suite',
    category: 'IA & Tech',
    rating: 4.9,
    commission: 'Jusqu\'à 40%',
    recurring: true,
    earnings: '€150-450/client',
    image: 'https://images.unsplash.com/photo-1677442135072-d38be748a860?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    description: 'Outils d\'IA pour création de contenu marketing. Solution innovante à forte demande en 2025.'
  }
];

const Opportunities = () => {
  return (
    <Layout>
      <div className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Opportunités d'Affiliation Premium</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection des programmes d'affiliation les plus rentables de 2025, vérifiés et approuvés par notre équipe d'experts.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <span className="text-sm text-gray-500">Affichage de {opportunities.length} opportunités</span>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrer les opportunités
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full relative overflow-hidden">
                  <img 
                    src={opportunity.image} 
                    alt={opportunity.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
                    {opportunity.category}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle>{opportunity.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <div className="flex items-center mr-2">
                      <Star className="h-4 w-4 text-liberty-gold mr-1 fill-liberty-gold" />
                      <span>{opportunity.rating}/5</span>
                    </div>
                    <span className="text-sm text-gray-500">• Programme vérifié</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-liberty-blue mr-1" />
                      <span className="text-sm">{opportunity.commission}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-liberty-gold mr-1" />
                      <span className="text-sm">{opportunity.earnings}</span>
                    </div>
                    <div className="flex items-center">
                      {opportunity.recurring ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-500">Récurrent</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-500">One-time</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full bg-liberty-blue hover:bg-liberty-blue/90 text-white">
                    Voir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/capture">
              <Button className="bg-liberty-gold hover:bg-liberty-gold/90 text-white px-8 py-6 text-lg">
                Débloquer Toutes Les Opportunités
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Opportunities;
