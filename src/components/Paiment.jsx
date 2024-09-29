import React, { useState } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  Heading,
  VStack,
  useToast,
  Stack,
  Flex,
  Divider,
} from '@chakra-ui/react';

const Paiment = ({ cartItems, onRemoveItem }) => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const toast = useToast();

  const handlePayment = () => {
    setIsPaymentComplete(true);
    toast({
      title: 'Payment Successful',
      description: 'Your payment has been completed successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  if (isPaymentComplete) {
    return (
      <Box textAlign="center" p={6}>
        <Heading>Thank You for Your Purchase!</Heading>
        <Text>Your order is being processed.</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4}>Your Panier</Heading>
      {cartItems.length === 0 ? (
        <Text>No items in your panier</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cartItems.map((item) => (
            <Flex key={item.productId} alignItems="center" justifyContent="space-between" borderWidth="1px" borderRadius="md" p={4}>
              <Image src={item.image} boxSize="100px" objectFit="cover" borderRadius="md" />
              <Stack spacing={1} flex="1" ml={4}>
                <Heading size="md">{item.name}</Heading>
                <Text>{item.price} DT</Text>
              </Stack>
              <Button colorScheme="red" onClick={() => onRemoveItem(item.productId)}>
                Remove
              </Button>
            </Flex>
          ))}
        </VStack>
      )}
      {cartItems.length > 0 && (
        <>
          <Divider my={6} />
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="md">Total: {cartItems.reduce((total, item) => total + item.price, 0)} DT</Heading>
            <Button colorScheme="green" onClick={handlePayment}>Proceed to Payment</Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Paiment;
