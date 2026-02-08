'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo, Suspense } from 'react';
import InstitutionCard from '@/components/features/InstitutionCard';
import { Institution } from '@/lib/data';
import { Search, SlidersHorizontal, ArrowUpDown, Filter, Trophy, Loader2, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Data State
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter State
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [selectedType, setSelectedType] = useState<string>(searchParams.get('type') || 'ALL');
    const [selectedCity, setSelectedCity] = useState<string>('ALL');
    const [feeRange, setFeeRange] = useState([0, searchParams.get('maxFee') ? parseInt(searchParams.get('maxFee')!) : 100000]);
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>(searchParams.get('dest') ? [searchParams.get('dest')!] : []);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedBoards, setSelectedBoards] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('score_desc');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Options
    const LOCATIONS = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan'];
    const DESTINATIONS = ['Australia', 'USA', 'UK', 'Canada', 'Japan', 'South Korea', 'Europe'];
    const BOARDS = ['NEB', 'Cambridge', 'IB', 'CBSE', 'TU', 'PU', 'KU'];
    const FEATURES = ['Transport', 'Hostel', 'Swimming Pool', 'Labs', 'Cafeteria', 'Football Ground', 'AC Classrooms'];
    const CONSULTANCY_SERVICES = ['Visa Guidance', 'SOP Writing', 'Interview Prep', 'Scholarship Help', 'PTE', 'IELTS'];

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/institutions');
                const data = await res.json();
                setInstitutions(data);
            } catch (error) {
                console.error('Failed to fetch institutions:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const isConsultancy = selectedType === 'CONSULTANCY';
    const isSchool = selectedType === 'SCHOOL' || selectedType === 'COLLEGE' || selectedType === 'PRESCHOOL';

    // Filtering Logic
    const filteredInstitutions = useMemo(() => {
        let result = [...institutions];

        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            result = result.filter(i =>
                i.name.toLowerCase().includes(lowerQ) ||
                i.city.toLowerCase().includes(lowerQ) ||
                i.features.some(f => f.toLowerCase().includes(lowerQ))
            );
        }

        if (selectedType && selectedType !== 'ALL') {
            result = result.filter(i => i.type === selectedType);
        }

        if (selectedCity && selectedCity !== 'ALL') {
            result = result.filter(i => i.city === selectedCity);
        }

        if (isSchool) {
            result = result.filter(i => i.fees <= feeRange[1]);
        }

        if (isConsultancy && selectedDestinations.length > 0) {
            result = result.filter(i =>
                i.destinations && selectedDestinations.some(d => i.destinations?.includes(d))
            );
        }

        if (isSchool && selectedBoards.length > 0) {
            result = result.filter(i =>
                i.affiliation && selectedBoards.some(b => i.affiliation?.includes(b))
            );
        }

        if (selectedFeatures.length > 0) {
            result = result.filter(i =>
                selectedFeatures.every(f => (i.features || []).includes(f) || (i.services || []).includes(f))
            );
        }

        return result.sort((a, b) => {
            const scoreA = a.eduRankScore || 0;
            const scoreB = b.eduRankScore || 0;

            switch (sortBy) {
                case 'score_desc': return scoreB - scoreA;
                case 'reviews_desc': return b.reviews - a.reviews;
                case 'fee_asc': return a.fees - b.fees;
                case 'fee_desc': return b.fees - a.fees;
                default: return scoreB - scoreA;
            }
        });
    }, [institutions, searchQuery, selectedType, selectedCity, feeRange, selectedDestinations, selectedFeatures, selectedBoards, sortBy, isConsultancy, isSchool]);

    const toggleDestination = (dest: string) => {
        setSelectedDestinations(prev =>
            prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
        );
    };

    const toggleFeature = (feat: string) => {
        setSelectedFeatures(prev =>
            prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]
        );
    };

    const toggleBoard = (board: string) => {
        setSelectedBoards(prev =>
            prev.includes(board) ? prev.filter(b => b !== board) : [...prev, board]
        );
    };

    const clearFilters = () => {
        setSelectedDestinations([]);
        setSelectedFeatures([]);
        setSelectedBoards([]);
        setSelectedCity('ALL');
        setFeeRange([0, 100000]);
        setSearchQuery('');
        router.push('/search');
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20 pt-16">
            <div className="bg-background border-b border-border shadow-lg">
                <div className="container mx-auto px-4 lg:px-6 py-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search by name, location, or facility..."
                                    className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-white placeholder:text-zinc-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                variant="outline"
                                className="lg:hidden border-border bg-background"
                                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {['ALL', 'PRESCHOOL', 'SCHOOL', 'COLLEGE', 'CONSULTANCY', 'TRAINING_CENTER'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${selectedType === type
                                        ? 'bg-primary text-primary-foreground border-primary'
                                        : 'bg-muted text-muted-foreground border-border hover:bg-accent hover:border-accent-foreground'
                                        }`}
                                >
                                    {type.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-6 py-8 flex gap-8">
                <aside className={`w-72 flex-shrink-0 relative lg:static z-40 bg-background lg:bg-transparent transition-transform duration-300 ${isMobileFiltersOpen ? 'translate-x-0 fixed inset-0 p-6 overflow-y-auto' : '-translate-x-full lg:translate-x-0'}`}>
                    <div className="space-y-8 h-fit">
                        <div className="lg:hidden flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <Button variant="ghost" onClick={() => setIsMobileFiltersOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* active filters */}
                        {(selectedDestinations.length > 0 || selectedFeatures.length > 0 || selectedCity !== 'ALL') && (
                            <div className="flex flex-wrap gap-2 pb-6 border-b border-border">
                                <Button variant="link" className="text-xs text-blue-500 p-0 h-auto" onClick={clearFilters}>Clear All</Button>
                            </div>
                        )}

                        {/* Locality Filter */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Locality
                            </h3>
                            <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger className="w-full bg-muted border-border text-sm h-10">
                                    <SelectValue placeholder="All Cities" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border-border">
                                    <SelectItem value="ALL">All Cities</SelectItem>
                                    {LOCATIONS.map(city => (
                                        <SelectItem key={city} value={city}>{city}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {isConsultancy && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Destinations</h3>
                                <div className="space-y-2">
                                    {DESTINATIONS.map(dest => (
                                        <div key={dest} className="flex items-center space-x-2">
                                            <Checkbox id={dest} checked={selectedDestinations.includes(dest)} onCheckedChange={() => toggleDestination(dest)} />
                                            <label htmlFor={dest} className="text-sm text-foreground/70 leading-none cursor-pointer">
                                                {dest}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isSchool && (
                            <>
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Boards</h3>
                                    <div className="space-y-2">
                                        {BOARDS.map(board => (
                                            <div key={board} className="flex items-center space-x-2">
                                                <Checkbox id={board} checked={selectedBoards.includes(board)} onCheckedChange={() => toggleBoard(board)} />
                                                <label htmlFor={board} className="text-sm text-foreground/70 leading-none cursor-pointer">
                                                    {board}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 border-t border-border pt-6">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Monthly Fee</h3>
                                        <span className="text-xs text-blue-500 font-bold">{feeRange[1].toLocaleString()}</span>
                                    </div>
                                    <Slider
                                        defaultValue={[100000]}
                                        max={100000}
                                        step={1000}
                                        value={[feeRange[1]]}
                                        onValueChange={(val) => setFeeRange([0, val[0]])}
                                        className="py-4"
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-4 border-t border-border pt-6">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{isConsultancy ? 'Services' : 'Facilities'}</h3>
                            <div className="space-y-2">
                                {(isConsultancy ? CONSULTANCY_SERVICES : FEATURES).map(feat => (
                                    <div key={feat} className="flex items-center space-x-2">
                                        <Checkbox id={feat} checked={selectedFeatures.includes(feat)} onCheckedChange={() => toggleFeature(feat)} />
                                        <label htmlFor={feat} className="text-sm text-foreground/70 leading-none cursor-pointer">
                                            {feat}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            {isLoading ? "Finding your matches..." : (
                                filteredInstitutions.length > 0 ? (
                                    <>Top matches <Badge variant="outline" className="ml-2 border-primary/50 text-foreground">{filteredInstitutions.length}</Badge></>
                                ) : "No matches found"
                            )}
                        </h1>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Sort by:</span>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[180px] bg-muted border-border text-sm h-9">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover border-border">
                                    <SelectItem value="score_desc">EduRank Score</SelectItem>
                                    <SelectItem value="reviews_desc">Most Reviewed</SelectItem>
                                    {isSchool && (
                                        <>
                                            <SelectItem value="fee_asc">Fees: Low to High</SelectItem>
                                            <SelectItem value="fee_desc">Fees: High to Low</SelectItem>
                                        </>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {isLoading ? (
                            <div className="col-span-full py-20 text-center">
                                <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto mb-4" />
                            </div>
                        ) : (
                            <AnimatePresence mode="popLayout" initial={false}>
                                {filteredInstitutions.map((inst, index) => (
                                    <motion.div
                                        key={inst.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <InstitutionCard
                                            institution={inst}
                                            rank={index === 0 && sortBy === 'score_desc' ? 1 : undefined}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                        {!isLoading && filteredInstitutions.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-muted/40 rounded-xl border border-dashed border-border">
                                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium">No matches found</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto mt-2">Try adjusting your filters.</p>
                                <Button onClick={clearFilters} variant="outline" className="mt-6 border-border">
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading EduRank Marketplace...</div>}>
            <SearchContent />
        </Suspense>
    );
}
