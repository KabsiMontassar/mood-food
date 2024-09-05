import React, { useState } from 'react';
import {
  Box, Input, Flex, Button, Text, Select, useColorModeValue
} from '@chakra-ui/react';
import expertsData from '../Data/expertsData.jsx';
import SelectedExpertModal from './RendezvousModals/selectedExpertModal.jsx';
import ConfirmationModal from './RendezvousModals/ConfirmationModal.jsx';
import Expert from './Expert';

const ExpertsList = ({ issue, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSubType, setSelectedSubType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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

  const openConfirmationModal = (slot) => {
    setSelectedSlot(slot);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedSlot(null);
  };

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay() + 1; // Start of this week (Monday)
    const weekDates = [];
    let dateCounter = 0;

    for (let i = 0; dateCounter < 10; i++) {
      const date = new Date(today);
      date.setDate(startOfWeek + i);

      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays and Saturdays
        const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
        weekDates.push(formattedDate);
        dateCounter++;
      }
    }

    return weekDates;
  };

  const daysOfWeekWithDates = getWeekDates();

  return (
    <Box padding="4" maxW="70%" mx="auto">
      <Flex flexDirection={"row"}>
        <Input
          border={0}
          boxShadow={'lg'}
          borderRadius={'none'}
          bg={useColorModeValue('white', '#2D3748')}
          placeholder="Search by name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          mb={4}
          focusBorderColor='green.500'
          _focus={{
            border: 'none',
          }}
        />
        <Input
          border={0}
          boxShadow={'lg'}
          borderRadius={'none'}
          bg={useColorModeValue('white', '#2D3748')}
          placeholder="Search by address"
          value={searchAddress}
          onChange={e => setSearchAddress(e.target.value)}
          mb={4}
          focusBorderColor='green.500'
          _focus={{
            border: 'none',
          }}
        />
        <Select
          border={0}
          boxShadow={'lg'}
          borderRadius={'none'}
          bg={useColorModeValue('white', '#2D3748')}
          placeholder="Select expert type"
          value={selectedType}
          onChange={e => {
            setSelectedType(e.target.value);
            setSelectedSubType('All'); // Reset subtype when type changes
          }}
          mb={4}
          focusBorderColor='green.500'
          _focus={{
            border: 'none',
          }}
        >
          <option value="All">All</option>
          <option value="Nutritionist">Nutritionist</option>
          <option value="Psychologist">Psychologist</option>
        </Select>

        {selectedType === 'Psychologist' && (
          <Select
            border={0}
            boxShadow={'lg'}
            borderRadius={'none'}
            bg={useColorModeValue('white', '#2D3748')}
            placeholder="Select psychologist subtype"
            value={selectedSubType}
            onChange={e => setSelectedSubType(e.target.value)}
            mb={4}
            focusBorderColor='green.500'
            _focus={{
              border: 'none',
            }}
          >
            <option value="All">All</option>
            {psychologistTypes.map((subType, index) => (
              <option key={index} value={subType}>{subType}</option>
            ))}
          </Select>
        )}
      </Flex>
      {currentExperts.map((expert, index) => (
        <Expert key={index} expert={expert}
          openModal={openModal} daysOfWeekWithDates={daysOfWeekWithDates} />
      ))}

      <Flex justify="space-between" mt={4}>
        <Button
          boxShadow={'lg'}
          borderRadius={5}
      
      _hover={{ bg: 'green.500' }}
          bg="transparent"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text color='gray.600'>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          boxShadow={'lg'}
          borderRadius={5}
      
          _hover={{ bg: 'green.500' }}
          bg="transparent"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>

      {selectedExpert && (
        <SelectedExpertModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          selectedExpert={selectedExpert}
          daysOfWeekWithDates={daysOfWeekWithDates}
          openConfirmationModal={openConfirmationModal}
        />
      )}

      {selectedSlot && (
        <ConfirmationModal
          isConfirmationModalOpen={isConfirmationModalOpen}
          closeConfirmationModal={closeConfirmationModal}
          selectedSlot={selectedSlot}
          selectedExpert={selectedExpert}
          issue={issue}
          type={type}
        />
      )}
    </Box>
  );
};

export default ExpertsList;
