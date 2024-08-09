import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeInformation } from './api/recipeApi';
import RecipesInstructions from './RecipesInstructions';
import './Recipe.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeInfo = await getRecipeInformation(id);
        setRecipe(recipeInfo);
        console.log('Recipe information response:', recipeInfo);
      } catch (error) {
        console.error('Error fetching recipe information:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className='recipe-instructions-container'>
      <div className="recipe-instructions-section">
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <p><strong>Cooking Time:</strong> {recipe.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Nutrition:</strong> {recipe.nutrition.nutrients.map(nutrient => `${nutrient.name}: ${nutrient.amount}${nutrient.unit}`).join(', ')}</p>
        <h3>Used Ingredients</h3>
        <ul>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <RecipesInstructions selectedRecipe={recipe.analyzedInstructions} />
      </div>
    </div>
  );
};

export default RecipeDetail;
