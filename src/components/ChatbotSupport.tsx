
import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

// Base de connaissances pour les réponses du chatbot
const knowledgeBase = {
  "démarrer en affiliation": "Pour démarrer en affiliation, je vous recommande de suivre ces étapes : 1) Choisissez une niche qui vous passionne, 2) Recherchez des programmes d'affiliation dans cette niche, 3) Créez une plateforme pour promouvoir vos liens, 4) Produisez du contenu de qualité, 5) Analysez vos résultats. Consultez notre plan d'action pour plus de détails.",
  
  "outil": "Les outils essentiels pour l'affiliation dépendent de votre stratégie, mais je recommande : ChatGPT ou Jasper pour la création de contenu, Systeme.io pour l'automatisation, Google Analytics pour le suivi, et un outil email comme GetResponse. Visitez notre page Outils IA pour plus d'options.",
  
  "programme": "Les programmes d'affiliation les plus prometteurs en 2025 sont dans les secteurs du SaaS, de la finance, du bien-être, de l'éducation en ligne et du marketing digital. Consultez notre page Opportunités pour des recommandations personnalisées.",
  
  "taux de conversion": "Pour améliorer votre taux de conversion, ciblez une audience qualifiée, créez des avis honnêtes, utilisez des call-to-action efficaces, proposez des bonus exclusifs et optimisez vos landing pages avec des preuves sociales.",
  
  "arnaques": "Pour éviter les arnaques en affiliation, recherchez la réputation du programme, vérifiez les conditions de paiement, méfiez-vous des promesses de gains extraordinaires, préférez des plateformes établies, et testez vous-même le produit avant de le promouvoir.",
  
  "commissions": "Les taux de commission varient selon les secteurs. Le SaaS offre souvent 20-40% avec des commissions récurrentes, la finance peut aller jusqu'à 50%, tandis que les produits physiques proposent généralement 5-15%. Privilégiez les programmes avec commissions récurrentes pour un revenu stable.",
  
  "trafic": "Pour générer du trafic qualifié vers vos liens d'affiliation, misez sur le SEO, le marketing de contenu, les réseaux sociaux, l'email marketing et éventuellement la publicité payante. La clé est de créer du contenu qui répond aux problèmes de votre audience cible.",
  
  "niche": "Pour choisir une niche rentable en affiliation, recherchez un équilibre entre votre passion, la demande du marché et le potentiel de monétisation. Utilisez des outils comme Google Trends et Amazon Bestsellers pour évaluer la popularité, et analysez la concurrence pour identifier des opportunités."
};

// Messages prédéfinis pour suggérer à l'utilisateur
const suggestedQuestions = [
  "Comment démarrer en affiliation ?",
  "Quels outils sont essentiels pour mon business ?",
  "Quels sont les meilleurs programmes d'affiliation ?",
  "Comment améliorer mon taux de conversion ?",
  "Comment éviter les arnaques en affiliation ?",
  "Quels sont les taux de commission moyens ?",
  "Comment générer du trafic vers mes liens ?",
  "Comment choisir une niche rentable ?"
];

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotSupport = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Bonjour ! Je suis l'assistant virtuel d'Affi-Liberty. Comment puis-je vous aider avec l'affiliation aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Fonction pour faire défiler automatiquement jusqu'au dernier message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fonction pour générer une réponse basée sur la question de l'utilisateur
  const generateResponse = (question: string): string => {
    // Convertir la question en minuscules pour faciliter la correspondance
    const lowerQuestion = question.toLowerCase();
    
    // Vérifier si la question contient des mots-clés de notre base de connaissances
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (lowerQuestion.includes(keyword)) {
        return response;
      }
    }
    
    // Réponse par défaut si aucun mot-clé n'est trouvé
    return "Je ne suis pas sûr de comprendre votre question. Pourriez-vous la reformuler ou choisir l'une des questions suggérées ci-dessous ?";
  };

  // Fonction pour envoyer un message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: messages.length,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simuler la réponse du bot
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 1,
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000); // Délai artificiel pour simuler la réflexion du bot
  };

  // Fonction pour utiliser une question suggérée
  const useSuggestedQuestion = (question: string) => {
    setInput(question);
    
    // Focus sur l'input
    document.getElementById('chat-input')?.focus();
  };

  return (
    <div className="flex flex-col">
      <Card className="bg-white rounded-lg shadow-md">
        <CardContent className="p-0">
          {/* En-tête du chat */}
          <div className="bg-liberty-blue text-white p-4 rounded-t-lg flex items-center">
            <Bot className="w-6 h-6 mr-2" />
            <div>
              <h3 className="font-bold">Assistant Affi-Liberty</h3>
              <p className="text-xs opacity-80">En ligne - Répond instantanément</p>
            </div>
          </div>
          
          {/* Zone des messages */}
          <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-liberty-blue text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Questions suggérées */}
          <div className="p-3 border-t border-gray-200 overflow-x-auto">
            <p className="text-sm font-medium text-gray-500 mb-2">Questions populaires:</p>
            <div className="flex space-x-2 pb-1">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-nowrap"
                  onClick={() => useSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Formulaire d'envoi de message */}
          <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 flex">
            <Input
              id="chat-input"
              type="text"
              placeholder="Tapez votre question ici..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button type="submit" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotSupport;
