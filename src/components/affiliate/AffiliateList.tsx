
import React from 'react';
import { Button } from '@/components/ui/button';
import AffiliateCard from './AffiliateCard';
import { AffiliateProgram } from '@/data/affiliatePrograms';

interface AffiliateListProps {
  programs: AffiliateProgram[];
  resetFilters: () => void;
}

const AffiliateList: React.FC<AffiliateListProps> = ({ programs, resetFilters }) => {
  if (programs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Aucun programme ne correspond à vos critères.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={resetFilters}
        >
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <AffiliateCard key={program.id} program={program} />
      ))}
    </div>
  );
};

export default AffiliateList;
