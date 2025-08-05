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
        introduction: "L'affiliation marketing est une stratégie de marketing en ligne où vous promouvez les produits ou services d'autres entreprises et gagnez une commission sur chaque vente générée.",
        sections: [
          {
            title: "Qu'est-ce que l'affiliation marketing ?",
            content: "L'affiliation est un partenariat entre trois parties : l'annonceur (qui vend le produit), l'affilié (vous, qui fait la promotion), et le client final. Vous recevez un lien de suivi unique pour chaque produit que vous promouvez.",
            examples: [
              "Amazon Associates - Commission de 1-10% selon la catégorie",
              "ClickBank - Produits numériques avec commissions jusqu'à 75%",
              "ShareASale - Marketplace avec des milliers de programmes"
            ]
          },
          {
            title: "Les différents types de commissions",
            content: "Il existe plusieurs modèles de rémunération dans l'affiliation : CPA (coût par action), CPC (coût par clic), CPS (coût par vente), et CPL (coût par lead).",
            examples: [
              "CPS : 5-50% de commission sur chaque vente",
              "CPL : 1-50€ par email collecté",
              "CPA : 10-200€ par action spécifique"
            ]
          },
          {
            title: "Avantages et inconvénients",
            content: "L'affiliation offre la possibilité de revenus passifs sans créer de produits, mais nécessite du temps pour construire une audience et optimiser les conversions."
          }
        ],
        exercices: [
          {
            title: "Recherche de programmes d'affiliation",
            description: "Trouvez 3 programmes d'affiliation dans une niche qui vous intéresse",
            task: "Inscrivez-vous sur 2 plateformes d'affiliation (Amazon Associates, ClickBank, ou ShareASale) et identifiez 3 produits à promouvoir."
          },
          {
            title: "Analyse de commissions",
            description: "Calculez le potentiel de revenus",
            task: "Pour chaque produit sélectionné, calculez combien vous devriez vendre par mois pour générer 500€ de commissions."
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
          explanation: "L'affilié agit comme un intermédiaire marketing qui promeut les produits d'autres entreprises en échange d'une commission."
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
          explanation: "CPS (Cost Per Sale) signifie que vous êtes payé uniquement quand une vente est réalisée grâce à votre promotion."
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
          explanation: "L'affiliation permet de générer des revenus sans avoir à créer, développer ou gérer des produits."
        }
      ]
    },
    {
      id: 2,
      title: "Choisir sa Niche Rentable",
      description: "Identifier les opportunités lucratives",
      icon: <Target className="h-5 w-5" />,
      duration: "60 min",
      completed: completedModules.includes(2),
      content: {
        introduction: "Le choix de votre niche détermine en grande partie votre succès en affiliation. Une niche bien choisie combine passion personnelle, demande du marché et potentiel de monétisation.",
        sections: [
          {
            title: "Critères d'une niche rentable",
            content: "Une niche profitable doit avoir une audience suffisamment large, des problèmes spécifiques à résoudre, et des produits avec de bonnes commissions disponibles.",
            examples: [
              "Santé & bien-être : marché de 4,2 milliards d'euros",
              "Finance personnelle : commissions élevées (50-200€ par lead)",
              "Formation en ligne : croissance de 15% par an"
            ]
          },
          {
            title: "Recherche et validation de niche",
            content: "Utilisez des outils comme Google Trends, Answer The Public, et les forums spécialisés pour évaluer l'intérêt et la demande dans votre niche.",
            examples: [
              "Google Trends : tendances de recherche sur 5 ans",
              "Forums Reddit : discussions actives = demande forte",
              "Amazon bestsellers : produits qui se vendent bien"
            ]
          },
          {
            title: "Concurrence et positionnement",
            content: "Analysez vos concurrents pour identifier les opportunités de différenciation et les angles d'approche non exploités."
          }
        ],
        exercices: [
          {
            title: "Analyse de 5 niches potentielles",
            description: "Évaluez différentes niches selon vos critères",
            task: "Créez un tableau comparatif de 5 niches avec : taille du marché, niveau de concurrence, commissions moyennes, et votre niveau d'expertise."
          },
          {
            title: "Validation par recherche de mots-clés",
            description: "Vérifiez la demande réelle",
            task: "Utilisez Ubersuggest ou Google Keyword Planner pour identifier 10 mots-clés principaux de votre niche avec leur volume de recherche."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est le critère le plus important pour choisir une niche ?",
          options: [
            "Votre passion personnelle uniquement",
            "Le niveau de concurrence faible",
            "L'équilibre entre passion, demande et monétisation",
            "Le nombre de produits disponibles"
          ],
          correctAnswer: 2,
          explanation: "Une niche réussie doit combiner votre intérêt personnel, une demande du marché et un potentiel de monétisation."
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
          explanation: "Google Trends permet de voir l'évolution de l'intérêt pour des sujets sur plusieurs années."
        },
        {
          question: "Que faire si une niche a beaucoup de concurrence ?",
          options: [
            "L'éviter complètement",
            "Chercher un angle de différenciation",
            "Copier exactement les concurrents",
            "Attendre que la concurrence diminue"
          ],
          correctAnswer: 1,
          explanation: "Une forte concurrence indique souvent un marché viable. Il faut trouver un angle unique pour se différencier."
        }
      ]
    },
    {
      id: 3,
      title: "Créer du Contenu qui Convertit",
      description: "Techniques de création de contenu persuasif",
      icon: <Users className="h-5 w-5" />,
      duration: "75 min",
      completed: completedModules.includes(3),
      content: {
        introduction: "Le contenu est le pilier de votre stratégie d'affiliation. Un contenu de qualité établit votre crédibilité, engage votre audience et guide naturellement vers l'achat.",
        sections: [
          {
            title: "Types de contenu performants",
            content: "Les reviews détaillées, comparatifs, tutoriels et listes de recommandations sont parmi les formats les plus efficaces pour l'affiliation.",
            examples: [
              "Reviews : 'Test complet de [produit] après 30 jours'",
              "Comparatifs : 'Top 5 des outils de [catégorie] en 2025'",
              "Tutoriels : 'Comment résoudre [problème] étape par étape'"
            ]
          },
          {
            title: "Structure d'un contenu qui convertit",
            content: "Utilisez la méthode AIDA (Attention, Intérêt, Désir, Action) pour structurer vos contenus et guider le lecteur vers la conversion.",
            examples: [
              "Titre accrocheur (Attention)",
              "Problème + bénéfices (Intérêt)",
              "Preuves sociales (Désir)",
              "Call-to-action clair (Action)"
            ]
          },
          {
            title: "Optimisation SEO pour l'affiliation",
            content: "Intégrez naturellement vos mots-clés, optimisez vos méta-descriptions et créez des liens internes pertinents."
          }
        ],
        exercices: [
          {
            title: "Rédaction d'une review complète",
            description: "Créez votre première review d'un produit de votre niche",
            task: "Rédigez une review de 1500 mots minimum incluant : présentation, test personnel, avantages/inconvénients, et recommandation finale avec lien d'affiliation."
          },
          {
            title: "Création d'un comparatif",
            description: "Comparez 3 produits similaires",
            task: "Créez un tableau comparatif de 3 produits avec critères de sélection, prix, fonctionnalités et votre recommandation pour différents profils d'utilisateurs."
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
          explanation: "AIDA est une méthode marketing éprouvée qui guide le lecteur du premier contact jusqu'à l'action d'achat."
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
          explanation: "Les reviews et comparatifs apportent de la valeur tout en présentant naturellement les produits d'affiliation."
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
          explanation: "Mentionner les inconvénients rend votre review plus crédible et renforce la confiance de vos lecteurs."
        }
      ]
    },
    {
      id: 4,
      title: "Générer du Trafic Qualifié",
      description: "Stratégies d'acquisition de visiteurs",
      icon: <DollarSign className="h-5 w-5" />,
      duration: "90 min",
      completed: completedModules.includes(4),
      content: {
        introduction: "Sans trafic qualifié, même le meilleur contenu d'affiliation ne génère pas de revenus. Découvrez les stratégies les plus efficaces pour attirer des visiteurs prêts à acheter.",
        sections: [
          {
            title: "SEO : Trafic organique durable",
            content: "Le référencement naturel génère un trafic gratuit et qualifié sur le long terme. Concentrez-vous sur les mots-clés d'intention d'achat.",
            examples: [
              "Mots-clés transactionnels : 'meilleur [produit] 2025'",
              "Long tail : 'comparatif [produit A] vs [produit B]'",
              "Questions : 'quel [produit] choisir pour [usage]'"
            ]
          },
          {
            title: "Réseaux sociaux : Engagement et communauté",
            content: "Chaque plateforme a ses spécificités. YouTube pour les demos, Instagram pour le lifestyle, LinkedIn pour le B2B.",
            examples: [
              "YouTube : Reviews vidéo et unboxings",
              "Instagram : Stories avec liens swipe-up",
              "TikTok : Contenus courts et viraux"
            ]
          },
          {
            title: "Email marketing : Relation directe",
            content: "Construisez une liste email pour créer une relation durable avec votre audience et promouvoir vos recommandations."
          }
        ],
        exercices: [
          {
            title: "Plan de contenu SEO",
            description: "Créez votre stratégie de contenu pour 3 mois",
            task: "Planifiez 12 articles (1 par semaine) autour de mots-clés de votre niche avec volume de recherche et intention d'achat."
          },
          {
            title: "Stratégie réseaux sociaux",
            description: "Définissez votre présence sur 2 plateformes",
            task: "Choisissez 2 réseaux sociaux adaptés à votre niche et créez un calendrier de publication pour 1 mois avec types de contenu et horaires optimaux."
          }
        ]
      },
      quiz: [
        {
          question: "Quel type de mots-clés est le plus rentable pour l'affiliation ?",
          options: [
            "Mots-clés informationnels",
            "Mots-clés transactionnels (intention d'achat)",
            "Mots-clés de marque",
            "Mots-clés très génériques"
          ],
          correctAnswer: 1,
          explanation: "Les mots-clés transactionnels indiquent une intention d'achat et convertissent mieux en affiliation."
        },
        {
          question: "Quelle est la principale différence entre trafic organique et payant ?",
          options: [
            "Le trafic organique est toujours meilleur",
            "Le trafic payant est plus qualifié",
            "Le trafic organique est gratuit mais prend du temps, le payant est immédiat mais coûte",
            "Il n'y a aucune différence"
          ],
          correctAnswer: 2,
          explanation: "Le trafic organique demande du temps pour se développer mais est durable, le trafic payant donne des résultats immédiats mais nécessite un budget."
        },
        {
          question: "Pourquoi l'email marketing est-il important en affiliation ?",
          options: [
            "C'est gratuit",
            "Permet de créer une relation durable avec l'audience",
            "C'est obligatoire",
            "Génère plus de trafic que le SEO"
          ],
          correctAnswer: 1,
          explanation: "L'email marketing permet de maintenir le contact avec votre audience et de promouvoir régulièrement vos recommandations."
        }
      ]
    },
    {
      id: 5,
      title: "Optimiser et Scaler ses Revenus",
      description: "Maximiser vos gains et automatiser",
      icon: <Zap className="h-5 w-5" />,
      duration: "75 min",
      completed: completedModules.includes(5),
      content: {
        introduction: "Une fois vos premières commissions générées, il est temps d'optimiser et de scaler votre activité pour maximiser vos revenus d'affiliation.",
        sections: [
          {
            title: "Analyse et optimisation des performances",
            content: "Utilisez Google Analytics, les tableaux de bord des programmes d'affiliation et des outils de tracking pour identifier ce qui fonctionne le mieux.",
            examples: [
              "Taux de conversion par source de trafic",
              "Revenus par article/contenu",
              "Performance par programme d'affiliation"
            ]
          },
          {
            title: "Diversification des sources de revenus",
            content: "Ne dépendez pas d'un seul programme. Diversifiez avec plusieurs programmes, créez vos propres produits, et explorez d'autres modèles de monétisation.",
            examples: [
              "Programmes d'affiliation multiples",
              "Produits numériques (ebooks, formations)",
              "Services de consulting",
              "Publicité display"
            ]
          },
          {
            title: "Automatisation et délégation",
            content: "Automatisez vos processus répétitifs et déléguez certaines tâches pour vous concentrer sur la stratégie et la croissance."
          }
        ],
        exercices: [
          {
            title: "Audit de performance complet",
            description: "Analysez vos résultats des 3 derniers mois",
            task: "Créez un tableau de bord avec : revenus par source, contenus les plus performants, taux de conversion par programme, et identifiez 3 axes d'amélioration."
          },
          {
            title: "Plan de scaling sur 6 mois",
            description: "Définissez votre stratégie de croissance",
            task: "Planifiez votre développement : nouveaux programmes à tester, contenus à créer, outils à automatiser, et objectifs de revenus mensuels."
          }
        ]
      },
      quiz: [
        {
          question: "Quelle est la première étape pour optimiser ses revenus d'affiliation ?",
          options: [
            "Augmenter le trafic",
            "Analyser les performances actuelles",
            "Ajouter plus de liens d'affiliation",
            "Changer de niche"
          ],
          correctAnswer: 1,
          explanation: "Il faut d'abord analyser ce qui fonctionne déjà avant d'optimiser ou de changer de stratégie."
        },
        {
          question: "Pourquoi diversifier ses sources de revenus en affiliation ?",
          options: [
            "Pour avoir plus de travail",
            "Réduire les risques et maximiser les opportunités",
            "C'est plus compliqué",
            "Pour impressionner les autres"
          ],
          correctAnswer: 1,
          explanation: "La diversification réduit les risques de dépendance et permet de maximiser les opportunités de revenus."
        },
        {
          question: "Quel KPI est le plus important à suivre en affiliation ?",
          options: [
            "Nombre de visiteurs uniquement",
            "Taux de conversion et revenus par visiteur",
            "Nombre de liens cliqués",
            "Temps passé sur le site"
          ],
          correctAnswer: 1,
          explanation: "Le taux de conversion et les revenus par visiteur indiquent l'efficacité réelle de votre stratégie d'affiliation."
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