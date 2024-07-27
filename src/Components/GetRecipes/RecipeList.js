import React from 'react';

const RecipeList = ({ recipes, onRecipeClick }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item" onClick={() => onRecipeClick(recipe.id)}>
          <h4>{recipe.title}</h4>
          <img src={recipe.image} alt={recipe.title} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
