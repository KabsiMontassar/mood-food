import React, { useState } from 'react';
import {
  Grid,
  GridItem,
  Icon,
  Tabs,
  Tab,
  TabPanels,
  Button,
  TabPanel,
  TabIndicator,
  TabList
} from '@chakra-ui/react';
import appointementsdata from '../Data/appointementsdata';
import OrdersData from '../Data/OrdersData';
import EditPasswordForm from '../components/ProfileSections/EditPasswordForm';
import EditProfileForm from '../components/ProfileSections/EditProfileForm';
import AppointmentAccordion from '../components/ProfileSections/AppointmentAccordion';
import Calendar from '../components/ProfileSections/Calendar';
import Consultations from '../components/ProfileSections/Consultations';
import ExpertDetailsProfile from '../components/ProfileSections/ExpertDetailsProfile';
import ExpertDataProfile from '../components/ProfileSections/ExpertDataProfile';
import OrdersAccordion from '../components/ProfileSections/OrdersAccordion';
import Newsletter from '../components/ProfileSections/Newsletter';
import UserData from '../components/ProfileSections/UserData';
import { LockIcon } from '@chakra-ui/icons';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { GoInbox } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";

const Profile = () => {


  const [UserStatus, setUserStatus] = useState('Expert');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);



  const handleTabChange = (index) => {
    setSelectedTabIndex(index);
  };


  const clienttabs = [
    { icon: FaUser, title: 'Profile', Component: <EditProfileForm /> },
    { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
    { icon: FaShoppingCart, title: 'Orders', Component: <OrdersAccordion OrdersData={OrdersData} /> },
    { icon: GoInbox, title: 'Appointments', Component: <AppointmentAccordion appointmentsData={appointementsdata} /> },
  ];

  const experttabs = [
    { icon: FaUser, title: 'ExpertsDetails', Component: <ExpertDetailsProfile /> },
    { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
    { icon: GoInbox, title: 'Consultations', Component: <Consultations /> },
    { icon: CiCalendar, title: 'Calendar', Component: <Calendar /> },

  ];
  const tabs = UserStatus === 'Client' ? clienttabs : experttabs;

  return (
    <>
      {/* <Button w='100%'
            onClick={() => {
              if (UserStatus === 'Client') {
                setUserStatus('Expert');
              }
              else {
                setUserStatus('Client');
              }
            }
            }
            colorScheme={UserStatus === 'Client' ? 'teal' : 'gray'}>
            {UserStatus === 'Client' ? 'Expert' : 'Client'}
          </Button> */}
      <Grid
        templateAreas={{ base: '"nav" "main" "footer"', md: '"nav main" "nav footer"' }}
        gridTemplateColumns={{ md: '1fr 3fr' }}
        gap={3}
        color="blackAlpha.700"
      >

        <GridItem pl={{ base: 2, md: 4 }} mb={3} boxShadow="md" area={'nav'}>
       
        

        



            {UserStatus === 'Client' ? <UserData /> : <ExpertDataProfile />}
        
        </GridItem>
      
        <GridItem pl={{ base: 2, md: 4 }} area={'main'} boxShadow="md">
          <Tabs onChange={handleTabChange} align='center'>
            <TabList borderBottom="1px solid #38B2AC" gap={1}>
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
            <TabPanels>
              {tabs.map((tab, index) => (
                <TabPanel key={index}>{tab.Component}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
      <Newsletter />
    </>
  );
};

export default Profile;
