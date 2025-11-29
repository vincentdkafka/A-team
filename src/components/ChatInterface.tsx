import { useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Send, ArrowLeft, Bot, User, Sparkles, Leaf, Brain, 
  Heart, Wind, Flame, Droplets, Home, Calendar,
  BarChart3, MessageCircle
} from 'lucide-react';

interface ChatInterfaceProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  category?: 'dosha' | 'herbs' | 'lifestyle' | 'general';
}

export function ChatInterface({ onNavigate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Namaste! 🙏 I am your Ayurvedic AI guide. How may I assist you today on your wellness journey?',
      timestamp: '10:00 AM',
      category: 'general'
    },
    {
      id: '2',
      type: 'user',
      content: 'What foods balance Pitta?',
      timestamp: '10:01 AM'
    },
    {
      id: '3',
      type: 'ai',
      content: 'For balancing Pitta dosha, favor cooling, sweet, bitter, and astringent tastes. Include foods like:\n\n🥒 Cucumber and leafy greens\n🥛 Cool milk and ghee\n🌿 Coriander and fennel\n🥥 Coconut and sweet fruits\n🌾 Basmati rice and oats\n\nAvoid spicy, salty, and sour foods that can aggravate Pitta. Would you like specific meal suggestions?',
      timestamp: '10:02 AM',
      category: 'dosha'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: getMessageCategory(inputValue)
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputValue('');
  };

  const getMessageCategory = (input: string): 'dosha' | 'herbs' | 'lifestyle' | 'general' => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('vata') || lowerInput.includes('pitta') || lowerInput.includes('kapha')) return 'dosha';
    if (lowerInput.includes('herb') || lowerInput.includes('ashwagandha') || lowerInput.includes('turmeric')) return 'herbs';
    if (lowerInput.includes('routine') || lowerInput.includes('yoga') || lowerInput.includes('sleep')) return 'lifestyle';
    return 'general';
  };

  const getMessageIcon = (category?: string) => {
    switch (category) {
      case 'dosha': return <Wind className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />;
      case 'herbs': return <Leaf className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />;
      case 'lifestyle': return <Heart className="w-4 h-4 text-[#D9863C] flex-shrink-0 mt-0.5" />;
      default: return <Bot className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />;
    }
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('vata')) {
      return 'For Vata balance, focus on warm, moist, and grounding foods. Include:\n\n🍲 Cooked grains (rice, oats)\n🥛 Warm milk with ghee\n🌰 Nuts and seeds\n🍯 Sweet fruits (dates, figs)\n\nEstablish regular routines and practice gentle yoga. Oil massage (Abhyanga) is particularly beneficial for Vata types. 🌿';
    }
    
    if (lowerInput.includes('kapha')) {
      return 'To balance Kapha, choose warm, light, and spicy foods:\n\n🌶️ Ginger and turmeric\n🫘 Legumes and lentils\n🥬 Light vegetables\n🍵 Herbal teas\n\nReduce dairy and heavy foods. Regular exercise and staying active are essential for Kapha types. Consider morning routines with energizing practices. ⚡';
    }
    
    if (lowerInput.includes('sleep') || lowerInput.includes('insomnia')) {
      return 'For better sleep, try these Ayurvedic practices:\n\n🌙 Drink warm milk with nutmeg before bed\n🛁 Take a warm bath with calming oils\n📱 Avoid screens 1 hour before sleep\n🧘‍♀️ Practice gentle pranayama\n🕯️ Use dim lighting in evening\n\nConsider Brahmi or Ashwagandha herbs under guidance. Would you like a specific bedtime routine? 💤';
    }
    
    if (lowerInput.includes('stress') || lowerInput.includes('anxiety')) {
      return 'Ayurvedic approaches for stress management:\n\n🧘‍♀️ Daily meditation and pranayama\n🌿 Calming herbs (Brahmi, Jatamansi)\n💆‍♀️ Regular Abhyanga (oil massage)\n🍃 Spend time in nature\n⚖️ Maintain work-life balance\n🕉️ Chanting or mantra practice\n\nWould you like guided breathing exercises? 🌸';
    }

    if (lowerInput.includes('morning') || lowerInput.includes('routine')) {
      return 'An ideal Ayurvedic morning routine includes:\n\n🌅 Wake before sunrise (6 AM)\n🚿 Tongue scraping and oil pulling\n💧 Drink warm water with lemon\n🧘‍♀️ 10-15 minutes meditation\n💆‍♀️ Abhyanga (self-massage)\n🤸‍♀️ Gentle yoga or exercise\n\nAdapt timing based on your dosha and lifestyle. Consistency is key! ✨';
    }
    
    return 'Thank you for your question! 🙏 Based on Ayurvedic principles, I recommend consulting with a qualified practitioner for personalized guidance. In the meantime, focus on:\n\n• Regular daily routines\n• Fresh, seasonal foods\n• Mindfulness practices\n• Adequate rest\n\nIs there a specific aspect of Ayurveda you\'d like to explore further? 🌿';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('report_file', file);
      const res = await fetch('http://localhost:5678/webhook-test/report', { method: 'POST', body: formData });
      const data = await res.json().catch(() => ({}));
      if (data) {
        localStorage.setItem('ayurveda-dashboard', JSON.stringify(data));
      }
      const aiResponse: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: 'Report processed successfully. The dashboard has been updated with detailed insights. Would you like to view it now?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'general'
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch {
      const aiResponse: Message = {
        id: (Date.now() + 3).toString(),
        type: 'ai',
        content: 'Unable to process the report right now. Please try again or check your connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'general'
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1653364744086-23f5e85de842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsb3R1cyUyMGZsb3dlciUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTg3MjIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Lotus background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col h-screen pb-24">
        {/* Header */}
        <Card className="glassmorphism p-4 m-4 mb-0 bg-card text-card-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('patient-dashboard')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h1 className="text-lg text-card-foreground">
                    <span className="sanskrit text-accent">आयुर्वेद</span> AI Guide
                  </h1>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2 block" />
                    Available 24/7
                  </p>
                </div>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
        </Card>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`max-w-[85%] glassmorphism ${
                  message.type === 'user'
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card text-card-foreground'
                } p-4 shadow-sm`}
              >
                <div className="flex items-start space-x-2 mb-2">
                  {message.type === 'ai' && getMessageIcon(message.category)}
                  {message.type === 'user' && (
                    <User className="w-4 h-4 text-accent-foreground flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className={`text-xs ${
                    message.type === 'user' ? 'text-accent-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp}
                  </p>
                  {message.category && message.type === 'ai' && (
                    <Badge className="text-xs bg-background/20 text-card-foreground border-border/30">
                      {message.category}
                    </Badge>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        <Card className="glassmorphism p-4 mx-4 bg-card text-card-foreground">
          <h3 className="text-sm text-accent mb-3 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            Quick Topics
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { text: 'Morning routine tips', icon: <Brain className="w-4 h-4" /> },
              { text: 'Herbal tea recipes', icon: <Leaf className="w-4 h-4" /> },
              { text: 'Yoga for my dosha', icon: <Heart className="w-4 h-4" /> },
              { text: 'Stress relief techniques', icon: <Wind className="w-4 h-4" /> }
            ].map((suggestion) => (
              <Button
                key={suggestion.text}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(suggestion.text)}
                className="justify-start h-auto p-3 bg-background/10 border-border/30 text-xs text-card-foreground"
              >
                <div className="flex items-center space-x-2">
                  {suggestion.icon}
                  <span>{suggestion.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Input */}
        <Card className="glassmorphism p-4 m-4 mt-0 bg-card text-card-foreground">
          <div className="flex items-center space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Ayurveda, doshas, herbs, lifestyle..."
              className="flex-1 bg-background/20 border-border/30 rounded-xl px-4"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="rounded-xl w-12 h-12 bg-accent hover:bg-accent/90 text-accent-foreground p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
            <input ref={fileInputRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" className="hidden" onChange={handleFileChange} />
            <Button
              onClick={handleUploadClick}
              disabled={isUploading}
              variant="outline"
              className="rounded-xl h-12 px-3 bg-background/10 border-border/30 text-card-foreground"
            >
              {isUploading ? 'Uploading…' : 'Upload Report'}
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            AI responses are for educational purposes. Consult qualified practitioners for treatment.
          </p>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/80 glassmorphism border-t border-border backdrop-blur-lg">
        <div className="flex justify-around py-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              onNavigate('patient-dashboard');
            }}
            className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-accent transition-colors"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onNavigate('patient-plan');
            }}
            className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-accent transition-colors"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Plan</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onNavigate('patient-progress');
            }}
            className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-accent transition-colors"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Progress</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onNavigate('chat');
            }}
            className="flex flex-col items-center space-y-1 text-accent"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Chat</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onNavigate('patient-profile');
            }}
            className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-accent transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
