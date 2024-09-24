import React, { useState } from 'react';
import { Box, Flex, Text, HStack, VStack, IconButton } from '@chakra-ui/react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';



import {
  Accordion,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,

  Icon,

} from '@chakra-ui/react';
import { FaUserMd, FaCalendarAlt, FaRegClock } from 'react-icons/fa';

const AppointmentAccordion = ({ appointmentsData }) => {
  return (
    <Box mt={5} px={{ base: 2, md: 4 }} w="100%" mx="auto">
      <Accordion allowMultiple>
        {appointmentsData.map((appointment, index) => (
          <AccordionItem mb={5} key={index} border="none">
            <AccordionButton
              boxShadow={"md"}
              bg="white"
              borderTopRadius="md"
              borderBottomRadius="md"
              _expanded={{
                bg: { Completed: 'green.100', Pending: '#FEFCBF', Rejected: 'red.100' }[appointment.Status],
                borderBottomRadius: 'none'
              }}
              p={4}
              fontSize={{ base: 'sm', md: 'md' }}
            >
              <Box as="span" flex="1" textAlign="left">
                <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>{appointment.Specialist}</Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">{appointment.Date}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel bg={{ Completed: 'green.100', Pending: '#FEFCBF', Rejected: 'red.100' }[appointment.Status]} pb={4} borderBottomRadius="md">
              <Box p={4}>
                <Flex mb={2} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
                  <Icon as={FaUserMd} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Specialist:</Text>
                  <Text color="gray.400" ml={2}>{appointment.Specialist}</Text>
                </Flex>
                <Flex mb={2} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
                  <Icon as={FaCalendarAlt} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Date:</Text>
                  <Text color="gray.400" ml={2}>{appointment.Date}</Text>
                </Flex>
                <Flex mb={2} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
                  <Icon as={FaRegClock} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Appointment Type:</Text>
                  <Text ml={2} color="gray.400">{appointment.ApointementType}</Text>
                </Flex>
                <Flex mb={2} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Reason:</Text>
                  <Text ml={2} color="gray.400">{appointment.raison}</Text>
                </Flex>
                <Flex flex="1" textAlign="right" flexDirection={{ base: 'column', md: 'row' }} gap={2} mt={8} justifyContent="space-between" alignItems="center">
                  <Button colorScheme="green" variant="outline" size="sm" onClick={() => console.log('Add Note')}>Add Note</Button>
                  <Button colorScheme="green" variant="outline" size="sm" onClick={() => console.log('Mark as Done')}>Mark as Done</Button>
                  <Button colorScheme="green" variant="outline" size="sm" onClick={() => console.log('Join call')}>Join call</Button>
                </Flex>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

const Calendar = ({ appointmentsData }) => {
  // Get today's date
  const today = new Date();

  // Track the currently selected day, month, year, and events
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth()); // 0-based index for months
  const [selectedYear, setSelectedYear] = useState(today.getFullYear()); // Initialize with the current year


  const appointementPendingOnly = appointmentsData.filter(appointment => appointment.Status === 'Completed');


  // Month and days data
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  // Days per month, adjust February for leap year
  const daysInMonth = (year) => [
    31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Populate events on component mount (mock data)

  // Handle month navigation
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11); // Loop back to December
      setSelectedYear((prev) => prev - 1); // Go to the previous year
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
    setSelectedDay(1); // Reset to the first day of the new month
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0); // Loop back to January
      setSelectedYear((prev) => prev + 1); // Go to the next year
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
    setSelectedDay(1); // Reset to the first day of the new month
  };

  return (
    <Box p={4} minH="70vh" >
      {/* Calendar Header */}
      <Box bg="white" p={4} borderRadius="md" mb={4}>
        <Flex justify="space-between" align="center">
          <IconButton
            icon={<FaChevronLeft />}
            aria-label="Previous Month"
            variant="ghost"
            onClick={handlePrevMonth}
          />
          <Text fontWeight="bold" fontSize="lg">
            {months[selectedMonth]} {selectedYear}
          </Text>
          <IconButton
            icon={<FaChevronRight />}
            aria-label="Next Month"
            variant="ghost"
            onClick={handleNextMonth}
          />
        </Flex>

        {/* Days of the Month */}
        <HStack mt={4} 
         justify="center" wrap="wrap">
          {Array.from({ length: daysInMonth(selectedYear)[selectedMonth] }, (_, i) => i + 1).map((day) => (
            <VStack
              key={day}
              onClick={() => setSelectedDay(day)}
              cursor="pointer"
              bg={selectedDay === day ? 'green.100' : 'gray.100'}
              p={2}
              borderRadius="md"
              w="50px"
              align="center"
              mb={2}
            >
              <Text fontSize="lg" fontWeight="bold" color={selectedDay === day ? 'green.500' : 'gray.500'}>
                {day}
              </Text>
              <Text fontSize="sm" color={selectedDay === day ? 'green.500' : 'gray.500'}>
                {weekDays[new Date(selectedYear, selectedMonth, day).getDay()]}
              </Text>
            </VStack>
          ))}
        </HStack>
      </Box>

      {/* Event List */}
      <Box w="100%">

        <Flex

          p={4}
          borderRadius="md"

          mb={4}
          align="center"
          w="100%"

          cursor="pointer"
        >
          <AppointmentAccordion appointmentsData={appointementPendingOnly} />

        </Flex>

      </Box>
    </Box>
  );
};

export default Calendar;
