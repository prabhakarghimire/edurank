'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Users, Building2, CheckCircle, XCircle, LayoutDashboard, LogOut } from 'lucide-react';
import StatsOverview from '@/components/dashboard/StatsOverview';
import Link from 'next/link';
import ClaimsList from '@/components/admin/ClaimsList';

export default function SuperAdminDashboard() {
    const [activeTab, setActiveTab] = useState('claims');

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <div className="flex flex-1 container mx-auto px-4 py-8 gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                    <div className="flex items-center gap-3 px-4 py-3 bg-red-900/20 rounded-xl border border-red-900/50">
                        <Shield className="h-8 w-8 text-red-500" />
                        <div>
                            <div className="font-bold text-sm">Super Admin</div>
                            <div className="text-xs text-zinc-500">EduRank Control</div>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${activeTab === 'overview' ? 'bg-red-600/10 text-red-500' : 'text-zinc-400 hover:text-white'}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <LayoutDashboard className="h-4 w-4 mr-3" /> Overview
                        </Button>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${activeTab === 'claims' ? 'bg-red-600/10 text-red-500' : 'text-zinc-400 hover:text-white'}`}
                            onClick={() => setActiveTab('claims')}
                        >
                            <CheckCircle className="h-4 w-4 mr-3" /> Pending Signups
                        </Button>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${activeTab === 'users' ? 'bg-red-600/10 text-red-500' : 'text-zinc-400 hover:text-white'}`}
                            onClick={() => setActiveTab('users')}
                        >
                            <Users className="h-4 w-4 mr-3" /> Users
                        </Button>
                    </nav>

                    <div className="pt-8 border-t border-zinc-800">
                        <Link href="/">
                            <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/10">
                                <LogOut className="h-4 w-4 mr-3" /> Sign Out
                            </Button>
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold capitalize mb-1">{activeTab === 'claims' ? 'Pending Signups' : activeTab}</h1>
                        <p className="text-zinc-500">Manage platform activity and approve new institutions.</p>
                    </div>

                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Building2 className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">+12%</span>
                                    </div>
                                    <div className="text-3xl font-bold mb-1">1,240</div>
                                    <div className="text-sm text-zinc-500">Total Institutions</div>
                                </div>
                                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                                            <CheckCircle className="h-6 w-6 text-yellow-500" />
                                        </div>
                                        <span className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">5 Pending</span>
                                    </div>
                                    <div className="text-3xl font-bold mb-1">85</div>
                                    <div className="text-sm text-zinc-500">Signups this month</div>
                                </div>
                                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                            <Users className="h-6 w-6 text-purple-500" />
                                        </div>
                                        <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">+24%</span>
                                    </div>
                                    <div className="text-3xl font-bold mb-1">45.2k</div>
                                    <div className="text-sm text-zinc-500">Total Users</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'claims' && (
                        <ClaimsList />
                    )}

                    {activeTab === 'users' && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
                            <Users className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">User Management</h3>
                            <p className="text-zinc-500 mb-6">Search and manage student and parent accounts.</p>
                            <Button disabled>Coming Soon</Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
