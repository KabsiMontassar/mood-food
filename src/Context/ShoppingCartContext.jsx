import React, { createContext, useContext, useState } from 'react';
import { useToast} from '@chakra-ui/react';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const Toast = useToast();
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

  
  };

  const removeFromCart = (id) => {
    setCart((id) => prevCart.filter((item) => item.id !== id));
    Toast({
      title: 'Product removed from cart',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });

  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
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