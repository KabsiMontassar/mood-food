import React, { useState } from 'react';
import {
  Flex,
  Button,
  Input,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  FormControl,
  FormLabel,
  Box,
} from '@chakra-ui/react';

const SignUpPage = () => {
  const [step, setStep] = useState(1); 
  const [tailleValue, setTailleValue] = useState(170);
  const [poidsValue, setPoidsValue] = useState(70);
  const [musculaireValue, setMusculaireValue] = useState(40);
  const [graisseValue, setGraisseValue] = useState(20);
  const [eauValue, setEauValue] = useState(50);
  
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Flex direction="column" w={{ base: "100%", sm: "xs", md: "xl" }} p={4} borderRadius={8}>
      {step === 1 && (
        <Flex direction="column" gap={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              borderColor={"black"}
              borderRadius={0}
              borderWidth="0"
              borderBottom="1px"
              placeholder="Email"
            />
          </FormControl>

          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <FormControl borderColor={"black"}>
              <FormLabel>Username</FormLabel>
              <Input
                borderColor={"black"}
                borderRadius={0}
                borderWidth="0"
                borderBottom="1px"
                placeholder="Nom d'utilisateur"
              />
            </FormControl>
            <FormControl borderColor={"black"}>
              <FormLabel>Numéro de téléphone</FormLabel>
              <Input
                borderColor={"black"}
                borderRadius={0}
                borderWidth="0"
                borderBottom="1px"
                placeholder="Numéro de téléphone"
              />
            </FormControl>
          </Flex>

          <FormControl borderColor={"black"}>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              borderColor={"black"}
              borderRadius={0}
              borderWidth="0"
              borderBottom="1px"
              type="password"
              placeholder="Mot de passe"
            />
          </FormControl>

          <FormControl borderColor={"black"}>
            <FormLabel>Confirmer mot de passe</FormLabel>
            <Input
              borderColor={"black"}
              borderRadius={0}
              borderWidth="0"
              borderBottom="1px"
              type="password"
              placeholder="Confirmer mot de passe"
            />
          </FormControl>
        </Flex>
      )}

      {step === 2 && (
        <Flex direction="column" gap={4} w={{ base: "100%", sm: "xs", md: "xl" }}>
          <FormControl>
            <FormLabel>Genre</FormLabel>
            <Select
              borderColor={"black"}
              borderRadius={0}
              borderWidth="0"
              borderBottom="1px"
              placeholder="Sélectionnez votre genre"
            >
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="autre">Autre</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Date de naissance</FormLabel>
            <Input
              borderColor={"black"}
              borderRadius={0}
              borderWidth="0"
              borderBottom="1px"
              type="date"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Adresse</FormLabel>
            <Input
              borderColor={"black"}
              borderRadius={0}
              borderWidth="0"
              borderBottom="1px"
              placeholder="Adresse"
            />
          </FormControl>
        </Flex>
      )}

      {step === 3 && (
        <Flex direction="column" gap={6}>
          <Box>
            <FormLabel>Taille (cm) {tailleValue}</FormLabel>
            <RangeSlider
              onChange={(val) => setTailleValue(val)}
              colorScheme="teal"
              defaultValue={[170]}
              min={100}
              max={250}
              step={1}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>

          <Box>
            <FormLabel>Poids (kg) {poidsValue}</FormLabel>
            <RangeSlider
              onChange={(val) => setPoidsValue(val)}
              colorScheme="teal"
              defaultValue={[70]}
              min={30}
              max={200}
              step={1}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>

          <Box>
            <FormLabel>Masse musculaire (%) {musculaireValue}</FormLabel>
            <RangeSlider
              onChange={(val) => setMusculaireValue(val)}
              colorScheme="teal"
              defaultValue={[40]}
              min={0}
              max={100}
              step={1}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>

          <Box>
            <FormLabel>Masse de graisse (%) {graisseValue}</FormLabel>
            <RangeSlider
              onChange={(val) => setGraisseValue(val)}
              colorScheme="teal"
              defaultValue={[20]}
              min={0}
              max={100}
              step={1}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>

          <Box>
            <FormLabel>Pourcentage d'eau (%) {eauValue}</FormLabel>
            <RangeSlider
              onChange={(val) => setEauValue(val)}
              colorScheme="teal"
              defaultValue={[50]}
              min={0}
              max={100}
              step={1}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
        </Flex>
      )}

      <Flex justifyContent="space-between" mt={8}>
        {step > 1 && (
          <Button colorScheme="gray" onClick={prevStep}>
            Retour
          </Button>
        )}
        {step < 3 && (
          <Button borderColor={"#5EDABC"} color={"#5EDABC"} variant={"outline"} onClick={nextStep}>
            Suivant
          </Button>
        )}
        {step === 3 && (
          <Button
            borderColor={"#5EDABC"}
            color={"#5EDABC"}
            variant={"outline"}
            onClick={() => alert('Inscription réussie !')}
          >
            S'inscrire
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
