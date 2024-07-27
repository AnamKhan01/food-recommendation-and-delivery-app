import React from 'react';

const IngredientList = ({ ingredients, selectedIngredients, handleSelect }) => {
  return (
    <div className="ingredient-list">
      <ul>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, index) => (
            <li key={index} className="ingredient-item">
              <label>
                <input
                  type="checkbox"
                  value={ingredient}
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={handleSelect}
                  className="ingredient-checkbox"
                />
                {ingredient}
              </label>
            </li>
          ))
        ) : (
          <p>No ingredients available.</p>
        )}
      </ul>
    </div>
  );
};

export default IngredientList;
