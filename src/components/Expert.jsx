import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Avatar, Grid, Icon, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Expert = ({ expert, openModal, daysOfWeekWithDates }) => {
    const [isAvailabilityVisible, setIsAvailabilityVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <Box
            bg='white'
            key={expert.id}
            overflow="hidden"
            p={4}
            mb={6}
            borderBottom='1px solid #e2e8f0'
        >
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'center', md: 'flex-start' }} // Center vertically on mobile
                justify="space-between"
                h="auto"
            >
                {/* Avatar and Text Section */}
                <Flex
                    direction="column"
                    align={{ base: 'center', md: 'flex-start' }}
                    flex="1"
                    mb={{ base: 4, md: 0 }}
                    textAlign={{ base: 'center', md: 'left' }}
                >
                    <Avatar
                        name={expert.name}
                        src={`https://i.pravatar.cc/150?img=${expert.id}`}
                        mb={4}
                        size={{ base: 'lg', md: 'md' }} // Adjust size for mobile
                    />
                    <Box>
                        <Heading size={{ base: 'sm', md: 'md' }}>{expert.name}</Heading>
                        <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>{expert.expertise}</Text>
                        <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
                            <Icon color="green" as={FaMapMarkerAlt} /> {expert.address}
                        </Text>
                        <Flex align="center" mt={2} justify={{ base: 'center', md: 'flex-start' }}>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < expert.rating ? 'yellow.500' : 'gray.300'}
                                    />
                                ))}
                            <Text ml={2} fontSize={{ base: 'xs', md: 'sm' }} color='gray.600'>
                                ({expert.reviews} reviews)
                            </Text>
                        </Flex>
                        <Text
                            mt="8px"
                            color="teal.500"
                            textDecoration='underline'
                            cursor='pointer'
                            fontSize={{ base: 'sm', md: 'md' }}
                            onClick={() => navigate(`/expert/${expert.id}`)}
                        >
                            Visitez le profil
                        </Text>
                    </Box>
                </Flex>

               
                <Box
                    flex="2"
                    mt={{ base: 4, md: 0 }}
                    display={{ base: 'none', md: 'block' }} 
                >
                    <Grid
                        templateColumns="repeat(7, 1fr)"
                        gap={2}
                        mt={4}
                    >
                        {daysOfWeekWithDates.map((date, index) => (
                            <Button
                                key={index}
                                onClick={() => openModal(expert)}
                                bg={expert.availability[index] === 'No appts' ? 'gray.100' : "#5EDABC"}
                                _hover={{
                                    bg: expert.availability[index] === 'No appts' ? 'red.100' : "#5EDABC",
                                    opacity: 0.8
                                }}
                                isDisabled={expert.availability[index] === 'No appts'}
                                h="auto"
                                p={3}
                                w="auto"
                                flexWrap='wrap'
                                whiteSpace="normal"
                                textAlign="left"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                fontSize={{ base: 'xs', md: 'sm' }}
                            >
                                {date} <br />
                                {expert.availability[index]}
                            </Button>
                        ))}
                    </Grid>
                </Box>

                {/* Availability Grid for Mobile */}
                <Box
                    display={{ base: isAvailabilityVisible ? 'block' : 'none', md: 'none' }} // Show based on state
                    mt={4}
                >
                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={2}
                    >
                        {daysOfWeekWithDates.map((date, index) => (
                            <Button
                                key={index}
                                onClick={() => openModal(expert)}
                                bg={expert.availability[index] === 'No appts' ? 'gray.100' : "#5EDABC"}
                                _hover={{
                                    bg: expert.availability[index] === 'No appts' ? 'red.100' : "#5EDABC",
                                    opacity: 0.8
                                }}
                                isDisabled={expert.availability[index] === 'No appts'}
                                h="auto"
                                w="full"
                                p={2}
                                flexWrap='wrap'
                                whiteSpace="normal"
                                textAlign="left"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                fontSize={{ base: 'xs', md: 'sm' }}
                            >
                                {date} 
                            </Button>
                        ))}
                    </Grid>
                </Box>

                {/* Button to Toggle Availability on Mobile */}
                <Box
                    display={{ base: 'block', md: 'none' }} // Show only on mobile
                    mt={4}
                >
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
