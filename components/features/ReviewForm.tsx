'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Star, Send } from 'lucide-react';

interface ReviewFormProps {
    institutionId: string;
    institutionName: string;
}

const RATING_CATEGORIES = [
    { id: 'academic', label: 'Academic Quality' },
    { id: 'teaching', label: 'Teaching Staff' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'safety', label: 'Safety & Security' },
    { id: 'extra', label: 'Extra-curricular' },
    { id: 'lifestyle', label: 'Campus Lifestyle' },
    { id: 'value', label: 'Value for Money' },
    { id: 'communication', label: 'Communication' },
    { id: 'transport', label: 'Transportation' },
    { id: 'happiness', label: 'Student Happiness' }
];

export default function ReviewForm({ institutionId, institutionName }: ReviewFormProps) {
    const [ratings, setRatings] = useState<Record<string, number>>({});
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSliderChange = (id: string, value: number[]) => {
        setRatings(prev => ({ ...prev, [id]: value[0] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const calculateAverage = () => {
        const values = Object.values(ratings);
        if (values.length === 0) return 0;
        const sum = values.reduce((a, b) => a + b, 0);
        return (sum / values.length).toFixed(1);
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Review Submitted!</h3>
                <p className="text-green-700 dark:text-green-400">
                    Thank you for reviewing <strong>{institutionName}</strong>. Your feedback helps other students and parents make informed decisions.
                </p>
                <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="mt-6 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900"
                >
                    Write Another Review
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-2">Write a Review</h2>
            <p className="text-zinc-500 mb-8">Rate <strong>{institutionName}</strong> on the following parameters (1-10).</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                {RATING_CATEGORIES.map((category) => (
                    <div key={category.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                {category.label}
                            </label>
                            <span className="text-sm font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                                {ratings[category.id] || 0}/10
                            </span>
                        </div>
                        <Slider
                            defaultValue={[0]}
                            max={10}
                            step={1}
                            className="py-2"
                            onValueChange={(val) => handleSliderChange(category.id, val)}
                        />
                    </div>
                ))}
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg mb-8 flex justify-between items-center border border-zinc-100 dark:border-zinc-800">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Overall Rating Score</span>
                <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500 fill-current" />
                    <span className="text-2xl font-bold text-zinc-900 dark:text-white">{calculateAverage()}</span>
                    <span className="text-zinc-400 text-sm">/10</span>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Detailed Review (Optional)
                </label>
                <textarea
                    className="w-full bg-white dark:bg-black border border-zinc-300 dark:border-zinc-700 rounded-md p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Share your experience regarding academics, facilities, and environment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>

            <Button
                type="submit"
                className="w-full md:w-auto px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
        </form>
    );
}
