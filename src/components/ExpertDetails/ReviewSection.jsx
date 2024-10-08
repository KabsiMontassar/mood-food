import React, { useState } from 'react';
import { Box, Flex, Text, Menu, MenuButton, useColorModeValue, Button, MenuList, MenuDivider, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react';
import { ChevronDownIcon, StarIcon } from '@chakra-ui/icons';


const ReviewSection = ({ expert, reviews }) => {


  const [sortDate, setSortDate] = useState('asc');
  const [sortRating, setSortRating] = useState('asc');

  const getSortedReviews = () => {
    let sortedReviews = [...reviews];


    sortedReviews.sort((a, b) => {
      if (sortRating === 'asc') {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });

    sortedReviews.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortDate === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedReviews;
  };

  return (
    <Box align="center" w="full">
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
          {expert.reviews.length} Avis
        </Text>


        <Menu>
          <MenuButton
            className="menu-button"
            as={Button}
            rightIcon={<ChevronDownIcon />}
            _hover={{ bg: 'none' }}
            _expanded={{ bg: 'none' }}
            _focus={{ bg: 'none' }}
            background="transparent"
            mt={{ base: 4, md: 0 }}
          >
            Trier
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuOptionGroup defaultValue="asc" title="Date de publication" type="radio">
              <MenuItemOption value="asc" onClick={() => setSortDate('asc')}>

                Croissant
              </MenuItemOption>
              <MenuItemOption value="desc" onClick={() => setSortDate('desc')}>

                Décroissant
              </MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup defaultValue="asc" title="Évaluation" type="radio">
              <MenuItemOption align="center" value="asc" onClick={() => setSortRating('asc')}>

                Croissant
              </MenuItemOption>
              <MenuItemOption value="desc" onClick={() => setSortRating('desc')}>

                Décroissant
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>

      {/* Review List Section */}
      <Box w={{ base: '90%', md: '70%' }} align="left" mt={5}>
        {getSortedReviews().map((review, index) => (
          <Box key={index} p={5} borderBottom="1px solid #cccfcd">

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
              {review.commentaire}
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} pl={5} color="gray.400">
              {new Date(review.date.seconds * 1000).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              )}. {review.iduser}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default React.memo(ReviewSection);
