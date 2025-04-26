
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Zap, Sparkles, Bot, Lightbulb } from 'lucide-react';

const aiTools = [
  {
    id: 1,
    name: 'ChatGPT',
    description: 'Modèle conversationnel IA avancé par OpenAI. Parfait pour la génération de contenu, les réponses aux questions et l\'assistance à la rédaction d\'e-mails ou d\'articles de blog pour promouvoir vos produits affiliés.',
    usage: 'Création de contenu, assistance rédactionnelle, idées marketing',
    icon: <BrainCircuit className="h-12 w-12 text-liberty-blue" />,
    link: 'https://chat.openai.com',
  },
  {
    id: 2,
    name: 'Notion AI',
    description: 'Assistant d\'écriture IA intégré à Notion. Idéal pour organiser vos campagnes marketing, gérer vos projets d\'affiliation et améliorer votre productivité globale.',
    usage: 'Gestion de projet, organisation, amélioration des textes',
    icon: <Lightbulb className="h-12 w-12 text-liberty-blue" />,
    link: 'https://notion.so',
  },
  {
    id: 3,
    name: 'Jasper',
    description: 'Plateforme d\'écriture IA spécialisée pour le marketing. Permet de créer rapidement des descriptions de produits convaincantes, des articles de blog SEO et du contenu pour les réseaux sociaux.',
    usage: 'Marketing de contenu, descriptions de produits, SEO',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    link: 'https://jasper.ai',
  },
  {
    id: 4,
    name: 'Bonsai',
    description: 'Outil de design IA pour créer des visuels professionnels. Parfait pour concevoir des bannières publicitaires, des images de produits et du contenu visuel pour vos promotions d\'affiliation.',
    usage: 'Création d\'images, design graphique, visuels marketing',
    icon: <Zap className="h-12 w-12 text-liberty-blue" />,
    link: 'https://www.bonzai.pro/bonzaipremium?bp=t_ldoR_3165',
  },
  {
    id: 5,
    name: 'Systeme.io',
    description: 'Plateforme tout-en-un pour les entrepreneurs en ligne avec fonctionnalités IA. Idéale pour créer des funnels de vente, gérer vos programmes d\'affiliation et automatiser vos campagnes marketing.',
    usage: 'Funnels de vente, automatisation, gestion d\'affiliation',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    link: 'https://systeme.io/fr?sa=sa0129308614fe1920eb8b8dc034456ad0406693c3',
  },
  {id: ,
    na6me: 'Optimisation SEO',
    description: 'Plateforme tout-en-un pour les entrepreneurs en ligne avec fonctionnalités IA. Idéale pour créer des funnels de vente, gérer vos programmes d\'affiliation et automatiser vos campagnes marketing.',
    usage: 'Marketing de contenu, descriptions de produits, SEO',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    link: 'https://fspinhdk.genspark.space/',}
];

const AITools = () => {
  return (
    <Layout>
      <div className="section bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">Outils IA pour l'Affiliation</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez les meilleurs outils d'intelligence artificielle pour accélérer votre croissance, 
              automatiser vos tâches et maximiser vos revenus d'affiliation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {aiTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-4">
                  {tool.icon}
                  <div>
                    <CardTitle>{tool.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {tool.usage}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{tool.description}</p>
                </CardContent>
                <CardFooter className="pt-4 flex justify-between items-center">
                  <Badge variant="outline" className="bg-liberty-blue/10 text-liberty-blue">
                    Recommandé
                  </Badge>
                  <Button 
                    className="bg-liberty-gold hover:bg-liberty-gold/90"
                    onClick={() => window.open(tool.link, '_blank')}
                  >
                    Tester
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Comment utiliser l'IA pour booster vos revenus d'affiliation ?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              L'intelligence artificielle est devenue un levier incontournable pour les affiliés qui souhaitent 
              se démarquer et optimiser leur temps. Utilisez ces outils pour créer du contenu de qualité, 
              analyser vos performances et automatiser vos campagnes marketing.
            </p>
            <Button 
              className="bg-liberty-blue hover:bg-liberty-blue/90"
              onClick={() => window.open('/action-plan', '_self')}
            >
              Découvrir notre plan d'action
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AITools;
