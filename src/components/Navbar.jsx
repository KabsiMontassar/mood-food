import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  useToast,
  useColorMode,
  Image ,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import SignUpPage from "../Pages/auth/SignUpPage";
import SignInPage from "../Pages/auth/SignInPage";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,MoonIcon, SunIcon
} from '@chakra-ui/icons';
import { FaUser } from "react-icons/fa";



export default function WithSubnavigation({ isUserSignedIn, setIsUserSignedIn}) {

  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();

 


  useEffect(() => {
    const isUserSignedIn = localStorage.getItem('isUserSignedIn');
    if (isUserSignedIn === 'true') {
      setIsUserSignedIn(true);
    } else {
      setIsUserSignedIn(false);
    }
  }, [setIsUserSignedIn]);

  const SignOut = () => {
    localStorage.setItem('isUserSignedIn', false);
    setIsUserSignedIn(false);
    navigate('/');
    toast({
      title: "Signed Out",
      description: "You have successfully signed out",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  

  const handleSignIn = () => {

  
    localStorage.setItem('isUserSignedIn', true);


    setIsUserSignedIn(true);
    toast({
      title: "Signed In",
      description: "You have successfully signed in",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }
  


  const handleFixerRendezVous = () => {
    if (isUserSignedIn) {
      navigate('/Rendezvous');
    } else {
      toast({
        title: "Sign In",
        description: "You have to sign in first",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box  zIndex={3} w="100%" >
      <Flex
        bg= {useColorModeValue('#FFFCF6', 'gray.800')}

       color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        // borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} alignItems="center">
             

           <Flex > 
            
           
              <Image   width="50px"src={logo} alt="logo"  />
            
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}  alignItems="center">
            <DesktopNav navigate={navigate} />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
  <Button 
        as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
             userSelect="none"
            fontWeight={800}
            cursor="pointer"
            color={useColorModeValue('white', 'black')}
            bg={useColorModeValue('black', 'white')}
            onClick={() => handleFixerRendezVous()}
            _hover={{
              opacity: '0.8',
            }}
          >
            Fixer un rendez-vous
          </Button>
        {  isUserSignedIn ? 
        <>
      
        <Button  fontSize={'sm'} color="#64A87A" fontWeight={600} variant={'link'} onClick={SignOut} _hover={{
              color: '#96C970',
            }} >
            Sign Out
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg="#64A87A"
            href={'/profile'}
            _hover={{
              bg: '#96C970',
            }}>
             <FaUser />
          </Button>
          </>
          :
        
          <Button  as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg="#64A87A"
            onClick={() => handleSignIn()}
            _hover={{
              bg: '#96C970',
             
            }}
            //  href={'/SignIn'}
            >
            Sign In
          </Button>
      } 
       
          <IconButton
            size={'md'}
            variant={'ghost'}
            aria-label={'Toggle Color Mode'}
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />

        


        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav navigate={navigate} handleFixerRendezVous={handleFixerRendezVous} isUserSignedIn={isUserSignedIn} SignOut={SignOut}   handleSignIn={handleSignIn} />
      </Collapse>

      {/* Sign In Modal */}
      <Modal isOpen={isModalOpen && modalType === 'signin'} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignInPage setIsUserSignedIn={setIsUserSignedIn} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Sign Up Modal */}
      <Modal isOpen={isModalOpen && modalType === 'signup'} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SignUpPage />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

const DesktopNav = ({ navigate }) => {
  const linkColor = 'gray.600';
  const linkHoverColor = 'gray.800';
  const popoverContentBgColor = 'white';

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Text
                p={2}
                cursor="pointer"
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
                onClick={() => navigate(navItem.href)}>
            
                {navItem.label}
              </Text>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                borderRadius={3}
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} navigate={navigate} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, navigate }) => {
  return (
    <Box
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
      onClick={() => navigate(href)}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({ navigate, handleFixerRendezVous, isUserSignedIn, SignOut  , handleSignIn}) => {
  return (
    <Stack bg='white' p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} navigate={navigate} />
      ))}
      <Button
        as={'a'}

        fontSize={'sm'}
        userSelect="none"
        fontWeight={800}
        cursor="pointer"
        bg="none"
        left={0}
        _hover={{
          opacity: '0.8',
        }}
        onClick={() => handleFixerRendezVous()}
      >
        Fixer un rendez-vous
      </Button>
      <br />
      {isUserSignedIn ?
        <>
         
          <Button
            as={'a'}

            fontSize={'sm'}
            userSelect="none"
            fontWeight={800}
            cursor="pointer"
            bg="none"
            onClick={SignOut}
            left={0}
            _hover={{
              opacity: '0.8',
            }} >
            Sign Out
          </Button>
          <br />
          <Button
            as={'a'}

            fontSize={'sm'}
            userSelect="none"
            fontWeight={800}
            cursor="pointer"
            bg="none"
            left={0}
            _hover={{
              opacity: '0.8',
            }}
            href={'/profile'}
          >
            Profile
          </Button>
        </>
        :

        <Button 

          as={'a'}

          fontSize={'sm'}
          userSelect="none"
          fontWeight={800}
          cursor="pointer"
          bg="none"
          left={0}
          _hover={{
            opacity: '0.8',
          }}
          onClick={() => handleSignIn()}

        >
          Sign In
        </Button>
      }

    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, navigate }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Button}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
        onClick={() => navigate(href)}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Button key={child.label} py={2} onClick={() => navigate(child.href)}>
                {child.label}
              </Button>
            ))}
        </Stack>
      </Collapse>

    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Accueil',
    href: '/',
  },
  {
    label: 'À propos',
    href: '/propos',
   
  },
  {
    label: 'Bien-être',
    href: '/Bien',
   
  }, 
  { label: 'Recipes', href: '/recipes' },  // Added Recipes route
  {
    label: 'Cuisine & Bienfaits',
    href: '/Cuisine',
   
  },
 
  {
    label: 'Contactez-nous',
    href: '/contact',
  },
  {
    label: 'Produit',
    href: '/Product',
  },




  {
    label: 'backoffice',
    children: [
      {
        label: 'User',
        href: '/User',
      },
      {
        label: 'Commande',
        href: '/Commande',
      },
      {
        label: 'Equipement',
        href: '/Equipement',
      },
      {
        label: 'Repas',
        href: '/Repas',
      }
    ],
  }
];