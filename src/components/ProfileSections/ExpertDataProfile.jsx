import React from 'react'
import { Box, Text, Flex, Avatar, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ExpertDataProfile = () => {



  const expert = {
    email: 'Pareek@hotmail.fr ',
    dob: ' 11/11/2003',
    gender: 'famale',
    phone: '23242525',
    address: 'Hanover Street',
    username: 'Dr. Sara (Shivani) Pareek, DMD',
    job: 'Nutritionist',
    location: 'New York, USA'
  }



  return (
    <div style={{   position: 'sticky', top: '50px',  }}>
    <Box mx="auto" align="center" minW={{ base: '100%', md: '400px' }} maxW={{ base: '100%', md: '500px' }}>

      <Flex alignItems="center" justifyContent="center" flexDirection="column" mb={4}>
        <Avatar
          name={expert.username}
          size={{ base: 'xl', md: '2xl' }}
          border="2px solid #cccfcd"
          src={`https://i.pravatar.cc/150?img=1`}
          mb={{ base: 4, md: 0 }}
          mr={{ base: 0, md: 5 }}
        />

        <Box textAlign="left">
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
            {expert.username}
          </Text>
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
            {expert.job}
          </Text>
          <Text fontSize={{ base: 'md', md: 'xl' }} color="gray.700">
            <Icon mr="5px" color="green" as={FaMapMarkerAlt} />
            {expert.location}
          </Text>
        </Box>
      </Flex>

      <Box p={5}  >
        <Flex flexDirection="column" alignItems={"center"}  >
          {[
            { label: 'Email', value: expert.email },
            { label: 'Date of Birth', value: expert.dob },
            { label: 'Gender', value: expert.gender },
            { label: 'Phone', value: expert.phone },
            { label: 'Address', value: expert.address }
          ].map((item, index) => (
            <Flex textAlign={"left"} key={index} gap={2} mb={2}>
              <Text fontWeight={"bold"} fontSize={{ base: 'md', md: 'lg' }} color="black">
                {item.label}:
              </Text>
              <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
                {item.value}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>

    </Box>
    </div>
  )
}

export default ExpertDataProfile