import React from 'react';
import { Box, Flex, Text, Menu, MenuButton, useColorModeValue, Button, MenuList, MenuDivider, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react';
import { ChevronDownIcon, StarIcon } from '@chakra-ui/icons';

const ReviewSection = ({ expert, reviews }) => {
  return (
    <Box align="center" w="full">
      {/* Header Section */}
      <Flex
        height={{ base: 'auto', md: '100%' }}
        w={{ base: '90%', md: '70%' }}
        borderBottom="1px solid #cccfcd"
        justifyContent={{ base: 'center', md: 'space-between' }}
        p={3}
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
      >
        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" textDecoration="underline">
          {expert.reviews} Avis
        </Text>

        {/* Sorting Menu */}
        <Menu>
          <MenuButton
            className="menu-button"
            as={Button}
            rightIcon={<ChevronDownIcon />}
            _hover={{ bg: 'none' }}
            _expanded={{ bg: 'none' }}
            _focus={{ bg: 'none' }}
            background="transparent"
            mt={{ base: 4, md: 0 }}  // Add margin on top for mobile
          >
            Trier
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup defaultValue="asc" title="Date de publication" type="radio">
              <MenuItemOption value="asc">Croissant</MenuItemOption>
              <MenuItemOption value="desc">Décroissant</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup title="Évaluation" type="checkbox">
              <MenuItemOption value="asc">Croissant</MenuItemOption>
              <MenuItemOption value="desc">Décroissant</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>

      {/* Review List Section */}
      <Box w={{ base: '90%', md: '70%' }} align="left" mt={5}>
        {reviews.map((review) => (
          <Box key={review.id} p={5} borderBottom="1px solid #cccfcd">
            {/* Star Rating */}
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  mr={2}
                  key={i}
                  color={i < review.rating ? useColorModeValue('yellow.500', 'yellow.400') : useColorModeValue('gray.300', 'gray.600')}
                />
              ))}
            <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.600">
              {review.content}
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} pl={5} color="gray.400">
              {review.date} . {review.patient}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(ReviewSection);
