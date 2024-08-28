import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeInformation } from './api/recipeApi';
import './Recipe.css';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeInfo = await getRecipeInformation(decodedId);
        setRecipe(recipeInfo);
        console.log('Recipe information response:', recipeInfo);
      } catch (error) {
        console.error('Error fetching recipe information:', error);
      }
    };
    fetchRecipe();
  }, [decodedId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const recipeData = recipe.recipe || {}; 

  return (
    <div className='recipe-instructions-container'>
      <div className="recipe-instructions-section">
        <h2>{recipeData.label || 'Recipe Name'}</h2>
        <img src={recipeData.image || ''} alt={recipeData.label || 'Recipe Image'} className="recipe-image" />
        <p><strong>Cooking Time:</strong> {recipeData.totalTime || 'N/A'} minutes</p>
        <p><strong>Servings:</strong> {recipeData.yield || 'N/A'}</p>
        <p><strong>Nutrition:</strong> {recipeData.totalNutrients ? 
          Object.keys(recipeData.totalNutrients).length > 0 ?
            Object.keys(recipeData.totalNutrients).map(key => (
              `${recipeData.totalNutrients[key].label}: ${Math.round(recipeData.totalNutrients[key].quantity)}${recipeData.totalNutrients[key].unit}`
            )).join(', ') : 'N/A' : 'N/A'
        }</p>
        <div className='used-ingredients'>
          <h3><strong>Used Ingredients</strong></h3>
          <ul>
            {recipeData.ingredientLines && recipeData.ingredientLines.length > 0 ? 
              recipeData.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              )) : <li>No ingredients available.</li>
            }
          </ul>
        </div>
        <div className='instructions'>
          <h3><strong>Instructions</strong></h3>
          <p>
            For the full recipe instructions, please visit: 
            <a href={recipeData.url} target="_blank" rel="noopener noreferrer">
              {recipeData.label}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
