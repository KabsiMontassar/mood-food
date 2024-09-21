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
    {
      productId: 8,
      name: 'Dumbbells Set',
      description: 'A set of versatile dumbbells for strength training, perfect for home workouts and gym sessions.',
      category: 'Equipement sportif',
      section: 'Equipment',
      price: 70,
      image: '/src/assets/images/dumble set.jpeg',
    },
    {
      productId: 9,
      name: 'AKTIV Zinc + Histidine + Vitamine C 30 Comprimes',
      description: 'Comprimés au zinc, biodisponibilité augmentée grâce à la L-Histidine, plus de la vitamine C pour soutenir les défenses naturelles de l’organisme.',
      category: 'Complement alimentaire',
      section: '',
      price: 40,
      image: '/src/assets/images/Zink.webp',
    }, 
    {
      productId: 10,
      name: 'Dumbbells Set',
      description: 'A set of versatile dumbbells for strength training, perfect for home workouts and gym sessions.',
      category: 'Equipement sportif',
      section: 'Equipment',
      price: 70,
      image: '/src/assets/images/dumble set.jpeg',
    },
    {
      productId: 11,
      name: 'AKTIV Zinc + Histidine + Vitamine C 30 Comprimes',
      description: 'Comprimés au zinc, biodisponibilité augmentée grâce à la L-Histidine, plus de la vitamine C pour soutenir les défenses naturelles de l’organisme.',
      category: 'Complement alimentaire',
      section: '',
      price: 40,
      image: '/src/assets/images/Zink.webp',
    }, ];
  
  // HeaderSection Component with Carousel Dots (same as before)
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
          >
            <Box textAlign="center" color="white" p={4}>
              <Heading size="lg" mb={2}>
                {currentCategoryData.title}
              </Heading>
              <Text>{currentCategoryData.description}</Text>
            </Box>
          </Box>
  
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
                boxShadow={isActive ? 'none' : '0px 4px 6px rgba(0, 0, 0, 0.3)'}
                transition="box-shadow 0.3s ease-in-out"
              >
                {cat.title}
              </Button>
            );
          })}
        </HStack>
      </Box>
    );
  };
  
  // ProductDetails Component (same as before)
  const ProductDetails = ({ product, onBackClick, onAddToCart }) => (
    <Box p={6}>
      <Button onClick={onBackClick} colorScheme="orange" mb={4}>
        Back to Products
      </Button>
      <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={6}>
        <Box>
          <Image
            src={product.image}
            alt={product.name}
            boxSize={{ base: '100%', md: '300px' }}
            objectFit="cover"
            borderRadius="md"
          />
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500" mb={2}>{product.category}</Text>
          <Heading size="lg" mb={2}>{product.name}</Heading>
          <Box borderBottom="2px" borderColor="black" mb={4} />
          <Text fontSize="lg" mb={4}>{product.description}</Text>
          <Text fontSize="2xl" color="orange.500" mb={4}>{product.price} DT</Text>
          <Button colorScheme="orange" onClick={() => onAddToCart(product)}>Add to Cart</Button>
        </Box>
      </Grid>
    </Box>
  );
  
  // Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    return (
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Flex>
    );
  };
  
  // ProductGrid Component with Pagination
  const ProductGrid = ({ selectedCategory, onCategorySelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceSortOrder, setPriceSortOrder] = useState('ascending');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [showDetails, setShowDetails] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const toast = useToast();
  
    useEffect(() => {
      setSelectedKeywords([]);
      setCurrentPage(1); // Reset page when category changes
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
  
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
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
            <Box flex="1" mr={6} borderWidth="1px" borderRadius="md" borderColor="gray.200" p={4} bg="white">
              <Heading size="md" mb={4}>Categories</Heading>
  
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'solid' : 'outline'}
                  colorScheme="orange"
                  onClick={() => handleCategoryClick(category)}
                  mb={2}
                >
                  {category}
                </Button>
              ))}
              <Heading size="md" mt={6} mb={4}>Keywords</Heading>
              {keywords.map((keyword) => (
                <Checkbox
                  key={keyword}
                  isChecked={selectedKeywords.includes(keyword)}
                  onChange={() => handleKeywordChange(keyword)}
                  mb={2}
                >
                  {keyword}
                </Checkbox>
              ))}
            </Box>
  
            <Box flex="3">
              <Box display="flex" justifyContent="space-between" mb={4}>
                <Input
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  maxWidth="700px"
                />
                <Select value={priceSortOrder} onChange={handlePriceSortOrderChange} maxWidth="200px">
                  <option value="ascending">Price: Low to High</option>
                  <option value="descending">Price: High to Low</option>
                </Select>
              </Box>
  
              <Grid 
  templateColumns={{
    base: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
  }}
  gap={6}
>
  {currentProducts.map((product) => (
    <Box
      key={product.productId}
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.200"
      p={4}
      position="relative"
      onMouseEnter={() => setHoveredProduct(product)}
      onMouseLeave={() => setHoveredProduct(null)}
      sx={{
        transition: 'border 0.2s',
        _hover: {
          borderColor: 'orange.500',
          boxShadow: '0 0 10px rgba(255, 165, 0, 0.5)',
        },
      }}
    >
      <Box position="relative">
        <Image
          src={product.image}
          alt={product.name}
          borderRadius="md"
          mb={4}
          height="200px"
          objectFit="cover"
        />
        {hoveredProduct === product && (
          <Button
          colorScheme="orange"
          position="absolute"
          bottom="4"
          left="50%"
          transform="translateX(-50%)"
          zIndex="2"
          onClick={() => handleInfoClick(product)}
          padding="12px 24px" // Increase padding for more thickness
  fontSize="lg" // Larger font size
  borderRadius="md" // Adjust border radius
  height="50px" // Set a fixed height for the button
  minWidth="150px" // Set a minimum width for consistency
  _hover={{ bg: 'orange.600' }} // Change color on hover
        >
          Plus Details
        </Button>
        
        )}
      </Box>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {product.category}
      </Text>
      <Heading size="md" mb={2}>
        {product.name}
      </Heading>
      <Text fontSize="lg" color="orange.500">
        {product.price} DT
      </Text>
    </Box>
  ))}
</Grid>


  
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Box>
          </Flex>
        )}
      </Box>
    );
  };
  
  // Main App
  function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
    };
  
    return (
      <ChakraProvider theme={customTheme}>
        <Box bg="blackWhite.background" minHeight="100vh" color="blackWhite.text">
          <HeaderSection onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
          <ProductGrid selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
        </Box>
      </ChakraProvider>
    );
  }
  
  export default App;
  