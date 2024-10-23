import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  useToast,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  Stack
} from '@chakra-ui/react';
import { useShoppingCart } from '../../Context/ShoppingCartContext';

const Product = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { addToCart } = useShoppingCart();

  const handleAddToCartClick = (product) => {
    addToCart(product);
    toast({
      title: `${product.name} added to cart`,
      description: `You have added ${product.name} to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  return (
    <Flex
      key={product.productId}
      direction={{ base: 'column', md: 'row' }}
    
      shadow="md"
      p={4}
      bg="white"
      align="center"
      position="relative"
      transition="0.3s"
      className="recipe-element"
      _hover={{
        backgroundColor: 'rgba(10, 115, 66, 0.7)',
        cursor: 'pointer',
        color: 'white'
      }}
      onClick={onOpen}
    >
      <Box
        flexShrink={0}
        w={{ base: '100%', md: '40%' }}
        h={{ base: '200px', md: 'auto' }}
      >
        <Image
          src={product.image}
          alt={product.name}
          objectFit="cover"
          w="100%"
          h="100%"
          borderRadius="lg"
        />
      </Box>

      <Stack
        spacing={3}
        pl={{ base: 0, md: 4 }}
        pt={{ base: 4, md: 0 }}
        textAlign={{ base: 'center', md: 'left' }}
        flex="1"
      >
        <Text fontSize="sm"
          color="gray.900"
          fontWeight="bold"
        >
          {product.category}
        </Text>
        <Heading size="md">
          {product.name}
        </Heading>
        <Text
          fontSize="lg"
          overflow="hidden"
          whiteSpace="normal"
          lineClamp="2"
          maxHeight="4.5em"
        >
          {product.description}
        </Text>

        <Text fontSize="lg"  >
          {product.price} DT
        </Text>
      </Stack>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW={{ base: '100%', md: '90%' }}>
          <DrawerCloseButton />
          <DrawerHeader>{product.name} Details</DrawerHeader>

          <DrawerBody>
            <Image src={product.image} alt={product.name} borderRadius="md" mb={4} height="200px" objectFit="cover" />

            <Text fontSize="sm" color="gray.500" mb={2}>
              Category: {product.category}
            </Text>
            <Text fontSize="lg" color="green.500" mb={4}>
              Price: {product.price} DT
            </Text>

            <Text mb={4}>
              {product.description}
            </Text>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={() => handleAddToCartClick(product)}>
              Add to Cart
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Product;
