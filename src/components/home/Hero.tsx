
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-liberty-blue/5 to-liberty-gold/5 py-20 lg:py-32">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6 animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Bienvenue chez <span className="gradient-text">Affi-Liberty</span>
          </h1>
          <p className="text-lg text-gray-600">
            L'affiliation marketing nouvelle génération – liberté, IA, résultats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/capture">
              <Button className="cta-button w-full sm:w-auto">
                Commencer Maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#opportunites">
              <Button variant="outline" className="border-liberty-blue text-liberty-blue hover:bg-liberty-blue hover:text-white w-full sm:w-auto">
                Découvrir les Opportunités
              </Button>
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 relative animate-fade-in">
          <div className="aspect-video bg-gray-200 rounded-lg shadow-xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Marketing Digital" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
            <p className="text-liberty-blue font-bold">+30%</p>
            <p className="text-sm text-gray-600">Augmentation de revenus</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
