import React ,{useState}from 'react';
import {
    Box,
    Heading,
    HStack,
    Image,
    Badge,
    Text,
    Flex,
    
} from '@chakra-ui/react';
import RecipeDetails from './RecipeDetails';

import { FaClock } from 'react-icons/fa';

const RecipeElement = ({ recipe }) => {
    const { image, name, mealType, time, guideDescritpion, calories, protein, carbohydrate, lipide, fiber } = recipe;
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    

    
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleRecipeClick = () => {
    setDrawerOpen(true);
  };

    return (
        <>
        <Box
            p={4}
            pb={8}
            bg="gray.50"
           
            className="recipe-element"
            _hover={{
                 backgroundColor: 'rgba(10, 115, 66, 0.7)',
                  cursor: 'pointer' ,
                    color: 'white'
                  }}
            transition="0.3s"
            onClick={handleRecipeClick}
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
                    <Badge fontSize={"md"} colorScheme="teal">{mealType}</Badge>
                    <HStack>
                        <FaClock />
                        <Text>{time} mins</Text>
                    </HStack>
                </HStack>
                <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" noOfLines={3}>
                    {guideDescritpion}
                </Text>
                <Flex
                    gap={2}
                    w="100%"
                    textAlign="center"
                    direction={{ base: 'column', md: 'row' }}
                >
                    <Badge colorScheme="green" fontSize="md">
                        {calories} kcal
                    </Badge>
                    <Badge colorScheme="green" fontSize="md">
                        Protein: {protein} g
                    </Badge>
                    <Badge colorScheme="green" fontSize="md">
                        Carbs: {carbohydrate} g
                    </Badge>
                    <Badge colorScheme="green" fontSize="md">
                    lipide: {lipide} g
                    </Badge>
                    <Badge colorScheme="green" fontSize="md">
                        Fibers: {fiber}
                    </Badge>
                </Flex>
            </HStack>
        </Box>
        <RecipeDetails 
        expandedRecipe={recipe} 
        isDrawerOpen={isDrawerOpen} 
        closeDrawer={closeDrawer} 
      />
      </>
    );
};


export default RecipeElement;