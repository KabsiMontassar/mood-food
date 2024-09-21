import React, { useState, useEffect } from 'react';
import {
  Grid,
  GridItem,
  Avatar,
  Box,
  Flex,
  IconButton,
  Text,
  Icon,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Profile = () => {
  const [time, setTime] = useState([]);
  const [daysOfWeekWithDates, setDaysOfWeekWithDates] = useState([]);

  const handleJumpWeeks = (weeks) => {
    const offset = 14 * weeks;
    const currentDate = new Date();
    const newStartDate = new Date(time[0]);
    newStartDate.setDate(newStartDate.getDate() + offset);
    if (newStartDate < currentDate) {
      newStartDate.setTime(currentDate.getTime());
    }
    const maxDate = new Date(currentDate);
    maxDate.setDate(maxDate.getDate() + 56);
    if (newStartDate > maxDate) {
      newStartDate.setTime(maxDate.getTime());
    }
    const newDates = calculateDates(newStartDate, 0);
    setTime(newDates);
    setDaysOfWeekWithDates(newDates);
  };

  const calculateDates = (baseDate, offset) => {
    const dates = [];
    const startDate = new Date(baseDate);
    startDate.setDate(startDate.getDate() + offset);

    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      dates.push(formattedDate);
    }
    return dates;
  };

  useEffect(() => {
    const initialDates = calculateDates(new Date(), 0);
    setTime(initialDates);
    setDaysOfWeekWithDates(initialDates);
  }, []);

  return (
    <Grid
      templateAreas={{
        base: '"nav" "main" "footer"',
        md: '"nav main" "nav footer"'
      }}
      gridTemplateColumns={{ md: '1fr 3fr' }}
      h="100vh"
      gap={1}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      {/* Navigation/Sidebar */}
      <GridItem pl="2" bg="pink.300" area={'nav'}>
        <Box p={5} mx="auto">
          <Flex alignItems="center" justifyContent="center" flexDirection="column">
            <Avatar
              name="John Doe"
              size={{ base: 'xl', md: '2xl' }}
              border="2px solid #cccfcd"
              src={`https://i.pravatar.cc/150?img=1`}
              mb={{ base: 4, md: 0 }}
              mr={{ base: 0, md: 5 }}
            />
            <Box textAlign={{ base: 'center', md: 'left' }}>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                Dr. Sara (Shivani) Pareek, DMD
              </Text>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                Software Engineer
              </Text>
              <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.700">
                <Icon mr="5px" color="green" as={FaMapMarkerAlt} />
                New York, USA
              </Text>
            </Box>
          </Flex>

          {/* Tabs Section */}
          <Tabs isFitted colorScheme="teal">
            <TabList>
              <Tab>Profile</Tab>
              <Tab>Schedule</Tab>
            </TabList>

            <TabPanels>
              {/* Profile Info */}
              <TabPanel>
                <Box mt={5} borderRadius="md" p={5} w="100%">
                  <Flex
                    align="center"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Box w="100%" textAlign="center">
                      <Flex justify="center" gap={1} mb={2}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Email:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                          Pareek@hotmail.fr
                        </Text>
                      </Flex>
                      <Flex justify="center" gap={1} mb={2}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Date of Birth:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                          11/11/2003
                        </Text>
                      </Flex>
                      <Flex justify="center" gap={1} mb={2}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Gender:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                          Male
                        </Text>
                      </Flex>
                      <Flex justify="center" gap={1} mb={2}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Phone:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                          23242525
                        </Text>
                      </Flex>
                      <Flex justify="center" gap={1} mb={2}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Address:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" text-wrap="nowrap">
                          Hanover Street
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </TabPanel>

              {/* Schedule Info */}
              <TabPanel>
                <Box>
                  <Flex
                    w="full"
                    alignItems="center"
                    justifyContent="space-between"
                    p={3}

                  >



                    <IconButton
                      boxSize={{ base: 6, md: 7 }}
                      color="gray.500"
                      bg="transparent"
                      _hover={{ color: 'black', bg: 'transparent' }}
                      icon={<ChevronLeftIcon />}
                      onClick={() => handleJumpWeeks(-1)}
                    />
                    <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }}>
                      {time[0]} - {time[13]}
                    </Text>
                    <IconButton
                      boxSize={{ base: 6, md: 7 }}
                      color="gray.500"
                      bg="transparent"
                      _hover={{ color: 'black', bg: 'transparent' }}
                      icon={<ChevronRightIcon />}
                      onClick={() => handleJumpWeeks(1)}
                    />
                  </Flex>


                  <Flex
                    w="full"
                    alignItems="center"
                    justifyContent="center"
                    p={3}
                    flexDirection="column"
                    gap={2}
                  >
                    <Box w="100%" textAlign="center">
                      <Flex justify="center" gap={1}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Total Weight:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                          75 kg
                        </Text>
                      </Flex>
                      <Flex justify="center" gap={1}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Muscle Mass:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                          22.5 kg
                        </Text>
                      </Flex>
                      <Flex justify="center" gap={1}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Fat Mass:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                          7.5 kg
                        </Text>
                      </Flex>
                      <Flex justify="center" gap={1}>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="black">
                          Water Percentage:
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                          60%
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>

      {/* Main Content */}
      <GridItem pl="2" bg="green.300" area={'main'}>
        <Box>
          <Tabs align='center' variant='unstyled'>
            <TabList>
              <Tab _selected={{ color: 'white', bg: 'teal.400' }}>One</Tab>
              <Tab _selected={{ color: 'white', bg: 'teal.400' }}>Two</Tab>
              <Tab _selected={{ color: 'white', bg: 'teal.400' }}>Three</Tab>
              <Tab _selected={{ color: 'white', bg: 'teal.400' }}>Four</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
              <TabPanel>
                <p>four!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>

      {/* Footer */}
      <GridItem pl="2" bg="blue.300" area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default Profile;
