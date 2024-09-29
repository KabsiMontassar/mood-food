<<<<<<< Updated upstream
import React from "react";
import SearchHeader from "../components/HomeComps/SearchHeader";
import OurServices from "../components/HomeComps/OurServices";
import RecettePres from "../components/HomeComps/RecettePres";
import ProductsPres from "../components/HomeComps/ProductsPres";
import MobilePres from "../components/HomeComps/MobilePres";
=======
import React, { useState, useEffect } from "react";
import {
  Flex, Box, Img, Heading, Text, Select, FormControl, FormLabel, Button,
  Card, CardBody, CardFooter, ButtonGroup, Image, Stack, Divider, SimpleGrid

} from "@chakra-ui/react";

import adhd from "../assets/HomeCards/autism.png";
import nutritionalpyramid from "../assets/HomeCards/nutritional-pyramid.png";
import nutritionplan from "../assets/HomeCards/nutrition-plan.png";
import sciencebook from "../assets/HomeCards/science-book.png";
// import from chakra ui cions 
import gif1 from "../assets/HomeCards/1.gif"
import gif2 from "../assets/HomeCards/2.gif"
import gif3 from "../assets/HomeCards/3.gif";


import bg3 from "../assets/HomeBackgrounds/foodbg.png";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import mobile1 from "../assets/Mobile/auth.png";
import mobile2 from "../assets/Mobile/detail.png";
import mobile3 from "../assets/Mobile/expert.png";
import mobile4 from "../assets/Mobile/suivi.png";


import vitamins1 from "../assets/vitamins/1.jpg";
import vitamins2 from "../assets/vitamins/2.jpg";
import vitamins3 from "../assets/vitamins/3.png";
import vitamins4 from "../assets/vitamins/4.png";
import vitamins5 from "../assets/vitamins/5.jpg";
import vitamins6 from "../assets/vitamins/6.jpg";
import vitamins7 from "../assets/vitamins/7.png";
import vitamins8 from "../assets/vitamins/8.jpg";

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


import bgrecherche from "../assets/HomeBackgrounds/min.png";

import recipes1 from "../assets/recipes/1.jpeg";
import recipes2 from "../assets/recipes/2.jpg";
import recipes3 from "../assets/recipes/3.jpg";
import recipes4 from "../assets/recipes/4.jpg";
import recipes5 from "../assets/recipes/5.jpg";
import recipes6 from "../assets/recipes/6.jpg";
import recipes7 from "../assets/recipes/7.jpg";
import recipes8 from "../assets/recipes/8.jpeg";


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







const gifcards = [
  {
    title: "Rendez-vous médicaux sécurisés et simples",
    description: "Réservez des consultations en ligne avec des médecins certifiés sans effort. Notre plateforme garantit la sécurité de vos données et facilite la prise de rendez-vous.",
    image: gif2
  },
  {
    title: "Recette saine sélectionnée par des experts",
    description: "Découvrez des repas nutritifs élaborés par nos experts. Profitez de recettes saines et délicieuses adaptées pour soutenir votre parcours de bien-être.",
    image: gif1
  },
  {
    title: "Produits vérifiés en qui vous pouvez avoir confiance",
    description: "Découvrez notre gamme de produits approuvés par des experts. Chaque article est soigneusement testé et fiable pour votre santé et votre bien-être.",
    image: gif3
  }
];



const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};




const MotionBox = motion(Box);


const ImageCards = [
  adhd,
  sciencebook,

  nutritionalpyramid,
  nutritionplan

];


const TunisGovernorates = [
  'Ariana',
  'Beja',
  'Ben Arous',
  'Bizerte',
  'Gabes',
  'Gafsa',
  'Jendouba',
  'Kairouan',
  'Kasserine',
  'Kebili',
  'Kef',
  'Mahdia',
  'Manouba',
  'Medenine',
  'Monastir',
  'Nabeul',
  'Sfax',
  'Sidi Bouzid',
  'Siliana',
  'Sousse',
  'Tataouine',
  'Tozeur',
  'Tunis',
  'Zaghouan'
];
const psychologistTypes = [
  "Clinical Psychologist",
  "Neuropsychologist",
  "Industrial-Organizational Psychologist",
  "Sports Psychologist",
  "Developmental Psychologist",
  "Social Psychologist",
  "Cognitive Psychologist",
  "Psychotherapist"
];


const revealFromRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const revealFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};


const NavSearch = ({ searchAddress, setSearchAddress, selectedType, setSelectedType, selectedSubType, setSelectedSubType, psychologistTypes }) => {
  return (

    <Flex

      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="center"
      gap={4}
      w={{ base: '100%', md: '80%' }}
      p={4}
    >

      <FormControl variant="floating" id="Address">
        <FormLabel color="white">Gouvernorat:</FormLabel>
        <Select
          border={0}
          borderRadius="md"
          bg='white'
        

          value={searchAddress}
          onChange={e => {
            setSearchAddress(e.target.value);
          }}
          focusBorderColor="green.500"
        >
          <option value="">Tous</option>
          {TunisGovernorates.map((governorate, index) => (
            <option key={index} value={governorate}>{governorate}</option>
          ))}

        </Select>
      </FormControl>
      <FormControl variant="floating" >
        <FormLabel color="white">Type:</FormLabel>
        <Select
          border={0}
          borderRadius="md"
          bg='white'
         
          value={selectedType}
          onChange={e => {
            setSelectedType(e.target.value);
            setSelectedSubType('All');
          }}
          focusBorderColor="green.500"
        >
          <option value="All">Tous</option>
          <option value="Nutritionist">Nutritionist</option>
          <option value="Psychologist">Psychologist</option>
        </Select>
      </FormControl>


      {selectedType === 'Psychologist' && (
        <FormControl variant="floating"  >
          <FormLabel color="white">Spécialité:</FormLabel>
          <Select
            border={0}
            borderRadius="md"
            bg='white'
            value={selectedSubType}
            onChange={e => setSelectedSubType(e.target.value)}
            focusBorderColor="green.500"
          >
            <option value="All">All</option>
            {psychologistTypes.map((subType, index) => (
              <option key={index} value={subType}>{subType}</option>
            ))}
          </Select>

        </FormControl>
      )}
      <Button colorScheme="gray" color="#0A7342" variant="solid" size="md" w="40%" mt={8}>
        Find Experts
      </Button>
    </Flex>
  );
};



const CardCustom = ({ img }) => {
  return (
    <Box
      bg="green.700"
      opacity={0.7}
      p={4}
      alignItems="center"
      borderRadius="md"
      align="center"
      clipPath={{ base: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', md: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
    >
      <Img
        src={img}
        alt="Expert"

        w={{ base: '50%', md: 'auto' }}
        h={{ base: 'auto', md: '150px' }}
        objectFit="cover"
        borderRadius="md"
      />
    </Box>
  );
};


const AnimatedCard = ({ card }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
    >
      <Card bg="#FCFCFF" maxW='xl'>
        <CardBody align="center">
          <Image
            src={card.image}
            alt={card.title}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading align="center" size='md'>{card.title}</Heading>
            <Text>{card.description}</Text>
          </Stack>
        </CardBody>
      </Card>
    </motion.div>
  );
};



>>>>>>> Stashed changes

const Home = () => {
  return (
    <>
      <SearchHeader />
      <OurServices />
      <RecettePres />
      <ProductsPres />
      <MobilePres />
    </>
  );
};

export default Home;
