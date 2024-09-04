import React from "react";
import { Box, Flex, Text, Button, useBreakpointValue } from "@chakra-ui/react";

const TherapyCards = () => {
  const cardData = [
    {
      title: "Nutrition Équilibrée",
      description: "Découvrez des plans de repas personnalisés qui nourrissent votre corps tout en équilibrant votre esprit.",
      bgColor: "#476930",
    },
    {
      title: "Conseils de Bien-Être",
      description: "Améliorez votre quotidien avec des astuces et des pratiques simples pour une meilleure santé mentale et physique.",
      bgColor: "#5B758A",
    },
    {
      title: "Consultation Personnalisée",
      description: "Prenez rendez-vous avec nos experts pour un accompagnement sur mesure.",
      bgColor: "#BF813C",
    },
  ];

  
  const cardWidth = useBreakpointValue({ base: "90%", sm: "80%", md: "340px" });
  const cardHeight = useBreakpointValue({ base: "auto", sm: "auto", md: "350px" });
  const gap = useBreakpointValue({ base: "4vw", sm: "6vw", md: "8vw" });
  const buttonWidth = useBreakpointValue({ base: "full", sm: "full", md: "10vw" });

  return (
    <Box
    
      py={{ base: "20px", md: "50px" }}
      px={{ base: "10px", md: "20px" }}
      bg="#335D2D"
      
      textAlign="center"
   
    >
      <Text
        color="white"
        fontSize={{ base: "24px", md: "32px" }}
        fontWeight="bold"
        mb="10px"
      >
        Nos Services
      </Text>
      <Text
        color="white"
        fontSize={{ base: "14px", md: "18px" }}
        mb="40px"
      >
        Découvrez nos services pour une vie plus saine et équilibrée.
      </Text>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        gap={gap}
        wrap="wrap"
       
      >
        {cardData.map((card, index) => (
          <Box
            key={index}
            bg={card.bgColor}
            width={cardWidth}
            height={cardHeight}
            borderRadius="12px"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
            textAlign="center"
            p="20px"
          >
            <Box flex="1">
              <Text color="white" fontSize={{ base: "20px", md: "24px" }} fontWeight="bold" mb="8px">
                {card.title}
              </Text>
              <Text color="white" fontSize={{ base: "14px", md: "16px" }}>
                {card.description}
              </Text>
            </Box>
            <Flex justifyContent="center" p="20px">
              <Button
                bg="white"
                color="black"
                width={buttonWidth}
                p="10px"
                fontSize={{ base: "14px", md: "16px" }}
              >
                Voire Plus
              </Button>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default TherapyCards;
