import React from 'react';
import { Box, FormControl, FormLabel, Input, Select, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SignUpPage2 = () => {
  return (
    <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
      <Box width="50%" padding="4">
        <Text fontSize="2xl" fontWeight="bold" mb="4">Créer un compte</Text>
        
        <FormControl mb="4">
          <FormLabel>Genre</FormLabel>
          <Select placeholder="Sélectionner le genre">
            <option>Homme</option>
            <option>Femme</option>
            <option>Autre</option>
          </Select>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Date de naissance</FormLabel>
          <Input type="date" />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Adresse</FormLabel>
          <Input type="text" placeholder="Adresse" />
        </FormControl>

        <Link to="/signup-page-3">
          <Button colorScheme="teal" size="md">Suivant</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpPage2;
