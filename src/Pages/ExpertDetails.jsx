import { useParams } from 'react-router-dom';
import expertsData from '../Data/expertsData.jsx';
import React, { useEffect, useState } from 'react';

import SelectedExpertModal from '../components/RendezvousModals/selectedExpertModal.jsx';
import ExpertHeader from '../components/ExpertDetails/ExpertHeader.jsx';
import AvailabilityGrid from '../components/ExpertDetails/AvailabilityGrid.jsx';
import ReviewSection from '../components/ExpertDetails/ReviewSection.jsx';

import { VStack, HStack, useBreakpointValue ,Box} from '@chakra-ui/react';

const ExpertDetails = () => {
    const { id } = useParams();
    const [time, setTime] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countedClick, setCountedClick] = useState(0);
    const [daysOfWeekWithDates, setDaysOfWeekWithDates] = useState([]);

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

    const openModal = (expert) => {
        setSelectedExpert(expert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExpert(null);
    };

 

  
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
    

    useEffect(() => {
        const initialDates = calculateDates(new Date(), 0);
        setTime(initialDates);
        setDaysOfWeekWithDates(initialDates);
    }, []);

    const expert = expertsData.find((expert) => expert.id === parseInt(id));
    if (!expert) {
        return (
            <div>
                <h1>Expert not found</h1>
                <p>The expert you're looking for does not exist.</p>
            </div>
        );
    }

    const reviews = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        rating: Math.floor(Math.random() * 6),
        content: 'Ils étaient géniaux ! J\'ai eu une conversation très positive et calme.',
       
        date : new Date( new Date().getTime() - Math.random() * 10000000000).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        patient: 'Foulen Fouleni',
    }));

    const layout = useBreakpointValue({ base: 'VStack', md: 'HStack' });

    return (
        <Box bg="gray.50">
            {layout === 'HStack' ? (
                <HStack  justifyContent="center" borderBottom="1px solid #cccfcd" p={5} w="100%">
                    <ExpertHeader expert={expert} />
                    <AvailabilityGrid
                        expert={expert}
                        time={time}
                        openModal={openModal}
                        countedClick={countedClick}
                        jumpbacktwoweeks={() => handleJumpWeeks(-1)}
                        jumptwoweektocurrenttime={() => handleJumpWeeks(1)}
                        daysOfWeekWithDates={daysOfWeekWithDates}
                    />
                </HStack>
            ) : (
                <VStack spacing={5} align="stretch" p={5}>
                    <ExpertHeader expert={expert} />
                    <AvailabilityGrid
                        expert={expert}
                        time={time}
                        openModal={openModal}
                        countedClick={countedClick}
                        jumpbacktwoweeks={() => handleJumpWeeks(-1)}
                        jumptwoweektocurrenttime={() => handleJumpWeeks(1)}
                        daysOfWeekWithDates={daysOfWeekWithDates}
                    />
                </VStack>
            )}

            <ReviewSection expert={expert} reviews={reviews} />

            {selectedExpert && (
                <SelectedExpertModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    selectedExpert={selectedExpert}
                    daysOfWeekWithDates={time}
                
                />
            )}

          
            </Box>
    );
};

export default ExpertDetails;
