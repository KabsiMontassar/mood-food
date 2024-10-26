import React from 'react';
import {
    Box,
    Heading,
    HStack,
    Image,
    Badge,
    Text,
    Divider,
    VStack,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';

const RecipeDetails = ({ expandedRecipe, isDrawerOpen, closeDrawer }) => {
    return (
        <Drawer isOpen={isDrawerOpen} placement={'right'} onClose={closeDrawer}>
            <DrawerOverlay />
            <DrawerContent maxW={{ base: '100%', md: '90%' }}>
                <DrawerCloseButton />
                <DrawerHeader bg="#549D7B">
                    <Heading size="lg">{expandedRecipe?.name}</Heading>
                </DrawerHeader>
                <DrawerBody p={5} bg="linear-gradient(180deg, rgba(10, 115, 66, 0.7) 0%, white 100%)">
                    <Grid

                        templateRows={{ base: 'auto auto', md: '1fr' }}
                        gap={4}
                    >
                        <GridItem
                            borderRadius="lg"
                            position="relative"

                            overflow="hidden"
                            maxH={{ base: 'auto', md: '100%' }}
                            bg="white"
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            <Image
                                borderRadius="lg"
                                src={expandedRecipe?.image}
                                alt={expandedRecipe?.name}
                                objectFit="cover"
                                fit="contain"
                                w="100%"
                                h={{ base: '250px', md: '300px', lg: '400px' }}

                                objectPosition="center"

                            />
                        </GridItem>

                        <GridItem overflowY={{ base: 'visible', md: 'auto' }}>
                            <Box px={4} py={2}>
                                <HStack justifyContent={'space-between'} mb={4}>
                                    <Badge fontSize="md" colorScheme="teal">
                                        {expandedRecipe?.mealType}
                                    </Badge>
                                    <HStack>
                                        <FaClock />
                                        <Text>{expandedRecipe?.cookingTime} mins</Text>
                                    </HStack>
                                </HStack>

                                <Heading size="md" color="teal" fontWeight={'bold'} mb={2}>
                                    Description
                                </Heading>
                                <Text fontSize="md" color="gray.700" mb={4}>
                                    {expandedRecipe?.description}
                                </Text>

                                <Divider my={4} />

                                <Heading size="md" color="teal" fontWeight={'bold'} mb={2}>
                                    Ingredients
                                </Heading>
                                <VStack pl={4} align="flex-start" spacing={1}>
                                    {expandedRecipe?.ingredients.map((ingredient, index) => (
                                        <Text key={index} fontSize="md" color="gray.700">
                                            - {ingredient}
                                        </Text>
                                    ))}
                                </VStack>

                                <Divider my={4} />

                                <Heading size="md" color="teal" fontWeight={'bold'} mb={2}>
                                    Instructions
                                </Heading>
                                <VStack align="flex-start" spacing={1}>


                                    {expandedRecipe?.cookingInstructions?.split('.').slice(0, -1).map((instruction, index) => (
                                        <React.Fragment key={index}>
                                            <Heading pl={4} size="md" color="green" fontWeight={'500'} mb={2}>
                                                Etape {index + 1}
                                            </Heading>
                                            <Text pl={8} fontSize="md" color="gray.700">
                                                {instruction}.
                                            </Text>
                                        </React.Fragment>
                                    ))}
                                </VStack>

                                <Divider my={4} />

                                <Heading size="md" color="teal" fontWeight={'bold'} mb={2}>
                                    Informations nutritionnelles
                                </Heading>
                                <HStack spacing={4} wrap="wrap" justify="space-around">
                                    <Box
                                        align="center"
                                        p={4}
                                        borderWidth={1}
                                        borderRadius="lg"
                                        boxShadow="md"
                                        borderColor="orange.300"
                                        width={{ base: '45%', md: '20%' }}
                                    >
                                        <Text fontWeight="bold" color="orange.600">
                                            Calories
                                        </Text>
                                        <Text fontSize="lg">{expandedRecipe?.calories} kcal</Text>
                                    </Box>
                                    <Box
                                        align="center"
                                        p={4}
                                        borderWidth={1}
                                        borderRadius="lg"
                                        boxShadow="md"
                                        borderColor="green.300"
                                        width={{ base: '45%', md: '20%' }}
                                    >
                                        <Text fontWeight="bold" color="green.600">
                                            Protein
                                        </Text>
                                        <Text fontSize="lg">{expandedRecipe?.protein} g</Text>
                                    </Box>
                                    <Box
                                        align="center"
                                        p={4}
                                        borderWidth={1}
                                        borderRadius="lg"
                                        boxShadow="md"
                                        borderColor="teal.300"
                                        width={{ base: '45%', md: '20%' }}
                                    >
                                        <Text fontWeight="bold" color="teal.600">
                                            Carbs
                                        </Text>
                                        <Text fontSize="lg">{expandedRecipe?.carbohydrates} g</Text>
                                    </Box>
                                    <Box
                                        p={4}
                                        borderWidth={1}
                                        borderRadius="lg"
                                        align="center"
                                        boxShadow="md"
                                        borderColor="yellow.300"
                                        width={{ base: '45%', md: '20%' }}
                                    >
                                        <Text fontWeight="bold" color="yellow.600">
                                            Fats
                                        </Text>
                                        <Text fontSize="lg">{expandedRecipe?.fats} g</Text>
                                    </Box>
                                    <Box
                                        p={4}
                                        borderWidth={1}
                                        borderRadius="lg"
                                        align="center"
                                        boxShadow="md"
                                        borderColor="blue.300"
                                        width={{ base: '45%', md: '20%' }}
                                    >
                                        <Text fontWeight="bold" color="blue.600">
                                            Fibers
                                        </Text>
                                        <Text fontSize="lg">{expandedRecipe?.fiber} g</Text>
                                    </Box>
                                </HStack>

                                <Divider my={4} />
                            </Box>
                        </GridItem>
                    </Grid>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default RecipeDetails;
