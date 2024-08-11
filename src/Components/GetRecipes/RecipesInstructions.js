import React from 'react';
import './Recipe.css';

const RecipesInstructions = ({ selectedRecipe }) => {

  return (
    <div className="recipe-container">
      {selectedRecipe.map((recipe, recipeIndex) => (
        <div key={recipeIndex}>
          <h3><strong>{recipe.name || 'Recipe Instructions'}</strong></h3>
          <ul className='stepwise-instructions'>
            {recipe.steps.map((step, stepIndex) => (
              <li key={stepIndex} className="recipe-item-list">
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
