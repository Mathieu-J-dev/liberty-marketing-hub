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
    exercise?: {
      title: string;
      instructions: string;
      tasks: string[];
      deliverable: string;
    };
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
      title: "Les Fondamentaux de l'Affiliation Marketing",
      description: "Comprendre les bases de l'affiliation",
      icon: <BookOpen className="h-5 w-5" />,
      duration: "45 min",
      completed: completedModules.includes(1),
      content: {
        introduction: "Ce module est la pierre angulaire pour bien comprendre ce qu'est l'affiliation et pourquoi c'est une stratégie si puissante.",
        sections: [
          {
            title: "1.1. Qu'est-ce que l'Affiliation Marketing ?",
            content: "L'affiliation marketing, c'est comme être un apporteur d'affaires. Vous recommandez les produits ou services d'autres entreprises et, si quelqu'un achète grâce à votre recommandation (via un lien unique), vous touchez une commission.",
            examples: [
              "Les acteurs clés : L'affilié (vous !) - Celui qui promeut les produits",
              "Le commerçant / annonceur : L'entreprise qui vend le produit/service",
              "La plateforme d'affiliation (ex: ClickBank, 1TPE) : L'intermédiaire qui gère les liens et les commissions",
              "Le client : Celui qui effectue l'achat",
              "Comment l'affiliation peut augmenter le chiffre d'affaires de 30% en un an avec la Team Affiliates Liberté"
            ]
          },
          {
            title: "1.2. Les Avantages de l'Affiliation Marketing",
            content: "L'affiliation marketing offre de nombreux avantages pour débuter dans le digital sans investissement lourd.",
            examples: [
              "Faible coût de démarrage : Pas besoin d'avoir son propre produit, de gérer un stock ou le service client. Idéal pour débuter avec peu d'investissement",
              "Flexibilité totale : Travailler de n'importe où, à son propre rythme. Excellente option pour un complément de revenu ou une reconversion",
              "Potentiel de revenus passifs : Une fois vos systèmes mis en place (articles de blog, vidéos, etc.), ils peuvent continuer à générer des ventes sans votre intervention constante",
              "Accès à une multitude de produits : Possibilité de promouvoir des produits dans des niches très variées qui vous passionnent"
            ]
          },
          {
            title: "1.3. Les Inconvénients et les Pièges à Éviter",
            content: "Il est important d'avoir une vision réaliste de l'affiliation pour éviter les désillusions.",
            examples: [
              "Nécessite temps et effort : Ce n'est pas de l'argent facile. Il faut construire une audience, créer du contenu de qualité et être persévérant",
              "Dépendance vis-à-vis des autres : Les commissions, les produits et les règles peuvent changer du côté de l'annonceur ou de la plateforme",
              "Risque d'arnaques : Importance de choisir des plateformes et des annonceurs fiables (d'où l'importance de cette formation et de la Team Affiliates Liberté !)",
              "Concurrence : Certaines niches sont très concurrentielles, ce qui demande plus d'efforts pour se démarquer"
            ]
          },
          {
            title: "1.4. Terminologie Essentielle de l'Affiliation",
            content: "Maîtriser le vocabulaire de base est essentiel pour comprendre et réussir en affiliation.",
            examples: [
              "Lien d'affilié : Votre identifiant unique qui permet de suivre vos ventes",
              "Commission : Le pourcentage ou le montant fixe que vous recevez pour chaque vente validée",
              "Cookie : Petit fichier texte placé sur l'ordinateur du visiteur pour suivre son parcours et attribuer la vente à l'affilié (avec une durée de vie spécifique)",
              "Taux de conversion : Le pourcentage de visiteurs qui effectuent l'action désirée (achat, inscription, etc.) après avoir cliqué sur votre lien",
              "Niche : Un segment spécifique et ciblé du marché (ex: 'matériel de camping léger', 'recettes végétaliennes rapides')"
            ]
          }
        ],
        exercise: {
          title: "Ma première recherche d'affilié dans mon quotidien",
          instructions: "Objectif : Comprendre le concept d'affiliation dans des situations réelles et identifier les acteurs clés.",
          tasks: [
            "Liste tes préférés : Réfléchis à 3 à 5 produits ou services que tu utilises régulièrement et que tu apprécies sincèrement. Pense à des choses que tu recommandes déjà naturellement (logiciel de productivité, marque de café, site de streaming, cours en ligne, application mobile, etc.)",
            "Recherche de programme d'affiliation : Pour chacun, effectue une recherche Google avec des requêtes comme '[Nom du produit/service] programme affiliation', '[Nom de l'entreprise] affilié', 'Devenir partenaire [Nom de l'entreprise]'",
            "Identification des acteurs : Si tu trouves un programme, essaye d'identifier qui serait l'annonceur, s'il y a une plateforme d'affiliation tierce (comme Awin, Partnerize), et le modèle de rémunération",
            "Réflexion : Pourquoi penses-tu que cette entreprise propose un programme d'affiliation ? Quels seraient les avantages et inconvénients de promouvoir ce type de produit pour toi ?"
          ],
          deliverable: "Un court document (texte, tableau simple) listant les 3-5 produits/services, le résultat de la recherche d'affiliation (oui/non), les acteurs identifiés, le modèle de rémunération (si trouvé) et une brève réflexion."
        }
      },
      quiz: [
        {
          question: "Quel est le rôle principal de l'affilié en marketing d'affiliation ?",
          options: [
            "Vendre ses propres produits en ligne directement aux clients",
            "Créer de nouveaux produits et services pour les annonceurs",
            "Promouvoir les produits ou services d'autres entreprises et toucher une commission",
            "Gérer le service client et les retours produits pour les annonceurs"
          ],
          correctAnswer: 2,
          explanation: "L'affilié agit comme un apporteur d'affaires en recommandant des produits d'autres entreprises et en touchant une commission sur les ventes générées via son lien unique."
        },
        {
          question: "L'un des principaux avantages de l'affiliation marketing est :",
          options: [
            "La gestion complexe des stocks et de la logistique",
            "Le besoin d'un investissement initial très élevé",
            "Sa flexibilité et le faible coût de démarrage",
            "La garantie de revenus passifs dès le premier jour"
          ],
          correctAnswer: 2,
          explanation: "L'affiliation permet de démarrer avec un faible coût, sans besoin de créer de produit ou gérer des stocks, offrant une grande flexibilité de travail."
        },
        {
          question: "Qu'est-ce qu'un 'lien d'affilié' ?",
          options: [
            "Un lien générique vers n'importe quelle page web",
            "Un lien unique qui permet de suivre les ventes et d'attribuer la commission à l'affilié",
            "Un lien pour s'abonner à une newsletter uniquement",
            "Un lien vers le profil de l'affilié sur les réseaux sociaux"
          ],
          correctAnswer: 1,
          explanation: "Le lien d'affilié est un lien tracké unique qui permet d'identifier les ventes générées par chaque affilié et d'attribuer les commissions correspondantes."
        },
        {
          question: "Lorsqu'un client clique sur votre lien d'affilié et achète le produit, comment appelle-t-on cette action réussie ?",
          options: [
            "Un 'clic'",
            "Une 'impression'",
            "Une 'conversion'",
            "Une 'commission'"
          ],
          correctAnswer: 2,
          explanation: "Une conversion désigne l'action souhaitée accomplie par un visiteur, dans ce cas un achat suite au clic sur le lien d'affilié."
        }
      ]
    },
    {
      id: 2,
      title: "Les Différents Types de Programmes d'Affiliation",
      description: "Comprendre les modèles de rémunération",
      icon: <DollarSign className="h-5 w-5" />,
      duration: "35 min",
      completed: completedModules.includes(2),
      content: {
        introduction: "Ce module va explorer les principaux modèles de rémunération en affiliation, en soulignant leurs spécificités, leurs avantages, leurs inconvénients, et des exemples concrets, tout en les rattachant aux réalités actuelles du marché.",
        sections: [
          {
            title: "2.1. Le Programme au Coût Par Vente (CPV) / Commission par Vente (CPA)",
            content: "C'est le modèle le plus courant. L'affilié touche une commission uniquement lorsqu'une vente est générée grâce à son lien unique. Le client achète un produit ou un service, et vous recevez un pourcentage du prix de vente ou un montant fixe. En 2025, ce modèle reste le plus stable et le plus rémunérateur pour les affiliés qui génèrent du trafic qualifié.",
            examples: [
              "Avantages : Potentiel de revenus élevés (surtout pour les produits chers), clarté de la rémunération, sentiment d'apporter une vraie valeur",
              "Inconvénients : Demande un trafic très qualifié (conversion plus difficile), risque zéro si pas de vente",
              "Amazon Partenaires : Produits physiques (électronique, mode, maison) avec commissions variables selon catégories",
              "ClickBank & Hotmart : Produits numériques (formations en ligne, e-books, logiciels) avec commissions 30-75%",
              "Programmes SaaS : Outils comme Semrush, Ahrefs, Systeme.io, Shopify avec commissions récurrentes sur abonnements"
            ]
          },
          {
            title: "2.2. Le Programme au Coût Par Action (CPA) / Coût Par Lead (CPL)",
            content: "L'affilié est rémunéré lorsqu'un utilisateur effectue une action spécifique qui n'est pas nécessairement un achat. Cela peut être une inscription à une newsletter, le téléchargement d'une application, la participation à un sondage, la demande d'un devis, ou l'ouverture d'un compte. En 2025, le CPA/CPL est de plus en plus valorisé par les entreprises.",
            examples: [
              "Avantages : Plus facile de générer des conversions (l'action est moins engageante qu'un achat), idéal pour construire une liste d'emails",
              "Inconvénients : Commissions souvent plus faibles que le CPV, la qualité du lead est primordiale",
              "Services financiers : Rémunération pour demande de devis, simulation de prêt, ouverture de compte bancaire",
              "Jeux en ligne et applications mobiles : Rémunération pour installation d'application ou inscription",
              "Sites de rencontre : Commissions pour inscription gratuite ou essai d'abonnement",
              "Génération de leads B2B : Paiement pour chaque entreprise demandant une démo d'un logiciel CRM"
            ]
          },
          {
            title: "2.3. Le Programme au Coût Par Clic (CPC) ou Coût Par Impression (CPM)",
            content: "L'affilié est rémunéré chaque fois qu'un utilisateur clique sur une publicité (CPC) ou pour chaque mille impressions d'une publicité (CPM). En 2025, ces modèles sont moins typiques de l'affiliation directe et plus souvent associés à la publicité en ligne (Google AdSense, YouTube).",
            examples: [
              "Avantages : Facile à générer des clics/impressions, ne demande pas d'achat complexe",
              "Inconvénients : Rémunération très faible, ne récompense pas la valeur générée mais seulement la visibilité",
              "Note : Ces modèles sont rares en affiliation pure car ils ne garantissent pas de résultat à l'annonceur"
            ]
          },
          {
            title: "2.4. Le Programme Récurrent ou à Vie (Lifetime Commission)",
            content: "L'affilié touche une commission non seulement sur la première vente, mais aussi sur tous les paiements futurs effectués par le client qu'il a apporté (abonnements, renouvellements, achats additionnels). C'est le Saint Graal de l'affiliation et le modèle à privilégier pour construire des revenus passifs stables et croissants.",
            examples: [
              "Avantages : Création de revenus véritablement passifs et exponentiels sur le long terme, moins de pression pour acquérir constamment de nouveaux clients",
              "Inconvénients : Les premières commissions peuvent être faibles, demande de la patience, dépend de la rétention client",
              "Logiciels et services SaaS : Outils d'email marketing, plateformes de création de sites, logiciels de gestion",
              "Abonnements à des plateformes de contenu : Plateformes de fitness, méditation, cours de langue",
              "Programmes de membership : Accès à des communautés privées, contenus exclusifs"
            ]
          }
        ],
        exercise: {
          title: "Analyse de Programmes d'Affiliation par Type",
          instructions: "Objectif : Apprendre à identifier concrètement les différents modèles de rémunération et à évaluer leur pertinence pour diverses niches.",
          tasks: [
            "Choix de niches : Sélectionne 3 niches différentes qui t'intéressent (ex: fitness à domicile, développement personnel, outils de marketing digital, mode éthique, jeux vidéo indépendants)",
            "Recherche de programmes : Pour chaque niche, recherche un programme au Coût Par Vente (CPV) ou avec commission récurrente (ex: logiciels SaaS, formations en ligne, produits Amazon) ET un programme au Coût Par Action (CPA) ou Coût Per Lead (CPL) (ex: services financiers, assurances, jeux gratuits avec inscription)",
            "Analyse et justification : Pour chaque programme trouvé, décris brièvement le produit/service, identifie clairement le type de rémunération (CPV, CPL, Récurrent), et évalue le potentiel de ce programme pour toi dans cette niche"
          ],
          deliverable: "Un tableau ou document structuré pour chaque niche, détaillant les programmes trouvés, leur type de rémunération et une brève analyse de leur potentiel."
        }
      },
      quiz: [
        {
          question: "Dans un programme d'affiliation au 'Coût Par Vente' (CPV), quand êtes-vous rémunéré ?",
          options: [
            "Chaque fois qu'un utilisateur clique sur votre lien",
            "Chaque fois qu'un utilisateur voit la publicité sur votre site",
            "Chaque fois qu'un client achète un produit ou service via votre lien",
            "Chaque fois qu'un utilisateur remplit un formulaire d'inscription"
          ],
          correctAnswer: 2,
          explanation: "Le Coût Par Vente (CPV) signifie que vous êtes rémunéré uniquement lorsqu'une vente effective est réalisée grâce à votre lien d'affiliation."
        },
        {
          question: "Quel type de programme d'affiliation est idéal pour générer des revenus passifs sur le long terme grâce aux abonnements des clients que vous avez apportés ?",
          options: [
            "Le Coût Par Clic (CPC)",
            "Le Coût Par Lead (CPL)",
            "Le programme à commission récurrente ou à vie",
            "Le Coût Par Impression (CPM)"
          ],
          correctAnswer: 2,
          explanation: "Les programmes à commission récurrente ou à vie permettent de toucher des commissions mensuelles tant que le client reste abonné, créant ainsi un véritable revenu passif."
        },
        {
          question: "Si vous êtes rémunéré pour chaque utilisateur qui s'inscrit à une newsletter gratuite via votre lien, quel est le type de programme le plus probable ?",
          options: [
            "Coût Par Vente (CPV)",
            "Coût Par Lead (CPL) ou Coût Par Action (CPA)",
            "Coût Par Clic (CPC)",
            "Commission récurrente"
          ],
          correctAnswer: 1,
          explanation: "Le Coût Par Lead (CPL) rémunère l'affilié pour chaque inscription ou action spécifique (comme s'inscrire à une newsletter), sans nécessiter d'achat."
        },
        {
          question: "Parmi les plateformes suivantes, laquelle est principalement spécialisée dans les produits physiques ?",
          options: [
            "ClickBank",
            "Hotmart",
            "Amazon Partenaires",
            "1TPE"
          ],
          correctAnswer: 2,
          explanation: "Amazon Partenaires est spécialisé dans les produits physiques avec des millions de références, alors que ClickBank et Hotmart se concentrent sur les produits numériques."
        }
      ]
    },
    {
      id: 3,
      title: "Comment Choisir sa Niche et les Produits à Promouvoir",
      description: "Identifier les opportunités rentables",
      icon: <Target className="h-5 w-5" />,
      duration: "50 min",
      completed: completedModules.includes(3),
      content: {
        introduction: "Ce module est absolument crucial car une niche bien choisie et des produits pertinents sont les fondations d'un succès durable en affiliation. On va voir comment identifier les opportunités, analyser le marché, et s'assurer que l'on propose des produits qui résonnent vraiment avec son audience.",
        sections: [
          {
            title: "3.1. L'Importance Cruciale du Choix de la Niche en 2025",
            content: "La niche est le socle de toute l'activité d'affiliation. Une niche bien définie permet de cibler précisément une audience, de créer du contenu pertinent, de se positionner comme une autorité et de réduire la concurrence généraliste. En 2025, avec l'explosion de l'information, se spécialiser est plus important que jamais.",
            examples: [
              "Passion ou Intérêt : Choisir un sujet qui vous intéresse rend le travail plus agréable, authentique et durable",
              "Potentiel de Rémunération : La niche doit contenir des produits avec des commissions intéressantes et un volume de ventes suffisant",
              "Problème à Résoudre : Les meilleures niches répondent à un besoin clair, une douleur ou un désir profond de l'audience",
              "Taille d'Audience : Assez grande pour être rentable, mais pas trop large pour éviter une concurrence écrasante",
              "Tendances Actuelles : Évaluer si la niche est stable, en croissance (IA, durabilité, bien-être numérique, apprentissage en ligne)"
            ]
          },
          {
            title: "3.2. Méthodes et Outils pour Identifier une Niche Rentable",
            content: "Il existe plusieurs approches pour trouver une niche rentable, combinant réflexion personnelle et analyse de données de marché.",
            examples: [
              "Réflexion Personnelle : Liste des passions, hobbies, compétences, problèmes que vous avez résolus",
              "Google Trends : Indispensable pour visualiser l'intérêt d'un sujet au fil du temps et repérer les tendances émergentes",
              "Recherche de Mots-clés : Ubersuggest, Semrush, Ahrefs permettent d'identifier les mots-clés recherchés, leur volume mensuel, la difficulté de positionnement",
              "Google Suggestions : Sources gratuites pour trouver des idées de sujets et de problèmes",
              "Forums, Groupes Facebook, Reddit, TikTok, YouTube : Où les gens discutent de leurs problèmes et besoins réels"
            ]
          },
          {
            title: "3.3. Comment Analyser la Concurrence dans une Niche",
            content: "Analyser la concurrence vous permet d'identifier les opportunités et de définir votre positionnement unique.",
            examples: [
              "Identifier les Concurrents : Qui sont déjà présents ? Quels types de contenu proposent-ils (blogs, vidéos, réseaux sociaux) ?",
              "Semrush / Ahrefs : Voir les mots-clés sur lesquels ils se positionnent, d'où vient leur trafic, et quels sont leurs backlinks",
              "Audit de Contenu : Quel type de contenu génère le plus d'engagement ? Les lacunes qu'on peut combler ?",
              "Positionnement Unique : Comment vous différencier ? Nouvelle perspective, sous-segment plus précis (micro-niche), style unique, valeur ajoutée particulière"
            ]
          },
          {
            title: "3.4. Choisir les Bons Produits à Promouvoir dans sa Niche",
            content: "La cohérence entre les produits promus et votre niche est essentielle pour maintenir votre crédibilité.",
            examples: [
              "Qualité du Produit : Ne jamais promouvoir un produit que vous ne recommanderiez pas à un ami. Rechercher les avis clients, tester si possible",
              "Taux de Commission et LTV : Privilégier les commissions généreuses, surtout les modèles récurrents ou produits à LTV élevée",
              "Taux de Conversion : Une belle commission ne sert à rien si la page de vente ne convertit pas. Vérifier qu'elle est professionnelle et convaincante",
              "Matériel Marketing Fourni : L'annonceur fournit-il des bannières, emails pré-rédigés, exemples de contenu ?",
              "Durée du Cookie : Plus longue = plus de chances de toucher la commission si achat ultérieur",
              "Support Affilié : L'annonceur est-il réactif et offre-t-il un bon support ?"
            ]
          },
          {
            title: "3.5. Stratégies Avancées de Sélection de Produits en 2025",
            content: "Pour maximiser vos revenus, adoptez une approche stratégique et dynamique dans le choix de vos produits.",
            examples: [
              "Construire un Entonnoir de Produits : Proposer des produits complémentaires à différentes étapes (produit d'appel gratuit/faible coût, produit principal, produits premium/récurrents)",
              "Test & Mesure : Tester différents produits, analyser les performances (taux de clic, conversion) et ajuster",
              "Diversification : Ne pas mettre tous ses œufs dans le même panier. Diversifier programmes et annonceurs pour minimiser les risques"
            ]
          }
        ],
        exercise: {
          title: "Ma Niche Cible & Mes Premiers Produits Stratégiques",
          instructions: "Objectif : Mettre en pratique les méthodes de recherche de niche et de produits, et commencer à esquisser sa propre stratégie.",
          tasks: [
            "Définition de ta Niche : Revise les passions et problèmes identifiés. Utilise Google Trends pour valider l'intérêt et la tendance de 3-5 idées de niches. Utilise Ubersuggest ou Google Keyword Planner pour identifier au moins 5 mots-clés pertinents avec volume de recherche suffisant",
            "Description de ta niche : Sois précis (ex: 'Conseils pour jeunes parents entrepreneurs qui veulent gérer leur temps' plutôt que juste 'parentalité'). Justifie ce choix en fonction de la demande et de ta passion/expertise",
            "Sélection des Premiers Produits : Pour ta niche, recherche sur au moins deux plateformes d'affiliation (Amazon, ClickBank, 1TPE, Hotmart) au moins 3 produits/services parfaitement adaptés",
            "Analyse des produits : Pour chacun, décris son nom et catégorie, le type de programme (CPV, CPA, Récurrent), les raisons pour lesquelles il est pertinent, et s'il s'agit d'un produit d'appel, cœur de gamme ou premium/récurrent"
          ],
          deliverable: "Un document détaillé présentant la niche choisie avec justification (mots-clés, tendances), et la liste des 3 produits potentiels avec leur analyse et positionnement."
        }
      },
      quiz: [
        {
          question: "Pourquoi le choix de la niche est-il considéré comme crucial en marketing d'affiliation en 2025 ?",
          options: [
            "Il garantit des revenus immédiats et élevés",
            "Il permet de se positionner comme une autorité et de cibler précisément une audience",
            "Il élimine toute concurrence sur le marché",
            "Il n'est pertinent que pour les produits physiques"
          ],
          correctAnswer: 1,
          explanation: "Une niche bien choisie permet de créer du contenu pertinent, de se positionner comme une autorité dans un domaine spécifique, et de cibler précisément une audience qualifiée, surtout crucial en 2025 avec l'explosion de l'information."
        },
        {
          question: "Quel outil est le plus utile pour évaluer la popularité d'un sujet (niche) au fil du temps et repérer des tendances de recherche ?",
          options: [
            "Instagram Stories",
            "Google Trends",
            "Facebook Ads Manager",
            "Microsoft Word"
          ],
          correctAnswer: 1,
          explanation: "Google Trends est un outil gratuit indispensable qui permet de visualiser l'intérêt d'un sujet au fil du temps et d'identifier les tendances émergentes ou déclinantes."
        },
        {
          question: "Lors du choix d'un produit à promouvoir, quel critère est le plus important pour bâtir une réputation solide à long terme ?",
          options: [
            "Le taux de commission le plus élevé, quelle que soit la qualité",
            "La durée du cookie la plus longue",
            "La qualité et la pertinence du produit pour l'audience",
            "La quantité de matériel marketing fourni par l'annonceur"
          ],
          correctAnswer: 2,
          explanation: "La qualité et la pertinence du produit sont essentielles pour maintenir votre crédibilité et bâtir une réputation solide. Ne promouvoir que des produits que vous recommanderiez à un ami est la clé du succès à long terme."
        },
        {
          question: "En 2025, pourquoi les 'programmes récurrents' (abonnement) sont-ils particulièrement valorisés par les affiliés ?",
          options: [
            "Ils offrent des commissions uniques très élevées",
            "Ils permettent de générer des revenus passifs stables sur le long terme",
            "Ils ne nécessitent aucun effort de promotion après la première vente",
            "Ils sont uniquement disponibles pour les produits physiques"
          ],
          correctAnswer: 1,
          explanation: "Les programmes récurrents permettent de toucher des commissions mensuelles tant que le client reste abonné, créant ainsi des revenus passifs stables et croissants sur le long terme, sans devoir constamment acquérir de nouveaux clients."
        }
      ]
    },
    {
      id: 4,
      title: "Les Stratégies pour Générer du Trafic",
      description: "Attirer des visiteurs qualifiés vers vos liens",
      icon: <Users className="h-5 w-5" />,
      duration: "90 min",
      completed: completedModules.includes(4),
      content: {
        introduction: "En 2025, générer du trafic ne se résume plus à de simples mots-clés. Il s'agit de comprendre les intentions de l'utilisateur, d'offrir de la valeur et de se positionner là où son audience se trouve. Ce module explore les méthodes les plus efficaces pour attirer des visiteurs qualifiés.",
        sections: [
          {
            title: "4.1. Comprendre le Trafic Qualifié : La Clé du Succès",
            content: "Le trafic qualifié n'est pas juste le volume de visiteurs, mais la pertinence de ces visiteurs. Un trafic qualifié est composé de personnes déjà intéressées par ce que vous proposez, donc plus susceptibles de convertir. 100 visiteurs ultra-ciblés sont plus précieux que 10 000 visiteurs aléatoires.",
            examples: [
              "Pourquoi la qualité prime sur la quantité : Évite de gaspiller du temps et de l'argent",
              "L'intention de recherche en 2025 : Comprendre l'état d'esprit de l'utilisateur (recherche d'information, comparaison, intention d'achat)",
              "Les stratégies doivent s'adapter à cette intention pour maximiser les conversions"
            ]
          },
          {
            title: "4.2. Stratégies de Trafic Organique (Gratuit) : Long Terme",
            content: "Ces méthodes demandent du temps et de l'effort, mais offrent un retour sur investissement durable et construisent votre autorité.",
            examples: [
              "SEO (Search Engine Optimization) : Recherche de mots-clés approfondie avec Semrush, Ahrefs, Ubersuggest. Cibler les mots-clés à longue traîne. Créer du contenu de valeur (articles, comparatifs, tutoriels). Optimisation On-Page (H1, H2, meta descriptions, vitesse). Netlinking pour renforcer l'autorité",
              "Marketing de Contenu (Blogs, Guides) : Calendrier éditorial planifié. Produire formats variés (articles, guides téléchargeables, infographies). Appels à l'action clairs. Promouvoir le contenu",
              "Marketing Vidéo (YouTube, TikTok, Reels) : YouTube pour revues détaillées, TikTok/Reels pour vidéos courtes. Créer des scénarios structurés. Optimiser titres, descriptions, vignettes. Interagir avec l'audience",
              "Réseaux Sociaux : Choisir les bonnes plateformes selon l'audience. Publier régulièrement (mix informatif, divertissant, promotionnel). Engager avec la communauté. Utiliser fonctionnalités affiliées (liens bio, stories)",
              "Email Marketing : Construire une liste via lead magnet. Choisir un auto-répondeur (ConvertKit, Mailchimp, Systeme.io). Écrire séquences alternant contenu et promotions. Segmenter la liste"
            ]
          },
          {
            title: "4.3. Stratégies de Trafic Payant (Publicité) : Accélérer",
            content: "Ces méthodes nécessitent un budget mais peuvent générer des résultats rapides si bien gérées.",
            examples: [
              "Google Ads (Search & Display) : Rechercher mots-clés d'achat spécifiques ('acheter logiciel X', 'avis produit Y'). Créer annonces pertinentes. Landing page optimisée (page de pré-vente souvent meilleure). Suivi et optimisation (coût par clic, taux de conversion)",
              "Publicité sur Réseaux Sociaux (Facebook/Instagram Ads, TikTok Ads, LinkedIn Ads) : Définir audience cible avec outils de ciblage avancés. Créer visuels et textes captivants. A/B Testing pour optimiser. Pixel de suivi pour retargeting",
              "Pertinence 2025 : Contenus vidéo courts et engageants dominent. Transparence sur publicités de plus en plus exigée"
            ]
          }
        ],
        exercise: {
          title: "Mon Plan d'Action Trafic Mixte (Organique & Payant)",
          instructions: "Objectif : Planifier concrètement les premières actions pour attirer du trafic qualifié vers les offres d'affiliation.",
          tasks: [
            "Trafic Organique (choisis 2 stratégies) : Choisis deux stratégies parmi SEO, Marketing de Contenu, YouTube, Réseaux Sociaux, Email Marketing",
            "Pour chaque stratégie, décris un mini-plan d'action pour les 2 prochains mois : Objectif (ex: 'Publier 4 articles de blog optimisés SEO' ou 'Créer 6 vidéos courtes sur TikTok/Reels'), Type de contenu (précise thèmes et formats), Comment intégrer les liens d'affiliation (ex: 'Dans des comparatifs, avec CTA clairs')",
            "Trafic Payant (si budget disponible) : Si tu as un budget, choisis une plateforme (Google Ads, Facebook/Instagram Ads, TikTok Ads). Décris une idée de campagne simple : Audience Cible, Message Clé de l'Annonce, Type de Publicité (texte, image, vidéo), Où va diriger le lien",
            "Cohérence & Complémentarité : Explique comment ces stratégies vont se compléter pour maximiser tes résultats"
          ],
          deliverable: "Un document détaillant le plan d'action pour les stratégies organiques (avec exemples de contenu et intégration des liens) et une proposition de campagne de trafic payant (si applicable), soulignant la complémentarité des approches."
        }
      },
      quiz: [
        {
          question: "Pourquoi est-il plus important de générer du 'trafic qualifié' que du 'grand volume de trafic' en affiliation ?",
          options: [
            "Le trafic qualifié est toujours gratuit",
            "Le trafic qualifié est composé de visiteurs plus susceptibles de convertir",
            "Le grand volume de trafic est toujours illégal",
            "Le trafic qualifié ne nécessite aucune création de contenu"
          ],
          correctAnswer: 1,
          explanation: "Le trafic qualifié désigne des visiteurs déjà intéressés par ce que vous proposez, donc beaucoup plus susceptibles de convertir et d'acheter. 100 visiteurs ciblés valent mieux que 10 000 visiteurs aléatoires."
        },
        {
          question: "Quel outil est le plus efficace pour identifier les questions que se posent les utilisateurs et les mots-clés à longue traîne pour le SEO en 2025 ?",
          options: [
            "Un simple tableur Excel",
            "Des outils comme Semrush ou Ahrefs",
            "Un éditeur d'images",
            "Un logiciel de montage vidéo"
          ],
          correctAnswer: 1,
          explanation: "Semrush et Ahrefs sont des outils professionnels qui permettent d'identifier les mots-clés recherchés, leur volume, la difficulté de positionnement, et les questions que se posent les utilisateurs dans votre niche."
        },
        {
          question: "Quel est l'un des principaux avantages du marketing par e-mail en affiliation ?",
          options: [
            "Il ne coûte absolument rien en temps ou en argent",
            "Il garantit que tous les emails sont lus et génèrent des ventes immédiates",
            "Il permet de construire une relation forte et de ne pas dépendre des algorithmes des plateformes",
            "Il est le meilleur moyen de générer du trafic instantané sans effort"
          ],
          correctAnswer: 2,
          explanation: "L'email marketing permet de construire une liste qui vous appartient (contrairement aux réseaux sociaux), créant une relation directe avec votre audience sans dépendre des algorithmes changeants des plateformes."
        },
        {
          question: "Si vous souhaitez capter des utilisateurs qui recherchent activement un produit ou une solution spécifique, quelle stratégie de trafic payant est généralement la plus pertinente ?",
          options: [
            "Les publicités sur TikTok",
            "Les publicités Google Ads (Search Ads)",
            "Les posts sponsorisés sur Instagram",
            "L'achat de followers sur les réseaux sociaux"
          ],
          correctAnswer: 1,
          explanation: "Google Ads (Search Ads) permet de cibler des personnes qui recherchent activement des mots-clés spécifiques liés à votre produit, capturant ainsi des visiteurs avec une forte intention d'achat."
        }
      ]
    },
    {
      id: 5,
      title: "Les Outils Indispensables pour un Affilié Débutant",
      description: "Votre kit de démarrage économique",
      icon: <Zap className="h-5 w-5" />,
      duration: "60 min",
      completed: completedModules.includes(5),
      content: {
        introduction: "En 2025, il existe une multitude d'outils, mais la clé est de se concentrer sur l'essentiel pour démarrer efficacement. Nous allons privilégier les options gratuites ou à faible coût, avec des conseils clairs sur leur utilisation.",
        sections: [
          {
            title: "5.1. La Fondation : Votre Site Web ou Blog",
            content: "Avoir votre propre espace est crucial pour asseoir votre crédibilité, centraliser votre contenu et vos liens, et construire votre propre actif numérique qui ne dépend pas des plateformes de réseaux sociaux.",
            examples: [
              "WordPress.org (Gratuit) : La plateforme la plus populaire au monde. Le logiciel est gratuit, il vous faut juste un hébergement. Très flexible et personnalisable. Idéal pour blogs, sites d'avis, sites de comparaison",
              "Hébergeurs Web Économiques (2-5€/mois) : Hostinger - Forfaits mutualisés très abordables pour débuter. Permet d'héberger votre site WordPress. Choisir un avec support client réactif et installation WordPress en un clic"
            ]
          },
          {
            title: "5.2. La Recherche de Niche et de Mots-Clés",
            content: "Pour comprendre ce que votre audience recherche et identifier les sujets sur lesquels créer du contenu pour attirer du trafic organique.",
            examples: [
              "Google Trends (Gratuit) : Suivi des tendances de recherche, comparaison de mots-clés. Entrez des idées de niche/produits et voyez leur popularité au fil du temps. Idéal pour valider l'intérêt d'un sujet",
              "Google Keyword Planner (Gratuit avec compte Google Ads) : Fournit estimations de volumes de recherche et idées de mots-clés. Créez un compte Google Ads (pas besoin de lancer campagnes), explorez des idées de mots-clés",
              "Ubersuggest (Version Gratuite Limitée) : Analyse de mots-clés, idées de contenu, analyse de concurrence. Version gratuite pour obtenir idées de mots-clés, volumes de recherche et suggestions de contenu. Suffisant pour premières recherches"
            ]
          },
          {
            title: "5.3. La Création de Contenu",
            content: "Pour produire des articles de blog, des scripts vidéo, des descriptions engageantes qui informent et convertissent votre audience.",
            examples: [
              "Google Docs (Gratuit) : Pour rédaction de tous contenus écrits. Simplicité et collaboration facile, idéal pour structurer articles et scripts",
              "Canva (Version Gratuite) : Création de visuels pour articles, vignettes YouTube, posts réseaux sociaux. Nombreux modèles gratuits pour designs attrayants sans compétences graphiques",
              "CapCut (Gratuit) / DaVinci Resolve (Version Gratuite) : Montage vidéo. CapCut parfait pour montages rapides mobile/ordinateur pour TikTok/Reels/Shorts. DaVinci Resolve plus avancé pour vidéos YouTube complexes",
              "ChatGPT / Gemini / Copilot (Versions Gratuites) : Assistant à la rédaction, génération d'idées de titres, de plans d'articles, de descriptions. Brainstormer sujets, reformuler phrases, obtenir premier jet (toujours relire et vérifier)"
            ]
          },
          {
            title: "5.4. L'Email Marketing",
            content: "Pour construire une relation durable avec votre audience, envoyer des offres ciblées et diversifier vos sources de trafic, sans dépendre des algorithmes des réseaux sociaux.",
            examples: [
              "Systeme.io (Version Gratuite jusqu'à 2000 contacts) : Plateforme tout-en-un pour créer pages de capture, gérer liste email, envoyer newsletters et créer tunnels de vente simples. Idéal pour construire liste d'emails dès le début sans frais. Facile à prendre en main",
              "Mailchimp (Version Gratuite jusqu'à 500 contacts) : Alternative populaire pour débuter l'email marketing"
            ]
          },
          {
            title: "5.5. Suivi et Analyse",
            content: "Pour savoir ce qui fonctionne (ou pas) et optimiser vos stratégies pour générer plus de ventes.",
            examples: [
              "Google Analytics 4 (Gratuit) : Analyse du trafic de votre site web (nombre de visiteurs, pages vues, source du trafic, comportement). Indispensable pour comprendre qui visite votre site et ce qu'il y fait. Demande un peu de configuration initiale",
              "Tableurs (Google Sheets / Excel) : Suivi manuel de vos commissions, des produits promus, des dates de paiement. Créez un tableau simple pour suivre revenus et dépenses d'affiliation"
            ]
          }
        ],
        exercise: {
          title: "Mon Kit de Démarrage Affilié Opérationnel",
          instructions: "Objectif : Prendre en main les outils essentiels pour démarrer son activité d'affiliation de manière efficace et économique.",
          tasks: [
            "Sélection et Inscription/Installation : Pour chaque catégorie d'outils (Site Web, Recherche Mots-clés, Création Contenu, Email Marketing, Suivi), choisis au moins un outil recommandé (privilégie versions gratuites) et procède à son inscription ou installation",
            "Site Web : Inscris-toi chez un hébergeur économique et installe WordPress. Recherche Mots-clés : Active ton accès à Google Trends et Google Keyword Planner ou Ubersuggest gratuit. Création Contenu : Accède à Canva gratuit et au moins un outil d'IA (ChatGPT, Gemini, Copilot). Email Marketing : Crée un compte gratuit sur Systeme.io ou Mailchimp. Suivi : Assure-toi d'avoir accès à Google Sheets ou Excel",
            "Première Action Concrète avec chaque Outil : Site Web - Crée page d'accueil ou brouillon d'article. Recherche Mots-clés - Effectue recherche sur 3 mots-clés et note volumes. Création Contenu - Crée vignette simple ou utilise IA pour 3 idées de titres. Email Marketing - Crée première liste et page de capture simple. Suivi - Crée tableau avec colonnes Date, Produit promu, Plateforme, Commission, Statut",
            "Ton Rapport d'Utilisation Personnel : Pour chaque outil, écris quelques lignes sur : le nom de l'outil, l'action spécifique réalisée, tes premières impressions sur facilité d'utilisation, points forts et défis rencontrés"
          ],
          deliverable: "Un rapport structuré (texte ou tableau) avec la liste des outils configurés, la description de la première action réalisée avec chacun, et tes premières impressions/retours d'expérience. Captures d'écran facultatives mais recommandées."
        }
      },
      quiz: [
        {
          question: "Quel outil est la plateforme de création de sites web la plus recommandée pour un affilié débutant souhaitant créer un blog et avoir un contrôle total, en étant gratuite (logiciel) ?",
          options: [
            "Wix",
            "WordPress.org",
            "Squarespace",
            "Shopify"
          ],
          correctAnswer: 1,
          explanation: "WordPress.org est la plateforme la plus populaire et flexible pour créer un blog. Le logiciel est gratuit (vous payez seulement l'hébergement), et il offre un contrôle total sur votre site."
        },
        {
          question: "Si un affilié veut comprendre ce que son audience recherche et suivre les tendances populaires au fil du temps sans dépenser d'argent, quel outil gratuit doit-il privilégier ?",
          options: [
            "Semrush",
            "Google Trends",
            "Ahrefs",
            "Adobe Photoshop"
          ],
          correctAnswer: 1,
          explanation: "Google Trends est un outil gratuit qui permet de visualiser l'intérêt d'un sujet au fil du temps et de comparer des mots-clés, idéal pour identifier les tendances et valider l'intérêt d'une niche."
        },
        {
          question: "Pour un affilié débutant qui souhaite collecter des emails et envoyer des newsletters sans frais initiaux pour un petit nombre de contacts, quelle plateforme tout-en-un est recommandée ?",
          options: [
            "ActiveCampaign",
            "ConvertKit",
            "Systeme.io (version gratuite)",
            "HubSpot"
          ],
          correctAnswer: 2,
          explanation: "Systeme.io offre une version gratuite jusqu'à 2000 contacts, permettant de créer des pages de capture, gérer sa liste email et envoyer des newsletters, tout-en-un et en français."
        },
        {
          question: "Quel est l'intérêt principal d'utiliser Google Analytics 4 pour un affilié ?",
          options: [
            "Créer des logos et des bannières publicitaires",
            "Modifier des vidéos pour les réseaux sociaux",
            "Analyser le trafic de son site web et le comportement des visiteurs",
            "Gérer les paiements des commissions d'affiliation"
          ],
          correctAnswer: 2,
          explanation: "Google Analytics 4 est un outil d'analyse gratuit qui permet de comprendre qui visite votre site, d'où vient le trafic, quelles pages sont consultées, et comment optimiser votre stratégie en fonction des données."
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

  const progress = (completedModules.length / modules.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Starter Pack Affi-Liberty
        </h1>
        <p className="text-muted-foreground">
          Maîtrisez les fondamentaux de l'affiliation marketing en 5 modules pratiques
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Votre Progression</CardTitle>
          <CardDescription>
            {completedModules.length} module{completedModules.length > 1 ? 's' : ''} terminé{completedModules.length > 1 ? 's' : ''} sur {modules.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% complété</p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {modules.map((module) => (
                <Button
                  key={module.id}
                  variant={activeModule === module.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveModule(module.id)}
                >
                  <span className="mr-2">{module.icon}</span>
                  <span className="flex-1 text-left truncate">{module.title}</span>
                  {completedModules.includes(module.id) ? (
                    <CheckCircle className="h-5 w-5 text-success ml-2 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground ml-2 flex-shrink-0" />
                  )}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {modules
            .filter((module) => module.id === activeModule)
            .map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {module.icon}
                        <Badge variant="secondary">{module.duration}</Badge>
                      </div>
                      <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
                      <CardDescription className="text-base">
                        {module.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="content">Contenu</TabsTrigger>
                      <TabsTrigger value="exercise">Exercices</TabsTrigger>
                      <TabsTrigger value="quiz">QCM</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="mt-6">
                      <ModuleContent
                        module={module}
                        onComplete={() => handleModuleComplete(module.id)}
                      />
                    </TabsContent>

                    <TabsContent value="exercise" className="mt-6">
                      {module.content.exercise ? (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold mb-3">
                              {module.content.exercise.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {module.content.exercise.instructions}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Consignes détaillées :</h4>
                            <ol className="space-y-3 list-decimal list-inside">
                              {module.content.exercise.tasks.map((task, index) => (
                                <li key={index} className="text-sm leading-relaxed">
                                  {task}
                                </li>
                              ))}
                            </ol>
                          </div>

                          <div className="bg-accent/10 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Livrable attendu :</h4>
                            <p className="text-sm text-muted-foreground">
                              {module.content.exercise.deliverable}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Aucun exercice pour ce module.</p>
                      )}
                    </TabsContent>

                    <TabsContent value="quiz" className="mt-6">
                      <ModuleQuiz
                        module={module}
                        onComplete={(passed) => handleQuizComplete(module.id, passed)}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StarterPackCourse;