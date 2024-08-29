import React , { useEffect , useState} from 'react';
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
  useColorModeValue,
  useDisclosure,
  useToast,
  useColorMode,
  Image ,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

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
    if(isUserSignedIn === 'true'){
      setIsUserSignedIn(true);
    }else{
      setIsUserSignedIn(false);
    }
  }, [])




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
     if(isUserSignedIn){
      navigate('/Rendezvous');
     }else{
      toast({
        title: "Sign In",
        description: "You have to sign in first",
        status: "error",
        duration: 5000,
        isClosable: true,
      })

    }
  }



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
          display={{ base: 'flex', md: 'none' }}>
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
            fontWeight={800}
            color={useColorModeValue('white', 'black')}
            bg={useColorModeValue('black', 'white')}
            onClick={() => handleFixerRendezVous()}
            _hover={{
              opacity: '0.8',
            }} >


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
        <MobileNav navigate={navigate} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ navigate }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

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
                minW={'sm'}>
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
            _groupHover={{ color: '#2BFA70' }}
            fontWeight={500}>
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
          flex={1}>
          <Icon color={'#2BFA70'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({ navigate }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} navigate={navigate} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, navigate }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as="a"
        href={href ?? '#'}
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
              <Box key={child.label} py={2} onClick={() => navigate(child.href)}>
                {child.label}
              </Box>
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
  {
    label: 'Cuisine & Bienfaits',
    href: '/Cuisine',
   
  },
 
  {
    label: 'Contactez-nous',
    href: '/contact',
  },



 
  {
    "label": "backoffice",
    "children": [
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