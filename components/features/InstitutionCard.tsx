import Link from 'next/link';
import { Institution } from '@/lib/data';
import { Star, MapPin, IndianRupee } from 'lucide-react';

interface InstitutionCardProps {
    institution: Institution;
}

export default function InstitutionCard({ institution }: InstitutionCardProps) {
    const isPremium = institution.tier === 'PREMIUM';

    return (
        <div className={`bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300 group
            ${isPremium ? 'border-yellow-500/50 shadow-yellow-500/10 dark:shadow-yellow-500/20' : 'border-zinc-200 dark:border-zinc-800'}
        `}>
            <div className="relative h-48">
                <img
                    src={institution.image}
                    alt={institution.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-0 inset-x-0 p-2 flex justify-between items-start">
                    <div className="bg-white/90 dark:bg-black/90 px-2 py-1 rounded text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                        {institution.type}
                    </div>
                    {isPremium && (
                        <div className="bg-yellow-500 text-black px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            Promoted
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                        {institution.name}
                    </h3>
                    {/* The rating display is moved below */}
                </div>

                <div className="flex items-center text-zinc-400 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{institution.address}, {institution.city}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 font-bold text-white">{institution.rating.toFixed(1)}</span>
                        <span className="text-zinc-500 text-xs ml-1">({institution.reviews} reviews)</span>
                    </div>
                    <div className="text-blue-400 font-bold text-sm">
                        NPR {institution.fees.toLocaleString()}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {/* Destinations (Priority for Consultancies) */}
                    {institution.destinations && institution.destinations.length > 0 && (
                        institution.destinations.slice(0, 3).map((dest, idx) => (
                            <span key={`dest-${idx}`} className="text-xs bg-blue-900/30 text-blue-200 border border-blue-800 px-2 py-1 rounded">
                                {dest}
                            </span>
                        ))
                    )}

                    {/* Generic Features */}
                    {institution.features.slice(0, 3).map((item, index) => (
                        <span key={index} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">
                            {item}
                        </span>
                    ))}
                    {(institution.features.length + (institution.destinations?.length || 0)) > 3 && (
                        <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-1 rounded">
                            +more
                        </span>
                    )}
                </div>

                <Link
                    href={`/institution/${institution.id}`}
                    className="block w-full text-center bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
