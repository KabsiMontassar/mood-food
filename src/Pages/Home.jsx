import React from "react";
import SliderCarousel from "../components/SliderCarousel";
import TherapyCards from "../components/Cards";
import ExpertsComponent from "../components/ExpertComponent";
import RecetteComponent from "../components/RecetteComponent";

import { Flex, Box, Img, Heading } from "@chakra-ui/react";
import logo from "../assets/logo.png";


const Home = () => {


  return (
    <>
      <Box className="container">


        <Flex
          width="100%"
          height="100vh"
          p="100px"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="50%">
            <Heading as="h1" size="2xl"
              color="teal.500" textAlign="center" letterSpacing={3}>
              Transform Your Mood with Every Meal.
            </Heading>
            <br />
            <Heading as="h2" size="md" color="gray.500" textAlign="center">
              Discover the perfect harmony
              between nutrition and well-being at Mood and Food.
            </Heading>
          </Box>
          <Box w="25%" display="flex" justifyContent="flex-end">
            <Img width={300} src={logo} alt="logo" />
          </Box>
        </Flex>



        <Box >
          <SliderCarousel />
        </Box>



        <Box className="section">
          <TherapyCards />
        </Box>



        <Box className="section">
          <ExpertsComponent />
        </Box>
        <Box className="section">
          <RecetteComponent />
        </Box>
        <Box className="section">

        </Box>
      </Box>
    </>
  );
};

export default Home;