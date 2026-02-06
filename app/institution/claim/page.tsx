'use client';

import ClaimForm from '@/components/features/ClaimForm';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ClaimPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-sm font-medium mb-6">
                        <ShieldCheck className="h-4 w-4" /> Official Institution Portal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Institution Sign Up
                    </h1>
                    <div className="flex justify-center gap-4 mb-8">
                        <Link href="/login">
                            <Button variant="outline" className="border-blue-600/30 text-blue-400 hover:bg-blue-900/10">
                                Already have an account? Sign In
                            </Button>
                        </Link>
                    </div>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
                        Join EduRank to manage your profile, respond to reviews, and showcase your facilities effectively.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-8 text-left max-w-4xl mx-auto">
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex-1">
                            <h3 className="font-bold text-lg mb-2 text-white">1. Select or Register</h3>
                            <p className="text-zinc-500 text-sm">Find your existing institution profile or start a fresh registration.</p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex-1">
                            <h3 className="font-bold text-lg mb-2 text-white">2. Create Account</h3>
                            <p className="text-zinc-500 text-sm">Set up your official admin account without complex paperwork.</p>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex-1">
                            <h3 className="font-bold text-lg mb-2 text-white">3. Instant Access</h3>
                            <p className="text-zinc-500 text-sm">Get immediate access to your dashboard to start updating.</p>
                        </div>
                    </div>
                </div>

                <ClaimForm />

                <div className="mt-20 text-center">
                    <p className="text-zinc-500">
                        Need help? Contact our support team at <a href="mailto:support@edurank.np" className="text-blue-500 hover:underline">support@edurank.np</a>
                    </p>
                </div>
            </main>

        </div>
    );
}
