import React from 'react';
import { Box, Container, Flex, Link, Text, Icon, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  // Define responsive font sizes based on the viewport width
  const fontSize = useBreakpointValue({
    base: 'sm',
    md: 'md',
    lg: 'lg',
  });

  return (
    <Box
      as="footer"
      bg={useColorModeValue('#FFFCF6', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      py={{ base: 4, md: 6 }}
    >
      <Container maxW="container.lg">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          rowGap={{ base: 4, md: 6 }}
        >
          <Link
            href="/"
            fontSize={{ base: '2xl', md: '3xl' }} // Adjust font sizes based on screen size
            fontWeight="bold"
          >
            Mood & Food
          </Link>

          <Flex
            direction={{ base: 'column', md: 'row' }} // Stack links vertically on small screens
            align="center"
            justify="center"
            wrap="wrap"
            gap={4}
          >
            <Link href="/Propos" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
              À propos
            </Link>
            <Link href="/FAQ" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
              FAQ
            </Link>
            <Link href="/Contact" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>
              Contactez-nous
            </Link>
          </Flex>

          <Flex
            direction="row"
            align="center"
            justify="center"
            gap={4}
          >
            <Link href="https://www.facebook.com/" isExternal fontSize={{ base: 'lg', md: '2xl' }} _hover={{ transform: 'translateY(-0.25rem)' }}>
              <Icon as={FaFacebookF} />
            </Link>
            <Link href="https://www.instagram.com/" isExternal fontSize={{ base: 'lg', md: '2xl' }} _hover={{ transform: 'translateY(-0.25rem)' }}>
              <Icon as={FaInstagram} />
            </Link>
            <Link href="https://twitter.com/" isExternal fontSize={{ base: 'lg', md: '2xl' }} _hover={{ transform: 'translateY(-0.25rem)' }}>
              <Icon as={FaTwitter} />
            </Link>
            <Link href="https://www.linkedin.com/" isExternal fontSize={{ base: 'lg', md: '2xl' }} _hover={{ transform: 'translateY(-0.25rem)' }}>
              <Icon as={FaLinkedinIn} />
            </Link>
          </Flex>
        </Flex>

        <Flex
          justify="center"
          mt={{ base: 4, md: 6 }}
        >
          <Text
            fontSize={fontSize}
            fontWeight="medium"
            textAlign="center"
          >
            &#169; Mood & Food 2024. Tous droits réservés.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
