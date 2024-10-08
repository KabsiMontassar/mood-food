import React from 'react';
import { Box, Flex, Text, Avatar, Tabs, Tab, TabPanels, Badge, TabPanel, SimpleGrid, TabList, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { StarIcon } from '@chakra-ui/icons';
import { Timestamp } from 'firebase/firestore';

const ExpertHeader = ({ expert }) => {
  return (
    <Box w={{ base: '100%', md: '80%', lg: '60%' }} p={5} mx="auto">
      {/* Expert Info */}
      <Flex alignItems="center" justifyContent="center" flexDirection={{ base: 'column', md: 'row' }}>
        <Avatar
          name={expert.username}
          size={{ base: 'xl', md: '2xl' }}
          border="2px solid #cccfcd"
          src={expert.ProfilePicture || ''}
          mb={{ base: 4, md: 0 }}
          mr={{ base: 0, md: 5 }}
        />
        <Box textAlign={{ base: 'center', md: 'left' }}>
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
            {expert.username}
          </Text>
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
            {expert.specialite}
          </Text>
          <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.400">
            <Icon mr="5px" color="green" as={FaMapMarkerAlt} />
            {expert.location.address}
          </Text>
        </Box>
      </Flex>


      <Box mt={5} borderRadius={{ base: 'none', md: 'md' }} bg="gray.100" p={5}>
        <Flex justifyContent="space-between" align="center" flexDirection={{ base: 'column', md: 'row' }}>
          <Box w={{ base: '100%', md: '30%' }} textAlign="center" mb={{ base: 4, md: 0 }}>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color='gray.600'>
              {expert.rateTotal}
            </Text>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  mr={2}
                  key={i}
                  color={i < expert.rateTotal ? 'yellow.500' : 'gray.300'}
                />
              ))}
          </Box>
          <Box borderLeft={{ base: 'none', md: '1px solid #cccfcd' }} pl={{ base: 0, md: 5 }} w={{ base: '100%', md: '70%' }} textAlign={{ base: 'center', md: 'left' }}>


            {expert.reviews.map((review, index) => (
              <Box key={index} mb={4}>
                <Text fontSize={{ base: 'sm', md: 'xl' }} color='gray.600'>
                  {review.commentaire}
                </Text>
                <Text ml={2} fontSize={{ base: 'xs', md: 'sm' }} color='gray.600'>
                  {new Date(review.date.seconds * 1000).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }
                  )}
                </Text>
              </Box>
            ))}


          </Box>
        </Flex>
      </Box>

      {/* Tabs Section */}
      <Box mt={5} borderRadius={{ base: 'none', md: 'md' }} bg="white" p={5}>
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
                {expert.description}
              </Text>
            </TabPanel>
            <TabPanel p={4} minH="200px">
              <SimpleGrid color="gray.600" columns={{ base: 1, sm: 2 }} spacing={4}>
                <Box textAlign="center" borderRight={{ base: 'none', md: '1px solid #cccfcd' }} borderBottom={{ base: 'none', md: '1px solid #cccfcd' }} p={2}>
                  <Badge colorScheme="yellow">Spécialité</Badge>
                  <Text mt={1}>{expert.specialite}</Text>
                </Box>
                <Box textAlign="center" borderBottom={{ base: 'none', md: '1px solid #cccfcd' }} p={2}>
                  <Badge colorScheme="red">Expérience</Badge>
                  {expert.experience.map((exp, index) => (
                    <Flex justify={"center"} align="center" textAlign={"center"} key={index}>
                      <Text mt={1}>{exp.title}</Text>
                      <Text ml={4} mt={1}>{exp.years}</Text>
                    </Flex>
                  ))}
                </Box>
                <Box textAlign="center" borderRight={{ base: 'none', md: '1px solid #cccfcd' }} p={2}>
                  <Badge colorScheme="teal">Email</Badge>
                  <Text mt={1}>{expert.email}</Text>
                </Box>
                <Box textAlign="center" p={2}>
                  <Badge colorScheme="blue">Numéro de téléphone</Badge>
                  <Box mt={1}>{expert.phone.map((phone, index) => (
                    <React.Fragment key={index}>
                      <Text>{phone}</Text>
                    </React.Fragment>
                  ))}</Box>
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
