import React from 'react';
import { FaBasketShopping } from "react-icons/fa6";
import './GetRecipes.css';

const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.recipe.uri} className="recipe-item" onClick={() => onRecipeClick(recipe.recipe.uri)}>
          <h4>{recipe.recipe.label}</h4>
          <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          <h5>Missing Ingredients</h5>
          <ul>
            {recipe.recipe.missedIngredients.length > 0 ? (
              recipe.recipe.missedIngredients.map((missingIngredient, index) => (
                <li key={index}>{missingIngredient}</li>
              ))
            ) : (
              <li>None! You have everything.</li>
            )}
          </ul>
          <button className='buy-button'>Buy Now<FaBasketShopping className="ms-2 mb-1" /></button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
