import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import stayInformedHero from '@/assets/stay-informed-hero.jpg';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
});

const StayInformed = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // En production, vous connecteriez ceci à votre service d'email
    console.log(values);
    toast.success("Merci pour votre inscription! Vous recevrez bientôt nos dernières stratégies.");
    form.reset();
  }

  return (
    <Layout>
      <div id="top"></div>
      <div className="py-20 bg-gradient-to-r from-liberty-blue/5 to-liberty-gold/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
              Resté <span className="gradient-text">informés</span>
            </h1>
            
            {/* Illustration Hero */}
            <div className="mb-12">
              <img 
                src={stayInformedHero} 
                alt="Restez informé des dernières stratégies d'affiliation"
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Formulaire */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Reste informé</h2>
                <p className="text-gray-600">
                  Reçois chaque semaine les meilleures stratégies & outils pour booster tes revenus d'affiliation.
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Ton nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="ton-email@exemple.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      className="bg-liberty-gold hover:bg-liberty-gold/90 text-white font-semibold px-8 py-2.5"
                    >
                      Recevoir les stratégies gratuites
                    </Button>
                  </div>
                </form>
              </Form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  ✅ Stratégies d'affiliation exclusives<br/>
                  ✅ Outils IA recommandés<br/>
                  ✅ Opportunités digitales sélectionnées<br/>
                  ✅ Désabonnement en un clic
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StayInformed;