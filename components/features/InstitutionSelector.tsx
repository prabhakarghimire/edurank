'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Plus } from 'lucide-react';
import { mockInstitutions, Institution } from '@/lib/data';

interface InstitutionSelectorProps {
    onSelect: (institution: Institution) => void;
}

export default function InstitutionSelector({ onSelect }: InstitutionSelectorProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Institution[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.trim().length === 0) {
            setResults([]);
            return;
        }

        const filtered = mockInstitutions.filter(inst =>
            inst.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5); // Limit to 5 suggestions

        setResults(filtered);
        setIsOpen(true);
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = (inst: Institution) => {
        onSelect(inst);
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative z-20">
            <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search to add institution..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                />
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {results.map((inst) => (
                        <button
                            key={inst.id}
                            className="w-full text-left px-4 py-3 hover:bg-zinc-800 flex items-center justify-between group transition-colors"
                            onClick={() => handleSelect(inst)}
                        >
                            <div className="flex items-center gap-3">
                                <img src={inst.image} alt={inst.name} className="w-8 h-8 rounded object-cover" />
                                <div>
                                    <div className="font-medium text-zinc-200 group-hover:text-white">{inst.name}</div>
                                    <div className="text-xs text-zinc-500">{inst.city} • {inst.type}</div>
                                </div>
                            </div>
                            <Plus className="h-4 w-4 text-zinc-500 group-hover:text-blue-400" />
                        </button>
                    ))}
                </div>
            )}

            {isOpen && query.length > 0 && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center text-zinc-500 shadow-xl">
                    No institutions found
                </div>
            )}
        </div>
    );
}
