import { Box, Flex, Heading, Text, Link, Icon, Stack,Image } from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <Box 
      pt={10}>
      <Flex
        justify="space-between"
        wrap="wrap"
        p={4}
        mx="auto"
         
        px={6}
        flexDirection={{ base: "column", md: "row" }}
      >
       
        <Box
         p={4}
        align={"center"}
         flex="1" minW="200px" mb={{ base: 8, md: 0 }}>
          <Heading as="h1" fontSize="xl" color="red.500" mb={2}>
          <Box mb={5}  align="center"><Image src={logo} alt="Mero Doctor"
            boxSize={{ base: "60px", md: "70px" }} 
             
             /></Box>
            
          </Heading>
          <Text  px={6}  textAlign={"center"} fontSize="sm" color="gray.600">
Mood & Food est une plateforme qui connecte les patients avec des experts. Nous proposons une consultation instantanée, ainsi qu'une consultation vidéo spécialisée.
          </Text>
        </Box>

    
        <Box flex="1" minW="150px" mb={{ base: 8, md: 0 }}>
          <Heading as="h3" fontSize="lg" mb={4}>
          Navigation
          </Heading>
          <Stack>
            <Link href="#" color="gray.600">
              Accueil
            </Link>
            <Link href="#" color="gray.600">
              Qui sommes-nous
            </Link>
            <Link href="#" color="gray.600">
              Contact
            </Link>
            <Link href="#" color="gray.600">
            À propos
            </Link>
            <Link href="#" color="gray.600">
              FAQ's
            </Link>
          </Stack>
        </Box>

     
        <Box flex="1" minW="200px" mb={{ base: 8, md: 0 }}>
          <Heading as="h3" fontSize="lg" mb={4}>
            Services
          </Heading>
          <Stack>
            <Link href="#" color="gray.600">
              Réserver une consultation
            </Link>
            <Link href="#" color="gray.600">
              Consulter nos Recettes saines
            </Link>
            <Link href="#" color="gray.600">
              Consulter nos produits
            </Link>
          </Stack>
        </Box>

        {/* Get in Touch */}
        <Box flex="1" minW="200px">
          <Heading as="h3" fontSize="lg" mb={4}>
           Mieux nous connaitre
          </Heading>
          <Stack spacing={2}>
            <Flex align="center" color="gray.600">
              <Icon as={MdLocationOn} mr={2} />
              <Text>Tunis Tunisia, 1002</Text>
            </Flex>
            <Flex align="center" color="gray.600">
              <Icon as={MdPhone} mr={2} />
              <Text>123456611, +216 123456611</Text>
            </Flex>
            <Flex align="center" color="gray.600">
              <Icon as={MdPhone} mr={2} />
              <Text>+216 123456611</Text>
            </Flex>
            <Flex align="center" color="gray.600">
              <Icon as={MdEmail} mr={2} />
              <Text>MoodandFood@gmail.com </Text>
            </Flex>
          </Stack>
          <Text mt={4}>Suivez-nous sur:</Text>
          <Flex mt={2}>
            <Link href="#" mr={4}>
              <Icon as={FaFacebookF} color="gray.600" boxSize={5} />
            </Link>
            <Link href="#">
              <Icon as={FaInstagram} color="gray.600" boxSize={5} />
            </Link>
            <Link href="#" ml={4}>
              <Icon as={FaYoutube} color="gray.600" boxSize={5} />
            </Link>
          </Flex>
        </Box>
      </Flex>

      {/* Footer Bottom */}
      <Box  bg="#38A169"  textAlign="center" pt={4} pb={3} fontSize="xs" color="white">
     
      <Text>Conditions générales | Politique de confidentialité</Text>
      <Text>©2024 Tous droits réservés</Text>
      
      </Box>
    </Box>
  );
};

export default Footer;
