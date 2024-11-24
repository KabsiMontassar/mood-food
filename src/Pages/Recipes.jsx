import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
} from '@chakra-ui/react';
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import FilterBar from '../components/CuisineComps/FilterBar';
import GridElement from '../components/CuisineComps/GridElement';
import SearchBar from '../components/CuisineComps/SearchBar';
import { db } from '../firebaseConfig.jsx';

const backgroundlinear = "linear-gradient(180deg, rgba(10, 115, 66, 0.7) 0%, white 100%)";

const Recipes = () => {
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('protein');
  const [activeFilterType, setActiveFilterType] = useState('mealType');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]); // Fetched recipes
  const [lastVisible, setLastVisible] = useState(null); // For pagination
  const [loading, setLoading] = useState(false);

  // Fetch initial recipes from Firebase
  const fetchInitialRecipes = async () => {
    setLoading(true);
    try {
      const recipesQuery = query(
        collection(db, "meals"), // Collection name in Firestore
        orderBy("name"), 
        limit(10) 
      );
      const querySnapshot = await getDocs(recipesQuery);
      const initialData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(initialData);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
    setLoading(false);
  };

  // Fetch more recipes for pagination
  const loadMoreRecipes = async () => {
    if (!lastVisible) return; // No more data to load

    setLoading(true);
    try {
      const recipesQuery = query(
        collection(db, "recipes"),
        orderBy("name"),
        startAfter(lastVisible), // Start after the last loaded document
        limit(10)
      );
      const querySnapshot = await getDocs(recipesQuery);
      const newRecipes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes((prev) => [...prev, ...newRecipes]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.error("Error loading more recipes: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialRecipes();
  }, []);

  // Filter and sort recipes
  const useFilteredRecipes = (selectedMealType, selectedSortBy, searchTerm) => {
    const filteredRecipes = useMemo(() => {
      return recipes.filter(recipe =>
        (selectedMealType === '' || recipe.mealType.toLowerCase() === selectedMealType.toLowerCase()) &&
        (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.guideDescritpion.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }, [selectedMealType, searchTerm, recipes]);

    const sortedRecipes = useMemo(() => {
      return [...filteredRecipes].sort((a, b) => {
        switch (selectedSortBy) {
          case 'protein':
            return b.protein - a.protein;
          case 'calories':
            return b.calories - a.calories;
          case 'carbohydrate':
            return b.carbohydrate - a.carbohydrate;
          case 'lipide':
            return b.lipide - a.lipide;
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

  const handleMealTypeChange = (mealType) => {
    setSelectedMealType(mealType);
  };

  const handleNutritionSortChange = (nutrient) => {
    setSelectedSortBy(nutrient);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

 

  return (
    <Box bg={backgroundlinear}>
      <header className='headeroverlay recipes'>
        <div className="overlay">
          <h1>Nourrissez votre corps avec des repas équilibrés</h1>
        </div>
      </header>
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <GridElement 
        sortedRecipes={sortedRecipes} 
       
      />
      {loading && <p>Loading...</p>}
      <Box textAlign="center" mt={4}>
        <Button onClick={loadMoreRecipes} isDisabled={loading || !lastVisible}>
          Load More
        </Button>
      </Box>
      <FilterBar
        activeFilterType={activeFilterType}
        setActiveFilterType={setActiveFilterType}
        selectedMealType={selectedMealType}
        handleMealTypeChange={handleMealTypeChange}
        selectedSortBy={selectedSortBy}
        handleNutritionSortChange={handleNutritionSortChange}
      />
     
    </Box>
  );
};

export default Recipes;
