import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  Flex,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useShoppingCart } from '../Context/ShoppingCartContext';
import ProductGrid from '../components/ProductsComps/ProductGrid';
import initialProducts from '../Data/DataProducts';
import { LuShoppingCart } from "react-icons/lu";

function App() {
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useShoppingCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toast = useToast();


  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckoutClick = () => {
    toast({
      title: 'Proceeding to checkout',
      description: 'You are now checking out!',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
    setIsCartOpen(false);
  };

  return (
    <Box bg="linear-gradient(180deg, rgba(10, 115, 66, 0.7) 0%, white 100%)">


      <header className='headeroverlay products'>
        <div className="overlay">
          <h1>
          Boostez votre forme avec des suppléments et du matériel de sport adaptés.          </h1>
        </div>
      </header>





      <ProductGrid
        initialProducts={initialProducts}
      />
      <IconButton
        bottom={4}
        right={4}
        position="fixed"
        onClick={() => setIsCartOpen(true)}
        isRound={true}
        variant='solid'
        colorScheme='green'
        w='60px'
        h='60px'
        fontSize='25px'
        justify='center'

        _hover={{

          bg: 'green.400',
        }}
        className='cart-icon'


        icon={<LuShoppingCart />}
      />


      <Drawer isOpen={isCartOpen} placement="right" onClose={() => setIsCartOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>
          <DrawerBody>
            {cart.length === 0 ? (
              <Text>Your cart is empty.</Text>
            ) : (
              cart.map((item, index) => (
                <Box key={index} mb={4} p={4} borderWidth="1px" borderRadius="lg">
                  <Flex justifyContent="space-between" alignItems="center">

                    <Text fontWeight="bold" whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"} >{item.name}</Text>


                  </Flex>
                  <Text>${item.price}</Text>
                  <Flex justifyContent="space-between" alignItems="center" mt={2}>
                    <Flex alignItems="center">
                      <IconButton
                        size="sm"
                        icon={<MinusIcon />}
                        onClick={() => decreaseQuantity(item.productId)}
                      />
                      <Text mx={2}>{item.quantity}</Text>
                      <IconButton
                        size="sm"
                        icon={<AddIcon />}
                        onClick={() => increaseQuantity(item.productId)}
                      />
                    </Flex>
                    <Text>Total: ${(item.price * item.quantity).toFixed(2)}</Text>

                  </Flex>
                  <Button mt={4} w="100%" size="sm" colorScheme="red" onClick={() => handleRemoveFromCart(item.productId)}>
                    Remove
                  </Button>
                </Box>
              ))
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={() => setIsCartOpen(false)}>
              Close
            </Button>
            <Button bg="#64A87A" onClick={handleCheckoutClick} disabled={cart.length === 0}>
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default App;
