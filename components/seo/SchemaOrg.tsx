import { Institution } from '@/lib/data';

interface SchemaOrgProps {
    institution: Institution;
}

export default function SchemaOrg({ institution }: SchemaOrgProps) {
    const schemaType = institution.type === 'UNIVERSITY' || institution.type === 'COLLEGE' ? 'CollegeOrUniversity' : 'School';

    const schema = {
        '@context': 'https://schema.org',
        '@type': schemaType,
        'name': institution.name,
        'description': institution.description,
        'url': `https://edurank.np/institution/${institution.id}`, // Placeholder domain
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': institution.address,
            'addressLocality': institution.city,
            'addressRegion': institution.district || institution.province || 'Bagmati',
            'addressCountry': 'NP'
        },
        'telephone': institution.phone,
        'email': institution.email,
        'sameAs': institution.website,
        'image': institution.image,
        'priceRange': `NPR ${institution.fees.toLocaleString()}`,
        'foundingDate': institution.foundedYear?.toString(),
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': institution.rating,
            'reviewCount': institution.reviews
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
