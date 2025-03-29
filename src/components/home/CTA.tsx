
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="section bg-gradient-to-r from-liberty-blue to-liberty-blue-light text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre activité d'affiliation?</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Rejoignez des milliers d'entrepreneurs qui génèrent déjà des revenus passifs grâce à notre plateforme.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/capture">
            <Button className="bg-liberty-gold hover:bg-liberty-gold/90 text-white py-3 px-8 text-lg">
              Démarrer Gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 py-3 px-8 text-lg">
              Nous Contacter
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-white/70 text-sm">
          Aucune carte de crédit requise. Essai gratuit de 14 jours.
        </p>
      </div>
    </section>
  );
};

export default CTA;
