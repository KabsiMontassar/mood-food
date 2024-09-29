import React from 'react';
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

const OrdersAccordion = ({ OrdersData }) => {
  return (
    <Box maxW={{ base: '400px', md: 'full' }} minH={{ base: '400px', md: '510px' }} mt={5}>
      <Accordion allowMultiple>
        {OrdersData.map((Order, index) => (
          <AccordionItem mb={5} key={index} border="none">
            <h2>
              <AccordionButton
                boxShadow="md"
                bg="white"
                borderTopRadius="md"
                borderBottomRadius="md"
                _expanded={{
                  bg: { Completed: 'green.100', Pending: '#FEFCBF', Rejected: 'red.100' }[Order.Status],
                  borderBottomRadius: 'none',
                }}
                p={4}
              >
                <Box as="span" flex="1" textAlign="left">
                  <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>{Order.Date}</Text>
                </Box>
                <Badge
                  borderRadius="full"
                  color={Order.Status === 'Completed' ? 'green' : Order.Status === 'Pending' ? '#EFB110' : 'red'}
                  colorScheme={Order.Status === 'Completed' ? 'green' : Order.Status === 'Pending' ? 'yellow' : 'red'}
                  fontSize="xs" px={2} py={1} textTransform="capitalize"
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                >
                  <Icon viewBox='0 0 200 200' >
                    <path
                      fill={{ Completed: 'green', Pending: '#EFB110', Rejected: 'red' }[Order.Status]}
                      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                    />
                  </Icon>
                  <Text ml={2} as="span">{Order.Status}</Text>
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

                {Order.products.map((product, index) => (
                  <Flex key={index} justifyContent="space-between" mb={2}>
                    <Text fontSize="md" color="gray.600" flexBasis={{ base: '50%', md: '33%' }}>{product.name}</Text>
                    <Text fontSize="md" color="gray.600" flexBasis={{ base: '25%', md: '33%' }}>{product.Quantity}</Text>
                    <Text fontSize="md" color="gray.600" flexBasis={{ base: '25%', md: '33%' }}>{(product.prix * product.Quantity).toFixed(2)}</Text>
                  </Flex>
                ))}

                <Flex justifyContent="space-between" fontWeight="bold" color="teal" textDecor="underline" mt={4}>
                  <Text fontSize="md">Total Price</Text>
                  <Text fontSize="md">{Order.total.toFixed(2)}</Text>
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
