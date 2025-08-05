import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronRight } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  content: {
    introduction: string;
    sections: Array<{
      title: string;
      content: string;
      examples?: string[];
    }>;
  };
}

interface ModuleContentProps {
  module: Module;
  onComplete: () => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module, onComplete }) => {
  const [readSections, setReadSections] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSectionRead = (sectionIndex: number) => {
    if (!readSections.includes(sectionIndex)) {
      setReadSections([...readSections, sectionIndex]);
    }
  };

  const handleCompleteModule = () => {
    setIsCompleted(true);
    onComplete();
  };

  const allSectionsRead = readSections.length === module.content.sections.length;

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-liberty-blue">
            📖 Introduction - {module.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {module.content.introduction}
          </p>
        </CardContent>
      </Card>

      {/* Sections du contenu */}
      {module.content.sections.map((section, index) => (
        <Card key={index} className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {index + 1}. {section.title}
              </CardTitle>
              {readSections.includes(index) && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Lu
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {section.content}
            </p>
            
            {section.examples && section.examples.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">💡 Exemples pratiques :</h4>
                <ul className="space-y-2">
                  {section.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="flex items-start space-x-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-liberty-blue flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => handleSectionRead(index)}
              disabled={readSections.includes(index)}
            >
              {readSections.includes(index) ? 'Section terminée' : 'Marquer comme lue'}
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Bouton de fin de module */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-bold text-lg text-green-800">
                🎯 Fin du Module {module.id}
              </h3>
              <p className="text-green-700 mt-2">
                {allSectionsRead 
                  ? "Félicitations ! Vous avez terminé toutes les sections." 
                  : `Terminez toutes les sections (${readSections.length}/${module.content.sections.length}) pour continuer.`
                }
              </p>
            </div>
            
            <Button 
              onClick={handleCompleteModule}
              disabled={!allSectionsRead || isCompleted}
              className="bg-green-600 hover:bg-green-700"
            >
              {isCompleted ? 'Module terminé ✅' : 'Terminer le module'}
            </Button>
            
            {isCompleted && (
              <p className="text-sm text-green-600 mt-2">
                Vous pouvez maintenant passer aux exercices et au QCM !
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleContent;