import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  TrendingUp, Activity, Heart, Brain, Calendar, 
  Home, User, BarChart3, MessageCircle, Target
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PatientProgressProps {
  onNavigate: (screen: string) => void;
}

const wellnessData = [
  { day: 'Mon', wellness: 7, energy: 6, sleep: 8 },
  { day: 'Tue', wellness: 8, energy: 7, sleep: 9 },
  { day: 'Wed', wellness: 6, energy: 5, sleep: 6 },
  { day: 'Thu', wellness: 8, energy: 8, sleep: 8 },
  { day: 'Fri', wellness: 9, energy: 9, sleep: 9 },
  { day: 'Sat', wellness: 7, energy: 7, sleep: 7 },
  { day: 'Sun', wellness: 8, energy: 8, sleep: 8 },
];

const monthlyData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 88 },
];

const doshaBalance = [
  { name: 'Vata', value: 35, color: '#6B8E23' },
  { name: 'Pitta', value: 40, color: '#D9863C' },
  { name: 'Kapha', value: 25, color: '#CFA94B' },
];

const progressData = [{ value: 85 }];

export function PatientProgress({ onNavigate }: PatientProgressProps) {
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
            Your Wellness <span className="sanskrit text-accent">प्रगति</span>
          </h1>
          <p className="text-muted-foreground">Track your Ayurvedic journey</p>
        </div>

        {/* Overall Wellness Score */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-accent">Overall Wellness Score</h2>
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={progressData}>
                  <RadialBar 
                    dataKey="value" 
                    cornerRadius={10} 
                    fill="#D9863C"
                    stroke="#CFA94B"
                    strokeWidth={2}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl text-accent">85</div>
                  <div className="text-sm text-muted-foreground">%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-secondary">12</div>
              <div className="text-sm text-muted-foreground">Days Streak</div>
            </div>
            <div>
              <div className="text-2xl text-[#D9863C]">7.8</div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </div>
            <div>
              <div className="text-2xl text-accent">↗️ 15%</div>
              <div className="text-sm text-muted-foreground">Improvement</div>
            </div>
          </div>
        </Card>

        {/* Weekly Trends */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h3 className="text-lg mb-4 text-accent">Weekly Wellness Trends</h3>
          
          <div className="h-48 mb-4">
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
                  dot={{ fill: '#CFA94B', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#6B8E23" 
                  strokeWidth={2}
                  dot={{ fill: '#6B8E23', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#3B2E2E" 
                  strokeWidth={2}
                  dot={{ fill: '#3B2E2E', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center space-x-6 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-[#D9863C] rounded-full" />
              <span className="text-card-foreground">Wellness</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-secondary rounded-full" />
              <span className="text-card-foreground">Energy</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-card-foreground">Sleep</span>
            </div>
          </div>
        </Card>

        {/* Dosha Balance */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h3 className="text-lg mb-4 text-accent flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Current Dosha Balance
          </h3>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={doshaBalance}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {doshaBalance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            {doshaBalance.map((dosha) => (
              <div key={dosha.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dosha.color }}
                  />
                  <span className="text-card-foreground sanskrit">{dosha.name}</span>
                </div>
                <span className="text-accent">{dosha.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Progress */}
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h3 className="text-lg mb-4 text-accent">Monthly Progress</h3>
          
          <div className="h-32 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#8B7765' }}
                />
                <YAxis hide />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#CFA94B" 
                  fill="#CFA94B"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="glassmorphism p-4 bg-card text-card-foreground">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-card-foreground">Activity</p>
                <p className="text-2xl text-accent">92%</p>
                <p className="text-xs text-muted-foreground">Compliance</p>
              </div>
            </div>
          </Card>

          <Card className="glassmorphism p-4 bg-card text-card-foreground">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#D9863C]/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#D9863C]" />
              </div>
              <div>
                <p className="text-card-foreground">Vitality</p>
                <p className="text-2xl text-[#D9863C]">8.2</p>
                <p className="text-xs text-muted-foreground">Out of 10</p>
              </div>
            </div>
          </Card>
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
            className="flex flex-col items-center space-y-1 text-accent"
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