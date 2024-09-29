import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  Flex,
  Text,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { FaUserMd, FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const Consultations = ({ appointmentsData }) => {
  const appointementPendingOnly = appointmentsData.filter(appointment => appointment.Status === 'Pending');
  
  // Update the Specialist field for the filtered appointments
  appointementPendingOnly.forEach(appointment => {
    appointment.Specialist = "Hamza ben hamed";
  });

  return (
    <Box mt={5} px={{ base: 2, md: 4 }} mx="auto"> {/* Center the content and set max width */}
      <Accordion allowMultiple>
        {appointementPendingOnly.map((appointment, index) => (
          <AccordionItem mb={5} key={index} border="none">
            <AccordionButton
              boxShadow={"md"}
              borderTopRadius="md"
              borderBottomRadius="md"
              p={4}
              fontSize={{ base: 'sm', md: 'md' }} // Responsive font size
            >
              <Box as="span" flex="1" textAlign="left">
                <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>{appointment.Specialist}</Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">{appointment.Date}</Text>
              </Box>
             
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} borderBottomRadius="md" boxShadow="md">
              <Box p={4}>
                <Flex
                  mb={2}
                  alignItems="center"
                  flexDirection={{ base: 'column', md: 'row' }} // Stack vertically on mobile
                >
                  <Icon as={FaUserMd} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Patient:</Text>
                  <Text color="gray.400" ml={2}>{appointment.Specialist}</Text>
                </Flex>

                <Flex
                  mb={2}
                  alignItems="center"
                  flexDirection={{ base: 'column', md: 'row' }} // Stack vertically on mobile
                >
                  <Icon as={FaCalendarAlt} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Date:</Text>
                  <Text color="gray.400" ml={2}>{appointment.Date}</Text>
                </Flex>

                <Flex
                  mb={2}
                  alignItems="center"
                  flexDirection={{ base: 'column', md: 'row' }} // Stack vertically on mobile
                >
                  <Icon as={FaRegClock} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Appointment Type:</Text>
                  <Text ml={2} color="gray.400">{appointment.ApointementType}</Text>
                </Flex>

                <Flex
                  mb={2}
                  alignItems="center"
                  flexDirection={{ base: 'column', md: 'row' }} // Stack vertically on mobile
                >
                  <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Reason:</Text>
                  <Text ml={2} color="gray.400">{appointment.raison}</Text>
                </Flex>
                <Flex justifyContent={"flex-end"} gap={3} mr={5}>
                <IconButton isRound={true}
                  _hover={{ bg: 'green.100' }}
                  onClick={() => alert('Appointment Accepted!')}
                  variant='unstyled' aria-label="Accept" color="green" icon={<CheckIcon />} />
                <IconButton isRound={true}
                  _hover={{ bg: 'red.100' }}
                  onClick={() => alert('Appointment Rejected!')}
                  variant='unstyled' aria-label="Reject" icon={<CloseIcon />} color="red" />
              </Flex>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default Consultations;
