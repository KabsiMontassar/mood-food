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
  VStack,
  Input,
  Select,
  Stack,
  Checkbox,
  extendTheme,
  Divider,
  Flex,
  Collapse,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
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

// HeaderSection Component
const HeaderSection = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    {
      title: 'Produit Diététique',
      description: 'Description for Produit Diététique category.',
      image: '/src/assets/images/diététiques.jpeg',
    },
    {
      title: 'Complement alimentaire',
      description: 'Description for Complement alimentaire category.',
      image: '/src/assets/images/complement.jpg',
    },
    {
      title: 'Equipement sportif',
      description: 'Equipment sportif for strength and endurance training.',
      image: '/src/assets/images/sportif.webp',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [categories.length]);

  useEffect(() => {
    const index = categories.findIndex((cat) => cat.title === selectedCategory);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [selectedCategory]);

  const currentCategoryData = categories[currentIndex];

  return (
    <Box mb={6} position="relative" width="100%">
      <Box position="relative" textAlign="center">
        <Image
          src={currentCategoryData.image}
          alt={currentCategoryData.title}
          width="100%"  // Full width
          height="400px" // Fixed height
          objectFit="cover" // Ensures image covers the container
          borderRadius="md"
        />

        {/* Overlaying the description on the image */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0, 0, 0, 0.5)" // Semi-transparent background
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)" // Shadow effect
        >
          <Box textAlign="center" color="white" p={4}>
            <Heading size="lg" mb={2}>{currentCategoryData.title}</Heading>
            <Text>{currentCategoryData.description}</Text>
          </Box>
        </Box>
      </Box>

      {/* Category buttons */}
      <HStack spacing={4} justifyContent="center" mt={4}>
        {categories.map((cat) => (
          <Button
            key={cat.title}
            colorScheme="green"
            onClick={() => onCategorySelect(cat.title)}
            variant={selectedCategory === cat.title ? 'solid' : 'outline'}
          >
            {cat.title}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};


// ProductDetails Component
const ProductDetails = ({ product, onBackClick, onAddToCart }) => (
  <Box p={6}>
    <Button onClick={onBackClick} colorScheme="green" mb={4}>Back to Products</Button>
    <Grid templateColumns="1fr 2fr" gap={6}>
      <Image
        src={product.image}
        alt={product.name}
        boxSize="300px"
        objectFit="cover"
        borderRadius="md"
      />
      <Box>
        <Heading>{product.name}</Heading>
        <Text fontSize="lg" mb={4}>{product.description}</Text>
        <Text fontSize="2xl" color="green.500">{product.price} DT</Text>
        <Button colorScheme="green" mt={4} onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </Box>
    </Grid>
  </Box>
);

// ProductGrid Component
const ProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceSortOrder, setPriceSortOrder] = useState('ascending');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showDetails, setShowDetails] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const toast = useToast();

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleCategoryChange = (event) => setCategoryFilter(event.target.value);
  const handlePriceSortOrderChange = (event) => setPriceSortOrder(event.target.value);
  const handleKeywordChange = (keyword) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
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

  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesKeywords = selectedKeywords.length === 0 || selectedKeywords.includes(product.category);
    const matchesPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesKeywords && matchesPriceRange;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    return priceSortOrder === 'ascending' ? a.price - b.price : b.price - a.price;
  });

  return showDetails ? (
    <ProductDetails
      product={showDetails}
      onBackClick={handleBackClick}
      onAddToCart={handleAddToCartClick}
    />
  ) : (
    <Box border="1px solid #ccc" borderRadius="md" p={4}>
      {/* Search, Filters, and Sidebar */}
      <Flex>
        {/* Keyword Filter Sidebar */}
        <Box p={4} width="250px" borderRight="1px solid #ccc" mr={4}>
          <Heading size="md" mb={2}>Keywords</Heading>
          <Stack spacing={2}>
            {['Produit Diététique', 'Complement alimentaire', 'Equipement sportif'].map((keyword) => (
              <Checkbox
                key={keyword}
                isChecked={selectedKeywords.includes(keyword)}
                onChange={() => handleKeywordChange(keyword)}
              >
                {keyword}
              </Checkbox>
            ))}
            <Box mt={4}>
              <Heading size="sm" mb={2}>Price Range</Heading>
              <Slider
                aria-label="price-range"
                defaultValue={[0, 200]}
                min={0}
                max={200}
                step={10}
                onChangeEnd={handlePriceRangeChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb index={0} />
                <SliderThumb index={1} />
              </Slider>
              <Text>{`Between ${priceRange[0]} DT and ${priceRange[1]} DT`}</Text>
            </Box>
          </Stack>
        </Box>

        {/* Main Content */}
        <Box flex="1">
          {/* Search Bar, Category Filter and Sort */}
          <HStack mb={4} spacing={4}>
            <Input
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products"
              size="lg"
              flex="1"
            />
            <Button onClick={() => setShowFilters(!showFilters)} colorScheme="green">
              Filters
            </Button>
          </HStack>

          <Collapse in={showFilters} animateOpacity>
            <HStack spacing={4}>
              <Select placeholder="Select Category" onChange={handleCategoryChange}>
                <option value="Produit Diététique">Produit Diététique</option>
                <option value="Complement alimentaire">Complement alimentaire</option>
                <option value="Equipement sportif">Equipement sportif</option>
              </Select>

              <Select value={priceSortOrder} onChange={handlePriceSortOrderChange}>
                <option value="ascending">Sort by Price: Low to High</option>
                <option value="descending">Sort by Price: High to Low</option>
              </Select>
            </HStack>
          </Collapse>

          <Divider my={4} />

          {/* Product Grid */}
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {sortedProducts.map((product) => (
              <Box
                key={product.productId}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                onMouseEnter={() => setHoveredProduct(product.productId)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  boxSize="300px"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Heading size="md">{product.name}</Heading>
                  <Text fontSize="lg" color="green.500">
                    {product.price} DT
                  </Text>
                  <Button
                    colorScheme="green"
                    mt={2}
                    onClick={() => handleInfoClick(product)}
                    style={{
                      display: hoveredProduct === product.productId ? 'block' : 'none',
                    }}
                  >
                    Plus Details
                  </Button>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};


// Main App Component
function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <ChakraProvider theme={customTheme}>
      <Box p={4}>
        {/* Header Section */}
        <HeaderSection
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Product Grid */}
        <ProductGrid />
      </Box>
    </ChakraProvider>
  );
}

export default App;
