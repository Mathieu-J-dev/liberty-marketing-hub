
import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import ChatbotSupport from '@/components/ChatbotSupport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FAQ = () => {
  return (
    <Layout>
      <div id="top"></div>
      <div className="section py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Foire Aux Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez des réponses à vos questions sur l'affiliation ou posez directement vos questions à notre assistant.
            </p>
          </div>
          
          <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="faq">Questions fréquentes</TabsTrigger>
              <TabsTrigger value="chatbot">Assistant virtuel</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="border p-6 rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Comment démarrer en affiliation ?</AccordionTrigger>
                  <AccordionContent>
                    Pour démarrer en affiliation, suivez ces étapes essentielles : 
                    <ol className="list-decimal ml-5 mt-2 space-y-2">
                      <li>Choisissez une niche qui vous passionne et qui a un potentiel commercial</li>
                      <li>Recherchez des programmes d'affiliation pertinents pour votre niche</li>
                      <li>Créez une plateforme (blog, chaîne YouTube, compte Instagram) pour promouvoir vos liens</li>
                      <li>Produisez du contenu de qualité qui aide votre audience</li>
                      <li>Intégrez stratégiquement vos liens d'affiliation dans votre contenu</li>
                      <li>Analysez vos résultats et ajustez votre stratégie</li>
                    </ol>
                    <p className="mt-3">Consultez notre <a href="/action-plan" className="text-liberty-blue underline">plan d'action</a> pour un guide plus détaillé.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Quel outil choisir pour mon business d'affiliation ?</AccordionTrigger>
                  <AccordionContent>
                    Les outils essentiels pour votre business d'affiliation dépendent de votre stratégie, mais voici les indispensables :
                    <ul className="list-disc ml-5 mt-2 space-y-2">
                      <li><strong>Création de contenu :</strong> Jasper AI, ChatGPT ou Notion AI pour générer des textes de qualité</li>
                      <li><strong>Automatisation :</strong> Systeme.io pour l'automatisation de vos campagnes marketing</li>
                      <li><strong>Analyse :</strong> Google Analytics pour suivre votre trafic et vos conversions</li>
                      <li><strong>Email marketing :</strong> GetResponse ou ActiveCampaign pour vos séquences d'emails</li>
                      <li><strong>SEO :</strong> SEMrush ou Ahrefs pour optimiser votre référencement</li>
                    </ul>
                    <p className="mt-3">Découvrez notre sélection complète sur la page <a href="/tools" className="text-liberty-blue underline">Outils IA</a>.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Quels sont les meilleurs programmes d'affiliation en 2025 ?</AccordionTrigger>
                  <AccordionContent>
                    Les programmes d'affiliation les plus rentables en 2025 se trouvent dans ces secteurs :
                    <ul className="list-disc ml-5 mt-2 space-y-2">
                      <li><strong>SaaS et outils numériques :</strong> commissions récurrentes et produits à forte valeur</li>
                      <li><strong>Finance et investissement :</strong> crypto-monnaies, trading et éducation financière</li>
                      <li><strong>Santé et bien-être :</strong> compléments alimentaires, programmes de fitness</li>
                      <li><strong>Éducation en ligne :</strong> formations professionnelles et développement personnel</li>
                      <li><strong>Marketing digital :</strong> outils d'automatisation et formations</li>
                    </ul>
                    <p className="mt-3">Consultez notre page <a href="/opportunities" className="text-liberty-blue underline">Opportunités</a> pour des recommandations détaillées.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Comment augmenter mon taux de conversion ?</AccordionTrigger>
                  <AccordionContent>
                    Pour améliorer votre taux de conversion en affiliation :
                    <ul className="list-disc ml-5 mt-2 space-y-2">
                      <li>Ciblez une audience qualifiée et intéressée par les produits</li>
                      <li>Créez des avis et tests honnêtes des produits</li>
                      <li>Utilisez des call-to-action clairs et stratégiquement placés</li>
                      <li>Proposez des bonus exclusifs en complément du produit promu</li>
                      <li>Optimisez vos pages d'atterrissage avec des témoignages et preuves sociales</li>
                      <li>Testez différentes approches et analysez les résultats</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Comment éviter les arnaques en affiliation ?</AccordionTrigger>
                  <AccordionContent>
                    Pour éviter les arnaques et programmes d'affiliation peu fiables :
                    <ul className="list-disc ml-5 mt-2 space-y-2">
                      <li>Recherchez la réputation du programme et lisez les avis</li>
                      <li>Vérifiez les conditions de paiement (fréquence, seuil minimum)</li>
                      <li>Méfiez-vous des promesses de gains extraordinaires sans effort</li>
                      <li>Préférez les plateformes d'affiliation établies comme Amazon, Awin, ou CJ Affiliate</li>
                      <li>Testez vous-même le produit avant de le promouvoir</li>
                      <li>Contactez le support du programme pour tester leur réactivité</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            <TabsContent value="chatbot" className="border p-6 rounded-lg">
              <ChatbotSupport />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
