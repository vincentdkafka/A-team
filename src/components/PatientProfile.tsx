import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  User, Edit, Settings, Bell, Shield, HelpCircle,
  Calendar, Home, BarChart3, MessageCircle, Wind,
  Flame, Droplets, Phone, Mail, MapPin, Clock
} from 'lucide-react';

interface PatientProfileProps {
  onNavigate: (screen: string) => void;
}

export function PatientProfile({ onNavigate }: PatientProfileProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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

      <div className="relative z-10 p-6 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-primary mb-2">
            Your <span className="sanskrit text-accent">प्रोफ़ाइल</span>
          </h1>
          <p className="text-muted-foreground">Personal information and preferences</p>
        </div>

        {/* Profile Info */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-3xl">
              👨🏽‍💼
            </div>
            <div className="flex-1">
              <h2 className="text-xl text-accent mb-1">{user.name || 'Guest User'}</h2>
              <p className="text-muted-foreground mb-2">{user.age ? `${user.age} years old` : 'Age N/A'} • {user.gender || 'Gender N/A'}</p>
              <div className="flex items-center space-x-2">
                <Badge className="bg-secondary text-secondary-foreground">Vata-Pitta</Badge>
                <Badge variant="outline" className="border-accent text-accent">Active Member</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-card-foreground">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-card-foreground">{user.email || 'email@example.com'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-card-foreground">{user.nativePlace || 'Location N/A'}</span>
            </div>
          </div>
        </Card>

        {/* Constitutional Analysis */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h3 className="text-lg mb-4 text-accent">
            Constitutional Analysis <span className="sanskrit">प्रकृति</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wind className="w-6 h-6 text-secondary" />
                <div>
                  <p className="text-card-foreground">Vāta</p>
                  <p className="text-sm text-muted-foreground">Primary dosha</p>
                </div>
              </div>
              <div className="text-accent">40%</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <Flame className="w-6 h-6 text-saffron" />
                <div>
                  <p className="text-card-foreground">Pitta</p>
                  <p className="text-sm text-muted-foreground">Secondary dosha</p>
                </div>
              </div>
              <div className="text-accent">35%</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-background/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <Droplets className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-card-foreground">Kapha</p>
                  <p className="text-sm text-muted-foreground">Supporting dosha</p>
                </div>
              </div>
              <div className="text-accent">25%</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-accent/10 rounded-lg">
            <p className="text-sm text-card-foreground">
              <strong>Recommendations:</strong> Focus on warm, grounding foods and regular routines
              to balance Vata. Avoid excessive heat and spicy foods to keep Pitta in check.
            </p>
          </div>
        </Card>

        {/* Health Overview */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h3 className="text-lg mb-4 text-accent">Health Overview</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-background/10 rounded-lg">
              <div className="text-2xl text-accent mb-1">85%</div>
              <div className="text-sm text-muted-foreground">Wellness Score</div>
            </div>
            <div className="text-center p-3 bg-background/10 rounded-lg">
              <div className="text-2xl text-accent mb-1">12</div>
              <div className="text-sm text-muted-foreground">Days Streak</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-card-foreground">Current Issues:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-orange-300 text-orange-700">Sleep disturbances</Badge>
              <Badge variant="outline" className="border-green-300 text-green-700">Digestive improvement</Badge>
            </div>
          </div>
        </Card>

        {/* Preferences & Settings */}
        <div className="space-y-4">
          <Card className="glassmorphism p-4 bg-card text-card-foreground">
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-accent" />
                <span className="text-card-foreground">Notifications</span>
              </div>
              <div className="text-muted-foreground">&gt;</div>
            </button>
          </Card>

          <Card className="glassmorphism p-4 bg-card text-card-foreground">
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-card-foreground">Reminder Settings</span>
              </div>
              <div className="text-muted-foreground">&gt;</div>
            </button>
          </Card>

          <Card className="glassmorphism p-4 bg-card text-card-foreground">
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-card-foreground">Privacy & Security</span>
              </div>
              <div className="text-muted-foreground">&gt;</div>
            </button>
          </Card>

          <Card className="glassmorphism p-4 bg-card text-card-foreground">
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-accent" />
                <span className="text-card-foreground">Help & Support</span>
              </div>
              <div className="text-muted-foreground">&gt;</div>
            </button>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 space-y-3">
          <Button
            onClick={() => onNavigate('welcome')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Retake Constitution Quiz
          </Button>
          <Button
            variant="outline"
            className="w-full border-accent text-accent hover:bg-accent/10"
          >
            Export Health Data
          </Button>
        </div>
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
            className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-accent transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Chat</span>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              onNavigate('patient-profile');
            }}
            className="flex flex-col items-center space-y-1 text-accent"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}