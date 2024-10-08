
import { Box, Button, Heading, HStack, Image, Text } from '@chakra-ui/react';
import  { useEffect, useState } from 'react';



const categories = [
    {
      title: 'Produit Diététique',
      description: 'Découvrez nos produits diététiques pour une alimentation équilibrée, savoureuse et adaptée à vos objectifs de santé.',
      image: '/src/assets/images/diététiques.jpeg',
    },
    {
      title: 'Complement alimentaire',
      description: 'Boostez votre santé avec nos compléments alimentaires de qualité, conçus pour répondre à vos besoins spécifiques.',
      image: '/src/assets/images/complement.jpg',
    },
    {
      title: 'Equipement sportif',
      description: 'Équipez-vous avec notre sélection d’équipements et accessoires sportifs, parfaits pour atteindre vos performances optimales.',
      image: '/src/assets/images/sportif.webp',
    },
  ];

const HeaderSection = ({ onCategorySelect, selectedCategory }) => {
    
  
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const index = categories.findIndex((cat) => cat.title === selectedCategory);
      if (index !== -1) {
        setCurrentIndex(index);
      } else {
        setCurrentIndex(0);
      }
    }, [selectedCategory]);
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };
  
    const currentCategoryData = categories[currentIndex];
  
    useEffect(() => {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <Box mb={6} position="relative" width="100%">
        <Box position="relative" textAlign="center">
          <Image
            src={currentCategoryData.image}
            alt={currentCategoryData.title}
            width="100%"
            height={{ base: '200px', md: '400px' }} // Responsive height
            objectFit="cover"
            borderRadius="md"
          />
  
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="md"
          >
            <Box textAlign="center" color="white" p={4}>
              <Heading size={{ base: 'md', md: 'lg' }} mb={2}>
                {currentCategoryData.title}
              </Heading>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{currentCategoryData.description}</Text>
            </Box>
          </Box>
  
          <HStack spacing={4} position="absolute" bottom={4} left="50%" transform="translateX(-50%)">
            {categories.map((_, idx) => (
              <Box
                key={idx}
                width={2}
                height={2}
                bg={idx === currentIndex ? 'orange.500' : 'white'}
                borderRadius="50%"
              />
            ))}
          </HStack>
        </Box>
  
        <HStack spacing={4} justifyContent="center" mt={4} flexWrap="wrap">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.title;
            return (
              <Button
                key={cat.title}
                onClick={() => onCategorySelect(cat.title)}
                variant={isActive ? 'solid' : 'outline'}
                bgImage={`url(${cat.image})`}
                bgSize="cover"
                bgPosition="center"
                color={isActive ? 'white' : 'black'}
                px={4}
                py={2}
                width={{ base: '100%', sm: '200px', md: '400px' }} // Responsive width
                height="50px"
                border="none"
                boxShadow={isActive ? 'none' : '0px 4px 6px rgba(0, 0, 0, 0.3)'}
                transition="box-shadow 0.3s ease-in-out"
              >
                {cat.title}
              </Button>
            );
          })}
        </HStack>
      </Box>
    );
  };

export default HeaderSection;