'use client';

import { useState, useEffect } from 'react';
import { Institution, fetchInstitutions, mockInstitutions } from '@/lib/data';

/**
 * Custom hook to fetch and manage institution data.
 * Merges dynamic data from schools.json with existing mock data.
 */
export function useInstitutions() {
    const [data, setData] = useState<Institution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const dynamicData = await fetchInstitutions();

                // Merge dynamic schools with other mock institutions (preschools, colleges, etc.)
                // To avoid duplicates, we'll keep the mock categories but replace SCHOOLS with the dynamic ones
                const otherMocks = mockInstitutions.filter(inst => inst.type !== 'SCHOOL');

                // Combine and sort by score
                const combined = [...dynamicData, ...otherMocks].sort((a, b) => (b.eduRankScore || 0) - (a.eduRankScore || 0));

                setData(combined);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Failed to load institutions');
                // Fallback to mock data if fetch fails
                setData(mockInstitutions);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return { data, loading, error };
}
