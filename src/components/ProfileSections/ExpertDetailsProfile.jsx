import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  Link,
  CheckboxGroup ,
  Checkbox,
  SimpleGrid,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack ,SliderThumb,

} from '@chakra-ui/react';
import { FaPlus, FaMinus } from "react-icons/fa";

import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; 
import { useEffect } from 'react';

const isChanged = (field, value, originalData) => {
  // if (field === 'birthdate') {
  //   return new Date(value).toISOString().split('T')[0] !== new Date(originalData[field]).toISOString().split('T')[0];
  // }
  return value !== originalData[field];
};

const EditInformation = ({ userId, display_name, setdisplay_name, birthdate, setbirthdate, speciality, setSpeciality, phone_number, setphone_number }) => {
  const [originalData, setOriginalData] = useState({ display_name, phone_number, birthdate, speciality });

  const handleUpdate = async () => {
    const userRef = doc(db, 'users', userId);
    const updatedData = {
      display_name,
      phone_number,
      speciality,
      // birthdate: birthdate ? Timestamp.fromDate(new Date(birthdate)) : null,
    };
    try {
      await updateDoc(userRef, updatedData);
      setOriginalData(updatedData); // Sync the updated data with the original
      console.log('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Box id="edit-info" boxShadow="md" p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Information</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="display_name">Display Name</FormLabel>
          <Input id="display_name" value={display_name} onChange={(e) => setdisplay_name(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="dob">Date of Birth</FormLabel>
          <Input id="dob" type='date' value={new Date(birthdate.seconds * 1000).toLocaleDateString()} onChange={(e) => setbirthdate(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="speciality">Speciality</FormLabel>
          <Input id="speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input value={phone_number} onChange={(e) => setphone_number(e.target.value)} placeholder="Enter phone number" />
        </FormControl>

        {(isChanged('display_name', display_name, originalData) || isChanged('birthdate', birthdate, originalData) || isChanged('phone_number', phone_number, originalData) || isChanged('speciality', speciality, originalData)) && (
          <Button colorScheme="green" onClick={handleUpdate}>Save Changes</Button>
        )}
      </VStack>
    </Box>
  );
};
const EditWorkingHours = ({ userId, scheduleDays, setScheduleDays }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState(9); // Default start time (9 AM)
  const [endTime, setEndTime] = useState(17); // Default end time (5 PM)

  // Format time in HH:mm AM/PM format
  const formatTime = (hours) => {
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:00 ${period}`;
  };

  // Extract day logic
  const convertToDateAndExtractDay = (scheduleDays) => {
    const days = scheduleDays.availbleDays.map((element) => {
      const date = new Date(element.seconds * 1000);
      return date.getDay(); // Get day index (0-6)
    });
    setSelectedDays(days);
    setStartTime(scheduleDays.startTime.seconds / 3600); // Convert seconds to hours
    setEndTime(scheduleDays.endTime.seconds / 3600); // Convert seconds to hours
  };

  useEffect(() => {
    convertToDateAndExtractDay(scheduleDays);
  }, [scheduleDays]);

  const handleSaveChanges = async () => {
    const currentDate = new Date();
  
    // Convert selected days to Firebase Timestamps and filter out invalid timestamps
    const updatedSchedule = {
      availbleDays: selectedDays
        .map((day) => {
          const dayDate = new Date(currentDate); // Clone the current date
          const diff = (day - currentDate.getDay() + 7) % 7; // Calculate the day offset
          dayDate.setDate(currentDate.getDate() + diff); // Adjust to the selected day
          dayDate.setHours(0, 0, 0, 0); // Set to midnight
          return Timestamp.fromDate(dayDate); // Convert to Firebase Timestamp
        })
        .filter((timestamp) => !isNaN(timestamp.seconds)), // Remove any invalid timestamps
  
      startTime: Timestamp.fromDate(new Date(currentDate.setHours(startTime, 0, 0, 0))), // Set start time
      endTime: Timestamp.fromDate(new Date(currentDate.setHours(endTime, 0, 0, 0))), // Set end time
    };
  
    try {
      console.log("Updating working hours...");
      console.log("Updated schedule:", updatedSchedule);
  
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { availableSchedule: updatedSchedule });
  
      setScheduleDays(updatedSchedule);
      console.log("Working hours updated successfully!");
    } catch (error) {
      console.error("Error updating working hours:", error);
    }
  };
  
  
  
  

  const handleDayChange = (day) => {
    if (selectedDays.includes(day)) {
      // If the day is already selected, remove it
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      // Otherwise, add it
      setSelectedDays([...selectedDays, day]);
    }
  };
  return (
    <Box
      id="edit-hours"
      boxShadow="lg"
      p={6}
      mb={10}
      borderRadius="lg"
      bg="white"
      maxWidth="lg"
      mx="auto"
      mt={10}
    >
      <VStack spacing={6} w="full">
        <FormControl>
          <FormLabel>Set Start Time</FormLabel>
          <Slider
            defaultValue={startTime}
            min={0}
            max={23}
            step={1}
            onChange={(value) => setStartTime(value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>{`Start Time: ${formatTime(startTime)}`}</Text>
        </FormControl>
  
        <FormControl>
          <FormLabel>Set End Time</FormLabel>
          <Slider
            defaultValue={endTime}
            min={0}
            max={23}
            step={1}
            onChange={(value) => setEndTime(value)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text>{`End Time: ${formatTime(endTime)}`}</Text>
        </FormControl>
  
        <FormControl>
          <FormLabel>Select Available Days</FormLabel>
          <SimpleGrid columns={3} spacing={4}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
              <Checkbox
                key={day}
                value={index}
                isChecked={selectedDays.includes(index)}
                onChange={() => handleDayChange(index)} // Toggle selection on change
              >
                {day}
              </Checkbox>
            ))}
          </SimpleGrid>
        </FormControl>
  
        <Button
          colorScheme="teal"
          onClick={handleSaveChanges}
          isDisabled={selectedDays.length === 0}
          size="lg"
          width="full"
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};


const ExpertEditLocation = ({ userId, location, setLocation }) => {
  const [originalLocation, setOriginalLocation] = useState(location);

  const handleUpdateLocation = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { location });
    setOriginalLocation(location); 
  };

  const hasChanged = JSON.stringify(location) !== JSON.stringify(originalLocation);

  return (
    <Box id="edit-location" boxShadow="md" p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Location</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input value={location.address} onChange={(e) => setLocation({ ...location, address: e.target.value })} placeholder="Enter address" />
        </FormControl>
        <FormControl>
          <FormLabel>Zone</FormLabel>
          <Input value={location.zone} onChange={(e) => setLocation({ ...location, zone: e.target.value })} placeholder="Enter zone" />
        </FormControl>

        {hasChanged && <Button colorScheme="green" onClick={handleUpdateLocation}>Save Changes</Button>}
      </VStack>
    </Box>
  );
};

const DescriptionEdit = ({ userId, description, setDescription }) => {
  const [originalDescription, setOriginalDescription] = useState(description);

  const handleUpdateDescription = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { description });
    setOriginalDescription(description);
  };

  const hasChanged = description !== originalDescription;

  return (
    <Box id="edit-description" boxShadow="md" p={6} mb={10} borderRadius="lg" bg="white">
      <Heading color="#0A7342" fontSize="xl" mb={4}>Edit Description</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
        </FormControl>

        {hasChanged && <Button colorScheme="green" onClick={handleUpdateDescription}>Save Changes</Button>}
      </VStack>
    </Box>
  );
};

const ExpertDetailsProfile = ({ data }) => {
  const [display_name, setdisplay_name] = useState(data.display_name);
  const [birthdate, setbirthdate] = useState(data.birthdate);
  const [speciality, setSpeciality] = useState(data.speciality);
  const [description, setDescription] = useState(data.description);
  const [location, setLocation] = useState(data.location);
  const [phone_number, setphone_number] = useState(data.phone_number); 
  const [scheduleDays, setScheduleDays] = useState(data.availableSchedule);

  return (
    <Box mx="auto" mt={10}>
      <Heading color="#38B2AC" textAlign="center" mb={6} fontSize="4xl">Expert Profile Details</Heading>
      <Flex direction="row" position="relative" scrollBehavior="smooth">
        <Box display="flex" as="nav" w="200px" borderRight="1px solid #E2E8F0" h="calc(100vh - 120px)" position="sticky" top={10}>
          <VStack spacing={4} align="start" color="#38B2AC">
            <Link href="#edit-info" fontWeight="bold">Edit Information</Link>
            <Link href="#edit-description" fontWeight="bold">Edit Description</Link>
            <Link href="#edit-hours" fontWeight="bold">Edit Working Hours</Link>
            <Link href="#edit-location" fontWeight="bold">Edit Location</Link>
          </VStack>
        </Box>
        <Box flex={1} maxW="900px" w="full">
          <EditInformation 
            {...{ 
              userId: data.uid, 
              display_name, setdisplay_name, 
              birthdate, setbirthdate, 
              speciality, setSpeciality, 
              phone_number, setphone_number 
            }} 
          />
          <DescriptionEdit {...{ userId: data.uid, description, setDescription }} />
          <EditWorkingHours {...{ userId: data.uid, scheduleDays, setScheduleDays }} />
          <ExpertEditLocation {...{ userId: data.uid, location, setLocation }} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ExpertDetailsProfile;

