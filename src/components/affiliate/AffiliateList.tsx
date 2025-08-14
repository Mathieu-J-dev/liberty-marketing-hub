
import React from 'react';
import { Button } from '@/components/ui/button';
import AffiliateCard from './AffiliateCard';
import { AffiliateProgram } from '@/hooks/useAffiliatePrograms';

interface AffiliateListProps {
  programs: AffiliateProgram[];
  resetFilters: () => void;
  onEdit?: (program: AffiliateProgram) => void;
  onDelete?: (programId: string) => void;
}

const AffiliateList: React.FC<AffiliateListProps> = ({ programs, resetFilters, onEdit, onDelete }) => {
  if (programs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground mb-4">Aucun programme ne correspond à vos critères.</p>
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
        <AffiliateCard 
          key={program.id} 
          program={program} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AffiliateList;
