import React from 'react';
import { Box, FormControl, FormLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SignUpPage3 = () => {
  return (
    <Box display="flex" height="100vh" justifyContent="center" alignItems="center">
      <Box width="50%" padding="4">
        <Text fontSize="2xl" fontWeight="bold" mb="4">Créer un compte</Text>

        <FormControl mb="4">
          <FormLabel>Taille</FormLabel>
          <Slider defaultValue={170} min={100} max={250}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Poids Totale</FormLabel>
          <Slider defaultValue={80} min={30} max={200}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Masse Musculaire</FormLabel>
          <Slider defaultValue={17} min={0} max={100}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Masse de Graisse</FormLabel>
          <Slider defaultValue={17} min={0} max={100}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Pourcentage d'eau</FormLabel>
          <Slider defaultValue={25} min={0} max={100}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>

        <Link to="/sign-in-page">
          <Button colorScheme="teal" size="md">S'inscrire</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUpPage3;
