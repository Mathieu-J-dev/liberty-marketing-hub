import React from 'react';
import Layout from '@/components/layout/Layout';
import { Play, Clock, BookOpen, Star, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import resourcesHero from '@/assets/resources-hero.jpg';

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
              Ressources Affi-Liberty
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre bibliothèque complète de ressources pour réussir dans le marketing d'affiliation et développer votre business en ligne.
            </p>
          </div>

          {/* Section Ressources mise en évidence */}
          <div className="bg-gradient-to-br from-liberty-blue/5 to-liberty-gold/5 rounded-2xl p-8 mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-liberty-blue">
                  Toutes nos ressources à votre disposition
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-liberty-gold mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold">Tutoriels vidéo exclusifs</h3>
                      <p className="text-muted-foreground">Plus de 50 heures de contenu premium</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-liberty-gold mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold">Guides PDF téléchargeables</h3>
                      <p className="text-muted-foreground">Documents pratiques et check-lists</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-liberty-gold mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold">Templates et outils</h3>
                      <p className="text-muted-foreground">Modèles prêts à utiliser pour vos campagnes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-liberty-gold mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold">Études de cas détaillées</h3>
                      <p className="text-muted-foreground">Analyses de campagnes réussies</p>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="mt-6">
                  Accéder aux ressources
                </Button>
              </div>
              <div className="lg:text-right">
                <img 
                  src={resourcesHero} 
                  alt="Ressources Affi-Liberty" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
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
        </div>
      </div>

      {/* Section Plan d'action déplacée en pied de page */}
      <div className="bg-muted py-16">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Target className="text-liberty-gold mr-3" size={32} />
              <h2 className="text-3xl font-bold">Votre Plan d'Action Personnalisé</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Suivez votre progression et atteignez vos objectifs avec notre plan d'action étape par étape.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-liberty-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-liberty-blue">1</span>
              </div>
              <h3 className="font-bold mb-2">Évaluation</h3>
              <p className="text-muted-foreground">Analysez votre situation actuelle et définissez vos objectifs</p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-liberty-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-liberty-blue">2</span>
              </div>
              <h3 className="font-bold mb-2">Formation</h3>
              <p className="text-muted-foreground">Suivez nos tutoriels et formations adaptés à votre niveau</p>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-12 h-12 bg-liberty-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-liberty-blue">3</span>
              </div>
              <h3 className="font-bold mb-2">Action</h3>
              <p className="text-muted-foreground">Mettez en pratique et lancez vos premières campagnes</p>
            </Card>
          </div>
          
          <div className="text-center">
            <Button size="lg">
              Commencer mon plan d'action
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tutorials;