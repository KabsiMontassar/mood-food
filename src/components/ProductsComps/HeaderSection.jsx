import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { CSSTransition } from 'react-transition-group';
import img1 from '../../assets/images/diététiques.jpeg';

import prod from '../../assets/images/header/prod.png';
import gym from '../../assets/images/header/gym.png';
import spp from '../../assets/images/header/spp.png';

// Categories array with images and titles
const categories = [
  {
    id: 1,
    title: 'Compléments Alimentaires',
    image: spp,
  },
  {
    id: 2,
    title: 'Produits Diététiques',
    image: prod,
  },
  {
    id: 3,
    title: 'Equipements de Gym',
    image: gym,
  },
];

const HeaderSection = () => {
  const [show, setShow] = useState(false);

  // Create refs for CSSTransition
  const leftNodeRef = useRef(null);
  const rightNodeRef = useRef(null);

  // Animation effect trigger when the component mounts
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Box mb={6} position="relative" width="100%" overflow="hidden">
      <HStack spacing={0} justify="center" align="center" height="100vh">
        {/* Left Side - Text Section */}
        <CSSTransition
          in={show}
          timeout={1000}
          classNames="slide-left"
          nodeRef={leftNodeRef}
        >
          <Box
            ref={leftNodeRef}
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            p={10}
            height="100%"
          >
            <Box>
              <Heading size={{ base: 'md', md: 'lg' }} mb={2}>
                Your Guide to  Wellness
              </Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                Browse  our curated selection of products to enhance your health
              </Text>
              <Button mt={4}  
              variant={'outline'} 
              fontSize={'md'}
              colorScheme='green' >
            
                SHOP THE GIFT GUIDE
              </Button>
            </Box>
          </Box>
        </CSSTransition>

        {/* Right Side - Image Section */}
        <CSSTransition
          in={show}
          timeout={1000}
          classNames="slide-right"
          nodeRef={rightNodeRef}
        >
          <Box
            ref={rightNodeRef}
            p={10}
            flex="1"
            overflow="hidden"
            height="100%"
          >
            <Image
              src={img1} // Image for the right section
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
        </CSSTransition>
      </HStack>

      {/* Categories Section */}
      <Box>
        <HStack spacing={4} justify="center" align="center" py={4}>
          {categories.map((category) => (
            <Box key={category.id} textAlign="center" p={4}>
              <Image src={category.image} width="300px" 
               
               height="auto" />
              <Text fontSize="lg" fontWeight="bold" mt={2}>
                {category.title}
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default HeaderSection;
