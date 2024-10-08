import React, { useEffect } from 'react'

import { Box, Flex, Heading, Text, Image, Stack, Card, CardBody } from '@chakra-ui/react'

import gif1 from "../../assets/HomeCards/1.gif"
import gif2 from "../../assets/HomeCards/2.gif"
import gif3 from "../../assets/HomeCards/3.gif";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};



const gifcards = [
  {
    title: "Rendez-vous médicaux sécurisés et simples",
    description: "Réservez des consultations en ligne avec des experts certifiés sans effort. Notre plateforme garantit la sécurité de vos données et facilite la prise de rendez-vous.",
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

const OurServices = () => {
  return (
    <Box
      bg='white'
      p={4}
      alignItems="center"
      justifyContent="center"

      borderBottom='1px solid #e2e8f0'

      gap={9}
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={4} mt={4}>
        <Heading as="h1" size="2xl" textAlign="center" color="green.400" mt={4} mb={4}>
          Nos service

        </Heading>
        <Text textAlign="center" fontWeight={"bold"} color="gray.600" fontSize="lg" mb={4}>
          Découvrez nos services et commencez votre voyage vers une vie plus saine dès aujourd'hui.
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
  )
}

export default OurServices