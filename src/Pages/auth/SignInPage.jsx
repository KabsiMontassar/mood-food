// src/Pages/auth/SignInPage.jsx

import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { useNavigate } from 'react-router-dom';  // Assuming you are using react-router for navigation

const SignInPage = () => {
  const [email, setEmail] = useState('');  // State to hold email input
  const [password, setPassword] = useState('');  // State to hold password input
  const [error, setError] = useState(null);  // State to hold error messages

  // Responsive design settings
  const containerPadding = useBreakpointValue({ base: 4, sm: 6, md: 8 });
  const containerWidth = useBreakpointValue({ base: "100%", sm: "xs", md: "md", lg: "lg" });

  const auth = getAuth();  // Get Firebase authentication instance
  const navigate = useNavigate();  // Hook to programmatically navigate after login

  // Function to handle sign in
  const handleSignIn = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);  // Set session persistence
      const userCredential = await signInWithEmailAndPassword(auth, email, password);  // Sign in the user
      navigate('/');  // Navigate to home or another page upon successful login
    } catch (error) {
      setError(error.message);  // Set error message on failure
    }
  };

  return (
    <Flex
      direction="column"
      w={containerWidth}
      p={containerPadding}
      borderRadius="md"
      alignItems="center"
      mx="auto"
    >
      {error && <Text color="red.500" mb={4}>{error}</Text>} {/* Display any sign-in errors */}

      <Flex direction="column" gap={4} w="100%">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            borderColor="black"
            borderRadius={0}
            borderWidth="0"
            borderBottom="1px"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Update email state on change
          />
        </FormControl>

        <FormControl>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            borderColor="black"
            borderRadius={0}
            borderWidth="0"
            borderBottom="1px"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Update password state on change
          />
        </FormControl>
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justifyContent="space-between"
        mt={8}
        w="100%"
      >
        <Button
          borderColor="#5EDABC"
          color="gray.400"
          variant="link"
          onClick={() => alert('Mot de passe oublié')}  // Placeholder for password recovery functionality
          mb={{ base: 2, sm: 0 }}
        >
          Mot de passe oublié ?
        </Button>

        <Button
          borderColor="#5EDABC"
          color="#5EDABC"
          border="1px"
          variant="outline"
          onClick={handleSignIn}  // Call handleSignIn on button click
        >
          Se connecter
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignInPage;
