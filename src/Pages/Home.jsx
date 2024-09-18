


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

import bgmobile from "../assets/HomeBackgrounds/bgmobile.jpg";

import bg1 from "../assets/HomeBackgrounds/bgdoctor.png";
import bg3 from "../assets/HomeBackgrounds/foodbg.png";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import mobile1 from "../assets/Mobile/auth.png";
import mobile2 from "../assets/Mobile/detail.png";
import mobile3 from "../assets/Mobile/expert.png";
import mobile4 from "../assets/Mobile/suivi.png";

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
        <FormLabel color="white">gouvernorat:</FormLabel>
        <Select
          border={0}
          borderRadius="md"
          bg='white'
          placeholder="Governorate"

          value={searchAddress}
          onChange={e => {
            setSearchAddress(e.target.value);
          }}
          focusBorderColor="green.500"
        >
          <option value="">All</option>
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
          placeholder="Type"
          value={selectedType}
          onChange={e => {
            setSelectedType(e.target.value);
            setSelectedSubType('All');
          }}
          focusBorderColor="green.500"
        >
          <option value="All">All</option>
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
      <Card maxW='xl'>
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



//i want to create a linear gradient background for the home page
const coolor = "linear-gradient(180deg, rgba(10,115,66,1) 50%, rgba(94,218,188,1) 100%);";

const Home = () => {

  const [searchAddress, setSearchAddress] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSubType, setSelectedSubType] = useState('All');

  return (
    <Box className="container">
      <Box
        bg={coolor}
        p={4}
        alignItems="center"
        justifyContent="center"
        h={{ base: 'auto', md: '100vh' }}
        gap={9}
        display="flex"
        flexDirection="column">
        <Heading as="h1" size="2xl" textAlign="center" color="gray.100" mt={4} mb={4}>
          Trouvez les meilleurs experts en Tunisie
        </Heading>
        <Text textAlign="center" color="gray.200" fontSize="lg" mb={4}>
          Trouvez les meilleurs experts en Tunisie, des nutritionnistes aux psychologues, et prenez rendez-vous avec eux.
        </Text>
        <NavSearch searchAddress={searchAddress} setSearchAddress={setSearchAddress} selectedType={selectedType} setSelectedType={setSelectedType} selectedSubType={selectedSubType} setSelectedSubType={setSelectedSubType} psychologistTypes={psychologistTypes} />
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          align="center"
          gap={10}
          p={4}>
          {ImageCards.map((img, index) => (
            <CardCustom key={index} img={img} />
          ))}
        </Flex>
      </Box>

      <Box
        bg='white'
        p={4}
        alignItems="center"
        justifyContent="center"
        height={{ base: 'auto', md: '80vh' }}
        borderBottom='1px solid #e2e8f0'

        gap={9}
      >
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4} mt={4}>
          <Heading as="h1" size="2xl" textAlign="center" color="green.400" mt={4} mb={4}>
            Our Services

          </Heading>
          <Text textAlign="center" fontWeight={"bold"} color="gray.600" fontSize="lg" mb={4}>
            Online Appointment, Phone-in Appointment, Walk-in Appointment with Token
          </Text>
        </Box>
        <Flex
          gap={9}
          justify="center"
          align="center"
          p={4} direction={{ base: 'column', md: 'row' }}>
          {gifcards.map((card, index) => (
            <AnimatedCard key={index} card={card} />
          ))}
        </Flex>
      </Box>

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
                Checkout our healthy recipes
              </Heading>
              <Text textAlign="center" color="gray.200" fontSize="lg" mb={4}>
                Discover our range of healthy recipes, carefully selected by our experts to support your well-being journey.
              </Text>

              <Flex className="slider-wrapper left">
                <Box className="item item1"></Box>
                <Box className="item item2"></Box>
                <Box className="item item3"></Box>
                <Box className="item item4"></Box>
                <Box className="item item5"></Box>
                <Box className="item item6"></Box>
                <Box className="item item7"></Box>
                <Box className="item item8"></Box>
              </Flex>

            </Box>
          </Flex>


          <Box
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
              Explore Recipes
            </Button>
          </Box>
        </Stack>
      </Box>
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
                Checkout Trusty Vitamins and Supplements
              </Heading>
              <Text textAlign="center" color="gray.200" fontSize="lg" mb={4}>
                Discover our range of vitamins and supplements, carefully selected by our experts to support your well-being journey.
              </Text>

              <Flex className="slider-wrapper left">
                <Box className="item item1"></Box>
                <Box className="item item2"></Box>
                <Box className="item item3"></Box>
                <Box className="item item4"></Box>
                <Box className="item item5"></Box>
                <Box className="item item6"></Box>
                <Box className="item item7"></Box>
                <Box className="item item8"></Box>
              </Flex>

            </Box>
          </Flex>


          <Box
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
              Explore Products
            </Button>
          </Box>
        </Stack>
      </Box>
      <SimpleGrid
        mt={4}
        align="center"
        display={{ base: "none", md: "grid" }}
        columns={2}
        spacing={10}
        p={4}
      >
        <MotionBox
      h="100vh"
      w="100%"
      
      initial="hidden"
      whileInView="visible"
      display="flex"
      justifyContent="center"
      alignItems="center"
      variants={revealFromRight}
      viewport={{ once: true, amount: 0.5 }}
      style={{ perspective: "1000px" }} // Add perspective for 3D effect
    >
      {/* iPhone Layout */}
      <Box
        position="relative"
        bg="black"
        borderRadius="40px"
        h="600px" // Height of the iPhone
        w="300px" // Width of the iPhone
        border="16px solid black" // Frame thickness
        boxShadow="0 20px 30px rgba(0, 0, 0, 0.5)" // 3D shadow for depth
        display="flex"
        justifyContent="center"
        alignItems="center"
        transform="rotateY(25deg) rotateX(5deg)" // 3D Rotation effect
        transition="transform 0.3s ease"
        _hover={{
          transform: "rotateY(0deg) rotateX(0deg)", // Reset on hover
        }}
      >
        {/* iPhone Notch */}
        <Box
          position="absolute"
          top="-5px"
          left="50%"
          transform="translateX(-50%)"
          w="150px"
          h="20px"
          bg="black"
          borderBottomRadius="10px"
        ></Box>

        {/* iPhone Screen */}
        <Box
          bg="white"
          w="260px"
          h="520px"
          borderRadius="30px"
          overflow="hidden"
          position="relative"
        >
          {/* Place any content inside the screen */}
          <Image
            src={mobile1}
            alt="App Screen"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </Box>
    </MotionBox>

        <MotionBox
          h="100vh"
          w="100%"
          
          align="center"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          initial="hidden"
          whileInView="visible"
          variants={revealFromRight}
          viewport={{ once: true, amount: 0.5 }}
        >
       <Flex direction="column" w="60%">
        <Heading>
        Connexion simple et sécurisée
          </Heading>
          <Text>Connectez-vous facilement à votre compte grâce à notre système d'authentification sécurisé et fluide. Que vous soyez un utilisateur régulier ou nouveau sur l'application, profitez d'une connexion rapide et sans tracas, tout en protégeant vos données.</Text> 
        </Flex>
      
        </MotionBox>

        <MotionBox
          h="100vh"
          w="100%"
          align="center"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          
          initial="hidden"
          whileInView="visible"
          variants={revealFromLeft}
          viewport={{ once: true, amount: 0.5 }}
        >
         <Flex direction="column" w="60%">
        <Heading>
        Consultez des médecins hautement qualifiés
          </Heading>
          <Text>
          Notre équipe de médecins expérimentés et qualifiés est à votre disposition pour vous offrir des consultations d'experts. Que ce soit pour des conseils de santé généraux ou des traitements spécialisés, accédez facilement aux meilleurs professionnels de la santé.          </Text> 
        </Flex>
        </MotionBox>

        <MotionBox
      h="100vh"
      w="100%"
    
      initial="hidden"
      whileInView="visible"
      display="flex"
      justifyContent="center"
      alignItems="center"
      variants={revealFromRight}
      viewport={{ once: true, amount: 0.5 }}
      style={{ perspective: "1000px" }} // Add perspective for 3D effect
    >
      {/* iPhone Layout */}
      <Box
        position="relative"
        bg="black"
        borderRadius="40px"
        h="600px" // Height of the iPhone
        w="300px" // Width of the iPhone
        border="16px solid black" // Frame thickness
        boxShadow="0 20px 30px rgba(0, 0, 0, 0.5)" // 3D shadow for depth
        display="flex"
        justifyContent="center"
        alignItems="center"
        transform="rotateY(-25deg) rotateX(5deg)" // 3D Rotation effect
        transition="transform 0.3s ease"
        _hover={{
          transform: "rotateY(0deg) rotateX(0deg)", // Reset on hover
        }}
      >
        {/* iPhone Notch */}
        <Box
          position="absolute"
          top="-5px"
          left="50%"
          transform="translateX(-50%)"
          w="150px"
          h="20px"
          bg="black"
          borderBottomRadius="10px"
        ></Box>

        {/* iPhone Screen */}
        <Box
          bg="white"
          w="260px"
          h="520px"
          borderRadius="30px"
          overflow="hidden"
          position="relative"
        >
          {/* Place any content inside the screen */}
          <Image
            src={mobile3}
            alt="App Screen"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </Box>
    </MotionBox>

        <MotionBox
      h="100vh"
      w="100%"
      
      initial="hidden"
      whileInView="visible"
      display="flex"
      justifyContent="center"
      alignItems="center"
      variants={revealFromRight}
      viewport={{ once: true, amount: 0.5 }}
      style={{ perspective: "1000px" }} // Add perspective for 3D effect
    >
      {/* iPhone Layout */}
      <Box
        position="relative"
        bg="black"
        borderRadius="40px"
        h="600px" // Height of the iPhone
        w="300px" // Width of the iPhone
        border="16px solid black" // Frame thickness
        boxShadow="0 20px 30px rgba(0, 0, 0, 0.5)" // 3D shadow for depth
        display="flex"
        justifyContent="center"
        alignItems="center"
        transform="rotateY(25deg) rotateX(5deg)" // 3D Rotation effect
        transition="transform 0.3s ease"
        _hover={{
          transform: "rotateY(0deg) rotateX(0deg)", // Reset on hover
        }}
      >
        {/* iPhone Notch */}
        <Box
          position="absolute"
          top="-5px"
          left="50%"
          transform="translateX(-50%)"
          w="150px"
          h="20px"
          bg="black"
          borderBottomRadius="10px"
        ></Box>

        {/* iPhone Screen */}
        <Box
          bg="white"
          w="260px"
          h="520px"
          borderRadius="30px"
          overflow="hidden"
          position="relative"
        >
          {/* Place any content inside the screen */}
          <Image
            src={mobile2}
            alt="App Screen"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </Box>
    </MotionBox>

        <MotionBox
          h="100vh"
          w="100%"
        
          initial="hidden"
          whileInView="visible"
          align="center"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          variants={revealFromRight}
          viewport={{ once: true, amount: 0.5 }}
        >

<Flex direction="column" w="60%">
        <Heading>
        Achetez des produits de santé de confiance
          </Heading>
          <Text>
          Découvrez notre gamme de produits de santé, soigneusement sélectionnés pour répondre à vos besoins en bien-être. Des vitamines aux compléments alimentaires en passant par les produits médicaux essentiels, chaque article a été rigoureusement testé pour sa qualité. Achetez en toute sérénité.          </Text> 
        </Flex>

        </MotionBox>
        <MotionBox
          h="100vh"
          w="100%"
        
          align="center"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          initial="hidden"
          whileInView="visible"
          variants={revealFromLeft}
          viewport={{ once: true, amount: 0.5 }}
        > <Flex direction="column" w="60%">
        <Heading>
        Suivez votre parcours santé et bien-être
                  </Heading>
          <Text>
          Gardez le contrôle de votre santé avec nos outils de suivi complets. Suivez votre poids, votre masse musculaire et votre alimentation pour obtenir une vue d'ensemble de votre bien-être. Notre application vous fournit des informations personnalisées pour vous aider à atteindre vos objectifs de forme et de santé.          </Text> 
        </Flex>

        </MotionBox>

        <MotionBox
      h="100vh"
      w="100%"
    
      initial="hidden"
      whileInView="visible"
      display="flex"
      justifyContent="center"
      alignItems="center"
      variants={revealFromRight}
      viewport={{ once: true, amount: 0.5 }}
      style={{ perspective: "1000px" }} // Add perspective for 3D effect
    >
      {/* iPhone Layout */}
      <Box
        position="relative"
        bg="black"
        borderRadius="40px"
        h="600px" // Height of the iPhone
        w="300px" // Width of the iPhone
        border="16px solid black" // Frame thickness
        boxShadow="0 20px 30px rgba(0, 0, 0, 0.5)" // 3D shadow for depth
        display="flex"
        justifyContent="center"
        alignItems="center"
        transform="rotateY(-25deg) rotateX(5deg)" // 3D Rotation effect
        transition="transform 0.3s ease"
        _hover={{
          transform: "rotateY(0deg) rotateX(0deg)", // Reset on hover
        }}
      >
        {/* iPhone Notch */}
        <Box
          position="absolute"
          top="-5px"
          left="50%"
          transform="translateX(-50%)"
          w="150px"
          h="20px"
          bg="black"
          borderBottomRadius="10px"
        ></Box>

        {/* iPhone Screen */}
        <Box
          bg="white"
          w="260px"
          h="520px"
          borderRadius="30px"
          overflow="hidden"
          position="relative"
        >
          {/* Place any content inside the screen */}
          <Image
            src={mobile4}
            alt="App Screen"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </Box>
    </MotionBox>
      </SimpleGrid>









    </Box>
  );
};

export default Home;
