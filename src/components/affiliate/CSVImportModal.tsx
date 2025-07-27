import React, { useState, useRef } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { AffiliateProgram } from '@/hooks/useAffiliatePrograms';

interface CSVImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (programs: Omit<AffiliateProgram, 'id' | 'created_at' | 'updated_at'>[]) => Promise<void>;
}

interface ImportResult {
  success: number;
  errors: string[];
  total: number;
}

const CSVImportModal: React.FC<CSVImportModalProps> = ({
  open,
  onOpenChange,
  onImport,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) throw new Error('Le fichier CSV doit contenir au moins un en-tête et une ligne de données');

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const requiredHeaders = ['name', 'commission', 'category', 'link', 'description', 'rating', 'recurring', 'earnings'];
    
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
    if (missingHeaders.length > 0) {
      throw new Error(`Colonnes manquantes: ${missingHeaders.join(', ')}`);
    }

    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      // Validation et conversion des types
      try {
        row.rating = parseFloat(row.rating);
        row.recurring = row.recurring.toLowerCase() === 'true' || row.recurring === '1';
        row.is_active = true;
        
        // Validation de l'URL
        if (!row.link.startsWith('http')) {
          throw new Error(`Ligne ${i + 1}: URL invalide`);
        }
        
        // Validation de la note
        if (isNaN(row.rating) || row.rating < 0 || row.rating > 5) {
          throw new Error(`Ligne ${i + 1}: Note invalide (doit être entre 0 et 5)`);
        }

        data.push(row);
      } catch (error) {
        throw new Error(`Ligne ${i + 1}: ${error instanceof Error ? error.message : 'Erreur de validation'}`);
      }
    }

    return data;
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setProgress(0);
    setResult(null);

    try {
      const csvText = await file.text();
      const programs = parseCSV(csvText);
      
      setProgress(50);
      
      await onImport(programs);
      
      setProgress(100);
      setResult({
        success: programs.length,
        errors: [],
        total: programs.length,
      });
      
      setTimeout(() => {
        onOpenChange(false);
        setFile(null);
        setResult(null);
        setProgress(0);
      }, 2000);
      
    } catch (error) {
      setResult({
        success: 0,
        errors: [error instanceof Error ? error.message : 'Erreur inconnue'],
        total: 0,
      });
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `name,commission,category,link,description,rating,recurring,earnings
"Exemple Programme","50%","Marketing","https://exemple.com","Description du programme",4.5,true,"€500-1000/mois"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_programmes_affiliation.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Importer des Programmes via CSV</DialogTitle>
          <DialogDescription>
            Importez plusieurs programmes d'affiliation en une seule fois via un fichier CSV.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="csv-file">Fichier CSV</Label>
            <div className="mt-2">
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                ref={fileInputRef}
              />
            </div>
            {file && (
              <div className="mt-2 flex items-center text-sm text-green-600">
                <FileText className="mr-2 h-4 w-4" />
                {file.name}
              </div>
            )}
          </div>

          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            Télécharger le modèle CSV
          </Button>

          {importing && (
            <div className="space-y-2">
              <Label>Progression de l'import</Label>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {result && (
            <Alert className={result.errors.length > 0 ? "border-red-500" : "border-green-500"}>
              {result.errors.length > 0 ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {result.errors.length > 0 ? (
                  <div>
                    <p className="font-medium">Erreurs d'import :</p>
                    <ul className="mt-1 list-disc list-inside text-sm">
                      {result.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>
                    {result.success} programme(s) importé(s) avec succès !
                  </p>
                )}
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Format requis :</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>name</strong> : Nom du programme</li>
              <li><strong>commission</strong> : Commission (ex: "50%" ou "€100")</li>
              <li><strong>category</strong> : Catégorie</li>
              <li><strong>link</strong> : Lien d'affiliation (https://...)</li>
              <li><strong>description</strong> : Description</li>
              <li><strong>rating</strong> : Note (0-5)</li>
              <li><strong>recurring</strong> : Commission récurrente (true/false)</li>
              <li><strong>earnings</strong> : Gains estimés</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={importing}
          >
            Annuler
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || importing}
          >
            {importing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Importer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CSVImportModal;