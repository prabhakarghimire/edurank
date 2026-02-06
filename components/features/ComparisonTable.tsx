'use client';

import { Institution } from '@/lib/data';
import { X, Check, Minus, MapPin, Building2, Star, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ComparisonTableProps {
    institutions: Institution[];
    onRemove: (id: string) => void;
}

export default function ComparisonTable({ institutions, onRemove }: ComparisonTableProps) {
    // Helper helpers for highlighting
    const maxRating = Math.max(...institutions.map(i => i.rating));
    const minFees = Math.min(...institutions.map(i => i.feeDetails?.annual || i.fees));

    return (
        <div className="overflow-x-auto pb-4">
            <div className="min-w-[800px] border border-zinc-800 rounded-xl bg-zinc-900/50">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-r border-zinc-800 bg-zinc-900/80 w-48 sticky left-0 z-10 text-zinc-400 font-medium">features</th>
                            {institutions.map(inst => (
                                <th key={inst.id} className="p-4 border-b border-zinc-800 min-w-[250px] relative group">
                                    <button
                                        onClick={() => onRemove(inst.id)}
                                        className="absolute top-2 right-2 p-1 text-zinc-600 hover:text-red-400 hover:bg-zinc-800 rounded opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                    <div className="flex flex-col gap-3">
                                        <img src={inst.image} alt={inst.name} className="w-full h-32 object-cover rounded-lg" />
                                        <div>
                                            <div className="text-xs font-bold text-blue-500 mb-1">{inst.type}</div>
                                            <Link href={`/institution/${inst.id}`} className="font-bold text-lg hover:underline decoration-blue-500/30 underline-offset-4">
                                                {inst.name}
                                            </Link>
                                            <div className="flex items-center gap-1 text-sm text-zinc-400 mt-1">
                                                <MapPin className="h-3 w-3" /> {inst.city}
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            ))}
                            {/* Empty columns filler if less than 3 */}
                            {[...Array(3 - institutions.length)].map((_, i) => (
                                <th key={`empty-${i}`} className="p-4 border-b border-zinc-800 min-w-[250px] bg-zinc-900/20">
                                    <div className="h-full flex items-center justify-center text-zinc-600 border-2 border-dashed border-zinc-800 rounded-lg py-12">
                                        Add Institution
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {/* Rating Row */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10">Overall Rating</td>
                            {institutions.map(inst => (
                                <td key={inst.id} className={`p-4 ${inst.rating === maxRating && institutions.length > 1 ? 'bg-green-500/10' : ''}`}>
                                    <div className="flex items-center gap-2">
                                        <Star className={`h-5 w-5 ${inst.rating === maxRating && institutions.length > 1 ? 'text-green-500 fill-current' : 'text-yellow-500 fill-current'}`} />
                                        <span className={`text-xl font-bold ${inst.rating === maxRating && institutions.length > 1 ? 'text-green-500' : ''}`}>{inst.rating.toFixed(1)}</span>
                                        <span className="text-sm text-zinc-500">({inst.reviews})</span>
                                    </div>
                                </td>
                            ))}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>

                        {/* Approx Fees Row */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10">Annual Fees</td>
                            {institutions.map(inst => {
                                const fees = inst.feeDetails?.annual || inst.fees;
                                const isLowest = fees === minFees && institutions.length > 1;
                                return (
                                    <td key={inst.id} className={`p-4 ${isLowest ? 'bg-green-500/10' : ''}`}>
                                        <div className="flex items-center gap-1">
                                            <IndianRupee className={`h-4 w-4 ${isLowest ? 'text-green-500' : 'text-zinc-400'}`} />
                                            <span className={`font-semibold ${isLowest ? 'text-green-500' : 'text-white'}`}>{fees.toLocaleString()}</span>
                                        </div>
                                        <div className="text-xs text-zinc-500 mt-1">NPR / Year</div>
                                    </td>
                                );
                            })}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>

                        {/* Affiliation */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10">Affiliation</td>
                            {institutions.map(inst => (
                                <td key={inst.id} className="p-4 text-sm">
                                    {inst.affiliation?.join(', ') || 'N/A'}
                                </td>
                            ))}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>

                        {/* Programs */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10 align-top">Key Programs</td>
                            {institutions.map(inst => (
                                <td key={inst.id} className="p-4 align-top">
                                    <div className="flex flex-wrap gap-1">
                                        {inst.programs?.slice(0, 3).map(p => (
                                            <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                {p}
                                            </span>
                                        ))}
                                        {(inst.programs?.length || 0) > 3 && (
                                            <span className="text-xs text-zinc-500 py-0.5">+{(inst.programs?.length || 0) - 3} more</span>
                                        )}
                                    </div>
                                </td>
                            ))}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>

                        {/* Student Teacher Ratio */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10">S:T Ratio</td>
                            {institutions.map(inst => (
                                <td key={inst.id} className="p-4 text-sm font-mono text-zinc-400">
                                    {inst.studentTeacherRatio ? `1:${inst.studentTeacherRatio}` : 'N/A'}
                                </td>
                            ))}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>

                        {/* Safety Features */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10 align-top">Safety</td>
                            {institutions.map(inst => (
                                <td key={inst.id} className="p-4 align-top">
                                    <ul className="list-disc list-inside text-xs text-zinc-400">
                                        {inst.safetyFeatures?.map(s => (
                                            <li key={s}>{s}</li>
                                        )) || <span className="text-zinc-600">N/A</span>}
                                    </ul>
                                </td>
                            ))}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>

                        {/* Founded Year */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10">Established</td>
                            {institutions.map(inst => (
                                <td key={inst.id} className="p-4 font-mono text-zinc-400">
                                    {inst.foundedYear || 'N/A'}
                                </td>
                            ))}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>

                        {/* Facilities */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10 align-top">Facilities</td>
                            {institutions.map(inst => (
                                <td key={inst.id} className="p-4 align-top">
                                    <div className="flex flex-wrap gap-2">
                                        {inst.features.map(f => (
                                            <span key={f} className="inline-flex items-center px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300 border border-zinc-700">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            ))}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>

                        {/* Verified Status */}
                        <tr>
                            <td className="p-4 border-r border-zinc-800 font-medium text-zinc-300 sticky left-0 bg-zinc-900 z-10">Verification</td>
                            {institutions.map(inst => (
                                <td key={inst.id} className="p-4">
                                    {inst.isVerified ? (
                                        <span className="inline-flex items-center gap-1 text-green-400 text-sm font-medium">
                                            <Check className="h-4 w-4" /> Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-zinc-500 text-sm">
                                            <Minus className="h-4 w-4" /> Uncertified
                                        </span>
                                    )}
                                </td>
                            ))}
                            {[...Array(3 - institutions.length)].map((_, i) => <td key={i} className="p-4"></td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
