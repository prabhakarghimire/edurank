'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo, Suspense } from 'react';
import InstitutionCard from '@/components/features/InstitutionCard';
import { Institution } from '@/lib/data';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { calculateMatchScore, defaultFilters, FilterState, sortInstitutions } from '@/lib/ranking';

// Augmented type for display
interface ScoredInstitution extends Institution {
    matchScore: number;
}

function SearchContent() {
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type');
    const queryParam = searchParams.get('q') || '';

    const [allInstitutions, setAllInstitutions] = useState<Institution[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [filters, setFilters] = useState<FilterState & { destinations: string[], programs: string[] }>({
        ...defaultFilters,
        query: queryParam,
        type: typeParam || null,
        minBudget: 0,
        maxBudget: 1000000,
        destinations: [],
        programs: []
    });

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch('/api/institutions'); // Mock API
                const data = await res.json();
                setAllInstitutions(data);
            } catch (error) {
                console.error("Failed to fetch institutions", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Sync URL params
    useEffect(() => {
        setFilters(prev => ({ ...prev, type: typeParam || null, query: queryParam }));
    }, [typeParam, queryParam]);

    // Derived Logic: Score & Sort
    const processedInstitutions = useMemo(() => {
        if (!allInstitutions.length) return [];

        let result = allInstitutions.map(inst => ({
            ...inst,
            matchScore: calculateMatchScore(inst, filters)
        }));

        // Filter by strict criteria (hard filters)
        result = result.filter(inst => {
            const matchesSearch = !filters.query || inst.name.toLowerCase().includes(filters.query.toLowerCase());
            const matchesType = !filters.type || filters.type === 'ALL' || inst.type === filters.type;
            const matchesCity = !filters.city || inst.city.toLowerCase().includes(filters.city.toLowerCase());

            // Note: Budget is often soft-filtered by score, but user asks for a filter. 
            // In smart ranking, usually we just rank, but let's do soft strictness or just rely on ranking.
            // For now, let's keep it strictly comprehensive: show everything, but score heavily.
            // OR strict filter? User requirement says "Filters: Budget".
            // Let's strict filter if maxBudget < 1000000 (default max)
            const annualFees = inst.feeDetails?.annual || inst.fees;
            const matchesBudget = annualFees >= filters.minBudget && annualFees <= filters.maxBudget;

            // New Filters
            const matchesDestinations = filters.destinations.length === 0 ||
                (inst.destinations && filters.destinations.some(d => inst.destinations?.includes(d)));

            const matchesPrograms = filters.programs.length === 0 ||
                (inst.programs && filters.programs.some(p => inst.programs?.includes(p)));

            // Facilities & Affiliation
            const matchesFacilities = filters.facilities.length === 0 ||
                filters.facilities.every(f => inst.features.includes(f));

            const matchesAffiliation = filters.affiliation.length === 0 ||
                (inst.affiliation && filters.affiliation.some(a => inst.affiliation?.includes(a)));


            return matchesSearch && matchesType && matchesCity && matchesBudget && matchesDestinations && matchesPrograms && matchesFacilities && matchesAffiliation;
        });

        // Sort by Match Score descending, then by Tier
        return result.sort((a, b) => {
            // Tier Logic: Premium first is handled by score? Or explicit?
            // "Search: Weighted sorting to show Premium first."
            if (a.tier === 'PREMIUM' && b.tier !== 'PREMIUM') return -1;
            if (a.tier !== 'PREMIUM' && b.tier === 'PREMIUM') return 1;

            return b.matchScore - a.matchScore;
        });
    }, [allInstitutions, filters]);

    const handleFilterToggle = (key: 'facilities' | 'affiliation' | 'destinations' | 'programs', value: string) => {
        setFilters(prev => {
            // @ts-ignore
            const list = prev[key] as string[];
            const exists = list.includes(value);
            return {
                ...prev,
                [key]: exists ? list.filter(item => item !== value) : [...list, value]
            };
        });
    };

    const FACILITIES_LIST = ['Library', 'Labs', 'Sports', 'Transport', 'Cafeteria', 'Hostel', 'Swimming Pool', 'Visa Guidance', 'Job Placement'];
    const AFFILIATIONS_LIST = ['NEB', 'TU', 'KU', 'PU', 'Foreign'];

    // Dynamic lists based on available data? Or hardcoded top ones?
    // Let's hardcode popular ones for now for better UX, or derive? Deriving is better but let's stick to simple first.
    const DESTINATIONS_LIST = ['USA', 'Australia', 'UK', 'Canada', 'Japan', 'South Korea', 'New Zealand'];
    const PROGRAMS_LIST = ['IELTS', 'PTE', 'SAT', 'TOEFL', 'Python', 'Java', 'Web Design', 'Digital Marketing'];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <div className="bg-zinc-900/50 sticky top-16 z-30 backdrop-blur-md border-b border-zinc-800">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        {loading ? 'Searching...' : `${processedInstitutions.length} Results`}
                        {filters.city && <span className="text-zinc-500 font-normal text-sm">in {filters.city}</span>}
                    </h1>

                    <div className="flex w-full md:w-auto gap-2">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Refine search..."
                                className="w-full bg-black border border-zinc-700 rounded-md py-2 pl-10 pr-4 text-sm focus:border-blue-500 outline-none"
                                value={filters.query}
                                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="md:hidden border-zinc-700"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 flex gap-8 relative items-start">

                {/* Sidebar Filters (Desktop) */}
                <aside className={`w-80 flex-shrink-0 space-y-8 absolute md:relative z-40 bg-black md:bg-transparent p-6 md:p-0 min-h-screen md:min-h-0 border-r md:border-r-0 border-zinc-800 transition-transform duration-300 ${isMobileFiltersOpen ? 'translate-x-0 left-0 top-0' : '-translate-x-full md:translate-x-0'}`}>
                    <div className="flex items-center justify-between md:hidden mb-6">
                        <h2 className="text-lg font-bold">Filters</h2>
                        <Button variant="ghost" size="sm" onClick={() => setIsMobileFiltersOpen(false)}>Close</Button>
                    </div>

                    {/* Programs/Courses Filter (Important for Consultancies/Training) */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-zinc-300">Courses / Tests</h3>
                        <div className="space-y-2">
                            {PROGRAMS_LIST.map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Checkbox
                                        id={`prog-${item}`}
                                        checked={filters.programs.includes(item)}
                                        onCheckedChange={() => handleFilterToggle('programs', item)}
                                    />
                                    <label htmlFor={`prog-${item}`} className="text-sm text-zinc-400 cursor-pointer select-none">
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    {/* Destinations Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-zinc-300">Destinations</h3>
                        <div className="space-y-2">
                            {DESTINATIONS_LIST.map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Checkbox
                                        id={`dest-${item}`}
                                        checked={filters.destinations.includes(item)}
                                        onCheckedChange={() => handleFilterToggle('destinations', item)}
                                    />
                                    <label htmlFor={`dest-${item}`} className="text-sm text-zinc-400 cursor-pointer select-none">
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    {/* Budget Filter */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-sm text-zinc-300">Budget Limit</h3>
                            <span className="text-xs text-blue-400 font-mono">
                                {filters.maxBudget >= 1000000 ? 'Any' : `Under ${filters.maxBudget.toLocaleString()}`}
                            </span>
                        </div>
                        <Slider
                            defaultValue={[1000000]}
                            max={1000000}
                            step={50000}
                            value={[filters.maxBudget]}
                            onValueChange={(val) => setFilters({ ...filters, maxBudget: val[0] })}
                        />
                        <div className="flex justify-between text-xs text-zinc-600 font-mono">
                            <span>0</span>
                            <span>10L+</span>
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    {/* Affiliation Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-zinc-300">Affiliation</h3>
                        <div className="space-y-2">
                            {AFFILIATIONS_LIST.map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Checkbox
                                        id={`aff-${item}`}
                                        checked={filters.affiliation.includes(item)}
                                        onCheckedChange={() => handleFilterToggle('affiliation', item)}
                                    />
                                    <label htmlFor={`aff-${item}`} className="text-sm text-zinc-400 cursor-pointer select-none">
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800" />

                    {/* Facilities Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-sm text-zinc-300">Facilities / Services</h3>
                        <div className="space-y-2">
                            {FACILITIES_LIST.map((item) => (
                                <div key={item} className="flex items-center gap-2">
                                    <Checkbox
                                        id={`fac-${item}`}
                                        checked={filters.facilities.includes(item)}
                                        onCheckedChange={() => handleFilterToggle('facilities', item)}
                                    />
                                    <label htmlFor={`fac-${item}`} className="text-sm text-zinc-400 cursor-pointer select-none">
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        variant="secondary"
                        className="w-full mt-8"
                        onClick={() => setFilters({ ...defaultFilters, type: filters.type, destinations: [], programs: [] })}
                    >
                        Reset Filters
                    </Button>
                </aside>

                {/* Main Results */}
                <main className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-64 bg-zinc-900/50 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                            {processedInstitutions.map((inst) => (
                                <div key={inst.id} className="relative group">
                                    <InstitutionCard institution={inst} />
                                    {/* Match Score Badge */}
                                    <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur border border-zinc-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1">
                                        <div className={`w-2 h-2 rounded-full ${inst.matchScore > 80 ? 'bg-green-500' : inst.matchScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                        {inst.matchScore}% Match
                                    </div>

                                </div>
                            ))}
                            {processedInstitutions.length === 0 && (
                                <div className="col-span-full text-center py-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl">
                                    <p className="text-zinc-500">No institutions match your strict filters.</p>
                                    <Button variant="link" onClick={() => setFilters({ ...filters, maxBudget: 1000000, facilities: [], affiliation: [], destinations: [], programs: [] })}>
                                        Clear strict filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>

        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
