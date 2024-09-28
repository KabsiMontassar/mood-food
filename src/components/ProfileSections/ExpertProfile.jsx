import React from 'react';
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
            Dr. {data.username}
          </Text>

          <Badge colorScheme="green" fontSize="1rem" px={4} py={1} borderRadius="md">
            {data.specialite}
          </Badge>

          <VStack align="stretch" w="100%" spacing={4}>
            <Flex align="center" gap={2}>
              <Icon as={FaVenusMars} color="teal.500" />
              <Text fontSize="lg" fontWeight="bold">{data.gender}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FaCalendarAlt} color="teal.500" />
              <Text fontSize="lg" fontWeight="bold">Born on {data.birthDate}</Text>
            </Flex>

            <Divider />

            <Flex align="center" gap={2}>
              <Icon as={FaEnvelope} color="teal.500" />
              <Text fontSize="lg" fontWeight="bold">{data.email}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FaPhone} color="teal.500" />
              <VStack align="start" spacing={1}>
                {data.phone.map((phone, index) => (
                  <Text key={index} fontSize="lg" fontWeight="bold">{phone}</Text>
                ))}
              </VStack>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FaMapMarkerAlt} color="teal.500" />
              <VStack align="start">
                <Text fontSize="lg" fontWeight="bold">{data.location.address}</Text>
                <Text fontSize="lg" fontWeight="bold">{data.location.zone}</Text>
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
              Professional Experience
            </Text>
            <Divider my={2} />
            <VStack align="start" textAlign={"left"}>
              {data.experience.map((experience, index) => (
                <Box key={index}>
                  <Text  fontSize="lg" fontWeight="bold">{experience.title}</Text>
                  <Text fontSize="md">{experience.years} years</Text>
                </Box>
              ))}
            </VStack>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              Schedule
            </Text>
            <Divider my={2} />
            <VStack align="start">
              {data.schedule.map((schedule, index) => (
                schedule.enabled && (
                  <Box key={index}>
                    <Text fontSize="lg" fontWeight="bold">
                      {schedule.day}: {schedule.starttime} - {schedule.endtime}
                    </Text>
                  </Box>
                )
              ))}
            </VStack>
          </Box>

          <Box>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              About Dr. {data.username}
            </Text>
            <Divider my={2} />
            <Text fontSize="lg" fontWeight="normal">{data.description}</Text>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ExpertProfile;
