import SpaghettiBologneseImage from '../assets/spaghetti.jpg';
import ChickenCurryImage from '../assets/curry.webp';
import VeganSaladImage from '../assets/vegansalad.jpg';
import GrilledSalmonImage from '../assets/salmon.jpg';

const recipes = [
  {
    id: 1,
    name: 'Spaghetti Bolognese',
    image: SpaghettiBologneseImage,
    description: 'Classic Italian pasta with a rich meat sauce.',
    ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce', 'Garlic', 'Onion', 'Italian Herbs'],
    calories: 650,
    protein: '30g',
    fiber: '5g',
    carbohydrates: '75g',
    fats: '20g',
    cookingInstructions: 'Cook spaghetti according to package directions. In a separate pan, cook ground beef until browned. Add tomato sauce, garlic, onion, and herbs. Simmer for 30 minutes and serve over spaghetti.',
    cookingTime: 40, // in minutes
    mealType: 'Dinner', // Added meal type
  },
  {
    id: 2,
    name: 'Chicken Curry',
    image: ChickenCurryImage,
    description: 'Spicy and creamy chicken curry with a blend of Indian spices.',
    ingredients: ['Chicken', 'Coconut Milk', 'Curry Powder', 'Onion', 'Garlic', 'Ginger'],
    calories: 700,
    protein: '40g',
    fiber: '6g',
    carbohydrates: '30g',
    fats: '35g',
    cookingInstructions: 'Sauté onion, garlic, and ginger until soft. Add chicken and curry powder, cook until chicken is browned. Stir in coconut milk and simmer for 20 minutes.',
    cookingTime: 30,
    mealType: 'Lunch',
  },
  {
    id: 3,
    name: 'Vegan Salad',
    image: VeganSaladImage,
    description: 'Fresh and colorful salad with a variety of vegetables.',
    ingredients: ['Lettuce', 'Tomatoes', 'Cucumbers', 'Carrots', 'Bell Peppers', 'Olive Oil'],
    calories: 250,
    protein: '5g',
    fiber: '8g',
    carbohydrates: '30g',
    fats: '10g',
    cookingInstructions: 'Chop vegetables and mix in a large bowl. Drizzle with olive oil and toss to combine.',
    cookingTime: 15,
    mealType: 'Lunch',
  },
  {
    id: 4,
    name: 'Grilled Salmon',
    image: GrilledSalmonImage,
    description: 'Tender and juicy salmon fillet with a smoky flavor.',
    ingredients: ['Salmon Fillet', 'Lemon', 'Garlic', 'Olive Oil', 'Salt', 'Pepper'],
    calories: 400,
    protein: '35g',
    fiber: '0g',
    carbohydrates: '0g',
    fats: '25g',
    cookingInstructions: 'Season salmon with lemon, garlic, salt, and pepper. Grill over medium heat for 5-7 minutes on each side, or until cooked through.',
    cookingTime: 20,
    mealType: 'Dinner',
  }
];

export default recipes;
