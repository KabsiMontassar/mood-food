import { Button, Heading, Text, Image, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import experts from "../assets/experts.jpg";

const ExpertsComponent = () => {
    return (
        <Flex 
       
            alignContent="center"
            justifyContent="center"
            bg="#f7f1ea" 
            p={8} 
            borderRadius="lg"
        >
            <VStack
                align="center"
                spacing={4}
                flex={1}
                mr={{ md: 8 }}
                mb={{ base: 8, md: 0 }}
                textAlign="center"
                alignContent={"center"}
                justifyContent={"center"}
            >
                <Heading as="h1" size="xl" color="black">
                Des experts professionnels et qualifiés en qui vous pouvez avoir confiance.
                </Heading>
                <Text fontSize="lg" color="gray.600">
                Accédez à un vaste réseau d'experts compétents et expérimentés qui peuvent vous assister dans la résolution de divers problèmes.                </Text>
                <Button 
                    size="lg" 
                    colorScheme="green"
                    bg="#b5dfba"
                    _hover={{ bg: "#9bcfa3" }}
                >
                    En savoir plus
                </Button>
            </VStack>
            <Flex
                wrap="wrap"
                justify="center"
                flex={1}
                gap={4}
            >
                <Image src={experts} alt="experts" borderRadius="lg"  />
               
            </Flex>
        </Flex>
    );
};

export default ExpertsComponent;
