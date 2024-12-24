import React, { useState, useEffect, useRef } from 'react';
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
  Circle,
  Button,
  Input,
  useToast,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { MdUpload } from 'react-icons/md'; // Import an upload icon
import { MdDelete } from 'react-icons/md'; // Import a delete icon
import EditPasswordForm from '../components/ProfileSections/EditPasswordForm';
import EditProfileForm from '../components/ProfileSections/EditProfileForm';
import AppointmentAccordion from '../components/ProfileSections/AppointmentAccordion';
import Calendar from '../components/ProfileSections/Calendar';
import Consultations from '../components/ProfileSections/Consultations';
import ExpertDetailsProfile from '../components/ProfileSections/ExpertDetailsProfile';
import OrdersAccordion from '../components/ProfileSections/OrdersAccordion';
import Newsletter from '../components/ProfileSections/Newsletter';
import ClientProfile from '../components/ProfileSections/ClientProfile';
import ExpertProfile from '../components/ProfileSections/ExpertProfile';
import { LockIcon, EditIcon } from '@chakra-ui/icons';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { GoInbox } from "react-icons/go";
import { CiCalendar } from "react-icons/ci";
import { getFirestore, query, where, getDocs, collection,doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [avatarURL, setAvatarURL] = useState(null);
  const [OrdersData, setOrdersData] = useState([]);
  const [appointementsdata, setAppointementsData] = useState([]);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleTabChange = (index) => {
    setSelectedTabIndex(index);
  };

  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async (email) => {
      setLoading(true);
      try {
        const userQuery = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            setData(doc.data());
            setAvatarURL(doc.data().photo_url);
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchordersdata = async (uid) => {
      try {
   
        const user = doc(db, 'users', uid);
        const ordersquary = query(collection(db, 'commande') , where('user', '==', user));
        const ordersSnapshot = await getDocs(ordersquary);
        if (!ordersSnapshot.empty) {
          let orders = [];
          ordersSnapshot.forEach(doc => {
            orders.push({ ...doc.data(), id: doc.id  });
       
          });
          setOrdersData(orders);
        } else {
          console.log("No orders found in database.");
        }
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }

    };

    const fetchAppointementsData = async (uid) => {
      try {
        const user = doc(db, 'users', "aDj5067xNKdxCEK6flXSPLS3l0X2");
        const appointementsquary = query(collection(db, 'appointments') , where('patientRef', '==', user));
        const appointementsSnapshot = await getDocs(appointementsquary);
        if (!appointementsSnapshot.empty) {
          let appointements = [];
          appointementsSnapshot.forEach(doc => {
            appointements.push({ ...doc.data(), id: doc.id });
          });
          setAppointementsData(appointements);
        } else {
          console.log("No appointements found in database.");
        }
      } catch (error) {
        console.error("Error fetching appointements data:", error);
      }
    }














    const emailFromStorage = window.globalUserEmail; 
    const uidFromStorage = window.globalUserUid;

    if (emailFromStorage) {
      setUserEmail(emailFromStorage);
      fetchUserData(emailFromStorage);

      fetchordersdata(uidFromStorage);
      fetchAppointementsData(uidFromStorage);
    } else {
      console.log("No email found in local storage.");
      setLoading(false);
    }

    return () => {
      setData(null);
    };
  }, [db]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (avatarURL) {
        const oldAvatarRef = ref(storage, avatarURL);
        await deleteObject(oldAvatarRef)
          .then(() => {
            console.log("Old avatar deleted successfully.");
          })
          .catch((error) => {
            console.error("Error deleting old avatar:", error);
          });
      }

      const storageRef = ref(storage, `profilePictures/${userEmail}_${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setAvatarURL(downloadURL);
        await updateUserProfilePicture(downloadURL);
        toast({
          title: "Avatar updated.",
          description: "Your profile picture has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error uploading avatar:", error);
        toast({
          title: "Upload failed.",
          description: "There was an error uploading your profile picture.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const updateUserProfilePicture = async (url) => {
    const userQuery = query(collection(db, 'users'), where('email', '==', userEmail));
    const querySnapshot = await getDocs(userQuery);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { ProfilePicture: url });
      });
    }
  };

  const handleDeleteAvatar = async () => {
    if (avatarURL) {
      const oldAvatarRef = ref(storage, avatarURL);
      await deleteObject(oldAvatarRef)
        .then(async () => {
          console.log("Avatar deleted successfully.");
          setAvatarURL(null);
          await updateUserProfilePicture(null);
          toast({
            title: "Avatar deleted.",
            description: "Your profile picture has been removed.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("Error deleting avatar:", error);
          toast({
            title: "Delete failed.",
            description: "There was an error deleting your profile picture.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const clienttabs = [
    { icon: FaUser, title: 'Profile', Component: <ClientProfile data={data} /> },
    { icon: EditIcon, title: 'ProfileEdit', Component: <EditProfileForm data={data} setData={setData} /> },
    { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
    { icon: FaShoppingCart, title: 'Orders', Component: <OrdersAccordion OrdersData={OrdersData} /> },
    { icon: GoInbox, title: 'Appointments', Component: <AppointmentAccordion appointmentsData={appointementsdata} /> },
  ];

  const experttabs = [
    { icon: FaUser, title: 'Profile', Component: <ExpertProfile data={data} /> },
    { icon: EditIcon, title: 'ProfileEdit', Component: <ExpertDetailsProfile data={data} setData={setData} /> },
    { icon: LockIcon, title: 'Password', Component: <EditPasswordForm /> },
    { icon: GoInbox, title: 'Consultations', Component: <Consultations appointmentsData={appointementsdata} /> },
    { icon: CiCalendar, title: 'Calendar', Component: <Calendar appointmentsData={appointementsdata} /> },
  ];

  const tabs = data && data.role === 'Expert' ? experttabs : clienttabs;

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {loading ? (
        <Box align="center" textAlign="center" p={6}>
          <SkeletonCircle size="100px" mb={4} />
          <SkeletonText mt="4" noOfLines={2} spacing="4" />
          <Skeleton height="50px" mb={4} />
          <Skeleton height="50px" mb={4} />
          <Skeleton height="50px" mb={4} />
        </Box>
      ) : (
        <Box bg="gray.50" p={3} align="center">
          <Flex
            bg="white"
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
            overflow="hidden"
          >
            {/* Avatar container */}
            <Box position="relative">
              <Avatar
                align="center"
                name={data ? data.display_name : 'User'}
                size={{ base: 'xl', md: '2xl' }}
                border="2px solid #cccfcd"
                src={avatarURL}
                mb={{ base: 4, md: 0 }}
                w={{ base: '150px', md: '200px' }}
                h={{ base: '150px', md: '200px' }}
              />

              <Input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />


              <Button
                onClick={handleUploadClick} // Trigger the file input on click
                position="absolute"
                bottom="5"
                right="0"
                bg="teal.400"
                color="white"
                borderRadius="full"
                p={2}
                boxShadow="md"
                _hover={{ bg: "teal.500" }}
                aria-label="Upload Avatar"
                zIndex={1}
              >
                <MdUpload size={20}
                /> {/* Smaller Upload icon */}
              </Button>

              {/* Delete Button */}
              <Button
                onClick={handleDeleteAvatar} // Trigger delete avatar
                position="absolute"
                bottom="0"
                right="40px"
                bg="red.400"
                color="white"
                borderRadius="full"
                p={2}
                boxShadow="md"
                _hover={{ bg: "red.500" }}
                aria-label="Delete Avatar"
                zIndex={1}
              >
                <MdDelete size={20} /> {/* Smaller Delete icon */}
              </Button>
            </Box>

            {/* Decorative Circles */}
            <Circle size="300px" bg="#019874" opacity="0.3" position="absolute" right="-10" top="-150" display={{ base: 'none', md: 'block' }} />
            <Circle size="300px" bg="#019874" position="absolute" right="-90" top="-10" opacity="0.5" display={{ base: 'none', md: 'block' }} />
            <Circle size="300px" bg="#019874" position="absolute" left="-90" bottom="-10" opacity="0.5" display={{ base: 'none', md: 'block' }} />
            <Circle size="300px" bg="#019874" opacity="0.3" position="absolute" left="-10" bottom="-150" display={{ base: 'none', md: 'block' }} />

            {/* User Info */}
            <Box>
              <Text color="teal.400" textAlign="center" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                {data ? data.display_name : 'Loading...'}
              </Text>
              {userEmail && (
                <Text color="gray.600" textAlign="center" fontSize={{ base: 'md', md: 'lg' }} fontWeight="normal">
                  {userEmail}
                </Text>
              )}
            </Box>
          </Flex>


          <Tabs
            boxShadow={{ base: 'none', md: 'xl' }}
            borderRadius="md"
            bg="white"
            mt={10}
            w={{ base: '100%', md: '80%' }}
            onChange={handleTabChange}
            align='center'
          >
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
                  <Icon height={{ base: 6, md: 7 }} fontSize='lg' color={selectedTabIndex === index ? '#38B2AC' : 'gray.300'} as={tab.icon} />
                </Tab>
              ))}
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg='white' borderRadius='1px' />
            <TabPanels>
              {tabs.map((tab, index) => (
                <TabPanel w={{ base: '100%', md: '90%' }} key={index}>{tab.Component}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      )}
      <Newsletter />
    </>
  );
};

export default Profile;
