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
  NumberInput,
  Text,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Editinformation = ({ userId, username, setUsername, gender, setGender, dateOfBirth, setDateOfBirth, speciality, setSpeciality }) => {
  const [originalData, setOriginalData] = useState({ username, gender, dateOfBirth, speciality });

  const isChanged = (field, value) => value !== originalData[field];

  const handleUpdate = async () => {
    const userRef = doc(db, 'users', userId);
    const updatedData = { username, gender, dateOfBirth, speciality };
    await updateDoc(userRef, updatedData);
    setOriginalData(updatedData);
  };

  return (
    <Box id="edit-info" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize={{ base: 'lg', md: 'xl' }} mb={4}>Edit Information</Heading>
      <VStack spacing={4}>
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={5} w="full">
          <FormControl>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} borderRadius="md" />
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel htmlFor='gender'>Gender</FormLabel>
          <Select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} borderRadius="md">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="dob">Date of Birth</FormLabel>
          <Input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} borderRadius="md" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="speciality">Speciality</FormLabel>
          <Input id="speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)} borderRadius="md" />
        </FormControl>
        {(isChanged('username', username) || isChanged('gender', gender) || isChanged('dateOfBirth', dateOfBirth) || isChanged('speciality', speciality)) && (
          <Button colorScheme="green" onClick={handleUpdate}>Save Changes</Button>
        )}
      </VStack>
    </Box>
  );
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

const NumberInputCustom = ({ value, min, max, step, onChange }) => {
  return (
    <NumberInput
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(val) => onChange(parseFloat(val))}
      maxW='100px'
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
const EditWorkingHours = ({ userId, scheduleDays, setScheduleDays }) => {
  const [localSchedule, setLocalSchedule] = useState(scheduleDays);
  const [isModified, setIsModified] = useState(false); // Flag to track changes
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(null);
  const [currentSchedule, setCurrentSchedule] = useState({ day: '', starttime: 0, endtime: 0, enabled: true });

  // Toggle the enabled state of a day
  const toggleDay = (index) => {
    const newSchedule = [...localSchedule];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    setLocalSchedule(newSchedule);
    setIsModified(true); // Mark as modified
  };

  // Open modal to edit schedule
  const openModal = (index) => {
    setCurrentDayIndex(index);
    setCurrentSchedule(localSchedule[index]);
    setModalOpen(true);
  };

  // Handle submission of the modal
  const handleModalSubmit = () => {
    if (currentDayIndex !== null) {
      if (currentSchedule.starttime >= currentSchedule.endtime) {
        alert("Start time should be less than end time");
        return;
      }

      const newSchedule = [...localSchedule];
      newSchedule[currentDayIndex] = currentSchedule;
      setLocalSchedule(newSchedule);
      setIsModified(true); // Mark as modified
    }
    setModalOpen(false);
  };

  // Update schedule in Firestore
  const handleUpdateSchedule = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { schedule: localSchedule }); // Update Firestore
    setScheduleDays(localSchedule); // Sync with parent state
    setIsModified(false); // Reset modified flag
  };

  return (
    <Box id="edit-hours" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Working Hours</Heading>
      <VStack spacing={6} w="full">
        {localSchedule.map((schedule, index) => (
          <VStack key={index} spacing={4} w="full">
            <HStack justifyContent="space-between" w="full">
              <Switch
                size="lg"
                colorScheme="green"
                isChecked={schedule.enabled}
                onChange={() => toggleDay(index)}
              />
              <Text w="xs">{schedule.day}</Text>
              <Button onClick={() => openModal(index)}>Edit</Button>
            </HStack>
          </VStack>
        ))}
        {isModified && ( // Check modified flag instead of hasChanged
          <Button colorScheme="green" onClick={handleUpdateSchedule}>
            Save Changes
          </Button>
        )}
      </VStack>

      {/* Modal for editing schedule */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Schedule</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack justify="center" spacing={4}>
              <Text>Start:</Text>
              <NumberInputCustom
                value={currentSchedule.starttime}
                min={0}
                max={24}
                step={1}
                onChange={(value) => setCurrentSchedule({ ...currentSchedule, starttime: value })}
              />
            </HStack>
            <HStack justify="center" spacing={4} mt={4}>
              <Text>End:</Text>
              <NumberInputCustom
                value={currentSchedule.endtime}
                min={0}
                max={24}
                step={1}
                onChange={(value) => setCurrentSchedule({ ...currentSchedule, endtime: value })}
              />
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleModalSubmit}>
              Save
            </Button>
            <Button onClick={() => setModalOpen(false)} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
const ExpertEditLocation = ({ userId, location, setLocation }) => {
  const [originalLocation, setOriginalLocation] = useState(location);

  const handleUpdateLocation = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { location });
    setOriginalLocation(location); //
  };

  const hasChanged = JSON.stringify(location) !== JSON.stringify(originalLocation);






  return (
    <Box id="edit-location" boxShadow={{ base: 'none', md: 'md' }} p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Location</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            value={location.address}
            onChange={(e) =>
              setLocation({ ...location.address, address: e.target.value })
            }
            placeholder="Enter address"
            borderRadius="md"
          />
        </FormControl>
        <FormControl>
          <FormLabel>zone</FormLabel>
          <Input
            value={location.zone}
            onChange={(e) =>
              setLocation({ ...location.zone, zone: e.target.value })
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

        {hasChanged && (
          <Button colorScheme="green" onClick={handleUpdateLocation}>
            Save Changes
          </Button>
        )}

      </VStack>
    </Box>
  )
}


const DescriptionEdit = ({ userId, description, setDescription }) => {

  const [originalDescription, setOriginalDescription] = useState(description);

  const handleUpdateDescription = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { description });
    setOriginalDescription(description); // Reset the original description after saving
  }

  const hasChanged = description !== originalDescription;


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

        {hasChanged && (
          <Button colorScheme="green" onClick={handleUpdateDescription}>
            Save Changes

          </Button>
        )}
      </VStack>
    </Box>
  )
}





const ExpertDetailsProfile = ({ data }) => {
  const [username, setUsername] = useState(data.username);
  const [dateOfBirth, setDateOfBirth] = useState(data.birthDate);
  const [gender, setGender] = useState(data.gender);
  const [speciality, setSpeciality] = useState(data.specialite);
  const [description, setDescription] = useState(data.description);
  const [experience, setExperience] = useState(data.experience);
  const [location, setLocation] = useState(data.location);
  const [phoneNumbers, setPhoneNumbers] = useState(data.phone);
  const [scheduleDays, setScheduleDays] = useState(data.schedule);

  return (
    <Box mx="auto" mt={10}>
      <Heading color="#38B2AC" textAlign="center" mb={6} fontSize={{ base: '2xl', md: '4xl' }}>
        Expert Profile Details
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} position="relative" scrollBehavior="smooth">
        <Box
          display={{ base: 'none', md: 'flex' }}
          as="nav"
          w={{ base: '100%', md: '200px' }}
          borderRight={{ md: '1px solid #E2E8F0' }}
          h={{ base: 'auto', md: 'calc(100vh - 120px)' }}
          position="sticky"
          top={10}
          mb={{ base: 5, md: 0 }}
        >
          <VStack spacing={4} align="start" color="#38B2AC">
            <Link href="#edit-info" fontWeight="bold">Edit Information</Link>
            <Link href="#edit-Description" fontWeight="bold">Edit Description</Link>
            <Link href="#edit-contact" fontWeight="bold">Edit Contact Numbers</Link>
            <Link href="#edit-experience" fontWeight="bold">Edit Experience</Link>
            <Link href="#edit-hours" fontWeight="bold">Edit Working Hours</Link>
            <Link href="#edit-location" fontWeight="bold">Edit Location</Link>
          </VStack>
        </Box>
        <Box flex={1} maxW="900px" w="full">
          <Editinformation userId={data.uid} username={username} setUsername={setUsername} gender={gender} setGender={setGender} dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} speciality={speciality} setSpeciality={setSpeciality} />
          <DescriptionEdit userId={data.uid} description={description} setDescription={setDescription} />
          <EditContactNumber userId={data.uid} phoneNumbers={phoneNumbers} setPhoneNumbers={setPhoneNumbers} />
          <ExpertEditExperience userId={data.uid} experience={experience} setExperience={setExperience} />
          <EditWorkingHours userId={data.uid} scheduleDays={scheduleDays} setScheduleDays={setScheduleDays} />
          <ExpertEditLocation userId={data.uid} location={location} setLocation={setLocation} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ExpertDetailsProfile;