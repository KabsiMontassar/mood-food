


const appointementsdata = [
    {
        id: 1,
        Specialist: "Dr. John Doe",
        Date: "12/12/2021 10:00 AM - 11:00 AM",
        Status: "Pending",
        ApointementType: "Annual checkup",
        raison: "I am feeling sick",
    },
    {
        id: 2,
        Specialist: "Dr. John Doe",
        Date: "12/12/2021 10:00 AM - 11:00 AM",
        Status: "Pending",
        ApointementType: "Annual checkup",
        raison: "I am feeling sick",
    },
    {
        id: 3,
        Specialist: "Dr. John Doe",
        Date: "12/12/2021 10:00 AM - 11:00 AM",
        Status: "Rejected",
        ApointementType: "Annual checkup",
        raison: "I am feeling sick",
    },
    {
        id: 4,
        Specialist: "Dr. John Doe",
        Date: "12/12/2021 10:00 AM - 11:00 AM",
        Status: "Completed",
        ApointementType: "Annual checkup",
        raison: "I am feeling sick",
    },
    {
        id: 5,
        Specialist: "Dr. John Doe",
        Date: "12/12/2021 10:00 AM - 11:00 AM",
        Status: "Pending",
        ApointementType: "Annual checkup",
        raison: "I am feeling sick",
    }
   
];


export default appointementsdata;







const data1 = {
    username: 'Dr. Sara (Shivani) Pareek, DMD',
    email: 'sara@test.com',
    specialite: 'Nutritionist',
    role: 'Expert',
    phone: ['22 222 222', '22 222 222'],
    gender: 'Female',
    dob: '2003-11-11',
    experience: [
       {
        title: 'Nutritionist',
        years: '5',
       },
        {
          title: 'Dietitian',
          years: '5',
        },
    ],
    description : "I am a nutritionist with 5 years of experience in the field of nutrition. I have a degree in nutrition and dietetics from the University of New York. I have worked with many clients and helped them achieve their health goals. I believe that good nutrition is the key to a healthy life. I am passionate about helping people improve their health through good nutrition. I offer personalized nutrition plans to help my clients achieve their health goals. I am committed to providing the best possible care to my clients and helping them live a healthy life.",
    rateTotal:  3,
    reviews:  [{
      iduser : 1,
      commentaire : "this is a good expert",
      rating : 2.5,
      date : "2021-08-01"
    },{
      iduser : 2,
      commentaire : "this is a good expert",
      rating : 1.5,
      date : "2021-08-01"
    },{
      iduser : 3,
      commentaire : "this is a good expert",
      rating : 5,
      date : "2021-08-01"
    }],
    schedule : [
      {day : 'Monday', starttime : '08:00', endtime : '12:00', enabled : true},
      {day : 'Tuesday', starttime : '08:00', endtime : '12:00' , enabled : true},
      {day : 'Wednesday', starttime : '08:00', endtime : '12:00' , enabled : true},
      {day : 'Thursday', starttime : '08:00', endtime : '12:00' , enabled : true},
      {day : 'Friday', starttime : '08:00', endtime : '12:00' , enabled : true},
      {day : 'Saturday', starttime : '08:00', endtime : '12:00' , enabled : true},
      {day : 'Sunday', starttime : '08:00', endtime : '12:00' , enabled : true},
    ],
    location : {
      address :  'ariana, tunis',
      zone : 'Ariana',
      coordinates : {
      lat : 36.866346,
      lng : 10.164650
      }
    },
  
  }
  
  
  const clientData1 = {
    username: 'Montassar',
    email: 'montassar@test.com',
    role: 'Client',
    phone: '22 222 222',
    dob: '2003-11-11',
    gender: 'Male',
    address: 'Ariana, Tunis',
    Progress : [
      { 
        date : '2022 - 01 - 01',
        poidtotale : 80,
        massemusculaire : 50,
        massecalcique : 30,
        pourcentageeau : 40,
      },
      {
        date : '2022 - 02 - 01',
        poidtotale : 70,
        massemusculaire : 40,
        massecalcique : 20,
        pourcentageeau : 30,
  
      },
      {
        date : '2022 - 03 - 01',
        poidtotale : 60,
        massemusculaire : 30,
        massecalcique : 10,
        pourcentageeau : 20,
      }
    ]
  
  }
  
  