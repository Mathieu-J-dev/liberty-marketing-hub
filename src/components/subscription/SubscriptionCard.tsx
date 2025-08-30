
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Crown, Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
  trial_end?: string;
}

const SubscriptionCard = () => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({ subscribed: false });
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const { toast } = useToast();

  const checkSubscriptionStatus = async () => {
    setCheckingStatus(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) {
        console.error('Erreur lors de la vérification:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de vérifier le statut de l'abonnement",
        });
        return;
      }

      if (data) {
        setSubscriptionData(data);
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      
      if (error) {
        console.error('Erreur checkout:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de créer la session de paiement",
        });
        return;
      }

      if (data?.url) {
        const newWindow = window.open(data.url, '_blank');
        if (newWindow) {
          newWindow.opener = null;
        }
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        console.error('Erreur portal:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible d'accéder au portail client",
        });
        return;
      }

      if (data?.url) {
        const newWindow = window.open(data.url, '_blank');
        if (newWindow) {
          newWindow.opener = null;
        }
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isInTrialPeriod = () => {
    if (!subscriptionData.trial_end) return false;
    return new Date(subscriptionData.trial_end) > new Date();
  };

  useEffect(() => {
    checkSubscriptionStatus();
    
    // Vérifier le statut toutes les 30 secondes
    const interval = setInterval(checkSubscriptionStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Crown className="mr-2 h-5 w-5 text-liberty-gold" />
            <CardTitle>Abonnement Premium</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkSubscriptionStatus}
            disabled={checkingStatus}
          >
            {checkingStatus ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Actualiser
          </Button>
        </div>
        <CardDescription>
          Gérez votre abonnement Affi-Liberty Premium
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Statut :</span>
          <Badge 
            variant={subscriptionData.subscribed ? "default" : "secondary"}
            className={subscriptionData.subscribed ? "bg-green-100 text-green-800" : ""}
          >
            {subscriptionData.subscribed ? "Actif" : "Inactif"}
          </Badge>
        </div>

        {subscriptionData.subscription_tier && (
          <div className="flex items-center justify-between">
            <span className="font-medium">Niveau :</span>
            <Badge variant="outline">{subscriptionData.subscription_tier}</Badge>
          </div>
        )}

        {isInTrialPeriod() && (
          <div className="flex items-center justify-between">
            <span className="font-medium">Essai gratuit jusqu'au :</span>
            <span className="text-sm text-liberty-blue font-medium">
              {formatDate(subscriptionData.trial_end)}
            </span>
          </div>
        )}

        {subscriptionData.subscription_end && !isInTrialPeriod() && (
          <div className="flex items-center justify-between">
            <span className="font-medium">Prochaine facturation :</span>
            <span className="text-sm">
              {formatDate(subscriptionData.subscription_end)}
            </span>
          </div>
        )}

        <div className="border-t pt-4">
          {!subscriptionData.subscribed ? (
            <div className="space-y-3">
              <div className="text-center p-4 bg-liberty-blue/5 rounded-lg">
                <h3 className="font-semibold text-liberty-blue mb-2">
                  Démarrez votre essai gratuit de 14 jours !
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Puis seulement 49€/mois. Annulable à tout moment.
                </p>
                <ul className="text-sm text-left space-y-1 mb-4">
                  <li>✅ Accès à tous les outils IA</li>
                  <li>✅ Formations exclusives</li>
                  <li>✅ Support prioritaire</li>
                  <li>✅ Programmes d'affiliation premium</li>
                </ul>
              </div>
              <Button 
                onClick={handleCheckout} 
                disabled={loading}
                className="w-full bg-liberty-gold hover:bg-liberty-gold/90"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CreditCard className="mr-2 h-4 w-4" />
                )}
                Commencer l'essai gratuit
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">
                  🎉 Abonnement actif !
                </h3>
                <p className="text-sm text-green-600">
                  Vous avez accès à toutes les fonctionnalités premium.
                </p>
              </div>
              <Button 
                onClick={handleManageSubscription} 
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Calendar className="mr-2 h-4 w-4" />
                )}
                Gérer l'abonnement
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
