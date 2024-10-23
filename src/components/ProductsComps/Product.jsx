import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  IconButton,
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
} from '@chakra-ui/react';
import { LuShoppingCart } from "react-icons/lu";
import { IoDocument } from "react-icons/io5";
import { useShoppingCart } from '../../Context/ShoppingCartContext';

const Product = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Control for drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // For product details drawer
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

  const handleViewDetails = () => {
    setIsDrawerOpen(true);
    onOpen();
  };

  return (
    <Box
      key={product.productId}
      borderRadius="md"
      shadow="md"
      p={4}
      bg="white"
      align="center"
      position="relative"
     
      sx={{
        transition: 'border 0.2s',
        _hover: {
          borderColor: 'green.500',
          boxShadow: '0 0 10px green',
        },
      }}
    >
      <Box position="relative">
        <Box
          position="relative"
          transition="filter 0.3s ease"  
        >
          <Image
            src={product.image}
            alt={product.name}
            borderRadius="md"
            mb={4}
            height="200px"
            objectFit="cover"
          />
          <Text fontSize="sm" color="gray.500" mb={2}>
            {product.category}
          </Text>
          <Heading size="md" mb={2}>
            {product.name}
          </Heading>
          <Text fontSize="lg" color="green.500">
            {product.price} DT
          </Text>
        </Box>

        {product && (
          <Box position="absolute" left="50%" top="50%"
            transform="translateX(-50%)" zIndex="2" >
            <IconButton
              mr="5px"
              position="relative"
              isRound={true}
              onClick={() => handleAddToCartClick(product)}
              variant='outline'
              colorScheme='green'
              w='50px'
              h='50px'
              fontSize='25px'
              bg="white"
              icon={<LuShoppingCart />}
            />

            <IconButton
              position="relative"
              isRound={true}
              variant='outline'
              colorScheme='green'
              w='50px'
              h='50px'
              fontSize='25px'
              bg="white"
              icon={<IoDocument />}
              onClick={handleViewDetails}
            />
          </Box>
        )}
      </Box>

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
    </Box>
  );
};

export default Product;



