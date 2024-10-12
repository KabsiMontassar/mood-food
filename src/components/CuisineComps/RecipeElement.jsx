import React from 'react';
import {
    Box,
    Heading,
    HStack,
    Image,
    Badge,
    Text,
    Flex,
} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';

const RecipeElement = ({ recipe, onClick }) => {
    const { image, name, mealType, cookingTime, description, calories, protein, carbohydrates, fats, fiber } = recipe;

    return (
        <Box
            p={4}
            pb={8}
            bg="gray.50"
            borderRadius="lg"
            border="2px solid rgba(228, 116, 102, .3)"
            _hover={{ backgroundColor: 'rgba(228, 176, 102, .3)', cursor: 'pointer' }}
            transition="0.3s"
            onClick={onClick}
        >
            <Image
                src={image}
                alt={name}
                boxSize="100%"
                h={{ base: '200px', md: '300px' }}
                objectFit="cover"
                borderRadius="lg"
            />
            <HStack align="flex-start" spacing={4} mt={4} flexDirection="column">
                <Heading size={{ base: 'md', md: 'lg' }}>{name}</Heading>
                <HStack justify="space-between" w="100%">
                    <Badge fontSize={"xs"} colorScheme="yellow">{mealType}</Badge>
                    <HStack>
                        <FaClock />
                        <Text>{cookingTime} mins</Text>
                    </HStack>
                </HStack>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" noOfLines={3}>
                    {description}
                </Text>
                <Flex
                    gap={2}
                    w="100%"
                    textAlign="center"
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Badge colorScheme="orange" fontSize="md">
                        {calories} kcal
                    </Badge>
                    <Badge colorScheme="orange" fontSize="md">
                        Protein: {protein} g
                    </Badge>
                    <Badge colorScheme="orange" fontSize="md">
                        Carbs: {carbohydrates} g
                    </Badge>
                    <Badge colorScheme="orange" fontSize="md">
                        Fats: {fats} g
                    </Badge>
                    <Badge colorScheme="orange" fontSize="md">
                        Fibers: {fiber}
                    </Badge>
                </Flex>
            </HStack>
        </Box>
    );
};


export default RecipeElement;