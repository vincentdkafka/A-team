import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, Calendar, MessageCircle, User, Activity, Stethoscope, 
  Brain, Plus, Bell, Video, FileText, Clock, TrendingUp, AlertTriangle
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

interface DoctorDashboardProps {
  onNavigate: (screen: string) => void;
}

const patients = [
  {
    id: 1,
    name: 'Rohan Kumar',
    age: 28,
    dosha: 'Vata-Pitta',
    lastVisit: '2 days ago',
    status: 'improving',
    avatar: '👨🏽‍💼',
    wellnessScore: 85,
    compliance: 92,
    alerts: 1
  },
  {
    id: 2,
    name: 'Priya Sharma',
    age: 34,
    dosha: 'Pitta',
    lastVisit: '1 week ago',
    status: 'stable',
    avatar: '👩🏽‍💼',
    wellnessScore: 78,
    compliance: 88,
    alerts: 0
  },
  {
    id: 3,
    name: 'Anita Patel',
    age: 45,
    dosha: 'Kapha',
    lastVisit: '3 days ago',
    status: 'needs attention',
    avatar: '👩🏽‍🏫',
    wellnessScore: 65,
    compliance: 75,
    alerts: 2
  }
];

const wellnessData = [
  { day: 'Mon', score: 80 },
  { day: 'Tue', score: 85 },
  { day: 'Wed', score: 82 },
  { day: 'Thu', score: 88 },
  { day: 'Fri', score: 85 },
];

export function DoctorDashboard({ onNavigate }: DoctorDashboardProps) {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const wellnessScoreData = [{ value: selectedPatient.wellnessScore }];

  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1705083649602-03c5fbae2e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMGhlcmJzJTIwbmF0dXJhbHxlbnwxfHx8fDE3NTg2ODM5NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Ayurvedic herbs"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/20 bg-sidebar text-sidebar-foreground">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-sidebar-foreground">
                  <span className="sanskrit text-accent">आयुर्सूत्र</span> Practitioner Portal
                </h1>
                <p className="text-sidebar-foreground/70">Welcome, Dr. Anjali Sharma</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-xs flex items-center justify-center text-accent-foreground">3</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('welcome')}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  Patient Portal
                </Button>
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
          {/* Left Panel - Patient List */}
          <div className="col-span-3">
            <Card className="glassmorphism p-6 bg-sidebar text-sidebar-foreground border-sidebar-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-sidebar-foreground">Patients</h2>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/50" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                />
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPatient.id === patient.id
                        ? 'bg-accent/20 border-accent shadow-sm'
                        : 'bg-sidebar-accent/50 border-sidebar-border hover:bg-sidebar-accent'
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{patient.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sidebar-foreground">{patient.name}</h3>
                          {patient.alerts > 0 && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-sidebar-foreground/70">
                          {patient.age} years • {patient.dosha}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-sidebar-foreground/50">{patient.lastVisit}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            patient.status === 'improving' ? 'bg-secondary/20 text-secondary' :
                            patient.status === 'stable' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {patient.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Center Panel - Patient Profile & AI Recommendations */}
          <div className="col-span-6">
            <div className="space-y-6">
              {/* Patient Profile */}
              <Card className="glassmorphism p-6 bg-card text-card-foreground">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{selectedPatient.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-card-foreground">{selectedPatient.name}</h2>
                      {selectedPatient.alerts > 0 && (
                        <Badge className="bg-orange-100 text-orange-700 flex items-center space-x-1">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{selectedPatient.alerts} Alert{selectedPatient.alerts > 1 ? 's' : ''}</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {selectedPatient.age} years • Primary Constitution: <span className="sanskrit text-accent">{selectedPatient.dosha}</span>
                    </p>
                  </div>
                </div>

                {/* Wellness Score Circle */}
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={wellnessScoreData}>
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
                        <div className="text-2xl text-accent">{selectedPatient.wellnessScore}</div>
                        <div className="text-xs text-muted-foreground">Wellness Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-background/10 rounded-lg">
                    <Activity className="w-6 h-6 text-accent mx-auto mb-1" />
                    <p className="text-sm text-card-foreground">Compliance</p>
                    <p className="text-lg text-accent">{selectedPatient.compliance}%</p>
                  </div>
                  <div className="text-center p-3 bg-background/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-secondary mx-auto mb-1" />
                    <p className="text-sm text-card-foreground">Trend</p>
                    <p className="text-lg text-secondary">Improving</p>
                  </div>
                </div>

                {/* Plan Summary */}
                <div className="border-t border-border/20 pt-4">
                  <h3 className="text-card-foreground mb-3">Current Plan Summary</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-background/10 rounded">
                      <span className="text-sm text-card-foreground">Morning Abhyanga</span>
                      <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/10 rounded">
                      <span className="text-sm text-card-foreground">Pranayama Practice</span>
                      <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-background/10 rounded">
                      <span className="text-sm text-card-foreground">Herbal Medicine</span>
                      <Badge className="bg-[#D9863C] text-[#3B2E2E]">Modified</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI Recommendations */}
              <Card className="glassmorphism p-6 bg-card text-card-foreground border-l-4 border-l-accent">
                <h3 className="text-lg text-card-foreground mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-accent" />
                  AI Recommendations
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h4 className="text-card-foreground mb-2 text-accent">Consider Vamana next week</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on Kapha accumulation patterns and seasonal timing, 
                      Vamana therapy would be beneficial for deep cleansing.
                    </p>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Schedule
                      </Button>
                      <Button size="sm" variant="ghost" className="text-card-foreground">
                        Details
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-background/10 rounded-lg">
                    <h4 className="text-card-foreground mb-2">Dietary Adjustments</h4>
                    <p className="text-sm text-muted-foreground">
                      Increase warm, cooked foods. Consider adding more ghee and 
                      reducing raw vegetables for better Vata balance.
                    </p>
                  </div>

                  <div className="p-4 bg-background/10 rounded-lg">
                    <h4 className="text-card-foreground mb-2">Lifestyle Modifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Patient showing good compliance. Suggest extending morning 
                      routine by 10 minutes for deeper meditation practice.
                    </p>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Generate Updated Plan
                </Button>
              </Card>
            </div>
          </div>

          {/* Right Panel - Calendar & Quick Actions */}
          <div className="col-span-3">
            <div className="space-y-6">
              {/* Calendar */}
              <Card className="glassmorphism p-6 bg-card text-card-foreground">
                <h3 className="text-lg text-card-foreground mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Schedule
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm p-3 bg-background/10 rounded">
                    <div>
                      <p className="text-card-foreground">Morning Consultations</p>
                      <p className="text-xs text-muted-foreground">9:00 AM - 12:00 PM</p>
                    </div>
                    <div className="w-2 h-8 bg-accent rounded-full" />
                  </div>

                  <div className="flex items-center justify-between text-sm p-3 bg-background/10 rounded">
                    <div>
                      <p className="text-card-foreground">Patient Review</p>
                      <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM</p>
                    </div>
                    <div className="w-2 h-8 bg-secondary rounded-full" />
                  </div>

                  <div className="flex items-center justify-between text-sm p-3 bg-background/10 rounded">
                    <div>
                      <p className="text-card-foreground">Evening Rounds</p>
                      <p className="text-xs text-muted-foreground">4:00 PM - 6:00 PM</p>
                    </div>
                    <div className="w-2 h-8 bg-[#D9863C] rounded-full" />
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4 border-accent text-accent hover:bg-accent/10">
                  View Full Calendar
                </Button>
              </Card>

              {/* Quick Actions */}
              <Card className="glassmorphism p-6 bg-card text-card-foreground">
                <h3 className="text-lg text-card-foreground mb-4">Quick Actions</h3>

                <div className="space-y-3">
                  <Button
                    onClick={() => onNavigate('chat')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-start"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with {selectedPatient.name}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent/10 justify-start"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Start Video Call
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-secondary text-secondary hover:bg-secondary/10 justify-start"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Add Prescription
                  </Button>
                </div>
              </Card>

              {/* Patient Wellness Trend */}
              <Card className="glassmorphism p-6 bg-card text-card-foreground">
                <h3 className="text-lg text-card-foreground mb-4">5-Day Trend</h3>
                
                <div className="h-24 mb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={wellnessData}>
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: '#8B7765' }}
                      />
                      <YAxis hide />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#D9863C" 
                        strokeWidth={2}
                        dot={{ fill: '#CFA94B', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  Wellness trending <span className="text-secondary">↗️ upward</span>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}