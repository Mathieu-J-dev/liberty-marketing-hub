import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Image } from 'lucide-react';
import { useFileManagement } from '@/hooks/useFileManagement';

interface FileUploaderProps {
  onContentCreated?: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onContentCreated }) => {
  const { uploadFile, createContent, uploading } = useFileManagement();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_type: '' as 'pdf' | 'video' | 'course' | '',
    external_url: '',
    download_url: '',
    affiliate_link: '',
    is_premium: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnail(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.content_type) {
      return;
    }

    let filePath: string | null = null;
    let thumbnailPath: string | null = null;

    // Upload du fichier principal si présent
    if (selectedFile) {
      filePath = await uploadFile(selectedFile, 'member-content');
      if (!filePath) return;
    }

    // Upload de la miniature si présente
    if (selectedThumbnail) {
      thumbnailPath = await uploadFile(selectedThumbnail, 'thumbnails');
      if (!thumbnailPath) return;
    }

    // Créer le contenu
    const success = await createContent({
      ...formData,
      content_type: formData.content_type as 'pdf' | 'video' | 'course',
      file_path: filePath || undefined,
      thumbnail_path: thumbnailPath || undefined
    });

    if (success) {
      // Reset du formulaire
      setFormData({
        title: '',
        description: '',
        content_type: '',
        external_url: '',
        download_url: '',
        affiliate_link: '',
        is_premium: false
      });
      setSelectedFile(null);
      setSelectedThumbnail(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
      
      onContentCreated?.();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Ajouter du contenu membre
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Titre du contenu"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description détaillée du contenu"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="content_type">Type de contenu *</Label>
              <Select 
                value={formData.content_type} 
                onValueChange={(value: 'pdf' | 'video' | 'course') => 
                  setFormData(prev => ({ ...prev, content_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">Document PDF</SelectItem>
                  <SelectItem value="video">Vidéo</SelectItem>
                  <SelectItem value="course">Formation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Upload de fichiers */}
          <div className="space-y-4">
            <div>
              <Label>
                <FileText className="inline h-4 w-4 mr-2" />
                Fichier principal (optionnel)
              </Label>
              <Input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.mp4,.zip"
                className="mt-1"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Sélectionné: {selectedFile.name}
                </p>
              )}
            </div>

            <div>
              <Label>
                <Image className="inline h-4 w-4 mr-2" />
                Miniature (optionnel)
              </Label>
              <Input
                ref={thumbnailInputRef}
                type="file"
                onChange={handleThumbnailSelect}
                accept="image/*"
                className="mt-1"
              />
              {selectedThumbnail && (
                <p className="text-sm text-gray-600 mt-1">
                  Sélectionné: {selectedThumbnail.name}
                </p>
              )}
            </div>
          </div>

          {/* URLs externes */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="external_url">URL externe (optionnel)</Label>
              <Input
                id="external_url"
                value={formData.external_url}
                onChange={(e) => setFormData(prev => ({ ...prev, external_url: e.target.value }))}
                placeholder="https://youtube.com/watch?v=..."
                type="url"
              />
            </div>

            <div>
              <Label htmlFor="download_url">URL de téléchargement direct (optionnel)</Label>
              <Input
                id="download_url"
                value={formData.download_url}
                onChange={(e) => setFormData(prev => ({ ...prev, download_url: e.target.value }))}
                placeholder="https://example.com/file.pdf"
                type="url"
              />
            </div>

            <div>
              <Label htmlFor="affiliate_link">Lien d'affiliation (optionnel)</Label>
              <Input
                id="affiliate_link"
                value={formData.affiliate_link}
                onChange={(e) => setFormData(prev => ({ ...prev, affiliate_link: e.target.value }))}
                placeholder="https://affiliate.com/ref=123"
                type="url"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center space-x-2">
            <Switch
              id="is_premium"
              checked={formData.is_premium}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_premium: checked }))}
            />
            <Label htmlFor="is_premium">Contenu premium</Label>
          </div>

          {/* Boutons */}
          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={uploading || !formData.title || !formData.description || !formData.content_type}
              className="bg-liberty-blue hover:bg-liberty-blue/90"
            >
              {uploading ? 'Upload en cours...' : 'Créer le contenu'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FileUploader;