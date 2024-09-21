import React from 'react'
import { motion } from "framer-motion";
import { Box, Flex, Heading, Text, SimpleGrid, Image } from "@chakra-ui/react";
import mobile1 from "../../assets/Mobile/auth.png";
import mobile2 from "../../assets/Mobile/detail.png";
import mobile3 from "../../assets/Mobile/expert.png";
import mobile4 from "../../assets/Mobile/suivi.png";



const MotionBox = motion(Box);

const revealFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const revealFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const MobileContent = [
    {
        title: "Connexion simple et sécurisée",
        description: "Connectez-vous facilement à votre compte grâce à notre système d'authentification sécurisé et fluide. Que vous soyez un utilisateur régulier ou nouveau sur l'application, profitez d'une connexion rapide et sans tracas, tout en protégeant vos données.",
        image: mobile1
    },
    {
        title: "Consultez des médecins hautement qualifiés",
        description: "Notre équipe de médecins expérimentés et qualifiés est à votre disposition pour vous offrir des consultations d'experts. Que ce soit pour des conseils de santé généraux ou des traitements spécialisés, accédez facilement aux meilleurs professionnels de la santé.",
        image: mobile3
    },
    {
        title: "Achetez des produits de santé de confiance",
        description: "Découvrez notre gamme de produits de santé, soigneusement sélectionnés pour répondre à vos besoins en bien-être. Des vitamines aux compléments alimentaires en passant par les produits médicaux essentiels, chaque article a été rigoureusement testé pour sa qualité. Achetez en toute sérénité.",
        image: mobile2
    },
    {
        title: "Suivez votre parcours santé et bien-être",
        description: "Gardez le contrôle de votre santé avec nos outils de suivi complets. Suivez votre poids, votre masse musculaire et votre alimentation pour obtenir une vue d'ensemble de votre bien-être. Notre application vous fournit des informations personnalisées pour vous aider à atteindre vos objectifs de forme et de santé.",
        image: mobile4
    }
]


const PhoneCard = (Reveal, bg) => {
    return (
        <MotionBox
            h="80vh"
            w="100%"
            initial="hidden"
            whileInView="visible"
            display="flex"
            justifyContent="center"
            alignItems="center"
            variants={!Reveal ? revealFromRight : revealFromLeft}
            viewport={{ once: true, amount: 0.5 }}
            style={{ perspective: "1000px" }}
        >

            <Box
                position="relative"
                bg="black"
                borderRadius="40px"
                h="600px"
                w="300px"
                border="16px solid black"
                boxShadow="0 20px 30px rgba(0, 0, 0, 0.5)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                transform="rotateY(25deg) rotateX(5deg)"
                transition="transform 0.3s ease"
                _hover={{
                    transform: "rotateY(0deg) rotateX(0deg)",
                }}
            >

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

                <Box
                    bg="white"
                    w="260px"
                    h="520px"
                    borderRadius="30px"
                    overflow="hidden"
                    position="relative"
                >

                    <Image
                        src={bg}
                        alt="App Screen"
                        objectFit="cover"
                        w="100%"
                        h="100%"
                    />
                </Box>
            </Box>
        </MotionBox>
    )
}
const ContentCard = (Reveal, content1, content2) => {

    return (
        <MotionBox
            h="80vh"
            w="100%"

            align="center"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            initial="hidden"
            whileInView="visible"
            variants={!Reveal ? revealFromRight : revealFromLeft}
            viewport={{ once: true, amount: 0.5 }}

        >
            <Flex gap={5} direction="column" w="60%">
                <Heading color="green.500" fontSize={{ base: "xl", md: "2xl" }}
                >
                    {content1}
                </Heading>
                <Text color="gray.600" fontSize={{ base: "sm", md: "xl" }}>
                    {content2}
                </Text>
            </Flex>

        </MotionBox>
    )
}


const MobilePres = () => {
    return (
        <SimpleGrid
            overflow="hidden"
            mt={4}
            align="center"
            display={{ base: "none", md: "grid" }}
            columns={2}
            spacing={10}
            p={4}
        >
            {MobileContent.map((content, index) => (
                <Box key={index} >
                    {index % 2 === 0 ? PhoneCard(false, content.image) : ContentCard(true, content.title, content.description)}
                    {index % 2 === 0 ? ContentCard(true, content.title, content.description) : PhoneCard(false, content.image)}
                </Box>
            ))}


        </SimpleGrid>
    )
}

export default MobilePres


