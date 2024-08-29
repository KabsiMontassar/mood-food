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
  theme,
  extendTheme,
} from '@chakra-ui/react';

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

const products = [
    {
      id: 1,
      name: 'Gainer',
      image: 'src/assets/images/gainer.jpeg',
      shortDescription: 'High-quality gainer.',
      detailedDescription: 'A high-quality gainer to boost your muscle mass and help you achieve your fitness goals faster.',
    },
    {
      id: 2,
      name: 'Rameur',
      image: 'src/assets/images/Remo.jpg',
      shortDescription: 'Effective rowing machine.',
      detailedDescription: 'A rowing machine for an effective full-body workout, ideal for building strength and endurance.',
    },
    {
      id: 3,
      name: 'Protein Shake',
      image: 'src/assets/images/protein shake.jpeg',
      shortDescription: 'Delicious protein shake.',
      detailedDescription: 'A delicious protein shake for muscle recovery and enhancing your post-workout nutrition.',
    },
    {
      id: 4,
      name: 'Yoga Matela',
      image: 'src/assets/images/yoga mat.jpeg',
      shortDescription: 'Comfortable yoga mat.',
      detailedDescription: 'Comfortable yoga mat for your workouts, providing excellent cushioning and grip during exercises.',
    },
    {
      id: 5,
      name: 'Running Shoes',
      image: 'src/assets/images/Shoes.avif',
      shortDescription: 'Lightweight running shoes.',
      detailedDescription: 'Lightweight running shoes designed for a smooth run and optimal comfort on any surface.',
    },
    {
      id: 6,
      name: 'Dumbbells Set',
      image: 'src/assets/images/dumble set.jpeg',
      shortDescription: 'Versatile dumbbells set.',
      detailedDescription: 'A set of versatile dumbbells for strength training, perfect for home workouts and gym sessions.',
    },
  ];
  
const ProductGrid = () => {
  const toast = useToast();

  const handleInfoClick = (product) => {
    toast({
      title: `Details about ${product.name}`,
      description: product.detailedDescription,
      status: 'info',
      duration: 4000,
      isClosable: true,
      position: 'top-right',
      variant: 'left-accent',
    });
  };

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

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} p={6}>
      {products.map((product) => (
        <Box
          key={product.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          bg="brand.50"
          _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
        >
          <VStack p={4}>
            <Image src={product.image} alt={product.name} boxSize="150px" objectFit="cover" />
            <Heading size="md" color="brand.700" mt={2} mb={2}>
              {product.name}
            </Heading>
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {product.description}
            </Text>
            <Button
              colorScheme="brand"
              size="sm"
              mt={2}
              onClick={() => handleInfoClick(product)}
            >
              Info
            </Button>
            <Button
              colorScheme="green"
              variant="outline"
              size="sm"
              mt={2}
              onClick={() => handleAddToCartClick(product)}
            >
              Add to Cart
            </Button>
          </VStack>
        </Box>
      ))}
    </Grid>
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
