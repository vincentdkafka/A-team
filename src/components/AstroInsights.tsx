import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MessageCircle } from 'lucide-react';

interface AstroInsightsProps {
  onNavigate: (screen: string) => void;
}

export function AstroInsights({ onNavigate }: AstroInsightsProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const data = JSON.parse(localStorage.getItem('astro-insights') || '{}');
  const dist = data?.doshaDistribution || { vata: 33, pitta: 33, kapha: 34 };
  const chartData = [
    { name: 'Vata', value: dist.vata, color: '#6B8E23' },
    { name: 'Pitta', value: dist.pitta, color: '#D9863C' },
    { name: 'Kapha', value: dist.kapha, color: '#CFA94B' },
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
        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h1 className="text-xl text-accent mb-1">Namaste {user.name ? `${user.name} Ji` : 'Ji'}</h1>
          <p className="text-sm text-muted-foreground">
            As you are <span className="text-card-foreground">{data.personaTitle || 'a balanced character'}</span>, you are <span className="text-card-foreground">{data.characterSummary || 'grounded and focused'}</span>. These metrics are derived from the astrology agent.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-card text-card-foreground">
            <p className="text-xs text-muted-foreground">Current State</p>
            <p className="text-lg text-accent">{data.currentState || '—'}</p>
          </Card>
          <Card className="p-4 bg-card text-card-foreground">
            <p className="text-xs text-muted-foreground">Interpretation</p>
            <p className="text-sm text-card-foreground">{data.interpretation || '—'}</p>
          </Card>
          <Card className="p-4 bg-card text-card-foreground">
            <p className="text-xs text-muted-foreground">Nature Effects (Positive)</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {(data.natureInsights || []).map((n: string, i: number) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </Card>
        </div>

        <Card className="glassmorphism p-6 mb-6 bg-card text-card-foreground">
          <h2 className="text-lg mb-3 text-accent">Dosha Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                    {chartData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Vata</p>
                <p className="text-2xl text-accent">{dist.vata}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pitta</p>
                <p className="text-2xl text-accent">{dist.pitta}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Kapha</p>
                <p className="text-2xl text-accent">{dist.kapha}%</p>
              </div>
            </div>
          </div>
        </Card>

        <Button onClick={() => onNavigate('chat')} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-4 rounded-xl">
          <MessageCircle className="w-5 h-5 mr-2" />
          Chat with AI
        </Button>
      </div>
    </div>
  );
}

