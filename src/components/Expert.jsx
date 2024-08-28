import React from 'react';
import { Box, Flex, Heading, Text, Avatar, Grid, Button, useColorModeValue } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const Expert = ({ expert, openModal, daysOfWeekWithDates }) => {
    return (
        <Box bg={useColorModeValue('white', '#2D3748')} key={expert.id}
            boxShadow={'lg'}
            overflow="hidden" p={4} mb={6}>
            <Flex justify="space-between" align="flex-start">

                <Flex direction="column" flex="1" mr={4}>
                    <Flex align="center" mb={4}>
                        <Avatar name={expert.name} src={`https://i.pravatar.cc/150?img=${expert.id}`} mr={4} />
                        <Box>
                            <Heading size="md">{expert.name}</Heading>
                            <Text color={useColorModeValue('gray.600', 'gray.400')}>{expert.expertise}</Text>
                            <Text color={useColorModeValue('gray.600', 'gray.400')}>{expert.address}</Text>
                            <Flex align="center" mt={2}>
                                {Array(5)
                                    .fill('')
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            color={i < expert.rating ? useColorModeValue('green.500', 'green.400') : useColorModeValue('gray.300', 'gray.600')}
                                        />
                                    ))}
                                <Text ml={2} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>({expert.reviews} reviews)</Text>
                            </Flex>
                        </Box>
                    </Flex>
                    <Button
                        mt="8px"
                        color="black"
                        bg="none"
                        _hover={{ bg: 'none' }}
                        fontWeight={"bold"}
                        colorScheme="teal"
                    >
                        <span className="buttonunderline">Check Profile</span>
                    </Button>
                </Flex>


                <Box flex="2">

                    <Grid templateColumns="repeat(5, 1fr)" gap={2} mt={4}>
                        {daysOfWeekWithDates.map((date, index) => (
                            <Button
                                key={index}
                                onClick={() => openModal(expert)}
                                bg={expert.availability[index] === 'No appts' ? useColorModeValue('gray.100', 'gray.700') : useColorModeValue('green.500', 'green.400')}
                                _hover={{ bg: useColorModeValue('green.400', 'green.500') }}
                                isDisabled={expert.availability[index] === 'No appts'}
                            >
                                {date}
                            </Button>
                        ))}

                    </Grid>
                    <Flex justifyContent={"center"} mt={2}>
                        <Button
                            mt="8px"
                            color="black"
                            bg="none"
                            _hover={{ bg: 'none' }}
                            fontWeight={"bold"}
                            colorScheme="teal"
                            onClick={() => openModal(expert)}
                        >
                            <span className="buttonunderline">Check Availability</span>
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}

export default Expert;
