import React, { useState } from 'react';
import { Flex, Box, Button, Text, useBreakpointValue,Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import signinimage from '../../assets/imsignin.png';
import signupimage from '../../assets/imsignup.png';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import bg from '../../assets/bg.png';
import logo from '../../assets/logo.png';

const MotionBox = motion(Box);

const SplitLayout = () => {
    const [activeBox, setActiveBox] = useState("left");
    const [contentVisible, setContentVisible] = useState("left");

    const isDesktop = useBreakpointValue({ base: false, md: true });

    const handleReveal = (box) => {
        if (!isDesktop) return;  
        setContentVisible(null);
        setActiveBox(box);

        setTimeout(() => {
            setContentVisible(box);
        }, 500);
    };

    return (
        <Flex

            width="100vw"
            top="0"
            position={'absolute'}
            backgroundColor='#FFFFFF'
            justifyContent="center"
            alignItems="center"
            
        >

            {isDesktop ? (
                <Flex
                    direction={{ md: 'row' }}
                    width="100%"
                    height="100vh"
                    justifyContent="center"
                    alignItems="center"
                   
                >
  

                    <MotionBox
                    
                        bgImage={contentVisible === 'right' ? `url(${signinimage})` : `url(${bg})`}
                        bgSize="cover"
                        bgPosition="center"
                        height="100%"
                        bgRepeat="no-repeat"
                        flex={activeBox === 'left' ? '2' : '1'}
                        animate={{ flex: activeBox === 'left' ? 2 : 1 }}
                        initial={{ flex: 1 }}
                        transition={{ duration: 0.6 }}
                        width={{ base: '100%', md: 'auto' }}
                    >
                      

                      

                        <Flex
                          bg={contentVisible === 'right' ? 'rgba(94, 218, 188, 0.3)' : 'rgba(94, 218, 188, 0)'}

                         height="100%" justifyContent="center" align="center">
                            <Flex direction="column" justifyContent="center" alignItems="center">
                            {contentVisible === 'left' && (
                                    <Flex direction="column" alignItems="center" justifyContent="center">
                                        <Text fontSize={{ base: 'md', md: '2xl' }} color="#5EDABC" mt={4}>
                                            Se Connecter
                                        </Text>
                                        <SignInPage />
                                    </Flex>
                                )}


                                <Image src={logo} alt="logo" 
                                  onClick={() => window.location.href = '/'}
                                cursor="pointer"
                                display={activeBox === 'right' ? 'block' : 'none' }
                                width={{ base: '50px', md: '75px' }}
                                 height={{ base: '50px', md: '75px' }}
                                  />
                                 
                                <Text
                                    display={activeBox === 'left' ? 'none' : 'block'}
                                    fontSize={{ base: 'md', md: 'xl' }}
                                    color="teal"
                                    mt={4}
                                >
                                    Vous avez Déjà un compte ?
                                </Text>
                                <Button
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    variant="outline"
                                    _hover={{ bg: 'transparent', color: 'teal.400' }}
                                    colorScheme="teal"
                                    borderRadius="2xl"
                                    display={activeBox === 'left' ? 'none' : 'block'}
                                    mt={4}
                                    onClick={() => handleReveal('left')}
                                >
                                    Se Connecter
                                </Button>
                            </Flex>
                        </Flex>
                        
                    </MotionBox>


                    <MotionBox
                        bgImage={contentVisible === 'left' ? `url(${signupimage})` : `url(${bg})`}
                        bgSize="cover"
                        bgPosition="center"
                        height="100%"
                      
                       
                        bgRepeat="no-repeat"
                        flex={activeBox === 'right' ? '2' : '1'}
                        animate={{ flex: activeBox === 'right' ? 2 : 1 }}
                        initial={{ flex: 1 }}
                        transition={{ duration: 0.6 }}
                        width={{ base: '100%', md: 'auto' }}
                    >
                        <Flex  
                       
                        bg={contentVisible === 'left' ? 'rgba(94, 218, 188, 0.3)' : 'rgba(94, 218, 188, 0)'}
                         height="100%"
                          justifyContent="center" 
                          align="center">
                            <Flex direction="column" justifyContent="center" alignItems="center">
                                {contentVisible === 'right' && (
                                    <Flex direction="column" alignItems="center" justifyContent="center">
                                        <Text fontSize={{ base: 'md', md: '2xl' }} color="#5EDABC" mt={4}>
                                            Créer un compte
                                        </Text>
                                        <SignUpPage />
                                    </Flex>
                                )}
                                <Image src={logo} alt="logo" 
                                onClick={() => window.location.href = '/'}
                                cursor="pointer"
                                display={activeBox === 'left' ? 'block' : 'none' }
                                width={{ base: '50px', md: '75px' }}
                                 height={{ base: '50px', md: '75px' }}
                                  />
                                <Text
                                    display={activeBox === 'right' ? 'none' : 'block'}
                                    fontSize={{ base: 'md', md: 'xl' }}
                                    color="teal"
                                    mt={4}
                                >
                                    Vous n'avez pas de compte ?
                                </Text>
                                <Button
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    variant="outline"
                                    _hover={{ bg: 'transparent', color: 'teal.400' }}
                                    colorScheme="teal"
                                    borderRadius="2xl"
                                    display={activeBox === 'right' ? 'none' : 'block'}
                                    mt={4}
                                    onClick={() => handleReveal('right')}
                                >
                                    Inscrivez-vous
                                </Button>
                            </Flex>
                        </Flex>
                    </MotionBox>
                </Flex>
            ) : (

                <Flex direction="column" width="100%" height="100vh" mt="4.5rem" justifyContent="center" alignItems="center">


                    <Button
                        colorScheme="gray"
                        borderRadius={0}
                        p={2}
                        alignSelf="flex-end"
                        bg="transparent"
                        opacity={0.8}
                        _hover={{ bg: 'transparent', color: 'gray.600', opacity: '1' }}
                        display={{ base: 'block', md: 'none' }}
                        onClick={() => window.location.href = '/'}
                    >
                        X
                    </Button>
                    {activeBox === 'left' ? (
                        <Flex direction="column" alignItems="center">
                        {contentVisible === 'right' && (
                  <Flex direction="column" alignItems="center" justifyContent="center">
                    <Text fontSize={{ base: 'md', md: '2xl' }} color="teal" mt={4}>
                      Créer un compte
                    </Text>
                    <SignUpPage />
                  </Flex>
                )}
                            <SignInPage />
                            <Text fontSize="md" color="teal" mt={4}>
                                Vous n'avez pas de compte ?
                            </Text>
                            <Button
                                fontSize="sm"
                                variant="outline"
                                _hover={{ bg: 'transparent', color: 'teal.400' }}
                                colorScheme="teal"
                                borderRadius="2xl"
                                mt={4}
                                onClick={() => setActiveBox('right')}
                            >
                                Inscrivez-vous
                            </Button>
                        </Flex>
                    ) : (
                        <Flex direction="column" alignItems="center">
                            <Text fontSize="md" color="teal" mt={4}> Créer un compte</Text>
                            <SignUpPage />
                            <Text fontSize="md" color="teal" mt={4}>
                                Vous avez déjà un compte ?
                            </Text>
                            <Button
                                fontSize="sm"
                                variant="outline"
                                _hover={{ bg: 'transparent', color: 'teal.400' }}
                                color="#5EDABC"
                                borderRadius="2xl"
                                mt={4}
                                onClick={() => setActiveBox('left')}
                            >
                                Se Connecter
                            </Button>
                        </Flex>
                    )}
                </Flex>
            )}
        </Flex>
    );
};

export default SplitLayout;
