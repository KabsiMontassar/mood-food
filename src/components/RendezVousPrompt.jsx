import React, { useState, useRef } from 'react';
import { Box, Button, Flex, Text, Progress, Heading, Container, useColorModeValue, Spinner ,Center} from '@chakra-ui/react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const steps = [
    { title: 'Choose Issue', description: 'Psychology or Nutrition' },
    { title: 'Select Type', description: 'Annual Checkup or Issues' },
];

const Rendezvousprompt = ({ setIssue, setType, setShowlist }) => {

    const [activeStep, setActiveStep] = useState(0);
    const [direction, setDirection] = useState('right');
    const nodeRef = useRef(null);

    const max = steps.length;
    const progressPercent = (activeStep / max) * 100;

    const handleNext = () => {
        setDirection('right');
        if (activeStep === max - 1) {
            setActiveStep((prev) => prev + 1);
            setTimeout(() => {
                setShowlist(true);
            }, 2000);
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        setDirection('left');
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    const handleIssueSelection = (selectedIssue) => {
        setIssue(selectedIssue);
        handleNext();
    };

    const handleTypeSelection = (selectedType) => {
        setType(selectedType);
        handleNext();
    };

    return (
        <Flex
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            zIndex="9999"
            backgroundColor={useColorModeValue('#FFFCF6', '#1A202C')}
            justifyContent="center"
            alignItems="center"
        >
            <Flex direction="column" maxW="container.md" width="100%" height="100%">
                <Flex justifyContent="space-between" width="100%" p={4}>
                    <Button
                        colorScheme="gray"
                        as="a"
                        href="/"
                        position="absolute"
                        top="4"
                        left="4"
                        background="none"
                        _hover={{
                            bg: 'none',
                            color: useColorModeValue('gray.600', 'gray.400')
                        }}
                    >
                        X
                    </Button>
                    <Button
                        colorScheme="gray"
                        onClick={() => {
                            setIssue('')
                            setType('')
                            setShowlist(true)
                        }}
                        position="absolute"
                        top="4"
                        right="4"
                        background="none"
                        _hover={{
                            bg: 'none',
                            color: useColorModeValue('gray.600', 'whiteAlpha.600')
                        }}
                    >
                        Passer à la recherche
                    </Button>
                </Flex>

                <Box position="relative" mt={8} mx="auto" width="60%">
                    <Progress
                        value={progressPercent}
                        height="10px"
                        width="100%"
                        borderRadius="md"
                        bg={useColorModeValue('gray.200', 'gray.600')}
                        colorScheme="green"
                        hasStripe
                        isAnimated
                        transition="width 0.3s ease-in-out"
                    />
                </Box>

                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={activeStep}
                        nodeRef={nodeRef}
                        timeout={300}
                        classNames={direction === 'right' ? 'slide-right' : 'slide-left'}
                        unmountOnExit
                    >
                        <Box ref={nodeRef} mt={8}>
                            {activeStep === 0 && (
                                <Container maxW="container.sm" >
                                    <Heading textAlign="center" as="h1" size="xl" mb={4}>
                                        Quel type de soins recherchez-vous ?
                                    </Heading>
                                    <Box
                                        bg={useColorModeValue('white', 'gray.800')}
                                        cursor="pointer"
                                        _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                                        border={`1px solid ${useColorModeValue('#758694', '#A0AEC0')}`}
                                        borderRadius="md"
                                        p={4}
                                        mb={4}
                                        onClick={() => handleIssueSelection('Annual physical / checkup')}
                                    >
                                        <Text>Examen médical annuel / bilan de santé</Text>
                                        <Text color={useColorModeValue('gray.500', 'gray.400')}>
                                            Examen complet
                                        </Text>
                                    </Box>
                                    <Box
                                        bg={useColorModeValue('white', 'gray.800')}
                                        cursor="pointer"
                                        _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                                        border={`1px solid ${useColorModeValue('#758694', '#A0AEC0')}`}
                                        borderRadius="md"
                                        p={4}
                                        onClick={() => handleIssueSelection('Issue / Condition / Problem')}
                                    >
                                        <Text>J'ai besoin de soins pour un problème, une condition ou une difficulté.</Text>
                                        <Text color={useColorModeValue('gray.500', 'gray.400')}>
                                            Trouvez un traitement pour un problème spécifique ou un problème persistant.
                                        </Text>
                                    </Box>
                                </Container>
                            )}
                            {activeStep === 1 && (
                                <Container maxW="container.sm">
                                    <Heading textAlign="center" as="h1" size="xl" mb={4}>
                                        Quel est le principal problème que vous souhaitez aborder ?
                                    </Heading>
                                    <Box
                                        bg={useColorModeValue('white', 'gray.800')}
                                        cursor="pointer"
                                        _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                                        border={`1px solid ${useColorModeValue('#758694', '#A0AEC0')}`}
                                        borderRadius="md"
                                        p={4}
                                        mb={4}
                                        onClick={() => handleTypeSelection('Psychology')}
                                    >
                                        <Text>Problème de psychologie</Text>
                                        <Text color={useColorModeValue('gray.500', 'gray.400')}>
                                            Problèmes de santé mentale et de bien-être
                                        </Text>
                                    </Box>
                                    <Box
                                        bg={useColorModeValue('white', 'gray.800')}
                                        cursor="pointer"
                                        _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                                        border={`1px solid ${useColorModeValue('#758694', '#A0AEC0')}`}
                                        borderRadius="md"
                                        p={4}
                                        onClick={() => handleTypeSelection('Nutrition')}
                                    >
                                        <Text>Problème de nutrition</Text>
                                        <Text color={useColorModeValue('gray.500', 'gray.400')}>
                                            Problèmes liés à l'alimentation et à la nutrition
                                        </Text>
                                    </Box>
                                    <Button
                                        mt={4}
                                        colorScheme="gray"
                                        onClick={handlePrev}
                                        border={`1px solid #758694`}
                                        bg="none"
                                        _hover={{
                                            bg: 'none',
                                            color: 'gray.400'
                                        }}
                                    >
                                        Retour
                                    </Button>
                                </Container>
                            )}
                            {activeStep === 2 && (
                                <Container maxW="container.sm">
                                    <Heading textAlign="center" as="h1" size="xl" mb={4} 
                                    letterSpacing={3} color="green.800">
                                   
                                        Merci pour votre sélection ! Nous allons maintenant vous montrer la liste des médecins disponibles.</Heading>
                                   <Center>
                                   <Spinner
                                        thickness='4px'
                                        speed='0.65s'
                                        emptyColor='gray.200'
                                        color='green.500'
                                        size='xl'
                                        alignContent={"center"} justifyContent={"center"}
                                    />
                                   </Center>
                                  
                                </Container>
                            )}
                        </Box>
                    </CSSTransition>
                </SwitchTransition>
            </Flex>
        </Flex>
    );
};

export default Rendezvousprompt;
