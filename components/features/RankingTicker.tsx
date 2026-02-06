'use client';

import { Institution } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface RankingTickerProps {
    title: string;
    institutions: Institution[];
}

export default function RankingTicker({ title, institutions }: RankingTickerProps) {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Star className={`h-5 w-5 ${title.includes('Schools') ? 'text-blue-500' : 'text-green-500'} fill-current`} />
                    {title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">Live Ranking Updates</p>
            </div>

            {/* Scrolling List */}
            <div className="flex-1 overflow-hidden relative group">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-zinc-950/20 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-950/20 to-transparent z-10 pointer-events-none" />

                {/* Ticker Content */}
                <div className="animate-vertical-scroll hover:[animation-play-state:paused] space-y-2 p-2">
                    {/* First Copy */}
                    {institutions.map((inst, index) => (
                        <RankingItem key={`${inst.id}-1`} institution={inst} rank={index + 1} />
                    ))}
                    {/* Second Copy for seamless loop */}
                    {institutions.map((inst, index) => (
                        <RankingItem key={`${inst.id}-2`} institution={inst} rank={index + 1} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes vertical-scroll {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .animate-vertical-scroll {
                    animation: vertical-scroll 30s linear infinite;
                }
            `}</style>
        </div>
    );
}

function RankingItem({ institution, rank }: { institution: Institution; rank: number }) {
    return (
        <Link
            href={`/institution/${institution.id}`}
            className="flex items-center gap-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-800 transition-all group"
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
                </div>
            </div>

            {/* Score */}
            <div className="text-right shrink-0">
                <div className={`text-sm font-bold ${(institution.eduRankScore || 0) >= 90 ? 'text-green-500' : 'text-blue-500'
                    }`}>
                    {institution.eduRankScore}
                </div>
            </div>
        </Link>
    )
}
