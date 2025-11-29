import { useState } from 'react';
import { WelcomePortal } from './components/WelcomePortal';
import { PatientDashboard } from './components/PatientDashboard';
import { PatientPlan } from './components/PatientPlan';
import { PatientProgress } from './components/PatientProgress';
import { PatientProfile } from './components/PatientProfile';
import { DoctorDashboard } from './components/DoctorDashboard';
import { ChatInterface } from './components/ChatInterface';
import { IntegratedJourney } from './components/IntegratedJourney';
import { AyurvedaDashboard } from './components/AyurvedaDashboard';
import { AstroOnboarding } from './components/AstroOnboarding';
import { AstroInsights } from './components/AstroInsights';

import { Login } from './components/Login';
import { Register } from './components/Register';

type Screen = 'welcome' | 'patient-dashboard' | 'doctor-dashboard' | 'chat' | 'integrated-journey' | 'patient-plan' | 'patient-progress' | 'patient-profile' | 'login' | 'register' | 'ayurveda-dashboard' | 'astro-onboarding' | 'astro-insights';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleNavigate = (screen: string) => {
    console.log('Navigating to:', screen);
    console.log('Current screen:', currentScreen);
    setCurrentScreen(screen as Screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'welcome':
        return <WelcomePortal onNavigate={handleNavigate} />;
      case 'patient-dashboard':
        return <PatientDashboard onNavigate={handleNavigate} />;
      case 'patient-plan':
        return <PatientPlan onNavigate={handleNavigate} />;
      case 'patient-progress':
        return <PatientProgress onNavigate={handleNavigate} />;
      case 'patient-profile':
        return <PatientProfile onNavigate={handleNavigate} />;
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
      case 'astro-insights':
        return <AstroInsights onNavigate={handleNavigate} />;
      default:
        return <PatientDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="size-full relative">
      {renderScreen()}

      {/* Development Navigation Menu */}
      <div className="fixed top-4 right-4 z-50 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-2">Dev Navigation</p>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => handleNavigate('login')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'login' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            🔐 Login
          </button>
          <button
            onClick={() => handleNavigate('welcome')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'welcome' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            🚪 Welcome Portal
          </button>
          <button
            onClick={() => handleNavigate('ayurveda-dashboard')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'ayurveda-dashboard' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            🌿 Ayurveda Dashboard
          </button>
          <button
            onClick={() => handleNavigate('astro-onboarding')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'astro-onboarding' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            ✨ Astro Onboarding
          </button>
          <button
            onClick={() => handleNavigate('astro-insights')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'astro-insights' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            ✨ Astro Insights
          </button>
          <button
            onClick={() => handleNavigate('patient-dashboard')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'patient-dashboard' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            🏠 Patient Home
          </button>
          <button
            onClick={() => handleNavigate('patient-plan')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'patient-plan' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            📅 Patient Plan
          </button>
          <button
            onClick={() => handleNavigate('patient-progress')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'patient-progress' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            📊 Patient Progress
          </button>
          <button
            onClick={() => handleNavigate('patient-profile')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'patient-profile' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            👤 Patient Profile
          </button>
          <button
            onClick={() => handleNavigate('doctor-dashboard')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'doctor-dashboard' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            🩺 Practitioner Panel
          </button>
          <button
            onClick={() => handleNavigate('chat')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'chat' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            💬 AI Chat
          </button>
          <button
            onClick={() => handleNavigate('integrated-journey')}
            className={`text-xs px-2 py-1 rounded text-left hover:bg-accent/20 ${currentScreen === 'integrated-journey' ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
          >
            🌐 Journey View
          </button>
        </div>
      </div>
    </div>
  );
}
