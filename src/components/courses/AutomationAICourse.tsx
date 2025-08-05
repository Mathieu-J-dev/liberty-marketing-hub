import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, Bot, Zap, Settings, Workflow } from 'lucide-react';
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

const AutomationAICourse = () => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});

  const modules: Module[] = [
    {
      id: 1,
      title: "IA pour la création de contenu",
      description: "Utiliser l'intelligence artificielle pour générer du contenu marketing",
      icon: Bot,
      duration: "45 min",
      completed: false,
      content: {
        introduction: "L'IA révolutionne la création de contenu marketing. Apprenez à utiliser les bons outils et techniques pour créer du contenu de qualité à grande échelle tout en gardant votre authenticité.",
        sections: [
          {
            title: "Les meilleurs outils IA pour le marketing",
            content: "ChatGPT, Claude, Copy.ai, Jasper - chaque outil a ses forces. ChatGPT excelle pour la conversation et la stratégie, Claude pour l'analyse, Copy.ai pour les frameworks marketing.",
            example: "Utiliser ChatGPT pour créer un calendrier éditorial de 30 jours avec prompts spécifiques pour chaque post"
          },
          {
            title: "Prompting efficace pour le marketing",
            content: "Un bon prompt = contexte + rôle + tâche + format + contraintes. Plus vous êtes précis, meilleurs sont les résultats. Utilisez des exemples et des personas.",
            example: "Au lieu de 'écris un post Facebook', utilisez 'En tant qu'expert marketing pour entrepreneurs, crée un post Facebook de 150 mots sur l'importance du personal branding, avec un hook accrocheur et un CTA clair'"
          },
          {
            title: "Personnalisation et brand voice",
            content: "L'IA peut apprendre votre style et votre voix de marque. Fournissez des exemples de votre contenu existant pour maintenir la cohérence.",
            example: "Créer un document de style avec 10 exemples de vos meilleurs posts pour entraîner l'IA à votre ton"
          }
        ],
        exercises: [
          {
            title: "Création de prompts performants",
            description: "Développez vos templates de prompts",
            task: "Créez 5 prompts différents pour générer : posts LinkedIn, emails de vente, descriptions produits, posts Instagram, scripts vidéo."
          },
          {
            title: "Brand voice training",
            description: "Entraînez l'IA à votre style",
            task: "Rassemblez 10 exemples de votre meilleur contenu et créez un prompt pour que l'IA reproduise votre style."
          }
        ]
      },
      quiz: [
        {
          question: "Quel élément est le plus important dans un prompt efficace ?",
          options: ["La longueur", "Le contexte spécifique", "Le nombre d'exemples", "La politesse"],
          correctAnswer: 1,
          explanation: "Le contexte spécifique permet à l'IA de comprendre exactement ce que vous attendez et dans quel cadre."
        },
        {
          question: "Pour maintenir votre brand voice avec l'IA, vous devez :",
          options: ["Utiliser toujours les mêmes mots", "Fournir des exemples de votre style", "Écrire en majuscules", "Utiliser des emojis"],
          correctAnswer: 1,
          explanation: "Fournir des exemples concrets de votre style permet à l'IA d'apprendre et de reproduire votre brand voice."
        }
      ]
    },
    {
      id: 2,
      title: "Email automation avancée",
      description: "Créer des séquences d'emails automatisées qui convertissent",
      icon: Zap,
      duration: "50 min",
      completed: false,
      content: {
        introduction: "L'email automation permet de créer des relations durables avec vos prospects et clients. Apprenez à construire des séquences qui nurturent, vendent et fidélisent automatiquement.",
        sections: [
          {
            title: "Architecture des séquences email",
            content: "Une séquence efficace alterne valeur et vente. Règle 80/20 : 80% de valeur, 20% de vente. Chaque email doit avoir un objectif clair et mesurable.",
            example: "Séquence welcome : Email 1 (Welcome + deliverability), Email 2 (Story + value), Email 3 (Resource), Email 4 (Soft pitch), Email 5 (Social proof + offer)"
          },
          {
            title: "Segmentation comportementale",
            content: "Segmentez selon les actions : ouvertures, clics, achats, pages visitées. Plus la segmentation est fine, plus la personnalisation est efficace.",
            example: "Si quelqu'un clique sur un lien produit mais n'achète pas, l'ajouter à une séquence spécifique avec objections handling"
          },
          {
            title: "Triggers et conditions avancés",
            content: "Utilisez des triggers basés sur le comportement, les dates, les scores de lead, les interactions. Créez des automations intelligentes qui s'adaptent.",
            example: "Trigger : Si lead score > 50 ET n'a pas acheté dans les 30 jours → envoyer offre spéciale"
          }
        ],
        exercises: [
          {
            title: "Mapping de votre customer journey",
            description: "Visualisez le parcours de vos prospects",
            task: "Créez une carte du parcours de vos prospects depuis la découverte jusqu'à l'achat et identifiez les opportunités d'automation."
          },
          {
            title: "Conception d'une séquence de nurturing",
            description: "Créez votre première séquence automatisée",
            task: "Concevez une séquence de 7 emails pour transformer vos leads en prospects qualifiés avec objectifs et métriques."
          }
        ]
      },
      quiz: [
        {
          question: "Quelle est la règle d'or pour le ratio contenu/vente dans les emails ?",
          options: ["50/50", "70/30", "80/20", "90/10"],
          correctAnswer: 2,
          explanation: "La règle 80/20 : 80% de valeur ajoutée et 20% de contenu commercial maintient l'engagement sans être trop intrusif."
        },
        {
          question: "Qu'est-ce qu'un trigger en email automation ?",
          options: ["Un subject line", "Un élément déclencheur", "Un design template", "Un call-to-action"],
          correctAnswer: 1,
          explanation: "Un trigger est un élément déclencheur (action, comportement, date) qui lance automatiquement une séquence d'emails."
        }
      ]
    },
    {
      id: 3,
      title: "Automation des réseaux sociaux",
      description: "Programmer et optimiser votre présence sur les réseaux sociaux",
      icon: Settings,
      duration: "40 min",
      completed: false,
      content: {
        introduction: "Automatisez intelligemment votre présence sur les réseaux sociaux sans perdre l'aspect humain. Apprenez à programmer, répondre et engager efficacement à grande échelle.",
        sections: [
          {
            title: "Stratégie de contenu automatisée",
            content: "Créez des calendriers éditoriaux équilibrés qui alternent types de contenu, tonalités et objectifs. L'automation doit sembler naturelle et authentique.",
            example: "Lundi : Motivation, Mardi : Tips, Mercredi : Behind the scenes, Jeudi : User-generated content, Vendredi : Fun/Entertainment"
          },
          {
            title: "Outils d'automation recommandés",
            content: "Buffer, Hootsuite, Later pour la programmation. Zapier pour connecter les plateformes. Chaque outil a ses spécificités selon vos besoins.",
            example: "Workflow Zapier : Nouveau post blog → Auto-création post LinkedIn + Twitter + Facebook avec adaptation du format"
          },
          {
            title: "Réponses automatisées intelligentes",
            content: "Configurez des réponses automatiques pour les questions fréquentes tout en gardant un système d'escalade humaine pour les cas complexes.",
            example: "Bot Instagram : réponse automatique avec menu d'options, puis redirection vers DM humain si nécessaire"
          }
        ],
        exercises: [
          {
            title: "Création d'un calendrier éditorial",
            description: "Planifiez votre contenu sur 30 jours",
            task: "Créez un calendrier éditorial de 30 jours avec types de posts, plateformes et horaires optimaux pour votre audience."
          },
          {
            title: "Setup d'automation cross-platform",
            description: "Connectez vos plateformes",
            task: "Configurez une automation qui publie automatiquement sur 3 plateformes quand vous publiez sur votre blog."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est le principal risque de l'automation des réseaux sociaux ?",
          options: ["Coût élevé", "Perte d'authenticité", "Complexité technique", "Manque de reach"],
          correctAnswer: 1,
          explanation: "Le principal risque est de perdre l'aspect humain et authentique qui fait le succès des réseaux sociaux."
        },
        {
          question: "À quelle fréquence minimale devriez-vous vérifier vos automations ?",
          options: ["Une fois par mois", "Une fois par semaine", "Tous les jours", "En temps réel"],
          correctAnswer: 1,
          explanation: "Une vérification hebdomadaire permet de s'assurer que les automations fonctionnent bien et d'ajuster si nécessaire."
        }
      ]
    },
    {
      id: 4,
      title: "Workflows d'automation complète",
      description: "Connecter tous vos outils pour une automation totale",
      icon: Workflow,
      duration: "55 min",
      completed: false,
      content: {
        introduction: "L'automation complète connecte tous vos outils marketing pour créer des workflows fluides. De la génération de leads à la conversion, automatisez sans perdre la personnalisation.",
        sections: [
          {
            title: "Mapping des processus business",
            content: "Identifiez tous vos processus manuels répétitifs et évaluez leur potentiel d'automation. Priorisez selon l'impact et la complexité.",
            example: "Processus : Nouveau lead → Ajout CRM → Email welcome → Attribution commercial → Follow-up → Conversion"
          },
          {
            title: "Stack technologique optimal",
            content: "Choisissez des outils qui s'intègrent bien ensemble. Zapier, Make.com pour les connexions. CRM + Email tool + Analytics qui communiquent.",
            example: "Stack recommandé : HubSpot (CRM) + Mailchimp (Email) + Zapier (Connexions) + Google Analytics (Mesure)"
          },
          {
            title: "Tests et optimisation continue",
            content: "Testez chaque workflow avant le déploiement. Mesurez les performances et optimisez continuellement. L'automation doit évoluer avec votre business.",
            example: "Tester un workflow avec 10% du trafic pendant 1 semaine avant déploiement complet"
          }
        ],
        exercises: [
          {
            title: "Audit de vos processus actuels",
            description: "Identifiez les opportunités d'automation",
            task: "Listez tous vos processus manuels et évaluez leur potentiel d'automation selon impact/effort."
          },
          {
            title: "Création d'un workflow complet",
            description: "Concevez votre premier workflow de A à Z",
            task: "Créez un workflow qui automatise depuis la capture de lead jusqu'à la première vente avec tous les points de contact."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est le premier step dans la création d'un workflow d'automation ?",
          options: ["Choisir les outils", "Mapper les processus", "Créer le contenu", "Tester la technique"],
          correctAnswer: 1,
          explanation: "Il faut d'abord comprendre et mapper vos processus actuels avant de les automatiser."
        },
        {
          question: "Pourquoi est-il important de tester un workflow avant déploiement complet ?",
          options: ["Pour économiser", "Pour éviter les erreurs à grande échelle", "Pour impressionner", "Pour apprendre l'outil"],
          correctAnswer: 1,
          explanation: "Tester permet d'identifier et corriger les erreurs avant qu'elles n'affectent tous vos prospects/clients."
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
        <h1 className="text-3xl font-bold mb-2 gradient-text">Formation Automation & IA</h1>
        <p className="text-muted-foreground mb-4">
          Automatisez votre marketing avec l'intelligence artificielle et les workflows avancés pour gagner du temps et maximiser vos résultats.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">~3h10 de formation</span>
          </div>
          <Badge variant="outline">Niveau Expert</Badge>
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
                onComplete={() => handleModuleComplete(activeModule.id)}
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
                onComplete={(passed) => handleQuizComplete(activeModule.id, passed)}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default AutomationAICourse;