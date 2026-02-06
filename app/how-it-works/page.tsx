import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Target, Shield, Brain, Users, CheckCircle2, Search, BarChart3 } from 'lucide-react';

export const metadata = {
    title: 'How EduRank Works | Transparency & Methodology',
    description: 'Learn how EduRank calculates scores, verifies institutions, and ensures transparent education discovery in Nepal.',
};

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
                            <Brain className="h-4 w-4" />
                            <span className="text-sm font-semibold">AI-Driven Methodology</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            The Science Behind the <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">EduRank Score™</span>
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            We don't sell rankings. We analyze data. Our proprietary algorithm combines real parent reviews, verified facility data, and academic track records to give every institution a fair score.
                        </p>
                    </div>
                </section>

                {/* The 3 Pillars */}
                <section className="py-20 bg-zinc-900/30 border-y border-zinc-800">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Pillar 1 */}
                            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Target className="h-32 w-32" />
                                </div>
                                <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <BarChart3 className="h-6 w-6 text-blue-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Data-Driven Scoring</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Our detailed surveys collect over 50 data points per institution—from lab equipment quality to student-teacher ratios. We weight these factors based on global education standards.
                                </p>
                            </div>

                            {/* Pillar 2 */}
                            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:border-green-500/30 transition-colors">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Users className="h-32 w-32" />
                                </div>
                                <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <Users className="h-6 w-6 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Authentic Reviews</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    We use AI to detect and filter spam reviews. We prioritize feedback from verified students and parents, ensuring the rating you see reflects real experiences, not marketing hype.
                                </p>
                            </div>

                            {/* Pillar 3 */}
                            <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Shield className="h-32 w-32" />
                                </div>
                                <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                                    <Shield className="h-6 w-6 text-purple-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Strict Verification</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Institutions must provide proof for their claims. "100% Visa Success" or "Best Infrastructure" tags are only awarded after our team validates documents or conducts site visits.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Breakdown Visual */}
                <section className="py-24 container mx-auto px-4">
                    <div className="max-w-4xl mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">How Score Breakdown Works</h2>
                            <p className="text-zinc-400">Total Score (100) = Weighted Sum of 4 Key Areas</p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                <div className="md:col-span-3 text-right md:text-right font-bold text-zinc-300">Academic Quality</div>
                                <div className="md:col-span-8 flex items-center gap-4">
                                    <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-[35%]"></div>
                                    </div>
                                    <div className="font-mono text-blue-400">35%</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                <div className="md:col-span-3 text-right md:text-right font-bold text-zinc-300">Facilities</div>
                                <div className="md:col-span-8 flex items-center gap-4">
                                    <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-600 w-[25%]"></div>
                                    </div>
                                    <div className="font-mono text-purple-400">25%</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                <div className="md:col-span-3 text-right md:text-right font-bold text-zinc-300">Parent Reviews</div>
                                <div className="md:col-span-8 flex items-center gap-4">
                                    <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-600 w-[25%]"></div>
                                    </div>
                                    <div className="font-mono text-green-400">25%</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                <div className="md:col-span-3 text-right md:text-right font-bold text-zinc-300">Transparency</div>
                                <div className="md:col-span-8 flex items-center gap-4">
                                    <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-600 w-[15%]"></div>
                                    </div>
                                    <div className="font-mono text-yellow-400">15%</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-sm text-zinc-500 italic">
                                *Weights may vary slightly depending on institution type (e.g., Consultancies prioritize Visa Success metrics).
                            </p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
