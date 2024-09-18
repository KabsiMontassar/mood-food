import { Box, Flex, Heading, Text, Link, Icon, Stack,Image } from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <Box bg="gray.50" py={10}>
      <Flex
        justify="space-between"
        wrap="wrap"
        maxW="1200px"
        mx="auto"
        px={6}
        flexDirection={{ base: "column", md: "row" }}
      >
       
        <Box
         flex="1" minW="200px" mb={{ base: 8, md: 0 }}>
          <Heading as="h1" fontSize="xl" color="red.500" mb={2}>
          <Box align="center"><Image src={logo} alt="Mero Doctor"
            boxSize={{ base: "60px", md: "70px" }} 
             
             /></Box>
            
          </Heading>
          <Text fontSize="sm" color="gray.600">
            The Mero Doctor app is the quickest and easiest way to book
            appointments and consult online with top doctors of Nepal.
          </Text>
        </Box>

        {/* Company Links */}
        <Box flex="1" minW="150px" mb={{ base: 8, md: 0 }}>
          <Heading as="h3" fontSize="lg" mb={4}>
            COMPANY
          </Heading>
          <Stack>
            <Link href="#" color="gray.600">
              Home
            </Link>
            <Link href="#" color="gray.600">
              FAQ's
            </Link>
          </Stack>
        </Box>

        {/* Quick Login */}
        <Box flex="1" minW="150px" mb={{ base: 8, md: 0 }}>
          <Heading as="h3" fontSize="lg" mb={4}>
            QUICK LOGIN
          </Heading>
          <Stack>
            <Link href="#" color="gray.600">
              Patient
            </Link>
            <Link href="#" color="gray.600">
              Partners
            </Link>
            <Link href="#" color="gray.600">
              Doctors
            </Link>
          </Stack>
        </Box>

        {/* Services */}
        <Box flex="1" minW="200px" mb={{ base: 8, md: 0 }}>
          <Heading as="h3" fontSize="lg" mb={4}>
            SERVICES
          </Heading>
          <Stack>
            <Link href="#" color="gray.600">
              Free Instant Consultation
            </Link>
            <Link href="#" color="gray.600">
              Specialist Video Consultation
            </Link>
            <Link href="#" color="gray.600">
              Book Hospital Appointment
            </Link>
          </Stack>
        </Box>

        {/* Get in Touch */}
        <Box flex="1" minW="200px">
          <Heading as="h3" fontSize="lg" mb={4}>
            GET IN TOUCH
          </Heading>
          <Stack spacing={2}>
            <Flex align="center" color="gray.600">
              <Icon as={MdLocationOn} mr={2} />
              <Text>Tunis Tunisia, 1002 </Text>
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
              <Text>foulen.foulen@gmail.com</Text>
            </Flex>
          </Stack>
          <Text mt={4}>Follow Us On:</Text>
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
      <Box textAlign="center" pt={8} fontSize="sm" color="gray.600">
     
      <Text>Terms & conditions | Privacy policy</Text>
      <Text>©2024 All rights reserved</Text>
      
      </Box>
    </Box>
  );
};

export default Footer;
