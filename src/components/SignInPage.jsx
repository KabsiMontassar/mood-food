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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple } from 'react-icons/fa';

const SignInPage = ({setIsUserSignedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignIn = () => {
    localStorage.setItem('isUserSignedIn', true);
    setIsUserSignedIn(true)
    // Handle sign-in logic here (e.g., API call)
    toast({
      title: 'Signed in successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigate('/'); // Redirect to home page or any other page after sign-in
  };

  return (
    <Container maxW="sm" mt={10}>
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

        <Text textAlign="center">
          Don't have an account? <Link color="blue.500" to="/SignUp">Sign Up</Link>
        </Text>
      </Stack>
    </Container>
  );
};

export default SignInPage;
