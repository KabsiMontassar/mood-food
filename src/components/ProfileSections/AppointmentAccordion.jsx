import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  Text,
  Flex,
  Icon
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
              fontSize={{ base: 'sm', md: 'md' }} // Responsive font size
            >
              <Box as="span" flex="1" textAlign="left">
                <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>{appointment.Specialist}</Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">{appointment.Date}</Text>
              </Box>
              <Badge
                borderRadius="full"
                color={appointment.Status === 'Completed' ? 'green' : appointment.Status === 'Pending' ? '#EFB110' : 'red'}
                colorScheme={appointment.Status === 'Completed' ? 'green' : appointment.Status === 'Pending' ? 'yellow' : 'red'}
                fontSize="xs"
                px={2}
                py={1}
                textTransform="capitalize"
                display="flex"
                alignItems="center"
              >
                <Icon viewBox='0 0 200 200' >
                  <path
                    fill={{ Completed: 'green', Pending: '#EFB110', Rejected: 'red' }[appointment.Status]}
                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                  />
                </Icon>
                <Text ml={2} as="span">{appointment.Status}</Text>
              </Badge>
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
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default AppointmentAccordion;
