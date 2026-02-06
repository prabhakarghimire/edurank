'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming we'll use standard inputs but maybe inline for now if lazy
import { Upload, CheckCircle, Search } from 'lucide-react';
import { mockInstitutions, Institution } from '@/lib/data';

export default function ClaimForm() {
    const [step, setStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        officialEmail: '',
        contactPerson: '',
        phone: '',
        position: '',
        // For new registrations
        newInstitutionName: '',
        newInstitutionCity: '',
        newInstitutionType: 'SCHOOL'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter institutions for search
    const filteredInstitutions = searchQuery.length > 2
        ? mockInstitutions.filter(inst => inst.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    const handleClaim = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create mock claim object
        const newClaim = {
            id: `REF-${Math.floor(Math.random() * 10000)}`,
            institutionName: isRegistering ? formData.newInstitutionName : selectedInstitution?.name,
            type: isRegistering ? formData.newInstitutionType : selectedInstitution?.type,
            city: isRegistering ? formData.newInstitutionCity : selectedInstitution?.city,
            contactPerson: formData.contactPerson,
            email: formData.officialEmail,
            phone: formData.phone,
            submittedAt: 'Just now',
            status: 'PENDING'
        };

        // Save to local storage for demo purposes
        const existingClaims = JSON.parse(localStorage.getItem('pendingClaims') || '[]');
        localStorage.setItem('pendingClaims', JSON.stringify([newClaim, ...existingClaims]));

        setIsSubmitting(false);
        setStep(3); // Success
    };

    if (step === 3) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center max-w-lg mx-auto">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Claim Request Submitted</h3>
                <p className="text-green-700 dark:text-green-400 mb-6">
                    We have received your request to {isRegistering ? 'register' : 'claim'} <strong>{isRegistering ? formData.newInstitutionName : selectedInstitution?.name}</strong>.
                    Our verification team will contact you at <strong>{formData.officialEmail}</strong> within 24-48 hours.
                </p>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.location.href = '/institution/dashboard'}>
                    Go to Dashboard (Demo)
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-10 shadow-xl">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 text-sm font-medium text-zinc-500">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-500' : ''}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-zinc-600'}`}>1</span>
                    Select Institution
                </div>
                <div className="h-px bg-zinc-700 flex-1 mx-4"></div>
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-500' : ''}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-zinc-600'}`}>2</span>
                    Create Profile
                </div>
            </div>

            {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Find your Institution</h2>
                        <p className="text-zinc-500">Search for the school or college you represent.</p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
                        <input
                            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="Enter institution name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {filteredInstitutions.map(inst => (
                            <button
                                key={inst.id}
                                className="w-full text-left p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-500 transition-all flex items-center gap-4"
                                onClick={() => {
                                    setSelectedInstitution(inst);
                                    setStep(2);
                                }}
                            >
                                <img src={inst.image} alt={inst.name} className="w-10 h-10 rounded object-cover" />
                                <div>
                                    <div className="font-semibold">{inst.name}</div>
                                    <div className="text-xs text-zinc-500">{inst.city} • {inst.type}</div>
                                </div>
                            </button>
                        ))}
                        {searchQuery.length > 2 && filteredInstitutions.length === 0 && (
                            <div className="text-center py-8 text-zinc-500">
                                No institution found. <button type="button" onClick={() => { setIsRegistering(true); setStep(2); }} className="text-blue-500 hover:underline">Add a new listing?</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {step === 2 && (selectedInstitution || isRegistering) && (
                <form onSubmit={handleClaim} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

                    {/* Header based on mode */}
                    {!isRegistering ? (
                        <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/50 mb-6">
                            <img src={selectedInstitution?.image} alt={selectedInstitution?.name} className="w-12 h-12 rounded object-cover" />
                            <div>
                                <div className="text-sm text-zinc-500">Claiming profile for:</div>
                                <div className="font-bold text-lg">{selectedInstitution?.name}</div>
                            </div>
                            <Button variant="ghost" className="ml-auto text-xs" type="button" onClick={() => setStep(1)}>Change</Button>
                        </div>
                    ) : (
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 mb-6 space-y-4">
                            <h3 className="font-bold border-b border-zinc-200 dark:border-zinc-700 pb-2">New Institution Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-medium">Institution Name</label>
                                    <input required className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-md p-2.5"
                                        value={formData.newInstitutionName} onChange={e => setFormData({ ...formData, newInstitutionName: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">City</label>
                                    <input required className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-md p-2.5"
                                        value={formData.newInstitutionCity} onChange={e => setFormData({ ...formData, newInstitutionCity: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Type</label>
                                    <select className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-md p-2.5"
                                        value={formData.newInstitutionType} onChange={e => setFormData({ ...formData, newInstitutionType: e.target.value })}>
                                        <option value="SCHOOL">School</option>
                                        <option value="COLLEGE">College</option>
                                        <option value="PRESCHOOL">Preschool</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Contact Person Name</label>
                            <input
                                required
                                className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-md p-2.5 outline-none focus:border-blue-500"
                                value={formData.contactPerson}
                                onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Job Position/Title</label>
                            <input
                                required
                                className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-md p-2.5 outline-none focus:border-blue-500"
                                placeholder="e.g. Principal, Director"
                                value={formData.position}
                                onChange={e => setFormData({ ...formData, position: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Official Email</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-md p-2.5 outline-none focus:border-blue-500"
                                placeholder="name@school.edu.np"
                                value={formData.officialEmail}
                                onChange={e => setFormData({ ...formData, officialEmail: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Official Phone</label>
                            <input
                                required
                                type="tel"
                                className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-md p-2.5 outline-none focus:border-blue-500"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>



                    <div className="pt-4 flex gap-4">
                        <Button type="button" variant="outline" className="w-full" onClick={() => { setStep(1); setIsRegistering(false); }}>Back</Button>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
