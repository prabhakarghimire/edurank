'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Institution } from '@/lib/data';
import { Check, AlertCircle, Lock } from 'lucide-react';

interface EditProfileFormProps {
    institution: Institution;
}

export default function EditProfileForm({ institution }: EditProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Initial state matching the institution data
    const [formData, setFormData] = useState({
        description: institution.description || '',
        foundedYear: institution.foundedYear || '',
        phone: institution.phone || '',
        email: institution.email || '',
        website: institution.website || '',
        address: institution.address || '',
        city: institution.city || '',
        studentTeacherRatio: institution.studentTeacherRatio || '',
        mediumOfInstruction: institution.mediumOfInstruction || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsSaved(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 text-left max-w-4xl mx-auto">

            {/* Header / Notice */}
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-200">
                    <p className="font-semibold mb-1">Restricted Editing</p>
                    <p>To ensure data integrity, you can only edit basic information, facilities, and contact details.
                        <strong> Fees, Ratings, and Reviews</strong> are managed by EduRank admins to maintain transparency.
                        Contact support to request changes to sensitive data.</p>
                </div>
            </div>

            {/* Basic Info */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 border-b border-zinc-800 pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Description / Bio</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="bg-zinc-950 border-zinc-800 h-32"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Founded Year</label>
                        <Input
                            name="foundedYear"
                            type="number"
                            value={formData.foundedYear}
                            onChange={handleChange}
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>
                    {/* Read Only Fields */}
                    <div className="space-y-2 opacity-60">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            Institution Type <Lock className="h-3 w-3" />
                        </label>
                        <Input disabled value={institution.type} className="bg-zinc-900 border-zinc-800" />
                    </div>
                </div>
            </div>

            {/* Contact Details */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 border-b border-zinc-800 pb-2">Contact & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Official Email</label>
                        <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Phone Number</label>
                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Website</label>
                        <Input
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Address</label>
                        <Input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>
                </div>
            </div>

            {/* Academics */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 border-b border-zinc-800 pb-2">Academics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Student/Teacher Ratio</label>
                        <Input
                            name="studentTeacherRatio"
                            value={formData.studentTeacherRatio}
                            onChange={handleChange}
                            placeholder="e.g. 20 (for 1:20)"
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Medium of Instruction</label>
                        <Input
                            name="mediumOfInstruction"
                            value={formData.mediumOfInstruction}
                            onChange={handleChange}
                            placeholder="e.g. English"
                            className="bg-zinc-950 border-zinc-800"
                        />
                    </div>
                    <div className="md:col-span-2 p-4 bg-zinc-950 rounded border border-zinc-800 opacity-60">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold text-zinc-300">Detailed Fees Structure <Lock className="h-3 w-3 inline ml-1" /></h4>
                                <p className="text-xs text-zinc-500">Contact admin to update fee details.</p>
                            </div>
                            <Button variant="outline" size="sm" disabled>Request Update</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Bar */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-800">
                {isSaved && <span className="text-green-500 text-sm flex items-center gap-1"><Check className="h-4 w-4" /> Changes Saved</span>}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 w-32"
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
}
