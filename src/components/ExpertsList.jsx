import React, { useEffect, useState } from 'react';
import {
  Box, Input, Flex, Button, Text, Select, IconButton, VStack, FormLabel, FormControl
} from '@chakra-ui/react';
import expertsData from '../Data/expertsData.jsx';
import SelectedExpertModal from '../components/RendezvousModals/selectedExpertModal.jsx';
import Expert from './Expert';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';


const TunisGovernorates = [
  'Ariana',
  'Beja',
  'Ben Arous',
  'Bizerte',
  'Gabes',
  'Gafsa',
  'Jendouba',
  'Kairouan',
  'Kasserine',
  'Kebili',
  'Kef',
  'Mahdia',
  'Manouba',
  'Medenine',
  'Monastir',
  'Nabeul',
  'Sfax',
  'Sidi Bouzid',
  'Siliana',
  'Sousse',
  'Tataouine',
  'Tozeur',
  'Tunis',
  'Zaghouan'
];


const NavSearch = ({ searchName, setSearchName, searchAddress, setSearchAddress, selectedType, setSelectedType, selectedSubType, setSelectedSubType, psychologistTypes }) => {
  return (

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
          onChange={e => {
            setSearchAddress(e.target.value);
          }}
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
          Placeholder="Type"
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
};

const TimeChanger = ({ time, CountedClick, jumptwoweektocurrenttime, jumpbacktwoweeks }) => {
  return (
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
};



const Experts = ({ currentExperts, openModal, time, setCurrentPage, totalPages, currentPage }) => {




  return (
    <Flex
      p={4}
      gap={4}
    >
      <Box
        bg="white"
        flex="1"
        borderRadius={5}
        p={4}
       

      >
        {currentExperts.map((expert, index) => (
          <Expert
            key={index}
            expert={expert}
            openModal={openModal}
            daysOfWeekWithDates={time}
          />
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
};



const ExpertsList = ({ issue, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSubType, setSelectedSubType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [time, setTime] = useState([]);
  const [CountedClick, setCountedClick] = useState(0);

  const calculateDates = (baseDate, offset) => {
    const dates = [];
    const startDate = new Date(baseDate);
    startDate.setDate(startDate.getDate() + offset);

    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
      dates.push(formattedDate);
    }

    return dates;
  };

  const generateTime = () => calculateDates(new Date(), 0);

  const jumptwoweektocurrenttime = () => {
    if (CountedClick === 3) return;
    setCountedClick(CountedClick + 1);
    setTime(calculateDates(time[0], 14));
  };

  const jumpbacktwoweeks = () => {
    if (CountedClick === 0) return;
    setCountedClick(CountedClick - 1);
    setTime(calculateDates(time[0], -14));
  };

  const expertsPerPage = 5;

  const psychologistTypes = [
    "Clinical Psychologist",
    "Neuropsychologist",
    "Industrial-Organizational Psychologist",
    "Sports Psychologist",
    "Developmental Psychologist",
    "Social Psychologist",
    "Cognitive Psychologist",
    "Psychotherapist"
  ];
  const filteredExperts = expertsData.filter(
    expert =>
      (searchName === '' || expert.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchAddress === '' || expert.address.toLowerCase().includes(searchAddress.toLowerCase())) &&
      (selectedType === 'All' || expert.type === selectedType) &&
      (selectedSubType === 'All' || expert.subType === selectedSubType)
  );

  const totalPages = Math.ceil(filteredExperts.length / expertsPerPage);
  const currentExperts = filteredExperts.slice(
    (currentPage - 1) * expertsPerPage,
    currentPage * expertsPerPage
  );

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
  }, []);

  return (
    <Flex direction={{ base: 'column', md: 'row' }} spacing={4}>
      <VStack
        spacing={4}
        align="stretch"
        flex="1"
        overflowY="auto"
        p={4}
        bg='gray.50'
      >
        <NavSearch
          searchName={searchName}
          setSearchName={setSearchName}
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
        <Experts
          currentExperts={currentExperts}
          openModal={openModal}
          time={time}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
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