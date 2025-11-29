import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Wind, Flame, Droplets } from 'lucide-react';

interface WelcomePortalProps {
  onNavigate: (screen: string) => void;
}

export function WelcomePortal({ onNavigate }: WelcomePortalProps) {
  const [selectedDosha, setSelectedDosha] = useState<string | null>(null);

  const doshas = [
    {
      name: 'Vāta',
      sanskrit: 'वात',
      description: 'Air & Space • Movement & Change',
      icon: Wind,
      color: 'from-blue-200/20 to-purple-200/20',
      borderColor: 'border-blue-300/30'
    },
    {
      name: 'Pitta',
      sanskrit: 'पित्त',
      description: 'Fire & Water • Transformation & Energy',
      icon: Flame,
      color: 'from-orange-200/20 to-red-200/20',
      borderColor: 'border-orange-300/30'
    },
    {
      name: 'Kapha',
      sanskrit: 'कफ',
      description: 'Earth & Water • Structure & Stability',
      icon: Droplets,
      color: 'from-green-200/20 to-emerald-200/20',
      borderColor: 'border-green-300/30'
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1704423896061-b0a1057e20a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJzJTIwbmF0dXJhbHxlbnwxfHx8fDE3NTg2ODM5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mandala background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-orange-900/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-6 text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl mb-4 text-primary">
            <span className="sanskrit text-5xl text-accent">आयुर्सूत्र</span>
          </h1>
          <h2 className="text-2xl mb-2 text-primary">AyurSutra</h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Discover your constitutional type through ancient wisdom and modern AI
          </p>
        </div>

        {/* Prakriti Portal */}
        <div className="w-full max-w-sm space-y-4 mb-8">
          <h3 className="text-lg mb-6 text-primary">
            Choose Your <span className="sanskrit text-accent">प्रकृति</span> Prakriti
          </h3>
          
          {doshas.map((dosha) => {
            const Icon = dosha.icon;
            return (
              <Card
                key={dosha.name}
                className={`glassmorphism cursor-pointer transition-all duration-300 hover:scale-105 p-6 ${
                  selectedDosha === dosha.name ? 'ring-2 ring-accent shadow-lg' : ''
                } ${dosha.borderColor} bg-gradient-to-r ${dosha.color}`}
                onClick={() => setSelectedDosha(dosha.name)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-baseline space-x-2">
                      <h4 className="text-lg text-primary">{dosha.name}</h4>
                      <span className="sanskrit text-sm text-accent">{dosha.sanskrit}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {dosha.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => onNavigate('patient-dashboard')}
          className="w-full max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl text-lg shadow-lg"
          disabled={!selectedDosha}
        >
          <span className="mr-2">🕉️</span>
          Start Your Ayurvedic Journey
        </Button>

        {/* Navigation Links */}
        <div className="mt-8 flex space-x-6">
          <button
            onClick={() => onNavigate('doctor-dashboard')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
          >
            Practitioner Portal
          </button>
          <button
            onClick={() => onNavigate('chat')}
            className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
          >
            AI Consultation
          </button>
        </div>
      </div>
    </div>
  );
}