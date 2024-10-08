import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderCarousel from '../components/HeaderCarousel';
import {
  Box,
  Heading,
  Stack,
  HStack,
  VStack,
  Grid,
  Image,
  Badge,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Input,
} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import recipes from '../data/recipes';
import { ChevronDownIcon } from '@chakra-ui/icons';

const background= "rgb(1,152,116)";
const backgroundlinear =" linear-gradient(180deg, #68D391 0%, white   100%)";

const Element = ({ recipe }) => (
  <Box
    p={4}
    pb={8}
    bg="gray.50"




    borderRadius="lg"
    boxShadow="lg"
    border="2px solid rgba(1, 152, 116, .3)"
    _hover={{ backgroundColor: 'rgba(1, 152, 116, .3)' }}
    transition="0.3s"
  >
    <Image
      src={recipe.image}
      alt={recipe.name}
      boxSize="100%"
      h={{ base: '200px', md: '300px' }}
      objectFit="cover"
      borderRadius="lg"
    />
    <VStack align="flex-start" spacing={4} mt={4}>
      <Heading size="lg">{recipe.name}</Heading>
      <HStack justify="space-between" w="100%">
        <Badge colorScheme="teal">{recipe.mealType}</Badge>
        <HStack>
          <FaClock />
          <Text>{recipe.cookingTime} mins</Text>
        </HStack>
      </HStack>
      <Text fontSize="md" color="gray.600" noOfLines={3}>
        {recipe.description}
      </Text>
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
);

const Recipes = () => {
  const [filters, setFilters] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    cookingTime: 0,
    mealType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name) => (value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleMealTypeChange = (mealType) => {
    setFilters((prev) => ({ ...prev, mealType }));
  };

  const parseValue = (value) => (value === '' || isNaN(value) ? 0 : parseFloat(value));

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
    <Box bg={backgroundlinear} >
      <HeaderCarousel />
   
      <Flex  direction={{ base: 'column', lg: 'row' }} p={12} gap={6}>
        <Box  w={{ base: '100%', lg: '25%' }} p={6} borderRadius="lg" bg="gray.50" boxShadow="md">
          <Heading size="md" mb={6}>Filter Recipes</Heading>
          <Stack spacing={6}>
            <Box w="100%">
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
            <Box w="100%">
              <FormLabel htmlFor="calories" fontSize="sm">Calories: {filters.calories} kcal</FormLabel>
              <Slider
                colorScheme="green"
                id="calories"
                min={0}
                max={2000}
                step={10}
                value={filters.calories}
                onChange={handleSliderChange('calories')}
                size="md"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="protein" fontSize="sm">Protein: {filters.protein} g</FormLabel>
              <Slider
                colorScheme="green"
                id="protein"
                min={0}
                max={200}
                step={1}
                value={filters.protein}
                onChange={handleSliderChange('protein')}
                size="md"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="carbohydrates" fontSize="sm">Carbs: {filters.carbohydrates} g</FormLabel>
              <Slider
                colorScheme="green"
                id="carbohydrates"
                min={0}
                max={200}
                step={1}
                value={filters.carbohydrates}
                onChange={handleSliderChange('carbohydrates')}
                size="md"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box w="100%">
              <FormLabel htmlFor="fats" fontSize="sm">Fats: {filters.fats} g</FormLabel>
              <Slider
                colorScheme="green"
                id="fats"
                min={0}
                max={200}
                step={1}
                value={filters.fats}
                onChange={handleSliderChange('fats')}
                size="md"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            <Box w="100%">
              <FormLabel htmlFor="cookingTime" fontSize="sm">Cooking Time: {filters.cookingTime} mins</FormLabel>
              <Slider
                colorScheme="green"
                id="cookingTime"
                min={0}
                max={180}
                step={1}
                value={filters.cookingTime}
                onChange={handleSliderChange('cookingTime')}
                size="md"
              >
                <SliderTrack><SliderFilledTrack /></SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Stack>
        </Box>

        <Box w={{ base: '100%', lg: '75%' }}>
          <Box  align={"right"}  w="100%">
            <Menu  >
              <MenuButton  mr={6} as={Button} rightIcon={<ChevronDownIcon />} colorScheme="green" variant="outline" size="md" >
                Meal Type: {filters.mealType || 'All'}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleMealTypeChange('')}>All</MenuItem>
                <MenuItem onClick={() => handleMealTypeChange('breakfast')}>Breakfast</MenuItem>
                <MenuItem onClick={() => handleMealTypeChange('lunch')}>Lunch</MenuItem>
                <MenuItem onClick={() => handleMealTypeChange('dinner')}>Dinner</MenuItem>
                <MenuItem onClick={() => handleMealTypeChange('dessert')}>Dessert</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)' }}
            gap={6}
            p={6}
            h="100%"
          >
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none' }}>
                  <Element recipe={recipe} />
                </Link>
              ))
            ) : (
              <Text textAlign="center" fontSize="lg" color="gray.500">
                No recipes found based on your filters.
              </Text>
            )}
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default Recipes;
