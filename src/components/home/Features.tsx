
import React from 'react';
import { Lightbulb, TrendingUp, Rocket, Shield } from 'lucide-react';

const features = [
  {
    icon: <Lightbulb className="h-10 w-10 text-liberty-gold" />,
    title: 'Opportunités Exclusives',
    description: "Accédez à des programmes d'affiliation soigneusement sélectionnés avec les meilleures commissions du marché."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-liberty-blue" />,
    title: 'Outils IA Avancés',
    description: "Utilisez nos outils d'intelligence artificielle pour optimiser vos campagnes et augmenter vos conversions."
  },
  {
    icon: <Rocket className="h-10 w-10 text-liberty-gold" />,
    title: 'Formation Continue',
    description: "Bénéficiez de formations à jour sur les dernières stratégies de marketing d'affiliation qui fonctionnent."
  },
  {
    icon: <Shield className="h-10 w-10 text-liberty-blue" />,
    title: 'Support Personnalisé',
    description: "Notre équipe d'experts vous accompagne à chaque étape pour garantir votre succès en affiliation."
  }
];

const Features = () => {
  return (
    <section className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir Affi-Liberty?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous combinons technologie de pointe et stratégies éprouvées pour vous aider à atteindre l'indépendance financière.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
