import { useParams } from 'react-router-dom'; // Use to access route parameters
import expertsData from '../Data/expertsData.jsx';
import React, { useEffect, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import {
    Tabs, TabList, TabPanels, AspectRatio, Tab, TabPanel, Badge, Grid, Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider
} from '@chakra-ui/react'
import { SimpleGrid } from '@chakra-ui/react'
import SelectedExpertModal from '../Components/RendezvousModals/selectedExpertModal.jsx';
import ConfirmationModal from '../Components/RendezvousModals/ConfirmationModal.jsx';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';

import { FaMapMarkerAlt } from 'react-icons/fa';
import {
    Box, Input, Flex, Button, Icon, Text, Select, useColorModeValue, IconButton, VStack, HStack, Container, Avatar
} from '@chakra-ui/react';

const ExpertDetails = () => {

    const { id } = useParams();
    const [time, setTime] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [CountedClick, setCountedClick] = useState(0);

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

    const openConfirmationModal = (slot) => {
        setSelectedSlot(slot);
        setIsConfirmationModalOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
        setSelectedSlot(null);
    };
    const generateTime = () => calculateDates(new Date(), 0);

    const jumptwoweektocurrenttime = () => {
        if (CountedClick === 3) return;
        setCountedClick(CountedClick + 1);
        setTime(calculateDates(time[0], 14));
    };

    const jumpbacktwoweeks = () => {
        if (CountedClick === 0) return;
        setCountedClick(CountedClick - 1);
        setTime(calculateDates(time[0], -14));
    };

    const expertsPerPage = 5;


    useEffect(() => {
        const dates = calculateDates(new Date(), 0);
        setDaysOfWeekWithDates(dates);
        setTime(generateTime());
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



    return (

        <>
            
                <HStack justifyContent={"center"} borderBottom="1px solid #cccfcd" p={5} w="100%">
                    <Box w="60%" p={8}>
                        <Flex alignItems={"center"} justifyContent={"center"}>

                            <Avatar
                                name={expert.name}
                                size='2xl'
                                border="2px solid #cccfcd"
                                src={`https://i.pravatar.cc/150?img=${expert.id}`}
                                mr={5} />

                            <Box>
                                <Text fontSize="xl" fontWeight="bold" >
                                    {expert.name}
                                </Text>
                                <Text fontSize="xl" fontWeight="bold" >
                                    {expert.expertise}
                                </Text>
                                <Text fontSize="xl" color="gray.400" >
                                    <Icon mr="5px" color="green" as={FaMapMarkerAlt} />
                                    {expert.address}

                                </Text>
                            </Box>

                        </Flex>
                        <Box mt={5} borderRadius={
                            { base: 'none', md: 'md' }
                        } bg="gray.100" p={5}>
                            <Flex justifyContent={"space-between"} align="center" mt={2}>
                                <Box w="30%" align="center">
                                    <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
                                        {expert.rating}
                                    </Text>
                                    {Array(5)
                                        .fill('')
                                        .map((_, i) => (
                                            <StarIcon
                                                mr={2}
                                                key={i}

                                                color={i < expert.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                                            />
                                        ))}

                                </Box>
                                <Box borderLeft={
                                    { base: 'none', md: '1px solid #cccfcd' }
                                } pl={5} w="70%">

                                    <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')}>
                                        “Definitely a high efficiency setup — it’s a single chair in a shared office. The dentist that came was different than the one I booked, and he seemed unfamiliar with the
                                    </Text>
                                    <Text ml={2} fontSize="xs" color={useColorModeValue('gray.600', 'gray.400')}>
                                        Foulen fouleni 13 sep 2024
                                    </Text>

                                </Box>
                            </Flex>

                        </Box>
                        <Box mt={5} borderRadius={
                            { base: 'none', md: 'md' }
                        } bg="gray.50" p={5}>
                            <Tabs variant='unstyled'   >
                                <TabList >
                                    <Tab
                                        color="gray.400"
                                        _selected={{
                                            color: 'black',
                                            textDecoration: 'underline',
                                            fontWeight: 'bold'
                                        }} >À propos</Tab>
                                    <Tab _selected={{
                                        color: 'black',
                                        textDecoration: 'underline',
                                        fontWeight: 'bold'
                                    }}
                                        color="gray.400"
                                    >Éducation et parcours</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel p={4}>
                                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                                    </TabPanel>
                                    <TabPanel p={4} >
                                        <SimpleGrid color={"gray.600"} columns={[2, 2]} >
                                            <Box align="center" borderRight={{ base: 'none', md: '1px solid #cccfcd' }}
                                                borderBottom={{ base: 'none', md: '1px solid #cccfcd' }}
                                                height='80px'>
                                                <Badge colorScheme="yellow">Spécialité</Badge>
                                                <br />
                                                Nutritionniste
                                            </Box>
                                            <Box
                                                borderBottom={{ base: 'none', md: '1px solid #cccfcd' }} align="center"
                                                height='80px'>
                                                <Badge colorScheme="red">Expérience</Badge>
                                                <br />
                                                7 ans d’expérience
                                            </Box>
                                            <Box borderRight={{ base: 'none', md: '1px solid #cccfcd' }} align="center"
                                                height='80px'>
                                                <Badge colorScheme="teal">Email</Badge>
                                                <br />
                                                Foulen@Foulen.fr
                                            </Box>
                                            <Box height='80px' align="center">
                                                <Badge colorScheme="blue">Numéro de téléphone</Badge>
                                                <br />
                                                95232***
                                                <br />
                                                54342***
                                            </Box>
                                        </SimpleGrid>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </Box>
                    </Box>


                    <Box border="1px solid #cccfcd">
                        <Flex textAlign="center" w="full" alignItems="center" justifyContent="space-between" p={3}>
                            <Flex flexGrow={1} justifyContent="center">
                                <Text textDecoration={'underline'} fontWeight="bold">Prenez un rendez-vous</Text>
                            </Flex>

                        </Flex>
                        <Flex borderTop="1px solid #cccfcd" w="full" alignItems="center" justifyContent="space-between" p={3}>
                            <Flex flexGrow={1} justifyContent="center">

                                <Text color="gray.600">
                                    {time[0]} - {time[13]}
                                </Text>
                            </Flex>

                            <Flex>
                                <IconButton
                                    boxSize={7}
                                    color="gray.500"
                                    bg="transparent"
                                    _hover={{ color: 'black', bg: 'transparent' }}
                                    as={ChevronLeftIcon}
                                    isDisabled={CountedClick === 0}
                                    onClick={jumpbacktwoweeks}
                                />
                                <IconButton
                                    boxSize={7}
                                    color="gray.500"
                                    bg="transparent"
                                    _hover={{ color: 'black', bg: 'transparent' }}
                                    as={ChevronRightIcon}
                                    isDisabled={CountedClick === 3}
                                    onClick={jumptwoweektocurrenttime}
                                />
                            </Flex>
                        </Flex>
                        <Box borderTop="1px solid #cccfcd" p={4}
                            flex="2" mt={{ base: 4, md: 0 }} justify="center">
                            <Grid templateColumns="repeat(7, 1fr)" gap={2} mt={4}>
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

                        <Box borderTop="1px solid #cccfcd" p={4} align="center">
                            <Flex flexGrow={1} mb={5} justifyContent="center">
                                <Text fontWeight="bold">
                                    Emplacement
                                </Text>
                            </Flex>
                            <Box>
                                <AspectRatio ratio={16 / 9}>
                                    <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng' />
                                </AspectRatio>
                            </Box>
                        </Box>

                    </Box>



                </HStack>

                <Box align="center">
                    <Flex height={{ base: 'auto', md: '100%' }}
                        w="70%"
                        borderBottom={"1px solid #cccfcd"}
                        justifyContent={"space-between"}
                        p={3}
                    >
                        <Text fontSize="xl" fontWeight="bold" textDecoration={"underline"}>
                            {expert.reviews} Avis
                        </Text>
                        <Menu >
                            <MenuButton
                                className='menu-button'
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                                _hover={{ bg: 'none' }}
                                _expanded={{ bg: 'none' }}
                                _focus={{ bg: 'none' }}
                                background={"transparent"}
                            >
                                trier
                            </MenuButton>
                            <MenuList minWidth='240px'>
                                <MenuOptionGroup defaultValue='asc' title='Date de publication' type='radio'>
                                    <MenuItemOption value='asc'>Croissant</MenuItemOption>
                                    <MenuItemOption value='desc'>Décroissant</MenuItemOption>
                                </MenuOptionGroup>
                                <MenuDivider />
                                <MenuOptionGroup title='évaluation' type='checkbox'>
                                    <MenuItemOption value='asc'>Croissant</MenuItemOption>
                                    <MenuItemOption value='desc'>Décroissant</MenuItemOption>
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                    </Flex>

                    <Box w="70%" align="left" >
                        <Box p={5} borderBottom="1px solid #cccfcd">
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}

                            <Text fontSize="xl" color="gray.600">
                                Ils étaient géniaux ! J'ai eu une conversation très positive et calme sur mes dents, les points à améliorer et l'hygiène buccale en général.
                            </Text>
                            <Text  fontSize="md" pl={5} color="gray.400">
                                Janvier 30, 2024 . Foulen Fouleni
                            </Text>
                        </Box>
                        <Box p={5} borderBottom="1px solid #cccfcd">
                            {Array(3)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}
                                {Array(2)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('gray.300', 'gray.300') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}

                            <Text fontSize="xl" color="gray.600">
                                Ils étaient géniaux ! J'ai eu une conversation très positive et calme sur mes dents, les points à améliorer et l'hygiène buccale en général.
                            </Text>
                            <Text  fontSize="md" pl={5} color="gray.400">
                                Janvier 30, 2024 . Foulen Fouleni
                            </Text>
                        </Box>
                        <Box p={5} borderBottom="1px solid #cccfcd">
                            {Array(0)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}
                                {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('gray.300', 'gray.300') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}

                            <Text fontSize="xl" color="gray.600">
                                Ils étaient géniaux ! J'ai eu une conversation très positive et calme sur mes dents, les points à améliorer et l'hygiène buccale en général.
                            </Text>
                            <Text fontSize="md" pl={5} color="gray.400">
                                Janvier 30, 2024 . Foulen Fouleni
                            </Text>
                        </Box>
                        <Box p={5} borderBottom="1px solid #cccfcd">
                            {Array(2)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}
                                {Array(3)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('gray.300', 'gray.300') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}

                            <Text fontSize="xl" color="gray.600">
                                Ils étaient géniaux ! J'ai eu une conversation très positive et calme sur mes dents, les points à améliorer et l'hygiène buccale en général.
                            </Text>
                            <Text  fontSize="md" pl={5} color="gray.400">
                                Janvier 30, 2024 . Foulen Fouleni
                            </Text>
                        </Box>
                        <Box p={5} borderBottom="1px solid #cccfcd">
                            {Array(4)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}
                                {Array(1)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('gray.300', 'gray.300') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}

                            <Text fontSize="xl" color="gray.600">
                                Ils étaient géniaux ! J'ai eu une conversation très positive et calme sur mes dents, les points à améliorer et l'hygiène buccale en général.
                            </Text>
                            <Text   fontSize="md" pl={5} color="gray.400">
                                Janvier 30, 2024 . Foulen Fouleni
                            </Text>
                        </Box>
                        <Box p={5} borderBottom="1px solid #cccfcd">
                            {Array(3)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}
                                {Array(2)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        mr={2}
                                        key={i}
                                        color={i < expert.rating ? useColorModeValue('gray.300', 'gray.300') : useColorModeValue('gray.300', 'gray.600')}
                                    />
                                ))}

                            <Text fontSize="xl" color="gray.600">
                                Ils étaient géniaux ! J'ai eu une conversation très positive et calme sur mes dents, les points à améliorer et l'hygiène buccale en général.
                            </Text>
                            <Text fontSize="md" pl={5} color="gray.400">
                                Janvier 30, 2024 . Foulen Fouleni
                            </Text>
                        </Box>
                    </Box>

                </Box>
                {selectedExpert && (
                    <SelectedExpertModal
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                        selectedExpert={selectedExpert}
                        daysOfWeekWithDates={time}
                        openConfirmationModal={openConfirmationModal}
                    />
                )}

                {selectedSlot && (
                    <ConfirmationModal
                        isConfirmationModalOpen={isConfirmationModalOpen}
                        closeConfirmationModal={closeConfirmationModal}
                        selectedSlot={selectedSlot}
                        selectedExpert={selectedExpert}

                    />
                )}
          
        </>

    );

};
export default ExpertDetails;
