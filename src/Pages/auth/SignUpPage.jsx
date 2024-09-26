// src/SignUpPage.js

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
  Text,
  useToast,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';  // Make sure to import auth and db correctly
import { useAuth } from './AuthContext';

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');

  const [tailleValue, setTailleValue] = useState(170);
  const [poidsValue, setPoidsValue] = useState(70);
  const [musculaireValue, setMusculaireValue] = useState(40);
  const [graisseValue, setGraisseValue] = useState(20);
  const [eauValue, setEauValue] = useState(50);

  const { signIn } = useAuth();
  const toast = useToast();

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

  const handleSignUp = async () => {
    setError(null); 

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        username,
        phone,
        gender,
        birthDate,
        role: 'Client',
        address,
        taille: tailleValue,
        poids: poidsValue,
        masseMusculaire: musculaireValue,
        masseGraisse: graisseValue,
        eau: eauValue,
      });

      signIn();

      toast({
        title: "Inscription réussie",
        description: "Utilisateur enregistré avec succès dans Firestore.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Optionally navigate to a different page after successful sign-up
      // navigate('/some-path'); // Import `useNavigate` from `react-router-dom` if you need navigation
    } catch (err) {
      setError(err.message);
      toast({
        title: "Erreur d'inscription",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" w={{ base: "100%", sm: "xs", md: "xl" }} p={4} borderRadius={8}>
      {error && <Text color="red.500" mb={4}>{error}</Text>} {/* Display any errors */}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
            <FormControl>
              <FormLabel>Nom d'utilisateur</FormLabel>
              <Input
                borderColor={"black"}
                borderRadius={0}
                borderWidth="0"
                borderBottom="1px"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Numéro de téléphone</FormLabel>
              <Input
                borderColor={"black"}
                borderRadius={0}
                borderWidth="0"
                borderBottom="1px"
                placeholder="Numéro de téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel>Mot de passe</FormLabel>
            <Input
              borderColor={"black"}
              borderRadius={0}
              borderWidth="0"
              borderBottom="1px"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Confirmer mot de passe</FormLabel>
            <Input
              borderColor={"black"}
              borderRadius={0}
              borderWidth="0"
              borderBottom="1px"
              type="password"
              placeholder="Confirmer mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
        </Flex>
      )}

      {step === 3 && (
        <Flex direction="column" gap={6}>
          <Box>
            <FormLabel>Taille (cm) {tailleValue}</FormLabel>
            <RangeSlider
              onChange={(val) => setTailleValue(val[0])}
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
              onChange={(val) => setPoidsValue(val[0])}
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
              onChange={(val) => setMusculaireValue(val[0])}
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
              onChange={(val) => setGraisseValue(val[0])}
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
              onChange={(val) => setEauValue(val[0])}
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
            onClick={handleSignUp}
          >
            S'inscrire
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
