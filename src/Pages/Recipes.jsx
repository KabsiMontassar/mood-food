import React from 'react';
import {
  ChakraProvider,
  Grid,
  Box,
  Image,
  Button,
  useToast,
  Heading,
  Text,
  VStack,
  extendTheme,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

// Import images from your assets
import spaghettiImage from '../assets/spaghetti-bolognese.jpg';
import chickenCurryImage from '../assets/chicken-curry.jpg';
import veganSaladImage from '../assets/vegan-salad.jpg';
import grilledSalmonImage from '../assets/grilled-salmon.jpg';
import pancakesImage from '../assets/pancakes.jpg';
import chocolateCakeImage from '../assets/chocolate-cake.jpg';

// Custom theme
const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#fff7e6',
      100: '#ffe6b3',
      200: '#ffd480',
      300: '#ffc34d',
      400: '#ffb31a',
      500: '#e69900',
      600: '#b37700',
      700: '#805500',
      800: '#4d3300',
      900: '#1a1100',
    },
  },
});

// Recipe data
const recipes = [
  {
    id: 1,
    name: 'Spaghetti Bolognese',
    image: spaghettiImage,
    description: 'Classic Italian pasta with a rich meat sauce.',
    ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce', 'Garlic', 'Onion', 'Italian Herbs'],
    calories: 650,
    protein: '30g',
    fiber: '5g',
    carbohydrates: '75g',
    fats: '20g',
    cookingInstructions: 'Cook spaghetti according to package directions. In a separate pan, cook ground beef until browned. Add tomato sauce, garlic, onion, and herbs. Simmer for 30 minutes and serve over spaghetti.',
  },
  {
    id: 2,
    name: 'Chicken Curry',
    image: chickenCurryImage,
    description: 'Spicy and creamy chicken curry with a blend of Indian spices.',
    ingredients: ['Chicken', 'Coconut Milk', 'Curry Powder', 'Onion', 'Garlic', 'Ginger'],
    calories: 700,
    protein: '40g',
    fiber: '6g',
    carbohydrates: '30g',
    fats: '35g',
    cookingInstructions: 'Sauté onion, garlic, and ginger until soft. Add chicken and curry powder, cook until chicken is browned. Stir in coconut milk and simmer for 20 minutes.',
  },
  {
    id: 3,
    name: 'Vegan Salad',
    image: veganSaladImage,
    description: 'Fresh and colorful salad with a variety of vegetables.',
    ingredients: ['Lettuce', 'Tomatoes', 'Cucumbers', 'Carrots', 'Bell Peppers', 'Olive Oil'],
    calories: 250,
    protein: '5g',
    fiber: '8g',
    carbohydrates: '30g',
    fats: '10g',
    cookingInstructions: 'Chop vegetables and mix in a large bowl. Drizzle with olive oil and toss to combine.',
  },
  {
    id: 4,
    name: 'Grilled Salmon',
    image: grilledSalmonImage,
    description: 'Tender and juicy salmon fillet with a smoky flavor.',
    ingredients: ['Salmon Fillet', 'Lemon', 'Garlic', 'Olive Oil', 'Salt', 'Pepper'],
    calories: 400,
    protein: '35g',
    fiber: '0g',
    carbohydrates: '0g',
    fats: '25g',
    cookingInstructions: 'Season salmon with lemon, garlic, salt, and pepper. Grill over medium heat for 5-7 minutes on each side, or until cooked through.',
  },
  {
    id: 5,
    name: 'Pancakes',
    image: pancakesImage,
    description: 'Fluffy pancakes served with maple syrup.',
    ingredients: ['Flour', 'Eggs', 'Milk', 'Baking Powder', 'Butter', 'Maple Syrup'],
    calories: 500,
    protein: '10g',
    fiber: '2g',
    carbohydrates: '65g',
    fats: '20g',
    cookingInstructions: 'Mix flour, baking powder, milk, eggs, and melted butter. Pour batter onto a hot griddle and cook until bubbles form. Flip and cook until golden brown. Serve with maple syrup.',
  },
  {
    id: 6,
    name: 'Chocolate Cake',
    image: chocolateCakeImage,
    description: 'Rich and moist chocolate cake with a smooth frosting.',
    ingredients: ['Flour', 'Cocoa Powder', 'Sugar', 'Eggs', 'Butter', 'Milk', 'Vanilla Extract'],
    calories: 800,
    protein: '8g',
    fiber: '4g',
    carbohydrates: '90g',
    fats: '45g',
    cookingInstructions: 'Mix dry ingredients and wet ingredients separately. Combine and pour into a greased cake pan. Bake at 350°F (175°C) for 30-35 minutes. Cool and frost with chocolate frosting.',
  },
];

const RecipeGrid = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);

  const handleInfoClick = (recipe) => {
    setSelectedRecipe(recipe);
    onOpen();
  };

  const handleAddToFavoritesClick = (recipe) => {
    toast({
      title: `${recipe.name} added to favorites`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
      variant: 'solid',
    });
  };

  return (
    <>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} p={6}>
        {recipes.map((recipe) => (
          <Box
            key={recipe.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bg="brand.50"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
          >
            <VStack p={4}>
              <Image src={recipe.image} alt={recipe.name} boxSize="150px" objectFit="cover" />
              <Heading size="md" color="brand.700" mt={2} mb={2}>
                {recipe.name}
              </Heading>
              <Text fontSize="sm" color="gray.600" noOfLines={2}>
                {recipe.description}
              </Text>
              <Button
                colorScheme="brand"
                size="sm"
                mt={2}
                onClick={() => handleInfoClick(recipe)}
              >
                Info
              </Button>
              <Button
                colorScheme="green"
                variant="outline"
                size="sm"
                mt={2}
                onClick={() => handleAddToFavoritesClick(recipe)}
              >
                Add to Favorites
              </Button>
            </VStack>
          </Box>
        ))}
      </Grid>

      {/* Modal for Recipe Details */}
      {selectedRecipe && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedRecipe.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={selectedRecipe.image} alt={selectedRecipe.name} boxSize="full" objectFit="cover" mb={4} />
              <Text mb={2}><strong>Description:</strong> {selectedRecipe.description}</Text>
              <Text mb={2}><strong>Ingredients:</strong> {selectedRecipe.ingredients.join(', ')}</Text>
              <Text mb={2}><strong>Calories:</strong> {selectedRecipe.calories} kcal</Text>
              <Text mb={2}><strong>Protein:</strong> {selectedRecipe.protein}</Text>
              <Text mb={2}><strong>Fiber:</strong> {selectedRecipe.fiber}</Text>
              <Text mb={2}><strong>Carbohydrates:</strong> {selectedRecipe.carbohydrates}</Text>
              <Text mb={2}><strong>Fats:</strong> {selectedRecipe.fats}</Text>
              <Text mb={2}><strong>Instructions:</strong> {selectedRecipe.cookingInstructions}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const RecipesPage = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <RecipeGrid />
    </ChakraProvider>
  );
};

export default RecipesPage;
