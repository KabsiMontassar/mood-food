import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  Image,
  Button,
  useToast,
  Heading,
  Text,
  HStack,
  Input,
  Select,
  Stack,
  Checkbox,
  extendTheme,
  Flex,
} from '@chakra-ui/react';

// Custom Chakra UI theme
const customTheme = extendTheme({
  colors: {
    blackWhite: {
      background: '#f5f5f5',
      text: '#333333',
    },
    green: {
      500: '#32a852',
    },
    orange: {
      500: '#f06c00',
    },
  },
});

// Initial Products
const initialProducts = [
  {
    productId: 1,
    name: 'Gainer',
    description: 'A high-quality gainer to boost your muscle mass and help you achieve your fitness goals faster.',
    category: 'Produit Diététique',
    section: 'Supplements',
    price: 50,
    image: '/src/assets/images/gainer.jpeg',
  },
  {
    productId: 2,
    name: 'Rameur',
    description: 'A rowing machine for an effective full-body workout, ideal for building strength and endurance.',
    category: 'Equipement sportif',
    section: 'Equipment',
    price: 80,
    image: '/src/assets/images/remo.jpg',
  },
  {
    productId: 3,
    name: 'Protein Shake',
    description: 'A delicious protein shake for muscle recovery and enhancing your post-workout nutrition.',
    category: 'Produit Diététique',
    section: 'Supplements',
    price: 30,
    image: '/src/assets/images/protein shake.jpeg',
  },
  {
    productId: 4,
    name: 'Yoga Mat',
    description: 'Comfortable yoga mat for your workouts, providing excellent cushioning and grip during exercises.',
    category: 'Equipement sportif',
    section: 'Accessories',
    price: 40,
    image: '/src/assets/images/yoga mat.jpeg',
  },
  {
    productId: 5,
    name: 'Running Shoes',
    description: 'Lightweight running shoes designed for a smooth run and optimal comfort on any surface.',
    category: 'Equipement sportif',
    section: 'Apparel',
    price: 60,
    image: '/src/assets/images/Shoes.avif',
  },
  {
    productId: 6,
    name: 'Dumbbells Set',
    description: 'A set of versatile dumbbells for strength training, perfect for home workouts and gym sessions.',
    category: 'Equipement sportif',
    section: 'Equipment',
    price: 70,
    image: '/src/assets/images/dumble set.jpeg',
  },
  {
    productId: 7,
    name: 'AKTIV Zinc + Histidine + Vitamine C 30 Comprimes',
    description: 'Comprimés au zinc, biodisponibilité augmentée grâce à la L-Histidine, plus de la vitamine C pour soutenir les défenses naturelles de l’organisme.',
    category: 'Complement alimentaire',
    section: '',
    price: 40,
    image: '/src/assets/images/Zink.webp',
  },
];

// HeaderSection Component with Carousel Dots
const HeaderSection = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    {
      title: 'Produit Diététique',
      description: 'Découvrez nos produits diététiques pour une alimentation équilibrée, savoureuse et adaptée à vos objectifs de santé.',
      image: '/src/assets/images/diététiques.jpeg',
    },
    {
      title: 'Complement alimentaire',
      description: 'Boostez votre santé avec nos compléments alimentaires de qualité, conçus pour répondre à vos besoins spécifiques.',
      image: '/src/assets/images/complement.jpg',
    },
    {
      title: 'Equipement sportif',
      description: 'Équipez-vous avec notre sélection d’équipements et accessoires sportifs, parfaits pour atteindre vos performances optimales.',
      image: '/src/assets/images/sportif.webp',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = categories.findIndex((cat) => cat.title === selectedCategory);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
    }
  }, [selectedCategory]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const currentCategoryData = categories[currentIndex];

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box mb={6} position="relative" width="100%">
      <Box position="relative" textAlign="center">
        <Image
          src={currentCategoryData.image}
          alt={currentCategoryData.title}
          width="100%"
          height="400px"
          objectFit="cover"
          borderRadius="md"
        />

        {/* Overlaying the description on the image */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
        >
          <Box textAlign="center" color="white" p={4}>
            <Heading size="lg" mb={2}>
              {currentCategoryData.title}
            </Heading>
            <Text>{currentCategoryData.description}</Text>
          </Box>
        </Box>

        {/* Dots for carousel */}
        <HStack spacing={4} position="absolute" bottom={4} left="50%" transform="translateX(-50%)">
          {categories.map((_, idx) => (
            <Box
              key={idx}
              width={2}
              height={2}
              bg={idx === currentIndex ? 'orange.500' : 'white'}
              borderRadius="50%"
            />
          ))}
        </HStack>
      </Box>

      {/* Category buttons */}
      <HStack spacing={4} justifyContent="center" mt={4}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.title;
          return (
            <Button
              key={cat.title}
              onClick={() => onCategorySelect(cat.title)}
              variant={isActive ? 'solid' : 'outline'}
              bgImage={`url(${cat.image})`}
              bgSize="cover"
              bgPosition="center"
              color={isActive ? 'white' : 'black'}
              px={4}
              py={2}
              minWidth="400px"
              height="50px"
              border="none"
              boxShadow={isActive ? 'none' : '0px 4px 6px rgba(0, 0, 0, 0.3)'} // Gray shadow for inactive buttons
              transition="box-shadow 0.3s ease-in-out" // Smooth transition for shadow
            >
              {cat.title}
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
};

// ProductDetails Component
const ProductDetails = ({ product, onBackClick, onAddToCart }) => (
  <Box p={6}>
    <Button onClick={onBackClick} colorScheme="orange" mb={4}>Back to Products</Button>
    <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6}>
      {/* Left side - Image */}
      <Box>
        <Image
          src={product.image}
          alt={product.name}
          boxSize={{ base: '100%', md: '300px' }}
          objectFit="cover"
          borderRadius="md"
        />
      </Box>
      {/* Right side - Details */}
      <Box>
        <Text fontSize="sm" color="gray.500" mb={2}>{product.category}</Text> {/* Category */}
        <Heading size="lg" mb={2}>{product.name}</Heading>
        <Box borderBottom="2px" borderColor="black" mb={4} /> {/* Black break line */}
        <Text fontSize="lg" mb={4}>{product.description}</Text>
        <Text fontSize="2xl" color="orange.500" mb={4}>{product.price} DT</Text>
        <Button colorScheme="orange" onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </Box>
    </Grid>
  </Box>
);

// ProductGrid Component with Sidebar and 4 products per row


const ProductGrid = ({ selectedCategory, onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSortOrder, setPriceSortOrder] = useState('ascending');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setSelectedKeywords([]);
  }, [selectedCategory]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handlePriceSortOrderChange = (event) => setPriceSortOrder(event.target.value);
  const handleKeywordChange = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  const handleCategoryClick = (category) => {
    onCategorySelect(category);
  };

  const handleShowAllClick = () => {
    onCategorySelect('');
  };

  const handleInfoClick = (product) => setShowDetails(product);
  const handleBackClick = () => setShowDetails(null);
  const handleAddToCartClick = (product) => {
    toast({
      title: `${product.name} added to cart`,
      description: `You have added ${product.name} to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  const filteredProducts = initialProducts
    .filter((product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedKeywords.length === 0 || selectedKeywords.every((keyword) =>
        product.description.toLowerCase().includes(keyword.toLowerCase())
      ))
    )
    .sort((a, b) =>
      priceSortOrder === 'ascending' ? a.price - b.price : b.price - a.price
    );

  const categories = [
    'Produit Diététique',
    'Complement alimentaire',
    'Equipement sportif',
  ];

  const keywords = [
    'high-quality', 'muscle mass', 'full-body workout', 'protein shake', 'comfort', 'lightweight', 'strength training', 'zinc', 'vitamin C',
  ];

  return (
       <Box p={6}>
      {showDetails ? (
        <ProductDetails
          product={showDetails}
          onBackClick={handleBackClick}
          onAddToCart={handleAddToCartClick}
        />
      ) : (
        <Flex direction="row" spacing={6}>
          {/* Sidebar - Category Filter */}
          <Box flex="1" mr={6} borderWidth="1px" borderRadius="md" borderColor="gray.200" p={4} bg="white">
            <Heading size="md" mb={4}>Categories</Heading>
            <Button
              onClick={handleShowAllClick}
              variant={selectedCategory === '' ? 'solid' : 'outline'}
              colorScheme="orange"
              width="100%"
              mb={2}
            >
              Tout afficher
            </Button>
            <Stack spacing={2}>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  variant={selectedCategory === category ? 'solid' : 'outline'}
                  colorScheme="orange"
                  width="100%"
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </Stack>
            <Box mt={6}>
              <Heading size="md">Mot-clé</Heading>
              <Stack spacing={2} mt={2}>
                {keywords.map((keyword) => (
                  <Checkbox
                    key={keyword}
                    isChecked={selectedKeywords.includes(keyword)}
                    onChange={() => handleKeywordChange(keyword)}
                  >
                    {keyword}
                  </Checkbox>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Search Bar and Product Grid */}
          <Box flex="3">
            <Box borderWidth="1px" borderRadius="md" borderColor="gray.200" p={4} mb={6}>
              <HStack spacing={4} mb={6} justifyContent="flex-end">
                <Input
                  placeholder="Search Products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  width="700px"
                />
                <Select
                  value={priceSortOrder}
                  onChange={handlePriceSortOrderChange}
                  width="200px"
                >
                  <option value="ascending">Price: Low to High</option>
                  <option value="descending">Price: High to Low</option>
                </Select>
              </HStack>

              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {filteredProducts.map((product) => (
                  <Box
                    key={product.productId}
                    borderWidth={1}
                    borderRadius="md"
                    overflow="hidden"
                    p={4}
                    bg="white"
                    boxShadow="md"
                    position="relative"
                    onMouseEnter={() => setHoveredProduct(product.productId)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width="100%"
                      height="200px"
                      objectFit="cover"
                    />
                    {hoveredProduct === product.productId && (
                      <Button
                        colorScheme="orange"
                        position="absolute"
                        bottom="0"
                        left="0"
                        width="100%"
                        borderRadius="none"
                        onClick={() => handleInfoClick(product)}
                      >
                        Details
                      </Button>
                    )}
                    <Box mt={2}>
                      <Text fontWeight="bold" color="orange.500">{product.category}</Text>
                      <Text fontWeight="bold">{product.name}</Text>
                      <Text fontSize="lg" color="orange.500">{product.price} DT</Text>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
};
// Main App Component
const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <ChakraProvider theme={customTheme}>
      <Box p={6} bg="blackWhite.background" minHeight="100vh" color="blackWhite.text">
        <HeaderSection
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <ProductGrid
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </Box>
    </ChakraProvider>
  );
};

export default App;
