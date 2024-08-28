import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Flex, Heading, Text, Avatar, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, useColorModeValue } from '@chakra-ui/react';
const generateTimeSlots = (appts) => {
    let slots = [];
    const startHour = 9;
    const endHour = 17;
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (appts > 0) {
          const start = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          slots.push(start);
          appts--;
        }
      }
    }
    return slots;
  };
const SelectedExpertModal = ({ isModalOpen, closeModal, selectedExpert, daysOfWeekWithDates, openConfirmationModal }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} size="md">
      <ModalOverlay />
      <ModalContent maxW="50vw" maxH="90vh" p={6}>
        <ModalHeader fontSize="2xl" textAlign="center">{selectedExpert.name}'s Availability</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" mb={6} borderBottomWidth="1px" borderBottomColor={useColorModeValue('gray.200', 'gray.600')} pb={4}>
            <Avatar name={selectedExpert.name} src={`https://i.pravatar.cc/150?img=${selectedExpert.id}`} size="xl" mr={6} />
            <Box>
              <Heading size="lg" mb={2}>{selectedExpert.name}</Heading>
              <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>{selectedExpert.expertise}</Text>
              <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>{selectedExpert.address}</Text>
            </Box>
          </Flex>

          <Accordion allowToggle>
            {selectedExpert.availability.map((appts, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box
                      flex="1"
                      color={appts === 'No appts' ? useColorModeValue('gray.400', 'gray.600') : useColorModeValue('black', 'white')}
                      textAlign="left"
                    >
                      {daysOfWeekWithDates[index]}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {appts !== 'No appts' ? (
                    <Flex wrap="wrap">
                      {generateTimeSlots(parseInt(appts)).map((slot, i) => (
                        <Box
                          key={i}
                          bg={useColorModeValue('green.500', 'green.400')}
                          textAlign="center"
                          p={3}
                          borderRadius="md"
                          m={1}
                          cursor="pointer"
                          _hover={{ bg: useColorModeValue('green.400', 'green.500') }}
                          onClick={() => openConfirmationModal(slot)}
                        >
                          <Text fontSize="sm">{slot}</Text>
                        </Box>
                      ))}
                    </Flex>
                  ) : (
                    <Text>No appointments available</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SelectedExpertModal;
