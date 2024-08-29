import { Button, Heading, Text, Flex, VStack, Box, Image, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import produit1 from "../assets/produit1.jpg";
import produit2 from "../assets/produit2.jpg";
import produit3 from "../assets/produit3.jpg";
import produit4 from "../assets/produit4.jpg";

const BienEtreComponent = () => {
  const imageSize = useBreakpointValue({ base: "100%", sm: "90%", md: "80%", lg: "70%" });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const spacing = useBreakpointValue({ base: 4, md: 6 });

  return (
    <Flex
      direction={flexDirection} // Stack text and grid on small screens, side-by-side on larger screens
      align="center"
      justify="center"
      bg="#f7f1ea"
      p={{ base: 4, md: 8 }}
      borderRadius="lg"
      gap={spacing} 
 wrap="wrap"
 height={{ base: "auto", md: "100vh" }}
     
    >
      <Flex
        flex={1}
        justify="center"
        align="center"
        wrap="wrap"
        maxWidth={{ base: "90%", md: "50%" }}
        gap={4}
        position="relative"
      >
       <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gridTemplateRows="repeat(2, 1fr)"
          gap={4}
          position="relative"
          width="100%"
          maxWidth={imageSize}
        >
        <Image
          w="300px"
          h="300px"
          src={produit1}
          alt="product 1"
          borderRadius="lg"
          gridRow="1 / 2"
          gridColumn="1 / 2"
          objectFit="cover"
            boxShadow="lg"
        />
        <Image
          w="300px"
          h="300px"
          src={produit2}
          alt="product 2"
          borderRadius="lg"
          gridRow="1 / 2"
          gridColumn="2 / 3"
          objectFit="cover"
            boxShadow="lg"
         
        />
        <Image
           w="300px"
          h="300px"
          src={produit3}
          alt="product 3"
          borderRadius="lg"
          gridRow="2 / 3"
          gridColumn="1 / 2"
          objectFit="cover"
            transform="translateX(20%)"
            boxShadow="lg"
        />
        <Image
            w="300px"
          h="300px"
          src={produit4}
          alt="product 4"
          borderRadius="lg"
          gridRow="2 / 3"
          gridColumn="2 / 3"
          objectFit="cover"
            transform="translateX(20%)"
              boxShadow="lg"
        />
        </Box>
      </Flex>

      <VStack
        align="center"
        spacing={spacing}
        flex={1}
        textAlign="center"
        maxWidth={{ base: "90%", md: "50%" }}
      >
        <Heading as="h1" size="xl" color="black">
          Explorez notre sélection de suppléments alimentaires, de nourriture saine et de matériel de sport.
        </Heading>
        <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.600">
          Améliorez votre santé et votre forme physique avec notre sélection de suppléments alimentaires, d’aliments nutritifs et d’équipements de fitness de qualité supérieure. Que vous souhaitiez améliorer votre alimentation, soutenir vos objectifs de bien-être ou améliorer votre routine d’entraînement, nos produits sont conçus pour vous aider à atteindre votre meilleur moi.
        </Text>
        <Button
          size={buttonSize}
          colorScheme="green"
          bg="#b5dfba"
          _hover={{ bg: "#9bcfa3" }}
        >
          En savoir plus
        </Button>
      </VStack>
    </Flex>
  );
};

export default BienEtreComponent;
