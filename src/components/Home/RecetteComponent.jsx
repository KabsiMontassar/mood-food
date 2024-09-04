import { Button, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import '../../RecetteComponent.css';

const foodEmojis = ["🍎", "🍇", "🥦", "🥕", "🍌", "🍓", "🍊"];

const RecetteComponent = () => {
    return (
        <Flex
            height="100vh"
            width="100%"
            alignItems="center"
            justifyContent="center"
            bg="#f7f1ea"
            p={8}
            borderRadius="lg"
            position="relative"
            overflow="hidden"
        >

            {foodEmojis.map((emoji, index) => (
                <div key={index} className="food-drop" style={{ left: `${index * 15}%` }}>
                    {emoji}
                </div>
            ))}

            <VStack
                align="center"
                spacing={4}
                flex={1}
                textAlign="center"
                alignContent={"center"}
                justifyContent={"center"}
            >
                <Heading as="h1" size="xl" color="black">
                    Découvrez des recettes nutritives sélectionnées par nos nutritionnistes experts.
                </Heading>
                <Text fontSize="lg" color="gray.600">
                    Découvrez une collection soigneusement sélectionnée de recettes saines et délicieuses élaborées par nos nutritionnistes experts. Que vous cherchiez à augmenter votre énergie, à améliorer votre bien-être ou simplement à savourer un bon repas, nos recettes sont conçues pour nourrir à la fois votre corps et votre âme. Commencez votre voyage vers une meilleure alimentation dès aujourd'hui !
                </Text>
                <Button
                    size="lg"
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

export default RecetteComponent;
