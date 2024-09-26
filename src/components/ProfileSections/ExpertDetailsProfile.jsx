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
  Textarea,
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



const Editinformation = ({ username, setUsername, email, setEmail, gender,
  setGender, dateOfBirth, setDateOfBirth, speciality, setSpeciality }) => {
   

  return (
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
          
            onChange={(e) => setGender(e.target.value)}
            borderRadius="md"
          >
            <option value={gender}>{gender}</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
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
  )
}


const EditContactNumber = ({ phoneNumbers, setPhoneNumbers }) => {
  return (
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
  )
}



const ExpertEditExperience = ({ experience, setExperience }) => {
  return (
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
  )
}



const EditWorkingHours = ({ scheduleDays, setScheduleDays }) => {


  const handleDayChange = (index, field, value) => {
    const newSchedule = [...scheduleDays];
    newSchedule[index][field] = value;
    setScheduleDays(newSchedule);
  };


  const toggleDay = (index) => {
    const newSchedule = [...scheduleDays];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    setScheduleDays(newSchedule);
  };

  return (
    <Box
      id="edit-hours" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Working Hours</Heading>
      <VStack spacing={6} w="full">
        {scheduleDays.map((schedule, index) => (
          <HStack flexDirection={{ base: 'column', md: 'row' }} key={index} spacing={6} w="full">
            <Switch
              size="lg"
              colorScheme="green"
              isChecked={schedule.enabled}
              onChange={() => toggleDay(index)}
            />
            <Text w="xs">{schedule.day}</Text>
            <RangeSlider
              colorScheme="green"
              defaultValue={[schedule.starttime, schedule.endtime]}
              min={0}
              max={24}
              step={1}
              onChangeEnd={(val) => {
                handleDayChange(index, 'starttime', val[0]);
                handleDayChange(index, 'endtime', val[1]);
              }}
              isDisabled={!schedule.enabled}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0} />
              <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
            <Text>{schedule.starttime} - {schedule.endtime}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>

  )
}


const ExpertEditLocation = ({ location, setLocation }) => {
  return (
    <Box id="edit-location" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Location</Heading>
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
  )
}


const DescriptionEdit = ({ description, setDescription }) => {
  return (
    <Box
      id="edit-Description"
      boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Description</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            borderRadius="md"
          />
        </FormControl>
      </VStack>
    </Box>
  )
}





const ExpertDetailsProfile = ({ data }) => {

  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [gender, setGender] = useState(data.gender);
 
  const [dateOfBirth, setDateOfBirth] = useState(data.dob);
  const [speciality, setSpeciality] = useState(data.specialite);
  const [phoneNumbers, setPhoneNumbers] = useState(data.phone);
  const [experience, setExperience] = useState(data.experience);
  const [description, setDescription] = useState(data.description);
  const [scheduleDays, setScheduleDays] = useState(data.schedule);
  const [location, setLocation] = useState(data.location);


  return (
    <Box mx="auto" mt={10}>
      <Heading color="#38B2AC" textAlign="center" mb={6} fontSize={{ base: '2xl', md: '4xl' }}>
        Expert Profile Details
      </Heading>


      <Flex position="relative" scrollBehavior="smooth" >

        <div style={{ position: 'sticky', top: '10px' }} >
          <Box
            as="nav"
            w="200px"
            borderRight="1px solid #E2E8F0"
            h="calc(100vh - 120px)"
            position="sticky"
            top={10}
            mr={10}
            display={{ base: 'none', md: 'block' }}
          >
            <VStack

              spacing={4} align="start" color="#38B2AC">
              <Link href="#edit-info" fontWeight="bold">Edit Information</Link>
              <Link href="#edit-Description" fontWeight="bold">Edit Description</Link>
              <Link href="#edit-contact" fontWeight="bold">Edit Contact Numbers</Link>
              <Link href="#edit-experience" fontWeight="bold">Edit Experience</Link>
              <Link href="#edit-hours" fontWeight="bold">Edit Working Hours</Link>
              <Link href="#edit-location" fontWeight="bold">Edit Location</Link>
            </VStack>
          </Box>
        </div>

        <Box flex={1} maxW="900px" >

          <Editinformation username={username} setUsername={setUsername} email={email} setEmail={setEmail}
            gender={gender} setGender={setGender} dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth}
            speciality={speciality} setSpeciality={setSpeciality}
          />

          <DescriptionEdit description={description} setDescription={setDescription} />


          <EditContactNumber phoneNumbers={phoneNumbers} setPhoneNumbers={setPhoneNumbers} />


          <ExpertEditExperience experience={experience} setExperience={setExperience} />


          <EditWorkingHours scheduleDays={scheduleDays} setScheduleDays={setScheduleDays} />




          <ExpertEditLocation location={location} setLocation={setLocation} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ExpertDetailsProfile;
