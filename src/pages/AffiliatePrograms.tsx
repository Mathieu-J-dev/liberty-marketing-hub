
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, ExternalLink, Tag, Percent, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Data for affiliate programs
const affiliatePrograms = [
  {
    id: 1,
    name: 'Marketing Pro Suite',
    commission: '35%',
    category: 'Marketing',
    link: 'https://example.com/aff/1234',
    description: 'Plateforme complète d\'outils de marketing digital pour entrepreneurs.',
    rating: 4.8,
    recurring: true,
    earnings: '€180-350/mois'
  },
  {
    id: 2,
    name: 'Finance Master',
    commission: '25%',
    category: 'Finance',
    link: 'https://example.com/aff/5678',
    description: 'Solutions de gestion financière pour particuliers et professionnels.',
    rating: 4.6,
    recurring: true,
    earnings: '€100-250/mois'
  },
  {
    id: 3,
    name: 'E-commerce Builder',
    commission: '40%',
    category: 'E-commerce',
    link: 'https://example.com/aff/9012',
    description: 'Plateforme de création de boutiques en ligne tout-en-un.',
    rating: 4.9,
    recurring: false,
    earnings: '€200-450/vente'
  },
  {
    id: 4,
    name: 'SEO Optimizer',
    commission: '30%',
    category: 'SEO',
    link: 'https://example.com/aff/3456',
    description: 'Outils d\'optimisation SEO pour sites web et contenus.',
    rating: 4.7,
    recurring: true,
    earnings: '€120-300/mois'
  },
  {
    id: 5,
    name: 'Wellness Program',
    commission: '20%',
    category: 'Santé',
    link: 'https://example.com/aff/7890',
    description: 'Programme de bien-être et santé pour un mode de vie équilibré.',
    rating: 4.5,
    recurring: true,
    earnings: '€50-150/mois'
  },
  {
    id: 6,
    name: 'Social Media Dashboard',
    commission: '45%',
    category: 'Médias Sociaux',
    link: 'https://example.com/aff/1357',
    description: 'Gestion et analyse de médias sociaux pour entrepreneurs et influenceurs.',
    rating: 4.8,
    recurring: true,
    earnings: '€150-400/mois'
  },
  {
    id: 7,
    name: 'AI Content Creator',
    commission: '50%',
    category: 'IA',
    link: 'https://example.com/aff/2468',
    description: 'Création de contenu optimisé par intelligence artificielle.',
    rating: 4.9,
    recurring: true,
    earnings: '€200-500/mois'
  },
  {
    id: 8,
    name: 'Learning Platform',
    commission: '30%',
    category: 'Éducation',
    link: 'https://example.com/aff/3690',
    description: 'Plateforme éducative pour cours en ligne et formations.',
    rating: 4.7,
    recurring: false,
    earnings: '€150-350/vente'
  },
  {
    id: 9,
    name: 'Amazon Affiliation Plus',
    commission: '6-12%',
    category: 'E-commerce',
    link: 'https://example.com/aff/amazon-plus',
    description: 'Programme d\'affiliation Amazon optimisé avec outils et formations exclusives.',
    rating: 4.6,
    recurring: false,
    earnings: '€5-500/vente'
  },
  {
    id: 10,
    name: 'Crypto Trading Academy',
    commission: '45%',
    category: 'Finance',
    link: 'https://example.com/aff/crypto-academy',
    description: 'Formation complète sur le trading de cryptomonnaies pour débutants et avancés.',
    rating: 4.8,
    recurring: false,
    earnings: '€200-600/vente'
  },
  {
    id: 11,
    name: 'Lifestyle Photography Course',
    commission: '40%',
    category: 'Art & Création',
    link: 'https://example.com/aff/photography',
    description: 'Cours premium de photographie lifestyle pour créateurs de contenu.',
    rating: 4.7,
    recurring: false,
    earnings: '€100-250/vente'
  },
  {
    id: 12,
    name: 'SaaS Business Suite',
    commission: '25%',
    category: 'Business',
    link: 'https://example.com/aff/saas-suite',
    description: 'Ensemble d\'outils SaaS pour la gestion d\'entreprise et l\'automatisation.',
    rating: 4.8,
    recurring: true,
    earnings: '€75-300/mois'
  }
];

const categories = [...new Set(affiliatePrograms.map(program => program.category))];

const AffiliatePrograms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);
  
  // Filter programs based on search, category and recurring filter
  const filteredPrograms = affiliatePrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? program.category === selectedCategory : true;
    const matchesRecurring = showRecurringOnly ? program.recurring : true;
    
    return matchesSearch && matchesCategory && matchesRecurring;
  });

  return (
    <Layout>
      <section className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Programmes d'Affiliation</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de programmes d'affiliation de haute qualité avec des commissions attractives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-1">Rechercher</label>
                <Input
                  id="search"
                  placeholder="Rechercher par nom ou description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Catégorie</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className={`w-full ${showRecurringOnly ? 'bg-liberty-blue/10 border-liberty-blue' : ''}`}
                  onClick={() => setShowRecurringOnly(!showRecurringOnly)}
                >
                  {showRecurringOnly ? <CheckCircle className="h-4 w-4 mr-2" /> : null}
                  Revenus récurrents uniquement
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Affichage de {filteredPrograms.length} programmes sur {affiliatePrograms.length}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{program.name}</CardTitle>
                    <Badge className="bg-liberty-blue text-white">
                      {program.category}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(program.rating) ? 'text-liberty-gold fill-liberty-gold' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-1 text-sm">{program.rating}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 text-liberty-gold mr-2" />
                      <span className="text-sm font-medium">Commission: {program.commission}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-liberty-blue mr-2" />
                      <span className="text-sm font-medium">
                        {program.recurring ? 'Revenu récurrent' : 'Commission unique'}: {program.earnings}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Link className="h-4 w-4 text-liberty-blue mr-2" />
                      <span className="text-sm font-medium">Lien d'affiliation disponible</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <a href={program.link} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full bg-liberty-gold hover:bg-liberty-gold/90 text-white">
                      Devenir Affilié
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Aucun programme ne correspond à vos critères.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setShowRecurringOnly(false);
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AffiliatePrograms;
