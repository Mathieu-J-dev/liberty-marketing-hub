
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import OpportunityList from '@/components/opportunities/OpportunityList';
import OpportunityFilters from '@/components/opportunities/OpportunityFilters';
import OpportunityCTA from '@/components/opportunities/OpportunityCTA';
import { opportunities } from '@/data/opportunities';

const Opportunities: React.FC = () => {
  // État pour gérer les filtres (à implémenter dans le futur)
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);
  
  // Fonction pour gérer le clic sur le bouton de filtre (à implémenter dans le futur)
  const handleFilterClick = () => {
    console.log('Filter button clicked');
    // Ici, vous pourriez ouvrir un modal ou un menu de filtre
  };

  return (
    <Layout>
      <div id="top"></div>
      <div className="section bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Opportunités d'Affiliation Premium</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection des programmes d'affiliation les plus rentables de 2025, vérifiés et approuvés par notre équipe d'experts.
            </p>
          </div>
          
          <OpportunityFilters 
            count={filteredOpportunities.length} 
            onFilterClick={handleFilterClick} 
          />
          
          <OpportunityList opportunities={filteredOpportunities} />
          
          <OpportunityCTA />
        </div>
      </div>
    </Layout>
  );
};

export default Opportunities;
