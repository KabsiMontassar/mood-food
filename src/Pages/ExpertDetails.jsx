import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SelectedExpertModal from '../components/RendezvousModals/selectedExpertModal.jsx';
import ExpertHeader from '../components/ExpertDetails/ExpertHeader.jsx';
import AvailabilityGrid from '../components/ExpertDetails/AvailabilityGrid.jsx';
import ReviewSection from '../components/ExpertDetails/ReviewSection.jsx';
import { db } from '../firebaseConfig.jsx';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { VStack, HStack, useBreakpointValue, Box } from '@chakra-ui/react';

const ExpertDetails = () => {
    const { id } = useParams();
    const [time, setTime] = useState([]); // Dates for availability
    const [selectedExpert, setSelectedExpert] = useState(null); // The expert details
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [countedClick, setCountedClick] = useState(0); // For counting week jumps
    const [daysOfWeekWithDates, setDaysOfWeekWithDates] = useState([]); // Days of the week with dates
    const [selectedSlot, setSelectedSlot] = useState(null); // Track selected time slot
    const [soucis, setSoucis] = useState(''); // Track patient concerns
    const [loading, setLoading] = useState(true); // Loading state

    const calculateDates = (baseDate, offset) => {
        const dates = [];
        const startDate = new Date(baseDate);
        startDate.setDate(startDate.getDate() + offset);

        for (let i = 0; i < 14; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
            dates.push(formattedDate);
        }
        return dates;
    };

    // Function to open modal
    const openModal = (expert) => {
        setSelectedExpert(expert);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExpert(null);
        setSelectedSlot(null); // Reset selected slot when closing
        setSoucis(''); // Reset soucis when closing
    };

    // Function to jump weeks in availability
    const handleJumpWeeks = (weeks) => {
        const offset = 14 * weeks;
        const currentDate = new Date();
        const newStartDate = new Date(time[0]);
        newStartDate.setDate(newStartDate.getDate() + offset);

        if (newStartDate < currentDate) {
            newStartDate.setTime(currentDate.getTime());
        }

        const maxDate = new Date(currentDate);
        maxDate.setDate(maxDate.getDate() + 56);
        if (newStartDate > maxDate) {
            newStartDate.setTime(maxDate.getTime());
        }

        const newDates = calculateDates(newStartDate, 0);
        setTime(newDates);
        setDaysOfWeekWithDates(newDates);
        setCountedClick(countedClick + weeks);
    };

    // Function to confirm booking
    const handleConfirm = async () => {
        if (selectedExpert && selectedSlot && soucis) {
            try {
                await addDoc(collection(db, 'rendezvous'), {
                    expertId: selectedExpert.uid,
                    patientName: "Current User name (moi)", // Replace with actual patient name
                    date: new Date(selectedSlot), // Ensure to format this appropriately
                    details: soucis,
                    createdAt: Timestamp.now(),
                });
                closeModal();
                alert('Rendezvous réservé avec succès !'); // Optionally show success message
            } catch (error) {
                console.error("Error adding document: ", error);
                alert('Une erreur est survenue lors de la réservation.'); // Optionally show error message
            }
        } else {
            alert('Veuillez remplir tous les champs avant de confirmer.');
        }
    };

    useEffect(() => {
        const fetchExpert = async () => {
            setLoading(true); 
            try {
                const q = query(collection(db, 'users'), where('uid', '==', id)); 
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    setSelectedExpert(null);
                    return; 
                }
                querySnapshot.forEach((doc) => {
                    setSelectedExpert(doc.data());
                });
                const initialDates = calculateDates(new Date(), 0);
                setTime(initialDates);
                setDaysOfWeekWithDates(initialDates);
            } catch (error) {
                console.error("Error fetching expert: ", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchExpert();
    }, [id]); // Only call fetchExpert when 'id' changes

    const layout = useBreakpointValue({ base: 'VStack', md: 'HStack' });

    return (
        <Box bg="gray.50">
            {loading ? (
                <div>Loading...</div> // Show loading state while fetching data
            ) : selectedExpert ? (
                <>
                    {layout === 'HStack' ? (
                        <HStack justifyContent="center" borderBottom="1px solid #cccfcd" p={5} w="100%">
                            <ExpertHeader expert={selectedExpert} />
                            {/* <AvailabilityGrid
                                expert={selectedExpert}
                                time={time}
                                openModal={openModal}
                                countedClick={countedClick}
                                jumpbacktwoweeks={() => handleJumpWeeks(-1)}
                                jumptwoweektocurrenttime={() => handleJumpWeeks(1)}
                                daysOfWeekWithDates={daysOfWeekWithDates}
                            /> */}
                        </HStack>
                    ) : (
                        <VStack spacing={5} align="stretch" p={5}>
                            <ExpertHeader expert={selectedExpert} />
                            {/* <AvailabilityGrid
                                expert={selectedExpert}
                                time={time}
                                openModal={openModal}
                                countedClick={countedClick}
                                jumpbacktwoweeks={() => handleJumpWeeks(-1)}
                                jumptwoweektocurrenttime={() => handleJumpWeeks(1)}
                                daysOfWeekWithDates={daysOfWeekWithDates}
                            /> */}
                        </VStack>
                    )}

                    {/* <ReviewSection expert={selectedExpert} reviews={selectedExpert.reviews} /> */}

                    {isModalOpen && (
                        <SelectedExpertModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            selectedExpert={selectedExpert}
                            daysOfWeekWithDates={time}
                            selectedSlot={selectedSlot}
                            setSelectedSlot={setSelectedSlot}
                            soucis={soucis}
                            setSoucis={setSoucis}
                            handleConfirm={handleConfirm}
                        />
                    )}
                </>
            ) : (
                <div>Expert not found.</div> // Show a message if no expert is found
            )}
        </Box>
    );
};

export default ExpertDetails;
