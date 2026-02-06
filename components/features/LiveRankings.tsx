'use client';

import { useState, useEffect } from 'react';
import { Institution } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScorePie from '@/components/ui/ScorePie';

interface LiveRankingsProps {
    schools: Institution[];
    preschools: Institution[];
    consultancies: Institution[];
    colleges: Institution[];
    trainingCenters: Institution[];
}

type Category = 'PRESCHOOL' | 'SCHOOL' | 'COLLEGE' | 'CONSULTANCY' | 'TRAINING_CENTER';

export default function LiveRankings({ schools, preschools, consultancies, colleges, trainingCenters }: LiveRankingsProps) {
    const [activeCategory, setActiveCategory] = useState<Category>('PRESCHOOL');
    const [isPaused, setIsPaused] = useState(false);

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveCategory(current => {
                if (current === 'PRESCHOOL') return 'SCHOOL';
                if (current === 'SCHOOL') return 'COLLEGE';
                if (current === 'COLLEGE') return 'CONSULTANCY';
                if (current === 'CONSULTANCY') return 'TRAINING_CENTER';
                return 'PRESCHOOL';
            });
        }, 5000); // 5 seconds rotation

        return () => clearInterval(interval);
    }, [isPaused]);

    const getData = () => {
        switch (activeCategory) {
            case 'PRESCHOOL': return preschools;
            case 'SCHOOL': return schools;
            case 'COLLEGE': return colleges;
            case 'CONSULTANCY': return consultancies;
            case 'TRAINING_CENTER': return trainingCenters;
        }
    };

    const categories: { id: Category; label: string }[] = [
        { id: 'PRESCHOOL', label: 'Top Preschools' },
        { id: 'SCHOOL', label: 'Top Schools' },
        { id: 'COLLEGE', label: 'Top Colleges' },
        { id: 'CONSULTANCY', label: 'Top Consultancies' },
        { id: 'TRAINING_CENTER', label: 'Top Training Centers' },
    ];

    return (
        <section className="container mx-auto px-4 py-20 overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>

            {/* Header with Filter */}
            <div className="relative flex flex-col md:flex-row justify-center items-end mb-10">
                {/* Centered Header Content */}
                <div className="text-center w-full">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-sm font-medium mb-3">
                        <Trophy className="w-4 h-4" />
                        <span>Top 10 Official Leaderboard</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                        EduRank <span className="text-blue-500">Rankings</span>
                    </h2>
                    <p className="text-zinc-500">Real-time leaderboard based on EduRank Score™</p>
                </div>

                {/* Filter Dropdown (Absolute Right on Desktop) */}
                <div className="relative mt-6 md:mt-0 md:absolute md:right-0 md:bottom-0 z-10 w-full max-w-xs md:w-auto">
                    <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value as Category)}
                        className="w-full md:w-auto appearance-none bg-zinc-900 border border-zinc-700 text-white py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[200px]"
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Grid Content - 2 Columns (1-5 Left, 6-10 Right) */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl py-8 px-4 md:px-16 min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto"
                    >
                        {/* Left Column 1-5 */}
                        <div className="space-y-3">
                            {getData().slice(0, 5).map((inst, index) => (
                                <RankingListItem key={inst.id} institution={inst} rank={index + 1} />
                            ))}
                        </div>

                        {/* Right Column 6-10 */}
                        <div className="space-y-3">
                            {getData().slice(5, 10).map((inst, index) => (
                                <RankingListItem key={inst.id} institution={inst} rank={index + 6} />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bars */}
            <div className="flex justify-center gap-2 mt-4">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeCategory === cat.id ? 'w-12 bg-blue-600' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                            }`}
                    />
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link href="/rankings" className="inline-flex items-center text-zinc-500 hover:text-white text-sm font-medium transition-colors">
                    View Complete Leaderboard <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
            </div>
        </section>
    );
}

function RankingListItem({ institution, rank }: { institution: Institution; rank: number }) {
    return (
        <Link
            href={`/institution/${institution.id}`}
            className="flex items-center gap-4 py-3 px-4 bg-black border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-900 transition-all group"
        >
            {/* Rank Badge */}
            <div className={`
                flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm shrink-0
                ${rank === 1 ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' :
                    rank === 2 ? 'bg-zinc-400 text-black' :
                        rank === 3 ? 'bg-orange-500 text-black' :
                            'bg-zinc-800 text-zinc-500'}
            `}>
                #{rank}
            </div>

            {/* Logo */}
            <img
                src={institution.image}
                alt={institution.name}
                className="w-10 h-10 rounded-full object-cover border border-zinc-700 shrink-0"
            />

            {/* Details */}
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-zinc-100 truncate group-hover:text-blue-400">{institution.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                    <span className="truncate">{institution.city}</span>
                    <span>•</span>
                    <span className="truncate capitalize">{institution.type.replace('_', ' ').toLowerCase()}</span>
                </div>
            </div>

            {/* Score */}
            <div className="shrink-0 hidden sm:block pl-2">
                <ScorePie score={institution.eduRankScore || 0} size={48} />
            </div>

            <ArrowRight className="h-4 w-4 text-zinc-700 group-hover:text-zinc-300" />
        </Link>
    );
}
