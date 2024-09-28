import React, { useEffect, useState } from 'react';
import {
  Box, Flex, Button, Text, Select, IconButton, VStack, FormLabel, FormControl,
} from '@chakra-ui/react';
import { db } from '../firebaseConfig.jsx';
import { collection, query, where, limit, getDocs, startAfter,Timestamp  } from 'firebase/firestore';
import SelectedExpertModal from '../components/RendezvousModals/selectedExpertModal.jsx';
import Expert from './Expert';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const TunisGovernorates = [
  'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine',
  'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid',
  'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan',
];

const NavSearch = ({ searchAddress, setSearchAddress, selectedType, setSelectedType, selectedSubType, setSelectedSubType, psychologistTypes }) => (
  <Flex
    borderBottomWidth={1}
    flexDirection={{ base: 'column', md: 'row' }}
    justifyContent="center"
    alignItems="center"
    gap={4}
    top="0"
    zIndex="10"
    bg='gray.50'
  >
    <FormControl variant="floating" id="Address">
      <FormLabel>Gouvernorat:</FormLabel>
      <Select
        border={0}
        borderRadius="md"
        bg='white'
        value={searchAddress}
        onChange={e => setSearchAddress(e.target.value)}
        focusBorderColor="green.500"
      >
        <option value="">Tous</option>
        {TunisGovernorates.map((governorate, index) => (
          <option key={index} value={governorate}>{governorate}</option>
        ))}
      </Select>
    </FormControl>
    <FormControl variant="floating" id="Address">
      <FormLabel>Type:</FormLabel>
      <Select
        border={0}
        borderRadius="md"
        bg='white'
        value={selectedType}
        onChange={e => {
          setSelectedType(e.target.value);
          setSelectedSubType('All');
        }}
        focusBorderColor="green.500"
      >
        <option value="All">Tous</option>
        <option value="Nutritionist">Nutritionist</option>
        <option value="Psychologist">Psychologist</option>
      </Select>
    </FormControl>
    {selectedType === 'Psychologist' && (
      <FormControl variant="floating" id="Address">
        <FormLabel>Filtrer par:</FormLabel>
        <Select
          border={0}
          borderRadius="md"
          bg='white'
          value={selectedSubType}
          onChange={e => setSelectedSubType(e.target.value)}
          focusBorderColor="green.500"
        >
          <option value="All">All</option>
          {psychologistTypes.map((subType, index) => (
            <option key={index} value={subType}>{subType}</option>
          ))}
        </Select>
      </FormControl>
    )}
  </Flex>
);

const TimeChanger = ({ time, CountedClick, jumptwoweektocurrenttime, jumpbacktwoweeks }) => (
  <Flex borderBottomWidth={1} p={4} w="full" alignItems="center" justifyContent="space-between" mb={4}>
    <Flex flexGrow={1} justifyContent="center">
      <Text color="gray.600">
        {time[0]} - {time[13]}
      </Text>
    </Flex>
    <Flex>
      <IconButton
        boxSize={7}
        color="gray.500"
        bg="transparent"
        _hover={{ color: 'black', bg: 'transparent' }}
        as={ChevronLeftIcon}
        isDisabled={CountedClick === 0}
        onClick={jumpbacktwoweeks}
      />
      <IconButton
        boxSize={7}
        color="gray.500"
        bg="transparent"
        _hover={{ color: 'black', bg: 'transparent' }}
        as={ChevronRightIcon}
        isDisabled={CountedClick === 3}
        onClick={jumptwoweektocurrenttime}
      />
    </Flex>
  </Flex>
);

const Experts = ({ currentExperts, openModal, time, setCurrentPage, totalPages, currentPage }) => (
  <Flex direction={{ base: 'column', md: 'row' }}
    w="full"
    h="full"

    p={4}
    gap={4}>
    <Box  bg="white"
        flex="1"
        borderRadius={5}
        p={4}
        overflowY="auto">
      {currentExperts.map((expert, index) => (
        <Expert key={index} expert={expert} openModal={openModal} daysOfWeekWithDates={time} />
      ))}
      <Flex justify="space-between" mt={4} w="full">
        <Button
          borderRadius={5}
          _hover={{ bg: '#5EDABC' }}
          bg="transparent"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <Button
          borderRadius={5}
          _hover={{ bg: '#5EDABC' }}
          bg="transparent"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </Flex>
    </Box>
    <Box
      display={{ base: 'none', md: 'block' }}
      bg="white"
      borderRadius={5}
      w={{ base: '100%', md: '30%' }}
      p={8}
    >
      <iframe
        width="100%"
        height="100%"
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng'
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />

    </Box>
  </Flex>
);

const ExpertsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSubType, setSelectedSubType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [time, setTime] = useState([]);
  const [experts, setExperts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [CountedClick  , setCountedClick] = useState(0);

  const expertsPerPage = 5;

  const psychologistTypes = [
    'Clinical Psychologist', 'Neuropsychologist', 'Industrial-Organizational Psychologist',
    'Sports Psychologist', 'Developmental Psychologist', 'Social Psychologist', 'Cognitive Psychologist',
    'Psychotherapist',
  ];

  // Function to get the next 14 days' dates
  const calculateDates = (baseDate, offset) => {
    const dates = [];
    const startDate = new Date(baseDate);
    startDate.setDate(startDate.getDate() + offset);
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]); // 'YYYY-MM-DD' format
    }
    return dates;
  };

  const generateTime = () => calculateDates(new Date(), 0);

  const fetchExpertAvailability = async (expertId, time) => {
    const availability = [];
    
    for (const date of time) {
      
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0); // Start at 00:00:00
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999); // End at 23:59:59
  
      const startOfDayTimestamp = Timestamp.fromDate(startOfDay);
      const endOfDayTimestamp = Timestamp.fromDate(endOfDay);
  
      const rendezvousQuery = query(
        collection(db, 'rendezvous'),
        where('expertid', '==', expertId)
        ,where('date', '>=', startOfDayTimestamp),
        where('date', '<=', endOfDayTimestamp)
      );

     
  
      const snapshot = await getDocs(rendezvousQuery);
      const numberOfRdv = snapshot.size; // Number of rendezvous (appointments) for this date
     console.log(numberOfRdv)
      availability.push({
        date: date,
        numberofrdv: numberOfRdv,
      });
    }
  
    return availability;
  };

  const fetchExperts = async (page = 1, startAfterDoc = null) => {
    setLoading(true);

    try {
      let q = query(
        collection(db, 'users'),
        where('role', '==', 'Expert'),
        limit(expertsPerPage)
      );

      // Apply address, type, and subType filters
      if (searchAddress) q = query(q, where('address', '==', searchAddress));
      if (selectedType !== 'All') q = query(q, where('type', '==', selectedType));
      if (selectedSubType !== 'All') q = query(q, where('subType', '==', selectedSubType));

      // Apply pagination
      if (startAfterDoc) q = query(q, startAfter(startAfterDoc));

      const snapshot = await getDocs(q);
      const expertsData = snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id })); // Keep the uid
      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
      const firstVisibleDoc = snapshot.docs[0];

      const updatedExperts = await Promise.all(expertsData.map(async (expert) => {
        const availability = await fetchExpertAvailability(expert.uid, time);
        return { ...expert, availability }; 
      }));


      setExperts(updatedExperts);
      setLastVisible(lastVisibleDoc);
      setFirstVisible(firstVisibleDoc);
      setTotalPages(Math.ceil(snapshot.size / expertsPerPage));

    } catch (error) {
      console.error("Error fetching experts: ", error);
    }

    setLoading(false);
  };

  const jumptwoweektocurrenttime = () => {
    setTime(calculateDates(time[0], 14));
    setCountedClick(CountedClick + 1);
  };

  const jumpbacktwoweeks = () => {
    setTime(calculateDates(time[0], -14));
    setCountedClick(CountedClick - 1);
  };

  const openModal = (expert) => {
    setSelectedExpert(expert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExpert(null);
  };

  useEffect(() => {
    setTime(generateTime()); 
    fetchExperts(currentPage);

  

  




  }, [currentPage, searchAddress, selectedType, selectedSubType]);

  return (
    <Flex direction={{ base: 'column', md: 'row' }} spacing={4}>
      <VStack spacing={4} align="stretch" flex="1" overflowY="auto" p={4} bg='gray.50'>
        <NavSearch
          searchAddress={searchAddress}
          setSearchAddress={setSearchAddress}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedSubType={selectedSubType}
          setSelectedSubType={setSelectedSubType}
          psychologistTypes={psychologistTypes}
        />
        <TimeChanger
          time={time}
          CountedClick={CountedClick}
          jumptwoweektocurrenttime={jumptwoweektocurrenttime}
          jumpbacktwoweeks={jumpbacktwoweeks}
        />
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Experts
            currentExperts={experts}
            openModal={openModal}
            time={time}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        )}
      </VStack>
      {selectedExpert && (
        <SelectedExpertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedExpert={selectedExpert}
          daysOfWeekWithDates={time}
        />
      )}
    </Flex>
  );
};

export default ExpertsList;