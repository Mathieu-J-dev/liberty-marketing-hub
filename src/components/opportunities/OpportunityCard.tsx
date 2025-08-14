
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, DollarSign, Award, TrendingUp } from 'lucide-react';

export interface Opportunity {
  id: number;
  title: string;
  category: string;
  rating: number;
  commission: string;
  recurring: boolean;
  earnings: string;
  image: string;
  description: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  return (
    <Card key={opportunity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={opportunity.image} 
          alt={opportunity.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm font-medium">
          {opportunity.category}
        </div>
      </div>
      
      <CardHeader>
        <CardTitle>{opportunity.title}</CardTitle>
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <Star className="h-4 w-4 text-liberty-gold mr-1 fill-liberty-gold" />
            <span>{opportunity.rating}/5</span>
          </div>
          <span className="text-sm text-gray-500">• Programme vérifié</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4">{opportunity.description}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-liberty-blue mr-1" />
            <span className="text-sm">{opportunity.commission}</span>
          </div>
          <div className="flex items-center">
            <Award className="h-4 w-4 text-liberty-gold mr-1" />
            <span className="text-sm">{opportunity.earnings}</span>
          </div>
          <div className="flex items-center">
            {opportunity.recurring ? (
              <>
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">Récurrent</span>
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">One-time</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full bg-liberty-blue hover:bg-liberty-blue/90 text-white">
          Voir plus
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
