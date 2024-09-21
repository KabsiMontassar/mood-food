import React, { useState } from 'react'
import bgrecherche from "../../assets/HomeBackgrounds/min.png";
import adhd from "../../assets/HomeCards/autism.png";
import nutritionalpyramid from "../../assets/HomeCards/nutritional-pyramid.png";
import nutritionplan from "../../assets/HomeCards/nutrition-plan.png";
import sciencebook from "../../assets/HomeCards/science-book.png";
import { Box, Flex, Heading, Text, Button, FormControl, FormLabel, Select, Image } from '@chakra-ui/react';
const ImageCards = [
    adhd,
    sciencebook,
    nutritionalpyramid,
    nutritionplan
];

const TunisGovernorates = [
    'Ariana',
    'Beja',
    'Ben Arous',
    'Bizerte',
    'Gabes',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kebili',
    'Kef',
    'Mahdia',
    'Manouba',
    'Medenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis',
    'Zaghouan'
];
const psychologistTypes = [
    "Clinical Psychologist",
    "Neuropsychologist",
    "Industrial-Organizational Psychologist",
    "Sports Psychologist",
    "Developmental Psychologist",
    "Social Psychologist",
    "Cognitive Psychologist",
    "Psychotherapist"
];


const NavSearch = ({ searchAddress, setSearchAddress, selectedType, setSelectedType, selectedSubType, setSelectedSubType, psychologistTypes }) => {
    return (

        <Flex

            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="center"
            alignItems="center"

            gap={4}
            w={{ base: '100%', md: '80%' }}
            p={4}
        >

            <FormControl variant="floating" id="Address">
                <FormLabel color="white">Gouvernorat:</FormLabel>
                <Select
                    border={0}
                    borderRadius="md"
                    bg='white'


                    value={searchAddress}
                    onChange={e => {
                        setSearchAddress(e.target.value);
                    }}
                    focusBorderColor="green.500"
                >
                    <option value="">Tous</option>
                    {TunisGovernorates.map((governorate, index) => (
                        <option key={index} value={governorate}>{governorate}</option>
                    ))}

                </Select>
            </FormControl>
            <FormControl variant="floating" >
                <FormLabel color="white">Type:</FormLabel>
                <Select
                    border={0}
                    borderRadius="md"
                    bg='white'

                    value={selectedType}
                    onChange={e => {
                        setSelectedType(e.target.value);
                        setSelectedSubType('All');
                    }}
                    focusBorderColor="green.500"
                >
                    <option value="All">Tous</option>
                    <option value="Nutritionist">Nutritionist</option>
                    <option value="Psychologist">Psychologist</option>
                </Select>
            </FormControl>


            {selectedType === 'Psychologist' && (
                <FormControl variant="floating"  >
                    <FormLabel color="white">Spécialité:</FormLabel>
                    <Select
                        border={0}
                        borderRadius="md"
                        bg='white'
                        value={selectedSubType}
                        onChange={e => setSelectedSubType(e.target.value)}
                        focusBorderColor="green.500"
                    >
                        <option value="All">All</option>
                        {psychologistTypes.map((subType, index) => (
                            <option key={index} value={subType}>{subType}</option>
                        ))}
                    </Select>

                </FormControl>
            )}
            <Button colorScheme="gray" color="#0A7342" variant="solid" size="md" w="40%" mt={8} >
                Find Experts
            </Button>

        </Flex>
    );
};



const CardCustom = ({ img }) => {
    return (
        <Box
            bg="green.700"
            opacity={0.7}
            p={4}
            alignItems="center"
            borderRadius="md"
            align="center"
            clipPath={{ base: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', md: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
            <Image
                src={img}
                alt="Expert"

                w={{ base: '50%', md: 'auto' }}
                h={{ base: 'auto', md: '150px' }}
                objectFit="cover"
                borderRadius="md"
            />
        </Box>
    );
};
const SearchHeader = () => {

    const [searchAddress, setSearchAddress] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedSubType, setSelectedSubType] = useState('All');
    return (
        <Box
            bgImage={`url(${bgrecherche})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgAttachment="fixed"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            position="relative"
            align="center"
            gap={9}
        >

            <Box
                bg="rgba(10, 115, 66, 0.7)"
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                zIndex="1"
            />


            <Box zIndex="2" w="100%" align="center">
                <Heading as="h1" size="2xl" color="gray.100" mt={4} mb={4}>
                    Trouvez les meilleurs experts en Tunisie
                </Heading>
                <Text color="gray.200" fontSize="lg" mb={4}>
                    Trouvez les meilleurs experts en Tunisie, des nutritionnistes aux psychologues, et prenez rendez-vous avec eux.
                </Text>

                <NavSearch
                    searchAddress={searchAddress}
                    setSearchAddress={setSearchAddress}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedSubType={selectedSubType}
                    setSelectedSubType={setSelectedSubType}
                    psychologistTypes={psychologistTypes}
                />


            </Box>

            <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                align="center"
                gap={10}
                p={4}
                zIndex="2"
            >
                {ImageCards.map((img, index) => (
                    <CardCustom key={index} img={img} />
                ))}
            </Flex>
        </Box>
    )
}

export default SearchHeader