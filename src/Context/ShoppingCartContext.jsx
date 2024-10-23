import React, { createContext, useContext, useState } from 'react';
import { useToast} from '@chakra-ui/react';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const Toast = useToast();
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log(product.productId);
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.productId === product.productId);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Toast({
    //   title: 'Product added to cart',
    //   status: 'info',
    //   duration: 5000,
    //   isClosable: true,
    // });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    console.log(productId);
    Toast({
      title: 'Product removed from cart',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });

  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);

    Toast({
      title: 'Cart cleared',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);