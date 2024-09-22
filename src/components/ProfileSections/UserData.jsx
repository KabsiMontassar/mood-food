import React from 'react';
import { Box, Text, Flex, Avatar, Tabs, TabList, Tab, TabPanels, TabPanel, Icon, TabIndicator } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import UserTracks from './UserTracks';

const UserData = () => {
  const providedtime = [
    "Mon, 01/01/2021", "Tue, 02/01/2021", "Wed, 03/01/2021", "Thu, 04/01/2021",
    "Fri, 05/01/2021", "Sat, 06/01/2021", "Sun, 07/01/2021", "Mon, 08/01/2021",
    "Tue, 09/01/2021", "Wed, 10/01/2021", "Thu, 11/01/2021", "Fri, 12/01/2021",
    "Sat, 13/01/2021", "Sun, 14/01/2021"
  ];

  return (
    <Box p={5} mx="auto" maxW="800px">
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

      <Tabs variant='unstyled' isFitted colorScheme="teal" mt={5}>
        <TabList>
          <Tab fontWeight={"bold"}>Profile</Tab>
          <Tab fontWeight={"bold"}>Schedule</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='teal' borderRadius='1px' />
        <TabPanels>
          <TabPanel>
            <Box p={5} borderRadius="md" w="100%">
              <Flex
                align="center"
                flexDirection="column"
                justifyContent="center"
                w="100%"
              >
                <Box w="100%">
                  {[
                    { label: 'Email', value: 'Pareek@hotmail.fr' },
                    { label: 'Date of Birth', value: '11/11/2003' },
                    { label: 'Gender', value: 'Male' },
                    { label: 'Phone', value: '23242525' },
                    { label: 'Address', value: 'Hanover Street' }
                  ].map((item, index) => (
                    <Flex key={index} gap={1} mb={2}>
                      <Text fontWeight={"bold"} fontSize={{ base: 'md', md: 'lg' }} color="black">
                        {item.label}:
                      </Text>
                      <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                        {item.value}
                      </Text>
                    </Flex>
                  ))}
                </Box>
              </Flex>
            </Box>
          </TabPanel>

          {/* Schedule Info */}
          <TabPanel>
            <UserTracks providedtime={providedtime} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default UserData;
