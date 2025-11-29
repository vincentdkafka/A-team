import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Wind, Flame, Droplets, Calendar, Clock, MessageCircle, 
  Stethoscope, Brain, User, Activity, Star, AlertTriangle,
  ArrowRight, TrendingUp, Heart, Leaf, Bell, CheckCircle
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface IntegratedJourneyProps {
  onNavigate: (screen: string) => void;
}

const wellnessData = [
  { day: 'Mon', wellness: 7, satisfaction: 8 },
  { day: 'Tue', wellness: 8, satisfaction: 9 },
  { day: 'Wed', wellness: 6, satisfaction: 7 },
  { day: 'Thu', wellness: 8, satisfaction: 8 },
  { day: 'Fri', wellness: 9, satisfaction: 9 },
  { day: 'Sat', wellness: 7, satisfaction: 8 },
  { day: 'Sun', wellness: 8, satisfaction: 8 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
];

export function IntegratedJourney({ onNavigate }: IntegratedJourneyProps) {
  const [selectedDosha, setSelectedDosha] = useState<string>('Vata');

  const doshas = [
    {
      name: 'Vāta',
      sanskrit: 'वात',
      icon: Wind,
      color: 'from-blue-200/20 to-purple-200/20'
    },
    {
      name: 'Pitta',
      sanskrit: 'पित्त',
      icon: Flame,
      color: 'from-orange-200/20 to-red-200/20'
    },
    {
      name: 'Kapha',
      sanskrit: 'कफ',
      icon: Droplets,
      color: 'from-green-200/20 to-emerald-200/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Parchment Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1694788396363-8e0b209a8f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjB0ZXh0dXJlJTIwYW5jaWVudCUyMHBhcGVyfGVufDF8fHx8MTc1ODczNTg1NHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Parchment texture"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Flowing Connection Lines */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8B5A2B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7A8471" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Flowing curves connecting panels */}
          <path 
            d="M 300 200 Q 600 150 900 250" 
            stroke="url(#flowGradient)" 
            strokeWidth="3" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M 300 400 Q 600 350 900 450" 
            stroke="url(#flowGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M 150 600 Q 600 550 1050 650" 
            stroke="url(#flowGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      <div className="relative z-10 p-8">
        {/* Main Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 text-primary">
            <span className="sanskrit text-6xl text-accent">आयुर्सूत्र</span>
          </h1>
          <h2 className="text-3xl mb-2 text-primary">The Integrated Healing Journey</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualizing seamless care across Patient, Doctor, and Admin perspectives
          </p>
        </div>

        {/* Panel Layout */}
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
          
          {/* Panel 1: Patient Onboarding & Discovery (Rohan's Mobile) */}
          <div className="col-span-3">
            <Card className="glassmorphism p-6 h-full bg-gradient-to-br from-blue-100/20 to-purple-100/20">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-accent rounded-full mr-2" />
                <h3 className="text-lg text-primary">Panel 1: Patient Discovery</h3>
              </div>
              
              {/* Mobile Frame */}
              <div className="bg-background/80 rounded-2xl p-4 shadow-lg border-2 border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-muted-foreground">👋 Welcome Rohan</div>
                  <div className="text-xs text-muted-foreground">📱 Mobile App</div>
                </div>
                
                {/* Prakriti Portal */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm text-primary text-center">
                    Choose Your <span className="sanskrit text-accent text-xs">प्रकृति</span>
                  </h4>
                  
                  {doshas.map((dosha) => {
                    const Icon = dosha.icon;
                    return (
                      <div
                        key={dosha.name}
                        className={`p-2 rounded-lg border cursor-pointer transition-all text-xs ${
                          selectedDosha === dosha.name ? 'ring-1 ring-accent bg-accent/10' : 'bg-card/50'
                        }`}
                        onClick={() => setSelectedDosha(dosha.name)}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <div>
                            <span className="text-primary">{dosha.name}</span>
                            <span className="sanskrit ml-1 text-accent text-xs">{dosha.sanskrit}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button size="sm" className="w-full bg-primary text-primary-foreground text-xs mb-3">
                  Complete Quiz
                </Button>

                {/* Centers Near You */}
                <div className="space-y-2">
                  <h5 className="text-xs text-primary">Centers Near Prayagraj</h5>
                  <div className="space-y-1">
                    <div className="p-2 bg-card/60 rounded text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-primary">Vedic Wellness Center</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-accent mr-1" />
                          <span className="text-xs">4.8</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">2.3 km • Dr. Anjali</div>
                    </div>
                    <div className="p-2 bg-card/40 rounded text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-primary">Ayur Clinic</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-accent mr-1" />
                          <span className="text-xs">4.5</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">3.1 km • Dr. Sharma</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel 2: Appointment & Personalized Plan */}
          <div className="col-span-6">
            <Card className="glassmorphism p-6 h-full bg-gradient-to-br from-orange-100/20 to-yellow-100/20">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-accent rounded-full mr-2" />
                <h3 className="text-lg text-primary">Panel 2: Booking & Plan Creation</h3>
              </div>

              <div className="grid grid-cols-2 gap-6 h-full">
                {/* Left: Rohan's Mobile - Booking */}
                <div className="space-y-4">
                  <div className="bg-background/80 rounded-xl p-4 shadow-lg border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">📱 Rohan's Mobile</div>
                      <Badge variant="outline" className="text-xs">Booking</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-primary">Dr. Anjali Sharma</p>
                          <p className="text-xs text-muted-foreground">Ayurvedic Specialist</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs text-primary">Available Slots Today</h5>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="p-1 bg-card/50 rounded text-center text-xs">10:00 AM</div>
                          <div className="p-1 bg-accent/20 rounded text-center text-xs ring-1 ring-accent">2:00 PM</div>
                          <div className="p-1 bg-card/50 rounded text-center text-xs">4:00 PM</div>
                          <div className="p-1 bg-card/50 rounded text-center text-xs">6:00 PM</div>
                        </div>
                      </div>

                      <Button size="sm" className="w-full bg-secondary text-secondary-foreground text-xs">
                        Book Video Consultation
                      </Button>

                      <div className="p-2 bg-green-100/50 rounded text-xs text-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                        <span className="text-green-700">Booking Confirmed!</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Dr. Anjali's Desktop */}
                <div className="space-y-4">
                  <div className="bg-background/80 rounded-xl p-4 shadow-lg border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">💻 Dr. Anjali's Dashboard</div>
                      <Badge variant="outline" className="text-xs">Planning</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="p-2 bg-card/50 rounded">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs">👨🏽</span>
                          </div>
                          <div>
                            <p className="text-xs text-primary">Rohan Kumar - Age 28</p>
                            <p className="text-xs text-muted-foreground">Constitution: Vata-Pitta</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-xs text-primary">Treatment Plan Designer</h5>
                        <div className="p-2 bg-purple-100/30 rounded">
                          <div className="flex items-center space-x-1 mb-1">
                            <Brain className="w-3 h-3 text-accent" />
                            <span className="text-xs text-primary">AI Recommendation:</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Consider Abhyanga & Shirodhara for Vata balance</p>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-primary">Morning Routine</span>
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-primary">Diet Plan</span>
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-primary">Herbal Medicine</span>
                            <Clock className="w-3 h-3 text-accent" />
                          </div>
                        </div>
                      </div>

                      <Button size="sm" className="w-full bg-primary text-primary-foreground text-xs">
                        Save & Send Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel 3: Daily Routine & Real-time Adaptations */}
          <div className="col-span-3">
            <Card className="glassmorphism p-6 h-full bg-gradient-to-br from-green-100/20 to-emerald-100/20">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-accent rounded-full mr-2" />
                <h3 className="text-lg text-primary">Panel 3: Live Adaptations</h3>
              </div>

              <div className="space-y-4">
                {/* Rohan's Daily Log */}
                <div className="bg-background/80 rounded-xl p-3 shadow-lg border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-muted-foreground">📱 Rohan Logs Symptoms</div>
                    <Bell className="w-3 h-3 text-accent" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary">Energy Level:</span>
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">Low</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary">Sleep Quality:</span>
                      <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">Poor</Badge>
                    </div>
                    <Button size="sm" className="w-full bg-secondary text-secondary-foreground text-xs">
                      Submit Daily Log
                    </Button>
                  </div>
                </div>

                {/* Dr. Anjali's Alert */}
                <div className="bg-background/80 rounded-xl p-3 shadow-lg border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-muted-foreground">💻 Dr. Anjali's Alert</div>
                    <AlertTriangle className="w-3 h-3 text-orange-600" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-2 bg-orange-100/50 rounded">
                      <div className="flex items-center space-x-1 mb-1">
                        <div className="w-2 h-2 bg-orange-600 rounded-full" />
                        <span className="text-xs text-orange-700">Patient Alert</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Rohan reported low energy</p>
                    </div>
                    
                    <div className="space-y-1">
                      <h6 className="text-xs text-primary">Quick Updates:</h6>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-muted-foreground">Added Munakka to diet</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-muted-foreground">Adjusted morning routine</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full bg-primary text-primary-foreground text-xs">
                      Notify Patient
                    </Button>
                  </div>
                </div>

                {/* Rohan's Notification */}
                <div className="bg-background/80 rounded-xl p-3 shadow-lg border border-green-300/30">
                  <div className="p-2 bg-green-100/50 rounded text-center">
                    <Bell className="w-4 h-4 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-green-700">Plan Updated!</p>
                    <p className="text-xs text-muted-foreground">Dr. Anjali modified your diet</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Panel 4: Admin Dashboard (Suresh) */}
          <div className="col-span-12 mt-8">
            <Card className="glassmorphism p-6 bg-gradient-to-br from-purple-100/20 to-blue-100/20">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-accent rounded-full mr-2" />
                <h3 className="text-xl text-primary">Panel 4: Operations Overview - Suresh's Admin Dashboard</h3>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {/* Today's Appointments */}
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Today's Appointments
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary">Rohan Kumar</span>
                        <Badge className="text-xs bg-green-100 text-green-700">Completed</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">2:00 PM - Dr. Anjali</p>
                    </div>
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary">Priya Sharma</span>
                        <Badge className="text-xs bg-blue-100 text-blue-700">Ongoing</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">3:30 PM - Dr. Anjali</p>
                    </div>
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary">Anita Patel</span>
                        <Badge className="text-xs bg-orange-100 text-orange-700">Scheduled</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">5:00 PM - Dr. Anjali</p>
                    </div>
                  </div>
                </div>

                {/* Room Utilization */}
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Room Utilization
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-primary">Consultation Room 1</span>
                        <Badge className="text-xs bg-green-100 text-green-700">Occupied</Badge>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Dr. Anjali - Video Call</p>
                    </div>
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-primary">Treatment Room A</span>
                        <Badge className="text-xs bg-green-100 text-green-700">Occupied</Badge>
                      </div>
                      <Progress value={65} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Abhyanga Session</p>
                    </div>
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-primary">Treatment Room B</span>
                        <Badge className="text-xs bg-gray-100 text-gray-700">Available</Badge>
                      </div>
                      <Progress value={0} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Ready for next patient</p>
                    </div>
                  </div>
                </div>

                {/* Revenue Insights */}
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Revenue Insights
                  </h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#D4A574" 
                          fill="#D4A574"
                          fillOpacity={0.3}
                        />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: '#6B5B4C' }}
                        />
                        <YAxis hide />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-accent">₹61,000</p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                  </div>
                </div>

                {/* Patient Feedback */}
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Patient Feedback
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center mb-1">
                        <div className="flex space-x-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className="w-3 h-3 text-accent fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-primary ml-2">4.8/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">"Abhyanga was excellent!"</p>
                      <span className="text-xs text-accent">- Anonymous</span>
                    </div>
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center mb-1">
                        <div className="flex space-x-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= 4 ? 'text-accent fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-primary ml-2">4.0/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">"More diet variety needed"</p>
                      <span className="text-xs text-accent">- Anonymous</span>
                    </div>
                    
                    <div className="text-center p-2 bg-accent/10 rounded">
                      <div className="h-16">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={wellnessData}>
                            <Line 
                              type="monotone" 
                              dataKey="satisfaction" 
                              stroke="#8B5A2B" 
                              strokeWidth={2}
                              dot={false}
                            />
                            <XAxis hide />
                            <YAxis hide />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-xs text-primary">Satisfaction Trend ↗️</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Staff Management Section */}
              <div className="mt-6 pt-6 border-t border-border/20">
                <h4 className="text-sm text-primary mb-3 flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Staff Management
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-background/60 rounded flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-primary">Dr. Anjali Sharma</p>
                      <p className="text-xs text-muted-foreground">Available • 5 appointments today</p>
                    </div>
                    <Badge className="text-xs bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="p-3 bg-background/60 rounded flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-primary">Dr. Meera Krishnan</p>
                      <p className="text-xs text-muted-foreground">Available • 3 appointments today</p>
                    </div>
                    <Badge className="text-xs bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="p-3 bg-background/60 rounded flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-primary">Therapy Team</p>
                      <p className="text-xs text-muted-foreground">2 therapists on duty</p>
                    </div>
                    <Badge className="text-xs bg-blue-100 text-blue-700">Available</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => onNavigate('welcome')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl mr-4"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Experience the Journey
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('doctor-dashboard')}
            className="bg-card/50 px-8 py-3 rounded-xl"
          >
            View Practitioner Portal
          </Button>
        </div>
      </div>
    </div>
  );
}