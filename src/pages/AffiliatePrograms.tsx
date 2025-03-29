
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link, ExternalLink, Tag, Percent } from 'lucide-react';

// Data for affiliate programs
const affiliatePrograms = [
  {
    id: 1,
    name: 'Marketing Pro Suite',
    commission: '35%',
    category: 'Marketing',
    link: 'https://example.com/aff/1234',
    description: 'Plateforme complète d\'outils de marketing digital pour entrepreneurs.'
  },
  {
    id: 2,
    name: 'Finance Master',
    commission: '25%',
    category: 'Finance',
    link: 'https://example.com/aff/5678',
    description: 'Solutions de gestion financière pour particuliers et professionnels.'
  },
  {
    id: 3,
    name: 'E-commerce Builder',
    commission: '40%',
    category: 'E-commerce',
    link: 'https://example.com/aff/9012',
    description: 'Plateforme de création de boutiques en ligne tout-en-un.'
  },
  {
    id: 4,
    name: 'SEO Optimizer',
    commission: '30%',
    category: 'SEO',
    link: 'https://example.com/aff/3456',
    description: 'Outils d\'optimisation SEO pour sites web et contenus.'
  },
  {
    id: 5,
    name: 'Wellness Program',
    commission: '20%',
    category: 'Santé',
    link: 'https://example.com/aff/7890',
    description: 'Programme de bien-être et santé pour un mode de vie équilibré.'
  },
  {
    id: 6,
    name: 'Social Media Dashboard',
    commission: '45%',
    category: 'Médias Sociaux',
    link: 'https://example.com/aff/1357',
    description: 'Gestion et analyse de médias sociaux pour entrepreneurs et influenceurs.'
  },
  {
    id: 7,
    name: 'AI Content Creator',
    commission: '50%',
    category: 'IA',
    link: 'https://example.com/aff/2468',
    description: 'Création de contenu optimisé par intelligence artificielle.'
  },
  {
    id: 8,
    name: 'Learning Platform',
    commission: '30%',
    category: 'Éducation',
    link: 'https://example.com/aff/3690',
    description: 'Plateforme éducative pour cours en ligne et formations.'
  }
];

const AffiliatePrograms = () => {
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

          <div className="mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Vue d'ensemble des programmes</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom du programme</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliatePrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-100">
                          {program.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{program.commission}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="text-liberty-blue border-liberty-blue hover:bg-liberty-blue hover:text-white">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affiliatePrograms.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{program.name}</CardTitle>
                    <Badge className="bg-liberty-blue text-white">
                      {program.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 text-liberty-gold mr-1" />
                      <span className="text-sm font-medium">Commission: {program.commission}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Link className="h-4 w-4 text-liberty-blue mr-1" />
                      <span className="text-sm font-medium">Lien affilié disponible</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button className="w-full bg-liberty-gold hover:bg-liberty-gold/90 text-white">
                    Je m'inscris
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AffiliatePrograms;
