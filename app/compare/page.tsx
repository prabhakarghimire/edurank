'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InstitutionSelector from '@/components/features/InstitutionSelector';
import ComparisonTable from '@/components/features/ComparisonTable';
import { Institution } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function ComparePage() {
    const [selectedInstitutions, setSelectedInstitutions] = useState<Institution[]>([]);

    const addInstitution = (institution: Institution) => {
        if (selectedInstitutions.find(i => i.id === institution.id)) return;
        if (selectedInstitutions.length >= 3) {
            alert("You can compare up to 3 institutions at a time.");
            return;
        }
        setSelectedInstitutions([...selectedInstitutions, institution]);
    };

    const removeInstitution = (id: string) => {
        setSelectedInstitutions(selectedInstitutions.filter(i => i.id !== id));
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Compare Institutions</h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Select up to 3 institutions to compare their fees, facilities, ratings, and more side-by-side.
                    </p>
                </div>

                {/* Search / Selector */}
                <div className="max-w-2xl mx-auto mb-12">
                    <InstitutionSelector onSelect={addInstitution} />
                </div>

                {/* Comparison View */}
                {selectedInstitutions.length > 0 ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                            <h2 className="text-xl font-semibold text-zinc-300">
                                Comparing {selectedInstitutions.length} Institution{selectedInstitutions.length > 1 ? 's' : ''}
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                onClick={() => setSelectedInstitutions([])}
                            >
                                <Trash2 className="h-4 w-4 mr-2" /> Clear All
                            </Button>
                        </div>

                        <ComparisonTable
                            institutions={selectedInstitutions}
                            onRemove={removeInstitution}
                        />
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
                        <div className="text-zinc-500 mb-2">No institutions selected</div>
                        <p className="text-sm text-zinc-600">Search above to add institutions to the comparison.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
