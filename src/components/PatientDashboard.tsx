import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Clock, MessageCircle, Leaf, Heart, Brain, Home, User, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface PatientDashboardProps {
  onNavigate: (screen: string) => void;
}

const wellnessData = [
  { day: 'Mon', wellness: 7 },
  { day: 'Tue', wellness: 8 },
  { day: 'Wed', wellness: 6 },
  { day: 'Thu', wellness: 8 },
  { day: 'Fri', wellness: 9 },
  { day: 'Sat', wellness: 7 },
  { day: 'Sun', wellness: 8 },
];

export function PatientDashboard({ onNavigate }: PatientDashboardProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-background">
      {/* Background Elements */}
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
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl text-primary">
              Namaste, <span className="text-accent">{user.name || 'Guest'}</span>
            </h1>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-sm text-primary">October 15, 2024</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Your Ayurvedic wellness journey continues
          </p>
        </div>

        {/* Today's Plan */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Today's <span className="sanskrit ml-1 text-accent">दिनचर्या</span> Plan
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-card-foreground">Morning Abhyanga</p>
                  <p className="text-sm text-muted-foreground">Warm sesame oil massage</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">6:30 AM</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-card-foreground">Pranayama Practice</p>
                  <p className="text-sm text-muted-foreground">15 minutes breathing exercises</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">7:00 AM</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#D9863C]/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#D9863C]" />
                </div>
                <div>
                  <p className="text-card-foreground">Herbal Tea Blend</p>
                  <p className="text-sm text-muted-foreground">Tulsi & ginger for Vata balance</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">3:00 PM</div>
            </div>
          </div>
        </Card>

        {/* Progress Tracker */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Weekly Wellness Progress</h2>

          <div className="h-32 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wellnessData}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#8B7765' }}
                />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="wellness"
                  stroke="#D9863C"
                  strokeWidth={3}
                  dot={{ fill: '#CFA94B', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl text-accent">85%</p>
              <p className="text-sm text-muted-foreground">Balance Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-accent">12</p>
              <p className="text-sm text-muted-foreground">Days Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-accent">7.8</p>
              <p className="text-sm text-muted-foreground">Avg Wellness</p>
            </div>
          </div>
        </Card>

        {/* Reminders & Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="glassmorphism p-4 text-center bg-card text-card-foreground">
            <Clock className="w-8 h-8 text-[#D9863C] mx-auto mb-2" />
            <p className="text-sm text-card-foreground mb-1">Next Meal</p>
            <p className="text-xs text-muted-foreground">Warm, cooked foods</p>
            <p className="text-xs text-accent mt-1">in 2 hours</p>
          </Card>

          <Card className="glassmorphism p-4 text-center bg-card text-card-foreground">
            <MessageCircle className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-sm text-card-foreground mb-1">Dr. Anjali</p>
            <p className="text-xs text-muted-foreground">Available for chat</p>
            <p className="text-xs text-accent mt-1">Online now</p>
          </Card>
        </div>

        {/* Chat Access */}
        <Button
          onClick={() => onNavigate('chat')}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-4 rounded-xl mb-4"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Chat with AI Guide
        </Button>
      </div>

      
    </div>
  );
}
