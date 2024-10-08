 
import { Box, Button, Grid, Heading, Image, Text } from '@chakra-ui/react';

import React from 'react';


const Panier = ({ cartItems, onRemoveFromCart, onProceedToPayment }) => (
    <Box p={4}>
      <Heading size={{ base: 'md', md: 'lg' }} mb={4}>
        Your Panier
      </Heading>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
          {cartItems.map((item) => (
            <Box key={item.productId} borderWidth="1px" borderRadius="md" p={4}>
              <Image src={item.image} alt={item.name} borderRadius="md" mb={2} />
              <Text fontSize={{ base: 'md', md: 'lg' }}>{item.name}</Text>
              <Text color="orange.500" fontSize={{ base: 'md', md: 'lg' }}>{item.price} DT</Text>
              <Button
                onClick={() => onRemoveFromCart(item.productId)}
                colorScheme="red"
                mt={2}
                width="full"
              >
                Remove
              </Button>
            </Box>
          ))}
        </Grid>
      )}
      <Button colorScheme="orange" mt={4} onClick={onProceedToPayment} width="full">
        Proceed to Payment
      </Button>
    </Box>
  );

export default Panier;