import React from 'react';
import Layout from '@/components/layout/Layout';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "De 0€ à 3000€/mois en 6 mois avec l'affiliation",
      client: "Marie, Blogueuse Lifestyle",
      industry: "Lifestyle & Beauté",
      duration: "6 mois",
      results: {
        revenue: "3 000€/mois",
        growth: "+450%",
        conversion: "8.2%",
        traffic: "25 000 visiteurs/mois"
      },
      strategy: "Niche spécialisée + Content marketing + Email automation",
      description: "Marie a transformé son blog lifestyle en machine à revenus grâce à une stratégie d'affiliation ciblée et des outils d'automatisation.",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Start-up SaaS : 15 000€ de revenus récurrents",
      client: "Thomas, Entrepreneur Tech",
      industry: "SaaS & Outils",
      duration: "4 mois",
      results: {
        revenue: "15 000€/mois",
        growth: "+320%",
        conversion: "12.5%",
        traffic: "40 000 visiteurs/mois"
      },
      strategy: "Partenariats stratégiques + Webinaires + Community building",
      description: "Thomas a développé un écosystème d'affiliation autour de son expertise en outils SaaS, créant une communauté engagée.",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Formation en ligne : 8 000€ en 30 jours",
      client: "Sophie, Coach Business",
      industry: "Formation & Coaching",
      duration: "1 mois",
      results: {
        revenue: "8 000€",
        growth: "+200%",
        conversion: "15.3%",
        traffic: "12 000 visiteurs"
      },
      strategy: "Landing pages optimisées + Retargeting + Urgence",
      description: "Sophie a lancé sa première formation en ligne avec une stratégie d'affiliation intensive sur 30 jours.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <Layout>
      <div className="section py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              Études de Cas
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment nos clients ont transformé leur business grâce aux stratégies d'affiliation et de marketing digital que nous enseignons.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={study.id} className="overflow-hidden">
                <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 lg:p-8">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-2">
                        {study.industry}
                      </Badge>
                      <h2 className="text-2xl font-bold mb-2">{study.title}</h2>
                      <p className="text-muted-foreground">
                        {study.client} • {study.duration}
                      </p>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {study.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="text-green-600" size={20} />
                        <div>
                          <div className="font-semibold">{study.results.revenue}</div>
                          <div className="text-sm text-muted-foreground">Revenus</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-blue-600" size={20} />
                        <div>
                          <div className="font-semibold">{study.results.growth}</div>
                          <div className="text-sm text-muted-foreground">Croissance</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Target className="text-orange-600" size={20} />
                        <div>
                          <div className="font-semibold">{study.results.conversion}</div>
                          <div className="text-sm text-muted-foreground">Conversion</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="text-purple-600" size={20} />
                        <div>
                          <div className="font-semibold">{study.results.traffic}</div>
                          <div className="text-sm text-muted-foreground">Trafic</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Stratégie utilisée :</h4>
                      <p className="text-sm text-muted-foreground">{study.strategy}</p>
                    </div>

                    <Button variant="outline">
                      Lire l'étude complète
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 p-8 bg-muted rounded-lg">
            <h3 className="text-xl font-bold mb-4">Vous voulez des résultats similaires ?</h3>
            <p className="text-muted-foreground mb-6">
              Découvrez nos méthodes et stratégies pour développer votre business d'affiliation.
            </p>
            <Button size="lg">
              Commencer maintenant
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseStudies;