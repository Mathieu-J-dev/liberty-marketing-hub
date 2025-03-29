
import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Inscrivez-vous gratuitement',
    description: 'Créez votre compte en quelques secondes et accédez immédiatement à notre plateforme.'
  },
  {
    number: '02',
    title: 'Explorez les opportunités',
    description: 'Découvrez notre catalogue d'offres d'affiliation dans divers secteurs et niches.'
  },
  {
    number: '03',
    title: 'Utilisez nos outils IA',
    description: 'Optimisez vos campagnes avec nos outils d'intelligence artificielle exclusifs.'
  },
  {
    number: '04',
    title: 'Générez des revenus',
    description: 'Commencez à toucher des commissions récurrentes sur chaque vente générée.'
  }
];

const HowItWorks = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Comment Ça Marche</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Un processus simple en 4 étapes pour démarrer votre activité d'affiliation et générer des revenus.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-6 shadow-md h-full flex flex-col">
                <div className="text-liberty-gold text-4xl font-bold mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 flex-grow">{step.description}</p>
                <div className="mt-4 flex items-center text-liberty-blue">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Facile à suivre</span>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ChevronRight className="h-6 w-6 text-liberty-gold" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
