const expertsData = [
  {
    id: 1,
    name: 'Ana Raquel Degrazia, NP',
    expertise: 'Nurse Practitioner',
    rating: 4.91,
    reviews: 56,
    address: '123 Health St, Wellness City',
    lat: 40.7128 + Math.random() * 0.02 - 0.01, 
    lng: -74.0060 + Math.random() * 0.02 - 0.01, 
    availability: [
      '7 appts', 'No appts', '4 appts', '4 appts', 'No appts',
      '6 appts', '5 appts', '1 appts', 'No appts', '3 appts','7 appts', '3 appts','5 appts', '3 appts'
    ],
  },
    {
      id: 2,
      name: 'Tanya Dwyer, NP - C',
      expertise: 'Family Nurse Practitioner',
      rating: 4.91,
      reviews: 110,
      address: '456 Care Blvd, Healing Town',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '2 appts', 'No appts', 'No appts', 'No appts', 'No appts',
        '7 appts', '6 appts', 'No appts', '1 appt', '8 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 3,
      name: 'Michael Hopkins, MD',
      expertise: 'General Practitioner',
      rating: 4.75,
      reviews: 89,
      address: '789 Wellness Ave, Healthy City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '1 appt', 'No appts', 'No appts', '3 appts', 'No appts',
        '5 appts', 'No appts', '2 appts', 'No appts', '7 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 4,
      name: 'Sandra Lee, DO',
      expertise: 'Pediatrician',
      rating: 4.82,
      reviews: 120,
      address: '321 Care Rd, Healing Town',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', '2 appts', 'No appts', 'No appts', '4 appts',
        'No appts', 'No appts', '1 appt', 'No appts', '6 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 5,
      name: 'David Nguyen, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.90,
      reviews: 78,
      address: '654 Health Blvd, Wellness City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '3 appts', 'No appts', 'No appts', 'No appts', 'No appts',
        '4 appts', 'No appts', 'No appts', '2 appts', 'No appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 6,
      name: 'Maria Martinez, PA-C',
      expertise: 'Physician Assistant',
      rating: 4.85,
      reviews: 65,
      address: '987 Recovery St, Wellness City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', 'No appts', '1 appt', 'No appts', 'No appts',
        'No appts', 'No appts', '3 appts', 'No appts', '5 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 7,
      name: 'James Carter, MD',
      expertise: 'Cardiologist',
      rating: 4.92,
      reviews: 102,
      address: '222 Heart Ln, Cardio Town',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '4 appts', 'No appts', 'No appts', 'No appts', 'No appts',
        '5 appts', '1 appt', 'No appts', 'No appts', '6 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 8,
      name: 'Lisa Wu, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.88,
      reviews: 99,
      address: '111 Health St, Wellness City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', '3 appts', 'No appts', 'No appts', 'No appts',
        '4 appts', 'No appts', '2 appts', 'No appts', '7 appts' ,'No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 9,
      name: 'Robert Allen, DO',
      expertise: 'Family Medicine',
      rating: 4.87,
      reviews: 85,
      address: '333 Care Blvd, Healing Town',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '2 appts', 'No appts', 'No appts', 'No appts', '5 appts',
        'No appts', 'No appts', 'No appts', '1 appt', '4 appts' ,'No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 10,
      name: 'Emily Johnson, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.89,
      reviews: 72,
      address: '444 Wellness Rd, Healthy City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', '2 appts', 'No appts', 'No appts', '3 appts',
        'No appts', 'No appts', 'No appts', '4 appts', 'No appts' ,'No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 11,
      name: 'Richard Brown, MD',
      expertise: 'Dermatologist',
      rating: 4.93,
      reviews: 145,
      address: '555 Skin St, Dermatology Town',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '1 appt', 'No appts', 'No appts', '5 appts', 'No appts',
        'No appts', '3 appts', 'No appts', 'No appts', '8 appts' ,'No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 12,
      name: 'Katherine Taylor, PA-C',
      expertise: 'Physician Assistant',
      rating: 4.80,
      reviews: 60,
      address: '666 Wellness Blvd, Wellness City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', 'No appts', '2 appts', 'No appts', 'No appts',
        '3 appts', 'No appts', 'No appts', 'No appts', '4 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 13,
      name: 'Steven Harris, MD',
      expertise: 'Orthopedic Surgeon',
      rating: 4.95,
      reviews: 134,
      address: '777 Joint Ave, Orthopedic City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '3 appts', 'No appts', 'No appts', 'No appts', 'No appts','No appts', '3 appts',
        '5 appts', 'No appts', '2 appts', 'No appts', 'No appts' ,'No appts', '3 appts'
      ],
    },
    {
      id: 14,
      name: 'Karen Rodriguez, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.86,
      reviews: 91,
      address: '888 Care Blvd, Healing Town',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', '4 appts', 'No appts', 'No appts', 'No appts',
        '6 appts', 'No appts', 'No appts', 'No appts', '3 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 15,
      name: 'Jason Clark, MD',
      expertise: 'General Practitioner',
      rating: 4.84,
      reviews: 77,
      address: '999 Health Rd, Wellness City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', 'No appts', 'No appts', '4 appts', 'No appts',
        'No appts', '3 appts', 'No appts', 'No appts', '5 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 16,
      name: 'Laura Lewis, DO',
      expertise: 'Pediatrician',
      rating: 4.82,
      reviews: 109,
      address: '123 Wellness Blvd, Wellness City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '1 appt', 'No appts', 'No appts', '2 appts', 'No appts',
        'No appts', '4 appts', 'No appts', 'No appts', 'No appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 17,
      name: 'John White, MD',
      expertise: 'Cardiologist',
      rating: 4.90,
      reviews: 88,
      address: '234 Heart Ln, Cardio Town',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', '3 appts', 'No appts', 'No appts', 'No appts',
        '4 appts', 'No appts', 'No appts', '1 appt', '6 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 18,
      name: 'Samantha Young, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.88,
      reviews: 82,
      address: '345 Health St, Wellness City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', 'No appts', 'No appts', 'No appts', '3 appts',
        'No appts', 'No appts', '5 appts', 'No appts', 'No appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 19,
      name: 'Matthew King, DO',
      expertise: 'Family Medicine',
      rating: 4.87,
      reviews: 105,
      address: '456 Care Blvd, Healing Town',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        '4 appts', 'No appts', 'No appts', 'No appts', '2 appts',
        'No appts', 'No appts', '1 appt', 'No appts', 'No appts','No appts', '3 appts','No appts', '3 appts'
      ],
    },
    {
      id: 20,
      name: 'Olivia Scott, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.89,
      reviews: 95,
      address: '567 Wellness Rd, Healthy City',
      lat: 40.7128 + Math.random() * 0.02 - 0.01, 
      lng: -74.0060 + Math.random() * 0.02 - 0.01, 
      availability: [
        'No appts', '2 appts', 'No appts', 'No appts', 'No appts',
        '3 appts', 'No appts', 'No appts', 'No appts', '4 appts','No appts', '3 appts','No appts', '3 appts'
      ],
    }
  ];
  

  export default expertsData;