import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Calendar, ChevronLeft, ChevronRight, Leaf, Brain, 
  Heart, Clock, CheckCircle, Circle, Home, User, 
  BarChart3, MessageCircle, Settings
} from 'lucide-react';

interface PatientPlanProps {
  onNavigate: (screen: string) => void;
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const today = currentDate.getDate();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

const activities = {
  15: { therapy: true, yoga: true, diet: true, completed: true },
  16: { therapy: true, yoga: false, diet: true, completed: false },
  17: { therapy: false, yoga: true, diet: true, completed: false },
  18: { therapy: true, yoga: true, diet: false, completed: false },
  19: { therapy: true, yoga: true, diet: true, completed: false },
  20: { therapy: false, yoga: true, diet: true, completed: false },
};

export function PatientPlan({ onNavigate }: PatientPlanProps) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today && selectedMonth === currentMonth && selectedYear === currentYear;
      const activity = activities[day as keyof typeof activities];
      const isCompleted = activity?.completed;

      days.push(
        <div key={day} className={`h-12 p-1 rounded-lg relative cursor-pointer transition-all ${
          isToday ? 'bg-[#D9863C] ring-2 ring-accent' : 
          isCompleted ? 'bg-secondary/20' : 
          'hover:bg-card/10'
        }`}>
          <div className={`text-sm ${isToday ? 'text-white' : 'text-foreground'} text-center`}>
            {day}
          </div>
          {activity && (
            <div className="flex space-x-1 justify-center mt-1">
              {activity.therapy && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
              {activity.yoga && <div className="w-1.5 h-1.5 bg-secondary rounded-full" />}
              {activity.diet && <div className="w-1.5 h-1.5 bg-[#D9863C] rounded-full" />}
            </div>
          )}
        </div>
      );
    }

    return days;
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

      <div className="relative z-10 p-6 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-primary mb-2">
            Your <span className="sanskrit text-accent">दिनचर्या</span> Plan
          </h1>
          <p className="text-muted-foreground">Daily routine and monthly overview</p>
        </div>

        {/* Calendar Widget */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (selectedMonth === 0) {
                  setSelectedMonth(11);
                  setSelectedYear(selectedYear - 1);
                } else {
                  setSelectedMonth(selectedMonth - 1);
                }
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <h2 className="text-lg text-accent">
              {monthNames[selectedMonth]} {selectedYear}
            </h2>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (selectedMonth === 11) {
                  setSelectedMonth(0);
                  setSelectedYear(selectedYear + 1);
                } else {
                  setSelectedMonth(selectedMonth + 1);
                }
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground py-2">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-6 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-card-foreground">Therapy</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="text-card-foreground">Yoga</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#D9863C] rounded-full" />
              <span className="text-card-foreground">Diet</span>
            </div>
          </div>
        </Card>

        {/* Today's Detailed Plan */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h3 className="text-lg mb-4 text-accent flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Today's Detailed Plan
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-card-foreground">Morning Abhyanga</p>
                  <p className="text-sm text-muted-foreground">Warm sesame oil massage</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">6:30 AM</span>
                <CheckCircle className="w-5 h-5 text-secondary" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-card-foreground">Pranayama Practice</p>
                  <p className="text-sm text-muted-foreground">15 minutes breathing exercises</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">7:00 AM</span>
                <Circle className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#D9863C]/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#D9863C]" />
                </div>
                <div>
                  <p className="text-card-foreground">Herbal Tea Blend</p>
                  <p className="text-sm text-muted-foreground">Tulsi & ginger for Vata balance</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">3:00 PM</span>
                <Circle className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </Card>

        {/* Weekly Goals */}
        <Card className="glassmorphism p-6 bg-card text-card-foreground">
          <h3 className="text-lg mb-4 text-accent">Weekly Goals</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Complete 5 Abhyanga sessions</span>
              <Badge className="bg-secondary text-secondary-foreground">4/5</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Daily Pranayama practice</span>
              <Badge className="bg-[#D9863C] text-[#3B2E2E]">3/7</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Follow prescribed diet</span>
              <Badge className="bg-accent text-accent-foreground">6/7</Badge>
            </div>
          </div>
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
            className="flex flex-col items-center space-y-1 text-accent"
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