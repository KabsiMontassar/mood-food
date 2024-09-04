import React from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SignUpPage1 = () => {
  return (
    <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
      <Box width="50%" padding="4">
        <Text fontSize="2xl" fontWeight="bold" mb="4">Créer un compte</Text>

        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Email" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Nom d'utilisateur</FormLabel>
          <Input type="text" placeholder="Nom d'utilisateur" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Numéro de téléphone</FormLabel>
          <Input type="tel" placeholder="Numéro de téléphone" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Mot de passe</FormLabel>
          <Input type="password" placeholder="Mot de passe" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Confirmer le mot de passe</FormLabel>
          <Input type="password" placeholder="Confirmer le mot de passe" />
        </FormControl>

        <Link to="/signup-page-2">
          <Button colorScheme="teal" size="md">Suivant</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpPage1;
