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
        <div className="bg-black min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-24 pb-20">
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-sm font-medium">
                        <Trophy className="w-4 h-4" />
                        <span>Official Leaderboard</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        EduRank <span className="text-blue-500">Rankings</span>
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        The most transparent and data-driven educational rankings in Nepal.
                        Updated daily based on academic performance, facilities, and student reviews.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center mb-10 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
                    <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
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
                                    ? 'bg-zinc-800 text-white shadow-lg'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
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
                        <RankingItem key={inst.id} institution={inst} rank={index + 1} />
                    ))}

                    {filteredInstitutions.length === 0 && (
                        <div className="text-center py-20 text-zinc-500">
                            No institutions found in this category.
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

function RankingItem({ institution, rank }: { institution: Institution; rank: number }) {
    return (
        <Link
            href={`/institution/${institution.id}`}
            className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
        >
            {/* Rank Badge */}
            <div className={`
                flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg shrink-0
                ${rank === 1 ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' :
                    rank === 2 ? 'bg-zinc-400 text-black' :
                        rank === 3 ? 'bg-orange-600 text-white' :
                            'bg-zinc-800 text-zinc-500'}
            `}>
                <span className="sr-only">Rank</span>
                #{rank}
            </div>

            {/* Logo */}
            <img
                src={institution.image}
                alt={institution.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-zinc-800 shrink-0 group-hover:border-zinc-700 transition-colors"
            />

            {/* Content */}
            <div className="flex-1 min-w-0 px-2">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-white truncate group-hover:text-blue-400 transition-colors">{institution.name}</h3>
                    {rank <= 3 && <Medal className={`w-4 h-4 ${rank === 1 ? 'text-yellow-500' :
                        rank === 2 ? 'text-zinc-400' : 'text-orange-600'
                        }`} />}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span className="capitalize">{institution.type.replace('_', ' ').toLowerCase()}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span>{institution.city}</span>
                </div>
            </div>

            {/* Score */}
            <div className="shrink-0">
                <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1 text-center">EduRank Score</div>
                <div className="flex justify-center">
                    <ScorePie score={institution.eduRankScore || 0} size={60} strokeWidth={4} />
                </div>
            </div>

            <div className="pl-4 border-l border-zinc-800 hidden sm:block">
                <ArrowRight className="h-5 w-5 text-zinc-700 group-hover:text-white transition-colors" />
            </div>
        </Link>
    );
}
