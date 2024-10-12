import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HeaderCarousel from '../components/HeaderCarousel';
import chefshat from '../assets/chefs-hat.png';
import {
  Box,
  Heading,
  HStack,
  Grid,
  Image,
  Badge,
  Text,
  Divider,
  VStack,
  Button,
  Flex,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Icon,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import recipes from '../data/recipes';
import { FaBowlFood } from 'react-icons/fa6';
import { Search2Icon } from '@chakra-ui/icons';

const backgroundlinear = "linear-gradient(180deg, #FEEBC8 0%, white 100%)";

const Element = ({ recipe, onClick }) => {
  const { image, name, mealType, cookingTime, description, calories, protein, carbohydrates, fats, fiber } = recipe;

  return (
    <Box
      p={4}
      pb={8}
      bg="gray.50"
      borderRadius="lg"
      boxShadow="lg"
      border="2px solid rgba(228, 116, 102, .3)"
      _hover={{ backgroundColor: 'rgba(228, 176, 102, .3)', cursor: 'pointer' }}
      transition="0.3s"
      onClick={onClick}
    >
      <Image
        src={image}
        alt={name}
        boxSize="100%"
        h={{ base: '200px', md: '300px' }} // Responsive height
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

// Main Recipes component
const Recipes = () => {
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('protein');
  const [activeFilterType, setActiveFilterType] = useState('mealType');
  const [expandedRecipe, setExpandedRecipe] = useState(null); // State for the selected recipe for the drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State to manage drawer open/close
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const handleMealTypeChange = (mealType) => {
    setSelectedMealType(mealType);
  };

  const handleNutritionSortChange = (nutrient) => {
    setSelectedSortBy(nutrient);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  const useFilteredRecipes = (selectedMealType, selectedSortBy, searchTerm) => {
    const filteredRecipes = useMemo(() => {
      return recipes.filter(recipe =>
        (selectedMealType === '' || recipe.mealType.toLowerCase() === selectedMealType.toLowerCase()) &&
        (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }, [selectedMealType, searchTerm]);

    const sortedRecipes = useMemo(() => {
      return [...filteredRecipes].sort((a, b) => {
        switch (selectedSortBy) {
          case 'protein':
            return b.protein - a.protein;
          case 'calories':
            return b.calories - a.calories;
          case 'carbohydrates':
            return b.carbohydrates - a.carbohydrates;
          case 'fats':
            return b.fats - a.fats;
          case 'fiber':
            return b.fiber - a.fiber;
          default:
            return 0;
        }
      });
    }, [selectedSortBy, filteredRecipes]);

    return sortedRecipes;
  };

  const sortedRecipes = useFilteredRecipes(selectedMealType, selectedSortBy, searchTerm);

  const handleRecipeClick = (recipe) => {
    setExpandedRecipe(recipe); // Set the selected recipe
    setDrawerOpen(true); // Open the drawer
  };

  // Close drawer handler
  const closeDrawer = () => {
    setDrawerOpen(false);
    setExpandedRecipe(null); // Clear selected recipe when closing
  };

  return (
    <Box bg={backgroundlinear}>
      <Box display={{ base: 'none', md: 'block' }}>
        <HeaderCarousel />
      </Box>


      <Box pt={3} px={{ base: 4, md: 12 }}> {/* Responsive padding */}
        <Box p={6} border="2px solid rgba(228, 116, 102, .3)" bg="white" borderRadius="lg" boxShadow="md">
          <HStack spacing={4}>
            <Image src={chefshat} alt="chef's hat" boxSize="50px" />
            <Heading size={{ base: 'md', md: 'lg' }}
              color="orange.500" fontWeight="500">
              Qu'est-ce que tu souhaites cuisiner?
            </Heading>
          </HStack>

          <FormControl mt={4} display="flex" alignItems="center">
            <Input
              type="text"
              placeholder="Rechercher une recette"
              borderColor="rgba(228, 116, 102, .3)"
              focusBorderColor="orange.600"
              bg="white"
              _placeholder={{ color: "gray.400" }}
              size={{ base: 'md', md: 'lg' }}
              borderRadius="md"
              pr={10}
              value={searchTerm} // Controlled input
              onChange={handleSearchChange} // Handle input change
            />
            <Icon
              as={Search2Icon}
              color="orange.400"
              position="absolute"
              right="10px"
              cursor="pointer"
            />
          </FormControl>
        </Box>
      </Box>

      <Flex direction="column" >
        <Box w="100%">
          <Grid
            templateColumns={{ base: 'repeat(auto-fit, minmax(200px, 1fr))', md: 'repeat(auto-fit, minmax(200px, 1fr))', lg: 'repeat(2, 1fr)' }} // Adjust number of columns based on screen size
            gap={6}
            p={6}
          >
            {sortedRecipes.length > 0 ? (
              sortedRecipes.map((recipe) => (
                <Element
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleRecipeClick(recipe)} // Pass the entire recipe object
                />
              ))
            ) : (
              <Text textAlign="center" fontSize="lg" color="gray.500">
                No recipes found based on your filters.
              </Text>
            )}
          </Grid>
        </Box>
      </Flex>

      <Flex
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="white"
        height={{ base: 'auto', md: '80px' }} // Adjust height for small and large screens
        borderTop="2px solid rgba(228, 116, 102, .3)"
        zIndex={999}
        justify="space-between"
        flexWrap="wrap"
        
        alignItems="center"
        p={4}
      >
        <Flex spacing={0} position="absolute" left={0}>
          {activeFilterType === 'mealType' ? (
            <IconButton
              variant="outline"
              size="lg"
              borderRadius="0"
              border="0"
              onClick={() => setActiveFilterType('nutrition')}
              colorScheme="orange"
              icon={<FaBowlFood />}
              _hover={{ bg: 'transparent' }}
            />
          ) : (
            <IconButton
              size="lg"
              colorScheme="orange"
              variant="outline"
              onClick={() => setActiveFilterType('mealType')}
              border="0"
              borderRadius="0"
              icon={<FaClock />}
              _hover={{ bg: 'transparent' }}
            />
          )}
        </Flex>

        {/* Filter by Meal Type */}
        {activeFilterType === 'mealType' && (
          <HStack 
          w="100%"
        
            spacing={4} flexWrap="wrap" justifyContent="center"
          >
            <Button colorScheme="gray" fontSize={"xs"} variant="link" isDisabled>
              Filtrer par:
            </Button>
            {['', 'breakfast', 'lunch', 'dinner', 'dessert'].map((type) => (
              <Button
                key={type}
                colorScheme={selectedMealType === type ? 'orange' : 'gray'}
                variant="link"
                onClick={() => handleMealTypeChange(type)}
              >
                {type || 'All'}
              </Button>
            ))}
          </HStack>
        )}

        {/* Sort by Nutrition */}
        {activeFilterType === 'nutrition' && (
          <HStack   w="100%" spacing={4} flexWrap="wrap" justifyContent="center">
            <Button colorScheme="gray" fontSize={"xs"} variant="link" isDisabled>
              Trier par:
            </Button>
            {['protein', 'calories', 'carbohydrates', 'fats', 'fiber'].map((nutrient) => (
              <Button
                key={nutrient}
                colorScheme={selectedSortBy === nutrient ? 'orange' : 'gray'}
                variant="link"
                onClick={() => handleNutritionSortChange(nutrient)}
              >
                {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
              </Button>
            ))}
          </HStack>
        )}
      </Flex>


      <Drawer isOpen={isDrawerOpen} size="xl" placement={'right'}
        onClose={closeDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="orange.200">
            <Heading size="lg">{expandedRecipe?.name}</Heading>
          </DrawerHeader>
          <DrawerBody bg="linear-gradient(180deg, #FBD38D 0%, white 100%)" >
            <Image
              src={expandedRecipe?.image}
              alt={expandedRecipe?.name}
              mb={4}
              borderRadius="lg"
              objectFit="cover"
              w="100%"
              h="450px"
              objectPosition={{ base: 'top', md: 'center' }}
            />
            <HStack justifyContent={"space-between"}>
              <Badge colorScheme="orange">{expandedRecipe?.mealType}</Badge>
              <HStack>
                <FaClock />
                <Text>{expandedRecipe?.cookingTime} mins</Text>
              </HStack>
            </HStack>

            <Heading size="md" color="teal" fontWeight={"bold"} mb={2}>Description</Heading>
            <Text fontSize="md" color="gray.700" mb={4}>
              {expandedRecipe?.description}
            </Text>
            <Divider my={4} />
            <Heading size="md" color="teal" fontWeight={"bold"} mb={2}>Ingredients</Heading>
            <VStack pl={10} align="flex-start" spacing={1}>
              {expandedRecipe?.ingredients.map((ingredient, index) => (
                <Text key={index} fontSize="md" color="gray.700">
                  - {ingredient}
                </Text>
              ))}
            </VStack>
            <Divider my={4} />
            <Heading size="md" color="teal" fontWeight={"bold"} mb={2}>Instructions</Heading>
            <VStack align="flex-start" spacing={1} >

              <React.Fragment >
                <Heading pl={10} size="md" color="orange" fontWeight={"500"} mb={2}>
                  Etape 1
                </Heading>
                <Text pl={20} fontSize="md" color="gray.700">
                  . On commence par...
                </Text>
              </React.Fragment>
              <React.Fragment >
                <Heading pl={10} size="md" color="orange" fontWeight={"500"} mb={2}>
                  Etape 2
                </Heading>
                <Text pl={20} fontSize="md" color="gray.700">
                  .  et ensuite...
                </Text>
              </React.Fragment>
              <React.Fragment >
                <Heading pl={10} size="md" color="orange" fontWeight={"500"} mb={2}>
                  Etape 3
                </Heading>
                <Text pl={20} fontSize="md" color="gray.700">
                  . et enfin...
                </Text>
              </React.Fragment>
              <React.Fragment >
                <Heading pl={10} size="md" color="orange" fontWeight={"bold"} mb={2}>
                  Etape 4
                </Heading>
                <Text pl={20} fontSize="md" color="gray.700">
                  .  et pour finir...
                </Text>
              </React.Fragment>

            </VStack>
            <Divider my={4} />
            <Heading size="md" color="teal" fontWeight={"bold"} mb={2}>Informations nutritionnelles</Heading>
            <HStack spacing={4} wrap="wrap" justify="space-around">
              <Box
                align="center"
                p={4}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="md"
                borderColor="orange.300"
                width={{ base: "45%", md: "20%" }}
              >
                <Text fontWeight="bold" color="orange.600">Calories</Text>
                <Text fontSize="lg">{expandedRecipe?.calories} kcal</Text>
              </Box>
              <Box
                align="center"
                p={4}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="md"
                borderColor="green.300"
                width={{ base: "45%", md: "20%" }}
              >
                <Text fontWeight="bold" color="green.600">Protein</Text>
                <Text fontSize="lg">{expandedRecipe?.protein} g</Text>
              </Box>
              <Box
                align="center"
                p={4}
                borderWidth={1}
                borderRadius="lg"
                boxShadow="md"
                borderColor="teal.300"
                width={{ base: "45%", md: "20%" }} // Responsive card size
              >
                <Text fontWeight="bold" color="teal.600">Carbs</Text>
                <Text fontSize="lg">{expandedRecipe?.carbohydrates} g</Text>
              </Box>
              <Box
                p={4}
                borderWidth={1}
                borderRadius="lg"
                align="center"
                boxShadow="md"
                borderColor="yellow.300"
                width={{ base: "45%", md: "20%" }} // Responsive card size
              >
                <Text fontWeight="bold" color="yellow.600">Fats</Text>
                <Text fontSize="lg">{expandedRecipe?.fats} g</Text>
              </Box>
              <Box
                p={4}
                borderWidth={1}
                borderRadius="lg"
                align="center"
                boxShadow="md"
                borderColor="blue.300"
                width={{ base: "45%", md: "20%" }} // Responsive card size
              >
                <Text fontWeight="bold" color="blue.600">Fibers</Text>
                <Text fontSize="lg">{expandedRecipe?.fiber} g</Text>
              </Box>
            </HStack>
            <Divider my={4} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Recipes;
