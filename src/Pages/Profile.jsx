import React, { useState } from 'react';
import {
  Icon,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  TabList,
  Box,
  Flex,
  Text,
  Avatar,
  Circle
} from '@chakra-ui/react';
import appointementsdata from '../Data/appointementsdata';
import OrdersData from '../Data/OrdersData';
import EditPasswordForm from '../components/ProfileSections/EditPasswordForm';
import EditProfileForm from '../components/ProfileSections/EditProfileForm';
import AppointmentAccordion from '../components/ProfileSections/AppointmentAccordion';
import Calendar from '../components/ProfileSections/Calendar';
import Consultations from '../components/ProfileSections/Consultations';
import ExpertDetailsProfile from '../components/ProfileSections/ExpertDetailsProfile';
import OrdersAccordion from '../components/ProfileSections/OrdersAccordion';
import Newsletter from '../components/ProfileSections/Newsletter';
import { LockIcon } from '@chakra-ui/icons';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { GoInbox } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";




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














const Profile = () => {
  var data ,tabs ; 
const UserStatus = 'Expert';
const [selectedTabIndex, setSelectedTabIndex] = useState(0);

const handleTabChange = (index) => {
  setSelectedTabIndex(index);
};


if (UserStatus === 'Expert') {
  data = data1;
} else {
  data = clientData1;
}




const clienttabs = [

  { icon: FaUser, title: 'ProfileEdit', Component: <EditProfileForm  data={data}  /> },
  { icon: LockIcon, title: 'Password', Component: <EditPasswordForm   /> },
  { icon: FaShoppingCart, title: 'Orders', Component: <OrdersAccordion OrdersData={OrdersData} /> },
  { icon: GoInbox, title: 'Appointments', Component: <AppointmentAccordion appointmentsData={appointementsdata} /> },
];

const experttabs = [

  { icon: FaUser, title: 'ProfileEdit', Component: <ExpertDetailsProfile data={data}  /> },
  { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
  { icon: GoInbox, title: 'Consultations', Component: <Consultations appointmentsData={appointementsdata} /> },
  { icon: CiCalendar, title: 'Calendar', Component: <Calendar appointmentsData={appointementsdata} /> },

];

if (UserStatus === 'Expert') {
 tabs = experttabs;
} else {
   tabs = clienttabs;
}



  return (
    <>

      <Box bg="gray.50"
        p={3}
        align="center" >
        <Flex bg="white"
          p={6}
          mt={10}
          boxShadow={{ base: 'none', md: 'xl' }}
          borderRadius="md"
          w={{ base: '100%', md: '80%' }}
          gap={4}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          position="relative"
          overflow={"hidden"}
        >
          <Avatar
            align="center"
            name="Montassar"
            size={{ base: 'xl', md: '2xl' }}
            border="2px solid #cccfcd"
            src={`https://i.pravatar.cc/150?img=1`}
            mb={{ base: 4, md: 0 }}
            w={{ base: '100px', md: '200px' }}
            h={{ base: '100px', md: '200px' }}
          />
          <Circle
            size="300px"
            bg="#019874"
            opacity="0.3"
            position="absolute"
            right="-10"
            top="-150"
            display={{ base: 'none', md: 'block' }}
          />
          <Circle
            size="300px"
            bg="#019874"
            position="absolute"
            right="-90"
            top="-10"
            opacity="0.5"
            display={{ base: 'none', md: 'block' }}
          />

          <Circle
            size="300px"
            bg="#019874"
            position="absolute"
            left="-90"
            bottom="-10"
            opacity="0.5"
            display={{ base: 'none', md: 'block' }}
          />
          <Circle
            size="300px"
            bg="#019874"
            opacity="0.3"
            position="absolute"
            left="-10"
            bottom="-150"
            display={{ base: 'none', md: 'block' }}
          />
          <Box>
            <Text color="teal.400" textAlign="center" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
               {data.username}
            </Text>
          </Box>
        </Flex>


        <Tabs
          boxShadow={{ base: 'none', md: 'xl' }}
          borderRadius="md"
          bg="white" mt={10} w={{ base: '100%', md: '80%' }}
          onChange={handleTabChange} align='center'>
          <TabList pt={5} borderBottom="1px solid #38B2AC" gap={1}>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                border={selectedTabIndex === index ? '1px solid #38B2AC' : '1px solid #DDDDDD'}
                borderBottom={0}
                w={{ base: '25%', md: '15%' }}
                _selected={{
                  border: '1px solid #38B2AC',
                  borderBottom: '0px solid #38B2AC',
                  borderTop: '3px solid #38B2AC',
                }}
              >
                <Icon
                  height={{ base: 6, md: 7 }}
                  fontSize='lg'
                  color={selectedTabIndex === index ? '#38B2AC' : 'gray.300'}
                  as={tab.icon}
                />
              </Tab>
            ))}
          </TabList>
          <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
          <TabPanels  >

            {tabs.map((tab, index) => (
              <TabPanel w={{
                base: '100%', md: '80%'
              }} key={index}>{tab.Component} </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
      <Newsletter />
    </>
  );
};

export default Profile;
