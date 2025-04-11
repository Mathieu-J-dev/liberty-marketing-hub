
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const OpportunityCTA: React.FC = () => {
  return (
    <div className="flex justify-center mt-12">
      <Link to="/capture">
        <Button className="bg-liberty-gold hover:bg-liberty-gold/90 text-white px-8 py-6 text-lg">
          Débloquer Toutes Les Opportunités
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default OpportunityCTA;
