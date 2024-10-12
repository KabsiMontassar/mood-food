import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Avatar, Grid, Icon, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig.jsx';

const Expert = ({ expert, openModal, daysOfWeekWithDates }) => {
    const [isAvailabilityVisible, setIsAvailabilityVisible] = useState(false);
    const navigate = useNavigate();
    const [fetchedAvailability, setFetchedAvailability] = useState([]);

    const getDayOfWeek = (date) => {
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        return days[date.getDay()];
    };

    useEffect(() => {
        const fetchAvailability = async () => {
            if (!expert?.uid || !daysOfWeekWithDates.length) return;

            try {
                const startDate = new Date(daysOfWeekWithDates[0]);
                const endDate = new Date(daysOfWeekWithDates[daysOfWeekWithDates.length - 1]);
                const firestoreStartDate = Timestamp.fromDate(startDate);
                const firestoreEndDate = Timestamp.fromDate(endDate);

                const q = query(
                    collection(db, "rendezvous"),
                    where("expertid", "==", expert.uid),
                    where("date", ">=", firestoreStartDate),
                    where("date", "<=", firestoreEndDate)
                );

                const querySnapshot = await getDocs(q);

                const availabilityArray = daysOfWeekWithDates.map(date => {
                    const day = getDayOfWeek(new Date(date));
                    const scheduleIndex = expert.schedule.findIndex(schedule => schedule.day === day);
                    const count = (scheduleIndex !== -1) ?
                        (expert.schedule[scheduleIndex].endtime - expert.schedule[scheduleIndex].starttime) : 0;

                    return {
                        day: date,
                        count: count,
                        enabled: (scheduleIndex !== -1) ? expert.schedule[scheduleIndex].enabled : false,
                    };
                });

                querySnapshot.docs.forEach(doc => {
                    const docDate = doc.data().date.toDate();
                    const dateString = docDate.toLocaleDateString();
                    const index = daysOfWeekWithDates.findIndex(date => new Date(date).toLocaleDateString() === dateString);

                    if (index !== -1) {
                        availabilityArray[index].count = Math.max(0, availabilityArray[index].count - 1);
                    }
                });

                setFetchedAvailability(availabilityArray);
            } catch (error) {
                console.error("Error fetching availability:", error);
            }
        };

        fetchAvailability();
    }, [expert?.uid, daysOfWeekWithDates]);

    return (
        <Box
            bg="white"
            key={expert.uid}
            overflow="hidden"
            p={4}
            mb={6}
            borderBottom="1px solid #e2e8f0"
            borderRadius="md"
        >
            <Flex direction={{ base: 'column', lg: 'row' }} justify="space-between">
                <Flex
                    w="full"
                    direction={{ base: 'column', lg: 'row' }}
                    align="center"
                    justify="center"
                    mb={{ base: 4, lg: 0 }}
                    textAlign={{ base: 'center', lg: 'left' }}
                >
                    <Avatar name={expert.username} mr={{ base: 0, lg: 4 }} size={"lg"} />
                    <Box>
                        <Heading size={{ base: 'md', lg: 'lg' }}>{expert.username}</Heading>
                        <Text color="gray.600" fontSize={{ base: 'sm', lg: 'md' }}>{expert.specialite}</Text>
                        <Text color="gray.600" fontSize={{ base: 'sm', lg: 'md' }}>
                            <Icon color="green" as={FaMapMarkerAlt} /> {expert.location.address}
                        </Text>
                        <Flex align="center" mt={2} justify={{ base: 'center', lg: 'flex-start' }}>
                            {Array(5).fill('').map((_, i) => (
                                <StarIcon key={i} color={i < expert.rateTotal ? 'yellow.500' : 'gray.300'} />
                            ))}
                            <Text ml={2} fontSize={{ base: 'xs', lg: 'sm' }} color="gray.600">
                                ({expert.reviews.length} reviews)
                            </Text>
                        </Flex>
                        <Text
                            mt="8px"
                            color="teal.500"
                            textDecoration="underline"
                            cursor="pointer"
                            fontSize={{ base: 'sm', lg: 'md' }}
                            onClick={() => navigate(`/expert/${expert.uid}`)}
                        >
                            Visitez le profil
                        </Text>
                    </Box>
                </Flex>

                <Box align="center" justify="center" display={{ base: 'none', lg: 'block' }}>
                    <Grid templateColumns="repeat(7, minmax(100px, 1fr))" gap={2} mt={4}>
                        {fetchedAvailability.map((availability, index) => (
                            <Button
                                key={index}
                                onClick={() => openModal(expert)}
                                bg={availability.count === 0 || !availability.enabled ? 'gray.100' : '#5EDABC'}
                                _hover={{
                                    bg: availability.count === 0 || !availability.enabled ? 'red.100' : '#5EDABC',
                                    opacity: 0.8,
                                }}
                                isDisabled={availability.count === 0 || !availability.enabled}
                                h={{ base: 'auto', lg: '80px' }}
                                p={3}
                                w={{ base: 'auto', lg: '100px' }}
                                flexWrap="wrap"
                                whiteSpace="normal"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                fontSize={{ base: 'xs', lg: 'sm' }}
                            >
                                {availability.day} <br />
                                {(availability.enabled &&   availability.count)} rendez-vous 
                               
                            </Button>
                        ))}
                    </Grid>
                </Box>


                <Box display={{ base: isAvailabilityVisible ? 'block' : 'none', lg: 'none' }} mt={4}>
                    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                        {fetchedAvailability.map((availability, index) => (
                            <Button
                                key={index}
                                onClick={() => openModal(expert)}
                                bg={availability.count === 0 ? 'gray.100' : '#5EDABC'}
                                _hover={{
                                    bg: availability.count === 0 ? 'red.100' : '#5EDABC',
                                    opacity: 0.8,
                                }}
                                isDisabled={availability.count === 0}
                                h="auto"
                                w="full"
                                p={2}
                                flexWrap="wrap"
                                whiteSpace="normal"
                                textAlign="left"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                fontSize={{ base: 'xs', md: 'sm' }}
                            >
                                {availability.day}
                            </Button>
                        ))}
                    </Grid>
                </Box>

                <Box display={{ base: 'block', lg: 'none' }} mt={4}>
                    <Button
                        onClick={() => setIsAvailabilityVisible(!isAvailabilityVisible)}
                        colorScheme="green"
                        variant={isAvailabilityVisible ? 'solid' : 'outline'}
                        width="full"
                    >
                        {isAvailabilityVisible ? 'Hide Availability' : 'Show Availability'}
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default Expert;
