import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Home, User, BarChart3, MessageCircle, Target, Activity, Flame, Wind, Droplets, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';

interface AyurvedaDashboardProps {
  onNavigate: (screen: string) => void;
}

type Listish = string[] | undefined;

interface HealthDashboardData {
  snapshot?: {
    location?: string;
    nativePlace?: string;
    season?: string;
    airQuality?: string;
    workNature?: string;
    mainMealTime?: string;
    agni?: string;
    ama?: string;
    primaryDoshaImbalance?: string;
    humanCopy?: string;
  };
  personalSnapshot?: {
    constitutionOverview?: string;
    currentStateSummary?: string;
    personaTitle?: string;
    keyTraits?: Listish;
  };
  doshaProfile?: {
    primaryAggravatedDosha?: string;
    secondaryInfluences?: Listish;
    bodyMindImpact?: Listish;
    symptoms?: Listish;
  };
  metabolicDigestive?: {
    agniType?: string;
    amaLevel?: string;
    digestiveStrengthScore?: number;
    interpretation?: string;
  };
  dhatuSrotas?: {
    dhatuOverview?: string;
    affectedDhatus?: Listish;
    affectedSrotas?: Listish;
    outcomes?: Listish;
  };
  externalFactors?: {
    seasonalInfluence?: string;
    geoClimateInfluence?: string;
    dailyRoutineInfluence?: string;
    lifestyleFactors?: Listish;
  };
  humanInsights?: {
    strengths?: Listish;
    challenges?: Listish;
    energyPattern?: string;
    tendencies?: Listish;
  };
  foodCompatibility?: {
    preferredQualities?: Listish;
    qualitiesToAvoid?: Listish;
    topRecommendedFoods?: Listish;
    foodsToLimit?: Listish;
    notes?: string;
    prefer_qualities?: Listish;
    avoid_qualities?: Listish;
    recommended_foods?: Array<{ name?: string; label?: string }>;
    avoid_or_caution_foods?: Array<{ name?: string; label?: string }> | Listish;
  };
  dailyGuidelines?: {
    morning?: Listish;
    mealTiming?: Listish;
    evening?: Listish;
    hydration?: Listish;
    exercise?: Listish;
  };
  riskFlags?: {
    earlyWarnings?: Listish;
    possibleImbalances?: Listish;
    lifestylePatterns?: Listish;
  };
  actionPlan?: {
    immediateAdjustments?: Listish;
    dietPlanSummary?: Listish;
    lifestylePlanSummary?: Listish;
    optionalPractices?: Listish;
  };
  extras?: {
    balanceMeter?: { vata?: number; pitta?: number; kapha?: number };
    climateEffectScore?: number;
    foodScore?: number;
    energyCurve?: { morning?: number; afternoon?: number; evening?: number };
    weeklyTips?: Listish;
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
      <h2 className="text-lg mb-4 text-accent">{title}</h2>
      {children}
    </Card>
  );
}

function List({ items }: { items: Listish }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      {items.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  );
}

export function AyurvedaDashboard({ onNavigate }: AyurvedaDashboardProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const data: HealthDashboardData = JSON.parse(localStorage.getItem('ayurveda-dashboard') || '{}');

  const balance = data.extras?.balanceMeter;
  const energy = data.extras?.energyCurve;
  const digestive = data.metabolicDigestive?.digestiveStrengthScore ?? 0;
  const doshaPie = [
    { name: 'Kapha', value: balance?.kapha ?? 0, color: '#CFA94B' },
    { name: 'Pitta', value: balance?.pitta ?? 0, color: '#D9863C' },
    { name: 'Vata', value: balance?.vata ?? 0, color: '#6B8E23' },
  ];
  const energyData = [
    { slot: 'Morning', value: energy?.morning ?? 0 },
    { slot: 'Afternoon', value: energy?.afternoon ?? 0 },
    { slot: 'Evening', value: energy?.evening ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1653364744086-23f5e85de842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsb3R1cyUyMGZsb3dlciUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTg3MjIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Lotus background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 p-6 pb-24">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl text-primary">
            Namaste, <span className="text-accent">{user.name || 'Guest'}</span>
          </h1>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-sm text-primary">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <p className="text-muted-foreground">Your personalized Ayurvedic health snapshot</p>
      </div>

      <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
        <h2 className="text-lg mb-4 text-accent">Your Daily Ayurvedic Profile</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.location || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Native Place</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.nativePlace || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Season (Ritu)</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.season || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Air Quality</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.airQuality || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Work Nature</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.workNature || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Main Meal Time</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.mainMealTime || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Agni</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.agni || data.metabolicDigestive?.agniType || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ama</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.ama || data.metabolicDigestive?.amaLevel || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Primary Dosha Imbalance</p>
            <p className="text-sm text-card-foreground">{data.snapshot?.primaryDoshaImbalance || data.doshaProfile?.primaryAggravatedDosha || '—'}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">{data.snapshot?.humanCopy || ''}</p>
      </Card>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-card text-card-foreground glassmorphism">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Digestive Strength</p>
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl text-accent">{digestive || '—'}</div>
              <div className="w-16 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="100%" data={[{ value: digestive }]}> 
                    <RadialBar dataKey="value" cornerRadius={8} fill="#D9863C" />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Higher is stronger agni</p>
          </Card>

          <Card className="p-4 bg-card text-card-foreground glassmorphism">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Climate Effect Score</p>
            </div>
            <div className="text-3xl text-accent">{data.extras?.climateEffectScore ?? '—'}</div>
            <p className="text-xs text-muted-foreground mt-1">Impact of location & season</p>
          </Card>

          <Card className="p-4 bg-card text-card-foreground glassmorphism">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Food Score</p>
            </div>
            <div className="text-3xl text-accent">{data.extras?.foodScore ?? '—'}</div>
            <p className="text-xs text-muted-foreground mt-1">Diet alignment with your state</p>
          </Card>
        </div>

        {/* Snapshot */}
        <Section title="Personal Snapshot">
          <div className="space-y-2">
            <p className="text-card-foreground text-sm">{data.personalSnapshot?.constitutionOverview || '—'}</p>
            <p className="text-muted-foreground text-sm">{data.personalSnapshot?.currentStateSummary || ''}</p>
            <p className="text-accent text-sm">{data.personalSnapshot?.personaTitle || ''}</p>
            <List items={data.personalSnapshot?.keyTraits} />
          </div>
        </Section>

        {/* Dosha Profile & Balance */}
        <Section title="Dosha Profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Primary Aggravated Dosha</p>
              <p className="text-lg text-accent">{data.doshaProfile?.primaryAggravatedDosha || '—'}</p>
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Secondary Influences</p>
              <List items={data.doshaProfile?.secondaryInfluences} />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Dosha Impact on Body & Mind</p>
              <List items={data.doshaProfile?.bodyMindImpact} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Symptoms Linked to Dosha State</p>
              <List items={data.doshaProfile?.symptoms} />
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="p-4 bg-card text-card-foreground">
              <h4 className="text-sm text-accent mb-3 flex items-center"><Target className="w-4 h-4 mr-2"/>Balance Meter</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={doshaPie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                      {doshaPie.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {doshaPie.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="sanskrit text-card-foreground">{d.name}</span>
                    </div>
                    <span className="text-accent">{d.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-card text-card-foreground">
              <h4 className="text-sm text-accent mb-3 flex items-center"><Activity className="w-4 h-4 mr-2"/>Energy Curve</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyData}>
                    <XAxis dataKey="slot" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8B7765' }} />
                    <YAxis hide />
                    <Line type="monotone" dataKey="value" stroke="#D9863C" strokeWidth={3} dot={{ fill: '#CFA94B', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </Section>

        {/* Metabolism */}
        <Section title="Metabolic & Digestive Status">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Agni Type</p>
              <p className="text-lg text-accent">{data.metabolicDigestive?.agniType || '—'}</p>
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Ama Level</p>
              <p className="text-lg text-accent">{data.metabolicDigestive?.amaLevel || '—'}</p>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Digestive Strength Score</p>
              <p className="text-lg text-accent">{data.metabolicDigestive?.digestiveStrengthScore ?? '—'}</p>
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">What This Means for You</p>
              <p className="text-sm text-muted-foreground">{data.metabolicDigestive?.interpretation || ''}</p>
            </Card>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <Card className="p-4 bg-card text-card-foreground flex items-center space-x-3">
              <Flame className="w-6 h-6 text-[#D9863C]" />
              <div>
                <p className="text-xs text-muted-foreground">Agni</p>
                <p className="text-sm text-card-foreground">{data.metabolicDigestive?.agniType || '—'}</p>
              </div>
            </Card>
            <Card className="p-4 bg-card text-card-foreground flex items-center space-x-3">
              <Droplets className="w-6 h-6 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Ama</p>
                <p className="text-sm text-card-foreground">{data.metabolicDigestive?.amaLevel || '—'}</p>
              </div>
            </Card>
            <Card className="p-4 bg-card text-card-foreground flex items-center space-x-3">
              <Wind className="w-6 h-6 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Balance</p>
                <p className="text-sm text-card-foreground">V {balance?.vata ?? '—'} | P {balance?.pitta ?? '—'} | K {balance?.kapha ?? '—'}</p>
              </div>
            </Card>
          </div>
        </Section>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Personalized Diet Guidance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-card-foreground mb-2">Food Qualities to Prefer</p>
              <List items={data.foodCompatibility?.prefer_qualities || data.foodCompatibility?.preferredQualities} />
            </div>
            <div>
              <p className="text-sm text-card-foreground mb-2">Food Qualities to Avoid</p>
              <List items={data.foodCompatibility?.avoid_qualities || data.foodCompatibility?.qualitiesToAvoid} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Favor light, dry, mildly warm, bitter or pungent foods to balance Kapha and maintain digestion.</p>
        </Card>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Foods That Fit Your Body Today</h2>
          <div className="space-y-4">
            {(data.foodCompatibility?.recommended_foods || []).map((f, i) => (
              <div key={`${f?.name}-${i}`} className="flex items-start justify-between">
                <div className="text-sm">
                  <p className="text-card-foreground">{f?.label || f?.name}</p>
                  <p className="text-muted-foreground text-xs">Light, cleansing, supports digestion</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Foods to Avoid</h2>
          {Array.isArray(data.foodCompatibility?.avoid_or_caution_foods) && (data.foodCompatibility?.avoid_or_caution_foods as Array<any>).length === 0 ? (
            <p className="text-sm text-muted-foreground">No specific items restricted today. Focus on avoiding cold, heavy, oily, or overly sweet foods.</p>
          ) : (
            <List items={(data.foodCompatibility?.avoid_or_caution_foods as Listish) || []} />
          )}
        </Card>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Seasonal & Location-Based Insights</h2>
          <p className="text-sm text-muted-foreground">Humid Thane during Vasanta increases Kapha. Focus on light, warm foods and daily spices like ginger, black pepper, and cumin.</p>
        </Card>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">How Your Work Affects You</h2>
          <p className="text-sm text-card-foreground mb-3">{data.snapshot?.workNature || '—'}</p>
          <List items={["Move every 60–90 mins for 3–5 mins","Prefer warm water while working","Keep lunch light and warm to avoid drowsiness"]} />
        </Card>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Daily Routine Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-card-foreground mb-2">Morning</p>
              <List items={["Warm water with mild spices","Avoid cold breakfast","Light movement 15–20 min"]} />
            </div>
            <div>
              <p className="text-sm text-card-foreground mb-2">Midday</p>
              <List items={["Biggest meal at madhyahna","Warm cumin water before meal"]} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-sm text-card-foreground mb-2">Evening</p>
              <List items={["Avoid heavy dinner","Prefer soups/khichdi/steamed veggies","Walk 10–15 mins after meal"]} />
            </div>
            <div>
              <p className="text-sm text-card-foreground mb-2">Night</p>
              <List items={["Sleep by 10:30–11 pm","Avoid late-night snacking"]} />
            </div>
          </div>
        </Card>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Instant Insights</h2>
          <List items={[
            'Kapha elevated: heaviness or dullness if improper foods',
            'Agni balanced: good digestion with proper qualities',
            'No Ama detected: maintain this state',
            'Climate + season + routine push Kapha upward',
            'Diet should stay light, warm, dry, mildly spiced']}
          />
        </Card>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Interpretation</h2>
          <p className="text-sm text-muted-foreground">You are in a Kapha-increasing context with stable digestion. Choose light, warm, and mildly spiced meals, and maintain gentle daily movement to keep energy buoyant.</p>
        </Card>

        <Section title="Dhatu & Srotas Health Map">
          <p className="text-sm text-card-foreground mb-2">{data.dhatuSrotas?.dhatuOverview || ''}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Affected Dhatus</p>
              <List items={data.dhatuSrotas?.affectedDhatus} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Affected Srotas</p>
              <List items={data.dhatuSrotas?.affectedSrotas} />
            </Card>
          </div>
          <Card className="p-4 bg-background/10 border-border/30 mt-4">
            <p className="text-sm text-card-foreground">Resulting Body Outcomes</p>
            <List items={data.dhatuSrotas?.outcomes} />
          </Card>
        </Section>

        <Section title="External Factors Influencing Your Health">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Seasonal Influence (Ritu)</p>
              <p className="text-sm text-muted-foreground">{data.externalFactors?.seasonalInfluence || ''}</p>
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Geo-Climate Influence</p>
              <p className="text-sm text-muted-foreground">{data.externalFactors?.geoClimateInfluence || ''}</p>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Daily Routine Influence</p>
              <p className="text-sm text-muted-foreground">{data.externalFactors?.dailyRoutineInfluence || ''}</p>
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Lifestyle Stressors or Supporters</p>
              <List items={data.externalFactors?.lifestyleFactors} />
            </Card>
          </div>
        </Section>

        <Section title="Key Human-Centric Insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Strengths</p>
              <List items={data.humanInsights?.strengths} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Challenges</p>
              <List items={data.humanInsights?.challenges} />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Energy Pattern Insights</p>
              <p className="text-sm text-muted-foreground">{data.humanInsights?.energyPattern || ''}</p>
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Mental & Emotional Tendencies</p>
              <List items={data.humanInsights?.tendencies} />
            </Card>
          </div>
        </Section>

        <Section title="Food Compatibility Profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Preferred Food Qualities (Gunas)</p>
              <List items={data.foodCompatibility?.preferredQualities} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Qualities to Avoid</p>
              <List items={data.foodCompatibility?.qualitiesToAvoid} />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Top Recommended Foods</p>
              <List items={data.foodCompatibility?.topRecommendedFoods} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Foods to Limit or Avoid</p>
              <List items={data.foodCompatibility?.foodsToLimit} />
            </Card>
          </div>
          <p className="text-xs text-muted-foreground mt-4">{data.foodCompatibility?.notes || ''}</p>
        </Section>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-4 text-accent">Astrology Terminologies</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-card-foreground">Ritu</p>
              <p className="text-muted-foreground">Seasonal cycle influencing dosha balance</p>
            </div>
            <div>
              <p className="text-card-foreground">Agni</p>
              <p className="text-muted-foreground">Digestive fire; strength of metabolism</p>
            </div>
            <div>
              <p className="text-card-foreground">Ama</p>
              <p className="text-muted-foreground">Metabolic toxins due to poor digestion</p>
            </div>
            <div>
              <p className="text-card-foreground">Gunas</p>
              <p className="text-muted-foreground">Food qualities like light, dry, warm, etc.</p>
            </div>
            <div>
              <p className="text-card-foreground">Dosha</p>
              <p className="text-muted-foreground">Vata, Pitta, Kapha — mind-body regulatory principles</p>
            </div>
          </div>
        </Card>

        <Section title="Personalized Daily Guidelines">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Morning Routine Suggestions</p>
              <List items={data.dailyGuidelines?.morning} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Meal Timing Recommendations</p>
              <List items={data.dailyGuidelines?.mealTiming} />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Evening/Wind-Down Routine</p>
              <List items={data.dailyGuidelines?.evening} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Hydration Guidance</p>
              <List items={data.dailyGuidelines?.hydration} />
            </Card>
          </div>
          <Card className="p-4 bg-background/10 border-border/30 mt-4">
            <p className="text-sm text-card-foreground">Exercise/Movement Suggestions</p>
            <List items={data.dailyGuidelines?.exercise} />
          </Card>
        </Section>

        {data.riskFlags && (
          <Section title="Risk Flags">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 bg-background/10 border-border/30">
                <p className="text-sm text-card-foreground">Early Warning Signs</p>
                <List items={data.riskFlags?.earlyWarnings} />
              </Card>
              <Card className="p-4 bg-background/10 border-border/30">
                <p className="text-sm text-card-foreground">Possible Imbalances to Watch</p>
                <List items={data.riskFlags?.possibleImbalances} />
              </Card>
            </div>
            <Card className="p-4 bg-background/10 border-border/30 mt-4">
              <p className="text-sm text-card-foreground">Lifestyle Patterns That May Cause Issues</p>
              <List items={data.riskFlags?.lifestylePatterns} />
            </Card>
          </Section>
        )}

        <Section title="Action Plan">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Immediate Adjustments</p>
              <List items={data.actionPlan?.immediateAdjustments} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Diet Plan Summary</p>
              <List items={data.actionPlan?.dietPlanSummary} />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Lifestyle Plan Summary</p>
              <List items={data.actionPlan?.lifestylePlanSummary} />
            </Card>
            <Card className="p-4 bg-background/10 border-border/30">
              <p className="text-sm text-card-foreground">Optional Ayurvedic Practices</p>
              <List items={data.actionPlan?.optionalPractices} />
            </Card>
          </div>
        </Section>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Kapha</p>
              <p className="text-2xl text-accent">{balance?.kapha ?? '—'}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Pitta</p>
              <p className="text-2xl text-accent">{balance?.pitta ?? '—'}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Vata</p>
              <p className="text-2xl text-accent">{balance?.vata ?? '—'}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Climate Effect Score</p>
              <p className="text-2xl text-accent">{data.extras?.climateEffectScore ?? '—'}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Food Score</p>
              <p className="text-2xl text-accent">{data.extras?.foodScore ?? '—'}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Energy Curve</p>
              <p className="text-sm text-muted-foreground">M {energy?.morning ?? '—'} | A {energy?.afternoon ?? '—'} | E {energy?.evening ?? '—'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Weekly Improvement Tips</p>
              <List items={data.extras?.weeklyTips} />
            </div>
          </div>
        </Card>

        <Button
          onClick={() => onNavigate('chat')}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-4 rounded-xl mb-4"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          AI Consultation
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/80 glassmorphism border-t border-border backdrop-blur-lg">
        <div className="flex justify-around py-3">
          <button
            onClick={() => onNavigate('patient-dashboard')}
            className="flex flex-col items-center space-y-1 text-accent"
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

