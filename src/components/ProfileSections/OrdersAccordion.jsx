import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  Text,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';

const OrdersAccordion = ({ OrdersData }) => {
  return (
    <Box mt={5}>
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
                  <Text fontWeight="bold" fontSize="lg">{Order.Date}</Text>
                </Box>
                <Badge
                  borderRadius="full"
                  color={Order.Status === 'Completed' ? 'green' : Order.Status === 'Pending' ? '#EFB110' : 'red'}
                  colorScheme={Order.Status === 'Completed' ? 'green' : Order.Status === 'Pending' ? 'yellow' : 'red'}
                  fontSize="sm" px={2} py={1} textTransform="capitalize"
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                >
                  <Icon viewBox='0 0 200 200'>
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
                <SimpleGrid
                  columns={{ base: 1, md: 3 }} // Responsive columns
                  spacing={4}
                >
                  <Text fontSize="md" color="black" fontWeight="bold">Product</Text>
                  <Text fontSize="md" color="black" fontWeight="bold">Quantity</Text>
                  <Text fontSize="md" color="black" fontWeight="bold">Price</Text>

                  {Order.products.map((product, index) => (
                    <React.Fragment key={index}>
                      <Text fontSize="md" color="gray.600">{product.name}</Text>
                      <Text fontSize="md" color="gray.600">{product.Quantity}</Text>
                      <Text fontSize="md" color="gray.600">{(product.prix * product.Quantity).toFixed(2)}</Text>
                    </React.Fragment>
                  ))}
                  <React.Fragment>
                    <Text fontSize="md" color="teal" textDecor={"underline"} fontWeight="bold">Total Price</Text>
                    <Text fontSize="md" color="black" fontWeight="bold"></Text>
                    <Text fontSize="md" textDecor={"underline"} color="teal" fontWeight="bold">{Order.total.toFixed(2)}</Text>
                  </React.Fragment>
                </SimpleGrid>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default OrdersAccordion;
