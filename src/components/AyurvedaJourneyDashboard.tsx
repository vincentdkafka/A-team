import { useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Calendar,
  Clock,
  MessageCircle,
  Star,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Heart,
  Leaf,
  Bell,
  CheckCircle,
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface AyurvedaJourneyDashboardProps {
  onNavigate: (screen: string) => void;
}

type Listish = string[] | undefined;

function List({ items }: { items: Listish }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
      {items.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  );
}

export function AyurvedaJourneyDashboard({ onNavigate }: AyurvedaJourneyDashboardProps) {
  const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), []);
  const data = useMemo(() => JSON.parse(localStorage.getItem('ayurveda-dashboard') || '{}'), []);

  const energyData = useMemo(
    () => [
      { day: 'Morning', value: data?.extras?.energyCurve?.morning ?? 0 },
      { day: 'Afternoon', value: data?.extras?.energyCurve?.afternoon ?? 0 },
      { day: 'Evening', value: data?.extras?.energyCurve?.evening ?? 0 },
    ],
    [data]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1694788396363-8e0b209a8f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJjaG1lbnQlMjB0ZXh0dXJlJTIwYW5jaWVudCUyMHBhcGVyfGVufDF8fHx8MTc1ODczNTg1NHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Parchment texture"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8B5A2B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7A8471" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path d="M 300 200 Q 600 150 900 250" stroke="url(#flowGradient)" strokeWidth="3" fill="none" className="animate-pulse" />
          <path d="M 300 400 Q 600 350 900 450" stroke="url(#flowGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M 150 600 Q 600 550 1050 650" stroke="url(#flowGradient)" strokeWidth="2" fill="none" className="animate-pulse" />
        </svg>
      </div>

      <div className="relative z-10 p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 text-primary">
            <span className="sanskrit text-6xl text-accent">आयुर्सूत्र</span>
          </h1>
          <h2 className="text-3xl mb-2 text-primary">Ayurveda Dashboard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Data-driven Ayurvedic insights with Journey View layout</p>
        </div>

        

        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
          <div className="col-span-3">
            <Card className="glassmorphism p-6 h-full bg-gradient-to-br from-blue-100/20 to-purple-100/20">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-accent rounded-full mr-2" />
                <h3 className="text-lg text-primary">Your Daily Ayurvedic Profile</h3>
              </div>
              <div className="bg-background/80 rounded-2xl p-4 shadow-lg border-2 border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-muted-foreground">👋 Welcome {user?.name || 'Guest'}</div>
                  <div className="text-xs text-muted-foreground">📱 Snapshot</div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="p-2 rounded-lg border bg-card/50 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-primary">Location</span>
                      <span className="text-muted-foreground">{data?.snapshot?.location || '—'}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg border bg-card/50 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-primary">Season (Ritu)</span>
                      <span className="text-muted-foreground">{data?.snapshot?.season || '—'}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg border bg-card/50 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-primary">Agni</span>
                      <span className="text-muted-foreground">{data?.snapshot?.agni || data?.metabolicDigestive?.agniType || '—'}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg border bg-card/50 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-primary">Ama</span>
                      <span className="text-muted-foreground">{data?.snapshot?.ama || data?.metabolicDigestive?.amaLevel || '—'}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg border bg-card/50 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-primary">Primary Dosha Imbalance</span>
                      <span className="text-muted-foreground">{data?.snapshot?.primaryDoshaImbalance || data?.doshaProfile?.primaryAggravatedDosha || '—'}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-primary text-primary-foreground text-xs mb-3" onClick={() => onNavigate('chat')}>
                  Begin AI Consultation
                </Button>
                <div className="space-y-2">
                  <h5 className="text-xs text-primary">Centers Near You</h5>
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
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-6">
            <Card className="glassmorphism p-6 h-full bg-gradient-to-br from-orange-100/20 to-yellow-100/20">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-accent rounded-full mr-2" />
                <h3 className="text-lg text-primary">Diet Guidance & Foods</h3>
              </div>
              <div className="grid grid-cols-2 gap-6 h-full">
                <div className="space-y-4">
                  <div className="bg-background/80 rounded-xl p-4 shadow-lg border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">🍽 Food Qualities</div>
                      <Badge variant="outline" className="text-xs">Prefer</Badge>
                    </div>
                    <List items={data?.foodCompatibility?.prefer_qualities || data?.foodCompatibility?.preferredQualities} />
                  </div>

                  <div className="bg-background/80 rounded-xl p-4 shadow-lg border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">⚠️ Food Qualities</div>
                      <Badge variant="outline" className="text-xs">Avoid</Badge>
                    </div>
                    <List items={data?.foodCompatibility?.avoid_qualities || data?.foodCompatibility?.qualitiesToAvoid} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background/80 rounded-xl p-4 shadow-lg border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">🌿 Recommended Foods</div>
                      <Badge variant="outline" className="text-xs">Today</Badge>
                    </div>
                    <div className="space-y-2">
                      {(data?.foodCompatibility?.recommended_foods || []).map((f: any, i: number) => (
                        <div key={`${f?.name}-${i}`} className="p-2 bg-card/50 rounded">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-primary">{f?.label || f?.name}</span>
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                          <p className="text-xs text-muted-foreground">Light, cleansing, supports digestion</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-background/80 rounded-xl p-4 shadow-lg border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">🍽 Foods to Avoid</div>
                      <Badge variant="outline" className="text-xs">Caution</Badge>
                    </div>
                    {Array.isArray(data?.foodCompatibility?.avoid_or_caution_foods) && (data?.foodCompatibility?.avoid_or_caution_foods as any[]).length === 0 ? (
                      <p className="text-xs text-muted-foreground">No specific items restricted today</p>
                    ) : (
                      <List items={data?.foodCompatibility?.avoid_or_caution_foods as Listish} />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-3">
            <Card className="glassmorphism p-6 h-full bg-gradient-to-br from-green-100/20 to-emerald-100/20">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-accent rounded-full mr-2" />
                <h3 className="text-lg text-primary">Daily Routine</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-background/80 rounded-xl p-3 shadow-lg border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-muted-foreground">🌞 Morning</div>
                    <Bell className="w-3 h-3 text-accent" />
                  </div>
                  <List items={["Warm water + mild spices (ginger/cumin)", "Avoid cold breakfast", "Light movement (15–20 min)"]} />
                </div>

                <div className="bg-background/80 rounded-xl p-3 shadow-lg border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-muted-foreground">🌤 Midday</div>
                    <Clock className="w-3 h-3 text-accent" />
                  </div>
                  <List items={["Take biggest meal at madhyahna", "Warm cumin water before meal"]} />
                </div>

                <div className="bg-background/80 rounded-xl p-3 shadow-lg border border-green-300/30">
                  <div className="text-xs text-green-700">🌙 Evening & Night</div>
                  <List items={["Avoid heavy dinner", "Prefer soups/khichdi/steamed veggies", "10–15 mins walk after meal", "Sleep by 10:30–11 pm", "Avoid late-night snacking"]} />
                </div>
              </div>
            </Card>
          </div>

        <div className="col-span-12 mt-8">
          <Card className="glassmorphism p-6 bg-gradient-to-br from-purple-100/20 to-blue-100/20">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-accent rounded-full mr-2" />
              <h3 className="text-xl text-primary">Seasonal & Location Insights</h3>
            </div>

              <div className="grid grid-cols-4 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Context
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary">Season</span>
                        <Badge className="text-xs bg-blue-100 text-blue-700">{data?.snapshot?.season || '—'}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Location: {data?.snapshot?.location || '—'}</p>
                    </div>
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary">Air Quality</span>
                        <Badge className="text-xs bg-green-100 text-green-700">{data?.snapshot?.airQuality || '—'}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Work Nature: {data?.snapshot?.workNature || '—'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Energy Curve
                  </h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={energyData}>
                        <Line type="monotone" dataKey="value" stroke="#D4A574" strokeWidth={2} dot={false} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B5B4C' }} />
                        <YAxis hide />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-accent">Food Score: {data?.extras?.foodScore ?? '—'}</p>
                    <p className="text-xs text-muted-foreground">Climate Effect: {data?.extras?.climateEffectScore ?? '—'}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Instant Insights
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded">
                      <p className="text-xs text-primary">Kapha elevated: heaviness or dullness if improper foods</p>
                    </div>
                    <div className="p-2 bg-background/60 rounded">
                      <p className="text-xs text-primary">Agni balanced: good digestion with proper qualities</p>
                    </div>
                    <div className="text-center p-2 bg-accent/10 rounded">
                      <div className="h-16">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={energyData}>
                            <Area type="monotone" dataKey="value" stroke="#8B5A2B" fill="#8B5A2B" fillOpacity={0.2} />
                            <XAxis hide />
                            <YAxis hide />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-xs text-primary">Keep diet light, warm, dry</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center">
                    <Leaf className="w-4 h-4 mr-2" />
                    Work-Nature Insights
                  </h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-primary">Routine Tips</span>
                        <Badge className="text-xs bg-green-100 text-green-700">Daily</Badge>
                      </div>
                      <List items={["Move every 60–90 mins", "Prefer warm water", "Light, warm lunch"]} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/20">
                <h4 className="text-sm text-primary mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Story-Style Interpretation
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-background/60 rounded">
                    <p className="text-xs text-muted-foreground">Being in humid spring, Kapha increases; keep meals light and warm.</p>
                  </div>
                  <div className="p-3 bg-background/60 rounded">
                    <p className="text-xs text-muted-foreground">Strong digestion: ideal time to favor barley, mung, warm drinks.</p>
                  </div>
                  <div className="p-3 bg-background/60 rounded">
                    <p className="text-xs text-muted-foreground">Maintain balance through small daily choices and gentle movement.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Astro Insights moved to bottom with patient-friendly wording */}
        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto mt-8">
          <div className="col-span-12">
            <Card className="glassmorphism p-6 bg-gradient-to-br from-purple-100/20 to-blue-100/20">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 bg-accent rounded-full mr-2" />
                <h3 className="text-xl text-primary">Astro Insights</h3>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center"><Heart className="w-4 h-4 mr-2"/>Simple Overview</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded"><p className="text-xs text-primary">Key Signal</p><p className="text-xs text-muted-foreground">{data?.astro?.metric || '—'}</p></div>
                    <div className="p-2 bg-background/60 rounded"><p className="text-xs text-primary">How Strong</p><p className="text-xs text-muted-foreground">{data?.astro?.value || '—'}</p></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center"><TrendingUp className="w-4 h-4 mr-2"/>Daily Trend</h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={(Array.isArray(data?.astro?.trend) ? data.astro.trend : []).map((x: any, i: number) => ({ day: x?.label || i, value: x?.value || 0 }))}>
                        <Line type="monotone" dataKey="value" stroke="#D4A574" strokeWidth={2} dot={false} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B5B4C' }} />
                        <YAxis hide />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center"><p className="text-lg text-accent">Overall Mood</p><p className="text-xs text-muted-foreground">Direction Today: {data?.astro?.indicator || '—'}</p></div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center"><Leaf className="w-4 h-4 mr-2"/>Plain Language Insight</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded"><p className="text-xs text-primary">What It Means</p><p className="text-xs text-muted-foreground">{data?.astro?.insight || '—'}</p></div>
                    <div className="text-center p-2 bg-accent/10 rounded">
                      <div className="h-16">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={(Array.isArray(data?.astro?.trend) ? data.astro.trend : []).map((x: any, i: number) => ({ day: x?.label || i, value: x?.value || 0 }))}>
                            <Area type="monotone" dataKey="value" stroke="#8B5A2B" fill="#8B5A2B" fillOpacity={0.2} />
                            <XAxis hide /><YAxis hide />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-xs text-primary">Picture of the Trend</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm text-primary flex items-center"><AlertTriangle className="w-4 h-4 mr-2"/>Quick Status</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-background/60 rounded">
                      <div className="flex items-center justify-between mb-1"><span className="text-xs text-primary">Status Tag</span><Badge className="text-xs bg-green-100 text-green-700">{data?.astro?.status || '—'}</Badge></div>
                      <p className="text-xs text-muted-foreground">Friendly Note: {data?.astro?.note || '—'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button onClick={() => onNavigate('chat')} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl mr-4">
            <ArrowRight className="w-5 h-5 mr-2" />
            Begin AI Consultation
          </Button>
          <Button variant="outline" onClick={() => onNavigate('doctor-dashboard')} className="bg-card/50 px-8 py-3 rounded-xl">
            View Practitioner Portal
          </Button>
        </div>
      </div>
    </div>
  );
}
