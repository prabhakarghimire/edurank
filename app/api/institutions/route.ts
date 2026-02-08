import { NextResponse } from 'next/server';
import { mockInstitutions, Institution } from '@/lib/data';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Read the schools.json file from the public directory
        const filePath = path.join(process.cwd(), 'public', 'schools.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const rawData: any[][] = JSON.parse(fileContent);

        // Map dynamic schools
        const dynamicSchools: Institution[] = rawData.map((item, index) => {
            const [
                name,
                area,
                monthlyFeeStr,
                admissionFeeStr,
                curriculumStr,
                facilityStr,
                website,
                phone,
                description,
            ] = item;

            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const monthlyFee = parseInt(monthlyFeeStr?.replace(/[^0-9]/g, '') || '0');
            const admissionFee = parseInt(admissionFeeStr?.replace(/[^0-9]/g, '') || '0');

            return {
                id: `dynamic-${index}`,
                name,
                slug,
                type: 'SCHOOL',
                tier: 'FREE',
                address: area,
                city: area.split(',').pop()?.trim() || 'Kathmandu',
                fees: monthlyFee * 12,
                feeDetails: {
                    admission: admissionFee,
                    monthly: monthlyFee,
                    annual: monthlyFee * 12,
                    others: 0
                },
                features: facilityStr?.split(',').map((f: string) => f.trim()) || [],
                affiliation: curriculumStr?.split(',').map((c: string) => c.trim()) || [],
                rating: 4.5,
                reviews: 10,
                isVerified: true,
                image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop',
                description: description || '',
                phone,
                website: website !== '—' ? website : undefined,
                eduRankScore: 85,
            };
        });

        // Merge and return
        const otherMocks = mockInstitutions.filter(inst => inst.type !== 'SCHOOL');
        const combined = [...dynamicSchools, ...otherMocks].sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0));

        return NextResponse.json(combined);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(mockInstitutions);
    }
}
