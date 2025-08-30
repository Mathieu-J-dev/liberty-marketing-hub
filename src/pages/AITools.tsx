
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
import jasperThumbnail from '@/assets/jasper-thumbnail.jpg';
import copyaiThumbnail from '@/assets/copyai-thumbnail.jpg';
import elevenlabsThumbnail from '@/assets/elevenlabs-thumbnail.jpg';
import gammaThumbnail from '@/assets/gamma-thumbnail.jpg';
import lumaThumbnail from '@/assets/luma-thumbnail.jpg';
import canvaThumbnail from '@/assets/canva-thumbnail.jpg';
import craiyonThumbnail from '@/assets/craiyon-thumbnail.jpg';
import personThumbnail from '@/assets/person-thumbnail.jpg';
import mebyThumbnail from '@/assets/meby-thumbnail.jpg';
import spinsaltThumbnail from '@/assets/spinsalt-thumbnail.jpg';
import womboThumbnail from '@/assets/wombo-thumbnail.jpg';
import photosonicThumbnail from '@/assets/photosonic-thumbnail.jpg';
import playgroundThumbnail from '@/assets/playground-thumbnail.jpg';
import lexicaThumbnail from '@/assets/lexica-thumbnail.jpg';
import everypixelThumbnail from '@/assets/everypixel-thumbnail.jpg';
import rosebudThumbnail from '@/assets/rosebud-thumbnail.jpg';
import thestudioThumbnail from '@/assets/thestudio-thumbnail.jpg';
import alpacaThumbnail from '@/assets/alpaca-thumbnail.jpg';
import dreamsandsThumbnail from '@/assets/dreamsands-thumbnail.jpg';
import genieThumbnail from '@/assets/genie-thumbnail.jpg';
import quickdrawThumbnail from '@/assets/quickdraw-thumbnail.jpg';
import logojoyThumbnail from '@/assets/logojoy-thumbnail.jpg';
import lottieThumbnail from '@/assets/lottie-thumbnail.jpg';

const aiTools = [
  // Image Generation Tools
  {
    id: 1,
    name: 'ChatGPT 5',
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
    name: 'Claude 4',
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
  },
  // Nouveaux outils - Rédaction et Marketing
  {
    id: 26,
    name: 'Jasper AI',
    description: 'L\'un des outils de rédaction IA les plus avancés. Jasper excelle dans la création de contenu marketing, d\'articles de blog, de descriptions de produits et de campagnes publicitaires pour vos promotions d\'affiliation. Interface intuitive et templates prêts à l\'emploi.',
    usage: 'Rédaction marketing, copywriting, articles de blog',
    icon: <BrainCircuit className="h-12 w-12 text-liberty-blue" />,
    thumbnail: jasperThumbnail,
    link: 'https://www.jasper.ai/',
    rating: 5,
    price: '29$/mois pour le plan Creator',
    category: 'Rédaction'
  },
  {
    id: 27,
    name: 'Copy.ai',
    description: 'Alternative abordable à Jasper pour la création de contenu marketing. Excellent pour générer des accroches publicitaires, des descriptions de produits et du contenu pour les réseaux sociaux. Parfait pour débuter dans l\'IA marketing.',
    usage: 'Copywriting, contenu réseaux sociaux, descriptions produits',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: copyaiThumbnail,
    link: 'https://www.copy.ai/',
    rating: 4,
    price: 'Gratuit jusqu\'à 2000 mots/mois, puis 49$/mois',
    category: 'Rédaction'
  },
  // Nouveaux outils - Audio et Voix
  {
    id: 28,
    name: 'ElevenLabs',
    description: 'Synthèse vocale IA ultra-réaliste permettant de créer des voix off professionnelles pour vos vidéos de promotion. Clonage vocal possible et support de multiples langues. Idéal pour créer du contenu audio personnalisé pour vos campagnes d\'affiliation.',
    usage: 'Synthèse vocale, voix off, contenu audio',
    icon: <Zap className="h-12 w-12 text-liberty-blue" />,
    thumbnail: elevenlabsThumbnail,
    link: 'https://elevenlabs.io/',
    rating: 5,
    price: 'Gratuit jusqu\'à 10 000 caractères/mois, puis 5$/mois',
    category: 'Audio'
  },
  // Nouveaux outils - Présentations
  {
    id: 29,
    name: 'Gamma',
    description: 'Créateur de présentations IA révolutionnaire. Générez des présentations professionnelles en quelques minutes pour vos webinaires, formations et pitchs de vente. Alternative moderne à PowerPoint avec un design automatique élégant.',
    usage: 'Présentations, webinaires, formations, pitchs',
    icon: <Lightbulb className="h-12 w-12 text-liberty-blue" />,
    thumbnail: gammaThumbnail,
    link: 'https://gamma.app/',
    rating: 5,
    price: 'Gratuit avec limitation, puis 8$/mois',
    category: 'Présentation'
  },
  // Nouveaux outils - Vidéo 3D
  {
    id: 30,
    name: 'Luma AI',
    description: 'Outil innovant pour créer des vidéos 3D et des modèles 3D à partir de simples photos. Parfait pour créer du contenu visuel unique et engageant pour vos promotions d\'affiliation. Technologie de pointe pour des résultats impressionnants.',
    usage: 'Vidéos 3D, modélisation 3D, contenu immersif',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: lumaThumbnail,
    link: 'https://lumalabs.ai/',
    rating: 4,
    price: 'Gratuit avec limitation, puis 30$/mois',
    category: 'Génération de vidéos'
  },
  // Nouveaux outils - Design
  {
    id: 31,
    name: 'Canva AI',
    description: 'La version IA de Canva qui révolutionne le design graphique. Créez des visuels, bannières, posts sociaux et infographies en décrivant simplement ce que vous voulez. Parfait pour créer du contenu visuel pour vos campagnes d\'affiliation sans compétences en design.',
    usage: 'Design graphique, visuels marketing, réseaux sociaux',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: canvaThumbnail,
    link: 'https://www.canva.com/ai-image-generator/',
    rating: 4,
    price: 'Gratuit avec limitation, puis 15$/mois pour Canva Pro',
    category: 'Design'
  },
  // Nouveaux outils - Création et génération d'images
  {
    id: 32,
    name: 'Craiyon',
    description: 'Générez des images à partir de texte et transformez-les en designs de t-shirts personnalisés. Outil gratuit parfait pour créer des visuels uniques pour vos produits d\'affiliation ou vos campagnes marketing. Interface simple et résultats créatifs.',
    usage: 'Génération d\'images, designs de t-shirts, créations personnalisées',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: craiyonThumbnail,
    link: 'https://www.craiyon.com',
    rating: 4,
    price: 'Gratuit',
    category: 'Génération d\'images'
  },
  {
    id: 33,
    name: 'This Person Does Not Exist',
    description: 'Générez des visages de personnes qui n\'existent pas pour vos produits, reviews et témoignages. Idéal pour créer des profils clients fictifs authentiques sans problèmes de droits d\'image pour vos campagnes d\'affiliation.',
    usage: 'Génération de visages, témoignages, profils clients',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: personThumbnail,
    link: 'https://this-person-does-not-exist.com/fr',
    rating: 4,
    price: 'Gratuit',
    category: 'Génération d\'images'
  },
  {
    id: 34,
    name: 'Meby',
    description: 'Créez des photos de profil inspirantes et professionnelles avec l\'IA. Parfait pour améliorer votre image de marque personnelle et créer des avatars attractifs pour vos profils sur les réseaux sociaux et plateformes d\'affiliation.',
    usage: 'Photos de profil, avatars professionnels, image de marque',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: mebyThumbnail,
    link: 'https://www.meby.ai',
    rating: 4,
    price: 'Freemium',
    category: 'Génération d\'images'
  },
  {
    id: 35,
    name: 'SpinSalt',
    description: 'Générez de magnifiques images riches et détaillées avec une qualité exceptionnelle. Outil premium pour créer des visuels haut de gamme qui se démarquent dans vos campagnes d\'affiliation et contenus marketing.',
    usage: 'Images haute qualité, visuels premium, marketing de luxe',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: spinsaltThumbnail,
    link: 'https://spinsalt.com',
    rating: 5,
    price: 'Premium',
    category: 'Génération d\'images'
  },
  {
    id: 36,
    name: 'Wombo',
    description: 'Créez des lip sync stupéfiants et originaux pour vos vidéos marketing. Disponible en version mobile et PC, parfait pour créer du contenu viral et engageant pour promouvoir vos produits d\'affiliation.',
    usage: 'Lip sync, vidéos virales, contenu engageant',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: womboThumbnail,
    link: 'https://www.wombo.ai/',
    rating: 4,
    price: 'Freemium',
    category: 'Génération de vidéos'
  },
  {
    id: 37,
    name: 'Photosonic',
    description: 'IA de génération de tableaux artistiques basée sur des mots-clés. Créez des œuvres d\'art uniques et des illustrations créatives pour enrichir vos contenus d\'affiliation et captiver votre audience.',
    usage: 'Art génératif, illustrations créatives, tableaux artistiques',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: photosonicThumbnail,
    link: 'https://photosonic.writesonic.com',
    rating: 4,
    price: 'Freemium',
    category: 'Génération d\'images'
  },
  {
    id: 38,
    name: 'Playground AI',
    description: 'Logiciel de génération d\'images ultra-puissant avec des fonctionnalités avancées. Alternative sérieuse à MidJourney offrant une grande flexibilité créative pour tous vos besoins visuels d\'affiliation.',
    usage: 'Génération d\'images avancée, créativité professionnelle',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: playgroundThumbnail,
    link: 'https://playgroundai.com/create',
    rating: 5,
    price: 'Freemium puis 15$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 39,
    name: 'Lexica',
    description: 'Outil créatif capable de créer des merveilles visuelles avec une approche artistique unique. Excellent pour générer des images inspirantes et esthétiques pour vos contenus d\'affiliation haut de gamme.',
    usage: 'Art visuel, images esthétiques, créations inspirantes',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: lexicaThumbnail,
    link: 'https://lexica.art',
    rating: 4,
    price: 'Freemium puis 10$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 40,
    name: 'Everypixel',
    description: 'La solution ultime pour trouver des images stock de qualité. Accédez à une vaste bibliothèque d\'images libres de droits pour illustrer tous vos contenus d\'affiliation sans souci de copyright.',
    usage: 'Images stock, photos libres de droits, illustrations',
    icon: <Lightbulb className="h-12 w-12 text-liberty-blue" />,
    thumbnail: everypixelThumbnail,
    link: 'https://www.everypixel.com',
    rating: 4,
    price: 'Gratuit et payant',
    category: 'Images stock'
  },
  {
    id: 41,
    name: 'Rosebud',
    description: 'Générez des visuels créatifs et originaux avec une approche artistique raffinée. Parfait pour créer du contenu visuel qui se démarque dans l\'univers saturé du marketing d\'affiliation.',
    usage: 'Visuels créatifs, design artistique, contenu original',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: rosebudThumbnail,
    link: 'https://www.rosebud.ai',
    rating: 4,
    price: 'Freemium',
    category: 'Génération d\'images'
  },
  {
    id: 42,
    name: 'The Studio',
    description: 'IA innovante qui crée des images à partir d\'images existantes que vous lui fournissez. Idéal pour transformer et améliorer vos visuels existants ou créer des variations créatives de vos contenus.',
    usage: 'Transformation d\'images, variations créatives, amélioration visuelle',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: thestudioThumbnail,
    link: 'https://app.pixelz.ai/studio',
    rating: 4,
    price: 'Freemium',
    category: 'Génération d\'images'
  },
  {
    id: 43,
    name: 'Alpaca',
    description: 'Plugin Photoshop révolutionnaire qui intègre l\'IA directement dans votre workflow de design. Parfait pour les créateurs expérimentés qui veulent allier la puissance de Photoshop à l\'intelligence artificielle.',
    usage: 'Plugin Photoshop, design professionnel, workflow IA',
    icon: <Zap className="h-12 w-12 text-liberty-blue" />,
    thumbnail: alpacaThumbnail,
    link: 'https://www.getalpaca.io',
    rating: 5,
    price: 'Premium',
    category: 'Design'
  },
  {
    id: 44,
    name: 'Dreamsands',
    description: 'Créez et vendez des œuvres d\'art générées par IA. Plateforme complète pour monétiser votre créativité en créant des NFT et œuvres numériques uniques que vous pouvez vendre comme produits d\'affiliation.',
    usage: 'Création d\'art IA, NFT, monétisation créative',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: dreamsandsThumbnail,
    link: 'https://dreamsands.ai',
    rating: 4,
    price: 'Freemium',
    category: 'Génération d\'images'
  },
  {
    id: 45,
    name: 'Genie',
    description: 'Outil de génération d\'images spécialement conçu pour les artistes et designers professionnels. Interface intuitive et résultats de haute qualité pour créer des visuels exceptionnels.',
    usage: 'Design professionnel, art numérique, créations haut de gamme',
    icon: <Sparkles className="h-12 w-12 text-liberty-blue" />,
    thumbnail: genieThumbnail,
    link: 'https://www.genie.ai',
    rating: 4,
    price: 'Freemium puis 20$/mois',
    category: 'Génération d\'images'
  },
  {
    id: 46,
    name: 'Quick, Draw!',
    description: 'IA ludique de Google qui génère des dessins à partir de mots-clés. Parfait pour créer des illustrations simples et amusantes, idéal pour du contenu éducatif ou des présentations interactives.',
    usage: 'Dessins simples, illustrations ludiques, contenu éducatif',
    icon: <Bot className="h-12 w-12 text-liberty-blue" />,
    thumbnail: quickdrawThumbnail,
    link: 'https://quickdraw.withgoogle.com',
    rating: 3,
    price: 'Gratuit',
    category: 'Génération d\'images'
  },
  {
    id: 47,
    name: 'Logojoy',
    description: 'Générez des visuels d\'entreprise professionnels en un clin d\'œil. Créez des logos, cartes de visite et identités visuelles complètes pour vos projets d\'affiliation et votre personal branding.',
    usage: 'Logos, identité visuelle, branding professionnel',
    icon: <Lightbulb className="h-12 w-12 text-liberty-blue" />,
    thumbnail: logojoyThumbnail,
    link: 'https://www.logojoy.com',
    rating: 4,
    price: 'Freemium puis 25$/mois',
    category: 'Design'
  },
  {
    id: 48,
    name: 'Lottie',
    description: 'Générez des écrans de chargement animés et des micro-interactions pour vos jeux vidéo et applications. Parfait pour créer des expériences utilisateur engageantes dans vos projets numériques.',
    usage: 'Animations, écrans de chargement, micro-interactions',
    icon: <Zap className="h-12 w-12 text-liberty-blue" />,
    thumbnail: lottieThumbnail,
    link: 'https://lottiefiles.com/use-cases/game-design',
    rating: 4,
    price: 'Freemium puis 15$/mois',
    category: 'Design'
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
                      onClick={() => {
                        const newWindow = window.open(tool.link, '_blank');
                        if (newWindow) {
                          newWindow.opener = null;
                        }
                      }}
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
