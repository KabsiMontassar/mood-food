import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  Flex,
  Text,
  Icon,
} from '@chakra-ui/react';
import { getDoc, Timestamp } from 'firebase/firestore';

const OrdersAccordion = ({ OrdersData }) => {
  const [processedOrders, setProcessedOrders] = useState([]);

  useEffect(() => {
    const convertDocumentReferenceToDoc = async (ref) => {
      const doc = await getDoc(ref);
      return doc.data();
    };

    const processOrdersData = async () => {
      if (!OrdersData || OrdersData.length === 0) return;

      const updatedOrders = await Promise.all(
        OrdersData.map(async (order) => {
          const updatedOrderProducts = await Promise.all(
            order.orders.map(async (product) => {
              const productData = await convertDocumentReferenceToDoc(product.productRef);
              return {
                ...product,
                product: productData,
              };
            })
          );
          return {
            ...order,
            orders: updatedOrderProducts,
          };
        })
      );
      setProcessedOrders(updatedOrders);
    };

    processOrdersData();
  }, [OrdersData]);

  if (!processedOrders || processedOrders.length === 0) {
    return <Text>No orders available.</Text>;
  }

  return (
    <Box maxW={{ base: '400px', md: 'full' }} minH={{ base: '400px', md: '510px' }} mt={5}>
      <Accordion allowMultiple>
        {processedOrders.map((Order, index) => (
          <AccordionItem mb={5} key={index} border="none">
            <h2>
              <AccordionButton
                boxShadow="md"
                bg="white"
                borderTopRadius="md"
                borderBottomRadius="md"
                _expanded={{
                  bg: { completed: 'green.100', pending: '#FEFCBF', rejected: 'red.100' }[Order.status],
                  borderBottomRadius: 'none',
                }}
                p={4}
              >
                <Box display="flex" 
                 gap={14}
                 as="span" flex="1" textAlign="left">
                  <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>
                    {Order.date && Order.date.seconds
                      ? new Date(Order.date.seconds * 1000).toLocaleDateString()
                      : 'Unknown'}
                  </Text>
                  <Text fontSize="md">Number of Products : {Order.orders.length}</Text>
                  <Text fontSize="md">Total : {Order.orders.reduce((sum, product) => sum + (product.product?.price || 0) * product.quantity, 0).toFixed(2)}</Text>

                 
                </Box>
                <Badge
                  borderRadius="full"
                  color={Order.status === 'completed' ? 'green' : Order.status === 'pending' ? '#EFB110' : 'red'}
                  colorScheme={Order.status === 'completed' ? 'green' : Order.status === 'pending' ? 'yellow' : 'red'}
                  fontSize="xs"
                  px={2}
                  py={1}
                  textTransform="capitalize"
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                >
                  <Icon viewBox="0 0 200 200">
                    <path
                      fill={{ completed: 'green', pending: '#EFB110', rejected: 'red' }[Order.status]}
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </Icon>
                  <Text ml={2} as="span">{Order.status}</Text>
                </Badge>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} borderBottomRadius="md" boxShadow="md">
              <Box p={4}>
                <Box display="flex" mb={4}>
                  <Text fontSize="md" color="black" flexBasis={{ base: '50%', md: '33%' }} fontWeight="bold">Product</Text>
                  <Text fontSize="md" color="black" flexBasis={{ base: '50%', md: '33%' }} fontWeight="bold">Quantity</Text>
                  <Text fontSize="md" color="black" flexBasis={{ base: '50%', md: '33%' }} fontWeight="bold">Price</Text>
                </Box>

                {Order.orders.map((product, index) => (
                  <Flex key={index} justifyContent="space-between" mb={2}>
                    <Text fontSize="md" color="gray.600" flexBasis={{ base: '50%', md: '33%' }}>{product.product?.name || 'Unknown'}</Text>
                    <Text fontSize="md" color="gray.600" flexBasis={{ base: '25%', md: '33%' }}>{product.quantity}</Text>
                    <Text fontSize="md" color="gray.600" flexBasis={{ base: '25%', md: '33%' }}>
                      {((product.product?.price || 0) * product.quantity).toFixed(2)}
                    </Text>
                  </Flex>
                ))}

                <Flex justifyContent="space-between" fontWeight="bold" color="teal" textDecor="underline" mt={4}>
                  <Text fontSize="md">Total Price</Text>
                  <Text fontSize="md">{Order.orders.reduce((sum, product) => sum + (product.product?.price || 0) * product.quantity, 0).toFixed(2)}</Text>
                </Flex>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default OrdersAccordion;
