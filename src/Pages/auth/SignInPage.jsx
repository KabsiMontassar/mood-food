import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Box,
  useBreakpointValue,
} from '@chakra-ui/react';

const SignInPage = () => {
  // Use Chakra's responsive value function for padding
  const containerPadding = useBreakpointValue({ base: 4, sm: 6, md: 8 });
  const containerWidth = useBreakpointValue({ base: "100%", sm: "xs", md: "md", lg: "lg" });

  return (
    <Flex
      direction="column"
      w={containerWidth}
      p={containerPadding}
      borderRadius="md"
     
      alignItems="center"  // Center items horizontally
      mx="auto"  // Center container horizontally
    >
      <Flex direction="column" gap={4} w="100%">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            borderColor="black"
            borderRadius={0}
            borderWidth="0"
            borderBottom="1px"
            placeholder="Email"
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
          />
        </FormControl>
      </Flex>
      <Flex
        direction={{ base: 'column', sm: 'row' }}  // Stack vertically on small screens, horizontally on larger screens
        justifyContent="space-between"
        mt={8}
        w="100%"
      >
        <Button
          borderColor="#5EDABC"
          color="gray.400"
          variant="link"
          onClick={() => alert('Mot de passe oublié')}
          mb={{ base: 2, sm: 0 }}  // Margin bottom for small screens only
        >
          Mot de passe oublié ?
        </Button>

        <Button
          borderColor="#5EDABC"
          color="#5EDABC"
          variant="outline"
          onClick={() => alert('Inscription réussie')}
        >
          Se connecter
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignInPage;
