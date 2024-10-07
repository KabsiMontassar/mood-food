import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import recipes from '../data/recipes';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return (
      <Box p={6} maxW="900px" mx="auto" textAlign="center">
        <Heading size="lg">Recipe not found!</Heading>
        <Text fontSize="lg" color="gray.500" mt={4}>
          Oops! The recipe you're looking for doesn't exist.
        </Text>
      </Box>
    );
  }

  return (
    <Box w="100%" bg="green.50">

    
    <Box p={6}
      maxW={{ base: '90%', md: '80%' }}
      mx="auto"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src={recipe.image}
        alt={`${recipe.name} image`}
        w="100%"
        h="500px"
        objectFit="cover"
        borderRadius="lg"
        mb={4}
      />

      <HStack justify="space-between" align="center" mb={4}>
        <Heading size="xl">{recipe.name}</Heading>
        <HStack spacing={4}>
          <IconButton icon={<FaHeart />} variant={"outline"} aria-label="Like" colorScheme="red" />
          <IconButton icon={<FaShareAlt />} variant={"outline"} aria-label="Share" colorScheme="blue" />
        </HStack>
      </HStack>

      <HStack justify="space-between" mb={4}>
        <Badge colorScheme="teal" fontSize="md">{recipe.mealType}</Badge> {/* Meal Type */}
        <Text fontSize="md" color="gray.500">{recipe.cookingTime} mins</Text> {/* Cooking Time */}
      </HStack>

      <HStack spacing={2} mb={4}>
        <Badge colorScheme="green" fontSize="md">{recipe.calories} kcal</Badge>
        <Badge colorScheme="purple" fontSize="md">Protein: {recipe.protein}</Badge>
        <Badge colorScheme="orange" fontSize="md">Carbs: {recipe.carbohydrates}</Badge>
        <Badge colorScheme="pink" fontSize="md">Fats: {recipe.fats}</Badge>
      </HStack>

      <Divider mb={4} />

      <Text fontSize="lg" color="gray.600" mb={4}>
        {recipe.description}
      </Text>

      <Divider mb={4} />

      <Heading size="lg" mb={2}>Ingredients</Heading>
      <VStack align="flex-start" spacing={1} mb={4}>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} fontSize="md" color="gray.700">
            - {ingredient}
          </Text>
        ))}
      </VStack>

      <Divider mb={4} />

      <Heading size="lg" mb={2}>Instructions</Heading>
      <Text fontSize="md" color="gray.700" mb={4}>
        {recipe.cookingInstructions}
      </Text>
    </Box>
    </Box>
  );
};

export default RecipeDetail;
