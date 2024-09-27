import react,{ useState } from 'react';
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
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Editinformation = ({ userId, username, setUsername, email, setEmail, gender, setGender, dateOfBirth, setDateOfBirth, speciality, setSpeciality }) => {
  // State to track original values for comparison
  const [originalData, setOriginalData] = useState({
    username,
    email,
    gender,
    dateOfBirth,
    speciality
  });

  // Check if the data has changed
  const isChanged = (field, value) => value !== originalData[field];

  const handleUpdate = async () => {
    const userRef = doc(db, 'users', userId);
    const updatedData = {
      username,
      email,
      gender,
      dateOfBirth,
      speciality
    };
    await updateDoc(userRef, updatedData);
    setOriginalData(updatedData); // Reset original data after successful update
  };

  return (
    <Box id="edit-info" boxShadow={{ base: 'none', md: 'md' }}
      p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Information</Heading>
      <VStack spacing={4}>
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={5} w="full" justifyContent="space-between">
          <FormControl>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              borderRadius="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderRadius="md"
            />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel htmlFor='gender'>Gender</FormLabel>
          <Select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            borderRadius="md"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="dob">Date of Birth</FormLabel>
          <Input
            id="dob"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            borderRadius="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="speciality">Speciality</FormLabel>
          <Input
            id="speciality"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            borderRadius="md"
          />
        </FormControl>
        {/* Render Save button only if any field has changed */}
        {(isChanged('username', username) || isChanged('email', email) || isChanged('gender', gender) || isChanged('dateOfBirth', dateOfBirth) || isChanged('speciality', speciality)) && (
          <Button
            colorScheme="green"
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        )}
      </VStack>
    </Box>
  )
};

const EditContactNumber = ({ userId, phoneNumbers, setPhoneNumbers }) => {
  const [originalPhoneNumbers, setOriginalPhoneNumbers] = useState(phoneNumbers);

  // Check if the phone numbers have changed
  const hasChanges = JSON.stringify(phoneNumbers) !== JSON.stringify(originalPhoneNumbers);

  const handleUpdatePhoneNumbers = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { phoneNumbers });
    setOriginalPhoneNumbers(phoneNumbers); // Reset the original phone numbers after saving
  };

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
          onClick={() => {
            const newPhoneNumbers = [...phoneNumbers, ''];
            setPhoneNumbers(newPhoneNumbers);
          }}
          colorScheme="gray"
          w="100%"
          bg="white"
          border="1px solid #DDDDDD"
        >
          +
        </Button>
        {/* Render Save button if phone numbers have changed */}
        {hasChanges && (
          <Button colorScheme="green" onClick={handleUpdatePhoneNumbers}>
            Save Changes
          </Button>
        )}
      </VStack>
    </Box>
  )
};


const ExpertEditExperience = ({ userId, experience, setExperience }) => {
  const [originalExperience, setOriginalExperience] = useState(experience);

  // Check if the experience array has changed
  const hasChanges = JSON.stringify(experience) !== JSON.stringify(originalExperience);

  const handleUpdateExperience = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { experience });
    setOriginalExperience(experience); // Reset the original experience after saving
  };

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
          onClick={() => {
            const newExperience = [...experience, { title: '', years: '' }];
            setExperience(newExperience);
          }}
          colorScheme="gray"
          w="100%"
          border="1px solid #DDDDDD"
          bg="white"
        >
          +
        </Button>
        {/* Render Save button if experience has changed */}
        {hasChanges && (
          <Button colorScheme="green" onClick={handleUpdateExperience}>
            Save Changes
          </Button>
        )}
      </VStack>
    </Box>
  )
};

const EditWorkingHours = ({ userId, scheduleDays, setScheduleDays }) => {
  const [originalSchedule, setOriginalSchedule] = useState(scheduleDays);

  // Check if the working hours have changed
  const hasChanges = JSON.stringify(scheduleDays) !== JSON.stringify(originalSchedule);

  const handleUpdateSchedule = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { schedule: scheduleDays });
    setOriginalSchedule(scheduleDays); // Reset original schedule after saving
  };

  const handleDayChange = (index, field, value) => {
    const updatedSchedule = [...scheduleDays];
    updatedSchedule[index][field] = value;
    setScheduleDays(updatedSchedule);
  };

  return (
    <Box id="edit-schedule" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Working Hours</Heading>
      <VStack spacing={4}>
        {scheduleDays.map((schedule, index) => (
          <HStack key={index} spacing={4} w="full">
            <Text fontWeight="bold" fontSize="lg">{schedule.day}</Text>
            <Spacer />
            <Input
              value={schedule.startTime}
              onChange={(e) => handleDayChange(index, 'startTime', e.target.value)}
              size="sm"
              width="20%"
            />
            <Text fontWeight="semibold">to</Text>
            <Input
              value={schedule.endTime}
              onChange={(e) => handleDayChange(index, 'endTime', e.target.value)}
              size="sm"
              width="20%"
            />
          </HStack>
        ))}
        {/* Render Save button if working hours have changed */}
        {hasChanges && (
          <Button colorScheme="green" onClick={handleUpdateSchedule}>
            Save Changes
          </Button>
        )}
      </VStack>
    </Box>
  );
};


const ExpertEditLocation = ({ userId, location, setLocation, zone, setZone }) => {
  const [originalLocation, setOriginalLocation] = useState(location);
  const [originalZone, setOriginalZone] = useState(zone);

  // Check if the location or zone has changed
  const hasChanges = () => (
    JSON.stringify(location) !== JSON.stringify(originalLocation) || 
    JSON.stringify(zone) !== JSON.stringify(originalZone)
  );

  const handleUpdateLocation = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { location, zone });
    setOriginalLocation(location); // Reset the original location after saving
    setOriginalZone(zone);         // Reset the original zone after saving
  };

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
          <FormLabel>Zone</FormLabel>
          <Input
            value={zone.zone}
            onChange={(e) =>
              setZone({ ...zone, zone: e.target.value })
            }
            placeholder="Enter zone"
            borderRadius="md"
          />
        </FormControl>
          {/* <FormControl>
          <FormLabel>Map</FormLabel>
          <AspectRatio ratio={16 / 9} w="full">
            <iframe
              src={`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&z=15&output=embed`}
              title="Google Maps"
              style={{ borderRadius: '8px' }}
            />
          </AspectRatio>
        </FormControl> */}

        {/* Conditionally render the Save button */}
        {hasChanges() && (
          <Button colorScheme="green" onClick={handleUpdateLocation}>
            Save Changes
          </Button>
        )}
      </VStack>
    </Box>
  );
};





const DescriptionEdit = ({ userId, description, setDescription }) => {
  const [originalDescription, setOriginalDescription] = useState(description);

  // Check if the description has changed
  const hasChanges = description !== originalDescription;

  const handleUpdateDescription = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { description });
    setOriginalDescription(description); // Reset the original description after saving
  };

  return (
    <Box
      id="edit-description"
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
        {/* Conditionally render the Save button */}
        {hasChanges && (
          <Button colorScheme="green" onClick={handleUpdateDescription}>
            Save Changes
          </Button>
        )}
      </VStack>
    </Box>
  );
};




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
  const [location, setLocation] = useState(data.location.address);
  const [zone, setZone] = useState(data.location.zone);



  


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




          <ExpertEditLocation location={location} setLocation={setLocation} zone={zone} setZone={setZone} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ExpertDetailsProfile;
