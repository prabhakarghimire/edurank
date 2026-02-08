'use client';

import { useState, useMemo } from 'react';
import { Institution } from '@/lib/data';
import { useInstitutions } from '@/lib/hooks/useInstitutions';
import Link from 'next/link';
import { ArrowRight, Trophy, Medal, Search, Filter, Loader2, MapPin } from 'lucide-react';
import ScorePie from '@/components/ui/ScorePie';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Category = 'ALL' | 'PRESCHOOL' | 'SCHOOL' | 'COLLEGE' | 'CONSULTANCY' | 'TRAINING_CENTER';

export default function RankingsPage() {
    const { data: institutions, loading, error } = useInstitutions();
    const [activeCategory, setActiveCategory] = useState<Category>('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCurriculum, setSelectedCurriculum] = useState<string>('ALL');
    const [selectedFacility, setSelectedFacility] = useState<string>('ALL');

    // Extract unique curricula and facilities for filters from all institutions
    const curricula = useMemo(() => {
        const set = new Set<string>();
        institutions.forEach(inst => inst.affiliation?.forEach(c => set.add(c)));
        return Array.from(set).sort();
    }, [institutions]);

    const facilities = useMemo(() => {
        const set = new Set<string>();
        institutions.forEach(inst => inst.features?.forEach(f => set.add(f)));
        return Array.from(set).sort();
    }, [institutions]);

    // Filtering logic
    const filteredInstitutions = useMemo(() => {
        return institutions
            .filter(inst => {
                // Category Filter
                const categoryMatch = activeCategory === 'ALL' || inst.type === activeCategory;

                // Search Filter (Name or Area/City)
                const searchMatch = !searchQuery ||
                    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inst.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    inst.city.toLowerCase().includes(searchQuery.toLowerCase());

                // Curriculum Filter
                const curriculumMatch = selectedCurriculum === 'ALL' ||
                    inst.affiliation?.includes(selectedCurriculum);

                // Facility Filter
                const facilityMatch = selectedFacility === 'ALL' ||
                    inst.features?.includes(selectedFacility);

                return categoryMatch && searchMatch && curriculumMatch && facilityMatch;
            })
            .sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0));
    }, [institutions, activeCategory, searchQuery, selectedCurriculum, selectedFacility]);

    return (
        <div className="bg-background min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-24 pb-20">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border border-yellow-500/20 text-sm font-medium">
                        <Trophy className="w-4 h-4" />
                        <span>Official Leaderboard</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        EduRank <span className="text-blue-500">Rankings</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        The most transparent and data-driven educational rankings in Nepal.
                        Updated daily based on academic performance, facilities, and student reviews.
                    </p>
                </div>

                {/* Dashboard / Controls */}
                <div className="max-w-5xl mx-auto bg-card border border-border rounded-2xl p-6 mb-10 shadow-sm space-y-6">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
                        {[
                            { id: 'ALL', label: 'All' },
                            { id: 'PRESCHOOL', label: 'Preschools' },
                            { id: 'SCHOOL', label: 'Schools' },
                            { id: 'COLLEGE', label: 'Colleges' },
                            { id: 'CONSULTANCY', label: 'Consultancies' },
                            { id: 'TRAINING_CENTER', label: 'Training Centers' },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id as Category)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search Bar */}
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by name or area..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                        </div>

                        {/* Curriculum Filter */}
                        <div className="relative">
                            <select
                                value={selectedCurriculum}
                                onChange={(e) => setSelectedCurriculum(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                            >
                                <option value="ALL">All Curricula</option>
                                {curricula.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>

                        {/* Facility Filter */}
                        <div className="relative">
                            <select
                                value={selectedFacility}
                                onChange={(e) => setSelectedFacility(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                            >
                                <option value="ALL">All Facilities</option>
                                {facilities.map(f => (
                                    <option key={f} value={f}>{f}</option>
                                ))}
                            </select>
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                            <p className="text-muted-foreground">Fetching latest rankings...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-red-500/5 border border-red-500/20 rounded-2xl p-8">
                            <p className="text-red-500 font-medium mb-2">Error loading data</p>
                            <p className="text-sm text-red-500/70">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredInstitutions.map((inst, index) => (
                                <RankingListItem key={inst.id} institution={inst} rank={index + 1} />
                            ))}

                            {filteredInstitutions.length === 0 && (
                                <div className="text-center py-20 text-muted-foreground">
                                    No institutions found matching your criteria.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function RankingListItem({ institution, rank }: { institution: Institution; rank: number }) {
    return (
        <Link
            href={`/institution/${institution.slug}`}
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/20 hover:bg-muted transition-all group shadow-sm"
        >
            {/* Rank Badge */}
            <div className={`
                flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg shrink-0
                ${rank === 1 ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' :
                    rank === 2 ? 'bg-zinc-400 text-black' :
                        rank === 3 ? 'bg-orange-600 text-white' :
                            'bg-muted text-muted-foreground'}
            `}>
                <span className="sr-only">Rank</span>
                #{rank}
            </div>

            {/* Logo */}
            <img
                src={institution.image}
                alt={institution.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-border shrink-0 group-hover:border-primary/20 transition-colors"
            />

            {/* Content */}
            <div className="flex-1 min-w-0 px-2">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-foreground truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{institution.name}</h3>
                    {rank <= 3 && <Medal className={`w-4 h-4 ${rank === 1 ? 'text-yellow-500' :
                        rank === 2 ? 'text-zinc-400' : 'text-orange-600'
                        }`} />}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{institution.city} ({institution.address})</span>
                    </div>
                    <span className="capitalize hidden sm:inline">• {institution.type.replace('_', ' ').toLowerCase()}</span>
                </div>
            </div>

            {/* Score */}
            <div className="shrink-0">
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 text-center font-sans">EduRank Score</div>
                <div className="flex justify-center">
                    <ScorePie score={institution.eduRankScore || 0} size={60} strokeWidth={4} />
                </div>
            </div>

            <div className="pl-4 border-l border-border hidden sm:block">
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
        </Link>
    );
}
