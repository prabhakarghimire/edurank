'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle } from 'lucide-react';

interface InquiryFormProps {
    institutionId: string;
    institutionName: string;
    title?: string;
}

export default function InquiryForm({ institutionId, institutionName, title }: InquiryFormProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-zinc-900 border border-green-900/50 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Inquiry Sent!</h3>
                <p className="text-zinc-400 mb-4">
                    Your admission inquiry has been sent to <strong>{institutionName}</strong>. Their admissions team will contact you shortly.
                </p>
                <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="border-zinc-700 hover:bg-zinc-800"
                >
                    Send Another Inquiry
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Send className="h-5 w-5 text-blue-500" /> {title || 'Admission Inquiry'}
            </h3>
            <p className="text-sm text-zinc-400 mb-6">
                Interested in this institution? Send an inquiry directly to their admissions office.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-medium text-zinc-300">Student Name</label>
                        <Input
                            id="name"
                            required
                            placeholder="John Doe"
                            className="bg-zinc-950 border-zinc-800 focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-xs font-medium text-zinc-300">Phone</label>
                        <Input
                            id="phone"
                            required
                            type="tel"
                            placeholder="9800000000"
                            className="bg-zinc-950 border-zinc-800 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-medium text-zinc-300">Email Address</label>
                    <Input
                        id="email"
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="bg-zinc-950 border-zinc-800 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="grade" className="text-xs font-medium text-zinc-300">Grade Applying For</label>
                    <Input
                        id="grade"
                        required
                        placeholder="e.g. Grade 11, Bachelor's in CS"
                        className="bg-zinc-950 border-zinc-800 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-medium text-zinc-300">Message (Optional)</label>
                    <Textarea
                        id="message"
                        placeholder="Any specific questions about fees, scholarships, or transport?"
                        className="bg-zinc-950 border-zinc-800 focus:border-blue-500 h-24 resize-none"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6"
                >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </Button>

                <p className="text-xs text-center text-zinc-500">
                    Your contact details will be shared with the institution.
                </p>
            </form>
        </div>
    );
}
