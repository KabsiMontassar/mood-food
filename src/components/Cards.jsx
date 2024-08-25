import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

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

  return (
    <Box width="100%" height="100vh"
      justifyContent={"center"} alignContent={"center"}
      bg="#335D2D" py="50px" px="20px">
      <Text
        color="white"
        fontSize="32px"
        fontWeight="bold"
        textAlign="center"
        mb="10px"
      >
        Nos Services
      </Text>
      <Text color="white" fontSize="18px" textAlign="center" mb="40px">
        Découvrez nos services pour une vie plus saine et équilibrée.
      </Text>
      <Flex justify="center" align="center" gap="8vw">
        {cardData.map((card, index) => (
          <Box
            key={index}
            bg={card.bgColor}
            width="340px"
            height="350px"
            borderRadius="12px"
            overflow="hidden"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
            textAlign="center"
          >
         
            <Box p="20px">
              <Text color="white" fontSize="24px" fontWeight="bold" mb="8px">
                {card.title}
              </Text>
              <Text color="white" fontSize="16px">
                {card.description}
              </Text>
            </Box>
            <Flex justifyContent="center"  alignItems="end" p="20px" >
              <Button bg="white" color="black" width="10vw" p="10px" fontSize="16px" >
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
