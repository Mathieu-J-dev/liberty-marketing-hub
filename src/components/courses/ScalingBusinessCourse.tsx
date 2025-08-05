import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, Rocket, DollarSign, Users, Globe } from 'lucide-react';
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

const ScalingBusinessCourse = () => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});

  const modules: Module[] = [
    {
      id: 1,
      title: "Stratégies de croissance scalable",
      description: "Identifier et implémenter les leviers de croissance qui passent à l'échelle",
      icon: Rocket,
      duration: "50 min",
      completed: false,
      content: {
        introduction: "Pour scaler un business, il faut identifier les stratégies qui fonctionnent et peuvent être dupliquées. Apprenez à créer des systèmes de croissance reproductibles et automatisables.",
        sections: [
          {
            title: "Modèles de croissance viral",
            content: "La croissance virale se base sur le principe que chaque utilisateur en amène d'autres. Coefficient viral = (Nombre d'invitations envoyées × Taux de conversion) par utilisateur.",
            example: "Dropbox : 1 utilisateur invite 5 amis, 2 s'inscrivent → coefficient de 2. Programme de parrainage : +500MB pour chaque ami inscrit"
          },
          {
            title: "Growth loops vs Growth hacks",
            content: "Les growth loops sont des cycles répétables qui s'auto-alimentent. Plus durables que les growth hacks ponctuels. Focus sur les mécaniques systémiques.",
            example: "Growth loop LinkedIn : Plus de profils → Meilleur SEO → Plus de trafic → Plus d'inscriptions → Plus de profils"
          },
          {
            title: "North Star Metric et focus",
            content: "Identifiez LA métrique qui reflète la valeur que vous créez. Alignez toute l'équipe sur cette métrique unique pour éviter la dispersion.",
            example: "Facebook : MAU (Monthly Active Users), Airbnb : Nights booked, Slack : Messages sent by teams"
          }
        ],
        exercises: [
          {
            title: "Identification de votre North Star",
            description: "Définissez votre métrique principale",
            task: "Identifiez votre North Star Metric et créez un dashboard pour la suivre quotidiennement avec les métriques secondaires qui l'influencent."
          },
          {
            title: "Conception d'un growth loop",
            description: "Créez votre premier cycle de croissance",
            task: "Concevez un growth loop pour votre business : identifiez le trigger, l'action, les bénéfices et comment cela relance le cycle."
          }
        ]
      },
      quiz: [
        {
          question: "Qu'est-ce qu'un coefficient viral de 1.5 signifie ?",
          options: ["1.5 utilisateurs s'inscrivent par jour", "Chaque utilisateur amène 1.5 nouveaux utilisateurs", "1.5% de taux de conversion", "1.5 fois plus de trafic"],
          correctAnswer: 1,
          explanation: "Un coefficient viral de 1.5 signifie que chaque utilisateur existant génère en moyenne 1.5 nouveaux utilisateurs."
        },
        {
          question: "Quelle est la différence principale entre growth hack et growth loop ?",
          options: ["Le coût", "La durabilité", "La complexité", "Le reach"],
          correctAnswer: 1,
          explanation: "Les growth loops sont des systèmes durables qui s'auto-alimentent, contrairement aux growth hacks qui sont ponctuels."
        }
      ]
    },
    {
      id: 2,
      title: "Monétisation et pricing avancé",
      description: "Optimiser vos revenus avec des stratégies de pricing sophistiquées",
      icon: DollarSign,
      duration: "45 min",
      completed: false,
      content: {
        introduction: "Le pricing est un levier puissant souvent sous-exploité. Une optimisation de 1% du prix peut avoir plus d'impact qu'une augmentation de 1% des ventes. Maîtrisez les stratégies avancées.",
        sections: [
          {
            title: "Psychologie du pricing",
            content: "Les prix ancrés, le charme pricing (99€ vs 100€), l'effet de contraste. Les clients n'achètent pas des prix, ils achètent de la valeur perçue.",
            example: "Stratégie 3 tiers : Basic (ancrage bas), Premium (le plus vendu), Enterprise (justifie le premium). Le milieu représente 60% des ventes."
          },
          {
            title: "Modèles de revenu récurrents",
            content: "SaaS, abonnements, freemium, usage-based. Les revenus récurrents offrent prévisibilité et valorisation plus élevée. Focus sur la rétention.",
            example: "Freemium Spotify : gratuit avec pub → Premium sans pub + offline. 25% de conversion, LTV élevée"
          },
          {
            title: "Value-based pricing",
            content: "Facturez selon la valeur créée, pas les coûts. Quantifiez l'impact de votre solution : temps économisé, revenus générés, coûts évités.",
            example: "Consultant ROI : Au lieu de 1000€/jour, facturer 10% de l'augmentation de CA générée la première année"
          }
        ],
        exercises: [
          {
            title: "Analyse de votre pricing actuel",
            description: "Évaluez votre structure de prix",
            task: "Analysez votre pricing vs concurrents, calculez votre élasticité prix, identifiez les opportunités d'optimisation."
          },
          {
            title: "Test de pricing value-based",
            description: "Expérimentez une nouvelle approche",
            task: "Concevez une offre basée sur la valeur créée et testez-la sur un échantillon de prospects qualifiés."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est l'avantage principal du value-based pricing ?",
          options: ["Prix plus bas", "Meilleur ROI pour le client", "Plus simple à calculer", "Moins de négociation"],
          correctAnswer: 1,
          explanation: "Le value-based pricing maximise le ROI client car le prix est directement lié à la valeur créée."
        },
        {
          question: "Dans une stratégie 3 tiers, quel tier est généralement le plus vendu ?",
          options: ["Le moins cher", "Le milieu", "Le plus cher", "Ça dépend"],
          correctAnswer: 1,
          explanation: "L'option du milieu est psychologiquement perçue comme le meilleur rapport qualité/prix."
        }
      ]
    },
    {
      id: 3,
      title: "Construction d'équipe et délégation",
      description: "Recruter, former et déléguer pour scaler sans vous épuiser",
      icon: Users,
      duration: "55 min",
      completed: false,
      content: {
        introduction: "Vous ne pouvez pas scaler sans équipe. Apprenez à recruter les bonnes personnes, les former efficacement et déléguer pour vous concentrer sur les tâches à haute valeur ajoutée.",
        sections: [
          {
            title: "Recrutement stratégique",
            content: "Recrutez pour la culture et la croissance, pas seulement les compétences actuelles. Privilégiez l'apprentissage rapide et l'autonomie. Processus de recrutement structuré.",
            example: "Interview process : culture fit → test pratique → case study → références. Éviter les CV, se concentrer sur les réalisations concrètes"
          },
          {
            title: "Systèmes de formation scalables",
            content: "Créez des systèmes de formation qui fonctionnent sans vous. Documentation, vidéos, processus step-by-step. Nouveaux employés autonomes en 30 jours max.",
            example: "Onboarding checklist : Jour 1-7 (bases), Jour 8-14 (shadowing), Jour 15-21 (avec support), Jour 22-30 (autonome avec feedback)"
          },
          {
            title: "Délégation efficace",
            content: "Déléguez les résultats, pas les tâches. Définissez clairement : quoi, quand, pourquoi, standards de qualité. Système de feedback régulier.",
            example: "Framework RACI : Responsible (qui fait), Accountable (qui valide), Consulted (qui conseille), Informed (qui est informé)"
          }
        ],
        exercises: [
          {
            title: "Mapping de vos tâches actuelles",
            description: "Identifiez ce que vous pouvez déléguer",
            task: "Listez toutes vos tâches hebdomadaires et classez-les : déléguer maintenant, former puis déléguer, garder. Priorisez par impact."
          },
          {
            title: "Création d'un processus de formation",
            description: "Documentez votre expertise",
            task: "Choisissez une compétence clé et créez un programme de formation complet avec vidéos, docs et évaluations."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est le principe clé d'une délégation efficace ?",
          options: ["Expliquer comment faire", "Définir le résultat attendu", "Faire des check-ins fréquents", "Donner des tâches simples"],
          correctAnswer: 1,
          explanation: "Il faut déléguer les résultats et laisser l'autonomie sur les méthodes pour responsabiliser l'équipe."
        },
        {
          question: "Combien de temps maximum devrait prendre l'autonomisation d'un nouvel employé ?",
          options: ["2 semaines", "30 jours", "3 mois", "6 mois"],
          correctAnswer: 1,
          explanation: "Un bon système de formation devrait rendre un employé autonome en 30 jours maximum."
        }
      ]
    },
    {
      id: 4,
      title: "Expansion internationale",
      description: "Stratégies pour s'implanter sur de nouveaux marchés",
      icon: Globe,
      duration: "60 min",
      completed: false,
      content: {
        introduction: "L'expansion internationale multiplie votre marché addressable. Mais chaque marché a ses spécificités. Apprenez à valider, adapter et déployer votre solution à l'international.",
        sections: [
          {
            title: "Sélection et validation de marchés",
            content: "Analysez la taille du marché, la concurrence, les barrières réglementaires, culturelles. Testez avant d'investir massivement. MVP local d'abord.",
            example: "Framework d'évaluation : TAM (taille), facilité d'entrée, fit culturel, support requis. Score de 1-10 sur chaque critère"
          },
          {
            title: "Adaptation produit et message",
            content: "Localisez plus que la langue : adaptez aux besoins locaux, réglementations, habitudes de paiement, canaux de distribution préférés.",
            example: "WhatsApp Business API en Inde vs Facebook Ads en France. Paiement mobile en Afrique vs cartes bancaires en Europe"
          },
          {
            title: "Go-to-market international",
            content: "Partenariats locaux vs équipe interne. Channel sales vs direct. Adaptation des prix aux pouvoirs d'achat locaux. Conformité locale.",
            example: "Netflix : contenu local (Korean dramas), prix adaptés (India 2€/mois), partenariats télécoms pour acquisition"
          }
        ],
        exercises: [
          {
            title: "Analyse de 3 marchés cibles",
            description: "Évaluez vos opportunités d'expansion",
            task: "Sélectionnez 3 pays/régions et analysez : taille de marché, concurrence, barrières d'entrée, adaptations nécessaires."
          },
          {
            title: "Plan de test international",
            description: "Concevez votre approche de validation",
            task: "Créez un plan de test pour valider votre concept sur un nouveau marché avec budget, timeline et métriques de succès."
          }
        ]
      },
      quiz: [
        {
          question: "Quel est le premier step crucial avant l'expansion internationale ?",
          options: ["Traduire le site", "Validation du marché", "Recruter local", "Adapter les prix"],
          correctAnswer: 1,
          explanation: "Il faut d'abord valider qu'il y a un besoin et un marché avant d'investir dans l'expansion."
        },
        {
          question: "Quelle approche est recommandée pour tester un nouveau marché ?",
          options: ["Investissement massif", "MVP local", "Acquisition d'entreprise", "Franchise"],
          correctAnswer: 1,
          explanation: "Un MVP local permet de tester le marché avec un investissement minimal avant de scaler."
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
        <h1 className="text-3xl font-bold mb-2 gradient-text">Formation Scaling Business</h1>
        <p className="text-muted-foreground mb-4">
          Apprenez à faire passer votre business à l'échelle supérieure avec les stratégies utilisées par les entreprises qui connaissent une croissance explosive.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">~3h30 de formation</span>
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

export default ScalingBusinessCourse;