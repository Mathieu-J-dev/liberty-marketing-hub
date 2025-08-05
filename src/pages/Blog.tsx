import React from 'react';
import Layout from '@/components/layout/Layout';
import { CalendarDays, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Les 10 meilleurs programmes d'affiliation en 2025",
      excerpt: "Découvrez les programmes d'affiliation les plus rentables cette année et comment les optimiser.",
      author: "Équipe Affi-Liberty",
      date: "2025-01-15",
      category: "Affiliation",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Comment utiliser l'IA pour automatiser votre marketing",
      excerpt: "Guide complet pour intégrer l'intelligence artificielle dans votre stratégie marketing.",
      author: "Équipe Affi-Liberty",
      date: "2025-01-10",
      category: "Intelligence Artificielle",
      readTime: "8 min"
    },
    {
      id: 3,
      title: "Créer des pages de capture qui convertissent",
      excerpt: "Les techniques avancées pour créer des pages de capture à fort taux de conversion.",
      author: "Équipe Affi-Liberty",
      date: "2025-01-05",
      category: "Conversion",
      readTime: "6 min"
    }
  ];

  return (
    <Layout>
      <div className="section py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              Blog Affi-Liberty
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos derniers articles, conseils et stratégies pour réussir dans l'affiliation marketing et générer des revenus passifs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User size={14} />
                      <span>{post.author}</span>
                      <CalendarDays size={14} />
                      <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Lire <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Plus d'articles arrivent bientôt !
            </p>
            <Button variant="outline">
              S'abonner à la newsletter
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;