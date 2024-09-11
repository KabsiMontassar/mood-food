import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
  Flex,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  Stepper,
  Step,
  StepIndicator,
  StepTitle,
  StepDescription,
  StepSeparator,
  StepStatus,
  StepIcon,
  StepNumber,
  useSteps,
} from '@chakra-ui/stepper';
import logo from '../../assets/logo.png';
import imsignup from '../../assets/imsignup.png';




const steps = [
  { title: 'Contact Information', description: 'Enter your contact details' },
  { title: 'Personal Details', description: 'Enter your personal information' },
  { title: 'Physical Information', description: 'Provide physical measurements' },
];

const SignUpPage = ({ setIsUserSignedIn }) => {
  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthDate: '',
    address: '',
    height: 170,
    weight: 80,
    muscleMass: 17,
    fatMass: 17,
    waterPercentage: 25,
  });

  const toast = useToast();

  const handleSignUp = () => {
    toast({
      title: 'Signed up successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    goToNext();
  };

  const handleBack = () => {
    goToPrevious();
  };

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex="9999"
      backgroundColor="#FFFCF6"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <Flex direction={{ base: 'column', md: 'row' }} width="100%" height="100%" position="relative">
        {/* Left Section */}
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width={{ base: '100%', md: '50%' }}
          bg="gray.100"
          padding={8}
          position="relative"
        >
          {/* Background Image */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundImage={`url(${imsignup})`}
            backgroundSize="cover"
            backgroundPosition="center"
            opacity={0.5}
            zIndex={-1.1}
          />
          {/* Logo */}
          <Box position="absolute" top="8" left="8">
            <Image
              src={logo}
              alt="logo"
              width={50}
              cursor="pointer"
              onClick={() => navigate('/')}
            />
          </Box>
          <Heading mb={4} textAlign="center">Join Us!</Heading>
          <Text mb={6} textAlign="center">Already have an account? Sign in to continue.</Text>
          <Button colorScheme="green" onClick={() => navigate('/SignIn')}>
            Sign In
          </Button>
        </Flex>

        {/* Right Section */}
        <Flex direction="column" width={{ base: '100%', md: '50%' }} padding={8}>
          <Container maxW="container.sm">
            <Stack spacing={4}>
              <Heading textAlign="center" mb={4}>
                Create an Account
              </Heading>

              {/* Stepper placed horizontally under the heading */}
              <Flex direction="row" justifyContent="center" alignItems="center" mb={6}>
  <Stepper size="md" index={activeStep} orientation="horizontal">
    {steps.map((step, index) => (
      <Step key={index} onClick={() => setActiveStep(index)}>
        <StepIndicator>
          <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>

        {/* Add spacing between steps */}
        <Box flexShrink="0" mx={6} my={4}> {/* mx adds horizontal margin, my adds vertical margin */}
          <StepTitle mb={2}>{step.title}</StepTitle> {/* Added margin-bottom to the title */}
          <StepDescription>{step.description}</StepDescription> {/* The description now has space below the title */}
        </Box>

        <StepSeparator />
      </Step>
    ))}
  </Stepper>
</Flex>


              <Box>
                {activeStep === 0 && (
                  <>
                    <FormControl mb="4">
                      <FormLabel>Email</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Username</FormLabel>
                      <Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Phone</FormLabel>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <FormControl mb="4">
                      <FormLabel>Gender</FormLabel>
                      <Input
                        name="gender"
                        placeholder="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Birth Date</FormLabel>
                      <Input
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Address</FormLabel>
                      <Input
                        name="address"
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <FormControl>
                      <FormLabel>Height (cm)</FormLabel>
                      <Slider
                        aria-label="Height Slider"
                        defaultValue={formData.height}
                        min={100}
                        max={250}
                        step={1}
                        onChange={(value) =>
                          setFormData({ ...formData, height: value })
                        }
                        value={formData.height}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                        <SliderMark
                          value={formData.height}
                          mt="2"
                          ml="-2.5"
                          fontSize="sm"
                        >
                          {formData.height} cm
                        </SliderMark>
                      </Slider>
                    </FormControl>

                    <FormControl mt="4">
                      <FormLabel>Weight (kg)</FormLabel>
                      <Slider
                        aria-label="Weight Slider"
                        defaultValue={formData.weight}
                        min={30}
                        max={200}
                        step={1}
                        onChange={(value) =>
                          setFormData({ ...formData, weight: value })
                        }
                        value={formData.weight}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                        <SliderMark
                          value={formData.weight}
                          mt="2"
                          ml="-2.5"
                          fontSize="sm"
                        >
                          {formData.weight} kg
                        </SliderMark>
                      </Slider>
                    </FormControl>

                    <FormControl mt="4">
                      <FormLabel>Muscle Mass (%)</FormLabel>
                      <Slider
                        aria-label="Muscle Mass Slider"
                        defaultValue={formData.muscleMass}
                        min={0}
                        max={100}
                        step={1}
                        onChange={(value) =>
                          setFormData({ ...formData, muscleMass: value })
                        }
                        value={formData.muscleMass}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                        <SliderMark
                          value={formData.muscleMass}
                          mt="2"
                          ml="-2.5"
                          fontSize="sm"
                        >
                          {formData.muscleMass}%
                        </SliderMark>
                      </Slider>
                    </FormControl>

                    <FormControl mt="4">
                      <FormLabel>Fat Mass (%)</FormLabel>
                      <Slider
                        aria-label="Fat Mass Slider"
                        defaultValue={formData.fatMass}
                        min={0}
                        max={100}
                        step={1}
                        onChange={(value) =>
                          setFormData({ ...formData, fatMass: value })
                        }
                        value={formData.fatMass}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                        <SliderMark
                          value={formData.fatMass}
                          mt="2"
                          ml="-2.5"
                          fontSize="sm"
                        >
                          {formData.fatMass}%
                        </SliderMark>
                      </Slider>
                    </FormControl>

                    <FormControl mt="4">
                      <FormLabel>Water Percentage (%)</FormLabel>
                      <Slider
                        aria-label="Water Percentage Slider"
                        defaultValue={formData.waterPercentage}
                        min={0}
                        max={100}
                        step={1}
                        onChange={(value) =>
                          setFormData({ ...formData, waterPercentage: value })
                        }
                        value={formData.waterPercentage}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                        <SliderMark
                          value={formData.waterPercentage}
                          mt="2"
                          ml="-2.5"
                          fontSize="sm"
                        >
                          {formData.waterPercentage}%
                        </SliderMark>
                      </Slider>
                    </FormControl>
                  </>
                )}
              </Box>

              {/* Stepper Navigation */}
              <Stack direction="row" justifyContent="space-between">
                <Button onClick={handleBack} isDisabled={activeStep === 0}>
                  Back
                </Button>
                <Button
                  onClick={
                    activeStep === steps.length - 1
                      ? handleSignUp
                      : handleNext
                  }
                  colorScheme="green"
                >
                  {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
