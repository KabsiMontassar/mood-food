import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaUsers, FaStar, FaHeart } from 'react-icons/fa'

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'CEO',
    // image: 'https://bit.ly/jane-doe',
  },
  {
    name: 'John Smith',
    role: 'CTO',
    // image: 'https://bit.ly/john-smith',
  },
  {
    name: 'Emily Johnson',
    role: 'Lead Designer',
    // image: 'https://bit.ly/emily-johnson',
  },
]

const Propos = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="green.800"
      p={8}
    >
      <VStack spacing={8} maxW="container.md" textAlign="center">
        <Heading as="h1" size="2xl" color={"#FFFCF6"}>
          À Propos de Nous
        </Heading>

        <Stack spacing={6}>
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            borderRadius="lg"
            p={8}
            shadow="base"
            textAlign="left"
          >
            <Heading as="h2" size="lg" mb={4}>
              Notre Mission
            </Heading>
            <Flex align="center" mb={4}>
              <FaStar size="24px" color={useColorModeValue('green.500', 'green.300')} />
              <Text ml={3}>
                Nous nous engageons à fournir des solutions innovantes et de haute qualité pour
                améliorer le quotidien de nos clients. Notre objectif est de créer un impact
                positif et durable à travers nos produits et services.
              </Text>
            </Flex>

            <Heading as="h2" size="lg" mb={4}>
              Nos Valeurs
            </Heading>
            <Flex align="center" mb={4}>
              <FaHeart size="24px" color={useColorModeValue('green.500', 'green.300')} />
              <Text ml={3}>
                Nous croyons en l'intégrité, la transparence et l'engagement envers l'excellence.
                Chaque membre de notre équipe partage ces valeurs et travaille ensemble pour
                atteindre nos objectifs communs avec passion et dévouement.
              </Text>
            </Flex>
          </Box>

          <Box
            bg={useColorModeValue('white', 'gray.700')}
            borderRadius="lg"
            p={8}
            shadow="base"
            textAlign="center"
          >
            <Heading as="h2" size="lg" mb={4}>
              Notre Équipe
            </Heading>
            <Flex wrap="wrap" spacing={6} gap={12} justify="center">
              {teamMembers.map((member) => (
                <VStack key={member.name} spacing={4} textAlign="center">
                  <Avatar name={member.name} src={member.image} size="xl" />
                  <Text fontWeight="bold">{member.name}</Text>
                  <Text color={useColorModeValue('gray.600', 'gray.400')}>{member.role}</Text>
                </VStack>
              ))}
            </Flex>
          </Box>
        </Stack>
      </VStack>
    </Flex>
  )
}

export default Propos
