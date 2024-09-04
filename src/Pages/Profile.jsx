import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Text,
  Stack,
  useToast,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Image,
  Select,
  VStack,
  HStack,
  Heading,
  Avatar,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import zxcvbn from "zxcvbn";
import { CloseIcon } from "@chakra-ui/icons";


const Profile = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    tel: "",
    adresse: "",
    height: 170,
    weight: 70,
    age: 25,
    profileImage: null,
    physicalActivity: "",
    dietaryPreferences: "",
    medicalConditions: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "password") {
        const result = zxcvbn(value);
        setPasswordStrength(result.score);
      }
    }
  };

  const handleSliderChange = (name) => (value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Nom is required";
    if (!formData.prenom) newErrors.prenom = "Prenom is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.tel) newErrors.tel = "Phone number is required";
    else if (!/^\d{8}$/.test(formData.tel))
      newErrors.tel = "Phone number must be 8 digits";
    if (!formData.adresse) newErrors.adresse = "Address is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form data:", formData);
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "Weak";
      case 1:
        return "Fair";
      case 2:
        return "Good";
      case 3:
        return "Strong";
      default:
        return "";
    }
  };

  const getProgressColor = () => {
    switch (passwordStrength) {
      case 0:
        return "red.500";
      case 1:
        return "yellow.500";
      case 2:
        return "blue.500";
      case 3:
        return "green.500";
      default:
        return "gray.200";
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg" shadow="lg" bg="white">
      <VStack spacing={5}>
        <HStack width="full" justifyContent="space-between">
          <Heading size="lg">Edit Profile</Heading>
          <IconButton
            aria-label="Edit Profile"
            icon={<FaUserEdit />}
            size="lg"
            colorScheme="teal"
          />
        </HStack>
        <Divider />

        <Avatar
          size="xl"
          src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : ""}
          name={`${formData.prenom} ${formData.nom}`}
        />

<FormControl>
  <FormLabel>Profile Image</FormLabel>
  <HStack spacing={4}>
    <Button
      as="label"
      htmlFor="file-upload"
      bg="teal.500"
      color="white"
      _hover={{ bg: "teal.600" }}
      cursor="pointer"
      px={4}
      py={2}
      borderRadius="md"
    >
      Choose File
    </Button>
    <Input
      id="file-upload"
      type="file"
      accept="image/*"
      name="profileImage"
      onChange={handleChange}
      display="none"
    />
    {formData.profileImage && (
      <Box position="relative" display="inline-block">
        <Image
          boxSize="150px"
          objectFit="cover"
          src={URL.createObjectURL(formData.profileImage)}
          alt="Profile Image"
          borderRadius="md"
        />
        <Button
          size="xs"
          colorScheme="red"
          position="absolute"
          top="-2"
          right="-2"
          borderRadius="full"
          onClick={() => setFormData({ ...formData, profileImage: null })}
        >
          <CloseIcon boxSize={3} />
        </Button>
      </Box>
    )}
  </HStack>
</FormControl>

        <HStack spacing={4} width="full">
          <FormControl isInvalid={errors.nom}>
            <FormLabel>Nom</FormLabel>
            <Input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              focusBorderColor="teal.400"
            />
            <FormErrorMessage>{errors.nom}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.prenom}>
            <FormLabel>Prenom</FormLabel>
            <Input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              focusBorderColor="teal.400"
            />
            <FormErrorMessage>{errors.prenom}</FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            focusBorderColor="teal.400"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            focusBorderColor="teal.400"
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
          <Box mt="2">
            <Text mb="1" fontSize="sm" color={getProgressColor()}>
              Password Strength: {getPasswordStrengthText()}
            </Text>
            <Progress
              value={(passwordStrength + 1) * 25}
              colorScheme={getProgressColor()}
              height="6px"
            />
          </Box>
        </FormControl>

        <HStack spacing={4} width="full">
          <FormControl>
            <FormLabel>Age</FormLabel>
            <Slider
              defaultValue={formData.age}
              min={0}
              max={120}
              step={1}
              onChange={handleSliderChange("age")}
              value={formData.age}
              focusThumbOnChange={false}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
              <SliderMark value={formData.age} mt="2" ml="-2.5" fontSize="sm">
                {formData.age} years
              </SliderMark>
            </Slider>
          </FormControl>

          <FormControl>
            <FormLabel>Height (cm)</FormLabel>
            <Slider
              defaultValue={formData.height}
              min={100}
              max={250}
              step={1}
              onChange={handleSliderChange("height")}
              value={formData.height}
              focusThumbOnChange={false}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
              <SliderMark value={formData.height} mt="2" ml="-2.5" fontSize="sm">
                {formData.height} cm
              </SliderMark>
            </Slider>
          </FormControl>

          <FormControl>
            <FormLabel>Weight (kg)</FormLabel>
            <Slider
              defaultValue={formData.weight}
              min={30}
              max={200}
              step={1}
              onChange={handleSliderChange("weight")}
              value={formData.weight}
              focusThumbOnChange={false}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
              <SliderMark value={formData.weight} mt="2" ml="-2.5" fontSize="sm">
                {formData.weight} kg
              </SliderMark>
            </Slider>
          </FormControl>
        </HStack>
        <FormControl>
          <FormLabel>Physical Activity Level</FormLabel>
          <Select
            name="physicalActivity"
            value={formData.physicalActivity}
            onChange={handleChange}
            focusBorderColor="teal.400"
            placeholder="Select activity level"
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Dietary Preferences</FormLabel>
          <Select
            name="dietaryPreferences"
            value={formData.dietaryPreferences}
            onChange={handleChange}
            focusBorderColor="teal.400"
            placeholder="Select dietary preference"
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="glutenFree">Gluten-Free</option>
            <option value="paleo">Paleo</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Medical Conditions</FormLabel>
          <Select
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleChange}
            focusBorderColor="teal.400"
            placeholder="Select medical condition"
          >
            <option value="diabetes">Diabetes</option>
            <option value="hypertension">Hypertension</option>
            <option value="heartDisease">Heart Disease</option>
            <option value="none">None</option>
          </Select>
        </FormControl>

        <FormControl isInvalid={errors.tel}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            focusBorderColor="teal.400"
            placeholder="e.g., 12345678"
          />
          <FormErrorMessage>{errors.tel}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.adresse}>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            focusBorderColor="teal.400"
            placeholder="e.g., 123 Main St, City, Country"
          />
          <FormErrorMessage>{errors.adresse}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          mt={4}
          size="lg"
          _hover={{ bg: "teal.600" }}
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;
