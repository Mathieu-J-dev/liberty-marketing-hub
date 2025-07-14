
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Gavel, FileText, Shield, AlertTriangle } from 'lucide-react';

const LegalCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="bg-card p-6 rounded-lg border border-border flex items-start space-x-4 animate-fade-in">
    <div className="text-primary">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <div className="text-muted-foreground space-y-2 text-left">{children}</div>
    </div>
  </div>
);

const Terms = () => {
  return (
    <Layout>
      <div id="top"></div>
      <div className="container mx-auto px-4 py-12 md:py-16 text-center">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 gradient-text">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <LegalCard icon={<FileText size={28} />} title="1. Objet">
            <p>Les présentes Conditions Générales d'Utilisation (CGU) encadrent l'accès et l'utilisation des services proposés par le site Affi-Liberty. L'utilisation du site implique l'acceptation sans réserve des présentes conditions.</p>
          </LegalCard>

          <LegalCard icon={<Gavel size={28} />} title="2. Droit Applicable et Juridiction">
            <p>La législation française régit ces conditions. En cas de litige non résolu à l'amiable, les tribunaux de Paris seront seuls compétents.</p>
          </LegalCard>

          <LegalCard icon={<Shield size={28} />} title="3. Propriété Intellectuelle">
            <p>Tous les contenus présents sur le site Affi-Liberty (textes, images, logos, vidéos) sont la propriété exclusive de Affi-Liberty S.A.S ou de ses partenaires. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.</p>
          </LegalCard>

          <LegalCard icon={<AlertTriangle size={28} />} title="4. Limitation de Responsabilité">
            <p>Affi-Liberty ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité d'y accéder. Les liens externes et les contenus affiliés sont fournis à titre informatif et n'engagent pas notre responsabilité.</p>
          </LegalCard>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
