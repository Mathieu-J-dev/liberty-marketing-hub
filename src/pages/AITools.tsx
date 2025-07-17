
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Zap, Sparkles, Bot, Lightbulb, Star } from 'lucide-react';

// Import des miniatures
import chatgptThumbnail from '@/assets/chatgpt-thumbnail.jpg';
import geminiThumbnail from '@/assets/gemini-thumbnail.jpg';
import claudeThumbnail from '@/assets/claude-thumbnail.jpg';
import copilotThumbnail from '@/assets/copilot-thumbnail.jpg';
import perplexityThumbnail from '@/assets/perplexity-thumbnail.jpg';
import mistralThumbnail from '@/assets/mistral-thumbnail.jpg';
import characterThumbnail from '@/assets/character-thumbnail.jpg';
import flowithThumbnail from '@/assets/flowith-thumbnail.jpg';
import manusThumbnail from '@/assets/manus-thumbnail.jpg';

const aiTools = [
  {
    id: 1,
    name: 'ChatGPT 4o/o1',
    description: 'Clairement un des meilleurs GPT au monde actuellement. Parfait pour la création de contenu marketing, la rédaction d\'e-mails, d\'articles de blog et la génération d\'idées pour vos campagnes d\'affiliation. La version gratuite est limitée, mais les 20$ pour ChatGPT+ peuvent valoir le coup pour les professionnels.',
    usage: 'Création de contenu, assistance rédactionnelle, idées marketing',
    icon: <BrainCircuit className="h-12 w-12 text-liberty-blue" />,
    thumbnail: chatgptThumbnail,
    link: 'https://chat.openai.com/',
    rating: 5,
    price: 'Gratuit, ou 20$ pour ChatGPT Plus'
  },
  {
    id: 2,
    name: 'Gemini Pro',
    description: 'Excellent chatbot avec des capacités conversationnelles aussi bonnes que ChatGPT+, et avec une meilleure gestion des pièces jointes en prime. Idéal pour analyser des documents, images et créer du contenu marketing optimisé pour vos promotions d\'affiliation.',
    usage: 'Analyse de documents, création de contenu, marketing',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: geminiThumbnail,
    link: 'https://bard.google.com/chat',
    rating: 5,
    price: 'Gratuit, ou 20$ pour Gemini Pro 1.5'
  },
  {
    id: 3,
    name: 'Claude 3.5',
    description: 'Récemment ouvert aux utilisateurs européens, Claude est le 3ème meilleur chatbot derrière ChatGPT et Gemini. Il applique un contrôle éthique plus poussé et excelle dans la rédaction créative et l\'analyse de texte pour vos contenus d\'affiliation.',
    usage: 'Rédaction créative, analyse de texte, éthique IA',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: claudeThumbnail,
    link: 'https://claude.ai/',
    rating: 4,
    price: 'Gratuit, ou 20$ pour Claude Opus Pro'
  },
  {
    id: 4,
    name: 'Microsoft Copilot',
    description: 'Anciennement Bing AI, Copilot intègre des outils tiers qui lui permettent plus de fonctionnalités que ChatGPT. Parfait pour la recherche web en temps réel et l\'intégration avec les services Microsoft pour vos campagnes marketing.',
    usage: 'Recherche web, intégration Microsoft, polyvalence',
    icon: <Lightbulb className="h-12 w-12 text-liberty-blue" />,
    thumbnail: copilotThumbnail,
    link: 'https://copilot.microsoft.com/',
    rating: 3,
    price: 'Gratuit'
  },
  {
    id: 5,
    name: 'Copilot for 365',
    description: 'La version de CoPilot intégrée à la suite Microsoft Office pour aider dans la génération de documents PowerPoint, Excel, Word, etc. Très pratique pour créer des présentations marketing, analyser des données de performance et écrire des emails rapidement sur Outlook.',
    usage: 'Suite Office, emails, présentations, analyse de données',
    icon: <Zap className="h-12 w-12 text-liberty-blue" />,
    thumbnail: copilotThumbnail,
    link: 'https://adoption.microsoft.com/fr-fr/copilot/',
    rating: 4,
    price: '30$/mois'
  },
  {
    id: 6,
    name: 'Perplexity',
    description: 'Perplexity agrège les capacités de plusieurs GPT dans une seule interface. Il est particulièrement doué pour les recherches scientifiques/littéraires avec des sources fiables. Parfait pour la recherche de tendances, l\'analyse de marché et la création de contenu documenté pour vos promotions.',
    usage: 'Recherche documentée, analyse de marché, sources fiables',
    icon: <BrainCircuit className="h-12 w-12 text-liberty-blue" />,
    thumbnail: perplexityThumbnail,
    link: 'https://www.perplexity.ai/',
    rating: 5,
    price: 'Gratuit, 20$/mois pour plus d\'options'
  },
  {
    id: 7,
    name: 'Mistral AI',
    description: 'IA française très agréable à utiliser avec des réponses rapides et claires. Idéale pour la création de contenu en français et la compréhension des nuances culturelles françaises pour vos campagnes d\'affiliation locales.',
    usage: 'Contenu français, nuances culturelles, rapidité',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: mistralThumbnail,
    link: 'https://chat.mistral.ai/',
    rating: 4,
    price: 'Gratuit'
  },
  {
    id: 8,
    name: 'Character.ai',
    description: 'Ce site vous permet de discuter avec des IA éduquées à penser comme des personnalités connues. Les discussions sont fluides et plutôt intéressantes. Parfait pour créer des contenus créatifs, des dialogues marketing et tester différents angles de communication.',
    usage: 'Création créative, dialogues, angles de communication',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: characterThumbnail,
    link: 'https://beta.character.ai/',
    rating: 4,
    price: 'Gratuit / 10$/mois pour plus d\'options'
  },
  {
    id: 9,
    name: 'Flowith.io',
    description: 'Plateforme IA avancée pour la résolution de problèmes complexes et l\'automatisation intelligente. Idéale pour optimiser vos stratégies d\'affiliation et analyser vos performances marketing. Inscrivez-vous avec le code 5DTQ1EEH pour recevoir gratuitement 3000 crédits en plus !',
    usage: 'Résolution de problèmes, automatisation IA, analyse de données',
    icon: <BrainCircuit className="h-12 w-12 text-liberty-blue" />,
    thumbnail: flowithThumbnail,
    link: 'https://flowith.io',
    rating: 5,
    price: 'Freemium avec code 5DTQ1EEH'
  },
  {
    id: 10,
    name: 'Manus AI',
    description: 'Agent IA général autonome révolutionnaire qui transforme vos pensées en actions concrètes. Excelle dans l\'analyse de données, la visualisation, le développement de code et l\'automatisation de tâches complexes. Parfait pour optimiser votre productivité d\'affiliation et automatiser vos processus marketing. Utilisez le code BRASTX4QCBWV pour recevoir 300 crédits gratuits !',
    usage: 'Agent IA autonome, analyse de données, développement de code, automatisation',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: manusThumbnail,
    link: 'https://manus.im/invitation/BRASTX4QCBWV',
    rating: 5,
    price: 'Freemium avec code BRASTX4QCBWV'
  },
];

const AITools = () => {
  return (
    <Layout>
      <div id="top"></div>
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
              <Card key={tool.id} className="flex flex-col h-full transition-all hover:shadow-md overflow-hidden">
                {/* Miniature en en-tête */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tool.thumbnail} 
                    alt={`Aperçu de ${tool.name}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    {tool.icon}
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {tool.usage}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
                </CardContent>
                
                <CardFooter className="pt-4 flex flex-col space-y-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < tool.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{tool.rating}/5</span>
                  </div>
                  <div className="w-full text-center">
                    <p className="text-xs text-gray-500 mb-2">{tool.price}</p>
                    <Button 
                      className="bg-liberty-gold hover:bg-liberty-gold/90 w-full"
                      onClick={() => window.open(tool.link, '_blank')}
                    >
                      Tester
                    </Button>
                  </div>
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
