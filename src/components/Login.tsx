import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface LoginProps {
  onNavigate: (screen: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const storedUser = localStorage.getItem('user');
    let user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) {
      user = {
        name: formData.email.split('@')[0] || 'Guest',
        email: formData.email,
        password: formData.password,
      };
      localStorage.setItem('user', JSON.stringify(user));
    }

    const defaultData = {
      personalSnapshot: {
        constitutionOverview: 'Balanced with slight Pitta tendency',
        currentStateSummary: 'Mild Pitta aggravation with steady energy',
        personaTitle: 'Focused Explorer',
        keyTraits: ['Focused', 'Driven', 'Warm-hearted'],
      },
      doshaProfile: {
        primaryAggravatedDosha: 'Pitta',
        secondaryInfluences: ['Vata'],
        bodyMindImpact: ['Heat, irritability', 'Sharp focus'],
        symptoms: ['Acidity', 'Skin warmth'],
      },
      metabolicDigestive: {
        agniType: 'Tikshna (sharp)',
        amaLevel: 'Low',
        digestiveStrengthScore: 78,
        interpretation: 'Good digestion with occasional heat; favor cooling foods',
      },
      extras: {
        balanceMeter: { vata: 30, pitta: 45, kapha: 25 },
        climateEffectScore: 62,
        foodScore: 80,
        energyCurve: { morning: 7, afternoon: 8, evening: 6 },
        weeklyTips: ['Add coriander to meals', 'Evening wind-down routine', 'Hydrate consistently'],
      },
    };

    try {
      const healthReq = fetch('/api/health', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      const reportReq = fetch('/api/report', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, context: defaultData }),
      });

      const astroReq = fetch('/api/astro', { method: 'GET', headers: { Accept: 'application/json' } });
      const practitionerReq = fetch('/api/practitioner', { method: 'GET', headers: { Accept: 'application/json' } });

      const [healthRes, reportRes, astroRes, practitionerRes] = await Promise.allSettled([healthReq, reportReq, astroReq, practitionerReq]);

      const healthJson =
        healthRes.status === 'fulfilled'
          ? await healthRes.value.json().catch(() => ({}))
          : {};
      const reportJson =
        reportRes.status === 'fulfilled'
          ? await reportRes.value.json().catch(() => ({}))
          : {};
      const astroJson =
        astroRes.status === 'fulfilled'
          ? await astroRes.value.json().catch(() => ({}))
          : {};
      const practitionerJson =
        practitionerRes.status === 'fulfilled'
          ? await practitionerRes.value.json().catch(() => ({}))
          : {};

      const combined = { ...defaultData, ...healthJson, ...reportJson, astro: astroJson?.astro || astroJson || {}, practitioners: practitionerJson?.practitioners || practitionerJson || [] };
      localStorage.setItem('ayurveda-dashboard', JSON.stringify(combined));
      toast.success('Login successful!');
      onNavigate('ayurveda-dashboard');
    } catch (err) {
      localStorage.setItem('ayurveda-dashboard', JSON.stringify(defaultData));
      toast.success('Login successful!');
      onNavigate('ayurveda-dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
