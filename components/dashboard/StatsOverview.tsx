'use client';

import { Users, Eye, Star, TrendingUp, IndianRupee } from 'lucide-react';

interface StatsOverviewProps {
    totalViews: number;
    totalReviews: number;
    averageRating: number;
    inquiries: number;
}

export default function StatsOverview({ totalViews, totalReviews, averageRating, inquiries }: StatsOverviewProps) {
    const stats = [
        {
            label: 'Total Profile Views',
            value: totalViews.toLocaleString(),
            change: '+12% from last month',
            icon: Eye,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10'
        },
        {
            label: 'Average Rating',
            value: averageRating.toFixed(1),
            change: '+0.2 from last month',
            icon: Star,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500/10'
        },
        {
            label: 'Total Reviews',
            value: totalReviews,
            change: '+5 new this week',
            icon: Users,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10'
        },
        {
            label: 'Admission Inquiries',
            value: inquiries,
            change: '12 pending response',
            icon: TrendingUp,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded bg-zinc-800 text-zinc-400`}>
                            30 Days
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-sm text-zinc-500 font-medium mb-1">{stat.label}</p>
                    <p className="text-xs text-green-400">{stat.change}</p>
                </div>
            ))}
        </div>
    );
}
