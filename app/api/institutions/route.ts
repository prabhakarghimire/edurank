import { NextResponse } from 'next/server';
import { mockInstitutions } from '@/lib/data';

export async function GET() {
    // Simulator database delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(mockInstitutions);
}
