import { Institution } from './data';

export interface FilterState {
    query: string;
    type: string | null;
    city: string | null;
    minBudget: number;
    maxBudget: number;
    facilities: string[];
    affiliation: string[];
    programs: string[];
    safetyFeatures: string[];
}

export const defaultFilters: FilterState = {
    query: '',
    type: null,
    city: null,
    minBudget: 0,
    maxBudget: 1000000,
    facilities: [],
    affiliation: [],
    programs: [],
    safetyFeatures: []
};

// Weights for different criteria (User requirement: Configurable weights)
// Budget 25%, Location 20%, Facilities 15%, Academics 15%, Safety 10%, Reviews 10%, Holistic 5%
const WEIGHTS = {
    BUDGET: 0.25,
    LOCATION: 0.20,
    FACILITIES: 0.15,
    ACADEMICS: 0.15,
    SAFETY: 0.10,
    REVIEWS: 0.10,
    HOLISTIC: 0.05
};

export function calculateMatchScore(institution: Institution, filters: FilterState): number {
    let score = 0;

    // 1. Budget Match (25%)
    // Check if total annual fees fall within budget
    const annualFees = institution.feeDetails?.annual || institution.fees;
    if (annualFees >= filters.minBudget && annualFees <= filters.maxBudget) {
        score += WEIGHTS.BUDGET * 100;
    } else {
        // Partial credit if slightly out of range? For now boolean match logic or 0.
        // Let's implement gradual drop-off logic later if needed.
        // If close (within 20%), give half points
        if (annualFees >= filters.minBudget * 0.8 && annualFees <= filters.maxBudget * 1.2) {
            score += WEIGHTS.BUDGET * 50;
        }
    }

    // 2. Location Match (20%)
    // For now simple City match. Geo-distance in future.
    if (filters.city) {
        if (institution.city.toLowerCase() === filters.city.toLowerCase()) {
            score += WEIGHTS.LOCATION * 100;
        }
    } else {
        // If no city selected, location score is neutral/full? 
        // Let's say user didn't care about location, so it's a match.
        score += WEIGHTS.LOCATION * 100;
    }

    // 3. Facilities Match (15%)
    if (filters.facilities.length > 0) {
        const matches = filters.facilities.filter(f => institution.features.includes(f));
        const percentage = matches.length / filters.facilities.length;
        score += WEIGHTS.FACILITIES * (percentage * 100);
    } else {
        score += WEIGHTS.FACILITIES * 100;
    }

    // 4. Academics Match (15%) - Affiliation & Programs
    let academicScore = 0;
    // Helper to calculate overlap
    const calcOverlap = (required: string[], available?: string[]) => {
        if (required.length === 0) return 1;
        if (!available) return 0;
        const matches = required.filter(r => available.includes(r));
        return matches.length / required.length;
    };

    const affiliationMatch = calcOverlap(filters.affiliation, institution.affiliation);
    const programsMatch = calcOverlap(filters.programs, institution.programs);

    // Average the two academic sub-scores
    academicScore = ((affiliationMatch + programsMatch) / 2) * 100;
    score += WEIGHTS.ACADEMICS * academicScore;

    // 5. Safety Match (10%)
    if (filters.safetyFeatures.length > 0) {
        const matches = filters.safetyFeatures.filter(f => institution.safetyFeatures?.includes(f));
        const percentage = matches.length / filters.safetyFeatures.length;
        score += WEIGHTS.SAFETY * (percentage * 100);
    } else {
        score += WEIGHTS.SAFETY * 100;
    }

    // 6. Reviews Match (10%)
    // Normalize rating 0-5 to 0-100
    const ratingScore = (institution.rating / 5) * 100;
    score += WEIGHTS.REVIEWS * ratingScore;

    // 7. Holistic (5%) - Extracurriculars (Not yet in main filters, but in model)
    // defaulting to full points if not filtered
    score += WEIGHTS.HOLISTIC * 100;

    return Math.round(score);
}

export function sortInstitutions(institutions: Institution[], sortBy: string): Institution[] {
    return [...institutions].sort((a, b) => {
        // Priority to PREMIUM tier always? Or just weight it?
        // "Search: Weighted sorting to show Premium first."
        if (a.tier === 'PREMIUM' && b.tier !== 'PREMIUM') return -1;
        if (a.tier !== 'PREMIUM' && b.tier === 'PREMIUM') return 1;

        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'fees_low') return (a.feeDetails?.annual || a.fees) - (b.feeDetails?.annual || b.fees);
        if (sortBy === 'fees_high') return (b.feeDetails?.annual || b.fees) - (a.feeDetails?.annual || a.fees);
        // Default to match score if passed pre-calculated? 
        // This function just does basic sort, ranking logic is normally applied before.
        return 0;
    });
}
