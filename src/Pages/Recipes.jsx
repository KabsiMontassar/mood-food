import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderCarousel from '../components/HeaderCarousel'; // Adjust the path according to your file structure
import {
  Box,
  Heading,
  Stack,
  HStack,
  VStack,
  Image,
  Badge,
  Text,
  Select,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import recipes from '../data/recipes'; // Adjust the path if necessary

const Recipes = () => {
  // State for filtering
  const [filters, setFilters] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    cookingTime: 0,
    mealType: '',
  });

  // Handle change in filter inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Slider change for different nutrients and cooking time
  const handleSliderChange = (name) => (value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Convert nutrition values to numbers if they are strings
  const parseValue = (value) => (value === '' || isNaN(value) ? 0 : parseFloat(value));

  // Filtered recipes based on input criteria
  const filteredRecipes = recipes.filter((recipe) => {
    const recipeCalories = parseValue(recipe.calories);
    const recipeProtein = parseValue(recipe.protein);
    const recipeCarbs = parseValue(recipe.carbohydrates);
    const recipeFats = parseValue(recipe.fats);
    const recipeCookingTime = parseValue(recipe.cookingTime);

    return (
      recipe.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.calories === 0 || recipeCalories <= filters.calories) &&
      (filters.protein === 0 || recipeProtein >= filters.protein) &&
      (filters.carbohydrates === 0 || recipeCarbs <= filters.carbohydrates) &&
      (filters.fats === 0 || recipeFats <= filters.fats) &&
      (filters.cookingTime === 0 || recipeCookingTime <= filters.cookingTime) &&
      (filters.mealType === '' || recipe.mealType.toLowerCase() === filters.mealType.toLowerCase())
    );
  });

  return (
    <Box p={8} maxW="1600px" mx="auto">
      {/* Header Carousel */}
      <HeaderCarousel />

      {/* Main Heading */}
      <Heading as="h1" mb={8} textAlign="center" fontSize="4xl">
        Recipes
      </Heading>

      {/* Filters Section */}
      <Box mb={8} borderWidth="1px" borderRadius="lg" p={6} boxShadow="md">
        <Heading size="md" mb={6}>Filter Recipes</Heading>

        {/* Filters Container */}
        <Stack spacing={6}>
          {/* Name and Meal Type Filters Side by Side */}
          <HStack spacing={6}>
            {/* Search by Name */}
            <Box flex="1">
              <FormLabel htmlFor="name" fontSize="sm">Name</FormLabel>
              <Input
                id="name"
                placeholder="Search by name"
                name="name"
                value={filters.name}
                onChange={handleChange}
                size="md"
              />
            </Box>

            {/* Search by Category (Meal Type) */}
            <Box flex="1">
              <FormLabel htmlFor="mealType" fontSize="sm">Meal Type</FormLabel>
              <Select
                id="mealType"
                placeholder="Select Meal Type"
                name="mealType"
                value={filters.mealType}
                onChange={handleChange}
                size="md"
              >
                <option value="">All</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
              </Select>
            </Box>
          </HStack>

          {/* Nutritional Filters and Cooking Time Side by Side */}
          <HStack spacing={6} wrap="wrap">
            {/* Calories Filter with Slider */}
            <Box flex="1">
              <FormLabel htmlFor="calories" fontSize="sm">Calories: {filters.calories} kcal</FormLabel>
              <Slider
                id="calories"
                min={0}
                max={2000}
                step={10}
                value={filters.calories}
                onChange={handleSliderChange('calories')}
                size="md"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            {/* Protein Filter with Slider */}
            <Box flex="1">
              <FormLabel htmlFor="protein" fontSize="sm">Protein: {filters.protein} g</FormLabel>
              <Slider
                id="protein"
                min={0}
                max={200}
                step={1}
                value={filters.protein}
                onChange={handleSliderChange('protein')}
                size="md"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            {/* Carbs Filter with Slider */}
            <Box flex="1">
              <FormLabel htmlFor="carbohydrates" fontSize="sm">Carbs: {filters.carbohydrates} g</FormLabel>
              <Slider
                id="carbohydrates"
                min={0}
                max={200}
                step={1}
                value={filters.carbohydrates}
                onChange={handleSliderChange('carbohydrates')}
                size="md"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            {/* Fats Filter with Slider */}
            <Box flex="1">
              <FormLabel htmlFor="fats" fontSize="sm">Fats: {filters.fats} g</FormLabel>
              <Slider
                id="fats"
                min={0}
                max={200}
                step={1}
                value={filters.fats}
                onChange={handleSliderChange('fats')}
                size="md"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            {/* Cooking Time Filter with Slider */}
            <Box flex="1">
              <FormLabel htmlFor="cookingTime" fontSize="sm">Cooking Time: {filters.cookingTime} mins</FormLabel>
              <Slider
                id="cookingTime"
                min={0}
                max={180}
                step={1}
                value={filters.cookingTime}
                onChange={handleSliderChange('cookingTime')}
                size="md"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </HStack>
        </Stack>
      </Box>

      {/* Recipes Section */}
      <Box>
        <Stack direction="row" wrap="wrap" spacing={8} justify="center">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link to={`/recipes/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none' }}>
                <Box
                  p={10}
                  w="full"
                  maxW="2xl"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="lg"
                  _hover={{ boxShadow: '2xl' }}
                  transition="0.3s"
                >
                  {/* Center and Full Width Image */}
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    boxSize="100%"
                    h="400px"
                    objectFit="cover"
                    borderRadius="lg"
                  />

                  {/* Recipe Title and Details */}
                  <VStack align="flex-start" spacing={4} mt={4}>
                    <Heading size="lg">{recipe.name}</Heading>

                    {/* Meal Type and Cooking Time */}
                    <HStack justify="space-between" w="100%">
                      <Badge colorScheme="teal">{recipe.mealType}</Badge>
                      <HStack>
                        <FaClock />
                        <Text>{recipe.cookingTime} mins</Text>
                      </HStack>
                    </HStack>

                    {/* Description */}
                    <Text fontSize="md" color="gray.600" noOfLines={3}>
                      {recipe.description}
                    </Text>

                    {/* Calories and Nutrition Badges */}
                    <HStack spacing={3}>
                      <Badge colorScheme="green" fontSize="md">
                        {recipe.calories} kcal
                      </Badge>
                      <Badge colorScheme="purple" fontSize="md">
                        Protein: {recipe.protein} g
                      </Badge>
                      <Badge colorScheme="orange" fontSize="md">
                        Carbs: {recipe.carbohydrates} g
                      </Badge>
                      <Badge colorScheme="red" fontSize="md">
                        Fats: {recipe.fats} g
                      </Badge>
                    </HStack>
                  </VStack>
                </Box>
              </Link>
            ))
          ) : (
            <Text textAlign="center" fontSize="lg" color="gray.500">
              No recipes found based on your filters.
            </Text>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Recipes;
