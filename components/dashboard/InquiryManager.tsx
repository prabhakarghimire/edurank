'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Search, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

type InquiryStatus = 'PENDING' | 'CONTACTED' | 'RESOLVED';

interface Inquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    grade: string;
    message?: string;
    date: string;
    status: InquiryStatus;
}

export default function InquiryManager() {
    // Mock Data
    const [inquiries, setInquiries] = useState<Inquiry[]>([
        {
            id: 101,
            name: 'Aarav Sharma',
            email: 'aarav.sharma@example.com',
            phone: '9841234567',
            grade: 'Grade 11 (Science)',
            date: '2024-05-10',
            status: 'PENDING',
            message: 'I would like to know about the scholarship criteria for merit students.'
        },
        {
            id: 102,
            name: 'Sita Poudel',
            email: 'sita.p@example.com',
            phone: '9801234567',
            grade: 'BBA Program',
            date: '2024-05-09',
            status: 'CONTACTED',
            message: 'Is there an entrance exam for BBA?'
        },
        {
            id: 103,
            name: 'Hari Krishna',
            email: 'hari.k@example.com',
            phone: '9812345678',
            grade: 'Grade 10',
            date: '2024-05-08',
            status: 'RESOLVED',
            message: 'Do you offer transport facilities from Bhaktapur?'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const handleStatusChange = (id: number, newStatus: InquiryStatus) => {
        setInquiries(prev => prev.map(inq =>
            inq.id === id ? { ...inq, status: newStatus } : inq
        ));
    };

    const filteredInquiries = inquiries.filter(inq =>
        inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.grade.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: InquiryStatus) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            case 'CONTACTED': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
            case 'RESOLVED': return 'bg-green-500/20 text-green-400 border-green-500/50';
            default: return 'bg-zinc-800 text-zinc-400';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search by name, email or grade..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 bg-zinc-900 border-zinc-700"
                    />
                </div>
                <div className="flex gap-2 text-sm text-zinc-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Pending</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Contacted</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Resolved</span>
                </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                {filteredInquiries.length > 0 ? (
                    <div className="divide-y divide-zinc-800">
                        {filteredInquiries.map((inq) => (
                            <div key={inq.id} className="p-6 transition-colors hover:bg-zinc-800/30">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-lg">{inq.name}</h3>
                                            <Badge variant="outline" className={getStatusColor(inq.status)}>
                                                {inq.status}
                                            </Badge>
                                        </div>
                                        <p className="text-zinc-400 text-sm">Asking for: <span className="text-zinc-200 font-medium">{inq.grade}</span></p>
                                    </div>
                                    <div className="text-right text-xs text-zinc-500 flex flex-col items-end">
                                        <span className="flex items-center gap-1 mb-1"><Clock className="h-3 w-3" /> {inq.date}</span>
                                        <div className="flex gap-3 mt-1">
                                            <a href={`mailto:${inq.email}`} className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                                                <Mail className="h-3 w-3" /> {inq.email}
                                            </a>
                                            <a href={`tel:${inq.phone}`} className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                                                <Phone className="h-3 w-3" /> {inq.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {inq.message && (
                                    <div className="bg-zinc-950/50 p-4 rounded-lg text-sm text-zinc-300 mb-4 border border-zinc-800/50">
                                        "{inq.message}"
                                    </div>
                                )}

                                <div className="flex gap-2 justify-end">
                                    {inq.status === 'PENDING' && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-blue-900 text-blue-400 hover:bg-blue-900/20"
                                            onClick={() => handleStatusChange(inq.id, 'CONTACTED')}
                                        >
                                            Mark as Contacted
                                        </Button>
                                    )}
                                    {inq.status !== 'RESOLVED' && (
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 text-white"
                                            onClick={() => handleStatusChange(inq.id, 'RESOLVED')}
                                        >
                                            <CheckCircle className="h-4 w-4 mr-1" /> Mark Resolved
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-zinc-500">
                        No inquiries found.
                    </div>
                )}
            </div>
        </div>
    );
}
