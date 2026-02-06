'use client';

import { useState, useEffect } from 'react';
import { Institution } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [activeCategory, setActiveCategory] = useState<Category>('CONSULTANCY');
    const [isPaused, setIsPaused] = useState(false);

    const categories: { id: Category; label: string }[] = [
        { id: 'CONSULTANCY', label: 'Top Consultancies' },
        { id: 'PRESCHOOL', label: 'Top Preschools' },
        { id: 'SCHOOL', label: 'Top Schools' },
        { id: 'COLLEGE', label: 'Top Colleges' },
        { id: 'TRAINING_CENTER', label: 'Top Training Centers' },
    ];

    const handleNext = () => {
        setActiveCategory(current => {
            const currentIndex = categories.findIndex(c => c.id === current);
            const nextIndex = (currentIndex + 1) % categories.length;
            return categories[nextIndex].id;
        });
    };

    const handlePrev = () => {
        setActiveCategory(current => {
            const currentIndex = categories.findIndex(c => c.id === current);
            const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
            return categories[prevIndex].id;
        });
    };

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            handleNext();
        }, 5000); // 5 seconds rotation

        return () => clearInterval(interval);
    }, [isPaused, activeCategory]);

    const getData = () => {
        switch (activeCategory) {
            case 'CONSULTANCY': return consultancies;
            case 'PRESCHOOL': return preschools;
            case 'SCHOOL': return schools;
            case 'COLLEGE': return colleges;
            case 'TRAINING_CENTER': return trainingCenters;
        }
    };

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
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                        EduRank <span className="text-blue-500">Rankings</span>
                    </h2>
                    <p className="text-muted-foreground">Real-time leaderboard based on EduRank Score™</p>
                </div>

                {/* Filter Dropdown (Absolute Right on Desktop) */}
                <div className="relative mt-6 md:mt-0 md:absolute md:right-0 md:bottom-0 z-10 w-full max-w-xs md:w-auto">
                    <select
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value as Category)}
                        className="w-full md:w-auto appearance-none bg-muted border border-border text-foreground py-2.5 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[200px]"
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Grid Content with Navigation Arrows */}
            <div className="relative group/nav bg-muted/30 border border-border rounded-3xl py-8 px-4 md:px-16 min-h-[400px]">
                {/* Navigation Buttons - Brought into the gap */}
                <button
                    onClick={handlePrev}
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-background transition-all opacity-0 group-hover/nav:opacity-100 hidden sm:flex items-center justify-center hover:scale-110 active:scale-95 shadow-xl"
                    aria-label="Previous category"
                >
                    <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                </button>

                <button
                    onClick={handleNext}
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-background transition-all opacity-0 group-hover/nav:opacity-100 hidden sm:flex items-center justify-center hover:scale-110 active:scale-95 shadow-xl"
                    aria-label="Next category"
                >
                    <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                </button>

                <div className="text-center mb-8">
                    <AnimatePresence mode="wait">
                        <motion.h3
                            key={activeCategory}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="text-2xl font-bold text-white tracking-tight"
                        >
                            {categories.find(c => c.id === activeCategory)?.label}
                        </motion.h3>
                    </AnimatePresence>
                    <div className="h-1 w-12 bg-blue-600 mx-auto mt-2 rounded-full" />
                </div>

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
                        className={`h-1.5 rounded-full transition-all duration-300 ${activeCategory === cat.id ? 'w-12 bg-blue-600' : 'w-2 bg-muted hover:bg-muted/80'
                            }`}
                    />
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link href="/rankings" className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                    View Complete Leaderboard <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
            </div>
        </section >
    );
}

function RankingListItem({ institution, rank }: { institution: Institution; rank: number }) {
    return (
        <Link
            href={`/institution/${institution.id}`}
            className="flex items-center gap-4 py-3 px-4 bg-card border border-border rounded-xl hover:border-primary/20 hover:bg-muted transition-all group shadow-sm"
        >
            {/* Rank Badge */}
            <div className={`
                flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm shrink-0
                ${rank === 1 ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' :
                    rank === 2 ? 'bg-zinc-400 text-black' :
                        rank === 3 ? 'bg-orange-500 text-black' :
                            'bg-muted text-muted-foreground font-bold'}
            `}>
                #{rank}
            </div>

            {/* Logo */}
            <img
                src={institution.image}
                alt={institution.name}
                className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
            />

            {/* Details */}
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-foreground truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">{institution.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="truncate">{institution.city}</span>
                    <span>•</span>
                    <span className="truncate capitalize">{institution.type.replace('_', ' ').toLowerCase()}</span>
                </div>
            </div>

            {/* Score */}
            <div className="shrink-0 hidden sm:block pl-2">
                <ScorePie score={institution.eduRankScore || 0} size={48} />
            </div>

            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
        </Link>
    );
}
