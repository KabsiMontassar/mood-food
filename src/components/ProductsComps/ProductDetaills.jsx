import React, { useState } from 'react';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
    Image,
    Text,
    Button,
    Heading,
    Box,
    Flex,
    Badge,
    HStack,
    IconButton,
    Input,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useShoppingCart } from '../../Context/ShoppingCartContext';

const ProductDetaills = ({ product, isOpen, onClose }) => {
    const images = [product.image, product.image, product.image, product.image, product.image];
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [quantity, setQuantity] = useState(1);
    const toast = useToast();
    const { addToCart } = useShoppingCart();


    const handleAddToCartClick = (product, quantity) => {
        addToCart(product, quantity);
        toast({
            title: `${product.name} added to cart`,
            description: `You have added ${quantity} ${product.name}(s) to your cart.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left',
        });

        onClose();
    };








    const handleQuantityChange = (increment) => {
        if (increment) {
            setQuantity(quantity + 1);
        } else if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent maxW={{ base: '100%', md: '80%', lg: '70%' }}>
                <DrawerCloseButton />
                <DrawerHeader bg="#549D7B">
                    <Heading size="lg">{product.name} Details</Heading>
                    <Badge mb={4} fontSize="md" colorScheme="teal">
                        {product.category}
                    </Badge>
                </DrawerHeader>

                <DrawerBody p={5} bg="linear-gradient(180deg, rgba(10, 115, 66, 0.7) 0%, white 100%)">

                    <Box borderRadius="md" bg="white" mb={4}>
                        <Image
                            borderRadius="md"
                            src={selectedImage}
                            alt={product.name}
                            w="100%"
                            fit="contain"
                            h={{ base: '250px', md: '300px', lg: '400px' }}
                            objectPosition="center"
                        />
                    </Box>

                    <Flex
                        direction="row"
                        overflowX="hidden"

                        justifyContent="center"
                        mb={4}

                    >
                        {images.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                boxSize={{ base: '50px', md: '75px', lg: '100px' }}
                                objectFit="cover"
                                border={selectedImage === img ? '2px solid teal' : 'none'}
                                cursor="pointer"
                                mx={2}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </Flex>

                    <Heading size="md" color="teal" fontWeight={'bold'} mb={2}>
                        Description
                    </Heading>
                    <Text fontSize="md" color="gray.700" mb={4}>
                        {product.description}
                    </Text>

                    <Flex justifyContent={"flex-end"} >
                        <VStack spacing={2} >
                            <Text fontSize="lg" fontWeight="bold" >
                                {product.price} DT
                            </Text>
                            <HStack w={{ base: '100%', md: '350px' }}   >

                                <Flex alignItems="center" border="1px solid #ccc" borderRadius="md">

                                    <IconButton
                                        icon={<MinusIcon />}
                                        onClick={() => handleQuantityChange(false)}
                                        isDisabled={quantity === 1}
                                        aria-label="Decrease quantity"

                                        borderRight="1px solid #ccc"
                                    />
                                    <Input
                                        value={quantity}
                                        textAlign="center"
                                        w="50px"
                                        border="none"
                                        readOnly
                                    />
                                    <IconButton
                                        icon={<AddIcon />}
                                        onClick={() => handleQuantityChange(true)}
                                        aria-label="Increase quantity"
                                        borderLeft="1px solid #ccc"
                                    />
                                </Flex>

                                <Button
                                    colorScheme="green"
                                    borderRadius="none"
                                    flex="1"
                                    onClick={() => handleAddToCartClick(product, quantity)}
                                >
                                    Add to Cart
                                </Button>
                            </HStack>
                        </VStack>
                    </Flex>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default ProductDetaills;
