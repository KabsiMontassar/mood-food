const expertsData = [
    {
      name: 'Ana Raquel Degrazia, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.91,
      reviews: 56,
      address: '123 Health St, Wellness City',
      availability: [
        'No appts', 'No appts', 'No appts', 'No appts', 'No appts',
        'No appts', 'No appts', 'No appts', 'No appts', '3 appts'
      ],
    },
    {
      name: 'Tanya Dwyer, NP - C',
      expertise: 'Family Nurse Practitioner',
      rating: 4.91,
      reviews: 110,
      address: '456 Care Blvd, Healing Town',
      availability: [
        '2 appts', 'No appts', 'No appts', 'No appts', 'No appts',
        '7 appts', '6 appts', 'No appts', '1 appt', '8 appts'
      ],
    },
    {
      name: 'Michael Hopkins, MD',
      expertise: 'General Practitioner',
      rating: 4.75,
      reviews: 89,
      address: '789 Wellness Ave, Healthy City',
      availability: [
        '1 appt', 'No appts', 'No appts', '3 appts', 'No appts',
        '5 appts', 'No appts', '2 appts', 'No appts', '7 appts'
      ],
    },
    {
      name: 'Sandra Lee, DO',
      expertise: 'Pediatrician',
      rating: 4.82,
      reviews: 120,
      address: '321 Care Rd, Healing Town',
      availability: [
        'No appts', '2 appts', 'No appts', 'No appts', '4 appts',
        'No appts', 'No appts', '1 appt', 'No appts', '6 appts'
      ],
    },
    {
      name: 'David Nguyen, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.90,
      reviews: 78,
      address: '654 Health Blvd, Wellness City',
      availability: [
        '3 appts', 'No appts', 'No appts', 'No appts', 'No appts',
        '4 appts', 'No appts', 'No appts', '2 appts', 'No appts'
      ],
    },
    {
      name: 'Maria Martinez, PA-C',
      expertise: 'Physician Assistant',
      rating: 4.85,
      reviews: 65,
      address: '987 Recovery St, Wellness City',
      availability: [
        'No appts', 'No appts', '1 appt', 'No appts', 'No appts',
        'No appts', 'No appts', '3 appts', 'No appts', '5 appts'
      ],
    },
    {
      name: 'James Carter, MD',
      expertise: 'Cardiologist',
      rating: 4.92,
      reviews: 102,
      address: '222 Heart Ln, Cardio Town',
      availability: [
        '4 appts', 'No appts', 'No appts', 'No appts', 'No appts',
        '5 appts', '1 appt', 'No appts', 'No appts', '6 appts'
      ],
    },
    {
      name: 'Lisa Wu, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.88,
      reviews: 99,
      address: '111 Health St, Wellness City',
      availability: [
        'No appts', '3 appts', 'No appts', 'No appts', 'No appts',
        '4 appts', 'No appts', '2 appts', 'No appts', '7 appts'
      ],
    },
    {
      name: 'Robert Allen, DO',
      expertise: 'Family Medicine',
      rating: 4.87,
      reviews: 85,
      address: '333 Care Blvd, Healing Town',
      availability: [
        '2 appts', 'No appts', 'No appts', 'No appts', '5 appts',
        'No appts', 'No appts', 'No appts', '1 appt', '4 appts'
      ],
    },
    {
      name: 'Emily Johnson, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.89,
      reviews: 72,
      address: '444 Wellness Rd, Healthy City',
      availability: [
        'No appts', '2 appts', 'No appts', 'No appts', '3 appts',
        'No appts', 'No appts', 'No appts', '4 appts', 'No appts'
      ],
    },
    {
      name: 'Richard Brown, MD',
      expertise: 'Dermatologist',
      rating: 4.93,
      reviews: 145,
      address: '555 Skin St, Dermatology Town',
      availability: [
        '1 appt', 'No appts', 'No appts', '5 appts', 'No appts',
        'No appts', '3 appts', 'No appts', 'No appts', '8 appts'
      ],
    },
    {
      name: 'Katherine Taylor, PA-C',
      expertise: 'Physician Assistant',
      rating: 4.80,
      reviews: 60,
      address: '666 Wellness Blvd, Wellness City',
      availability: [
        'No appts', 'No appts', '2 appts', 'No appts', 'No appts',
        '3 appts', 'No appts', 'No appts', 'No appts', '4 appts'
      ],
    },
    {
      name: 'Steven Harris, MD',
      expertise: 'Orthopedic Surgeon',
      rating: 4.95,
      reviews: 134,
      address: '777 Joint Ave, Orthopedic City',
      availability: [
        '3 appts', 'No appts', 'No appts', 'No appts', 'No appts',
        '5 appts', 'No appts', '2 appts', 'No appts', 'No appts'
      ],
    },
    {
      name: 'Karen Rodriguez, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.86,
      reviews: 91,
      address: '888 Care Blvd, Healing Town',
      availability: [
        'No appts', '4 appts', 'No appts', 'No appts', 'No appts',
        '6 appts', 'No appts', 'No appts', 'No appts', '3 appts'
      ],
    },
    {
      name: 'Jason Clark, MD',
      expertise: 'General Practitioner',
      rating: 4.84,
      reviews: 77,
      address: '999 Health Rd, Wellness City',
      availability: [
        'No appts', 'No appts', 'No appts', '4 appts', 'No appts',
        'No appts', '3 appts', 'No appts', 'No appts', '5 appts'
      ],
    },
    {
      name: 'Laura Lewis, DO',
      expertise: 'Pediatrician',
      rating: 4.82,
      reviews: 109,
      address: '123 Wellness Blvd, Wellness City',
      availability: [
        '1 appt', 'No appts', 'No appts', '2 appts', 'No appts',
        'No appts', '4 appts', 'No appts', 'No appts', 'No appts'
      ],
    },
    {
      name: 'John White, MD',
      expertise: 'Cardiologist',
      rating: 4.90,
      reviews: 88,
      address: '234 Heart Ln, Cardio Town',
      availability: [
        'No appts', '3 appts', 'No appts', 'No appts', 'No appts',
        '4 appts', 'No appts', 'No appts', '1 appt', '6 appts'
      ],
    },
    {
      name: 'Samantha Young, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.88,
      reviews: 82,
      address: '345 Health St, Wellness City',
      availability: [
        'No appts', 'No appts', 'No appts', 'No appts', '3 appts',
        'No appts', 'No appts', '5 appts', 'No appts', 'No appts'
      ],
    },
    {
      name: 'Matthew King, DO',
      expertise: 'Family Medicine',
      rating: 4.87,
      reviews: 105,
      address: '456 Care Blvd, Healing Town',
      availability: [
        '4 appts', 'No appts', 'No appts', 'No appts', '2 appts',
        'No appts', 'No appts', '1 appt', 'No appts', 'No appts'
      ],
    },
    {
      name: 'Olivia Scott, NP',
      expertise: 'Nurse Practitioner',
      rating: 4.89,
      reviews: 95,
      address: '567 Wellness Rd, Healthy City',
      availability: [
        'No appts', '2 appts', 'No appts', 'No appts', 'No appts',
        '3 appts', 'No appts', 'No appts', 'No appts', '4 appts'
      ],
    }
  ];
  

  export default expertsData;