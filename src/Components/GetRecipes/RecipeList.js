import React from 'react';

const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item" onClick={() => onRecipeClick(recipe.id)}>
          <h4>{recipe.title}</h4>
          <img src={recipe.image} alt={recipe.title} />
          <h4>Missing Ingredients</h4>
          <ul>
            {recipe.missedIngredients?.map((missingIngredient, index) => (
              <li key={index}>
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
