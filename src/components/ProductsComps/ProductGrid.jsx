import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
} from '@chakra-ui/react';

import Product from './Product';
import Filterbar from './Filterbar';

const ProductGrid = ({  initialProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSortOrder, setPriceSortOrder] = useState('ascending');
  const [selectedKeywords, setSelectedKeywords] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    setSelectedKeywords(''); 
    setCurrentPage(1);
  }, []);

 

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handlePriceSortOrderChange = (event) => setPriceSortOrder(event.target.value);

  

  const handleClearFilters = () => {
    setSelectedKeywords('');
    setSearchTerm('');
  };

  const filteredProducts = initialProducts
    .filter(
      (product) =>
         
         (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedKeywords === '' ||
          product.description.toLowerCase().includes(selectedKeywords.toLowerCase())) // Filter using single selected keyword
    )
    .sort((a, b) => (priceSortOrder === 'ascending' ? a.price - b.price : b.price - a.price));

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const keywords = [ 'high-quality', 'muscle mass', 'full-body workout', 'protein shake', 'comfort', 'lightweight', 'strength training', 'zinc', 'vitamin C'];

  return (
    <Box p={6}>
      <Filterbar
        keywords={keywords}
        selectedKeyword={selectedKeywords} 
        setSelectedKeywords={setSelectedKeywords} 
        handleClearFilters={handleClearFilters}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        priceSortOrder={priceSortOrder}
        handlePriceSortOrderChange={handlePriceSortOrderChange}
      />

      <Grid
        templateColumns={{ base: 'repeat(auto-fit, minmax(200px, 1fr))', md: 'repeat(auto-fit, minmax(200px, 1fr))', lg: 'repeat(2, 1fr)' }}
        gap={6}
      >
        {currentProducts.map((product) => (
          <React.Fragment key={product.productId}>
            <Product product={product} />
          </React.Fragment>
        ))}
      </Grid>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </Box>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {

      onPageChange(currentPage - 1);
     
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Flex 
    justifyContent="space-between" 
    alignItems="center" mt={4} 
    flexDirection="row">
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
