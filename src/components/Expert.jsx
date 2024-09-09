import React from 'react';
import { Box, Flex, Heading, Text, Avatar, Grid, Icon, Button, useColorModeValue } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

const Expert = ({ expert, openModal, daysOfWeekWithDates }) => {
    const navigate = useNavigate();
    return (
        <Box
            bg={useColorModeValue('white', '#2D3748')}
            key={expert.id}
            overflow="hidden"
            p={4}
            mb={6}
            borderRadius="md"

        >
            <Flex
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'center', md: 'center' }} // Center vertically
                justify="space-between"
                h="100%" // Make sure Flex container takes full height
            >
                <Flex
                    direction="column"
                    align={{ base: 'center', md: 'flex-start' }}
                    flex="1"
                    mr={{ base: 0, md: 4 }}
                    mb={{ base: 4, md: 0 }}
                    justify="center" // Center content vertically
                >
                    <Flex align="center" mb={4}>
                        <Avatar name={expert.name} src={`https://i.pravatar.cc/150?img=${expert.id}`} mr={4} />
                        <Box>
                            <Heading size="md">{expert.name}</Heading>
                            <Text color={useColorModeValue('gray.600', 'gray.400')}>{expert.expertise}</Text>
                            <Text color={useColorModeValue('gray.600', 'gray.400')}>
                                <Icon color="green" as={FaMapMarkerAlt} />{expert.address}
                            </Text>
                            <Flex align="center" mt={2}>
                                {Array(5)
                                    .fill('')
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            color={i < expert.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                                        />
                                    ))}
                                <Text ml={2} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                                    ({expert.reviews} reviews)
                                </Text>
                            </Flex>
                            <Text
                                mt="8px"
                                color="teal.500"
                                textDecoration={'underline'}
                                cursor={'pointer'}
                                onClick={ () => navigate(`/expert/${expert.id}`)
                                }
                            >
                                Visitez le profil
                            </Text>
                        </Box>
                    </Flex>
                </Flex>

                <Box flex="2" mt={{ base: 4, md: 0 }} justify="center">
                    <Grid templateColumns="repeat(7, 75px)" gap={2} mt={4}>
                        {daysOfWeekWithDates.map((date, index) => (
                            <Button
                                key={index}
                                onClick={() => openModal(expert)}
                                bg={expert.availability[index] === 'No appts' ? 'gray.100' : "#5EDABC"}
                                _hover={{
                                    bg: "#5EDABC",
                                    opacity: 0.8
                                }}
                                isDisabled={expert.availability[index] === 'No appts'}
                                h="110px"
                                w="75px"
                                flexWrap={{ base: 'wrap', md: 'nowrap' }}
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
            </Flex>
        </Box>
    );
};

export default Expert;
