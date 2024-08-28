import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Text } from '@chakra-ui/react'
const ConfirmationModal = ( {isConfirmationModalOpen, closeConfirmationModal, selectedSlot, selectedExpert, issue, type} ) => {
  return (
    <Modal isOpen={isConfirmationModalOpen} onClose={closeConfirmationModal} size="md">
    <ModalOverlay />
    <ModalContent>
        <ModalHeader fontSize="xl">Confirm Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text fontSize="lg" mb={4}>Are you sure you want to book the following slot?</Text>
            <Box mb={4}>
                <Text fontSize="md" fontWeight="bold">Time Slot:</Text>
                <Text>{selectedSlot}</Text>
            </Box>
            {selectedExpert && (
                <Box>
                    <Text fontSize="md" fontWeight="bold">Expert:</Text>
                    <Text>{selectedExpert.name}</Text>
                    <Text fontSize="md" fontWeight="bold">Expertise:</Text>
                    <Text>{selectedExpert.expertise}</Text>

                    {issue && <Text>{issue}</Text>}
                    {type && <Text>{type}</Text>}
                </Box>
            )}
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="green" onClick={closeConfirmationModal}>Confirm</Button>
            <Button variant="outline" ml={3} onClick={closeConfirmationModal}>Cancel</Button>
        </ModalFooter>
    </ModalContent>
</Modal>
  )
}

export default ConfirmationModal