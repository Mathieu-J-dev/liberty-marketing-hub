import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader2, CheckCircle, XCircle, Info } from 'lucide-react';
import { useAdminRole } from '@/hooks/useAdminRole';
import { AffiliateProgram } from '@/hooks/useAffiliatePrograms';

const formSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  commission: z.string().min(1, 'La commission est requise'),
  category: z.string().min(1, 'La catégorie est requise'),
  link: z.string().url('Veuillez entrer une URL valide'),
  description: z.string().min(1, 'La description est requise'),
  rating: z.number().min(0).max(5),
  recurring: z.boolean(),
  earnings: z.string().min(1, 'Les gains estimés sont requis'),
  is_public: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

interface AddProgramModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<AffiliateProgram, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  categories: string[];
}

const predefinedCategories = [
  'Marketing',
  'Email Marketing',
  'Hébergement',
  'Design',
  'Productivité',
  'E-commerce',
  'Formation',
];

const AddProgramModal: React.FC<AddProgramModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  categories,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [linkValidation, setLinkValidation] = useState<{
    status: 'idle' | 'checking' | 'valid' | 'invalid';
    message?: string;
  }>({ status: 'idle' });

  const { isAdmin } = useAdminRole();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      commission: '',
      category: '',
      link: '',
      description: '',
      rating: 4.0,
      recurring: false,
      earnings: '',
      is_public: false,
    },
  });

  const validateLink = async (url: string) => {
    if (!url || !url.startsWith('http')) {
      setLinkValidation({ status: 'invalid', message: 'URL invalide' });
      return;
    }

    setLinkValidation({ status: 'checking' });
    
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname) {
        setLinkValidation({ status: 'valid', message: 'Lien valide' });
      } else {
        setLinkValidation({ status: 'invalid', message: 'URL invalide' });
      }
    } catch {
      setLinkValidation({ status: 'invalid', message: 'URL invalide' });
    }
  };

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const category = showCustomCategory ? customCategory : data.category;
      await onSubmit({
        name: data.name,
        commission: data.commission,
        category,
        link: data.link,
        description: data.description,
        rating: data.rating,
        recurring: data.recurring,
        earnings: data.earnings,
        created_by: undefined, // Will be set by auth context
        is_active: true,
        is_public: data.is_public,
      });
      form.reset();
      setCustomCategory('');
      setShowCustomCategory(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const allCategories = [...new Set([...predefinedCategories, ...categories])];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un Programme d'Affiliation</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau programme d'affiliation à votre collection.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du programme</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Systeme.io" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 50% ou €100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <div className="space-y-2">
                      {!showCustomCategory ? (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          placeholder="Nouvelle catégorie"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                        />
                      )}
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => setShowCustomCategory(!showCustomCategory)}
                        className="p-0 h-auto"
                      >
                        {showCustomCategory ? 'Utiliser catégorie existante' : 'Ajouter nouvelle catégorie'}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="earnings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gains estimés</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: €500-2000/mois" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien d'affiliation</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="https://..."
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          validateLink(e.target.value);
                        }}
                        className="pr-10"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {linkValidation.status === 'checking' && (
                          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        )}
                        {linkValidation.status === 'valid' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {linkValidation.status === 'invalid' && (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  {linkValidation.message && (
                    <p className={`text-sm ${
                      linkValidation.status === 'valid' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {linkValidation.message}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez le programme d'affiliation..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note (0-5)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recurring"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Commission récurrente</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Ce programme offre-t-il des commissions récurrentes ?
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {isAdmin && (
              <FormField
                control={form.control}
                name="is_public"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Programme public</FormLabel>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Visible par les visiteurs non connectés (données non sensibles uniquement)
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Ajouter le programme
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProgramModal;