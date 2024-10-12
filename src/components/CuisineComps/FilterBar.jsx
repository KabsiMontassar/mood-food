import React from 'react';
import {
    HStack,
    Button,
    Flex,
    IconButton,
} from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';

const FilterBar = ({ activeFilterType, setActiveFilterType, selectedMealType, handleMealTypeChange, selectedSortBy, handleNutritionSortChange }) => {
    return (
        <Flex
            position="fixed"
            bottom={0}
            left={0}
            right={0}
            bg="white"
            height={{ base: 'auto', md: '80px' }}
            borderTop="2px solid rgba(228, 116, 102, .3)"
            zIndex={999}
            justify="space-between"
            flexWrap="wrap"

            alignItems="center"
            p={4}
        >
            <Flex spacing={0} position="absolute" left={0}>
                {activeFilterType === 'mealType' ? (
                    <IconButton
                        variant="outline"
                        size="lg"
                        borderRadius="0"
                        border="0"
                        onClick={() => setActiveFilterType('nutrition')}
                        colorScheme="orange"
                        icon={<FaBowlFood />}
                        _hover={{ bg: 'transparent' }}
                    />
                ) : (
                    <IconButton
                        size="lg"
                        colorScheme="orange"
                        variant="outline"
                        onClick={() => setActiveFilterType('mealType')}
                        border="0"
                        borderRadius="0"
                        icon={<FaClock />}
                        _hover={{ bg: 'transparent' }}
                    />
                )}
            </Flex>

            {/* Filter by Meal Type */}
            {activeFilterType === 'mealType' && (
                <HStack
                    w="100%"

                    spacing={4} flexWrap="wrap" justifyContent="center"
                >
                    <Button colorScheme="gray" fontSize={"xs"} variant="link" isDisabled>
                        Filtrer par:
                    </Button>
                    {['', 'breakfast', 'lunch', 'dinner', 'dessert'].map((type) => (
                        <Button
                            key={type}
                            colorScheme={selectedMealType === type ? 'orange' : 'gray'}
                            variant="link"
                            onClick={() => handleMealTypeChange(type)}
                        >
                            {type || 'All'}
                        </Button>
                    ))}
                </HStack>
            )}

            {/* Sort by Nutrition */}
            {activeFilterType === 'nutrition' && (
                <HStack w="100%" spacing={4} flexWrap="wrap" justifyContent="center">
                    <Button colorScheme="gray" fontSize={"xs"} variant="link" isDisabled>
                        Trier par:
                    </Button>
                    {['protein', 'calories', 'carbohydrates', 'fats', 'fiber'].map((nutrient) => (
                        <Button
                            key={nutrient}
                            colorScheme={selectedSortBy === nutrient ? 'orange' : 'gray'}
                            variant="link"
                            onClick={() => handleNutritionSortChange(nutrient)}
                        >
                            {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
                        </Button>
                    ))}
                </HStack>
            )}
        </Flex>
    )
}


export default FilterBar;