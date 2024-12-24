import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Flex,
  Icon,
  Badge,
  Divider,
} from '@chakra-ui/react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaVenusMars,
  FaCalendarAlt
} from 'react-icons/fa';

const ExpertProfile = ({ data }) => {
  const [days, setDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const processedScheduleData = () => {
    if (!data?.availableSchedule) {
      return;
    }

    const availableDays = data.availableSchedule.availbleDays?.map((schedule) => {
      const dayIndex = new Date(schedule.seconds * 1000).getDay();
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return weekdays[dayIndex];
    }) || [];

    setDays(availableDays);

    setStartTime(data.availableSchedule.startTime?.seconds 
      ? new Date(data.availableSchedule.startTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : 'N/A');

    setEndTime(data.availableSchedule.endTime?.seconds 
      ? new Date(data.availableSchedule.endTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : 'N/A');
  };

  useEffect(() => {
    processedScheduleData();
  }, [data]);

  return (
    <Box
      bg="white"
      p={{ base: 1, md: 3 }}
      borderRadius="lg"
      maxW="6xl"
      mx="auto"
      mt={10}
      w="100%"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="flex-start"
        justify="space-between"
        gap={8}
      >
        <VStack
          align="center"
          bg="gray.50"
          p={6}
          borderRadius="lg"
          flex="1"
          w="100%"
          spacing={6}
        >
          <Text fontSize="2xl" fontWeight="bold" color="teal.600">
            {data?.display_name || 'N/A'}
          </Text>

          <Badge colorScheme="green" fontSize="1rem" px={4} py={1} borderRadius="md">
            {data?.speciality || 'N/A'}
          </Badge>

          <VStack align="stretch" w="100%" spacing={4}>
            <Flex align="center" gap={2}>
              <Icon as={FaCalendarAlt} color="teal.500" />
              <Text fontSize="lg" fontWeight="bold">
                Born on -{' '}
                {data?.birthdate?.seconds
                  ? new Date(data.birthdate.seconds * 1000).toLocaleDateString()
                  : 'Unknown'}
              </Text>
            </Flex>

            <Divider />

            <Flex align="center" gap={2}>
              <Icon as={FaEnvelope} color="teal.500" />
              <Text fontSize="lg" fontWeight="bold">{data?.email || 'N/A'}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FaPhone} color="teal.500" />
              <Text fontSize="lg" fontWeight="bold">{data?.phone_number || 'N/A'}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FaMapMarkerAlt} color="teal.500" />
              <VStack align="start">
                <Text fontSize="lg" fontWeight="bold">{data?.location?.adress || 'N/A'}</Text>
                <Text fontSize="lg" fontWeight="bold">{data?.location?.zone || 'N/A'}</Text>
                <Text fontSize="lg" fontWeight="bold">{data?.location?.latlng?._lat || 'N/A'}</Text>
              </VStack>
            </Flex>
          </VStack>
        </VStack>

        <VStack
          align="stretch"
          bg="gray.50"
          p={6}
          borderRadius="lg"
          flex="3"
          spacing={6}
        >
          <Box>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              Schedule
            </Text>
            <Divider my={2} />
            <VStack align="start">
              {days.length > 0 ? (
                days.map((day, index) => (
                  <Text key={index} fontSize="lg" fontWeight="bold">
                    {day}
                  </Text>
                ))
              ) : (
                <Text fontSize="lg">No schedule available</Text>
              )}
              {startTime && endTime && (
                <Text fontSize="lg" fontWeight="bold">
                  {startTime} - {endTime}
                </Text>
              )}
            </VStack>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              About {data?.display_name || 'the Expert'}
            </Text>
            <Divider my={2} />
            <Text fontSize="lg" fontWeight="normal">{data?.description || 'No description available.'}</Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ExpertProfile;
