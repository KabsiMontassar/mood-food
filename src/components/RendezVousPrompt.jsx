import React, { useState, useRef } from 'react';
import { Box, Button, Flex, Text, Progress, Heading, Container } from '@chakra-ui/react';
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
            backgroundColor="#FFFCF6"
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
                            color: 'gray.500'
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
                            color: 'gray.500'
                        }}
                    >
                        Skip to search
                    </Button>
                </Flex>

                <Box position="relative" mt={8} mx="auto" width="60%">
                    <Progress
                        value={progressPercent}
                        height="10px"
                        width="100%"
                        borderRadius="md"
                        bg="gray.200"
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
                                        What type of care are you looking for?
                                    </Heading>
                                    <Box
                                        cursor="pointer"
                                        _hover={{ bg: 'gray.100' }}
                                        border="1px solid  #758694"
                                        borderRadius="md"
                                        p={4}
                                        mb={4}
                                        onClick={() => handleIssueSelection('Annual physical / checkup')}
                                    >
                                        <Text>Annual physical / checkup</Text>
                                        <Text color="gray.500">
                                            Comprehensive physical examination
                                        </Text>
                                    </Box>
                                    <Box
                                        _hover={{ bg: 'gray.100' }}
                                        cursor="pointer"
                                        border="1px solid  #758694"
                                        borderRadius="md"
                                        p={4}
                                        onClick={() => handleIssueSelection('Issue / Condition / Problem')}
                                    >
                                        <Text>I need care for an issue, condition or problem</Text>
                                        <Text color="gray.500">
                                            Find treatment for a specific issue or ongoing problem
                                        </Text>
                                    </Box>
                                </Container>
                            )}
                            {activeStep === 1 && (
                                <Container maxW="container.sm">
                                    <Heading textAlign="center" as="h1" size="xl" mb={4}>
                                        What is the main issue you want to address?
                                    </Heading>
                                    <Box
                                        cursor="pointer"
                                        _hover={{ bg: 'gray.100' }}
                                        border="1px solid  #758694"
                                        borderRadius="md"
                                        p={4}
                                        mb={4}
                                        onClick={() => handleTypeSelection('Psychology')}
                                    >
                                        <Text>Psychology Issue</Text>
                                        <Text color="gray.500">
                                            Problems with mental health and well-being
                                        </Text>
                                    </Box>
                                    <Box
                                        _hover={{ bg: 'gray.100' }}
                                        cursor="pointer"
                                        border="1px solid  #758694"
                                        borderRadius="md"
                                        p={4}
                                        onClick={() => handleTypeSelection('Nutrition')}
                                    >
                                        <Text>Nutrition Issue</Text>
                                        <Text color="gray.500">
                                            Problems with diet and nutrition
                                        </Text>
                                    </Box>
                                    <Button
                                        mt={4}
                                        colorScheme="gray"
                                        onClick={handlePrev}

                                        border="1px solid  #758694"
                                        bg="none"
                                        _hover={{
                                            bg: 'none',
                                            color: 'gray.500'
                                        }}
                                    >
                                        Back
                                    </Button>
                                </Container>
                            )}
                            {activeStep === 2 && (
                                <Container maxW="container.sm">
                                    <Heading textAlign="center" as="h1" size="xl" mb={4}>
                                        Thank you for your selection! We will now show you the list of available doctors.
                                    </Heading>
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