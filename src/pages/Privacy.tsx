
import React from 'react';
import Layout from '@/components/layout/Layout';
import { ShieldCheck, Database, UserCog, Mail } from 'lucide-react';

const LegalCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <div className="bg-card p-6 rounded-lg border border-border flex items-start space-x-4 animate-fade-in">
      <div className="text-primary">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <div className="text-muted-foreground space-y-2 text-left">{children}</div>
      </div>
    </div>
  );

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 gradient-text">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Votre confiance est notre priorité. Nous nous engageons à protéger vos données personnelles.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <LegalCard icon={<Database size={28} />} title="1. Collecte des Données">
            <p>Nous collectons les informations que vous nous fournissez directement, comme votre nom et votre adresse e-mail, lors de votre inscription à notre newsletter ou via notre formulaire de contact.</p>
          </LegalCard>

          <LegalCard icon={<UserCog size={28} />} title="2. Utilisation des Données">
            <p>Vos données sont utilisées pour personnaliser votre expérience, vous fournir le contenu demandé, améliorer notre site et vous communiquer des offres pertinentes. Elles ne sont jamais vendues à des tiers.</p>
          </LegalCard>

          <LegalCard icon={<ShieldCheck size={28} />} title="3. Protection des Données">
            <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre l'accès, la modification ou la divulgation non autorisée.</p>
          </LegalCard>
          
          <LegalCard icon={<Mail size={28} />} title="4. Vos Droits">
            <p>Conformément à la loi, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à <a href="mailto:contact@affi-liberty.com" className="text-primary hover:underline">contact@affi-liberty.com</a>.</p>
          </LegalCard>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
