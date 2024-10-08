import React from 'react'
import { Box, Flex, Heading, Text, Button, Image, Stack } from '@chakra-ui/react'
import bg3 from "../../assets/HomeBackgrounds/foodbg.png";

import vitamins1 from "../../assets/vitamins/1.jpg";
import vitamins2 from "../../assets/vitamins/2.jpg";
import vitamins3 from "../../assets/vitamins/3.png";
import vitamins4 from "../../assets/vitamins/4.png";
import vitamins5 from "../../assets/vitamins/5.jpg";
import vitamins6 from "../../assets/vitamins/6.jpg";
import vitamins7 from "../../assets/vitamins/7.png";
import vitamins8 from "../../assets/vitamins/8.jpg";

const vitamins = [
  vitamins1,
  vitamins2,
  vitamins3,
  vitamins4,
  vitamins5,
  vitamins6,
  vitamins7,
  vitamins8
];


const ProductsPres = () => {
  return (
    <Box
      height="auto"
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
              Trouvez des vitamines et des suppléments alimentaires  de qualité
            </Heading>
            <Text textAlign="center" color="gray.200" fontSize="lg" mb={4}>
              Découvrez notre gamme de vitamines et de suppléments de qualité, conçue pour vous aider à maintenir un mode de vie sain et équilibré.
            </Text>

            <Flex className="slider-wrapper right">
              {vitamins.map((vitamin, index) => (
                <Box key={index} bg="white" className={`item item${index + 1}`} style={{ backgroundImage: `url(${vitamin})` }}  bgSize="cover" bgPosition="center" bgRepeat="no-repeat" />
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
            Explorez les vitamines
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default ProductsPres