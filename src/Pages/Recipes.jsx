import React, { useState, useMemo } from 'react';
import {
  Box,
} from '@chakra-ui/react';
import recipes from '../data/recipes';
import FilterBar from '../components/CuisineComps/FilterBar';
import GridElement from '../components/CuisineComps/GridElement';
import RecipeDetails from '../components/CuisineComps/RecipeDetails';
import SearchBar from '../components/CuisineComps/SearchBar';

const backgroundlinear = "linear-gradient(180deg, rgba(10, 115, 66, 0.7) 0%, white 100%)";
const Recipes = () => {
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('protein');
  const [activeFilterType, setActiveFilterType] = useState('mealType');
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMealTypeChange = (mealType) => {
    setSelectedMealType(mealType);
  };

  const handleNutritionSortChange = (nutrient) => {
    setSelectedSortBy(nutrient);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const useFilteredRecipes = (selectedMealType, selectedSortBy, searchTerm) => {
    const filteredRecipes = useMemo(() => {
      return recipes.filter(recipe =>
        (selectedMealType === '' || recipe.mealType.toLowerCase() === selectedMealType.toLowerCase()) &&
        (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }, [selectedMealType, searchTerm]);

    const sortedRecipes = useMemo(() => {
      return [...filteredRecipes].sort((a, b) => {
        switch (selectedSortBy) {
          case 'protein':
            return b.protein - a.protein;
          case 'calories':
            return b.calories - a.calories;
          case 'carbohydrates':
            return b.carbohydrates - a.carbohydrates;
          case 'fats':
            return b.fats - a.fats;
          case 'fiber':
            return b.fiber - a.fiber;
          default:
            return 0;
        }
      });
    }, [selectedSortBy, filteredRecipes]);

    return sortedRecipes;
  };

  const sortedRecipes = useFilteredRecipes(selectedMealType, selectedSortBy, searchTerm);

  const handleRecipeClick = (recipe) => {
    setExpandedRecipe(recipe);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setExpandedRecipe(null);
  };

  return (
    <Box bg={backgroundlinear}>
      <header className='headeroverlay recipes'>
        <div className="overlay">
          <h1>Nourrissez votre corps avec des repas équilibrés</h1>
        </div>
      </header>
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <GridElement sortedRecipes={sortedRecipes} handleRecipeClick={handleRecipeClick} />
      <FilterBar activeFilterType={activeFilterType} setActiveFilterType={setActiveFilterType} selectedMealType={selectedMealType} handleMealTypeChange={handleMealTypeChange} selectedSortBy={selectedSortBy} handleNutritionSortChange={handleNutritionSortChange} />
      <RecipeDetails expandedRecipe={expandedRecipe} isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />
    </Box>
  );
};

export default Recipes;
