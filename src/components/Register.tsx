import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface RegisterProps {
    onNavigate: (screen: string) => void;
}

export function Register({ onNavigate }: RegisterProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        nativePlace: '',
        age: '',
        gender: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);

            // Save user to localStorage
            const user = {
                name: formData.name,
                email: formData.email,
                password: formData.password, // In a real app, never store plain text passwords!
                dob: formData.dob,
                nativePlace: formData.nativePlace,
                age: formData.age,
                gender: formData.gender,
            };

            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Account created successfully!');
            onNavigate('login');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl md:text-3xl font-bold text-center">Create an account</CardTitle>
                    <CardDescription className="text-center text-foreground">
                        Enter your information to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-3">
                            <Label htmlFor="name" className="text-base md:text-lg">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="text-base md:text-lg"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-base md:text-lg">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="text-base md:text-lg"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label htmlFor="dob" className="text-base md:text-lg">Date of Birth</Label>
                                <Input
                                    id="dob"
                                    type="date"
                                    required
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    className="text-base md:text-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="age" className="text-base md:text-lg">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    placeholder="Age"
                                    required
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    className="text-base md:text-lg"
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="gender" className="text-base md:text-lg">Gender</Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value: string) => setFormData({ ...formData, gender: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="nativePlace" className="text-base md:text-lg">Native Place</Label>
                            <Input
                                id="nativePlace"
                                placeholder="City, Country"
                                required
                                value={formData.nativePlace}
                                onChange={(e) => setFormData({ ...formData, nativePlace: e.target.value })}
                                className="text-base md:text-lg"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" className="text-base md:text-lg">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="text-base md:text-lg"
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
                        <div className="space-y-3">
                            <Label htmlFor="confirmPassword" className="text-base md:text-lg">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="text-base md:text-lg"
                            />
                        </div>
                        <Button className="w-full text-base md:text-lg" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                    <div className="text-base text-foreground text-center">
                        Already have an account?{' '}
                        <button
                            onClick={() => onNavigate('login')}
                            className="text-primary hover:underline font-medium"
                        >
                            Sign in
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
