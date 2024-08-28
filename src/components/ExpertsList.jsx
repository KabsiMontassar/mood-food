import React, { useState } from 'react';
import { 
    Modal, ModalOverlay, ModalContent, ModalHeader, 
    ModalCloseButton, ModalBody, ModalFooter, 
    Button, Box, Flex, Heading, Text, Avatar, 
    Accordion, AccordionItem, AccordionButton, AccordionPanel, 
    AccordionIcon, Input 
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import expertsData from '../Data/expertsData.jsx';
import Expert from './Expert.jsx';

const ExpertsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const expertsPerPage = 5;

    const filteredExperts = expertsData.filter(
        expert =>
            expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredExperts.length / expertsPerPage);

    const currentExperts = filteredExperts.slice(
        (currentPage - 1) * expertsPerPage,
        currentPage * expertsPerPage
    );

    const openModal = (expert) => {
        setSelectedExpert(expert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExpert(null);
    };

    const openConfirmationModal = (slot) => {
        setSelectedSlot(slot);
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
        setSelectedSlot(null);
    };

    const getWeekDates = () => {
        const today = new Date();
        const startOfWeek = today.getDate() - today.getDay() + 1; // Start of this week (Monday)
        const weekDates = [];
        let dateCounter = 0; 

        for (let i = 0; dateCounter < 10; i++) {
            const date = new Date(today);
            date.setDate(startOfWeek + i);

            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { 
                const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
                weekDates.push(formattedDate);
                dateCounter++;
            }
        }

        return weekDates;
    };

    const daysOfWeekWithDates = getWeekDates();

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

    return (
        <Box padding="4" maxW="70%" mx="auto">
            <Input
                placeholder="Search by name or address"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                mb={4}
            />

            {currentExperts.map((expert, index) => (
                <Expert key={index} expert={expert} openModal={openModal} daysOfWeekWithDates={daysOfWeekWithDates} />
            ))}

            <Flex justify="space-between" mt={4}>
                <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Text>Page {currentPage} of {totalPages}</Text>
                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Flex>

            {selectedExpert && (
                <Modal isOpen={isModalOpen} onClose={closeModal} size="md">
                    <ModalOverlay />
                    <ModalContent maxW="50vw" maxH="90vh" p={6}>
                        <ModalHeader fontSize="2xl" textAlign="center">{selectedExpert.name}'s Availability</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex align="center" mb={6} borderBottomWidth="1px" borderBottomColor="gray.200" pb={4}>
                                <Avatar name={selectedExpert.name} src={`https://i.pravatar.cc/150?img=${selectedExpert.id}`} size="xl" mr={6} />
                                <Box>
                                    <Heading size="lg" mb={2}>{selectedExpert.name}</Heading>
                                    <Text fontSize="md" color="gray.600">{selectedExpert.expertise}</Text>
                                    <Text fontSize="md" color="gray.600">{selectedExpert.address}</Text>
                                </Box>
                            </Flex>

                            <Accordion allowToggle>
                                {selectedExpert.availability.map((appts, index) => (
                                    <AccordionItem key={index}>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex="1"
                                                 color={appts === 'No appts' ? 'gray.400' : 'black'}
                                                 textAlign="left">
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
                                                            bg="yellow.200"
                                                            textAlign="center"
                                                            p={3}
                                                            borderRadius="md"
                                                            m={1}
                                                            cursor="pointer"
                                                            _hover={{ bg: 'yellow.300' }}
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
            )}

            {selectedSlot && (
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
                                </Box>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={closeConfirmationModal}>Confirm</Button>
                            <Button variant="outline" ml={3} onClick={closeConfirmationModal}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
}

export default ExpertsList;
