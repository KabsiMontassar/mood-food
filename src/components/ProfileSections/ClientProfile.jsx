import React from 'react';
import {
    Box,
    Text,
    VStack,
    Flex,
    Divider
} from '@chakra-ui/react';

const ClientProfile = ({ data }) => {




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
                                <Text fontSize="lg" fontWeight="bold">{data.username}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Email:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.email}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Phone:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.phone}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Address:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.address}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Gender:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.gender}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Birth Date:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.birthDate}</Text>
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
                            Your Progress
                        </Text>

                        <VStack align="flex-start" spacing={4}>
                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Date:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.date}</Text>
                            </Flex>

                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Height:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.taille} cm</Text>
                            </Flex>
                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Weight:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.poids} kg</Text>
                            </Flex>
                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Muscle Mass:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.masseMusculaire}%</Text>
                            </Flex>
                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Body Fat:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.masseGraisse}%</Text>
                            </Flex>
                            <Flex gap="3px">
                                <Text fontSize="lg" color="gray.600">Water:</Text>
                                <Text fontSize="lg" fontWeight="bold">{data.eau}%</Text>
                            </Flex>
                        </VStack>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};

export default ClientProfile;
