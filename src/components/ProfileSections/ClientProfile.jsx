import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    VStack,
    Flex,
    Divider
} from '@chakra-ui/react';
import { doc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Replace with your Firebase configuration

const ClientProfile = ({ data }) => {
    const [latestProgress, setLatestProgress] = useState(null);

    useEffect(() => {
        const fetchLatestProgress = async () => {
            try {
                const progressRef = collection(doc(db, "users", data.uid), "progress");

                const q = query(progressRef, orderBy("date", "desc"), limit(1));
                const querySnapshot = await getDocs(q);

                // Extract the document data
                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setLatestProgress(docData);
                }
            } catch (error) {
                console.error("Error fetching latest progress:", error);
            }
        };

        fetchLatestProgress();
    }, [data.uid]);

    return (
        <Box
            maxW={{ base: "90%", md: "container.lg" }}
            mx="auto"
            p={{ base: 4, md: 6 }}
            mt={{ base: 4, md: 8 }}
        >
            <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align="stretch"
                gap={8}
            >
                <Box flex={1}>
                    <VStack spacing={6} align="stretch" mb={8}>
                        <Text
                            fontSize={{ base: '2xl', md: '3xl' }}
                            fontWeight="bold"
                            textAlign="center"
                            color="teal.600"
                        >
                            Your Profile
                        </Text>

                        <VStack align="flex-start" spacing={4}>
                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Name:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.display_name}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Email:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.email}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Phone:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.phone_number}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Address:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.adresse}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Gender:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.gender}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Birth Date:</Text>
                                <Text fontSize="lg" fontWeight="bold">
                                    {new Date(data.birthdate.seconds * 1000).toLocaleDateString()}
                                </Text>
                            </Flex>
                        </VStack>
                    </VStack>
                </Box>

                <Divider
                    orientation="vertical"
                    display={{ base: 'none', md: 'block' }}
                    h="auto"
                    bg="gray.200"
                    width="1px"
                />

                <Box flex={1}>
                    <VStack spacing={6} align="stretch">
                        <Text
                            fontSize={{ base: '2xl', md: '3xl' }}
                            fontWeight="bold"
                            textAlign="center"
                            color="teal.600"
                        >
                            Latest Progress
                        </Text>

                        {latestProgress ? (
                            <VStack align="flex-start" spacing={4}>
                                <Flex gap="3px">
                                    <Text fontSize="lg" color="gray.600">Date:</Text>
                                    <Text fontSize="lg" fontWeight="bold">
                                        {new Date(latestProgress.date.seconds * 1000).toLocaleDateString()}
                                    </Text>
                                </Flex>
                                <Flex gap="3px">
                                    <Text fontSize="lg" color="gray.600">Height:</Text>
                                    <Text fontSize="lg" fontWeight="bold">{latestProgress.taille} cm</Text>
                                </Flex>
                                <Flex gap="3px">
                                    <Text fontSize="lg" color="gray.600">Weight:</Text>
                                    <Text fontSize="lg" fontWeight="bold">{latestProgress.totalWeight} kg</Text>
                                </Flex>
                                <Flex gap="3px">
                                    <Text fontSize="lg" color="gray.600">Muscle Mass:</Text>
                                    <Text fontSize="lg" fontWeight="bold">{latestProgress.muscleMass}</Text>
                                </Flex>
                                <Flex gap="3px">
                                    <Text fontSize="lg" color="gray.600">Calorie Mass:</Text>
                                    <Text fontSize="lg" fontWeight="bold">{latestProgress.calorieMass}</Text>
                                </Flex>
                                <Flex gap="3px">
                                    <Text fontSize="lg" color="gray.600">Water:</Text>
                                    <Text fontSize="lg" fontWeight="bold">{latestProgress.waterPercentage}%</Text>
                                </Flex>
                            </VStack>
                        ) : (
                            <Text fontSize="lg" color="gray.600">No progress data available.</Text>
                        )}
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};

export default ClientProfile;
