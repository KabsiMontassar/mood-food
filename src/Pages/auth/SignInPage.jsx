import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Text,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSentCount, setResetSentCount] = useState(0); // State to count password reset emails
  const [isResetting, setIsResetting] = useState(false); // Modal state for password reset
  const toast = useToast();

  const containerPadding = useBreakpointValue({ base: 4, sm: 6, md: 8 });
  const containerWidth = useBreakpointValue({ base: "100%", sm: "xs", md: "md", lg: "lg" });

  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (resetSentCount >= 3) {
      toast({
        title: "Limit Reached",
        description: "You can only send a password reset email three times per day.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: "Email Sent",
        description: "Password reset email sent successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setResetSentCount((prevCount) => prevCount + 1); // Increment the reset email count
      setIsResetting(false); // Close the modal
      setResetEmail(''); // Clear the input
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
      {error && <Text color="red.500" mb={4}>{error}</Text>}

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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
          onClick={() => setIsResetting(true)} // Open modal for password recovery
          mb={{ base: 2, sm: 0 }}
        >
          Mot de passe oublié ?
        </Button>

        <Button
          borderColor="#5EDABC"
          color="#5EDABC"
          border="1px"
          variant="outline"
          onClick={handleSignIn}
        >
          Se connecter
        </Button>
      </Flex>

      {/* Password Reset Modal */}
      <Modal isOpen={isResetting} onClose={() => setIsResetting(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Réinitialiser le mot de passe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                borderColor="black"
                borderRadius={0}
                borderWidth="0"
                borderBottom="1px"
                placeholder="Entrez votre email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button  colorScheme="green" onClick={handleResetPassword}>
              Envoyer l'email de réinitialisation
            </Button>
            <Button variant="ghost" colorScheme='green' onClick={() => setIsResetting(false)}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default SignInPage;
