import React from 'react';

const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} onClick={() => onRecipeClick(recipe.id)}>
            <h4>{recipe.title}</h4>
            <img src={recipe.image} alt={recipe.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
