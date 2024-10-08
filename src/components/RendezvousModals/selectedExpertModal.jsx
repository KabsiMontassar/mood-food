import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Icon,
  Grid,
  GridItem,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { collection, query, where, getDocs, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig.jsx';

const generateTimeSlots = (appts, startHour, endHour) => {
  let slots = [];

  for (let hour = startHour; hour < endHour; hour++) {
    const start = `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1).toString().padStart(2, '0')}:00`;
    slots.push(start);
    appts--;
    if (appts <= 0) break;
  }

  return slots;
};

const SelectedExpertModal = ({ isOpen, onClose, selectedExpert, daysOfWeekWithDates }) => {
  const [currentStep, setCurrentStep] = useState('availability');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [soucis, setSoucis] = useState('');
  const [slotsArray, setSlotsArray] = useState([]);

  const getDayOfWeek = (date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[date.getDay()];
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedExpert?.uid || !daysOfWeekWithDates.length) return;

      try {
        const startDate = new Date(daysOfWeekWithDates[0]);
        const endDate = new Date(daysOfWeekWithDates[daysOfWeekWithDates.length - 1]);
        const firestoreStartDate = Timestamp.fromDate(startDate);
        const firestoreEndDate = Timestamp.fromDate(endDate);

        const q = query(
          collection(db, "rendezvous"),
          where("expertid", "==", selectedExpert.uid),
          where("date", ">=", firestoreStartDate),
          where("date", "<=", firestoreEndDate)
        );

        const querySnapshot = await getDocs(q);
        const rdvDocsData = querySnapshot.docs.map(doc => doc.data());

        const availabilityArray = daysOfWeekWithDates.map(date => {
          const day = getDayOfWeek(new Date(date));
          const scheduleIndex = selectedExpert.schedule.findIndex(schedule => schedule.day === day);
          const count = (scheduleIndex !== -1) ?
            (selectedExpert.schedule[scheduleIndex].endtime - selectedExpert.schedule[scheduleIndex].starttime) : 0;

          return {
            day: date,
            count: count,
            enabled: (scheduleIndex !== -1) ? selectedExpert.schedule[scheduleIndex].enabled : false,
          };
        });

        const newSlotsArray = availabilityArray.map((day, index) => {
          const scheduleIndex = selectedExpert.schedule.findIndex(schedule => schedule.day === getDayOfWeek(new Date(day.day)));
          if (scheduleIndex !== -1) {

            if(!day.enabled) {
              return generateTimeSlots(day.count, 0, 0);
            }


            return generateTimeSlots(day.count, selectedExpert.schedule[scheduleIndex].starttime, selectedExpert.schedule[scheduleIndex].endtime);
          }

          


          return [];
        });

        setSlotsArray(newSlotsArray);

        rdvDocsData.forEach(appointment => {
          const start = appointment.starttime;
          const end = appointment.endtime;
          const stringtime =  start + ' - ' + end;
          const date = appointment.date;
          const dateString = date.toDate().toLocaleDateString();
          const index = daysOfWeekWithDates.findIndex(date => new Date(date).toLocaleDateString() === dateString);
          if (index !== -1) {
            const busyIndex = newSlotsArray[index].findIndex(slot => slot === stringtime);
            if (busyIndex !== -1) {
              newSlotsArray[index].splice(busyIndex, 1);
            }
          }



          setSlotsArray(newSlotsArray);
        });

      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [selectedExpert?.uid, daysOfWeekWithDates]);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);

    setCurrentStep('confirmation');
  };

  const handleConfirm = async () => {


    const appointmentData = {
      expertid: selectedExpert.uid,
      date: Timestamp.fromDate(new Date(selectedSlot.split(' ')[0])),
      starttime: selectedSlot.split(' ')[1],
      endtime: selectedSlot.split(' ')[3],
      soucis: soucis,
      patient: window.globalUserUid,
    };

    try {
      // Add the appointment to the 'rendezvous' collection
      await addDoc(collection(db, "rendezvous"), appointmentData);
      alert("Appointment successfully booked!");
      onClose();
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Error booking appointment. Please try again.");
    }
  };

  const handleSoucisChange = (e) => {
    setSoucis(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside" overflowY="auto">
      <ModalOverlay />
      <ModalContent pb={5} maxW="50rem">
        <ModalHeader
          color="green"
          fontSize="md"
          textAlign="center"
          fontWeight="bold"
          textShadow="2px 2px 4px #5EDABC"
        >
          {currentStep === 'availability' ? `${selectedExpert.username}'s Availability` : 'Réviser et réserver'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {currentStep === 'availability' ? (
            <>
              <Heading size="xs" color="gray.400" fontWeight="none" mb={2}>
                Cliquez sur un horaire pour réserver.
              </Heading>
              <Grid templateColumns="repeat(1, 1fr)" gap={3}>
                {slotsArray.map((appts, index) =>
                  appts.length >= 0 ? (
                    <GridItem key={index}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize="xs" fontWeight="bold">{daysOfWeekWithDates[index]}</Text>
                      </Box>
                      <Flex wrap="wrap" gap={2} justify="left">
                        {appts.map((slot, i) => (
                          <GridItem
                            key={i}
                            bg="#5EDABC"
                            textAlign="center"
                            borderRadius="none"
                            p={2}
                            m={1}
                            cursor="pointer"
                            _hover={{ bg: "#5EDABC", opacity: 0.8 }}
                            onClick={() => handleSlotClick(`${daysOfWeekWithDates[index]} ${slot}`)}
                          >
                            <Text fontSize="sm">{slot}</Text>
                          </GridItem>
                        ))}
                      </Flex>
                    </GridItem>
                  ) : null
                )}
              </Grid>
            </>
          ) : (
            <>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Informations sur le médecin</Text>
              <Flex border="1px solid #cccccc" p={4} mb={4} borderRadius={5} align="center">
                <Avatar size="xl" name={selectedExpert.username} src={selectedExpert.ProfilePicture || ''} mr={4} />
                <Box pl={5}>
                  <Text fontSize="lg" fontWeight="bold">{selectedExpert.username}</Text>
                  <Text fontSize="md">{selectedExpert.specialite}</Text>
                  <Text fontSize="md">
                    <Icon color="green" mr={2} as={FaMapMarkerAlt} />
                    {selectedExpert.location.address}
                  </Text>
                </Box>
              </Flex>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Planification</Text>
              <Text fontSize="lg" color="#888888" mb={4} ml={4}>{selectedSlot}</Text>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Informations sur le patient</Text>
              <Text fontSize="lg" color="#666666" mb={4} ml={4}>Current User name (moi)</Text>
              <Box ml={5} mb={5}>
                <Select size="lg" variant="flushed" color="teal" _selected={{ color: 'red' }}>
                  <option value='Problème, une condition ou une difficulté.'>Problème, une condition ou une difficulté.</option>
                  <option value='Examen médical annuel.'>Examen médical annuel.</option>
                </Select>
              </Box>
              <Text fontSize="lg" fontWeight="bold" mb={4}>Soucis</Text>
              <Box>
                <Textarea
                  placeholder="Entrez votre soucis ici"
                  size="lg"
                  value={soucis}
                  onChange={handleSoucisChange}
                />
              </Box>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {currentStep === 'availability' ? (
            <Button colorScheme="teal" variant="outline" onClick={onClose}>
              Fermer
            </Button>
          ) : (
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={handleConfirm}
              isDisabled={!soucis.trim() || !selectedSlot} 
            >
              Réserver
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelectedExpertModal;
