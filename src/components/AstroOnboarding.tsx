import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AstroOnboardingProps {
  onNavigate: (screen: string) => void;
}

export function AstroOnboarding({ onNavigate }: AstroOnboardingProps) {
  const [form, setForm] = useState({
    email: '',
    dob: '',
    tob: '',
    birthPlace: '',
    currentLocation: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { ...form };
    const fallback = {
      greeting: 'Namaste',
      personaTitle: 'Balanced Seeker',
      characterSummary: 'Grounded yet curious',
      currentState: 'Kapha slightly elevated',
      doshaDistribution: { vata: 30, pitta: 35, kapha: 35 },
      interpretation: 'Spring Kapha context with stable digestion; keep food light and warm.',
      natureInsights: [
        'Consistent routines bring stability',
        'Warmth and lightness support energy',
        'Humid climate increases Kapha — choose drying spices',
      ],
    };

    try {
      const res = await fetch('http://localhost:5678/webhook-test/astro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => fallback);
      localStorage.setItem('astro-insights', JSON.stringify(data || fallback));
    } catch {
      localStorage.setItem('astro-insights', JSON.stringify(fallback));
    } finally {
      setLoading(false);
      onNavigate('astro-insights');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1653364744086-23f5e85de842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsb3R1cyUyMGZsb3dlciUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTg3MjIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Lotus background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 p-6 flex items-center justify-center">
        <Card className="w-full max-w-lg glassmorphism bg-card text-card-foreground p-6">
          <h1 className="text-xl text-accent mb-4">Onboarding</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tob">Time of Birth</Label>
                <Input id="tob" type="time" value={form.tob} onChange={(e) => setForm({ ...form, tob: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthPlace">Place of Birth</Label>
              <Input id="birthPlace" value={form.birthPlace} onChange={(e) => setForm({ ...form, birthPlace: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentLocation">Current Location</Label>
              <Input id="currentLocation" value={form.currentLocation} onChange={(e) => setForm({ ...form, currentLocation: e.target.value })} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Processing…' : 'Continue'}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

