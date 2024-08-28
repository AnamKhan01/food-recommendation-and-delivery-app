import axios from 'axios';

const API_KEY = 'd19cff2208acc0360023eb164d79d579'; 
const APP_ID = '92a21e6c'; 
const BASE_URL = 'https://api.edamam.com';

// Fetch ingredients based on user query
export const getIngredients = async (query) => { 
    try {
        const response = await axios.get(`${BASE_URL}/api/food-database/v2/parser`, {
            params: {
                app_id: APP_ID,
                app_key: API_KEY,
                ingr: query
            }
        });
        console.log('Ingredients fetched:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        throw error;
    }
};

// Fetch recipes based on selected ingredients
export const getRecipes = async (selectedIngredients) => {
    if (!Array.isArray(selectedIngredients)) {
        throw new Error('Selected ingredients must be an array');
    }

    try {
        const response = await axios.get(`${BASE_URL}/api/recipes/v2`, {
            params: {
                app_id: APP_ID,
                app_key: API_KEY,
                q: selectedIngredients.join(','),  // Ingredients list
                type: 'public',
                cuisineType: 'Indian', // Filters recipes to Indian cuisine
                to: 27 // Number of recipes to return
            }
        });
        console.log('Recipes response:', response.data);
        return response.data.hits; // Return the array of recipes
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// Fetch detailed information for a specific recipe by ID
export const getRecipeInformation = async (recipeId) => {
    if (!recipeId) {
        throw new Error('Recipe ID is required');
    }

    try {
        // Extract the actual recipe ID from the URI
        const extractedId = recipeId.split('#').pop();
        const response = await axios.get(`${BASE_URL}/api/recipes/v2/${extractedId}`, {
            params: {
                app_id: APP_ID,
                app_key: API_KEY,
                type: 'public'
            }
        });
        console.log('Recipe information response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe information:', error);
        throw error;
    }
};
