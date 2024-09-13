import React from 'react';
import { Box, Flex, Text, Avatar, Tabs, Tab, TabPanels, Badge, TabPanel, SimpleGrid, TabList, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { StarIcon } from '@chakra-ui/icons';

const ExpertHeader = ({ expert }) => {
  return (
    <Box w={{ base: '100%', md: '80%', lg: '60%' }} p={5} mx="auto">
      {/* Expert Info */}
      <Flex alignItems="center" justifyContent="center" flexDirection={{ base: 'column', md: 'row' }}>
        <Avatar
          name={expert.name}
          size={{ base: 'xl', md: '2xl' }}
          border="2px solid #cccfcd"
          src={`https://i.pravatar.cc/150?img=${expert.id}`}
          mb={{ base: 4, md: 0 }}
          mr={{ base: 0, md: 5 }}
        />
        <Box textAlign={{ base: 'center', md: 'left' }}>
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
            {expert.name}
          </Text>
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
            {expert.expertise}
          </Text>
          <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.400">
            <Icon mr="5px" color="green" as={FaMapMarkerAlt} />
            {expert.address}
          </Text>
        </Box>
      </Flex>

      {/* Rating and Review */}
      <Box mt={5} borderRadius={{ base: 'none', md: 'md' }} bg="gray.100" p={5}>
        <Flex justifyContent="space-between" align="center" flexDirection={{ base: 'column', md: 'row' }}>
          <Box w={{ base: '100%', md: '30%' }} textAlign="center" mb={{ base: 4, md: 0 }}>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color='gray.600'>
              {expert.rating}
            </Text>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  mr={2}
                  key={i}
                  color={i < expert.rating ? 'yellow.500' : 'gray.300'}
                />
              ))}
          </Box>
          <Box borderLeft={{ base: 'none', md: '1px solid #cccfcd' }} pl={{ base: 0, md: 5 }} w={{ base: '100%', md: '70%' }} textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize={{ base: 'sm', md: 'xl' }} color='gray.600'>
              “Definitely a high-efficiency setup — it’s a single chair in a shared office. The dentist that came was different than the one I booked, and he seemed unfamiliar with the setup.”
            </Text>
            <Text ml={2} fontSize={{ base: 'xs', md: 'sm' }} color='gray.600'>
              Foulen fouleni 13 sep 2024
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Tabs Section */}
      <Box mt={5} borderRadius={{ base: 'none', md: 'md' }} bg="gray.50" p={5}>
        <Tabs variant="unstyled">
          <TabList justifyContent={{ base: 'center', md: 'flex-start' }}>
            <Tab
              fontSize={{ base: 'sm', md: 'md' }}
              color="gray.400"
              _selected={{
                color: 'black',
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}>
              À propos
            </Tab>
            <Tab
              fontSize={{ base: 'sm', md: 'md' }}
              color="gray.400"
              _selected={{
                color: 'black',
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}>
              Éducation et parcours
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={4} minH="200px">
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
              </Text>
            </TabPanel>
            <TabPanel p={4} minH="200px">
              <SimpleGrid color="gray.600" columns={{ base: 1, sm: 2 }} spacing={4}>
                <Box textAlign="center" borderRight={{ base: 'none', md: '1px solid #cccfcd' }} borderBottom={{ base: 'none', md: '1px solid #cccfcd' }} p={2}>
                  <Badge colorScheme="yellow">Spécialité</Badge>
                  <Text mt={1}>Nutritionniste</Text>
                </Box>
                <Box textAlign="center" borderBottom={{ base: 'none', md: '1px solid #cccfcd' }} p={2}>
                  <Badge colorScheme="red">Expérience</Badge>
                  <Text mt={1}>7 ans d’expérience</Text>
                </Box>
                <Box textAlign="center" borderRight={{ base: 'none', md: '1px solid #cccfcd' }} p={2}>
                  <Badge colorScheme="teal">Email</Badge>
                  <Text mt={1}>Foulen@Foulen.fr</Text>
                </Box>
                <Box textAlign="center" p={2}>
                  <Badge colorScheme="blue">Numéro de téléphone</Badge>
                  <Text mt={1}>95232***<br />54342***</Text>
                </Box>
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default React.memo(ExpertHeader);
