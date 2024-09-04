import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Link,
  useToast,
  Divider,
  useColorModeValue,
  Image,
  Flex
  
} from '@chakra-ui/react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple } from 'react-icons/fa';

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
    >
   
      <Flex
        direction={{ base: 'column', md: 'row' }}
        width="100%"
        height="100%"
      >
         
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width={{ base: '100%', md: '50%' }}
          bg={useColorModeValue('gray.100', 'gray.700')}
          padding={8}
        >
       
        <Image src={logo} alt="logo" width={100}  top="0"
      left="0" 
         onClick={() => navigate('/')}  
        cursor={"pointer"}
        />
   
          <Heading mb={4} textAlign="center">
            Welcome Back!
          </Heading>
          <Text mb={6} textAlign="center">
            Don't have an account? Sign up now to get started.
          </Text>
          <Button
            colorScheme="yellow"
            onClick={() => navigate('/SignUp')}
          >
            Sign Up
          </Button>
        </Flex>

        {/* Right Column */}
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

              <Link color="blue.500" alignSelf="flex-end" to="/forgot-password">
                Forgot password?
              </Link>

              <Button
                colorScheme="yellow"
                width="full"
                onClick={handleSignIn}
              >
                Sign In
              </Button>

              <Divider />

              <Button
                leftIcon={<FaGoogle />}
                colorScheme="gray"
                variant="outline"
                width="full"
              >
                Continue with Google
              </Button>

              <Button
                leftIcon={<FaApple />}
                colorScheme="gray"
                variant="outline"
                width="full"
              >
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
