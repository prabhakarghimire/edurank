'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { GraduationCap, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email.includes('super')) {
            router.push('/admin/dashboard');
        } else {
            router.push('/institution/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 font-bold text-xl text-zinc-400 hover:text-white transition-colors">
                <GraduationCap className="h-6 w-6" />
                <span>EduRank Nepal</span>
            </Link>

            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Institution Login</h1>
                    <p className="mt-2 text-zinc-400">Access your dashboard to manage your profile and inquiries.</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Official Email</label>
                            <Input
                                type="email"
                                placeholder="admin@school.edu.np"
                                required
                                className="bg-zinc-950 border-zinc-800 focus:border-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                required
                                className="bg-zinc-950 border-zinc-800 focus:border-blue-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-base"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-zinc-500">
                            Don't have an account yet?{' '}
                            <Link href="/institution/claim" className="text-blue-400 hover:underline hover:text-blue-300 font-medium">
                                Claim your institution
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="text-center text-xs text-zinc-600">
                    <p>Protected by EduRank Secure Login</p>
                </div>
            </div>
        </div>
    );
}
