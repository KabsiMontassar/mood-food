// import React, { useState } from 'react';
// import {
//   Grid,
//   GridItem,
//   Icon,
//   Tabs,
//   Tab,
//   TabPanels,
//   Button,
//   TabPanel,
//   TabIndicator,
//   TabList
// } from '@chakra-ui/react';
// import appointementsdata from '../Data/appointementsdata';
// import OrdersData from '../Data/OrdersData';
// import EditPasswordForm from '../components/ProfileSections/EditPasswordForm';
// import EditProfileForm from '../components/ProfileSections/EditProfileForm';
// import AppointmentAccordion from '../components/ProfileSections/AppointmentAccordion';
// import Calendar from '../components/ProfileSections/Calendar';
// import Consultations from '../components/ProfileSections/Consultations';
// import ExpertDetailsProfile from '../components/ProfileSections/ExpertDetailsProfile';
// import ExpertDataProfile from '../components/ProfileSections/ExpertDataProfile';
// import OrdersAccordion from '../components/ProfileSections/OrdersAccordion';
// import Newsletter from '../components/ProfileSections/Newsletter';
// import UserData from '../components/ProfileSections/UserData';
// import { LockIcon } from '@chakra-ui/icons';
// import { FaUser, FaShoppingCart } from 'react-icons/fa';
// import { GoInbox } from "react-icons/go";
// import { CiCalendar } from "react-icons/ci";

// const Profile = () => {


//   const [UserStatus, setUserStatus] = useState('Expert');
//   const [selectedTabIndex, setSelectedTabIndex] = useState(0);



//   const handleTabChange = (index) => {
//     setSelectedTabIndex(index);
//   };


//   const clienttabs = [
//     { icon: FaUser, title: 'Profile', Component: <EditProfileForm /> },
//     { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
//     { icon: FaShoppingCart, title: 'Orders', Component: <OrdersAccordion OrdersData={OrdersData} /> },
//     { icon: GoInbox, title: 'Appointments', Component: <AppointmentAccordion appointmentsData={appointementsdata} /> },
//   ];

//   const experttabs = [
//     { icon: FaUser, title: 'ExpertsDetails', Component: <ExpertDetailsProfile /> },
//     { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
//     { icon: GoInbox, title: 'Consultations', Component: <Consultations /> },
//     { icon: CiCalendar, title: 'Calendar', Component: <Calendar /> },

//   ];
//   const tabs = UserStatus === 'Client' ? clienttabs : experttabs;

//   return (
//     <>
//       {/* <Button w='100%'
//             onClick={() => {
//               if (UserStatus === 'Client') {
//                 setUserStatus('Expert');
//               }
//               else {
//                 setUserStatus('Client');
//               }
//             }
//             }
//             colorScheme={UserStatus === 'Client' ? 'teal' : 'gray'}>
//             {UserStatus === 'Client' ? 'Expert' : 'Client'}
//           </Button> */}
//       <Grid
//         templateAreas={{ base: '"nav" "main" "footer"', md: '"nav main" "nav footer"' }}
//         gridTemplateColumns={{ md: '1fr 3fr' }}
//         gap={3}
//         color="blackAlpha.700"
//       >

//         <GridItem pl={{ base: 2, md: 4 }} mb={3} boxShadow="md" area={'nav'}>







//             {UserStatus === 'Client' ? <UserData /> : <ExpertDataProfile />}

//         </GridItem>

//         <GridItem pl={{ base: 2, md: 4 }} area={'main'} boxShadow="md">
//           <Tabs onChange={handleTabChange} align='center'>
//             <TabList borderBottom="1px solid #38B2AC" gap={1}>
//               {tabs.map((tab, index) => (
//                 <Tab
//                   key={index}
//                   border={selectedTabIndex === index ? '1px solid #38B2AC' : '1px solid #DDDDDD'}
//                   borderBottom={0}
//                   w={{ base: '25%', md: '15%' }}
//                   _selected={{
//                     border: '1px solid #38B2AC',
//                     borderBottom: '0px solid #38B2AC',
//                     borderTop: '3px solid #38B2AC',
//                   }}
//                 >
//                   <Icon
//                     height={{ base: 6, md: 7 }}
//                     fontSize='lg'
//                     color={selectedTabIndex === index ? '#38B2AC' : 'gray.300'}
//                     as={tab.icon}
//                   />
//                 </Tab>
//               ))}
//             </TabList>
//             <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
//             <TabPanels>
//               {tabs.map((tab, index) => (
//                 <TabPanel key={index}>{tab.Component}</TabPanel>
//               ))}
//             </TabPanels>
//           </Tabs>
//         </GridItem>
//       </Grid>
//       <Newsletter />
//     </>
//   );
// };

// export default Profile;


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
  TabList,
  Box,
  Flex,
  Text,
  Avatar,
  Badge,
  SimpleGrid,
  Stack,

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
import UserTracks from '../components/ProfileSections/UserTracks';
import Newsletter from '../components/ProfileSections/Newsletter';
import UserData from '../components/ProfileSections/UserData';
import { LockIcon, EditIcon } from '@chakra-ui/icons';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { GoInbox } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";



import {
  Circle,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input

} from '@chakra-ui/react'









const Profile = () => {


  const UserStatus = 'Client';
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const btnRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);




  const handleTabChange = (index) => {
    setSelectedTabIndex(index);
  };


  const clienttabs = [

    { icon: EditIcon, title: 'ProfileEdit', Component: <EditProfileForm /> },
    { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
    { icon: FaShoppingCart, title: 'Orders', Component: <OrdersAccordion OrdersData={OrdersData} /> },
    { icon: GoInbox, title: 'Appointments', Component: <AppointmentAccordion appointmentsData={appointementsdata} /> },
  ];

  const experttabs = [

    { icon: EditIcon, title: 'ProfileEdit', Component: <ExpertDetailsProfile /> },
    { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
    { icon: GoInbox, title: 'Consultations', Component: <Consultations appointmentsData={appointementsdata} /> },
    { icon: CiCalendar, title: 'Calendar', Component: <Calendar appointmentsData={appointementsdata} /> },

  ];
  const tabs = UserStatus === 'Client' ? clienttabs : experttabs;

  return (
    <>

      <Box bg="gray.50"
        p={3}
        align="center" >

        {UserStatus === 'Client' &&
          <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
              Open
            </Button>
            <Drawer
              size="sm"
              isOpen={isOpen}
              placement='left'
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent bg="gray.50"
                borderRadius="md" >
                <DrawerCloseButton />
                <DrawerHeader textAlign={"center"}>User Tracks</DrawerHeader>

                <DrawerBody>
                  <UserData />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme='blue'>Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        }
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
              Dr. Sara (Shivani) Pareek, DMD
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
