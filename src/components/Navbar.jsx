import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
  useToast,
  Image,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../Pages/auth/AuthContext';
import logo from '../assets/logo.png';

export default function NavigationBar({ OpenAuth }) {
  const { isUserSignedIn, signOut } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignOut = () => {
    signOut();
    navigate('/');
    toast({
      title: 'Signed Out',
      description: 'You have successfully signed out',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSignIn = () => {
    OpenAuth();
  };

  const handleFixerRendezVous = () => {
    if (isUserSignedIn) {
      navigate('/Rendezvous');
    } else {
      toast({
        title: 'Sign In Required',
        description: 'You need to sign in first',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%" p={4} bg="white" boxShadow="md">
      <Flex w="100%" // Make sure this container takes the full width of the viewport
        justify="space-between"
        align="center"
        wrap="wrap">
        {/* Logo and Brand */}
        <Flex align="center" cursor="pointer" onClick={() => navigate('/')}>
          <Image src={logo} alt="logo" boxSize="50px" />
          <Text ml={3} fontSize="lg" fontWeight="bold" color="gray.600">
            Mood & Food
          </Text>
        </Flex>

        {/* Hamburger Icon for Mobile */}
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          onClick={onToggle}
          display={{ base: 'block', lg: 'none' }}
          aria-label="Toggle Navigation"
        />

        <HStack
          as="nav"
          spacing={8}
          display={{ base: 'none', md: 'none', lg: 'flex' }}
          fontWeight="bold"
          fontSize="md"
          color="gray.600"
        >
          {NAV_ITEMS.map((item) => (
            <Text
              key={item.label}
              cursor="pointer"
              as="ins"
              _hover={{ color: 'gray.800' }}
              onClick={() => navigate(item.href)}
            >
              {item.label}
            </Text>
          ))}
        </HStack>


        {/* User Actions */}
        <HStack spacing={6} display={{ base: 'none', lg: 'flex' }}>
          <Button color="white" bg="black" _hover={{ opacity: 0.8 }} onClick={handleFixerRendezVous}>
            Fixer un rendez-vous
          </Button>
          {isUserSignedIn ? (
            <>
              <Button
                fontWeight={600}
                variant="link"
                color="green.500"
                _hover={{ color: 'green.600' }}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
              <IconButton
                variant="solid"
                colorScheme="green"
                icon={<FaUser />}
                onClick={() => navigate('/profile')}
              />
            </>
          ) : (
            <Button colorScheme="green" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </HStack>
      </Flex>

      {/* Mobile Navigation */}
      <Collapse in={isOpen} animateOpacity>
        <VStack
          bg="white"
          p={3}
          display={{ base: 'flex', lg: 'none' }}
          flexDirection="column"
          fontWeight="bold"
          fontSize="md"
          color="gray.600"
          spacing={4}
          align="start"
        >
          {NAV_ITEMS.map((item) => (
            <Text
              key={item.label}
              cursor="pointer"
              _hover={{ color: 'gray.800' }}
              as="ins"
              onClick={() => {
                navigate(item.href);
                onToggle();
              }}
            >
              {item.label}
            </Text>
          ))}

          <Button

            colorScheme="black"
            variant="solid"
            bg="black"
            mt={2}
            color="white"
            fontSize="md"
            onClick={() => {
              handleFixerRendezVous();
              onToggle();
            }}
          >
            Fixer un rendez-vous
          </Button>

          {isUserSignedIn ? (
            <>
              <Button
                variant="outline"
                colorScheme='green'
                 
                onClick={() => {
                  navigate('/profile');
                  onToggle();
                }}
              >
                Profile
              </Button>
              <Button

                _hover={{ bg: 'transparent' }}
               
                variant="ghost"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button colorScheme="green" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </VStack>
      </Collapse>
    </Box>
  );
}

const NAV_ITEMS = [
  {
    label: 'Bien-être',
    href: '/Product',
  },
  {
    label: 'Cuisine & Bienfaits',
    href: '/recipes',
  },
  {
    label: 'Qui sommes-nous?',
    href: '/Propos',
  },
];
