export interface Institution {
    id: string;
    name: string;
    slug: string;
    type: 'PRESCHOOL' | 'SCHOOL' | 'COLLEGE' | 'UNIVERSITY' | 'MONTESSORI' | 'TECHNICAL_SCHOOL' | 'CONSULTANCY' | 'TRAINING_CENTER';
    tier: 'FREE' | 'PREMIUM'; // Monetization

    // Location
    address: string;
    city: string;
    district?: string;
    province?: string;
    coordinates?: { lat: number; lng: number };
    googleMapsLink?: string;

    // Financials
    fees: number; // in NPR (Approximate/Yearly unless specified)
    feeDetails?: {
        admission: number;
        monthly: number;
        annual: number;
        others: number;
        transport?: number;
        hostel?: number;
        securityDeposit?: number;
        amenities?: number;
    };

    // Academics & Stats
    features: string[]; // Generic facilities
    affiliation?: string[]; // NEB, TU, KU, etc.
    programs?: string[]; // Science, Management, IELTS, SAT, Python, Java, etc.
    destinations?: string[]; // USA, UK, Australia, Japan (For Consultancies)
    mediumOfInstruction?: string;
    studentTeacherRatio?: number;
    averageClassSize?: number;

    // Safety & Extra-curricular
    safetyFeatures?: string[];
    extracurricularActivities?: string[];

    // Reviews & Meta
    reviews: number;
    rating: number;
    isVerified: boolean;

    // Media & Profile
    image: string; // Cover image (legacy name)
    logo?: string;
    gallery?: string[];
    description?: string;
    foundedYear?: number;

    // Contact
    phone?: string;
    email?: string;
    website?: string;
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    };
}

export const mockInstitutions: Institution[] = [
    {
        id: '1',
        name: 'Tribhuvan University',
        slug: 'tribhuvan-university',
        type: 'UNIVERSITY',
        tier: 'PREMIUM',
        address: 'Kirtipur, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4330436',
        email: 'info@tu.edu.np',
        website: 'https://tu.edu.np',
        foundedYear: 1959,
        description: 'The oldest and largest university in Nepal.',
        rating: 4.5,
        affiliation: ['TU'],
        programs: ['Science', 'Management', 'Arts', 'Education', 'Law'],
        studentTeacherRatio: 30,
        mediumOfInstruction: 'English/Nepali',
        safetyFeatures: ['CCTV', 'Security Guards'],
        fees: 15000,
        feeDetails: {
            admission: 5000,
            monthly: 1000,
            annual: 15000,
            others: 2000,
            hostel: 6000
        },
        features: ['Library', 'Sports', 'Cafeteria', 'Labs'],
        reviews: 120,
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '2',
        name: 'Kathmandu University',
        slug: 'kathmandu-university',
        type: 'UNIVERSITY',
        tier: 'PREMIUM',
        address: 'Dhulikhel, Kavre',
        city: 'Dhulikhel',
        district: 'Kavre',
        province: 'Bagmati',
        phone: '011-661399',
        email: 'info@ku.edu.np',
        website: 'https://ku.edu.np',
        foundedYear: 1991,
        description: 'A sovereign, autonomous, non-profit, non-government institution.',
        rating: 4.8,
        fees: 250000,
        features: ['Hostel', 'Transport', 'WiFi'],
        reviews: 85,
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '3',
        name: 'St. Xaviers College',
        slug: 'st-xaviers-college',
        type: 'COLLEGE',
        tier: 'PREMIUM',
        address: 'Maitighar, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4221365',
        email: 'info@sxc.edu.np',
        website: 'https://sxc.edu.np',
        foundedYear: 1988,
        description: 'Top-tier college managed by the Society of Jesus.',
        rating: 4.9,
        fees: 80000,
        feeDetails: {
            admission: 20000,
            monthly: 5000,
            annual: 80000,
            others: 10000
        },
        features: ['Library', 'Auditorium', 'Sports'],
        reviews: 300,
        image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '4',
        name: 'Pulchowk Campus',
        slug: 'pulchowk-campus',
        type: 'COLLEGE',
        tier: 'FREE',
        address: 'Pulchowk, Lalitpur',
        city: 'Lalitpur',
        district: 'Lalitpur',
        province: 'Bagmati',
        phone: '01-5521260',
        email: 'info@ioe.edu.np',
        website: 'https://ioe.edu.np',
        foundedYear: 1972,
        description: 'The central campus of the Institute of Engineering.',
        rating: 4.9,
        fees: 20000,
        features: ['Labs', 'Workshops', 'Robot Club'],
        reviews: 500,
        image: 'https://images.unsplash.com/photo-1581094794329-cd8119604f89?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '5',
        name: 'Trinity International College',
        slug: 'trinity-college',
        type: 'COLLEGE',
        tier: 'FREE',
        address: 'Dillibazar, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4445955',
        email: 'info@trinity.edu.np',
        website: 'https://trinity.edu.np',
        foundedYear: 2008,
        description: 'Popular for +2 Science and Management.',
        rating: 4.2,
        fees: 95000,
        features: ['Library', 'Transport', 'Cafeteria'],
        reviews: 150,
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop',
        isVerified: false
    },
    {
        id: '6',
        name: 'KIST College',
        slug: 'kist-college',
        type: 'COLLEGE',
        tier: 'FREE',
        address: 'Kamalpokhari, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4434990',
        email: 'info@kist.edu.np',
        website: 'https://kist.edu.np',
        foundedYear: 1995,
        description: 'Known for holistic education and friendly environment.',
        rating: 4.3,
        fees: 85000,
        features: ['Library', 'Labs'],
        reviews: 90,
        image: 'https://images.unsplash.com/photo-1525921429618-f513b47267d5?q=80&w=800&auto=format&fit=crop',
        isVerified: false
    },
    {
        id: '7',
        name: 'Budhanilkantha School',
        slug: 'budhanilkantha-school',
        type: 'SCHOOL',
        tier: 'PREMIUM',
        address: 'Budhanilkantha, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4370248',
        email: 'info@bnks.edu.np',
        website: 'https://bnks.edu.np',
        foundedYear: 1972,
        description: 'Information regarding Budhanilkantha School.',
        rating: 5.0,
        fees: 400000,
        features: ['Boarding', 'Swimming Pool', 'Sports Complex'],
        reviews: 200,
        image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '8',
        name: 'Rato Bangala School',
        slug: 'rato-bangala',
        type: 'SCHOOL',
        tier: 'PREMIUM',
        address: 'Patan Dhoka, Lalitpur',
        city: 'Lalitpur',
        district: 'Lalitpur',
        province: 'Bagmati',
        phone: '01-5522614',
        email: 'rbs@ratoschool.edu.np',
        website: 'https://ratobangala.edu.np',
        foundedYear: 1992,
        description: 'A progressive school offering distinctive education.',
        rating: 4.7,
        fees: 500000,
        features: ['Arts', 'Music', 'Labs'],
        reviews: 110,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '9',
        name: 'Gems School',
        slug: 'gems-school',
        type: 'SCHOOL',
        tier: 'FREE',
        address: 'Dhapakhel, Lalitpur',
        city: 'Lalitpur',
        district: 'Lalitpur',
        province: 'Bagmati',
        phone: '01-5275111',
        email: 'info@gems.edu.np',
        website: 'https://gems.edu.np',
        foundedYear: 1984,
        description: 'Global Education Management Systems.',
        rating: 4.6,
        fees: 350000,
        features: ['Swimming Pool', 'Auditorium', 'Bus Service'],
        reviews: 180,
        image: 'https://images.unsplash.com/photo-1577896334614-201b37d54f97?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '10',
        name: 'St. Marys School',
        slug: 'st-marys',
        type: 'SCHOOL',
        tier: 'FREE',
        address: 'Jawalakhel, Lalitpur',
        city: 'Lalitpur',
        district: 'Lalitpur',
        province: 'Bagmati',
        phone: '01-5521020',
        email: 'info@stmarys.edu.np',
        website: 'https://stmarys.edu.np',
        foundedYear: 1955,
        description: 'Prestigious all-girls school.',
        rating: 4.8,
        fees: 120000,
        features: ['Library', 'Sports'],
        reviews: 250,
        image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '11',
        name: 'Euro Kids',
        slug: 'euro-kids',
        type: 'PRESCHOOL',
        tier: 'FREE',
        address: 'Tangal, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4411111',
        email: 'info@eurokids.com.np',
        website: 'https://eurokids.com.np',
        foundedYear: 2001,
        description: 'International standard preschool network.',
        rating: 4.5,
        fees: 100000,
        features: ['Play Area', 'CCTV', 'Trained Staff'],
        reviews: 60,
        image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '12',
        name: 'Kangaroo Kids',
        slug: 'kangaroo-kids',
        type: 'PRESCHOOL',
        tier: 'PREMIUM',
        address: 'Baluwatar, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4422222',
        email: 'info@kangarookids.com.np',
        website: 'https://kangarookids.com.np',
        foundedYear: 2005,
        description: 'A premium preschool experience.',
        rating: 4.6,
        fees: 120000,
        features: ['Modern Classrooms', 'Safe Transport'],
        reviews: 45,
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '13',
        name: 'Montessori Ami',
        slug: 'montessori-ami',
        type: 'PRESCHOOL',
        tier: 'FREE',
        address: 'Lazimpat, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4001001',
        email: 'info@montessori.org.np',
        website: 'https://montessori.org.np',
        foundedYear: 2010,
        description: 'Authentic Montessori education.',
        rating: 4.7,
        fees: 110000,
        features: ['Certified Teachers', 'Garden'],
        reviews: 30,
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '14',
        name: 'Little Angels',
        slug: 'little-angels',
        type: 'PRESCHOOL',
        tier: 'FREE',
        address: 'Hattiban, Lalitpur',
        city: 'Lalitpur',
        district: 'Lalitpur',
        province: 'Bagmati',
        phone: '01-5250000',
        email: 'info@las.edu.np',
        website: 'https://las.edu.np',
        foundedYear: 1981,
        description: 'One of the oldest and largest Montessori networks in Nepal.',
        rating: 4.4,
        fees: 90000,
        features: ['Big Playground', 'Pool'],
        reviews: 120,
        image: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '15',
        name: 'Alpha Education Consultancy',
        slug: 'alpha-education',
        type: 'CONSULTANCY',
        tier: 'PREMIUM',
        address: 'Putalisadak, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4222222',
        email: 'info@alphaedu.com',
        website: 'https://alphaedu.com',
        foundedYear: 2012,
        description: 'Leading consultancy for USA, Australia, and Canada. Expert IELTS and PTE classes. Authorized representative of 50+ universities.',
        rating: 4.8,
        fees: 15000,
        feeDetails: {
            admission: 0,
            monthly: 0,
            annual: 15000,
            others: 2000
        },
        features: ['Visa Guidance', 'Mock Tests', 'AC Classrooms'],
        programs: ['IELTS', 'PTE', 'SAT'],
        destinations: ['USA', 'Australia', 'Canada'],
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '16',
        name: 'Global Reach Nepal',
        slug: 'global-reach',
        type: 'CONSULTANCY',
        tier: 'PREMIUM',
        address: 'Dillibazar, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4444444',
        email: 'ktm@globalreach.com',
        website: 'https://globalreach.in',
        foundedYear: 1991,
        description: 'Representing over 500 universities worldwide. Best counselors for UK and Australia.',
        rating: 4.7,
        fees: 12000,
        features: ['Career Counseling', 'University Selection'],
        programs: ['IELTS', 'TOEFL'],
        destinations: ['UK', 'Australia', 'New Zealand', 'Ireland'],
        reviews: 180,
        image: 'https://images.unsplash.com/photo-1521791136064-7985c2d18854?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '17',
        name: 'Bradford Education',
        slug: 'bradford-education',
        type: 'CONSULTANCY',
        tier: 'FREE',
        address: 'New Baneshwor, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4780000',
        email: 'info@bradford.edu.np',
        website: 'https://bradford.edu.np',
        foundedYear: 2015,
        description: 'Focus on Japan and Korea student visas.',
        rating: 4.5,
        fees: 10000,
        features: ['Language Classes', 'Documentation Support'],
        programs: ['JLPT', 'NAT'],
        destinations: ['Japan', 'South Korea'],
        reviews: 95,
        image: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    },
    {
        id: '18',
        name: 'Broadway Infosys',
        slug: 'broadway-infosys',
        type: 'TRAINING_CENTER',
        tier: 'PREMIUM',
        address: 'Tinkune, Kathmandu',
        city: 'Kathmandu',
        district: 'Kathmandu',
        province: 'Bagmati',
        phone: '01-4111849',
        email: 'info@broadwayinfosys.com',
        website: 'https://broadwayinfosys.com',
        foundedYear: 2008,
        description: 'ISO 9001:2015 Certified IT Training Institute in Nepal.',
        rating: 4.6,
        fees: 20000,
        features: ['Job Placement', 'Internship', 'Labs'],
        programs: ['Python', 'Java', 'Web Design', 'Digital Marketing', 'Data Science'],
        reviews: 350,
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
        isVerified: true
    }
];
