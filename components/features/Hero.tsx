'use client';

import { Search, MapPin, CheckCircle2, Trophy, TrendingUp, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push('/search');
        }
    };

    return (
        <section className="relative bg-zinc-950 text-white pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-white/5">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950/50 to-zinc-950"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    {/* Trust Badge - EduRank Score */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-zinc-300">
                            Powered by <span className="text-white font-bold">EduRank Score™</span>
                        </span>
                    </div>

                    {/* Headlines */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                            Find the best school or <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">consultancy for YOU</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            Compare fees, facilities, boards, reviews, locations and visa success rates — all in one place.
                        </p>
                    </div>

                    {/* Trust Signals */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium text-zinc-500 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>500+ Institutions Listed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-blue-500" />
                            <span>Kathmandu Valley Coverage</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-purple-500" />
                            <span>Verified Reviews</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-2 flex items-center shadow-2xl transition-all">
                                <Search className="h-6 w-6 text-zinc-400 ml-4" />
                                <input
                                    type="text"
                                    placeholder="Search by area, budget, board, country or facilities..."
                                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500 px-4 py-4 text-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 font-semibold px-8 h-14 rounded-lg text-base">
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Quick Filters */}
                    <div className="animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
                        <p className="text-sm text-zinc-500 mb-4 font-medium">Quick Filters:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/search?q=Kathmandu">
                                <Button variant="outline" size="sm" className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 backdrop-blur-sm rounded-full">
                                    📍 Kathmandu
                                </Button>
                            </Link>
                            <Link href="/search?maxFee=10000">
                                <Button variant="outline" size="sm" className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 backdrop-blur-sm rounded-full">
                                    💰 Under 10k/month
                                </Button>
                            </Link>
                            <Link href="/search?q=Transport">
                                <Button variant="outline" size="sm" className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 backdrop-blur-sm rounded-full">
                                    🚌 With Transport
                                </Button>
                            </Link>
                            <Link href="/search?q=Montessori">
                                <Button variant="outline" size="sm" className="bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 backdrop-blur-sm rounded-full">
                                    🧩 Montessori
                                </Button>
                            </Link>
                            {/* Consultancy Quick Filters */}
                            <Link href="/search?dest=Australia&type=CONSULTANCY">
                                <Button variant="outline" size="sm" className="bg-zinc-900/50 border-zinc-800 text-yellow-500 hover:text-yellow-400 hover:bg-zinc-800 hover:border-zinc-700 backdrop-blur-sm rounded-full">
                                    🇦🇺 Australia
                                </Button>
                            </Link>
                            <Link href="/search?dest=UK&type=CONSULTANCY">
                                <Button variant="outline" size="sm" className="bg-zinc-900/50 border-zinc-800 text-yellow-500 hover:text-yellow-400 hover:bg-zinc-800 hover:border-zinc-700 backdrop-blur-sm rounded-full">
                                    🇬🇧 UK
                                </Button>
                            </Link>
                            <Link href="/search?dest=Canada&type=CONSULTANCY">
                                <Button variant="outline" size="sm" className="bg-zinc-900/50 border-zinc-800 text-yellow-500 hover:text-yellow-400 hover:bg-zinc-800 hover:border-zinc-700 backdrop-blur-sm rounded-full">
                                    🇨🇦 Canada
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
