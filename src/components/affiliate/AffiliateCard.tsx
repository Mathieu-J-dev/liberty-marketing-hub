
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Link, Percent, Star, TrendingUp } from 'lucide-react';
import { AffiliateProgram } from '@/hooks/useAffiliatePrograms';

interface AffiliateCardProps {
  program: AffiliateProgram;
}

const AffiliateCard: React.FC<AffiliateCardProps> = ({ program }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{program.name}</CardTitle>
          <Badge className="bg-liberty-blue text-white">
            {program.category}
          </Badge>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(program.rating) ? 'text-liberty-gold fill-liberty-gold' : 'text-gray-300'}`} 
            />
          ))}
          <span className="ml-1 text-sm">{program.rating}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4">{program.description}</p>
        
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center">
            <Percent className="h-4 w-4 text-liberty-gold mr-2" />
            <span className="text-sm font-medium">Commission: {program.commission}</span>
          </div>
          
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-liberty-blue mr-2" />
            <span className="text-sm font-medium">
              {program.recurring ? 'Revenu récurrent' : 'Commission unique'}: {program.earnings}
            </span>
          </div>
          
          <div className="flex items-center">
            <Link className="h-4 w-4 text-liberty-blue mr-2" />
            <span className="text-sm font-medium">Lien d'affiliation disponible</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <a href={program.link} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full bg-liberty-gold hover:bg-liberty-gold/90 text-white">
            Devenir Affilié
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default AffiliateCard;
