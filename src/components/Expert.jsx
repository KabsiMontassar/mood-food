import React from 'react';
import { Box, Flex, Heading, Text, Avatar, Grid, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const Expert = ({ expert, openModal, daysOfWeekWithDates }) => {
    return (
        <Box key={expert.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={6}>
            <Flex justify="space-between" align="flex-start">
                {/* Expert Information */}
                <Flex direction="column" flex="1" mr={4}>
                    <Flex align="center" mb={4}>
                        <Avatar name={expert.name} src={`https://i.pravatar.cc/150?img=${expert.id}`} mr={4} />
                        <Box>
                            <Heading size="md">{expert.name}</Heading>
                            <Text fontSize="sm" color="gray.500">{expert.expertise}</Text>
                            <Text fontSize="sm" color="gray.500">{expert.address}</Text>
                            <Flex align="center" mt={2}>
                                <StarIcon color="yellow.400" mr={1} />
                                <Text fontWeight="bold" mr={2}>{expert.rating}</Text>
                                <Text fontSize="sm" color="gray.500">({expert.reviews} reviews)</Text>
                            </Flex>
                        </Box>
                    </Flex>
                    <Button
                        mt="8px"
                        color="black"
                        bg="none"

                        _hover={{ bg: 'none' }}

                        onClick={() => openModal(expert)}
                    >
                        <span className="buttonunderline">Check Availability</span>

                    </Button>
                </Flex>


                <Box flex="2">
                    <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={2} mt={4}>
                        {expert.availability.map((slot, i) => (
                            <Box
                                key={i}
                                bg={slot === 'No appts' ? 'gray.200' : 'yellow.200'}
                                textAlign="center"
                                p={2}
                                borderRadius="md"
                                cursor={slot === 'No appts' ? 'not-allowed' : 'pointer'}
                                onClick={() => slot !== 'No appts' && openModal(expert)}
                                _hover={slot !== 'No appts' ? { bg: 'yellow.300' } : {}}
                            >
                                <Text fontSize="sm">
                                    {daysOfWeekWithDates[i]} <br />
                                    {slot}
                                </Text>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </Flex>
        </Box>
    );
}

export default Expert;
