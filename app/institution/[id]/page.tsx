
import { mockInstitutions } from '@/lib/data';
import InstitutionDetail from '@/components/features/InstitutionDetail';
import SchemaOrg from '@/components/seo/SchemaOrg';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Update type to be Promise<Params>
interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const institution = mockInstitutions.find((i) => i.id === id);

    if (!institution) {
        return {
            title: 'Institution Not Found | EduRank Nepal',
            description: 'The requested institution could not be found.',
        };
    }

    return {
        title: `${institution.name} - Fees, Reviews & Admission ${new Date().getFullYear()} | EduRank`,
        description: `Everything known about ${institution.name} in ${institution.city}. Check fees, rating (${institution.rating}/5), facilities, and reviews.`,
    };
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    console.log('DEBUG: Page id:', id);
    const institution = mockInstitutions.find((i) => i.id === id);

    if (!institution) {
        notFound();
    }

    return (
        <>
            <SchemaOrg institution={institution} />
            <InstitutionDetail institution={institution} />
        </>
    );
}
