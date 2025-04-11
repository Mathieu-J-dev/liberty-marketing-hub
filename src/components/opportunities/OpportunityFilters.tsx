
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface OpportunityFiltersProps {
  count: number;
  onFilterClick: () => void;
}

const OpportunityFilters: React.FC<OpportunityFiltersProps> = ({ count, onFilterClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="mb-4 md:mb-0">
        <span className="text-sm text-gray-500">Affichage de {count} opportunités</span>
      </div>
      <Button variant="outline" className="flex items-center gap-2" onClick={onFilterClick}>
        <Filter className="h-4 w-4" />
        Filtrer les opportunités
      </Button>
    </div>
  );
};

export default OpportunityFilters;
