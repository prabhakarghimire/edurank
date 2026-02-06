import Link from 'next/link';
import { Institution } from '@/lib/data';
import { Star, MapPin, Trophy, CheckCircle, ArrowRight, ShieldCheck, CalendarClock, Globe, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstitutionCardProps {
    institution: Institution;
    rank?: number; // Added rank prop
}

export default function InstitutionCard({ institution, rank }: InstitutionCardProps) {
    const isPremium = institution.tier === 'PREMIUM';
    const isConsultancy = institution.type === 'CONSULTANCY';

    // Determine color scheme based on score
    const score = institution.eduRankScore || 0;
    const scoreColor = score >= 90 ? 'text-green-500' : score >= 80 ? 'text-blue-500' : 'text-yellow-500';
    const scoreBg = score >= 90 ? 'bg-green-500/10' : score >= 80 ? 'bg-blue-500/10' : 'bg-yellow-500/10';

    return (
        <div className={`group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1
            ${isPremium ? 'border-yellow-500/30 shadow-yellow-500/5' : 'border-zinc-200 dark:border-zinc-800'}
            ${rank === 1 ? 'ring-2 ring-yellow-500/50' : ''} 
        `}>
            {/* Header Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={institution.image}
                    alt={institution.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Rank Badge for Homepage */}
                {rank && (
                    <div className="absolute top-0 left-0 z-10">
                        <div className={`
                             flex items-center justify-center w-10 h-10 rounded-br-xl text-white font-bold text-lg shadow-lg
                             ${rank === 1 ? 'bg-yellow-500' :
                                rank === 2 ? 'bg-zinc-400' :
                                    rank === 3 ? 'bg-orange-500' :
                                        'bg-zinc-700'}
                         `}>
                            #{rank}
                        </div>
                    </div>
                )}

                {/* Type Badge (Moved to Bottom Left) */}
                <div className="absolute bottom-3 left-3">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white border border-white/10 uppercase tracking-wide">
                        {institution.type.replace('_', ' ')}
                    </span>
                </div>

                {/* Premium / Top Choice Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    {rank === 1 && (
                        <span className="bg-blue-600 text-white px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                            <Trophy className="h-3 w-3" /> Top Choice
                        </span>
                    )}
                    {isPremium && (
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-lg">
                            Promoted
                        </span>
                    )}
                </div>

                {/* Floating Score (Marketplace Style) */}
                {/* ... score logic ... */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white dark:bg-zinc-950 p-1.5 pr-3 rounded-lg shadow-lg border border-zinc-100 dark:border-zinc-800">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-md font-bold text-sm ${scoreBg} ${scoreColor}`}>
                        {score}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold leading-tight">EduRank</span>
                        <span className="text-[10px] font-medium leading-tight text-zinc-800 dark:text-zinc-200">Score</span>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
                {/* Title & Location */}
                <div>
                    <Link href={`/institution/${institution.id}`} className="block">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {institution.name}
                        </h3>
                    </Link>
                    <div className="flex items-center text-zinc-500 text-xs mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span className="truncate">{institution.address}, {institution.city}</span>
                    </div>
                </div>

                {/* Key Stats Row */}
                <div className="flex items-center gap-4 py-2 border-t border-b border-zinc-100 dark:border-zinc-800/50">
                    {isConsultancy ? (
                        <>
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck className="h-4 w-4 text-green-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase">Visa Success</span>
                                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{institution.visaSuccessRate || '95'}%</span>
                                </div>
                            </div>
                            <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
                            <div className="flex items-center gap-1.5">
                                <CalendarClock className="h-4 w-4 text-blue-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase">Experience</span>
                                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{institution.yearsInBusiness || '5'}+ Yrs</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-1.5">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase">Rating</span>
                                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{institution.rating}</span>
                                </div>
                            </div>
                            <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
                            <div className="flex items-center gap-1.5">
                                <Trophy className="h-4 w-4 text-purple-500" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-500 uppercase">Review</span>
                                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{institution.reviews}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Features / Destinations */}
                <div className="flex flex-wrap gap-2 text-xs">
                    {(isConsultancy ? institution.destinations : institution.features)?.slice(0, 3).map((item, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium tracking-wide">
                            {item}
                        </span>
                    ))}
                    {(isConsultancy ? (institution.destinations?.length || 0) : institution.features.length) > 3 && (
                        <span className="px-2 py-1 rounded bg-zinc-50 dark:bg-zinc-900 text-zinc-400">
                            +{((isConsultancy ? institution.destinations?.length : institution.features.length) || 0) - 3}
                        </span>
                    )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2 pt-1">
                    <div className="grid grid-cols-2 gap-2">
                        <Link href={`/institution/${institution.id}`} className="w-full">
                            <Button variant="outline" className="w-full text-xs h-9 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                View Profile
                            </Button>
                        </Link>
                        {isConsultancy ? (
                            <Link href={institution.website || '#'} target="_blank" className="w-full">
                                <Button variant="outline" className="w-full text-xs h-9 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center gap-1">
                                    <Globe className="h-3 w-3" /> Website
                                </Button>
                            </Link>
                        ) : (
                            <Link href={`/compare?add=${institution.id}`} className="w-full">
                                <Button size="sm" className="w-full text-xs h-9 bg-zinc-900 dark:bg-white text-white dark:text-black hover:opacity-90 font-semibold">
                                    Compare
                                </Button>
                            </Link>
                        )}
                    </div>
                    {isConsultancy && (
                        <Link href={`/institution/${institution.id}#book`} className="w-full">
                            <Button size="sm" className="w-full text-xs h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-blue-500/20 shadow-md flex items-center justify-center gap-2">
                                <Search className="h-3 w-3" /> Contact Consultancy
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
