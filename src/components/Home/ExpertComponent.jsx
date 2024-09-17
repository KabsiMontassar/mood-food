import { Button, Heading, Text, Image, Flex, VStack, useBreakpointValue, Box } from "@chakra-ui/react";
import React from "react";
import experts from "../../assets/experts.jpg";

const ExpertsComponent = () => {
  const imageSize = useBreakpointValue({ base: "100%", sm: "80%", md: "70%" });
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const spacing = useBreakpointValue({ base: 4, md: 6 });

  return (
    <Flex
      direction={flexDirection}
      align="center"
      justify="center"
      bg="#f7f1ea"
      
      p={{ base: 4, md: 8 }}
      borderRadius="lg"
      wrap="wrap"
      height={{ base: "auto", md: "100vh" }}
    >
      <VStack
        align="center"
        spacing={spacing}
        flex={1}
        mb={{ base: 8, md: 0 }}
        textAlign="center"
        maxWidth={{ base: "90%", md: "50%" }}
      >
        <Heading as="h1" size="xl" color="black">
          Des experts professionnels et qualifiés en qui vous pouvez avoir confiance.
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
          Accédez à un vaste réseau d'experts compétents et expérimentés qui peuvent vous assister dans la résolution de divers problèmes.
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

      <Flex
        flex={1}
        justify="center"
        align="center"
        wrap="wrap"
        maxWidth={{ base: "90%", md: "50%" }}
        gap={4}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, minmax(150px, 1fr))"
          gridTemplateRows="repeat(2, minmax(150px, 1fr))"
          gap={4}
          width="100%"
          maxWidth={imageSize}
        >
          <Image
            src={experts}
            alt="experts"
            borderRadius="lg"
            boxShadow="lg"
          />
          <Image
            src={experts}
            alt="experts"
            borderRadius="lg"
            boxShadow="lg"
          />
          <Image
            src={experts}
            alt="experts"
            borderRadius="lg"
            boxShadow="lg"
          />
          <Image
            src={experts}
            alt="experts"
            borderRadius="lg"
            boxShadow="lg"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ExpertsComponent;
