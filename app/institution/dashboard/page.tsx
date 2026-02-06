'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileEdit, MessageSquare, Settings, LogOut, Building2, ClipboardList } from 'lucide-react';
import StatsOverview from '@/components/dashboard/StatsOverview';
import EditProfileForm from '@/components/dashboard/EditProfileForm';
import InquiryManager from '@/components/dashboard/InquiryManager';
import { mockInstitutions } from '@/lib/data';
import Link from 'next/link';

import { Suspense } from 'react';

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeTab = searchParams.get('tab') || 'overview';

    const handleTabChange = (tab: string) => {
        router.push(`${pathname}?tab=${tab}`);
    };

    // Simulate logged-in institution (Tribhuvan University)
    const institution = mockInstitutions[0];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col pt-20">
            <div className="flex flex-col md:flex-row flex-1 container mx-auto px-4 py-8 gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                        <img src={institution.image} alt={institution.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                        <div className="overflow-hidden">
                            <div className="font-bold text-sm truncate">{institution.name}</div>
                            <div className="text-xs text-zinc-500 truncate">{institution.email || 'admin@tu.edu.np'}</div>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${activeTab === 'overview' ? 'bg-blue-600/10 text-blue-500' : 'text-zinc-400 hover:text-white'}`}
                            onClick={() => handleTabChange('overview')}
                        >
                            <LayoutDashboard className="h-4 w-4 mr-3" /> Overview
                        </Button>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${activeTab === 'inquiries' ? 'bg-blue-600/10 text-blue-500' : 'text-zinc-400 hover:text-white'}`}
                            onClick={() => handleTabChange('inquiries')}
                        >
                            <ClipboardList className="h-4 w-4 mr-3" /> Inquiries
                        </Button>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${activeTab === 'edit' ? 'bg-blue-600/10 text-blue-500' : 'text-zinc-400 hover:text-white'}`}
                            onClick={() => handleTabChange('edit')}
                        >
                            <FileEdit className="h-4 w-4 mr-3" /> Edit Profile
                        </Button>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${activeTab === 'reviews' ? 'bg-blue-600/10 text-blue-500' : 'text-zinc-400 hover:text-white'}`}
                            onClick={() => handleTabChange('reviews')}
                        >
                            <MessageSquare className="h-4 w-4 mr-3" /> Reviews
                        </Button>
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${activeTab === 'settings' ? 'bg-blue-600/10 text-blue-500' : 'text-zinc-400 hover:text-white'}`}
                            onClick={() => handleTabChange('settings')}
                        >
                            <Settings className="h-4 w-4 mr-3" /> Settings
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
                    <div className="mb-8 flex justify-between items-center">
                        <h1 className="text-2xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
                        {activeTab === 'overview' && (
                            <Link href={`/institution/${institution.id}`}>
                                <Button variant="outline" size="sm" className="border-zinc-700">
                                    <Building2 className="h-4 w-4 mr-2" /> View Public Page
                                </Button>
                            </Link>
                        )}
                    </div>

                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <StatsOverview
                                totalViews={12543}
                                totalReviews={institution.reviews}
                                averageRating={institution.rating}
                                inquiries={3}
                            />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                                    <h3 className="font-bold mb-4">Recent Inquiries</h3>
                                    <div className="space-y-4">
                                        {[
                                            { id: 101, name: 'Aarav Sharma', grade: 'Grade 11 (Science)', time: '2h ago' },
                                            { id: 102, name: 'Sita Poudel', grade: 'BBA Program', time: '5h ago' },
                                            { id: 103, name: 'Hari Krishna', grade: 'Grade 10', time: '1d ago' }
                                        ].map((inq) => (
                                            <div key={inq.id} className="flex justify-between items-start pb-4 border-b border-zinc-800 last:border-0 last:pb-0">
                                                <div>
                                                    <div className="font-medium text-sm">{inq.name}</div>
                                                    <div className="text-xs text-zinc-500">Inquiry for {inq.grade}</div>
                                                </div>
                                                <div className="text-xs text-zinc-400">{inq.time}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        variant="link"
                                        className="w-full mt-2 text-blue-500"
                                        onClick={() => handleTabChange('inquiries')}
                                    >
                                        View All Inquiries
                                    </Button>
                                </div>

                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                                    <h3 className="font-bold mb-4">Suggested Actions</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-zinc-800/50 rounded-lg flex gap-3 text-sm">
                                            <div className="w-1 h-full bg-yellow-500 rounded-full"></div>
                                            <div>
                                                <div className="font-medium text-yellow-500">Complete your profile</div>
                                                <div className="text-zinc-400">Add detailed fee structure to get 2x more views.</div>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-zinc-800/50 rounded-lg flex gap-3 text-sm">
                                            <div className="w-1 h-full bg-blue-500 rounded-full"></div>
                                            <div>
                                                <div className="font-medium text-blue-500">Upload new photos</div>
                                                <div className="text-zinc-400">Showcase your recent sports day event.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inquiries' && (
                        <InquiryManager />
                    )}

                    {activeTab === 'edit' && (
                        <div>
                            <EditProfileForm institution={institution} />
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
                            <MessageSquare className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Review Management</h3>
                            <p className="text-zinc-500 mb-6">Reply to student reviews and flag inappropriate content.</p>
                            <Button disabled>Coming Soon</Button>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
                            <Settings className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Account Settings</h3>
                            <p className="text-zinc-500 mb-6">Manage password, notifications, and team members.</p>
                            <Button disabled>Coming Soon</Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function InstitutionDashboard() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
