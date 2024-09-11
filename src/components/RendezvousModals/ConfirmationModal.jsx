import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  Button, Box, Text, Textarea, Flex, Avatar, Icon, Select
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ConfirmationModal = ({ isConfirmationModalOpen, closeConfirmationModal, selectedSlot, selectedExpert }) => {
  const [soucis, setSoucis] = useState('');

  const handleConfirm = () => {

    closeConfirmationModal();
  };

  const handleSoucisChange = (e) => {
    setSoucis(e.target.value);
  };

  return (
    <Modal isOpen={isConfirmationModalOpen} onClose={closeConfirmationModal} size="xl" >
      <ModalOverlay />
      <ModalContent pb={5} maxW={"50rem"}>
        <ModalHeader color={"green"} 
        fontSize="md"
         textAlign="center"
         fontWeight={"bold"}
         textShadow={"2px 2px 4px #5EDABC"}>Réviser et réserver</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
          <Text fontSize="lg" fontWeight={"bold"} mb={4}>Informations sur le médecin</Text>
          <Flex border={"1px solid #cccccc"} p={4} mb={4} borderRadius={5} align={"center"}>
            <Avatar size="xl" name={selectedExpert.name} src={`https://i.pravatar.cc/150?img=${selectedExpert.id}`} mr={4} />
            <Box pl={5}>
              <Text fontSize="lg" fontWeight="bold">{selectedExpert.name}</Text>
              <Text fontSize="md">{selectedExpert.expertise}</Text>
              <Text fontSize="md" >
                <Icon color="green" mr={2} as={FaMapMarkerAlt} />
                {selectedExpert.address}
              </Text>
            </Box>

          </Flex>
          <Text fontSize="lg" fontWeight={"bold"} mb={4}>Planification</Text>
          <Text fontSize="lg" color="#888888" mb={4} ml={4}> {selectedSlot}</Text>

          <Text fontSize="lg" fontWeight={"bold"} mb={4}>Informations sur le patient</Text>
          <Text fontSize="lg" color="#666666" mb={4} ml={4}> Current User name (moi)</Text>
          <Box ml={5} mb={5}>
            <Select 
              size="lg"
             variant='flushed'
              color="teal"
              _selected={{ color: 'red' }}
            >
              <option value='Problème, une condition ou une difficulté.'>Problème, une condition ou une difficulté.</option>
              <option value='Examen médical annuel.'>Examen médical annuel. </option>
            </Select>
          </Box>

          <Text fontSize="lg" fontWeight={"bold"} mb={4}>Soucis</Text>
          <Box>
            <Textarea
              placeholder="Entrez votre soucis ici"
              size="lg"
              value={soucis}
              onChange={handleSoucisChange}
            />
          </Box>

        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            variant={"outline"}
            onClick={handleConfirm}
            isDisabled={!soucis.trim()}
          >
            Réserver
          </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
