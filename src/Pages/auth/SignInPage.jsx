import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
  Divider,
  useColorModeValue,
  Flex,
  Image,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink
import { FaGoogle, FaApple } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import imsignin from '../../assets/imsignin.png';



const SignInPage = ({ setIsUserSignedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignIn = () => {
    localStorage.setItem('isUserSignedIn', true);
    setIsUserSignedIn(true);
    toast({
      title: 'Signed in successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigate('/'); // Redirect to home page or any other page after sign-in
  };

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="9999"
      backgroundColor={useColorModeValue('#FFFCF6', '#1A202C')}
      justifyContent="center"
      alignItems="center"
      overflow="hidden" // Ensures no scrollbars are visible
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="100%"
        height="100%"
        position="relative" // Allows absolute positioning of logo
      >
        {/* Left Section */}
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width={{ base: '100%', md: '50%' }}
          bg={useColorModeValue('gray.100', 'gray.700')}
          padding={8}
          position="relative"
        >
          {/* Background Image */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundImage={`url(${imsignin})`}
            backgroundSize="cover"
            backgroundPosition="center"
            opacity={0.5} // Adjust this value for transparency
            zIndex={-1.1} // Make sure the image is behind the content
          />
          {/* Logo */}
          <Box position="absolute" top="8" left="8">
            <Image
              src={logo}
              alt="logo"
              width={50}
              cursor="pointer"
              onClick={() => navigate('/')}
            />
          </Box>
          <Heading mb={4} textAlign="center">
            Welcome Back!
          </Heading>
          <Text mb={6} textAlign="center">
            Don't have an account? Sign up now to get started.
          </Text>
          <Button colorScheme="yellow" onClick={() => navigate('/SignUp')}>
            Sign Up
          </Button>
        </Flex>

        {/* Right Section */}
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width={{ base: '100%', md: '50%' }}
          padding={8}
        >
          <Container maxW="sm">
            <Stack spacing={4}>
              <Heading textAlign="center">Sign In</Heading>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Box alignSelf="flex-end">
                <NavLink to="/forgot-password" style={{ color: 'blue', textDecoration: 'none' }}>
                  Forgot password?
                </NavLink>
              </Box>

              <Button colorScheme="yellow" width="full" onClick={handleSignIn}>
                Sign In
              </Button>

              <Divider />

              <Button leftIcon={<FaGoogle />} colorScheme="gray" variant="outline" width="full">
                Continue with Google
              </Button>

              <Button leftIcon={<FaApple />} colorScheme="gray" variant="outline" width="full">
                Continue with Apple
              </Button>
            </Stack>
          </Container>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignInPage;
