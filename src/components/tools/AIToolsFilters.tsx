import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, Star, X } from 'lucide-react';

interface AIToolsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedRating: number;
  onRatingChange: (value: number) => void;
  categories: string[];
  count: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const AIToolsFilters: React.FC<AIToolsFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedRating,
  onRatingChange,
  categories,
  count,
  onResetFilters,
  hasActiveFilters
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Barre de recherche */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un outil IA..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filtre par catégorie */}
        <div className="lg:w-48">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filtre par notation */}
        <div className="lg:w-48">
          <Select value={selectedRating.toString()} onValueChange={(value) => onRatingChange(Number(value))}>
            <SelectTrigger>
              <Star className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Notation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Toutes les notes</SelectItem>
              <SelectItem value="5">5 étoiles</SelectItem>
              <SelectItem value="4">4+ étoiles</SelectItem>
              <SelectItem value="3">3+ étoiles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Affichage des résultats et reset */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-4 border-t">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <span className="text-sm text-gray-600">
            <Badge variant="outline" className="mr-2">
              {count}
            </Badge>
            {count === 1 ? 'outil trouvé' : 'outils trouvés'}
          </span>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Réinitialiser les filtres
          </Button>
        )}
      </div>
    </div>
  );
};

export default AIToolsFilters;