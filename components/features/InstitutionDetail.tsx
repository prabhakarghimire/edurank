'use client';


import { Institution } from '@/lib/data';
import { MapPin, Star, Building2, BookOpen, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeeStructure from '@/components/features/FeeStructure';
import ReviewForm from '@/components/features/ReviewForm';
import InquiryForm from '@/components/features/InquiryForm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useState } from 'react';

interface InstitutionDetailProps {
    institution: Institution;
}

export default function InstitutionDetail({ institution }: InstitutionDetailProps) {
    // We don't need loading state anymore as data is passed from Server Component

    // Simulate "Not Found" handling if somehow null passed (though Server Component handles 404 ideally)
    if (!institution) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">Institution Not Found</h1>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <main className="flex-1">
                {/* Header / Hero for Institution */}
                <section className="relative h-[250px] md:h-[350px] bg-zinc-900">
                    <img
                        src={institution.image}
                        alt={institution.name}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase">{institution.type}</span>
                                    {institution.isVerified && (
                                        <span className="flex items-center gap-1 text-green-400 text-xs font-medium">
                                            <CheckCircle className="h-3 w-3" /> Verified
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold mb-2">{institution.name}</h1>
                                <div className="flex items-center text-zinc-300 gap-4 text-sm md:text-base">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" /> {institution.address}, {institution.city}
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                        <Star className="h-4 w-4 fill-current" /> {institution.rating.toFixed(1)} <span className="text-zinc-400 font-normal">({institution.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button className="bg-white text-black hover:bg-zinc-200">Write a Review</Button>
                                <Link href="/compare">
                                    <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800">Compare</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Tabs / Sections */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Content (Left) */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* About */}
                            <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-zinc-400" /> About
                                </h2>
                                <p className="text-zinc-300 leading-relaxed">
                                    {institution.description || `${institution.name} is a premier ${institution.type.toLowerCase()} located in ${institution.city}. It is known for its excellent academic track record and state-of-the-art facilities.`}
                                </p>
                                {/* Key Highlights */}
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    {institution.affiliation && (
                                        <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                                            <div className="text-xs text-zinc-500">Affiliation</div>
                                            <div className="font-semibold">{institution.affiliation.join(', ')}</div>
                                        </div>
                                    )}
                                    {institution.foundedYear && (
                                        <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                                            <div className="text-xs text-zinc-500">Established</div>
                                            <div className="font-semibold">{institution.foundedYear}</div>
                                        </div>
                                    )}
                                    {institution.studentTeacherRatio && (
                                        <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                                            <div className="text-xs text-zinc-500">S:T Ratio</div>
                                            <div className="font-semibold">1:{institution.studentTeacherRatio}</div>
                                        </div>
                                    )}
                                    {institution.mediumOfInstruction && (
                                        <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                                            <div className="text-xs text-zinc-500">Medium</div>
                                            <div className="font-semibold">{institution.mediumOfInstruction}</div>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Facilities / Infrastructure */}
                            <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-zinc-400" /> Facilities
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {institution.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-zinc-300">
                                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Reviews Section */}
                            <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Users className="h-5 w-5 text-zinc-400" /> Reviews & Ratings
                                </h2>

                                <div className="space-y-8">
                                    {/* Review Form */}
                                    <ReviewForm institutionId={institution.id} institutionName={institution.name} />

                                    {/* Recent Reviews (Placeholder for now) */}
                                    <div className="pt-8 border-t border-zinc-800">
                                        <h3 className="text-lg font-semibold mb-4 text-zinc-300">Recent Reviews</h3>
                                        <div className="bg-black/30 p-6 rounded-lg text-center border border-zinc-800 border-dashed">
                                            <p className="text-zinc-500 italic">No reviews yet. Be the first to review!</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Sidebar (Right) */}
                        <div className="space-y-6">

                            {/* Key Stats / Fees */}
                            <FeeStructure institution={institution} />

                            {/* Admission Inquiry */}
                            <InquiryForm institutionId={institution.id} institutionName={institution.name} />

                            {/* Contact / Map Placeholder */}
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-zinc-400" /> Location
                                </h3>
                                <div className="bg-zinc-800 h-48 rounded-lg flex items-center justify-center text-zinc-500 relative overflow-hidden group p-0">
                                    {/* Fake Map Image/Placeholder */}
                                    <img src="https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/85.3240,27.7172,13,0/400x300?access_token=placeholder"
                                        alt="Map"
                                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                                        onError={(e) => {
                                            // Fallback if image fails (since token is fake)
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="bg-black/80 px-3 py-1 rounded text-xs">View on Google Maps</span>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2 text-sm text-zinc-300">
                                    <p><strong>Address:</strong> {institution.address}</p>
                                    <p><strong>City:</strong> {institution.city}</p>
                                    {institution.phone && <p><strong>Phone:</strong> {institution.phone}</p>}
                                    {institution.website && <p><strong>Website:</strong> <a href={institution.website} target="_blank" className="text-blue-400 hover:underline">{institution.website}</a></p>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </main>

        </div>
    );
}
