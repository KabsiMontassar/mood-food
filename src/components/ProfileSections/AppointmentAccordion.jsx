import React, { useState, useEffect } from 'react';
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
  Icon,
} from '@chakra-ui/react';
import { FaUserMd, FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { getDoc } from 'firebase/firestore';

const AccordionCard = ({ appointment }) => {
  return (
    <AccordionItem mb={5} border="none">
      <AccordionButton
        boxShadow="md"
        bg="white"
        borderTopRadius="md"
        borderBottomRadius="md"
        _expanded={{
          bg: { completed: 'green.100', pending: '#FEFCBF', rejected: 'red.100' }[appointment.status],
          borderBottomRadius: 'none',
        }}
        p={4}
        fontSize={{ base: 'sm', md: 'md' }}
      >
        <Box as="span" flex="1" textAlign="left">
          <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>{appointment.Specialist.display_name}</Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
            {appointment.bookedAt
              ? new Date(appointment.bookedAt.seconds * 1000).toLocaleDateString()
              : 'Unknown Date'}
          </Text>
        </Box>
        <Badge
          borderRadius="full"
          color={appointment.status === 'completed' ? 'green' : appointment.status === 'pending' ? '#EFB110' : 'red'}
          colorScheme={appointment.status === 'completed' ? 'green' : appointment.status === 'pending' ? 'yellow' : 'red'}
          fontSize="xs"
          px={2}
          py={1}
          textTransform="capitalize"
          display="flex"
          alignItems="center"
        >
          <Icon viewBox="0 0 200 200">
            <path
              fill={{ completed: 'green', pending: '#EFB110', rejected: 'red' }[appointment.status]}
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon>
          
          <Text ml={2} as="span">{appointment.status}</Text>
        </Badge>


        <Badge
          borderRadius="full"
          color={appointment.done ? 'green' : 'yellow'}
          colorScheme={appointment.done ? 'green' : 'yellow'}
          fontSize="xs"
          px={2}
          py={1}
          textTransform="capitalize"
          display="flex"
          alignItems="center"
        >
          <Icon viewBox="0 0 200 200">
            <path
              fill={{ true: 'green', false: '#EFB110' }[appointment.done]}
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon>
          
        </Badge>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        bg={{ completed: 'green.100', pending: '#FEFCBF', rejected: 'red.100' }[appointment.status]}
        pb={4}
        borderBottomRadius="md"
      >
        <Box p={4}>
          <Flex mb={2} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
            <Icon as={FaUserMd} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
            <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Specialist:</Text>
            <Text color="gray.400" ml={2}>{appointment.Specialist.display_name}</Text>
          </Flex>

          <Flex mb={2} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
            <Icon as={FaCalendarAlt} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
            <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Start Time:</Text>
            <Text color="gray.400" ml={2}>
              {appointment.time
                ? new Date(appointment.time.seconds * 1000).toLocaleDateString()
                : 'Unknown Date'}
            </Text>
          </Flex>

          <Flex mb={2} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
            <Icon as={FaRegClock} color="gray.600" mr={{ base: 0, md: 2 }} mb={{ base: 1, md: 0 }} />
            <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Appointment Type:</Text>
            <Text ml={2} color="gray.400">{appointment.type}</Text>
          </Flex>

          <Flex mb={2} alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
            <Text fontSize={{ base: 'sm', md: 'md' }} color="black" fontWeight="bold">Reason:</Text>
            <Text ml={2} color="gray.400">{appointment.raison}</Text>
          </Flex>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

const AppointmentAccordion = ({ appointmentsData }) => {
  const [processedAppointments, setProcessedAppointments] = useState([]);

  useEffect(() => {
    const convertDocumentReferenceToDoc = async (ref) => {
      const doc = await getDoc(ref);
      return doc.exists() ? doc.data() : null;
    };

    const processAppointmentData = async () => {
      if (!appointmentsData || appointmentsData.length === 0) return;

      const updatedAppointments = await Promise.all(
        appointmentsData.map(async (appo) => {
          const Specialist = appo.expertRef ? await convertDocumentReferenceToDoc(appo.expertRef) : 'Unknown';
          return {
            ...appo,
            Specialist,
          };
        })
      );
      setProcessedAppointments(updatedAppointments);
    };

    processAppointmentData();
  }, [appointmentsData]);

  return (
    <Box mt={5} px={{ base: 2, md: 4 }} w="100%" mx="auto">
      <Accordion allowMultiple>
        {processedAppointments.map((appointment, index) => (
          <React.Fragment key={index}>
            <AccordionCard appointment={appointment} />
          </React.Fragment>
        ))}
      </Accordion>
    </Box>
  );
};

export default AppointmentAccordion;
