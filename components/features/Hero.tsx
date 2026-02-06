'use client';

import { Search, MapPin, GraduationCap, BookOpen, Building2, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';

export default function Hero() {
    const [activeTab, setActiveTab] = useState('SCHOOL');

    return (
        <section className="relative bg-zinc-900 text-white py-20 lg:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-zinc-950">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black opacity-90"></div>
                {/* Abstract shapes/pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                    Find the Best Education <br className="hidden md:block" /> in Nepal
                </h1>
                <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10">
                    Transparent rankings, real reviews, and in-depth details for Preschools, Schools, Colleges, and Universities.
                </p>

                {/* Search Box Container */}
                <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-2xl overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('PRESCHOOL')}
                            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'PRESCHOOL' ? 'bg-white dark:bg-zinc-800 text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                        >
                            <Baby className="h-4 w-4" /> Preschools
                        </button>
                        <button
                            onClick={() => setActiveTab('SCHOOL')}
                            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'SCHOOL' ? 'bg-white dark:bg-zinc-800 text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                        >
                            <BookOpen className="h-4 w-4" /> Schools
                        </button>
                        <button
                            onClick={() => setActiveTab('COLLEGE')}
                            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'COLLEGE' ? 'bg-white dark:bg-zinc-800 text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                        >
                            <Building2 className="h-4 w-4" /> Colleges
                        </button>
                        <button
                            onClick={() => setActiveTab('UNIVERSITY')}
                            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'UNIVERSITY' ? 'bg-white dark:bg-zinc-800 text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                        >
                            <GraduationCap className="h-4 w-4" /> Universities
                        </button>
                        <button
                            onClick={() => setActiveTab('TECHNICAL_SCHOOL')}
                            className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'TECHNICAL_SCHOOL' ? 'bg-white dark:bg-zinc-800 text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-zinc-700'}`}
                        >
                            <Building2 className="h-4 w-4" /> Technical
                        </button>
                    </div>

                    {/* Search Inputs */}
                    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4 bg-white dark:bg-zinc-800">
                        <div className="flex-1 flex items-center px-4 py-3 bg-zinc-50 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-700 focus-within:border-blue-500 transition-colors">
                            <Search className="h-5 w-5 text-zinc-400 mr-3" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab.toLowerCase()} by name...`}
                                className="bg-transparent border-none outline-none w-full text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 py-3 bg-zinc-50 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-700 focus-within:border-blue-500 transition-colors">
                            <MapPin className="h-5 w-5 text-zinc-400 mr-3" />
                            <input
                                type="text"
                                placeholder="City or Area (e.g. Kathmandu)"
                                className="bg-transparent border-none outline-none w-full text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
                            />
                        </div>
                        <Link href={`/search?type=${activeTab}`}>
                            <Button size="lg" className="w-full md:w-auto px-8 bg-blue-600 hover:bg-blue-700 text-white">
                                Search
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Popular Tags */}
                <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-zinc-400">
                    <span>Popular:</span>
                    <Link href="/search?q=engineering" className="hover:text-white underline decoration-dotted">Engineering</Link>
                    <Link href="/search?q=medical" className="hover:text-white underline decoration-dotted">Medical</Link>
                    <Link href="/search?q=montessori" className="hover:text-white underline decoration-dotted">Montessori</Link>
                    <Link href="/search?q=alevel" className="hover:text-white underline decoration-dotted">A-Levels</Link>
                    <Link href="/search?q=ib" className="hover:text-white underline decoration-dotted">IB Board</Link>
                </div>
            </div>
        </section>
    );
}
