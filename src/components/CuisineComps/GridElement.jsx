import React from 'react';
import {
    Box,
    Grid,
    Text,
    Flex,
} from '@chakra-ui/react';
import RecipeElement from './RecipeElement';

const GridElement = ({ sortedRecipes, handleRecipeClick }) => {
    return (
        <Flex direction="column" >
            <Box w="100%">
                <Grid
                    templateColumns={{ base: 'repeat(auto-fit, minmax(200px, 1fr))', md: 'repeat(auto-fit, minmax(200px, 1fr))', lg: 'repeat(2, 1fr)' }}
                    gap={6}
                    p={{ base: 3, md: 6 }}
                >
                    {sortedRecipes.length > 0 ? (
                        sortedRecipes.map((recipe) => (
                            <RecipeElement
                                key={recipe.id}
                                recipe={recipe}
                                onClick={() => handleRecipeClick(recipe)}
                            />
                        ))
                    ) : (
                        <Text textAlign="center" fontSize="lg" color="gray.500">
                            No recipes found based on your filters.
                        </Text>
                    )}
                </Grid>
            </Box>
        </Flex>
    )

}



export default GridElement;