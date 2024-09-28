import React from 'react';
import { Flex, Box, IconButton, Text, Grid, AspectRatio, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const AvailabilityGrid = ({ expert, daysOfWeekWithDates, time, CountedClick, openModal, jumpbacktwoweeks, jumptwoweektocurrenttime }) => {
  return (
    <Box border="1px solid #cccfcd" p={{ base: 2, md: 4 }}>
      {/* Header */}
      <Flex textAlign="center" w="full" alignItems="center" justifyContent="space-between" p={3}>
        <Flex flexGrow={1} justifyContent="center">
          <Text textDecoration="underline" fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>
            Prenez un rendez-vous
          </Text>
        </Flex>
      </Flex>

      {/* Time and navigation */}
      <Flex borderTop="1px solid #cccfcd" w="full" alignItems="center" justifyContent="space-between" p={3}>
        <Flex flexGrow={1} justifyContent="center">
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
            {time[0].day} - {time[13].day}
          </Text>
        </Flex>

        <Flex>
          <IconButton
            boxSize={{ base: 6, md: 7 }}
            color="gray.500"
            bg="transparent"
            _hover={{ color: 'black', bg: 'transparent' }}
            as={ChevronLeftIcon}
            isDisabled={CountedClick === 0}
            onClick={jumpbacktwoweeks}
          />
          <IconButton
            boxSize={{ base: 6, md: 7 }}
            color="gray.500"
            bg="transparent"
            _hover={{ color: 'black', bg: 'transparent' }}
            as={ChevronRightIcon}
            isDisabled={CountedClick === 3}
            onClick={jumptwoweektocurrenttime}
          />
        </Flex>
      </Flex>

      {/* Grid of appointments */}
      <Box borderTop="1px solid #cccfcd" p={4}>
        <Grid
          templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(7, 1fr)' }}
          gap={2}
          mt={4}
        >
          {time.map((date, index) => (
            <Button
              key={index}
              onClick={() => openModal(expert)}
              bg={date.count === 0  || !date.enabled  ? 'gray.100' : '#5EDABC'}
              _hover={{
                bg: date.count === 0 || !date.enabled ? 'red.100' : '#5EDABC',

                opacity: 0.8,
              }}
              isDisabled={date.count === 0  || !date.enabled}
              h={{ base: '90px', md: '110px' }}
              w={{ base: '80px', md: '75px' }}
              whiteSpace="normal"
              textAlign="left"
              fontSize={{ base: 'xs', sm: 'sm' }}
            >
              {date.day} <br />
              {(date.enabled &&   date.count)} rendez-vous 
            </Button>
          ))}
        </Grid>
      </Box>

    
      <Box borderTop="1px solid #cccfcd" p={4} align="center">
        <Flex flexGrow={1} mb={5} justifyContent="center">
          <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }}>
            Emplacement
          </Text>
        </Flex>
        <Box>
          <AspectRatio ratio={16 / 9}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
          </AspectRatio>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(AvailabilityGrid);
