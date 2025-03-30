export interface Patient {
    id: string;
    name: string;
    condition: string;
    status: {
        type: 'chronic' | 'acute' | 'remission';
        label: string;
    };
    image?: string;
    details?: {
        age?: number;
        dateOfBirth?: string;
        gender?: string;
    };
    treatment?: {
        medications: Array<{
            name: string;
            dosage: string;
            frequency?: string;
        }>;
    };
    diagnosis?: {
        description: string;
        conditions: string[];
        classification?: string;
    };
    nextVisit?: {
        date: string;
        tests?: string[];
    };
} 