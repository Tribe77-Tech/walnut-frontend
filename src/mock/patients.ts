import { type Patient } from '@/types/patient'

export const patients: Patient[] = [
    {
        id: '1',
        name: 'Haylie Saris',
        condition: 'Heart failure',
        status: {
            type: 'chronic',
            label: 'Chronic form'
        },
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        details: {
            age: 35,
            dateOfBirth: '1988-03-14',
            gender: 'Female'
        },
        treatment: {
            medications: [
                { name: 'Dopamine', dosage: '10 G' },
                { name: 'Salt restriction', dosage: '5-8 G/day' },
                { name: 'Fluid restriction', dosage: '1.5-2 L/day' },
                { name: 'Nitroglycerin', dosage: '90 MM for BP' }
            ]
        },
        diagnosis: {
            description: 'Hypertonic disease, Persistent atrial fibrillation, Chronic heart failure',
            conditions: ['Hypertonic disease', 'Persistent atrial fibrillation', 'Chronic heart failure'],
            classification: 'III-IV Class NYHA'
        },
        nextVisit: {
            date: '2023-10-21',
            tests: ['Echocardiography', 'Coronary angiography', 'Diastolic stress test']
        }
    },
    {
        id: '2',
        name: 'Nolan Korsgaard',
        condition: 'Heart failure',
        status: {
            type: 'acute',
            label: 'Acute form'
        },
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        treatment: {
            medications: [
                { name: 'ACE inhibitor', dosage: '5 mg daily' },
                { name: 'Beta blocker', dosage: '25 mg twice daily' }
            ]
        }
    },
    {
        id: '3',
        name: 'Kianna Philips',
        condition: 'Heart failure',
        status: {
            type: 'remission',
            label: 'Remission'
        },
        image: 'https://randomuser.me/api/portraits/women/67.jpg'
    },
    {
        id: '4',
        name: 'Cooper Carder',
        condition: 'Heart failure',
        status: {
            type: 'remission',
            label: 'Remission'
        },
        image: 'https://randomuser.me/api/portraits/men/39.jpg'
    },
    {
        id: '5',
        name: 'Skylar Rosser',
        condition: 'Heart failure',
        status: {
            type: 'acute',
            label: 'Acute form'
        },
        image: 'https://randomuser.me/api/portraits/men/54.jpg'
    },
    {
        id: '6',
        name: 'Roger Torff',
        condition: 'Heart failure',
        status: {
            type: 'chronic',
            label: 'Chronic form'
        },
        image: 'https://randomuser.me/api/portraits/men/76.jpg'
    },
    {
        id: '7',
        name: 'Livia Geidt',
        condition: 'Heart failure',
        status: {
            type: 'chronic',
            label: 'Chronic form'
        },
        image: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
        id: '8',
        name: 'Jordyn Philips',
        condition: 'Heart failure',
        status: {
            type: 'acute',
            label: 'Acute form'
        },
        image: 'https://randomuser.me/api/portraits/women/23.jpg'
    },
    {
        id: '9',
        name: 'Charlie Press',
        condition: 'Heart failure',
        status: {
            type: 'acute',
            label: 'Acute form'
        },
        image: 'https://randomuser.me/api/portraits/women/89.jpg'
    }
] 