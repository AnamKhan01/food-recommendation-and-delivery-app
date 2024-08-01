import React from 'react';
import { FaBasketShopping } from "react-icons/fa6";
import './GetRecipes.css';

const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item" onClick={() => onRecipeClick(recipe.id)}>
          <h4>{recipe.title}</h4>
          <img src={recipe.image} alt={recipe.title} />
          <h5>Missing Ingredients</h5>
          <ul>
            {recipe.missedIngredients?.map((missingIngredient, index) => (
              <li key={index}>
                <button className='buy-button'>Buy Now<FaBasketShopping className="ms-2 mb-1"/></button>
                <p>{missingIngredient.originalName}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
