
import React from 'react';
import { StarIcon } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Entrepreneure Web',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: "Grâce à Affi-Liberty, j'ai pu multiplier mes revenus d'affiliation par 3 en seulement 2 mois. Les outils IA sont une vraie révolution pour mon business!",
    rating: 5
  },
  {
    name: 'Thomas Dubois',
    role: 'Blogueur Finance',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: "Je cherchais une solution complète pour mon activité d'affiliation. Affi-Liberty m'a fourni tous les outils nécessaires pour réussir et un support de qualité.",
    rating: 5
  },
  {
    name: 'Amélie Bernard',
    role: 'Consultante Marketing',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    content: "Les programmes d'affiliation proposés sont de haute qualité et vraiment rentables. J'apprécie particulièrement la transparence et l'accompagnement personnalisé.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="section bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ce que nos clients disent</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de ceux qui ont transformé leur activité en ligne grâce à notre plateforme.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    fill={i < testimonial.rating ? "#F59E0B" : "none"} 
                    className={`h-5 w-5 ${i < testimonial.rating ? "text-liberty-gold" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
