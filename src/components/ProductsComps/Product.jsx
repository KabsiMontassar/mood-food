import React from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  useToast,
  useDisclosure,
  Flex,
  Stack
} from '@chakra-ui/react';
import ProductDetaills from './ProductDetaills';

const Product = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();




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
          lineclamp="2"
          maxHeight="4.5em"
        >
          {product.description}
        </Text>

        <Text fontSize="lg"  >
          {product.price} DT
        </Text>
      </Stack>

      <ProductDetaills product={product} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Product;
