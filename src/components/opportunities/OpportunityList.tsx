
import React from 'react';
import OpportunityCard, { Opportunity } from './OpportunityCard';

interface OpportunityListProps {
  opportunities: Opportunity[];
}

const OpportunityList: React.FC<OpportunityListProps> = ({ opportunities }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
};

export default OpportunityList;
