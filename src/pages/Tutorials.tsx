import React from 'react';
import Layout from '@/components/layout/Layout';
import { Play, Clock, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Tutorials = () => {
  const tutorialCategories = [
    {
      id: 1,
      title: "Affiliation Marketing",
      description: "Apprenez les bases et techniques avancées de l'affiliation",
      tutorials: [
        {
          id: 1,
          title: "Comment choisir sa première niche rentable",
          duration: "12 min",
          level: "Débutant",
          rating: 4.8,
          thumbnail: "/placeholder.svg"
        },
        {
          id: 2,
          title: "Créer sa première campagne d'affiliation",
          duration: "18 min",
          level: "Débutant",
          rating: 4.9,
          thumbnail: "/placeholder.svg"
        }
      ]
    },
    {
      id: 2,
      title: "Intelligence Artificielle",
      description: "Utilisez l'IA pour automatiser votre business",
      tutorials: [
        {
          id: 3,
          title: "ChatGPT pour créer du contenu marketing",
          duration: "15 min",
          level: "Intermédiaire",
          rating: 4.7,
          thumbnail: "/placeholder.svg"
        },
        {
          id: 4,
          title: "Automatiser ses posts sur les réseaux sociaux",
          duration: "22 min",
          level: "Avancé",
          rating: 4.8,
          thumbnail: "/placeholder.svg"
        }
      ]
    },
    {
      id: 3,
      title: "Conversion & Optimisation",
      description: "Maximisez vos taux de conversion",
      tutorials: [
        {
          id: 5,
          title: "Optimiser ses pages de capture",
          duration: "16 min",
          level: "Intermédiaire",
          rating: 4.9,
          thumbnail: "/placeholder.svg"
        }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="section py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              Tutoriels Affi-Liberty
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Apprenez étape par étape avec nos tutoriels vidéo pratiques. De débutant à expert, maîtrisez tous les aspects du marketing digital.
            </p>
          </div>

          <div className="space-y-12">
            {tutorialCategories.map((category) => (
              <div key={category.id}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tutorials.map((tutorial) => (
                    <Card key={tutorial.id} className="group hover:shadow-lg transition-all">
                      <div className="relative">
                        <img 
                          src={tutorial.thumbnail} 
                          alt={tutorial.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg">
                          <Button size="lg" className="rounded-full">
                            <Play className="mr-2" size={20} />
                            Regarder
                          </Button>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-black/70">
                          <Clock size={12} className="mr-1" />
                          {tutorial.duration}
                        </Badge>
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getLevelColor(tutorial.level)}>
                            <BookOpen size={12} className="mr-1" />
                            {tutorial.level}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{tutorial.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2">{tutorial.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-muted rounded-lg">
            <h3 className="text-xl font-bold mb-4">Accès complet aux tutoriels</h3>
            <p className="text-muted-foreground mb-6">
              Rejoignez notre espace membre pour accéder à tous les tutoriels exclusifs et aux formations complètes.
            </p>
            <Button size="lg">
              Devenir membre
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tutorials;