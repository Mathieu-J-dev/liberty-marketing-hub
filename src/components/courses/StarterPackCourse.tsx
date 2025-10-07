import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Circle, BookOpen, Target, Users, DollarSign, Zap } from 'lucide-react';
import ModuleContent from './ModuleContent';
import ModuleQuiz from './ModuleQuiz';

interface Module {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  completed: boolean;
  content: {
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      examples?: string[];
    }>;
    exercices: Array<{
      title: string;
      description: string;
      task: string;
    }>;
  };
  quiz: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}

const StarterPackCourse: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number>(1);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [quizResults, setQuizResults] = useState<{ [key: number]: boolean }>({});

  const modules: Module[] = [
    {
      id: 1,
      title: "Comprendre l'Affiliation Marketing",
      description: "Les bases essentielles pour débuter",
      icon: <BookOpen className="h-5 w-5" />,
      duration: "45 min",
      completed: completedModules.includes(1),
      content: {
        introduction: "L'affiliation marketing est une stratégie de marketing en ligne où vous promouvez les produits ou services d'autres entreprises et gagnez une commission sur chaque vente générée. C'est l'un des business models les plus accessibles pour débuter en ligne en 2025.",
        sections: [
          {
            title: "Histoire et évolution de l'affiliation",
            content: "L'affiliation marketing a été lancée en 1996 par Amazon. Aujourd'hui, c'est un marché de plus de 12 milliards de dollars. Avec l'IA et le no-code, créer un business d'affiliation rentable est plus accessible que jamais.",
            examples: [
              "1996 : Amazon lance le premier programme d'affiliation grand public",
              "2010 : L'explosion des blogs et du marketing de contenu",
              "2025 : L'ère de l'IA et de l'automatisation pour l'affiliation"
            ]
          },
          {
            title: "Qu'est-ce que l'affiliation marketing ?",
            content: "L'affiliation est un partenariat entre trois parties : l'annonceur (qui vend le produit), l'affilié (vous, qui fait la promotion), et le client final. Vous recevez un lien de suivi unique pour chaque produit que vous promouvez. Chaque fois qu'une vente est réalisée via votre lien, vous touchez une commission.",
            examples: [
              "Amazon Associates - Commission de 1-10% selon la catégorie (des millions de produits)",
              "ClickBank - Produits numériques avec commissions jusqu'à 75% (idéal pour débuter)",
              "ShareASale - Marketplace avec des milliers de programmes (tous secteurs)",
              "Systeme.io - Outils marketing avec 40-60% de commissions récurrentes"
            ]
          },
          {
            title: "Les différents types de commissions",
            content: "Il existe plusieurs modèles de rémunération dans l'affiliation. Comprendre ces modèles vous permet de choisir les programmes les plus adaptés à votre stratégie et votre audience.",
            examples: [
              "CPS (Coût Par Vente) : 5-75% de commission sur chaque vente - Le plus courant",
              "CPL (Coût Par Lead) : 1-50€ par email collecté ou inscription",
              "CPA (Coût Par Action) : 10-200€ par action spécifique (inscription, essai gratuit)",
              "Commissions récurrentes : Revenu mensuel tant que le client reste abonné (SaaS)"
            ]
          },
          {
            title: "Études de cas : Revenus réels d'affiliés",
            content: "Voici des exemples concrets de revenus générés par des affiliés pour vous montrer le potentiel réel de ce business model.",
            examples: [
              "Pat Flynn (Smart Passive Income) : 150 000$/mois principalement via l'affiliation",
              "Michelle Schroeder (Making Sense of Cents) : 50 000$/mois en affiliation finance",
              "Matthew Woodward (SEO) : 40 000$/mois en affiliation outils marketing",
              "Cas débutant réaliste : 500-2000€/mois après 6-12 mois de travail constant"
            ]
          },
          {
            title: "Mythes vs Réalités de l'affiliation",
            content: "Démystifions les idées reçues sur l'affiliation marketing pour avoir des attentes réalistes et éviter les erreurs courantes des débutants.",
            examples: [
              "❌ MYTHE : 'On devient riche rapidement' → ✅ RÉALITÉ : Ça prend 6-12 mois pour des revenus réguliers",
              "❌ MYTHE : 'C'est du 100% passif' → ✅ RÉALITÉ : Demande du travail initial puis maintenance",
              "❌ MYTHE : 'Il suffit de partager des liens' → ✅ RÉALITÉ : Nécessite du contenu de qualité et de la stratégie",
              "❌ MYTHE : 'Il faut une énorme audience' → ✅ RÉALITÉ : Une petite audience engagée suffit"
            ]
          },
          {
            title: "Avantages et inconvénients",
            content: "L'affiliation offre la possibilité de revenus passifs sans créer de produits, mais nécessite du temps pour construire une audience et optimiser les conversions. Voici un bilan honnête pour prendre une décision éclairée.",
            examples: [
              "✅ Avantages : Pas de stock, pas de SAV, flexible, scalable, revenus passifs potentiels",
              "❌ Inconvénients : Dépendance aux programmes, commissions variables, concurrence, besoin de trafic constant"
            ]
          }
        ],
        exercices: [
          {
            title: "Recherche de programmes d'affiliation",
            description: "Trouvez et analysez 10 programmes d'affiliation dans votre niche",
            task: "Inscrivez-vous sur 3 plateformes d'affiliation (Amazon Associates, ClickBank, ShareASale ou 1TPE) et créez un tableau Excel avec 10 programmes incluant : nom, commission %, type de commission, durée du cookie, support affilié disponible."
          },
          {
            title: "Analyse de commissions et calcul de revenus",
            description: "Calculez le potentiel de revenus réaliste",
            task: "Pour chaque programme sélectionné, calculez combien de ventes vous devez faire pour atteindre 500€, 1000€ et 2000€ de commissions mensuelles. Notez aussi le nombre de visiteurs nécessaire avec un taux de conversion de 1-3%."
          },
          {
            title: "Étude de cas d'un affilié à succès",
            description: "Apprenez des meilleurs",
            task: "Trouvez 2 affiliés à succès dans votre niche (via YouTube, blogs ou podcasts). Analysez leur stratégie : types de contenu, canaux utilisés, positionnement, et notez 3 idées que vous pouvez appliquer."
          },
          {
            title: "Planification de votre business d'affiliation",
            description: "Créez votre plan d'action personnalisé",
            task: "Rédigez un document décrivant : votre niche choisie, 3 programmes d'affiliation prioritaires, votre stratégie de contenu (blog/YouTube/Instagram), objectif de revenus à 3, 6 et 12 mois, et vos 3 premières actions concrètes."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est le rôle principal d'un affilié ?",
          options: [
            "Créer le produit à vendre",
            "Promouvoir les produits d'autres entreprises",
            "Gérer le service client",
            "Livrer les produits aux clients"
          ],
          correctAnswer: 1,
          explanation: "L'affilié agit comme un intermédiaire marketing qui promeut les produits d'autres entreprises en échange d'une commission. Il n'a pas à gérer la création, le stock ou la livraison."
        },
        {
          question: "Que signifie CPS en affiliation ?",
          options: [
            "Coût Par Seconde",
            "Commission Par Semaine",
            "Coût Par Vente (Cost Per Sale)",
            "Clients Par Site"
          ],
          correctAnswer: 2,
          explanation: "CPS (Cost Per Sale) signifie que vous êtes payé uniquement quand une vente est réalisée grâce à votre promotion. C'est le modèle le plus courant en affiliation."
        },
        {
          question: "Quel est l'avantage principal de l'affiliation marketing ?",
          options: [
            "Pas besoin de créer de produits",
            "Revenus garantis dès le premier jour",
            "Aucun effort marketing requis",
            "Commission de 100% sur toutes les ventes"
          ],
          correctAnswer: 0,
          explanation: "L'affiliation permet de générer des revenus sans avoir à créer, développer ou gérer des produits. Vous pouvez vous concentrer uniquement sur le marketing et la promotion."
        },
        {
          question: "Combien de temps faut-il généralement pour générer des revenus réguliers en affiliation ?",
          options: [
            "1 semaine avec le bon système",
            "1 mois maximum",
            "6-12 mois de travail constant",
            "C'est impossible, c'est une arnaque"
          ],
          correctAnswer: 2,
          explanation: "De manière réaliste, il faut compter 6 à 12 mois de travail constant pour construire une audience et générer des revenus réguliers en affiliation. Les résultats instantanés sont très rares."
        },
        {
          question: "Quelle est la meilleure plateforme pour débuter en affiliation ?",
          options: [
            "Il n'y a pas de 'meilleure' plateforme, ça dépend de votre niche",
            "Amazon Associates uniquement",
            "ClickBank uniquement",
            "Les programmes d'affiliation ne marchent plus"
          ],
          correctAnswer: 0,
          explanation: "La meilleure plateforme dépend de votre niche, de votre audience et du type de produits que vous souhaitez promouvoir. Amazon est idéal pour les produits physiques, ClickBank pour le numérique, etc."
        },
        {
          question: "Que sont les commissions récurrentes ?",
          options: [
            "Des commissions payées une seule fois",
            "Des commissions payées chaque mois tant que le client reste abonné",
            "Des commissions qui reviennent aléatoirement",
            "Un bonus annuel"
          ],
          correctAnswer: 1,
          explanation: "Les commissions récurrentes sont payées mensuellement tant que le client que vous avez référé reste abonné au service. C'est très intéressant pour les logiciels SaaS et créer un revenu passif stable."
        },
        {
          question: "Faut-il une énorme audience pour réussir en affiliation ?",
          options: [
            "Oui, minimum 100 000 abonnés",
            "Non, une petite audience engagée et ciblée peut suffire",
            "Oui, sinon aucune chance de réussite",
            "L'audience n'a aucune importance"
          ],
          correctAnswer: 1,
          explanation: "Une petite audience très engagée et ciblée sur une niche spécifique peut générer plus de revenus qu'une grande audience non qualifiée. La qualité prime sur la quantité en affiliation."
        }
      ]
    },
    {
      id: 2,
      title: "Choisir sa Niche Rentable",
      description: "Identifier les opportunités lucratives",
      icon: <Target className="h-5 w-5" />,
      duration: "35 min",
      completed: completedModules.includes(2),
      content: {
        introduction: "Le choix de votre niche détermine en grande partie votre succès en affiliation. Une niche bien choisie combine passion personnelle, demande du marché et potentiel de monétisation. C'est la décision la plus importante de votre business d'affiliation.",
        sections: [
          {
            title: "Framework complet de sélection de niche",
            content: "Utilisez la méthode des 3 P : Passion (votre intérêt), Problème (que résolvez-vous ?), Profit (y a-t-il de l'argent ?). Une niche idéale coche ces 3 cases. Ajoutez à cela les critères SMART pour valider votre choix.",
            examples: [
              "Passion : Sujet qui vous passionne et sur lequel vous pouvez créer du contenu régulièrement",
              "Problème : Une audience avec des problèmes spécifiques et un pouvoir d'achat",
              "Profit : Des produits avec de bonnes commissions (15%+ ou 50€+)",
              "Évitez : Les niches trop larges (santé) ou trop étroites (santé des lapins nains albinos)"
            ]
          },
          {
            title: "Critères d'une niche rentable en 2025",
            content: "Une niche profitable doit avoir une audience suffisamment large (mais pas trop), des problèmes spécifiques à résoudre, et des produits avec de bonnes commissions disponibles. Le marché doit être assez grand mais pas saturé.",
            examples: [
              "Santé & bien-être : marché de 4,2 milliards d'euros (ex: fitness à domicile, nutrition végane)",
              "Finance personnelle : commissions élevées de 50-200€ par lead (ex: trading, crypto, épargne)",
              "Formation en ligne : croissance de 15% par an (ex: marketing digital, no-code, IA)",
              "Technologie & productivité : fort pouvoir d'achat (ex: outils SaaS, équipement télétravail)",
              "Développement personnel : audience engagée (ex: coaching, habitudes, mindfulness)"
            ]
          },
          {
            title: "Matrice de scoring de niches",
            content: "Utilisez cette matrice pour évaluer et comparer vos niches potentielles. Notez chaque critère de 1 à 10, puis additionnez pour obtenir un score global sur 80 points.",
            examples: [
              "Passion personnelle (1-10) : Pouvez-vous créer du contenu pendant 2 ans ?",
              "Taille du marché (1-10) : Y a-t-il assez de clients potentiels ?",
              "Pouvoir d'achat (1-10) : Les gens dépensent-ils dans cette niche ?",
              "Commissions disponibles (1-10) : Y a-t-il de bons programmes d'affiliation ?",
              "Niveau de concurrence (1-10) : Pouvez-vous vous différencier ? (10 = faible concurrence)",
              "Votre expertise (1-10) : Avez-vous de la crédibilité ou de l'expérience ?",
              "Tendance du marché (1-10) : Le marché est-il en croissance ?",
              "Potentiel de contenu (1-10) : Y a-t-il beaucoup de sujets à traiter ?",
              "Score > 60 : Excellente niche | 50-60 : Bonne niche | < 50 : À éviter"
            ]
          },
          {
            title: "Analyse de tendances 2025",
            content: "Certaines niches explosent en 2025 grâce aux nouvelles technologies et changements sociétaux. Identifiez les opportunités émergentes avant la saturation.",
            examples: [
              "Intelligence Artificielle : Outils no-code, automatisation, prompts",
              "Travail hybride : Équipement home office, productivité, outils collaboratifs",
              "Écologie & durabilité : Produits éco-responsables, minimalisme, zéro déchet",
              "Santé mentale : Méditation, thérapie en ligne, gestion du stress",
              "Side hustles : Freelancing, revenus passifs, indépendance financière"
            ]
          },
          {
            title: "Recherche et validation de niche",
            content: "Utilisez des outils gratuits et payants comme Google Trends, Answer The Public, Reddit, et les forums spécialisés pour évaluer l'intérêt et la demande réelle dans votre niche avant de vous lancer.",
            examples: [
              "Google Trends : Vérifiez que la tendance est stable ou croissante sur 5 ans",
              "Forums Reddit : 10 000+ membres = demande forte. Analysez les questions récurrentes",
              "Amazon bestsellers : Top 100 de la catégorie = produits qui se vendent bien",
              "YouTube : Cherchez des chaînes similaires. 100K+ vues par vidéo = bon signe",
              "Facebook Groups : Groupes actifs de 5000+ membres = communauté engagée"
            ]
          },
          {
            title: "Concurrence et positionnement",
            content: "Analysez vos concurrents pour identifier les opportunités de différenciation et les angles d'approche non exploités. Une concurrence forte n'est pas mauvaise si vous trouvez votre angle unique.",
            examples: [
              "Identifiez les 5 principaux concurrents de votre niche",
              "Analysez leurs forces/faiblesses : types de contenu, ton, fréquence",
              "Trouvez votre angle : débutant vs expert, humour vs sérieux, vidéo vs écrit",
              "Sous-niche : Passez de 'fitness' à 'fitness pour mamans occupées de plus de 40 ans'"
            ]
          }
        ],
        exercices: [
          {
            title: "Brainstorming de 10 niches potentielles",
            description: "Listez toutes vos idées de niches sans filtre",
            task: "Créez une liste de 10 niches qui vous intéressent. Pour chacune, notez pourquoi elle vous intéresse et si vous avez une expertise ou expérience personnelle dans le domaine."
          },
          {
            title: "Analyse approfondie de 5 niches avec matrice de scoring",
            description: "Évaluez scientifiquement vos meilleures niches",
            task: "Sélectionnez vos 5 meilleures niches et créez un tableau Excel avec la matrice de scoring complète (8 critères notés sur 10). Calculez le score total de chaque niche et classez-les par ordre de priorité."
          },
          {
            title: "Validation par recherche de mots-clés",
            description: "Vérifiez la demande réelle avec des données",
            task: "Pour vos 3 niches les mieux notées, utilisez Ubersuggest (gratuit) ou Google Keyword Planner pour identifier 15-20 mots-clés avec leur volume de recherche mensuel, difficulté SEO et CPC. Objectif : min 10 000 recherches/mois au total."
          },
          {
            title: "Analyse de concurrence approfondie",
            description: "Étudiez vos futurs concurrents",
            task: "Pour votre niche #1, identifiez les 5 principaux concurrents (blogs, YouTube, Instagram). Analysez leur stratégie de contenu, fréquence de publication, engagement, et notez 5 opportunités de différenciation que vous pouvez exploiter."
          },
          {
            title: "Décision finale et plan de lancement",
            description: "Choisissez votre niche et planifiez vos premiers pas",
            task: "Basé sur vos analyses, choisissez UNE niche définitive. Rédigez un document de 1-2 pages incluant : votre niche précise, votre positionnement unique, votre avatar client idéal, 3 programmes d'affiliation prioritaires, et vos 10 premières idées de contenu."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est le critère le plus important pour choisir une niche ?",
          options: [
            "Votre passion personnelle uniquement",
            "Le niveau de concurrence faible",
            "L'équilibre entre passion, demande et monétisation (3 P)",
            "Le nombre de produits disponibles"
          ],
          correctAnswer: 2,
          explanation: "Une niche réussie doit combiner votre intérêt personnel (Passion), une demande du marché avec des problèmes à résoudre (Problème), et un potentiel de monétisation (Profit). C'est la règle des 3 P."
        },
        {
          question: "Quel outil est recommandé pour analyser les tendances d'une niche ?",
          options: [
            "Google Trends",
            "Facebook uniquement",
            "Wikipedia",
            "Votre intuition"
          ],
          correctAnswer: 0,
          explanation: "Google Trends permet de voir l'évolution de l'intérêt pour des sujets sur plusieurs années. Une tendance stable ou croissante sur 5 ans est un excellent indicateur."
        },
        {
          question: "Que faire si une niche a beaucoup de concurrence ?",
          options: [
            "L'éviter complètement",
            "Chercher un angle de différenciation ou une sous-niche",
            "Copier exactement les concurrents",
            "Attendre que la concurrence diminue"
          ],
          correctAnswer: 1,
          explanation: "Une forte concurrence indique souvent un marché viable et rentable. Il faut trouver un angle unique pour se différencier ou cibler une sous-niche plus spécifique avec moins de concurrence."
        },
        {
          question: "Qu'est-ce qu'une 'sous-niche' ?",
          options: [
            "Une niche de mauvaise qualité",
            "Une spécialisation plus précise d'une niche large",
            "Une niche avec peu de trafic",
            "Une niche sans concurrence"
          ],
          correctAnswer: 1,
          explanation: "Une sous-niche est une spécialisation d'une niche large. Par exemple, passer de 'fitness' (niche large) à 'yoga pour femmes enceintes' (sous-niche) permet de réduire la concurrence et mieux cibler son audience."
        },
        {
          question: "Quel score minimum devrait avoir une niche selon la matrice de scoring (sur 80 points) ?",
          options: [
            "20 points, peu importe",
            "40 points minimum",
            "50-60 points pour être viable",
            "80 points obligatoire"
          ],
          correctAnswer: 2,
          explanation: "Une niche avec un score de 50-60/80 est généralement viable. Plus de 60 est excellent. En dessous de 50, il vaut mieux chercher une autre niche ou affiner son positionnement."
        },
        {
          question: "Pourquoi analyser les forums et Reddit de votre niche ?",
          options: [
            "Pour copier les réponses",
            "Pour comprendre les vraies questions et douleurs de l'audience",
            "C'est une perte de temps",
            "Pour spam vos liens d'affiliation"
          ],
          correctAnswer: 1,
          explanation: "Les forums et Reddit révèlent les vraies questions, problèmes et besoins de votre audience. C'est une mine d'or pour créer du contenu pertinent qui répond à des besoins réels et qui convertit bien."
        },
        {
          question: "Quelle est la meilleure stratégie si votre niche est trop large (ex: 'santé') ?",
          options: [
            "Continuer tel quel, c'est bien",
            "Abandonner complètement",
            "Se spécialiser dans une sous-niche plus précise",
            "Créer du contenu sur tous les sujets santé"
          ],
          correctAnswer: 2,
          explanation: "Une niche trop large rend difficile de se positionner face aux gros acteurs. Il vaut mieux se spécialiser dans une sous-niche (ex: 'nutrition végane pour sportifs') pour devenir une référence et réduire la concurrence."
        }
      ]
    },
    {
      id: 3,
      title: "Créer du Contenu qui Convertit",
      description: "Techniques de création de contenu persuasif",
      icon: <Users className="h-5 w-5" />,
      duration: "50 min",
      completed: completedModules.includes(3),
      content: {
        introduction: "Le contenu est le pilier de votre stratégie d'affiliation. Un contenu de qualité établit votre crédibilité, engage votre audience et guide naturellement vers l'achat. En 2025, avec l'IA, créer du contenu de qualité est plus rapide que jamais.",
        sections: [
          {
            title: "Templates de contenu prêts à l'emploi",
            content: "Utilisez ces templates éprouvés pour créer du contenu qui convertit rapidement. Chaque template a fait ses preuves pour générer des commissions.",
            examples: [
              "Template Review : Introduction + Test personnel (30j) + Avantages (5 points) + Inconvénients (3 points) + Pour qui c'est fait + Alternative + Verdict final + FAQ + CTA",
              "Template Comparatif : Tableau comparatif + Description de chaque produit + Test de chacun + Recommandation par profil utilisateur + FAQ + CTA",
              "Template Tutoriel : Problème + Solution + Étapes détaillées + Outils nécessaires (liens affiliés) + Résultat attendu + FAQ",
              "Template Liste : Introduction du problème + Critères de sélection + Top X produits avec mini-review de chacun + Tableau récap + CTA"
            ]
          },
          {
            title: "Types de contenu performants",
            content: "Les reviews détaillées, comparatifs, tutoriels et listes de recommandations sont parmi les formats les plus efficaces pour l'affiliation. Chaque type a son utilité selon l'intention de recherche.",
            examples: [
              "Reviews longues : 'Test complet de [produit] après 30 jours d'utilisation' (2000+ mots)",
              "Comparatifs : 'Top 5 des meilleurs outils de [catégorie] en 2025' (1500+ mots)",
              "Tutoriels : 'Comment résoudre [problème] étape par étape avec [outil]' (1000+ mots)",
              "Listes : '10 outils indispensables pour [objectif]' (1200+ mots)",
              "Guides : 'Guide ultime pour choisir [produit] en 2025' (3000+ mots)"
            ]
          },
          {
            title: "Structure d'un contenu qui convertit (méthode AIDA)",
            content: "Utilisez la méthode AIDA (Attention, Intérêt, Désir, Action) pour structurer vos contenus et guider le lecteur vers la conversion. C'est une formule de copywriting éprouvée depuis des décennies.",
            examples: [
              "A - Attention : Titre accrocheur avec chiffres et bénéfices ('J'ai gagné 2000€ en 30j avec...')",
              "I - Intérêt : Problème + bénéfices clairs + preuve sociale (témoignages, stats)",
              "D - Désir : Storytelling, émotions, transformation possible, urgence/rareté",
              "A - Action : Call-to-action clair et répété (début, milieu, fin) avec boutons visibles"
            ]
          },
          {
            title: "Stratégie de content pillar",
            content: "Organisez votre contenu autour de 'piliers' thématiques principaux. Chaque pilier génère 10-15 articles connexes, créant un maillage interne puissant pour le SEO.",
            examples: [
              "Pilier 1 : 'Guide complet du [sujet]' (3000 mots) → 10 articles détaillant chaque sous-thème",
              "Pilier 2 : 'Tout sur [produit/catégorie]' (2500 mots) → 10 reviews/comparatifs spécifiques",
              "Avantages : Autorité SEO, maillage interne, augmente le temps sur site, guide l'audience"
            ]
          },
          {
            title: "Copywriting et neuromarketing",
            content: "Appliquez les principes du copywriting et du neuromarketing pour rendre votre contenu irrésistible et augmenter vos conversions de 50-300%.",
            examples: [
              "Déclencheurs émotionnels : Peur de rater, urgence, exclusivité, preuve sociale",
              "Power words : Gratuit, Secret, Garanti, Prouvé, Révélé, Nouveau, Limité",
              "Chiffres précis : '127 personnes ont acheté aujourd'hui' vs 'Beaucoup de gens achètent'",
              "Avant/Après : Montrez la transformation possible avec le produit",
              "Garantie : Rassurez avec 'satisfait ou remboursé', 'sans risque', 'essai gratuit'"
            ]
          },
          {
            title: "Optimisation SEO pour l'affiliation",
            content: "Intégrez naturellement vos mots-clés, optimisez vos méta-descriptions et créez des liens internes pertinents. Le SEO reste la source #1 de trafic gratuit pour l'affiliation.",
            examples: [
              "Titre : Mot-clé principal + chiffre + année + bénéfice (max 60 car.)",
              "Meta description : Mot-clé + promesse + CTA (max 160 car.)",
              "H1 unique avec mot-clé principal",
              "H2/H3 avec mots-clés secondaires et synonymes",
              "Images : Alt text descriptifs avec mots-clés, noms de fichiers optimisés",
              "Liens internes : 3-5 par article vers contenu connexe",
              "URL : Courte, claire, avec mot-clé principal"
            ]
          }
        ],
        exercices: [
          {
            title: "Rédaction d'une review complète avec template",
            description: "Créez votre première review professionnelle",
            task: "Utilisez le template Review fourni pour rédiger une review de 1500 mots minimum d'un produit de votre niche. Incluez : intro accrocheuse, test personnel avec photos/vidéo, 5 avantages, 3 inconvénients, pour qui c'est fait, alternative, verdict final, FAQ (5 questions), 3 CTA placés stratégiquement, et 3 liens d'affiliation intégrés naturellement."
          },
          {
            title: "Création d'un comparatif 'Top 3'",
            description: "Comparez 3 produits similaires en profondeur",
            task: "Créez un article comparatif de 1200 mots avec tableau comparatif, description détaillée de chaque produit (300 mots min.), votre test personnel de chacun, recommandation par profil utilisateur (débutant/avancé, petit/gros budget), section FAQ, et CTA final avec le 'winner'."
          },
          {
            title: "Tutoriel avec intégration d'affiliation naturelle",
            description: "Créez un tutoriel qui résout un problème spécifique",
            task: "Rédigez un tutoriel de 1000 mots expliquant comment résoudre un problème de votre niche. Incluez : définition du problème, étapes détaillées avec screenshots, outils nécessaires (3-5 liens affiliés intégrés naturellement), résultat attendu, troubleshooting (problèmes courants), et conclusion avec CTA."
          },
          {
            title: "Rédaction de 5 types de contenu différents",
            description: "Diversifiez vos formats de contenu",
            task: "Créez 5 titres + introductions (200 mots chacune) pour : 1) Une review longue, 2) Un comparatif, 3) Un tutoriel, 4) Une liste 'Top 10', 5) Un guide complet. Pour chacun, identifiez le mot-clé principal, l'intention de recherche, et où placer les liens affiliés."
          },
          {
            title: "A/B testing de vos CTA",
            description: "Optimisez vos appels à l'action",
            task: "Créez 5 versions différentes de CTA pour le même produit. Variez : le wording ('Découvrir', 'Essayer gratuitement', 'Voir le prix', 'Obtenir la réduction'), la couleur du bouton, le placement (début/milieu/fin), et l'urgence ('Offre limitée', 'Stock limité'). Planifiez un test A/B sur votre contenu le plus visité."
          }
        ]
      },
      quiz: [
        {
          question: "Quelle est la méthode recommandée pour structurer un contenu d'affiliation ?",
          options: [
            "SMART",
            "AIDA (Attention, Intérêt, Désir, Action)",
            "SWOT",
            "PEST"
          ],
          correctAnswer: 1,
          explanation: "AIDA est une méthode de copywriting éprouvée qui guide le lecteur du premier contact jusqu'à l'action d'achat. Elle fonctionne car elle suit la psychologie naturelle de décision d'achat."
        },
        {
          question: "Quel type de contenu convertit généralement le mieux en affiliation ?",
          options: [
            "Articles de blog généralistes",
            "Reviews détaillées et comparatifs",
            "Photos sans description",
            "Contenus entièrement promotionnels"
          ],
          correctAnswer: 1,
          explanation: "Les reviews et comparatifs apportent de la valeur réelle tout en présentant naturellement les produits d'affiliation. Les gens recherchent activement ces formats quand ils sont prêts à acheter."
        },
        {
          question: "Pourquoi est-il important d'inclure des inconvénients dans une review ?",
          options: [
            "Pour décourager l'achat",
            "Pour établir la crédibilité et la confiance",
            "Pour allonger le contenu",
            "C'est une obligation légale"
          ],
          correctAnswer: 1,
          explanation: "Mentionner les inconvénients rend votre review plus crédible et authentique. Les lecteurs savent qu'aucun produit n'est parfait, et votre honnêteté renforce la confiance, ce qui augmente paradoxalement les conversions."
        },
        {
          question: "Quelle longueur minimum pour une review d'affiliation efficace ?",
          options: [
            "300 mots suffisent",
            "500 mots minimum",
            "1500-2000 mots pour bien ranker en SEO",
            "La longueur n'a pas d'importance"
          ],
          correctAnswer: 2,
          explanation: "Les articles de 1500-2000 mots performent mieux en SEO et conversions car ils permettent de couvrir le sujet en profondeur, répondre aux questions, et établir votre expertise. Google favorise le contenu complet."
        },
        {
          question: "Combien de CTA (Call-To-Action) devrait contenir un article d'affiliation ?",
          options: [
            "1 seul à la fin",
            "3-5 CTA placés stratégiquement",
            "Le plus possible, partout",
            "Aucun, les gens trouveront seuls"
          ],
          correctAnswer: 1,
          explanation: "3-5 CTA placés stratégiquement (début après intro, milieu, fin, dans la sidebar) captent les lecteurs à différents stades de décision sans être trop agressif. Trop de CTA dilue leur efficacité."
        },
        {
          question: "Qu'est-ce qu'une stratégie de 'content pillar' ?",
          options: [
            "Écrire beaucoup d'articles sans structure",
            "Créer des articles piliers (3000 mots) reliés à 10-15 articles connexes",
            "Copier le contenu d'autres sites",
            "Publier uniquement des vidéos"
          ],
          correctAnswer: 1,
          explanation: "Une stratégie de content pillar organise votre contenu autour d'articles majeurs (3000+ mots) qui sont reliés à de nombreux articles plus spécifiques. Cela crée un maillage interne puissant, améliore le SEO et vous positionne comme expert."
        },
        {
          question: "Quel est l'élément le plus important d'un article d'affiliation ?",
          options: [
            "Le nombre de mots-clés",
            "La confiance et l'authenticité",
            "Le nombre de liens d'affiliation",
            "La longueur du contenu"
          ],
          correctAnswer: 1,
          explanation: "Sans confiance et authenticité, même le meilleur SEO ne convertira pas. Les lecteurs doivent sentir que vous avez vraiment testé le produit et que vous donnez votre avis honnête. C'est la base de toute stratégie d'affiliation réussie."
        }
      ]
    },
    {
      id: 4,
      title: "Monétiser et Optimiser ses Revenus",
      description: "Stratégies avancées pour maximiser vos gains",
      icon: <DollarSign className="h-5 w-5" />,
      duration: "40 min",
      completed: completedModules.includes(4),
      content: {
        introduction: "Apprenez à maximiser vos revenus d'affiliation grâce à des stratégies avancées, l'optimisation des conversions et la diversification des sources de revenus.",
        sections: [
          {
            title: "Optimisation des taux de conversion",
            content: "Découvrez comment améliorer le taux de conversion de vos visiteurs en acheteurs grâce à des techniques de copywriting, design et tests A/B.",
            examples: [
              "Utiliser des CTA clairs et visibles",
              "Créer des pages de destination dédiées",
              "Tester différentes offres et messages",
              "Analyser le comportement utilisateur avec des outils analytics"
            ]
          },
          {
            title: "Diversification des sources de revenus",
            content: "Ne dépendez pas d'une seule source. Explorez les programmes d'affiliation multiples, la publicité, les produits digitaux et les partenariats.",
            examples: [
              "Combiner affiliation et publicité display",
              "Créer des produits numériques complémentaires",
              "Proposer des services ou coaching",
              "Utiliser les réseaux sociaux pour élargir l'audience"
            ]
          },
          {
            title: "Automatisation et scaling",
            content: "Utilisez l'automatisation pour gagner du temps et scaler votre business d'affiliation.",
            examples: [
              "Email marketing automatisé",
              "Chatbots pour la qualification des leads",
              "Outils de planification de contenu",
              "Campagnes publicitaires automatisées"
            ]
          }
        ],
        exercices: [
          {
            title: "Audit de conversion",
            description: "Analysez votre site ou contenu pour identifier les points d'amélioration",
            task: "Utilisez Google Analytics et Hotjar pour étudier le comportement des visiteurs. Notez 5 actions concrètes pour améliorer le taux de conversion."
          },
          {
            title: "Plan de diversification",
            description: "Élaborez une stratégie pour diversifier vos revenus",
            task: "Listez 3 nouvelles sources de revenus à tester dans les 3 prochains mois et décrivez comment vous allez les mettre en place."
          },
          {
            title: "Mise en place d'automatisation",
            description: "Automatisez une tâche répétitive",
            task: "Choisissez une tâche (email, publication, suivi) et configurez un outil pour l'automatiser. Documentez le processus et les résultats attendus."
          }
        ]
      },
      quiz: [
        {
          question: "Quelle est une bonne pratique pour augmenter le taux de conversion ?",
          options: [
            "Ajouter plusieurs CTA différents sur la même page",
            "Utiliser des CTA clairs et visibles",
            "Éviter les pages de destination dédiées",
            "Ne pas analyser le comportement utilisateur"
          ],
          correctAnswer: 1,
          explanation: "Des CTA clairs et visibles guident l'utilisateur vers l'action souhaitée, augmentant ainsi le taux de conversion."
        },
        {
          question: "Pourquoi diversifier ses sources de revenus ?",
          options: [
            "Pour réduire les risques et augmenter les opportunités",
            "Pour compliquer la gestion",
            "Pour se concentrer uniquement sur un programme",
            "Pour éviter de créer du contenu"
          ],
          correctAnswer: 0,
          explanation: "Diversifier réduit la dépendance à une seule source et ouvre plus de possibilités de gains."
        },
        {
          question: "Quel outil peut aider à automatiser le marketing par email ?",
          options: [
            "Google Docs",
            "Mailchimp",
            "Photoshop",
            "Excel"
          ],
          correctAnswer: 1,
          explanation: "Mailchimp est un outil populaire pour automatiser les campagnes email marketing."
        }
      ]
    },
    {
      id: 5,
      title: "Communauté et Réseautage",
      description: "Construire un réseau solide pour booster votre business",
      icon: <Zap className="h-5 w-5" />,
      duration: "30 min",
      completed: completedModules.includes(5),
      content: {
        introduction: "Le réseautage et la construction d'une communauté engagée sont essentiels pour pérenniser et développer votre business d'affiliation.",
        sections: [
          {
            title: "Créer et animer une communauté",
            content: "Apprenez à créer un espace où votre audience peut échanger, poser des questions et s'entraider.",
            examples: [
              "Groupes Facebook ou Discord",
              "Webinaires réguliers",
              "Newsletters interactives",
              "Sondages et feedbacks"
            ]
          },
          {
            title: "Collaborations et partenariats",
            content: "Développez votre réseau professionnel pour accéder à de nouvelles opportunités.",
            examples: [
              "Interviews croisées avec d'autres affiliés",
              "Co-création de contenu",
              "Partage de ressources et outils",
              "Participation à des événements et conférences"
            ]
          },
          {
            title: "Gestion de la réputation en ligne",
            content: "Maintenez une image positive et gérez les retours négatifs efficacement.",
            examples: [
              "Répondre rapidement aux commentaires",
              "Être transparent et honnête",
              "Utiliser les témoignages clients",
              "Surveiller sa présence en ligne"
            ]
          }
        ],
        exercices: [
          {
            title: "Lancement d'un groupe communautaire",
            description: "Créez un groupe Facebook ou Discord pour votre audience",
            task: "Invitez 10 personnes, publiez 3 contenus engageants et modérez les échanges pendant 2 semaines."
          },
          {
            title: "Plan de collaboration",
            description: "Identifiez 3 partenaires potentiels",
            task: "Contactez-les pour proposer une collaboration (interview, article invité, live) et planifiez une action commune."
          },
          {
            title: "Audit de réputation",
            description: "Analysez votre présence en ligne",
            task: "Recherchez votre nom et marque, notez les avis et commentaires, et préparez un plan pour améliorer votre image."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est un bon moyen d'animer une communauté ?",
          options: [
            "Ignorer les membres",
            "Publier régulièrement du contenu interactif",
            "Limiter les échanges",
            "Ne pas répondre aux questions"
          ],
          correctAnswer: 1,
          explanation: "Publier du contenu interactif encourage la participation et l'engagement."
        },
        {
          question: "Pourquoi faire des partenariats ?",
          options: [
            "Pour élargir son audience et créer des opportunités",
            "Pour copier les autres",
            "Pour éviter de créer du contenu",
            "Pour vendre plus cher"
          ],
          correctAnswer: 0,
          explanation: "Les partenariats permettent d'accéder à de nouvelles audiences et ressources."
        },
        {
          question: "Comment gérer une critique négative en ligne ?",
          options: [
            "Ignorer",
            "Répondre avec agressivité",
            "Répondre rapidement et honnêtement",
            "Supprimer tous les commentaires"
          ],
          correctAnswer: 2,
          explanation: "Répondre rapidement et honnêtement montre votre professionnalisme et peut transformer une critique en opportunité."
        }
      ]
    }
  ];

  const handleModuleComplete = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  };

  const handleQuizComplete = (moduleId: number, passed: boolean) => {
    setQuizResults({ ...quizResults, [moduleId]: passed });
    if (passed) {
      handleModuleComplete(moduleId);
    }
  };

  const progressPercentage = (completedModules.length / modules.length) * 100;

  return (
    <div className="space-y-6">
      {/* En-tête de la formation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-liberty-blue">
                🚀 Starter Pack Débutant
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Les 5 modules fondamentaux pour réussir en affiliation marketing
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              Gratuit
            </Badge>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progression globale</span>
              <span className="text-sm text-muted-foreground">
                {completedModules.length}/{modules.length} modules
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Liste des modules */}
      <div className="grid gap-4">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              activeModule === module.id ? 'ring-2 ring-liberty-blue' : ''
            }`}
            onClick={() => setActiveModule(module.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {module.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                  <div className="flex items-center space-x-2">
                    {module.icon}
                    <span className="font-semibold">Module {module.id}</span>
                  </div>
                </div>
                <Badge variant="outline">{module.duration}</Badge>
              </div>
              <div className="ml-9">
                <h3 className="font-bold text-lg">{module.title}</h3>
                <p className="text-muted-foreground">{module.description}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Contenu du module actif */}
      {activeModule && (
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="exercises">Exercices</TabsTrigger>
                <TabsTrigger value="quiz">QCM</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="mt-6">
                <ModuleContent 
                  module={modules.find(m => m.id === activeModule)!}
                  onComplete={() => handleModuleComplete(activeModule)}
                />
              </TabsContent>
              
              <TabsContent value="exercises" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Exercices pratiques</h3>
                  {modules.find(m => m.id === activeModule)?.content.exercices.map((exercise, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        <CardDescription>{exercise.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{exercise.task}</p>
                        <Button 
                          className="mt-4" 
                          variant="outline"
                          onClick={() => handleModuleComplete(activeModule)}
                        >
                          Marquer comme terminé
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="quiz" className="mt-6">
                <ModuleQuiz 
                  module={modules.find(m => m.id === activeModule)!}
                  onComplete={(passed) => handleQuizComplete(activeModule, passed)}
                  result={quizResults[activeModule]}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StarterPackCourse;
