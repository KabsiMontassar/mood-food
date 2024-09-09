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
import recipes from '../data/recipes'; // Adjust path as needed

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const recipe = recipes.find((r) => r.id === parseInt(id)); // Find the recipe by ID

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
    <Box p={6} maxW="900px" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
      {/* Recipe Image */}
      <Image
        src={recipe.image}
        alt={`${recipe.name} image`}
        w="100%"
        h="300px"
        objectFit="cover"
        borderRadius="lg"
        mb={4}
      />

      {/* Recipe Title and Actions */}
      <HStack justify="space-between" align="center" mb={4}>
        <Heading size="lg">{recipe.name}</Heading>
        <HStack spacing={4}>
          <IconButton icon={<FaHeart />} aria-label="Like" colorScheme="red" />
          <IconButton icon={<FaShareAlt />} aria-label="Share" colorScheme="blue" />
        </HStack>
      </HStack>

      {/* Cooking Time and Meal Type */}
      <HStack justify="space-between" mb={4}>
        <Badge colorScheme="teal" fontSize="sm">{recipe.mealType}</Badge> {/* Meal Type */}
        <Text fontSize="sm" color="gray.500">{recipe.cookingTime} mins</Text> {/* Cooking Time */}
      </HStack>

      {/* Nutrition Badges */}
      <HStack spacing={2} mb={4}>
        <Badge colorScheme="green" fontSize="sm">{recipe.calories} kcal</Badge>
        <Badge colorScheme="purple" fontSize="sm">Protein: {recipe.protein}</Badge>
        <Badge colorScheme="orange" fontSize="sm">Carbs: {recipe.carbohydrates}</Badge>
        <Badge colorScheme="pink" fontSize="sm">Fats: {recipe.fats}</Badge>
      </HStack>

      <Divider mb={4} />

      {/* Recipe Description */}
      <Text fontSize="md" color="gray.600" mb={4}>
        {recipe.description}
      </Text>

      <Divider mb={4} />

      {/* Ingredients Section */}
      <Heading size="md" mb={2}>Ingredients</Heading>
      <VStack align="flex-start" spacing={1} mb={4}>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} fontSize="sm" color="gray.700">
            - {ingredient}
          </Text>
        ))}
      </VStack>

      <Divider mb={4} />

      {/* Cooking Instructions Section */}
      <Heading size="md" mb={2}>Instructions</Heading>
      <Text fontSize="sm" color="gray.700" mb={4}>
        {recipe.cookingInstructions}
      </Text>
    </Box>
  );
};

export default RecipeDetail;
