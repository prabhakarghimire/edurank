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
        <section className="relative bg-background text-foreground pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden border-b border-border">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-background to-background"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-40 brightness-100 contrast-150"></div>
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">

                    {/* Trust Badge - EduRank Score */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-muted-foreground">
                            Powered by <span className="text-foreground font-bold">EduRank Score™</span>
                        </span>
                    </div>

                    {/* Headlines */}
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                            Find the best school or <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">consultancy for YOU</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Compare fees, facilities, boards, reviews, locations and visa success rates — all in one place.
                        </p>
                    </div>

                    {/* Trust Signals */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
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
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                            <div className="relative bg-background border border-border hover:border-primary/20 rounded-xl p-2 flex items-center shadow-2xl transition-all">
                                <Search className="h-6 w-6 text-muted-foreground ml-4" />
                                <input
                                    type="text"
                                    placeholder="Search by area, budget, board, country or facilities..."
                                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground px-4 py-4 text-lg"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 font-semibold px-8 h-14 rounded-lg text-base shadow-lg">
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Quick Filters */}
                    <div className="animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
                        <p className="text-sm text-muted-foreground mb-4 font-medium">Quick Filters:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/search?q=Kathmandu">
                                <Button variant="outline" size="sm" className="bg-background border-border text-foreground hover:bg-muted rounded-full shadow-sm">
                                    📍 Kathmandu
                                </Button>
                            </Link>
                            <Link href="/search?maxFee=10000">
                                <Button variant="outline" size="sm" className="bg-background border-border text-foreground hover:bg-muted rounded-full shadow-sm">
                                    💰 Under 10k/month
                                </Button>
                            </Link>
                            <Link href="/search?q=Transport">
                                <Button variant="outline" size="sm" className="bg-background border-border text-foreground hover:bg-muted rounded-full shadow-sm">
                                    🚌 With Transport
                                </Button>
                            </Link>
                            <Link href="/search?q=Montessori">
                                <Button variant="outline" size="sm" className="bg-background border-border text-foreground hover:bg-muted rounded-full shadow-sm">
                                    🧩 Montessori
                                </Button>
                            </Link>
                            {/* Consultancy Quick Filters */}
                            <Link href="/search?dest=Australia&type=CONSULTANCY">
                                <Button variant="outline" size="sm" className="bg-background border-border text-yellow-600 dark:text-yellow-500 hover:bg-muted rounded-full shadow-sm">
                                    🇦🇺 Australia
                                </Button>
                            </Link>
                            <Link href="/search?dest=UK&type=CONSULTANCY">
                                <Button variant="outline" size="sm" className="bg-background border-border text-yellow-600 dark:text-yellow-500 hover:bg-muted rounded-full shadow-sm">
                                    🇬🇧 UK
                                </Button>
                            </Link>
                            <Link href="/search?dest=Canada&type=CONSULTANCY">
                                <Button variant="outline" size="sm" className="bg-background border-border text-yellow-600 dark:text-yellow-500 hover:bg-muted rounded-full shadow-sm">
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
