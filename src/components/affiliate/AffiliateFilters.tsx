
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle } from 'lucide-react';

interface AffiliateFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showRecurringOnly: boolean;
  setShowRecurringOnly: (show: boolean) => void;
  categories: string[];
  totalCount: number;
  filteredCount: number;
  resetFilters: () => void;
  showResetButton?: boolean;
}

const AffiliateFilters: React.FC<AffiliateFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  showRecurringOnly,
  setShowRecurringOnly,
  categories,
  totalCount,
  filteredCount,
  resetFilters,
  showResetButton = false
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1">Rechercher</label>
          <Input
            id="search"
            placeholder="Rechercher par nom ou description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">Catégorie</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button 
            variant="outline" 
            className={`w-full ${showRecurringOnly ? 'bg-liberty-blue/10 border-liberty-blue' : ''}`}
            onClick={() => setShowRecurringOnly(!showRecurringOnly)}
          >
            {showRecurringOnly ? <CheckCircle className="h-4 w-4 mr-2" /> : null}
            Revenus récurrents uniquement
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Affichage de {filteredCount} programmes sur {totalCount}
        </div>
        
        {showResetButton && (
          <Button 
            variant="outline" 
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        )}
      </div>
    </div>
  );
};

export default AffiliateFilters;
