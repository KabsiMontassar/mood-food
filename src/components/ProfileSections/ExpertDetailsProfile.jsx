import { useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Select,
  HStack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  Switch,
  Flex,
  Heading,
  Link,
  AspectRatio,
} from '@chakra-ui/react';

const ExpertDetailsProfile = () => {
  // Initial state for the form fields
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('foulen@fouleni.com');
  const [address, setAddress] = useState('Avenue Habib Bourguiba, Tunis, Tunisia');
  const [gender, setGender] = useState('female');
  const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');
  const [speciality, setSpeciality] = useState('Nutritionist');
  const [phoneNumbers, setPhoneNumbers] = useState(['123456789']);
  const [experience, setExperience] = useState([{ title: 'Nutritionist', years: '5' }]);

  const [scheduleDays, setScheduleDays] = useState([
    { day: 'Monday', from: 8, to: 17, enabled: false },
    { day: 'Tuesday', from: 8, to: 17, enabled: false },
    { day: 'Wednesday', from: 8, to: 17, enabled: false },
    { day: 'Thursday', from: 8, to: 17, enabled: false },
    { day: 'Friday', from: 8, to: 17, enabled: false },
    { day: 'Saturday', from: 8, to: 17, enabled: false },
    { day: 'Sunday', from: 8, to: 17, enabled: false },
  ]);

  const [location, setLocation] = useState({
    address: 'Avenue Habib Bourguiba, Tunis, Tunisia',
    coordinates: { lat: 36.8065, lng: 10.1815 },
  });

  // Handle changes in schedule days
  const handleDayChange = (index, field, value) => {
    const newSchedule = [...scheduleDays];
    newSchedule[index][field] = value;
    setScheduleDays(newSchedule);
  };

  // Handle enabling/disabling a day's working hours
  const toggleDay = (index) => {
    const newSchedule = [...scheduleDays];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    setScheduleDays(newSchedule);
  };

  return (
    <Box mx="auto" mt={10}>
      <Heading color="#38B2AC" textAlign="center" mb={6} fontSize={{ base: '2xl', md: '4xl' }}>
        Expert Profile Details
      </Heading>

      {/* Layout with Side Links and Forms */}
      <Flex position="relative" scrollBehavior="smooth" >
        {/* Left side: Links */}
        <div style={{ position: 'sticky', top: '10px' }} >
          <Box
            as="nav"
            w="200px"
            borderRight="1px solid #E2E8F0"
            h="calc(100vh - 80px)"
            position="sticky"
            top={10}
            mr={10}
            display={{ base: 'none', md: 'block' }}
          >
            <VStack

              spacing={4} align="start" color="#38B2AC">
              <Link href="#edit-info" fontWeight="bold">Edit Information</Link>
              <Link href="#edit-contact" fontWeight="bold">Edit Contact Numbers</Link>
              <Link href="#edit-experience" fontWeight="bold">Edit Experience</Link>
              <Link href="#edit-hours" fontWeight="bold">Edit Working Hours</Link>
              <Link href="#edit-location" fontWeight="bold">Edit Location</Link>
            </VStack>
          </Box>
        </div>
        {/* Right side: Forms */}
        <Box

          flex={1} maxW="900px" >
          {/* Edit Information Section */}
          <Box id="edit-info" boxShadow={{ base: 'none', md: 'md' }}
           p={6} mb={10} borderRadius="lg" bg="white">
            <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Information</Heading>
            <VStack spacing={4}>
            <Flex flexDirection={{ base: 'column', md: 'row' }} gap={5} w="full" justifyContent="space-between">
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  borderRadius="md"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  borderRadius="md"
                />
              </FormControl>
              </Flex>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  borderRadius="md"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  borderRadius="md"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Speciality</FormLabel>
                <Input
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  borderRadius="md"
                />
              </FormControl>
            </VStack>
          </Box>

          {/* Edit Contact Numbers Section */}
          <Box id="edit-contact" boxShadow={{ base: 'none', md: 'md' }}
           p={6} mb={10} borderRadius="lg" bg="white">
            <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Contact Numbers</Heading>
            <VStack spacing={4}>
              {phoneNumbers.map((number, index) => (
                <FormControl key={index}>
                  <FormLabel>Phone Number {index + 1}</FormLabel>
                  <Input
                    value={number}
                    onChange={(e) => {
                      const newPhoneNumbers = [...phoneNumbers];
                      newPhoneNumbers[index] = e.target.value;
                      setPhoneNumbers(newPhoneNumbers);
                    }}
                    placeholder="Enter phone number"
                    borderRadius="md"
                  />
                </FormControl>
              ))}
              <Button
                onClick={() => setPhoneNumbers([...phoneNumbers, ''])}
                colorScheme="gray"
                w="100%"
                bg="white"
                border="1px solid #DDDDDD"
              >
                +
              </Button>
            </VStack>
          </Box>

          {/* Edit Experience Section */}
          <Box id="edit-experience" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
            <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Experience</Heading>
            <VStack spacing={4}>
              {experience.map((exp, index) => (
                <HStack key={index} spacing={4} w="full">
                  <FormControl>
                    <FormLabel>Job Title</FormLabel>
                    <Input
                      value={exp.title}
                      onChange={(e) => {
                        const newExperience = [...experience];
                        newExperience[index].title = e.target.value;
                        setExperience(newExperience);
                      }}
                      placeholder="Enter job title"

                      borderRadius="md"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Years</FormLabel>
                    <Input
                      value={exp.years}
                      onChange={(e) => {
                        const newExperience = [...experience];
                        newExperience[index].years = e.target.value;
                        setExperience(newExperience);
                      }}
                      placeholder="Years of experience"

                      borderRadius="md"
                    />
                  </FormControl>
                </HStack>
              ))}
              <Button
                onClick={() => setExperience([...experience, { title: '', years: '' }])}
                colorScheme="gray"
                w="100%"
                border="1px solid #DDDDDD"
                bg="white"
              >
                +
              </Button>
            </VStack>
          </Box>

          {/* Edit Working Hours Section */}
          <Box id="edit-hours" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
            <Heading  color="#0A7342" fontSize="xl" mb={4}>Edit Working Hours</Heading>
            <VStack spacing={6} w="full">
              {scheduleDays.map((schedule, index) => (
                <HStack key={index} spacing={6} w="full">
                  <Switch
                    size="lg"
                    colorScheme="green"
                    isChecked={schedule.enabled}
                    onChange={() => toggleDay(index)}
                  />
                  <Text w="100px">{schedule.day}</Text>
                  <RangeSlider
                    colorScheme="green"
                    defaultValue={[schedule.from, schedule.to]}
                    min={0}
                    max={24}
                    step={1}
                    onChangeEnd={(val) => {
                      handleDayChange(index, 'from', val[0]);
                      handleDayChange(index, 'to', val[1]);
                    }}
                    isDisabled={!schedule.enabled}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0} />
                    <RangeSliderThumb boxSize={6} index={1} />
                  </RangeSlider>
                  <Text>{schedule.from}:00 - {schedule.to}:00</Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Edit Location Section */}
          <Box id="edit-location" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
            <Heading  color="#0A7342" fontSize="xl" mb={4}>Edit Location</Heading>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  value={location.address}
                  onChange={(e) =>
                    setLocation({ ...location, address: e.target.value })
                  }
                  placeholder="Enter address"
                  borderRadius="md"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Map</FormLabel>
                <AspectRatio ratio={16 / 9} w="full">
                  <iframe
                    src={`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&z=15&output=embed`}
                    title="Google Maps"
                    style={{ borderRadius: '8px' }}
                  />
                </AspectRatio>
              </FormControl>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ExpertDetailsProfile;
