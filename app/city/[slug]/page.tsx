

import InstitutionCard from '@/components/features/InstitutionCard';
import { mockInstitutions } from '@/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const city = slug.charAt(0).toUpperCase() + slug.slice(1);
    return {
        title: `Best Schools & Colleges in ${city} | EduRank Nepal`,
        description: `Find the top rated schools, colleges and preschools in ${city}. Compare fees, facilities and reviews of the best educational institutions in ${city}, Nepal.`
    };
}

export default async function CityPage({ params }: Props) {
    const { slug } = await params;
    const citySlug = slug;
    const city = citySlug.charAt(0).toUpperCase() + citySlug.slice(1);

    // Filter institutions by city (case-insensitive partial match)
    const institutions = mockInstitutions.filter(inst =>
        inst.city.toLowerCase().includes(citySlug.toLowerCase()) ||
        inst.address.toLowerCase().includes(citySlug.toLowerCase())
    );

    if (institutions.length === 0) {
        // Option: Show 404 or just "No results found"
        // For SEO, if it's a valid city but no data, showing "No results" is better than 404
        // But let's handle "unknown" cities gracefully.
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <main className="flex-1">
                <div className="bg-zinc-900 border-b border-zinc-800">
                    <div className="container mx-auto px-4 py-16 text-center">
                        <h1 className="text-4xl font-bold mb-4">Best Schools & Colleges in <span className="text-blue-500">{city}</span></h1>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Explore {institutions.length} verified educational institutions in {city}.
                            Compare fees, admissions, and academic excellence to find the perfect fit.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {institutions.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {institutions.map(inst => (
                                <InstitutionCard key={inst.id} institution={inst} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-zinc-900/50 rounded-lg border border-zinc-800">
                            <p className="text-zinc-500 text-lg">
                                We currently don't have listings for <strong>{city}</strong>.
                            </p>
                            <p className="text-zinc-600 text-sm mt-2">
                                Try searching for "Kathmandu", "Lalitpur", or "Bhaktapur".
                            </p>
                        </div>
                    )}
                </div>
            </main>

        </div>
    );
}
