import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, Target, TrendingUp, Users, BarChart3 } from 'lucide-react';
import ModuleContent from './ModuleContent';
import ModuleQuiz from './ModuleQuiz';

interface Module {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  duration: string;
  completed: boolean;
  content: {
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      example?: string;
    }>;
    exercises: Array<{
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

const AdvancedMarketingCourse = () => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});

  const modules: Module[] = [
    {
      id: 1,
      title: "Psychologie du consommateur",
      description: "Comprendre les motivations d'achat et les triggers psychologiques",
      icon: Users,
      duration: "45 min",
      completed: false,
      content: {
        introduction: "La psychologie du consommateur est la clé pour créer des campagnes marketing qui convertissent. Apprenez à identifier et utiliser les biais cognitifs qui influencent les décisions d'achat.",
        sections: [
          {
            title: "Les 6 principes de persuasion de Cialdini",
            content: "Robert Cialdini a identifié 6 principes universels de persuasion : réciprocité, engagement, preuve sociale, autorité, sympathie et rareté. Chaque principe peut être appliqué dans vos campagnes marketing.",
            example: "Principe de rareté : 'Plus que 3 places disponibles' ou 'Offre limitée jusqu'à minuit'"
          },
          {
            title: "Les biais cognitifs en marketing",
            content: "Les biais cognitifs sont des raccourcis mentaux que notre cerveau utilise pour prendre des décisions rapidement. En marketing, nous pouvons les utiliser éthiquement pour guider les prospects vers une décision d'achat.",
            example: "Biais d'ancrage : présenter d'abord le prix le plus élevé pour faire paraître les autres options plus abordables"
          },
          {
            title: "L'urgence et la rareté",
            content: "Créer un sentiment d'urgence légitime pousse à l'action immédiate. La rareté augmente la valeur perçue d'un produit ou service.",
            example: "Timer de compte à rebours pour une promotion ou stock limité visible en temps réel"
          }
        ],
        exercises: [
          {
            title: "Analyse de pages de vente",
            description: "Identifiez les principes psychologiques utilisés",
            task: "Analysez 3 pages de vente de votre niche et identifiez quels principes de Cialdini sont utilisés. Notez leur efficacité."
          },
          {
            title: "Création de messages urgents",
            description: "Rédigez des messages créant l'urgence",
            task: "Créez 5 messages d'urgence différents pour votre produit/service en utilisant des approches variées."
          }
        ]
      },
      quiz: [
        {
          question: "Quel principe de Cialdini consiste à donner quelque chose avant de demander en retour ?",
          options: ["Autorité", "Réciprocité", "Preuve sociale", "Sympathie"],
          correctAnswer: 1,
          explanation: "La réciprocité est le principe qui consiste à donner avant de recevoir, créant une obligation psychologique chez le destinataire."
        },
        {
          question: "Quel biais cognitif utilise le premier prix présenté comme référence ?",
          options: ["Biais de confirmation", "Biais d'ancrage", "Biais de disponibilité", "Biais d'optimisme"],
          correctAnswer: 1,
          explanation: "Le biais d'ancrage fait que le premier prix présenté sert de référence pour évaluer tous les prix suivants."
        }
      ]
    },
    {
      id: 2,
      title: "Funnel marketing avancé",
      description: "Construire des tunnels de vente multi-étapes optimisés",
      icon: TrendingUp,
      duration: "50 min",
      completed: false,
      content: {
        introduction: "Un funnel marketing bien conçu guide vos prospects à travers un parcours structuré, de la découverte à l'achat et au-delà. Apprenez à créer des funnels qui convertissent à chaque étape.",
        sections: [
          {
            title: "Architecture d'un funnel performant",
            content: "Un funnel efficace comprend : sensibilisation, intérêt, considération, intention, évaluation, achat, rétention et recommandation. Chaque étape a ses propres objectifs et métriques.",
            example: "Funnel SaaS : Blog post → Lead magnet → Email sequence → Demo → Trial → Conversion → Upsell"
          },
          {
            title: "Optimisation des points de friction",
            content: "Identifiez et éliminez les obstacles qui empêchent vos prospects d'avancer dans le funnel. Chaque friction peut coûter des conversions.",
            example: "Réduire le nombre de champs dans un formulaire de 5 à 3 peut augmenter les conversions de 30%"
          },
          {
            title: "Segmentation et personnalisation",
            content: "Adaptez votre message selon le profil, le comportement et la position dans le funnel de chaque prospect. Plus c'est personnalisé, plus c'est efficace.",
            example: "Envoyer des emails différents aux prospects qui ont visité la page pricing vs ceux qui ont téléchargé un ebook"
          }
        ],
        exercises: [
          {
            title: "Mapping de votre funnel actuel",
            description: "Cartographiez votre parcours client existant",
            task: "Dessinez votre funnel actuel et identifiez les points de friction. Calculez le taux de conversion à chaque étape."
          },
          {
            title: "Conception d'un nouveau funnel",
            description: "Créez un funnel optimisé pour votre business",
            task: "Concevez un nouveau funnel en définissant chaque étape, les contenus nécessaires et les métriques à suivre."
          }
        ]
      },
      quiz: [
        {
          question: "Quelle est la première étape d'un funnel marketing ?",
          options: ["Intérêt", "Sensibilisation", "Considération", "Intention"],
          correctAnswer: 1,
          explanation: "La sensibilisation (Awareness) est la première étape où le prospect découvre votre marque ou produit."
        },
        {
          question: "Que désigne un point de friction dans un funnel ?",
          options: ["Un élément qui accélère la conversion", "Un obstacle qui freine le parcours", "Une étape optionnelle", "Un point de mesure"],
          correctAnswer: 1,
          explanation: "Un point de friction est tout élément qui ralentit ou empêche un prospect d'avancer dans le funnel."
        }
      ]
    },
    {
      id: 3,
      title: "Analyse de données et KPIs",
      description: "Mesurer et optimiser les performances de vos campagnes",
      icon: BarChart3,
      duration: "40 min",
      completed: false,
      content: {
        introduction: "Les données sont votre boussole marketing. Apprenez à identifier les bonnes métriques, les analyser correctement et prendre des décisions basées sur les données pour optimiser vos résultats.",
        sections: [
          {
            title: "KPIs essentiels par canal",
            content: "Chaque canal marketing a ses propres indicateurs clés. Il est crucial de suivre les bonnes métriques pour évaluer la performance réelle de vos efforts.",
            example: "Email : taux d'ouverture, clic, désabonnement. Paid ads : CPC, CTR, ROAS, Cost per acquisition"
          },
          {
            title: "Attribution et customer journey",
            content: "Comprendre le parcours complet du client et attribuer correctement les conversions aux différents touchpoints marketing.",
            example: "Un client peut découvrir via Facebook, s'inscrire via Google, et acheter via email - quel canal créditer ?"
          },
          {
            title: "Tests A/B et expérimentation",
            content: "Testez systématiquement vos hypothèses avec des tests A/B rigoureux. Testez un élément à la fois pour isoler les variables.",
            example: "Tester 2 versions d'un subject line d'email pendant 1 semaine avec 50% du trafic chacune"
          }
        ],
        exercises: [
          {
            title: "Audit de vos métriques actuelles",
            description: "Évaluez la pertinence de vos KPIs",
            task: "Listez tous les KPIs que vous suivez actuellement et évaluez leur pertinence par rapport à vos objectifs business."
          },
          {
            title: "Setup d'un test A/B",
            description: "Planifiez et lancez votre premier test",
            task: "Identifiez un élément à tester, formulez une hypothèse, et planifiez un test A/B avec taille d'échantillon et durée."
          }
        ]
      },
      quiz: [
        {
          question: "Que signifie ROAS en marketing digital ?",
          options: ["Return On Ad Spend", "Rate Of Active Sessions", "Revenue Optimization And Scaling", "Reach Over Audience Segments"],
          correctAnswer: 0,
          explanation: "ROAS (Return On Ad Spend) mesure le retour sur investissement publicitaire : revenus générés / coût publicitaire."
        },
        {
          question: "Dans un test A/B, que doit-on tester idéalement ?",
          options: ["Plusieurs éléments à la fois", "Un seul élément à la fois", "Tout le design", "Seulement les couleurs"],
          correctAnswer: 1,
          explanation: "Il faut tester un seul élément à la fois pour pouvoir isoler ce qui cause la différence de performance."
        }
      ]
    },
    {
      id: 4,
      title: "Retargeting et remarketing",
      description: "Récupérer les prospects perdus et maximiser les conversions",
      icon: Target,
      duration: "35 min",
      completed: false,
      content: {
        introduction: "Le retargeting permet de recibler les visiteurs qui n'ont pas converti lors de leur première visite. C'est l'une des stratégies les plus rentables en marketing digital.",
        sections: [
          {
            title: "Stratégies de segmentation",
            content: "Segmentez vos audiences de retargeting selon leur comportement : visiteurs de page produit, abandons de panier, anciens clients, etc. Chaque segment nécessite un message différent.",
            example: "Segment 'Abandon panier' : offrir une remise ou rappeler les bénéfices du produit laissé"
          },
          {
            title: "Séquences de retargeting",
            content: "Créez des séquences d'annonces qui racontent une histoire et guident progressivement vers la conversion. Variez les formats et messages.",
            example: "Jour 1 : Rappel produit, Jour 3 : Témoignages clients, Jour 7 : Offre limitée"
          },
          {
            title: "Cross-platform retargeting",
            content: "Utilisez les données de retargeting sur plusieurs plateformes pour une couverture maximale : Facebook, Google, email, etc.",
            example: "Pixel Facebook + Google Ads + Customer Match pour toucher l'audience sur tous les canaux"
          }
        ],
        exercises: [
          {
            title: "Mapping des audiences de retargeting",
            description: "Identifiez vos segments d'audience",
            task: "Créez une carte de tous les segments d'audience possibles selon les pages visitées et actions effectuées sur votre site."
          },
          {
            title: "Création d'une séquence",
            description: "Planifiez votre séquence de retargeting",
            task: "Concevez une séquence de 5 annonces pour récupérer les abandons de panier, avec timing et messages."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est l'avantage principal du retargeting ?",
          options: ["Coût plus faible", "Audience déjà intéressée", "Plus de reach", "Meilleur design"],
          correctAnswer: 1,
          explanation: "Le retargeting cible une audience qui a déjà montré de l'intérêt, donc plus susceptible de convertir."
        },
        {
          question: "Combien de temps maximum recommandé pour une campagne de retargeting ?",
          options: ["7 jours", "30 jours", "90 jours", "1 an"],
          correctAnswer: 2,
          explanation: "Au-delà de 90 jours, l'intention d'achat diminue et le retargeting devient moins efficace."
        }
      ]
    }
  ];

  const handleModuleComplete = (moduleId: number) => {
    setCompletedModules(prev => [...prev, moduleId]);
    setActiveModule(null);
  };

  const handleQuizComplete = (moduleId: number, passed: boolean) => {
    setQuizResults(prev => ({ ...prev, [moduleId]: passed }));
    if (passed) {
      handleModuleComplete(moduleId);
    }
  };

  const progress = (completedModules.length / modules.length) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Formation Marketing Avancé</h1>
        <p className="text-muted-foreground mb-4">
          Maîtrisez les techniques avancées de marketing digital pour maximiser vos conversions et optimiser vos campagnes.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">~3h de formation</span>
          </div>
          <Badge variant="outline">Niveau Avancé</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression</span>
            <span>{completedModules.length}/{modules.length} modules</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      {!activeModule ? (
        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            const quizPassed = quizResults[module.id];
            const IconComponent = module.icon;
            
            return (
              <Card 
                key={module.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isCompleted ? 'border-green-500 bg-green-50' : ''
                }`}
                onClick={() => setActiveModule(module)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-500 text-white' : 'bg-muted'}`}>
                        {isCompleted ? <CheckCircle className="h-5 w-5" /> : <IconComponent className="h-5 w-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{module.duration}</span>
                        </div>
                      </div>
                    </div>
                    {isCompleted && quizPassed && (
                      <Badge variant="default" className="bg-green-500">Terminé</Badge>
                    )}
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveModule(null)}
            >
              ← Retour aux modules
            </Button>
            <h2 className="text-2xl font-bold">{activeModule.title}</h2>
          </div>

          <Tabs defaultValue="content" className="w-full">
            <TabsList>
              <TabsTrigger value="content">Contenu</TabsTrigger>
              <TabsTrigger value="exercises">Exercices</TabsTrigger>
              <TabsTrigger value="quiz">QCM</TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <ModuleContent 
                module={activeModule}
                onComplete={(moduleId) => handleModuleComplete(moduleId)}
              />
            </TabsContent>

            <TabsContent value="exercises">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Exercices pratiques</h3>
                {activeModule.content.exercises.map((exercise, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{exercise.task}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quiz">
              <ModuleQuiz 
                module={activeModule}
                onComplete={(moduleId, passed) => handleQuizComplete(moduleId, passed)}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AdvancedMarketingCourse;