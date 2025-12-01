import { useState } from 'react';
import { WelcomePortal } from './components/WelcomePortal';
// Patient Home and Patient Profile removed per requirements
import { DoctorDashboard } from './components/DoctorDashboard';
import { ChatInterface } from './components/ChatInterface';
import { IntegratedJourney } from './components/IntegratedJourney';
import { AyurvedaJourneyDashboard as AyurvedaDashboard } from './components/AyurvedaJourneyDashboard';
import { AstroOnboarding } from './components/AstroOnboarding';
// Astro Insights page removed per requirements

import { Login } from './components/Login';
import { Register } from './components/Register';

type Screen = 'welcome' | 'doctor-dashboard' | 'chat' | 'integrated-journey' | 'login' | 'register' | 'ayurveda-dashboard' | 'astro-onboarding';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleNavigate = (screen: string) => {
    console.log('Navigating to:', screen);
    console.log('Current screen:', currentScreen);
    const removed = ['patient-dashboard', 'patient-profile', 'astro-insights'];
    const target = removed.includes(screen) ? 'ayurveda-dashboard' : screen;
    setCurrentScreen(target as Screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'welcome':
        return <WelcomePortal onNavigate={handleNavigate} />;
      // patient-dashboard and patient-profile removed
      case 'doctor-dashboard':
        return <DoctorDashboard onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatInterface onNavigate={handleNavigate} />;
      case 'integrated-journey':
        return <IntegratedJourney onNavigate={handleNavigate} />;
      case 'ayurveda-dashboard':
        return <AyurvedaDashboard onNavigate={handleNavigate} />;
      case 'astro-onboarding':
        return <AstroOnboarding onNavigate={handleNavigate} />;
      // astro-insights page removed
      default:
        return <AyurvedaDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="size-full relative">
      {typeof window !== 'undefined' && localStorage.getItem('user') && (
        <div className="w-full bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="text-primary font-medium text-sm md:text-base">Welcome Portal</div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleNavigate('ayurveda-dashboard')}
                className={`text-sm md:text-base px-3 py-1 rounded hover:bg-accent/20 ${currentScreen === 'ayurveda-dashboard' ? 'bg-accent text-accent-foreground' : 'text-primary'}`}
              >
                Ayurveda Dashboard
              </button>
              
              <button
                onClick={() => handleNavigate('doctor-dashboard')}
                className={`text-sm md:text-base px-3 py-1 rounded hover:bg-accent/20 ${currentScreen === 'doctor-dashboard' ? 'bg-accent text-accent-foreground' : 'text-primary'}`}
              >
                Practitioner Panel
              </button>
              <button
                onClick={() => handleNavigate('chat')}
                className={`text-sm md:text-base px-3 py-1 rounded hover:bg-accent/20 ${currentScreen === 'chat' ? 'bg-accent text-accent-foreground' : 'text-primary'}`}
              >
                AI Chat
              </button>
              <button
                onClick={() => handleNavigate('integrated-journey')}
                className={`text-sm md:text-base px-3 py-1 rounded hover:bg-accent/20 ${currentScreen === 'integrated-journey' ? 'bg-accent text-accent-foreground' : 'text-primary'}`}
              >
                Journey View
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="size-full">
        {renderScreen()}
      </div>
    </div>
  );
}
