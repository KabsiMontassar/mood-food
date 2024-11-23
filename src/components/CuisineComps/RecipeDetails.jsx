import React, { useState, useEffect } from 'react';
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

    Spinner,
    Flex,
} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig.jsx';

const RecipeDetails = ({ expandedRecipe, isDrawerOpen, closeDrawer }) => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);
    const images = expandedRecipe.image;
    const [selectedImage, setSelectedImage] = useState(images[0]);

    useEffect(() => {
        if (expandedRecipe && expandedRecipe.ingridiants) {
            const fetchIngredients = async () => {
                setLoading(true);
                try {
                    const ingredientsPromises = expandedRecipe.ingridiants.map(async (ingredientRef) => {
                        const ingredientDoc = doc(db, ingredientRef.path);
                        const docSnapshot = await getDoc(ingredientDoc);
                        return { id: docSnapshot.id, ...docSnapshot.data() };
                    });
                    const ingredientsData = await Promise.all(ingredientsPromises);
                    setIngredients(ingredientsData);
                } catch (error) {
                    console.error("Error fetching ingredients: ", error);
                }
                setLoading(false);
            };

            fetchIngredients();
            console.log("fetching ingredients");
            console.log(ingredients);
        }
    }, [isDrawerOpen]);

    return (
        <Drawer isOpen={isDrawerOpen} placement={'right'} onClose={closeDrawer}>
            <DrawerOverlay />
            <DrawerContent maxW={{ base: '100%', md: '90%' }}>
                <DrawerCloseButton />
                <DrawerHeader bg="#549D7B">
                    <Heading size="lg">{expandedRecipe?.name}</Heading>
                </DrawerHeader>
                <DrawerBody p={5} bg="linear-gradient(180deg, rgba(10, 115, 66, 0.7) 0%, white 100%)">


                    <Box borderRadius="md" bg="transparent" mb={4}>
                        <Image
                            borderRadius="md"
                            src={selectedImage}
                            alt={expandedRecipe.name}
                            w="100%"
                            fit="contain"
                            h={{ base: '250px', md: '300px', lg: '400px' }}
                            objectPosition="center"
                        />
                    </Box>

                    <Flex
                        direction="row"
                        overflowX="hidden"

                        justifyContent="center"
                        mb={4}

                    >
                        {images.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                boxSize={{ base: '50px', md: '75px', lg: '100px' }}
                                objectFit="cover"
                                border={selectedImage === img ? '2px solid teal' : 'none'}
                                cursor="pointer"
                                mx={2}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </Flex>


                    <Box px={4} py={2}>
                        <HStack justifyContent={'space-between'} mb={4}>
                            <Badge fontSize="md" colorScheme="teal">
                                {expandedRecipe?.mealType}
                            </Badge>
                            <HStack>
                                <FaClock />
                                <Text>{expandedRecipe?.time} mins</Text>
                            </HStack>
                        </HStack>

                        <Heading size="md" color="teal" fontWeight={'bold'} mb={2}>
                            Description
                        </Heading>
                        <Text fontSize="md" color="gray.700" mb={4}>
                            {expandedRecipe?.guideDescritpion}
                        </Text>

                        <Divider my={4} />

                        <Heading size="md" color="teal" fontWeight={'bold'} mb={2}>
                            Ingredients
                        </Heading>
                        {loading ? (
                            <Spinner size="lg" color="teal" />
                        ) : (
                            <HStack my={5} pl={4} align="flex-start" spacing={2}>
                                {ingredients.map((ingredient, index) => (
                                    <Box
                                        align="center"
                                        p={4}
                                        borderWidth={1}
                                        borderRadius="lg"
                                        boxShadow="md"
                                        borderColor="teal.300"
                                        width={{ base: '5%', md: '10%' }}
                                    >
                                        <Text fontWeight="bold" color="black">
                                            {ingredient.name}   
                                        </Text>
                                        <Image fontSize="lg" src={ingredient.image} />
                                    </Box>
                                ))}
                            </HStack>
                        )}

                        <Divider my={4} />


                        <Heading size="md" color="teal" fontWeight={'bold'} mb={2}>
                            Nutrition Information
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
                                    Carbohydrates
                                </Text>
                                <Text fontSize="lg">{expandedRecipe?.carbohydrate} g</Text>
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
                                    Lipides
                                </Text>
                                <Text fontSize="lg">{expandedRecipe?.lipide} g</Text>
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


                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default RecipeDetails;
