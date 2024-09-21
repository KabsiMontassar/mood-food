import React, { useState, useRef } from 'react';
import { Box, Button, Flex, Text, Progress, Heading, Container, Spinner, Center } from '@chakra-ui/react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import bg from '../../assets/bg.png';
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
            bgImage={`url(${bg})`}
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPos="center"
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            zIndex="9999"
            backgroundColor='white'
            justifyContent="center"
            alignItems="center"
            direction="column"
            p={4}
        > <Flex
                    justifyContent="space-between"
                    width="100%"
                    p={4}
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                >
                    <Button
                        colorScheme="gray"
                        as="a"
                        href="/"
                        background="none"
                        _hover={{ bg: 'none', color: 'gray.600' }}
                       
                    >
                        X
                    </Button>
                    <Button
                        colorScheme="gray"
                        onClick={() => {
                            setIssue('');
                            setType('');
                            setShowlist(true);
                        }}
                        background="none"
                        _hover={{ bg: 'none', color: 'gray.600' }}
                        display={{ base: 'none', md: 'block' }} // Hide on smaller screens
                    >
                        Passer à la recherche
                    </Button>
                </Flex>
            <Flex
                direction="column"
                maxW={{ base: 'full', md: 'container.md' }}
                width="100%"
                height={{ base: 'auto', md: '100%' }}
                position="relative"
                mb={{ base: '60px', md: '0' }} 
            >
               

                <Box position="relative" mt={8} mx="auto" width="100%">
                    <Progress
                        value={progressPercent}
                        height="10px"
                        width="100%"
                        borderRadius="md"
                        bg='gray.200'
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
                                <Container maxW="container.sm">
                                    <Heading textAlign="center" as="h1" size="xl" mb={4}>
                                        Quel type de soins recherchez-vous ?
                                    </Heading>
                                    <Box
                                        bg='white'
                                        cursor="pointer"
                                        _hover={{ bg: 'gray.100' }}
                                        border={`1px solid #758694`}
                                        borderRadius="md"
                                        p={4}
                                        mb={4}
                                        onClick={() => handleIssueSelection('Annual physical / checkup')}
                                    >
                                        <Text>Examen médical annuel / bilan de santé</Text>
                                        <Text color='gray.500'>
                                            Examen complet
                                        </Text>
                                    </Box>
                                    <Box
                                        bg='white'
                                        cursor="pointer"
                                        _hover={{ bg: 'gray.100' }}
                                        border={`1px solid #758694`}
                                        borderRadius="md"
                                        p={4}
                                        onClick={() => handleIssueSelection('Issue / Condition / Problem')}
                                    >
                                        <Text>J'ai besoin de soins pour un problème, une condition ou une difficulté.</Text>
                                        <Text color='gray.500'>
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
                                        bg='white'
                                        cursor="pointer"
                                        _hover={{ bg: 'gray.100' }}
                                        border={`1px solid #758694`}
                                        borderRadius="md"
                                        p={4}
                                        mb={4}
                                        onClick={() => handleTypeSelection('Psychology')}
                                    >
                                        <Text>Problème de psychologie</Text>
                                        <Text color='gray.500'>
                                            Problèmes de santé mentale et de bien-être
                                        </Text>
                                    </Box>
                                    <Box
                                        bg='white'
                                        cursor="pointer"
                                        _hover={{ bg: 'gray.100' }}
                                        border={`1px solid #758694`}
                                        borderRadius="md"
                                        p={4}
                                        onClick={() => handleTypeSelection('Nutrition')}
                                    >
                                        <Text>Problème de nutrition</Text>
                                        <Text color='gray.500'>
                                            Problèmes liés à l'alimentation et à la nutrition
                                        </Text>
                                    </Box>
                                    <Button
                                        mt={4}
                                        colorScheme="gray"
                                        onClick={handlePrev}
                                        border={`1px solid #758694`}
                                        bg="none"
                                        _hover={{ bg: 'none', color: 'gray.400' }}
                                    >
                                        Retour
                                    </Button>
                                </Container>
                            )}
                            {activeStep === 2 && (
                                <Container maxW="container.sm">
                                    <Heading textAlign="center" as="h1" size="xl" mb={4} letterSpacing={3} color="green.800">
                                        Merci pour votre sélection ! Nous allons maintenant vous montrer la liste des médecins disponibles.
                                    </Heading>
                                    <Center>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='green.500'
                                            size='xl'
                                        />
                                    </Center>
                                </Container>
                            )}
                        </Box>
                    </CSSTransition>
                </SwitchTransition>
            </Flex>
            <Button
                colorScheme="gray"
                onClick={() => {
                    setIssue('');
                    setType('');
                    setShowlist(true);
                }}
                position={{ base: 'fixed', md: 'absolute' }}
                bottom={{ base: '4', md: 'auto' }}
                left="50%"
                transform="translateX(-50%)"
                background="none"
                _hover={{ bg: 'none', color: 'gray.600' }}
                display={{ base: 'block', md: 'none' }} // Only show on smaller screens
            >
                Passer à la recherche  
            </Button>
        </Flex>
    );
};

export default Rendezvousprompt;
