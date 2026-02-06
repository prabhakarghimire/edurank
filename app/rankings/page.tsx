'use client';

import { useState } from 'react';
import { mockInstitutions, Institution } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Trophy, Medal } from 'lucide-react';
import ScorePie from '@/components/ui/ScorePie';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Category = 'ALL' | 'PRESCHOOL' | 'SCHOOL' | 'COLLEGE' | 'CONSULTANCY' | 'TRAINING_CENTER';

export default function RankingsPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('ALL');

    const filteredInstitutions = mockInstitutions
        .filter(inst => {
            if (activeCategory === 'ALL') return true;
            return inst.type === activeCategory;
        })
        .sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0));

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

                {/* Filters */}
                <div className="flex justify-center mb-10 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
                    <div className="flex bg-muted/50 p-1 rounded-xl border border-border">
                        {[
                            { id: 'ALL', label: 'All Institutions' },
                            { id: 'PRESCHOOL', label: 'Preschools' },
                            { id: 'SCHOOL', label: 'Schools' },
                            { id: 'COLLEGE', label: 'Colleges' },
                            { id: 'CONSULTANCY', label: 'Consultancies' },
                            { id: 'TRAINING_CENTER', label: 'Training Centers' },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id as Category)}
                                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                                    ? 'bg-primary text-primary-foreground shadow-lg'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rankings List */}
                <div className="max-w-4xl mx-auto space-y-3">
                    {filteredInstitutions.map((inst, index) => (
                        <RankingListItem key={inst.id} institution={inst} rank={index + 1} />
                    ))}

                    {filteredInstitutions.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            No institutions found in this category.
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
            href={`/institution/${institution.id}`}
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="capitalize">{institution.type.replace('_', ' ').toLowerCase()}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{institution.city}</span>
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
