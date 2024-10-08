 
 

import { Box, Button, Grid, Heading, Image, Text } from '@chakra-ui/react';
 
import React from 'react';
 
 
 const ProductDetails = ({ product, onBackClick, onAddToCart }) => (
    <Box p={4}>
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
          <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500" mb={2}>
            {product.category}
          </Text>
          <Heading size={{ base: 'md', md: 'lg' }} mb={2}>
            {product.name}
          </Heading>
          <Box borderBottom="2px" borderColor="black" mb={4} />
          <Text fontSize={{ base: 'sm', md: 'lg' }} mb={4}>
            {product.description}
          </Text>
          <Text fontSize={{ base: 'xl', md: '2xl' }} color="orange.500" mb={4}>
            {product.price} DT
          </Text>
          <Button colorScheme="orange" onClick={() => onAddToCart(product)} width="full">
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Box>
  );

  export default ProductDetails;