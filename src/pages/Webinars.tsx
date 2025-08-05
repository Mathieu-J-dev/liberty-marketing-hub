import React from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, Clock, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Webinars = () => {
  const upcomingWebinars = [
    {
      id: 1,
      title: "Masterclass : Générer 1000€/mois avec l'affiliation",
      description: "Stratégies avancées pour créer un système d'affiliation rentable et automatisé.",
      date: "2025-02-15",
      time: "20:00",
      duration: "90 min",
      participants: 247,
      status: "upcoming",
      speaker: "Expert Affi-Liberty"
    },
    {
      id: 2,
      title: "IA et Marketing : Automatiser ses revenus",
      description: "Comment utiliser l'intelligence artificielle pour optimiser vos campagnes marketing.",
      date: "2025-02-22",
      time: "20:00",
      duration: "60 min", 
      participants: 189,
      status: "upcoming",
      speaker: "Expert Affi-Liberty"
    }
  ];

  const pastWebinars = [
    {
      id: 3,
      title: "Les secrets des pages de capture performantes",
      description: "Techniques pour créer des pages qui convertissent à plus de 30%.",
      date: "2025-01-20",
      duration: "75 min",
      participants: 324,
      status: "replay",
      speaker: "Expert Affi-Liberty"
    }
  ];

  return (
    <Layout>
      <div className="section py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              Webinaires Affi-Liberty
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Participez à nos sessions en direct pour apprendre les stratégies les plus efficaces en marketing digital et affiliation.
            </p>
          </div>

          {/* Webinaires à venir */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Webinaires à venir</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingWebinars.map((webinar) => (
                <Card key={webinar.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">
                        <Video size={14} className="mr-1" />
                        En direct
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users size={14} />
                        <span>{webinar.participants} inscrits</span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{webinar.title}</CardTitle>
                    <CardDescription>{webinar.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(webinar.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{webinar.time} - {webinar.duration}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Animé par {webinar.speaker}
                      </div>
                      <Button className="w-full">
                        S'inscrire gratuitement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Replays */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Replays disponibles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastWebinars.map((webinar) => (
                <Card key={webinar.id}>
                  <CardHeader>
                    <Badge variant="outline" className="w-fit mb-2">
                      Replay disponible
                    </Badge>
                    <CardTitle className="line-clamp-2">{webinar.title}</CardTitle>
                    <CardDescription>{webinar.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(webinar.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{webinar.duration}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Regarder le replay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Ne manquez aucun webinaire !
            </p>
            <Button>
              S'abonner aux notifications
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Webinars;