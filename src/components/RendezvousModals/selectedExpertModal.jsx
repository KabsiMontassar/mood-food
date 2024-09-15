import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Icon,
  Grid,
  GridItem,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const generateTimeSlots = (appts) => {
  let slots = [];
  const startHour = 9;
  const endHour = 17;
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 60) {
      if (appts > 0) {
        const start = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} - ${(hour + 1).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(start);
        appts--;
      }
    }
  }
  return slots;
};

const selectedExpertModal = ({ isOpen, onClose, selectedExpert, daysOfWeekWithDates, openConfirmationModal }) => {
  const [currentStep, setCurrentStep] = useState('availability'); // Tracks current step: 'availability' or 'confirmation'
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [soucis, setSoucis] = useState('');

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setCurrentStep('confirmation');
  };

  const handleConfirm = () => {
    // Implement confirmation logic here
    onClose();
  };

  const handleSoucisChange = (e) => {
    setSoucis(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent pb={5} maxW="50rem">
        <ModalHeader
          color="green"
          fontSize="md"
          textAlign="center"
          fontWeight="bold"
          textShadow="2px 2px 4px #5EDABC"
        >
          {currentStep === 'availability' ? `${selectedExpert.name}'s Availability` : 'Réviser et réserver'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {currentStep === 'availability' ? (
            <>
              <Heading size="xs" color="gray.400" fontWeight="none" mb={2}>
                Cliquez sur un horaire pour réserver.
              </Heading>
              <Grid templateColumns="repeat(1, 1fr)" gap={3}>
                {selectedExpert.availability.map((appts, index) =>
                  appts !== "No appts" ? (
                    <GridItem key={index}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize="xs" fontWeight="bold">{daysOfWeekWithDates[index]}</Text>
                      </Box>
                      <Flex wrap="wrap" gap={2} justify="left">
                        {generateTimeSlots(parseInt(appts)).map((slot, i) => (
                          <GridItem
                            key={i}
                            bg="#5EDABC"
                            textAlign="center"
                            borderRadius="none"
                            p={2}
                            m={1}
                            cursor="pointer"
                            _hover={{
                              bg: "#5EDABC",
                              opacity: 0.8,
                            }}
                            onClick={() => handleSlotClick(`${daysOfWeekWithDates[index]} ${slot}`)}
                          >
                            <Text fontSize="sm">{slot}</Text>
                          </GridItem>
                        ))}
                      </Flex>
                    </GridItem>
                  ) : null
                )}
              </Grid>
            </>
          ) : (
            <>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Informations sur le médecin</Text>
              <Flex border="1px solid #cccccc" p={4} mb={4} borderRadius={5} align="center">
                <Avatar size="xl" name={selectedExpert.name} src={`https://i.pravatar.cc/150?img=${selectedExpert.id}`} mr={4} />
                <Box pl={5}>
                  <Text fontSize="lg" fontWeight="bold">{selectedExpert.name}</Text>
                  <Text fontSize="md">{selectedExpert.expertise}</Text>
                  <Text fontSize="md">
                    <Icon color="green" mr={2} as={FaMapMarkerAlt} />
                    {selectedExpert.address}
                  </Text>
                </Box>
              </Flex>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Planification</Text>
              <Text fontSize="lg" color="#888888" mb={4} ml={4}>{selectedSlot}</Text>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Informations sur le patient</Text>
              <Text fontSize="lg" color="#666666" mb={4} ml={4}>Current User name (moi)</Text>
              <Box ml={5} mb={5}>
                <Select
                  size="lg"
                  variant="flushed"
                  color="teal"
                  _selected={{ color: 'red' }}
                >
                  <option value='Problème, une condition ou une difficulté.'>Problème, une condition ou une difficulté.</option>
                  <option value='Examen médical annuel.'>Examen médical annuel.</option>
                </Select>
              </Box>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Soucis</Text>
              <Box>
                <Textarea
                  placeholder="Entrez votre soucis ici"
                  size="lg"
                  value={soucis}
                  onChange={handleSoucisChange}
                />
              </Box>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {currentStep === 'availability' ? (
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={onClose}
            >
              Fermer
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={handleConfirm}
              isDisabled={!soucis.trim()}
            >
              Réserver
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default selectedExpertModal;
