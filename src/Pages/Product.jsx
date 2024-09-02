import React, { useState } from 'react';
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
  Input,
  Select,
  Stack,
  IconButton,
  HStack,
  extendTheme,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

// Extend the Chakra UI theme with custom colors
const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#e6ffee',
      100: '#b3ffd9',
      200: '#80ffc3',
      300: '#4dffad',
      400: '#1aff98',
      500: '#00e680',
      600: '#00b36b',
      700: '#008056',
      800: '#004d3a',
      900: '#001a15',
    },
  },
});

// Define the list of products with additional fields
const products = [
  {
    productId: 1,
    name: 'Gainer',
    description: 'A high-quality gainer to boost your muscle mass and help you achieve your fitness goals faster.',
    category: 'Produit Diététique',
    section: 'Supplements',
    price: 50,
    image: 'src/assets/images/gainer.jpeg',
  },
  {
    productId: 2,
    name: 'Rameur',
    description: 'A rowing machine for an effective full-body workout, ideal for building strength and endurance.',
    category: 'Matériel',
    section: 'Equipment',
    price: 80,
    image: 'src/assets/images/Remo.jpg',
  },
  {
    productId: 3,
    name: 'Protein Shake',
    description: 'A delicious protein shake for muscle recovery and enhancing your post-workout nutrition.',
    category: 'Produit Diététique',
    section: 'Supplements',
    price: 30,
    image: 'src/assets/images/protein shake.jpeg',
  },
  {
    productId: 4,
    name: 'Yoga Mat',
    description: 'Comfortable yoga mat for your workouts, providing excellent cushioning and grip during exercises.',
    category: 'Matériel',
    section: 'Accessories',
    price: 40,
    image: 'src/assets/images/yoga mat.jpeg',
  },
  {
    productId: 5,
    name: 'Running Shoes',
    description: 'Lightweight running shoes designed for a smooth run and optimal comfort on any surface.',
    category: 'Vêtement',
    section: 'Apparel',
    price: 60,
    image: 'src/assets/images/Shoes.avif',
  },
  {
    productId: 6,
    name: 'Dumbbells Set',
    description: 'A set of versatile dumbbells for strength training, perfect for home workouts and gym sessions.',
    category: 'Matériel',
    section: 'Equipment',
    price: 70,
    image: 'src/assets/images/dumble set.jpeg',
  },
];

const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const toast = useToast();

  // Handle changes in the search input
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  // Handle changes in the category filter
  const handleCategoryChange = (event) => setCategoryFilter(event.target.value);

  // Handle clicking the Info button to navigate to a new page with product details
  const handleInfoClick = (product) => {
    window.location.href = `/product/${product.productId}`;
  };

  // Handle clicking the Add to Cart button
  const handleAddToCartClick = (product) => {
    toast({
      title: `${product.name} added to cart`,
      description: `You have added ${product.name} to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
      variant: 'solid',
    });
  };

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Sidebar and Search Bar */}
      <Stack direction="row" spacing={4} align="start" p={6}>
        {/* Sidebar */}
        <Box w="20%" bg="gray.50" p={4} borderRadius="md" boxShadow="md">
          <Heading size="sm" mb={4} color="gray.600">Keywords</Heading>
          <Stack spacing={3}>
            <Select placeholder="Compléments Alimentaires" onChange={handleCategoryChange}>
              <option value="Complément Alimentaire">Complément Alimentaire</option>
              <option value="Produit Diététique">Produit Diététique</option>
            </Select>
            <Select placeholder="Équipement Sportif" onChange={handleCategoryChange}>
              <option value="Matériel">Matériel</option>
              <option value="Vêtement">Vêtement</option>
            </Select>
          </Stack>
        </Box>

        {/* Main Content */}
        <Box w="80%">
          <HStack mb={4}>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="md"
              maxW="300px"
            />
            <IconButton
              icon={<SearchIcon />}
              aria-label="Search"
              onClick={() => {}}
              colorScheme="green"
            />
          </HStack>

          {/* Sort Options */}
          <HStack spacing={4} mb={4}>
            <Button colorScheme="green" variant="outline">New</Button>
            <Select placeholder="Price ascending">
              <option value="asc">Price ascending</option>
              <option value="desc">Price descending</option>
            </Select>
            <Select placeholder="Rating">
              <option value="rating">Rating</option>
            </Select>
          </HStack>

          {/* Product Grid */}
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Box
                  key={product.productId}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  bg="white"
                  p={4}
                >
                  <VStack spacing={4}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      boxSize="150px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Heading size="md" color="gray.800" textAlign="center">
                      {product.name}
                    </Heading>
                    <Text fontSize="sm" color="gray.600" noOfLines={2} textAlign="center">
                      {product.description}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="green.500">
                      ${product.price}
                    </Text>
                    <Button
                      colorScheme="green"
                      size="sm"
                      onClick={() => handleInfoClick(product)}
                      width="100%"
                    >
                      Details
                    </Button>
                    <Button
                      colorScheme="green"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToCartClick(product)}
                      width="100%"
                    >
                      Add to Cart
                    </Button>
                  </VStack>
                </Box>
              ))
            ) : (
              <Box gridColumn="1 / -1" textAlign="center" color="gray.500">
                <Text>No products found.</Text>
              </Box>
            )}
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

const ProductPage = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <ProductGrid />
    </ChakraProvider>
  );
};

export default ProductPage;
