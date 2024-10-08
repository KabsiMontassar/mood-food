import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  Text,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
} from '@chakra-ui/react';
import { useShoppingCart } from '../../Context/ShoppingCartContext'; // Import the context
import ProductDetails from './ProductDetails';

const ProductGrid = ({ selectedCategory, onCategorySelect, initialProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSortOrder, setPriceSortOrder] = useState('ascending');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const toast = useToast();
  const { addToCart } = useShoppingCart(); // Access the cart context

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

  const handleInfoClick = (product) => setShowDetails(product);
  const handleBackClick = () => setShowDetails(null);

  const handleAddToCartClick = (product) => {
    addToCart(product); // Add product to the cart context
    toast({
      title: `${product.name} added to cart`,
      description: `You have added ${product.name} to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  const handleClearFilters = () => {
    setSelectedKeywords([]);
    onCategorySelect(null);
    setSearchTerm('');
  };

  // Filter and sort products based on selected filters
  const filteredProducts = initialProducts
    .filter(
      (product) =>
        (!selectedCategory || product.category === selectedCategory) &&
        (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedKeywords.length === 0 ||
          selectedKeywords.every((keyword) =>
            product.description.toLowerCase().includes(keyword.toLowerCase())
          ))
    )
    .sort((a, b) => (priceSortOrder === 'ascending' ? a.price - b.price : b.price - a.price));

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const keywords = ['high-quality', 'muscle mass', 'full-body workout', 'protein shake', 'comfort', 'lightweight', 'strength training', 'zinc', 'vitamin C'];

  return (
    <Box p={6}>
      {/* Search and Sorting Section */}
      <Box mb={6}>
        <Flex justifyContent="space-between" flexDirection={{ base: 'column', md: 'row' }}>
          <Input
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            maxWidth="700px"
            mb={{ base: 4, md: 0 }}
          />
          <Select value={priceSortOrder} onChange={handlePriceSortOrderChange} maxWidth="200px">
            <option value="ascending">Price: Low to High</option>
            <option value="descending">Price: High to Low</option>
          </Select>
        </Flex>
      </Box>

      {/* Filters Section */}
      <Box mb={6}>
        <Accordion allowMultiple>
        
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Keywords
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Stack spacing={2}>
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
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* Clear Filters Button */}
        <Button
          mt={4}
          colorScheme="red"
          onClick={handleClearFilters}
          variant="outline"
          size="sm"
        >
          Clear All Filters
        </Button>
      </Box>

      {/* Product Grid Section */}
      {showDetails ? (
        <ProductDetails product={showDetails} onBackClick={handleBackClick} onAddToCart={handleAddToCartClick} />
      ) : (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
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
                    fontSize="lg"
                    borderRadius="md"
                  >
                    More Details
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
              <Button
                colorScheme="orange"
                onClick={() => handleAddToCartClick(product)}
                mt={2}
              >
                Add to Cart
              </Button>
            </Box>
          ))}
        </Grid>
      )}

      {/* Pagination Section */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Box>
  );
};

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
    <Flex justifyContent="space-between" alignItems="center" mt={4} flexDirection={{ base: 'column', md: 'row' }}>
      <Button onClick={handlePrevious} disabled={currentPage === 1} mb={{ base: 2, md: 0 }}>
        Previous
      </Button>
      <Text>Page {currentPage} of {totalPages}</Text>
      <Button onClick={handleNext} disabled={currentPage === totalPages} mb={{ base: 2, md: 0 }}>
        Next
      </Button>
    </Flex>
  );
};

export default ProductGrid;
