'use client';

import { Institution } from '@/lib/data';
import { MapPin, Star, Building2, BookOpen, Users, CheckCircle, Trophy, TrendingUp, Globe, ShieldCheck, CalendarClock, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReviewForm from '@/components/features/ReviewForm';
import InquiryForm from '@/components/features/InquiryForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

interface InstitutionDetailProps {
    institution: Institution;
}

export default function InstitutionDetail({ institution }: InstitutionDetailProps) {
    if (!institution) return null;

    const isConsultancy = institution.type === 'CONSULTANCY';
    const score = institution.eduRankScore || 85;
    const breakdown = institution.scoreBreakdown || {
        "Academic Reputation": 35,
        "Facilities": 25,
        "Parent Reviews": 25,
        "Value for Money": 15
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />

            <main className="flex-1 pb-12">
                {/* Hero Section */}
                <section className="relative h-[300px] md:h-[400px] bg-zinc-900 group overflow-hidden">
                    <img
                        src={institution.image}
                        alt={institution.name}
                        className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="bg-blue-600/20 text-blue-400 border border-blue-600/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                                        {institution.type.replace('_', ' ')}
                                    </span>
                                    {institution.isVerified && (
                                        <span className="flex items-center gap-1.5 text-green-400 bg-green-400/10 border border-green-400/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                                            <CheckCircle className="h-3.5 w-3.5" /> Verified
                                        </span>
                                    )}
                                    {institution.tier === 'PREMIUM' && (
                                        <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                                            Premium
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">{institution.name}</h1>

                                <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mt-2">
                                    {institution.phone && (
                                        <div className="flex items-center gap-1.5">
                                            <Phone className="h-4 w-4 text-blue-400" />
                                            <span>{institution.phone}</span>
                                        </div>
                                    )}
                                    {institution.email && (
                                        <div className="flex items-center gap-1.5">
                                            <Mail className="h-4 w-4 text-blue-400" />
                                            <span>{institution.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center text-zinc-300 gap-4 text-sm md:text-base mt-4">
                                    <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                        <MapPin className="h-4 w-4 text-zinc-500" />
                                        {institution.address}, {institution.city}
                                    </div>
                                    <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700"></div>
                                    <div className="flex items-center gap-1.5 text-yellow-500 font-bold">
                                        <Star className="h-4 w-4 fill-current" />
                                        {institution.rating.toFixed(1)}
                                        <span className="text-zinc-500 font-medium ml-1">({institution.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {isConsultancy ? (
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20" onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Book Free Counseling
                                    </Button>
                                ) : (
                                    <Button
                                        size="lg"
                                        className="bg-white text-black hover:bg-zinc-200 font-semibold"
                                        onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Write a Review
                                    </Button>
                                )}
                                <Link href={`/compare?add=${institution.id}`}>
                                    <Button variant="outline" size="lg" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 backdrop-blur-md">
                                        Compare
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* LEFT COLUMN (Main Info) */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* EduRank Analysis (New Feature) */}
                            <section className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                                <div className="flex items-center gap-3 mb-6 relative z-10">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Trophy className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">EduRank Score Breakdown</h2>
                                        <p className="text-xs text-zinc-400">AI-driven analysis based on reviews, facilities, and academic performance.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                    {/* Overall Score Circle */}
                                    <div className="flex flex-col items-center justify-center py-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                                        <div className="relative flex items-center justify-center w-32 h-32">
                                            <svg className="transform -rotate-90 w-32 h-32">
                                                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-800" />
                                                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-green-500" strokeDasharray={2 * Math.PI * 60} strokeDashoffset={2 * Math.PI * 60 * (1 - score / 100)} />
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-4xl font-bold text-white">{score}</span>
                                                <span className="text-xs font-semibold text-zinc-500 uppercase">out of 100</span>
                                            </div>
                                        </div>
                                        <span className="mt-4 inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                            Excellent
                                        </span>
                                    </div>

                                    {/* Detailed Bars */}
                                    <div className="md:col-span-2 space-y-4">
                                        {Object.entries(breakdown).map(([label, value]) => (
                                            <div key={label}>
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span className="text-zinc-300 font-medium">{label}</span>
                                                    <span className="text-zinc-400">{Math.round((value / Object.values(breakdown).reduce((a, b) => a + b, 0)) * 100)}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                                                        style={{ width: `${Math.min(100, Math.max(20, (value / 35) * 100))}%` }} // Approximate scaling for demo
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Consultancy Specific Stats */}
                            {isConsultancy && (
                                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl flex flex-col items-center text-center">
                                        <ShieldCheck className="h-8 w-8 text-green-500 mb-3" />
                                        <span className="text-3xl font-bold text-white">{institution.visaSuccessRate || 95}%</span>
                                        <span className="text-sm text-zinc-500 font-medium mt-1">Visa Success Rate</span>
                                    </div>
                                    <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl flex flex-col items-center text-center">
                                        <Users className="h-8 w-8 text-blue-500 mb-3" />
                                        <span className="text-3xl font-bold text-white">{institution.studentsSent || 1200}+</span>
                                        <span className="text-sm text-zinc-500 font-medium mt-1">Students Sent</span>
                                    </div>
                                    <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl flex flex-col items-center text-center">
                                        <CalendarClock className="h-8 w-8 text-purple-500 mb-3" />
                                        <span className="text-3xl font-bold text-white">{institution.yearsInBusiness || 10}+</span>
                                        <span className="text-sm text-zinc-500 font-medium mt-1">Years Experience</span>
                                    </div>
                                </section>
                            )}

                            {/* About Section */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                                    <BookOpen className="h-6 w-6 text-zinc-500" /> About
                                </h2>
                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 leading-relaxed text-zinc-300">
                                    <p className="mb-4">
                                        {institution.description || `${institution.name} is a premier ${institution.type.toLowerCase().replace('_', ' ')} dedicated to providing top-tier educational services. Rated highly for its facilities and faculty.`}
                                    </p>

                                    {/* Highlight Tags */}
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {institution.affiliation && institution.affiliation.map(aff => (
                                            <span key={aff} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded text-xs font-semibold border border-zinc-700">
                                                Affiliated: {aff}
                                            </span>
                                        ))}
                                        {institution.foundedYear && (
                                            <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded text-xs font-semibold border border-zinc-700">
                                                Est. {institution.foundedYear}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Facilities / Services */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                                    {isConsultancy ? <Globe className="h-6 w-6 text-zinc-500" /> : <Building2 className="h-6 w-6 text-zinc-500" />}
                                    {isConsultancy ? 'Services & Destinations' : 'Facilities'}
                                </h2>
                                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                                    {isConsultancy ? (
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-sm font-bold text-zinc-500 uppercase mb-3">Popular Destinations</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {institution.destinations?.map(dest => (
                                                        <span key={dest} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium text-zinc-200">
                                                            <Globe className="h-3.5 w-3.5 text-blue-500" /> {dest}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-zinc-500 uppercase mb-3">Key Services</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                    {institution.services?.map((feature: string, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2 text-zinc-400 text-sm">
                                                            <CheckCircle className="h-3.5 w-3.5 text-green-500/70" /> {feature}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
                                            {institution.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-zinc-300 p-2 rounded hover:bg-zinc-800/50 transition-colors">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Reviews */}
                            <section className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                                    <Users className="h-6 w-6 text-zinc-500" /> Reviews
                                </h2>
                                <div id="reviews-section" className="scroll-mt-24 bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
                                    <ReviewForm institutionId={institution.id} institutionName={institution.name} />
                                    <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
                                        <p className="text-zinc-500 italic">No reviews yet. Be the first to verify this institution!</p>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* RIGHT COLUMN (Sticky Sidebar) */}
                        <div className="space-y-8">

                            {/* Inquiry Form (Sticky) */}
                            <div className="sticky top-24 space-y-6">
                                <FeesCard institution={institution} />

                                <div id="inquiry-form" className="scroll-mt-24">
                                    <InquiryForm
                                        institutionId={institution.id}
                                        institutionName={institution.name}
                                        title={isConsultancy ? "Book Free Counseling" : "Admission Inquiry"}
                                    />
                                </div>

                                <LocationCard institution={institution} />
                            </div>

                        </div>

                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

function FeesCard({ institution }: { institution: Institution }) {
    if (institution.type === 'CONSULTANCY') return null; // No fees card for consultancies typically, or service fee

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <h3 className="text-lg font-bold text-white mb-4">Fee Structure</h3>

            <div className="space-y-4 mb-6">
                <div>
                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Monthly Fee</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-white">NPR {institution.feeDetails?.monthly.toLocaleString() ?? institution.fees / 12}</span>
                        <span className="text-xs text-zinc-500">/ mo</span>
                    </div>
                </div>
                <div>
                    <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Admission Fee</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-white">NPR {institution.feeDetails?.admission.toLocaleString() ?? 'Varies'}</span>
                        <span className="text-xs text-zinc-500">/ one-time</span>
                    </div>
                </div>
            </div>

            <p className="text-xs text-zinc-500 mb-6 border-t border-zinc-800 pt-4">Estimated annual: NPR {institution.fees.toLocaleString()}</p>

            <Link href="#inquiry-form" className="block w-full">
                <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-200">
                    Request Detailed Breakdown
                </Button>
            </Link>
        </div>
    );
}

function LocationCard({ institution }: { institution: Institution }) {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <MapPin className="h-5 w-5 text-zinc-500" /> Location
            </h3>
            <div className="h-40 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 mb-4 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/85.3240,27.7172,13,0/400x300?access_token=placeholder')] bg-cover bg-center grayscale opacity-50 relative group cursor-pointer hover:opacity-80 transition-opacity">
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 text-xs font-bold text-white border-2 border-transparent group-hover:border-white/20 transition-all m-2 rounded">
                    View on Maps
                </div>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
                <p className="flex justify-between">
                    <span className="font-medium text-zinc-500">Address</span>
                    <span className="text-right">{institution.address}</span>
                </p>
                <div className="h-px bg-zinc-800/50"></div>
                <p className="flex justify-between">
                    <span className="font-medium text-zinc-500">City</span>
                    <span className="text-right">{institution.city}</span>
                </p>
            </div>
        </div>
    );
}
