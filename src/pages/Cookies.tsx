
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Cookie, Settings2, Info, CheckCircle } from 'lucide-react';

const LegalCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <div className="bg-card p-6 rounded-lg border border-border flex items-start space-x-4 animate-fade-in">
      <div className="text-primary">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <div className="text-muted-foreground space-y-2 text-left">{children}</div>
      </div>
    </div>
  );

const Cookies = () => {
  return (
    <Layout>
      <div id="top"></div>
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 gradient-text">
            Politique de Cookies
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comment nous utilisons les cookies pour améliorer votre navigation.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <LegalCard icon={<Info size={28} />} title="1. Qu'est-ce qu'un cookie ?">
            <p>Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, mobile) lorsque vous visitez un site web. Il permet de conserver des informations pour faciliter votre navigation et proposer des fonctionnalités personnalisées.</p>
          </LegalCard>

          <LegalCard icon={<Cookie size={28} />} title="2. Notre Utilisation des Cookies">
            <p>Nous utilisons des cookies pour :</p>
            <ul className="list-disc list-inside space-y-1">
                <li>Assurer le bon fonctionnement du site.</li>
                <li>Analyser notre trafic pour améliorer nos services (via des outils comme Google Analytics).</li>
                <li>Suivre les performances de nos campagnes d'affiliation.</li>
            </ul>
          </LegalCard>

          <LegalCard icon={<CheckCircle size={28} />} title="3. Cookies de Tiers">
            <p>Certains de nos partenaires (plateformes d'affiliation, services d'analyse) peuvent également déposer des cookies. Nous ne contrôlons pas ces cookies et vous invitons à consulter leurs propres politiques.</p>
          </LegalCard>

          <LegalCard icon={<Settings2 size={28} />} title="4. Gérer vos Préférences">
            <p>Vous pouvez à tout moment configurer votre navigateur pour accepter ou refuser les cookies. Le refus de certains cookies peut toutefois altérer votre expérience sur notre site.</p>
          </LegalCard>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;
