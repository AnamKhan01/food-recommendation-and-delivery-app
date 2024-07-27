import React from 'react';

const RecipesInstructions = ({ selectedRecipe }) => {

  return (
    <div className="recipe-container">
      {selectedRecipe.map((recipe, recipeIndex) => (
        <div key={recipeIndex}>
          <h3>{recipe.name || 'Recipe Instructions'}</h3>
          <ul>
            {recipe.steps.map((step, stepIndex) => (
              <li key={stepIndex} className="recipe-item">
                <p>{step.step}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RecipesInstructions;
