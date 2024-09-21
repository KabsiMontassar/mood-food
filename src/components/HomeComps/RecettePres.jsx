import React from 'react'
import { Box, Flex, Heading, Text, Button, Stack } from '@chakra-ui/react'
import bg3 from "../../assets/HomeBackgrounds/foodbg.png";

import recipes1 from "../../assets/recipes/1.jpeg";
import recipes2 from "../../assets/recipes/2.jpg";
import recipes3 from "../../assets/recipes/3.jpg";
import recipes4 from "../../assets/recipes/4.jpg";
import recipes5 from "../../assets/recipes/5.jpg";
import recipes6 from "../../assets/recipes/6.jpg";
import recipes7 from "../../assets/recipes/7.jpg";
import recipes8 from "../../assets/recipes/8.jpeg";


const recipes = [
  recipes1,
  recipes2,
  recipes3,
  recipes4,
  recipes5,
  recipes6,
  recipes7,
  recipes8
];


const RecettePres = () => {
  return (
    <Box
      height={{ base: 'auto', md: '100vh' }}
      position="relative"
      bgImage={`url(${bg3})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
    >

      <Box
        bg="#0A7342"
        opacity={0.9}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="1"
      />


      <Stack
        position="relative"
        zIndex="2"
        height="100%"
        w="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          gap={9}
          flex="1"
        >
          <Box
            w="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={4}
          >
            <Heading as="h1" size="2xl" textAlign="center" color="gray.100" mt={4} mb={4}>
              Trouvez des recettes saines et délicieuses
            </Heading>
            <Text textAlign="center" color="gray.200" fontSize="lg" mb={4}>
              Découvrez notre collection de recettes saines et délicieuses, conçues pour vous aider à mener une vie plus saine et équilibrée.
            </Text>

            <Flex className="slider-wrapper left">
              {recipes.map((recipe, index) => (
                <Box key={index} bg="white" className={`item item${index + 1}`} style={{ backgroundImage: `url(${recipe})` }}  bgSize="cover" bgPosition="center" bgRepeat="no-repeat"  />
              ))}


            </Flex>

          </Box>
        </Flex>


        <Box
          opacity={0.9}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-end"
          mt={0}
        >
          <Button

            animation="upDown 1s ease-in-out infinite"
            colorScheme="gray"
            fontSize={{ base: 'sm', md: 'md' }}
            color="#0A7342"
            height={{ base: '5vh', md: '10vh' }}
            borderRadius={0}
            variant="solid"
            w="100%"
            mt={8}
          >
            Explorez les recettes
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default RecettePres