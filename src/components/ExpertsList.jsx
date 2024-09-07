import React, { useEffect, useState } from 'react';
import {
  Box, Input, Flex, Button, Text, Select, useColorModeValue, IconButton, VStack, HStack
} from '@chakra-ui/react';
import expertsData from '../Data/expertsData.jsx';
import SelectedExpertModal from './RendezvousModals/selectedExpertModal.jsx';
import ConfirmationModal from './RendezvousModals/ConfirmationModal.jsx';
import Expert from './Expert';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

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

  const openConfirmationModal = (slot) => {
    setSelectedSlot(slot);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedSlot(null);
  };

  useEffect(() => {
    setTime(generateTime());
  }, []);

  return (
    <Flex spacing={4} align="flex-start">

      <VStack
        spacing={4}
        align="stretch"
        flex="1"
        overflowY="auto"
        p={4}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
       {/*  part1 */}
        <Flex
        
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="center"
          alignItems="center"
          gap={4}
          mb={6}
          
        >
          <Input
            border={0}
            borderRadius="md"
            bg={useColorModeValue('white', '#2D3748')}
            placeholder="Search by name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            focusBorderColor="green.500"
          />
          <Input
            border={0}
            borderRadius="md"
            bg={useColorModeValue('white', '#2D3748')}
            placeholder="Search by address"
            value={searchAddress}
            onChange={e => setSearchAddress(e.target.value)}
            focusBorderColor="green.500"
          />
          <Select
            border={0}
            borderRadius="md"
            bg={useColorModeValue('white', '#2D3748')}
            value={selectedType}
            onChange={e => {
              setSelectedType(e.target.value);
              setSelectedSubType('All');
            }}
            focusBorderColor="green.500"
          >
            <option value="All">All</option>
            <option value="Nutritionist">Nutritionist</option>
            <option value="Psychologist">Psychologist</option>
          </Select>

          {selectedType === 'Psychologist' && (
            <Select
              border={0}
              borderRadius="md"
              bg={useColorModeValue('white', '#2D3748')}
              value={selectedSubType}
              onChange={e => setSelectedSubType(e.target.value)}
              focusBorderColor="green.500"
            >
              <option value="All">All</option>
              {psychologistTypes.map((subType, index) => (
                <option key={index} value={subType}>{subType}</option>
              ))}
            </Select>
          )}
        </Flex>
  {/*  part2 */}
        <Flex w="full" alignItems="center" justifyContent="space-between" mb={4}>
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
        <HStack spacing={4} align="flex-start" flex="1">
        <Flex direction="column" mb={{ base: 6, md: 0 }} flex="0 0 65%">
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
              _hover={{ bg: 'green.500' }}
              bg="transparent"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Text color="gray.600">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              borderRadius={5}
              _hover={{ bg: 'green.500' }}
              bg="transparent"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Flex>
        </Flex>
   
        <Box
         
          height={{ base: 'auto', md: '100%' }}
          position="fixed" 
          bg="gray.100" 
          w="35%"
          borderRadius={5}
          right={0}
          overflowY="auto"
          p={8}
        >
        
        
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Your Appointment Details
          </Text>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Issue: {issue}
          </Text>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Type: {type}
          </Text>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Date: {selectedSlot || "None"}
          </Text>
          <Button
            borderRadius={5}
            _hover={{ bg: 'green.500' }}
            bg="transparent"
            onClick={closeConfirmationModal}
          >
            Change Appointment
          </Button>
        </Box>

      </HStack>
</VStack>

      {selectedExpert && (
        <SelectedExpertModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          selectedExpert={selectedExpert}
          daysOfWeekWithDates={time}
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
    </Flex>
  );
};

export default ExpertsList;
