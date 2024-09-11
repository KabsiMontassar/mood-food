import React from 'react';
import { Modal, ModalOverlay, Grid, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Flex, Heading, Text, Avatar, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, useColorModeValue, GridItem } from '@chakra-ui/react';
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
const SelectedExpertModal = ({ isModalOpen, closeModal, selectedExpert, daysOfWeekWithDates, openConfirmationModal }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
      <ModalOverlay />
      <ModalContent  pb={5} maxW={"50rem"} >
        <ModalHeader color={"green"} 
        fontSize="md"
         textAlign="center"
         fontWeight={"bold"}
         textShadow={"2px 2px 4px #5EDABC"}
         >{selectedExpert.name}'s Availability</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Heading size="xs" color={"gray.400"} fontWeight={"none"} mb={2}>Cliquez sur un horaire pour réserver. </Heading>

          <Grid templateColumns="repeat(1, 1fr)" gap={3}>
            {selectedExpert.availability.map((appts, index) => (
              appts !== "No appts" ? (
                <GridItem key={index}>



                  <Box flex="1" textAlign="left">
                    <Text fontSize="xs" fontWeight="bold">{daysOfWeekWithDates[index]}</Text>
                  </Box>


                  <Flex wrap="wrap" gap={2} justify="left">
                    {generateTimeSlots(parseInt(appts)).map((slot, i) => (
                      <GridItem
                        key={i}
                        bg={"#5EDABC"}
                        textAlign="center"
                        borderRadius="none"
                        p={2}
                      
                        m={1}
                        cursor="pointer"
                        _hover={{
                          bg: "#5EDABC",
                          opacity: 0.8
                        }}
                        onClick={() => openConfirmationModal( `${daysOfWeekWithDates[index]} ${slot}`)}
                      >
                        <Text fontSize="sm">{slot}</Text>
                      </GridItem>
                    ))}

                  </Flex>

                </GridItem>

              ) : null))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SelectedExpertModal;
