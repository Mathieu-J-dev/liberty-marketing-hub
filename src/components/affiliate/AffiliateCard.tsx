import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, Edit, Trash2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AffiliateProgram } from '@/hooks/useAffiliatePrograms';
import { useAuth } from '@/auth/useAuth';

interface AffiliateCardProps {
  program: AffiliateProgram;
  onEdit?: (program: AffiliateProgram) => void;
  onDelete?: (programId: string) => void;
}

const AffiliateCard: React.FC<AffiliateCardProps> = ({ program, onEdit, onDelete }) => {
  const { user } = useAuth();
  
  const handleVisit = () => {
    window.open(program.link, '_blank');
  };

  const canManage = user && (user.id === program.created_by || onEdit || onDelete);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{program.name}</CardTitle>
            <CardDescription className="mt-1">{program.category}</CardDescription>
          </div>
          {canManage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(program)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem 
                    onClick={() => onDelete(program.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${
                i < Math.floor(program.rating) 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              }`} 
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">{program.rating}/5</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Commission:</span>
            <Badge variant="secondary">{program.commission}</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Type:</span>
            <Badge variant={program.recurring ? "default" : "outline"}>
              {program.recurring ? 'Récurrent' : 'Unique'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Gains estimés:</span>
            <span className="text-sm text-green-600 font-medium">{program.earnings}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleVisit} className="w-full">
          Voir le programme
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AffiliateCard;