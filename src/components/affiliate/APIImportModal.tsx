import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { AffiliateProgram } from '@/hooks/useAffiliatePrograms';

interface APIImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (programs: Omit<AffiliateProgram, 'id' | 'created_at' | 'updated_at'>[]) => Promise<void>;
}

interface APIResponse {
  success: boolean;
  data?: any[];
  error?: string;
}

const APIImportModal: React.FC<APIImportModalProps> = ({
  open,
  onOpenChange,
  onImport,
}) => {
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
  } | null>(null);

  const handleImport = async () => {
    if (!apiUrl) return;

    setImporting(true);
    setResult(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Validate and transform the data
      const programs = await transformAPIData(data);
      
      await onImport(programs);
      
      setResult({
        success: true,
        message: `${programs.length} programme(s) importé(s) avec succès !`,
        count: programs.length,
      });

      setTimeout(() => {
        onOpenChange(false);
        setApiUrl('');
        setApiKey('');
        setResult(null);
      }, 2000);

    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Erreur inconnue lors de l\'import',
      });
    } finally {
      setImporting(false);
    }
  };

  const transformAPIData = async (data: any): Promise<Omit<AffiliateProgram, 'id' | 'created_at' | 'updated_at'>[]> => {
    let programs: any[] = [];

    // Handle different API response formats
    if (Array.isArray(data)) {
      programs = data;
    } else if (data.data && Array.isArray(data.data)) {
      programs = data.data;
    } else if (data.programs && Array.isArray(data.programs)) {
      programs = data.programs;
    } else {
      throw new Error('Format de données API non reconnu. Attendu: un tableau ou un objet avec une propriété "data" ou "programs"');
    }

    const transformedPrograms = programs.map((program, index) => {
      try {
        return {
          name: program.name || program.title || `Programme ${index + 1}`,
          commission: program.commission || program.rate || 'Non spécifié',
          category: program.category || program.type || 'Autre',
          link: program.link || program.url || program.affiliate_url,
          description: program.description || program.summary || 'Aucune description',
          rating: parseFloat(program.rating || program.score || '4.0'),
          recurring: Boolean(program.recurring || program.is_recurring || false),
          earnings: program.earnings || program.potential_earnings || 'Non spécifié',
          is_active: true,
        };
      } catch (error) {
        throw new Error(`Erreur lors de la transformation des données pour le programme ${index + 1}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      }
    });

    // Validate required fields
    transformedPrograms.forEach((program, index) => {
      if (!program.name || !program.link) {
        throw new Error(`Programme ${index + 1}: Les champs "name" et "link" sont requis`);
      }
      
      if (!program.link.startsWith('http')) {
        throw new Error(`Programme ${index + 1}: Le lien doit commencer par http:// ou https://`);
      }

      if (isNaN(program.rating) || program.rating < 0 || program.rating > 5) {
        program.rating = 4.0; // Default rating
      }
    });

    return transformedPrograms;
  };

  const testConnection = async () => {
    if (!apiUrl) return;

    setImporting(true);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(apiUrl, {
        method: 'HEAD', // Just test the connection
        headers,
      });

      if (response.ok) {
        setResult({
          success: true,
          message: 'Connexion API réussie !',
        });
      } else {
        setResult({
          success: false,
          message: `Erreur de connexion: ${response.status}`,
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Erreur de connexion',
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Importer via API</DialogTitle>
          <DialogDescription>
            Importez des programmes d'affiliation depuis une API externe.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="api-url">URL de l'API</Label>
            <Input
              id="api-url"
              placeholder="https://api.exemple.com/affiliate-programs"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="api-key">Clé API (optionnel)</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Votre clé API si nécessaire"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Format de données attendu :</p>
            <Textarea
              readOnly
              value={`// Format accepté (JSON):
[
  {
    "name": "Nom du programme",
    "commission": "50%",
    "category": "Marketing", 
    "link": "https://...",
    "description": "Description",
    "rating": 4.5,
    "recurring": true,
    "earnings": "€500-1000/mois"
  }
]

// Ou avec wrapper:
{
  "data": [...programmes...],
  "programs": [...programmes...]
}`}
              className="h-40 text-xs"
            />
          </div>

          {result && (
            <Alert className={result.success ? "border-green-500" : "border-red-500"}>
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {result.message}
                {result.count && (
                  <span className="ml-2 font-medium">
                    ({result.count} programme(s))
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={testConnection}
            disabled={!apiUrl || importing}
          >
            {importing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Tester la connexion
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={importing}
            >
              Annuler
            </Button>
            <Button
              onClick={handleImport}
              disabled={!apiUrl || importing}
            >
              {importing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Importer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default APIImportModal;