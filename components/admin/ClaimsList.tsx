'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Eye, FileText, Globe, Phone, Mail } from 'lucide-react';

interface ClaimRequest {
    id: string;
    institutionName: string;
    type: string;
    city: string;
    contactPerson: string;
    email: string;
    phone: string;
    submittedAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function ClaimsList() {
    const [requests, setRequests] = useState<ClaimRequest[]>([]);

    useEffect(() => {
        // Load from local storage for demo
        const localClaims = JSON.parse(localStorage.getItem('pendingClaims') || '[]');

        setRequests([
            ...localClaims,
            {
                id: 'REF-001',
                institutionName: 'Apex Life School',
                type: 'SCHOOL',
                city: 'Kathmandu',
                contactPerson: 'Ramesh Gupta',
                email: 'admin@apexlife.edu.np',
                phone: '9851022334',
                submittedAt: '2 hours ago',
                status: 'PENDING'
            },
            {
                id: 'REF-002',
                institutionName: 'Golden Gate Int\'l College',
                type: 'COLLEGE',
                city: 'Kathmandu',
                contactPerson: 'Sarita Thapa',
                email: 'info@goldengate.edu.np',
                phone: '01-4433221',
                submittedAt: '5 hours ago',
                status: 'PENDING'
            },
            {
                id: 'REF-003',
                institutionName: 'Little Stars Preschool',
                type: 'PRESCHOOL',
                city: 'Lalitpur',
                contactPerson: 'Meera Rai',
                email: 'meera@littlestars.com',
                phone: '9841556677',
                submittedAt: '1 day ago',
                status: 'REJECTED'
            }
        ]);
    }, []);

    const handleAction = (id: string, action: 'APPROVED' | 'REJECTED') => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: action } : req
        ));
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-zinc-950/50 border-b border-zinc-800">
                            <th className="p-4 font-medium text-zinc-400">Institution</th>
                            <th className="p-4 font-medium text-zinc-400">Contact Info</th>
                            <th className="p-4 font-medium text-zinc-400">Submitted</th>
                            <th className="p-4 font-medium text-zinc-400">Status</th>
                            <th className="p-4 font-medium text-zinc-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {requests.map((req) => (
                            <tr key={req.id} className="hover:bg-zinc-800/20 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-white mb-0.5">{req.institutionName}</div>
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-zinc-700 text-zinc-400">{req.type}</Badge>
                                        <span>{req.city}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-zinc-300 mb-0.5">{req.contactPerson}</div>
                                    <div className="space-y-0.5 text-xs text-zinc-500">
                                        <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {req.email}</div>
                                        <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {req.phone}</div>
                                    </div>
                                </td>
                                <td className="p-4 text-zinc-400">
                                    {req.submittedAt}
                                </td>
                                <td className="p-4">
                                    <Badge variant={req.status === 'APPROVED' ? 'default' : req.status === 'REJECTED' ? 'destructive' : 'secondary'}
                                        className={
                                            req.status === 'APPROVED' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20' :
                                                req.status === 'REJECTED' ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20'
                                        }>
                                        {req.status}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right">
                                    {req.status === 'PENDING' ? (
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                onClick={() => handleAction(req.id, 'REJECTED')} title="Reject">
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                                                onClick={() => handleAction(req.id, 'APPROVED')} title="Approve">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-zinc-600 block py-1.5">Action taken</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
