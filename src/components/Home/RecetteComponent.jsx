import { Button, Heading, Text, Flex, Image, VStack, useBreakpointValue, Box } from "@chakra-ui/react";
import React from "react";
import orange from "../../assets/fruits/orange.png";
import apple from "../../assets/fruits/apple.png";
import banana from "../../assets/fruits/banana.png";
import broccoli from "../../assets/fruits/broccoli.png";
import carrot from "../../assets/fruits/carrot.png";
import grapes from "../../assets/fruits/grapes.png";
import strawberry from "../../assets/fruits/strawberry.png";

// List of fruit images
const foodEmojis = [orange, apple, banana, broccoli, carrot, grapes, strawberry];

const RecetteComponent = () => {
    const fontSize = useBreakpointValue({ base: "md", sm: "lg", md: "xl" });
    const emojiSize = useBreakpointValue({ base: "100px", md: "120px" });

 
    const generateAnimation = (index) => `
        @keyframes fall${index} {
            0% {
                transform: translateY(-100vh) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
            100% {
                transform: translateY(100vh) rotate(${Math.random() * 360}deg);
                opacity: 1;
            }
        }
    `;

  
    const keyframes = foodEmojis.map((_, index) => generateAnimation(index)).join(' ');

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
            direction="column"
        >
         
            <style>
                {keyframes}
            </style>

            <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                flexWrap="wrap"
                justify="center"
                align="center"
                pointerEvents="none"
                overflow="hidden"
                zIndex={0}
            >
                {foodEmojis.map((emoji, index) => (
                    <Box
                        key={index}
                        as="div"
                        sx={{
                            animation: `fall${index} 7s infinite`,
                            position: "absolute",
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: `translate(-${emojiSize}, -${emojiSize})`,
                            width: emojiSize,
                            height: emojiSize,
                            opacity: 0.8
                        }}
                    >
                        <Image src={emoji} alt="Food emoji" />
                    </Box>
                ))}
            </Flex>

            <VStack
                align="center"
                spacing={4}
                flex={1}
                textAlign="center"
                justifyContent="center"
                zIndex={1} 
            >
                <Heading as="h1" size="2xl" color="black" fontSize={fontSize}>
                    Découvrez des recettes nutritives sélectionnées par nos nutritionnistes experts.
                </Heading>
                <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} color="gray.600">
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
