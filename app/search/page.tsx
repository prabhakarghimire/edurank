'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo, Suspense } from 'react';
import InstitutionCard from '@/components/features/InstitutionCard';
import { Institution, mockInstitutions } from '@/lib/data';
import { Search, SlidersHorizontal, ArrowUpDown, Filter, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // URL Params
    const typeParam = searchParams.get('type') || 'ALL';
    const queryParam = searchParams.get('q') || '';
    const destParam = searchParams.get('dest') || '';
    const maxFeeParam = searchParams.get('maxFee');

    // Filter State
    const [searchQuery, setSearchQuery] = useState(queryParam);
    const [selectedType, setSelectedType] = useState<string>(typeParam);
    const [feeRange, setFeeRange] = useState([0, maxFeeParam ? parseInt(maxFeeParam) : 50000]); // Monthly fee max
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>(destParam ? [destParam] : []);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedBoards, setSelectedBoards] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('score_desc');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Update state when URL params change
    useEffect(() => {
        if (typeParam) setSelectedType(typeParam);
        if (queryParam) setSearchQuery(queryParam);
    }, [typeParam, queryParam]);

    // Derived Constants based on Type
    const isConsultancy = selectedType === 'CONSULTANCY';
    const isSchool = selectedType === 'SCHOOL' || selectedType === 'COLLEGE' || selectedType === 'PRESCHOOL';

    // Options
    const LOCATIONS = ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan'];
    const DESTINATIONS = ['Australia', 'USA', 'UK', 'Canada', 'Japan', 'South Korea', 'Europe'];
    const BOARDS = ['NEB', 'Cambridge', 'IB', 'CBSE', 'TU', 'PU', 'KU'];
    const FEATURES = ['Transport', 'Hostel', 'Swimming Pool', 'Labs', 'Cafeteria', 'Football Ground', 'AC Classrooms'];
    const CONSULTANCY_SERVICES = ['Visa Guidance', 'SOP Writing', 'Interview Prep', 'Scholarship Help', 'PTE', 'IELTS'];

    // Filtering Logic
    const filteredInstitutions = useMemo(() => {
        let result = mockInstitutions;

        // 1. Text Search
        if (searchQuery) {
            const lowerQ = searchQuery.toLowerCase();
            result = result.filter(i =>
                i.name.toLowerCase().includes(lowerQ) ||
                i.city.toLowerCase().includes(lowerQ) ||
                i.features.some(f => f.toLowerCase().includes(lowerQ))
            );
        }

        // 2. Type Filter
        if (selectedType && selectedType !== 'ALL') {
            result = result.filter(i => i.type === selectedType);
        }

        // 3. Fee Filter (Schools only mostly, or consultancies with service fees if we parsed them)
        // Assuming 'fees' in data is monthly tuition for schools
        if (isSchool) {
            result = result.filter(i => i.fees <= feeRange[1]);
        }

        // 4. Destinations (Consultancy)
        if (isConsultancy && selectedDestinations.length > 0) {
            result = result.filter(i =>
                i.destinations && selectedDestinations.some(d => i.destinations?.includes(d))
            );
        }

        // 5. Boards (Schools)
        if (isSchool && selectedBoards.length > 0) {
            result = result.filter(i =>
                i.affiliation && selectedBoards.some(b => i.affiliation?.includes(b))
            );
        }

        // 6. Features (Generic)
        if (selectedFeatures.length > 0) {
            result = result.filter(i =>
                selectedFeatures.every(f => i.features.includes(f) || i.services?.includes(f))
            );
        }

        // Sorting
        return result.sort((a, b) => {
            const scoreA = a.eduRankScore || 0;
            const scoreB = b.eduRankScore || 0;

            switch (sortBy) {
                case 'score_desc':
                    return scoreB - scoreA;
                case 'reviews_desc':
                    return b.reviews - a.reviews;
                case 'fee_asc':
                    return a.fees - b.fees;
                case 'fee_desc':
                    return b.fees - a.fees;
                default:
                    return scoreB - scoreA;
            }
        });
    }, [searchQuery, selectedType, feeRange, selectedDestinations, selectedFeatures, selectedBoards, sortBy, isConsultancy, isSchool]);

    // Handlers
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
        setFeeRange([0, 50000]);
        setSearchQuery('');
        router.push('/search'); // Clear URL params
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pb-20 pt-16">
            {/* Header / Top Bar */}
            <div className="bg-zinc-950 border-b border-zinc-800 sticky top-16 z-40 shadow-lg">
                <div className="container mx-auto px-4 lg:px-6 py-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name, location, or facility..."
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                variant="outline"
                                className="lg:hidden border-zinc-800 bg-zinc-900"
                                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            >
                                <Filter className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        </div>

                        {/* Type Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {['ALL', 'PRESCHOOL', 'SCHOOL', 'COLLEGE', 'CONSULTANCY', 'TRAINING_CENTER'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${selectedType === type
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
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
                {/* Sidebar (Desktop) */}
                <aside className={`w-72 flex-shrink-0 space-y-8 absolute lg:static z-40 bg-zinc-950 lg:bg-transparent p-6 lg:p-0 lg:pt-4 inset-0 h-screen lg:h-auto overflow-y-auto lg:overflow-visible transition-transform duration-300 border-r border-zinc-800 lg:border-none ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <Button variant="ghost" onClick={() => setIsMobileFiltersOpen(false)}>Close</Button>
                    </div>

                    {/* Active Filters Summary */}
                    {(selectedDestinations.length > 0 || selectedFeatures.length > 0) && (
                        <div className="flex flex-wrap gap-2 pb-6 border-b border-zinc-900">
                            {[...selectedDestinations, ...selectedFeatures, ...selectedBoards].map(f => (
                                <Badge key={f} variant="secondary" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 gap-1 pl-2 border border-zinc-800">
                                    {f} <span className="cursor-pointer font-bold text-zinc-500 hover:text-white" onClick={() => { toggleDestination(f); toggleFeature(f); toggleBoard(f); }}>×</span>
                                </Badge>
                            ))}
                            <Button variant="link" className="text-xs text-blue-400 p-0 h-auto" onClick={clearFilters}>Clear All</Button>
                        </div>
                    )}

                    {/* Consultancy Filters */}
                    {isConsultancy && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Destinations</h3>
                            <div className="space-y-2">
                                {DESTINATIONS.map(dest => (
                                    <div key={dest} className="flex items-center space-x-2">
                                        <Checkbox id={dest} checked={selectedDestinations.includes(dest)} onCheckedChange={() => toggleDestination(dest)} />
                                        <label htmlFor={dest} className="text-sm text-zinc-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                            {dest}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* School Filters */}
                    {isSchool && (
                        <>
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Boards / Affiliation</h3>
                                <div className="space-y-2">
                                    {BOARDS.map(board => (
                                        <div key={board} className="flex items-center space-x-2">
                                            <Checkbox id={board} checked={selectedBoards.includes(board)} onCheckedChange={() => toggleBoard(board)} />
                                            <label htmlFor={board} className="text-sm text-zinc-400 leading-none cursor-pointer">
                                                {board}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-zinc-900 pt-6">
                                <div className="flex justify-between">
                                    <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Monthly Fee</h3>
                                    <span className="text-xs text-blue-400">Max: {feeRange[1].toLocaleString()}</span>
                                </div>
                                <Slider
                                    defaultValue={[50000]}
                                    max={100000}
                                    step={1000}
                                    value={[feeRange[1]]}
                                    onValueChange={(val) => setFeeRange([0, val[0]])}
                                    className="py-4"
                                />
                            </div>
                        </>
                    )}

                    {/* Generic Filters */}
                    <div className="space-y-4 border-t border-zinc-900 pt-6">
                        <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">{isConsultancy ? 'Services' : 'Facilities'}</h3>
                        <div className="space-y-2">
                            {(isConsultancy ? CONSULTANCY_SERVICES : FEATURES).map(feat => (
                                <div key={feat} className="flex items-center space-x-2">
                                    <Checkbox id={feat} checked={selectedFeatures.includes(feat)} onCheckedChange={() => toggleFeature(feat)} />
                                    <label htmlFor={feat} className="text-sm text-zinc-400 leading-none cursor-pointer">
                                        {feat}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Results Feed */}
                <main className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            {filteredInstitutions.length > 0 ? (
                                <>Top matches for your preferences <Badge variant="outline" className="ml-2 border-blue-500/50 text-blue-400">{filteredInstitutions.length}</Badge></>
                            ) : (
                                "No matches found"
                            )}
                        </h1>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-500">Sort by:</span>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-700 text-sm h-9">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    <SelectItem value="score_desc">EduRank Score (High)</SelectItem>
                                    <SelectItem value="reviews_desc">Most Reviewed</SelectItem>
                                    <SelectItem value="fee_asc">Fees (Low to High)</SelectItem>
                                    <SelectItem value="fee_desc">Fees (High to Low)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {filteredInstitutions.map((inst) => (
                            <InstitutionCard key={inst.id} institution={inst} />
                        ))}
                        {filteredInstitutions.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-zinc-900/40 rounded-xl border border-dashed border-zinc-800">
                                <Trophy className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-zinc-300">No institutions found</h3>
                                <p className="text-zinc-500 max-w-sm mx-auto mt-2">Try adjusting your filters or search for a different keyword.</p>
                                <Button onClick={clearFilters} variant="outline" className="mt-6 border-zinc-700">
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
