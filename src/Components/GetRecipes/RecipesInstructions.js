import React from 'react';
import './Recipe.css';

const RecipesInstructions = ({ selectedRecipe }) => {
  if (!selectedRecipe || selectedRecipe.length === 0) {
    return <div>No instructions available</div>;
  }

  return (
    <div className="recipe-container">
      {selectedRecipe.map((step, index) => (
        <div key={index}>
          <h3><strong>Step {index + 1}</strong></h3>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipesInstructions;
