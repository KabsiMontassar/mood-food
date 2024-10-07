import React from 'react';
import { Box, Image, Text, Flex } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the styles for the carousel

const HeaderCarousel = () => {
  const images = [
    { src: 'src/assets/alimentation-sante.jpg', alt: 'Image 1', text: 'Nourrissez votre corps avec des repas équilibrés' },
    { src: 'src/assets/alimentation-sante1.jpg', alt: 'Image 2', text: 'Mangez sain pour vivre mieux chaque jour' },
    { src: 'src/assets/alimentation-sante2.jpg', alt: 'Image 3', text: 'Mangez sainement, vivez pleinement' },
  ];

  return (
    <Box w="100%" h="400px" mb={8}>
    <Box
      w="100%"
      h="400px"
      mb={8}
      position="absolute"
      bg="green.400"

    />
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={5000}
        showStatus={false}
      >
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <Image 
              src={image.src} 
              alt={image.alt} 
              objectFit="cover" 
              w="100%" 
              h="400px" 
            />
            <Flex
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              justify="center"
              align="center"
              w="100%"
              h="100%"
              bg="rgba(0, 0, 0, 0.4)" // Semi-transparent background for text visibility
              borderRadius="md" // Optional: add border-radius for a rounded effect
            >
              <Text color="white" fontSize="2xl" fontWeight="bold" textAlign="center">
                {image.text}
              </Text>
            </Flex>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default HeaderCarousel;
