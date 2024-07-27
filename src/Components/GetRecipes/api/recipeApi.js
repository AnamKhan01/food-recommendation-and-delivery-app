import axios from 'axios';

//const API_KEY = '1b52ab32a6a04ebf9d0e68e8c46b004a';
const API_KEY = 'e950445d2ebe4361b544d12f94a16169';
const BASE_URL = 'https://api.spoonacular.com';

export const getIngredients = async (query = 'a') => { // Set default query to 'a'
    try {
        const response = await axios.get(`${BASE_URL}/food/ingredients/autocomplete`, {
            params: {
                apiKey: API_KEY,
                query: query.trim(),
                number: 100
            }
        });
        console.log('Ingredients fetched:', response.data); // Log the fetched ingredients
        return response.data;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        throw error;
    }
};

export const getRecipes = async (selectedIngredients) => {
    if (!Array.isArray(selectedIngredients)) {
        throw new Error('Selected ingredients must be an array');
    }

    try {
        const response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
            params: {
                apiKey: API_KEY,
                ingredients: selectedIngredients.join(','),
                number: 10
            }
        });
        console.log('Recipes response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export const getRecipesInstructions = async (recipeId) => {
    if (!recipeId) {
        throw new Error('Recipe ID is required');
    }

    try {
        const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/analyzedInstructions`, {
            params: {
                apiKey: API_KEY,
            }
        });
        console.log('Recipe instructions response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe instructions:', error);
        throw error;
    }
};
