
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Zap, Sparkles, Bot, Lightbulb, Star } from 'lucide-react';
import AIToolsFilters from '@/components/tools/AIToolsFilters';

// Import des miniatures
import chatgptThumbnail from '@/assets/chatgpt-thumbnail.jpg';
import geminiThumbnail from '@/assets/gemini-thumbnail.jpg';
import claudeThumbnail from '@/assets/claude-thumbnail.jpg';
import copilotThumbnail from '@/assets/copilot-thumbnail.jpg';
import perplexityThumbnail from '@/assets/perplexity-thumbnail.jpg';
import mistralThumbnail from '@/assets/mistral-thumbnail.jpg';
import characterThumbnail from '@/assets/character-thumbnail.jpg';
import flowithThumbnail from '@/assets/flowith-thumbnail.jpg';
import dalleThumbnail from '@/assets/dalle-thumbnail.jpg';
import midjourneyThumbnail from '@/assets/midjourney-thumbnail.jpg';
import runwayThumbnail from '@/assets/runway-thumbnail.jpg';
import fireflyThumbnail from '@/assets/firefly-thumbnail.jpg';
import leonardoThumbnail from '@/assets/leonardo-thumbnail.jpg';
import klingThumbnail from '@/assets/kling-thumbnail.jpg';
import ideogramThumbnail from '@/assets/ideogram-thumbnail.jpg';
import nightcafeThumbnail from '@/assets/nightcafe-thumbnail.jpg';
import stableDiffusionThumbnail from '@/assets/stablediffusion-thumbnail.jpg';
import blueWillowThumbnail from '@/assets/bluewillow-thumbnail.jpg';
import msDesignerThumbnail from '@/assets/msdesigner-thumbnail.jpg';
import pikaThumbnail from '@/assets/pika-thumbnail.jpg';
import minimaxThumbnail from '@/assets/minimax-thumbnail.jpg';
import pictoryThumbnail from '@/assets/pictory-thumbnail.jpg';
import invideoThumbnail from '@/assets/invideo-thumbnail.jpg';

const aiTools = [
  // Image Generation Tools
  {
    id: 1,
    name: 'ChatGPT 4o/o1',
    description: 'Clairement un des meilleurs GPT au monde actuellement. Parfait pour la création de contenu marketing, la rédaction d\'e-mails, d\'articles de blog et la génération d\'idées pour vos campagnes d\'affiliation. La version gratuite est limitée, mais les 20$ pour ChatGPT+ peuvent valoir le coup pour les professionnels.',
    usage: 'Création de contenu, assistance rédactionnelle, idées marketing',
    icon: <BrainCircuit className="h-12 w-12 text-liberty-blue" />,
    thumbnail: chatgptThumbnail,
    link: 'https://chat.openai.com/',
    rating: 5,
    price: 'Gratuit, ou 20$ pour ChatGPT Plus',
    category: 'ChatBot'
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
    price: 'Gratuit, ou 20$ pour Gemini Pro 1.5',
    category: 'ChatBot'
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
    price: 'Gratuit, ou 20$ pour Claude Opus Pro',
    category: 'ChatBot'
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
    price: 'Gratuit',
    category: 'ChatBot'
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
    price: '30$/mois',
    category: 'ChatBot'
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
    price: 'Gratuit, 20$/mois pour plus d\'options',
    category: 'ChatBot'
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
    price: 'Gratuit',
    category: 'ChatBot'
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
    price: 'Gratuit / 10$/mois pour plus d\'options',
    category: 'ChatBot'
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
    price: 'Freemium avec code 5DTQ1EEH',
    category: 'Automatisation'
  },
  {
    id: 11,
    name: 'DALL-E',
    description: 'Bonne IA pour la génération d\'images, particulièrement performante pour les images contenant du texte. On peut presque tout faire avec DALL-E, même si les résultats manquent parfois d\'âme comparé à MidJourney.',
    usage: 'Génération d\'images, illustrations, logos',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: dalleThumbnail,
    link: 'https://openai.com/dall-e-3',
    rating: 3,
    price: 'Inclus à ChatGPT+ (20$/mois)',
    category: 'Génération d\'images'
  },
  {
    id: 12,
    name: 'MidJourney',
    description: 'L\'outil de référence pour la génération d\'images. Les résultats sont beaux, élégants et fins. Aucun autre outil n\'a cette qualité artistique dans les images générées. Il faut noter que l\'utilisation se fait via Discord.',
    usage: 'Art digital, illustrations créatives, design',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: midjourneyThumbnail,
    link: 'https://discord.com/invite/midjourney',
    rating: 5,
    price: 'Essai gratuit, puis 10$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 13,
    name: 'Adobe Firefly',
    description: 'Un outil très efficace pour la création d\'images réalistes, particulièrement les visages et les paysages. Moins performant pour les illustrations artistiques mais excellent pour le contenu réaliste.',
    usage: 'Images réalistes, retouche photo, design commercial',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: fireflyThumbnail,
    link: 'https://www.adobe.com/ch_fr/products/firefly.html',
    rating: 4,
    price: 'Essai gratuit, puis 5-10$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 14,
    name: 'Leonardo AI',
    description: 'Un outil prometteur qui se distingue par sa fonction de dessin en live améliorée par IA. Bien qu\'il ne soit pas encore au niveau de MidJourney pour la génération pure, ses fonctionnalités innovantes en font un choix intéressant.',
    usage: 'Dessin assisté par IA, génération d\'images, édition',
    icon: <BrainCircuit className="h-12 w-12 text-liberty-blue" />,
    thumbnail: leonardoThumbnail,
    link: 'https://leonardo.ai/',
    rating: 5,
    price: 'Essai gratuit, puis 10$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 15,
    name: 'Runway',
    description: 'Leader actuel de la génération de vidéos par IA, même si la technologie est encore en développement. Les résultats sont prometteurs et l\'interface est intuitive.',
    usage: 'Génération et édition de vidéos, effets spéciaux',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: runwayThumbnail,
    link: 'https://runwayml.com/',
    rating: 4,
    price: 'Essai gratuit, puis 12$/mois',
    category: 'Génération de vidéos'
  },
  {
    id: 16,
    name: 'Kling',
    description: 'Un concurrent sérieux de Runway dans le domaine de la génération de vidéos par IA. Les performances sont similaires et le choix entre les deux dépendra souvent du type de rendu souhaité.',
    usage: 'Création de vidéos IA, animation, effets visuels',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: klingThumbnail,
    link: 'https://klingai.com/',
    rating: 4,
    price: 'Essai gratuit, puis 10-30$/mois',
    category: 'Génération de vidéos'
  },
  {
    id: 17,
    name: 'Ideogram',
    description: 'Facile à utiliser et excellent niveau de génération d\'images. Si vous trouvez MidJourney et Leonardo trop complexes, Ideogram est une excellente alternative plus accessible.',
    usage: 'Génération d\'images simple, illustrations',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: ideogramThumbnail,
    link: 'https://ideogram.ai/login',
    rating: 4,
    price: 'Essai gratuit, puis 8$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 18,
    name: 'NightCafe',
    description: 'Version moins performante de MidJourney aux mêmes conditions tarifaires. Les résultats sont corrects mais manquent de finesse comparé à la concurrence.',
    usage: 'Génération d\'images artistiques',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: nightcafeThumbnail,
    link: 'https://creator.nightcafe.studio/',
    rating: 2,
    price: 'Essai gratuit, puis 5-10$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 19,
    name: 'Stable Diffusion',
    description: 'Plus ouvert et paramétrable que ses concurrents, mais également plus complexe à utiliser. Les résultats sont similaires à MidJourney mais demandent plus d\'expertise technique.',
    usage: 'Génération d\'images avancée, personnalisation',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: stableDiffusionThumbnail,
    link: 'https://stability.ai/',
    rating: 3,
    price: 'Gratuit',
    category: 'Génération d\'images'
  },
  {
    id: 20,
    name: 'BlueWillow',
    description: 'Un outil de génération d\'images basique qui peine à se démarquer face à la concurrence. Les résultats manquent souvent de qualité et d\'originalité.',
    usage: 'Génération d\'images simple',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: blueWillowThumbnail,
    link: 'https://www.bluewillow.ai/',
    rating: 2,
    price: 'Essai gratuit, puis 5-10$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 21,
    name: 'Microsoft Designer',
    description: 'Outil gratuit pour créer des images et des présentations, mais les résultats manquent de modernité. Préférez MidJourney pour les images ou Gamma pour les présentations.',
    usage: 'Design simple, présentations basiques',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: msDesignerThumbnail,
    link: 'https://designer.microsoft.com/',
    rating: 2,
    price: 'Gratuit',
    category: 'Génération d\'images'
  },
  {
    id: 22,
    name: 'Pika Labs',
    description: 'Les vidéos générées à partir de texte sont moyennes, mais l\'outil se distingue par sa capacité à animer des images statiques de manière intéressante.',
    usage: 'Animation d\'images, vidéos basiques',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: pikaThumbnail,
    link: 'https://pika.art/',
    rating: 3,
    price: 'Essai gratuit, puis 8$/mois',
    category: 'Génération de vidéos'
  },
  {
    id: 23,
    name: 'Minimax',
    description: 'Un autre concurrent chinois prometteur dans la génération de vidéos par IA, complétant le trio de tête avec Runway et Kling. Chacun a ses points forts selon le type de contenu souhaité.',
    usage: 'Création de vidéos IA, effets spéciaux',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: minimaxThumbnail,
    link: 'https://hailuoai.video/create',
    rating: 4,
    price: 'Essai gratuit, puis 15$/mois',
    category: 'Génération de vidéos'
  },
  {
    id: 24,
    name: 'Pictory',
    description: 'Un outil qui tente de combiner génération de vidéo, texte et voix, mais avec des résultats moyens dans chaque domaine. Le rendu final manque souvent d\'authenticité.',
    usage: 'Création de contenu multimédia',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: pictoryThumbnail,
    link: 'https://pictory.ai/',
    rating: 2,
    price: 'Essai gratuit puis 19$/mois',
    category: 'Génération de vidéos'
  },
  {
    id: 25,
    name: 'InVideo',
    description: 'Similaire à Pictory avec des résultats légèrement meilleurs, mais qui restent en deçà des attentes pour le prix demandé. L\'aspect artificiel des contenus générés est trop visible.',
    usage: 'Édition vidéo assistée par IA',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: invideoThumbnail,
    link: 'https://invideo.io/',
    rating: 2,
    price: 'Essai gratuit puis 20$/mois',
    category: 'Génération de vidéos'
  }
];

const AITools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);

  // Extraire les catégories uniques
  const categories = [...new Set(aiTools.map(tool => tool.category))];

  // Filtrer les outils selon les critères
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.usage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ? true : tool.category === selectedCategory;
    const matchesRating = selectedRating === 0 ? true : tool.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesRating;
  });

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedRating(0);
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'all' || selectedRating !== 0;

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

          <AIToolsFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            categories={categories}
            count={filteredTools.length}
            onResetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredTools.map((tool) => (
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
