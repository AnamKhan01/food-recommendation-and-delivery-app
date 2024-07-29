import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from './RecipeList';
import { getIngredients, getRecipes } from './api/recipeApi';
import './GetRecipes.css';

const predefinedIngredients = [
  "butter", "egg", "garlic", "milk", "onion", "sugar", "flour", "olive oil",
  "garlic powder", "white rice", "cinnamon", "ketchup", "soy sauce", "mayonnaise",
  "vegetable oil", "bread", "baking powder", "brown sugar", "oregano", "potato",
  "honey", "paprika", "tomato", "avocado", "mango", "coriander", "lemon", "ginger", "cumin"
];

const GetRecipes = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [manualInput, setManualInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    const fetchIngredients = async (query) => {
      try {
        const ingredientsData = await getIngredients(query);
        console.log('Ingredients fetched:', ingredientsData);
        setSuggestions(ingredientsData.map(ingredient => ingredient.name));
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    if (manualInput) {
      fetchIngredients(manualInput);
    } else {
      setSuggestions([]);
    }
  }, [manualInput]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (selectedIngredients.length > 0) {
          const recipesData = await getRecipes(selectedIngredients);
          console.log('Recipes fetched:', recipesData);
          setRecipes(recipesData);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, [selectedIngredients]);

  const handleSelect = (ingredient) => {
    setSelectedIngredients(prevSelected =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter(i => i !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const handleManualInputChange = (event) => {
    setManualInput(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedIngredients(prevSelected => [...new Set([...prevSelected, suggestion])]);
    setManualInput('');
    setSuggestions([]);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="get-recipes-container">
      <h1>Recipe Finder</h1>

      <div className="manual-input-section">
        <input
          type="text"
          value={manualInput}
          onChange={handleManualInputChange}
          placeholder="Add/remove/paste ingredients"
          className='manual-input-field'
          ref={inputRef}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <span onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</span>
                <button className='suggestion-button' onClick={() => handleSelect(suggestion)}>
                  {selectedIngredients.includes(suggestion) ? 'Remove' : 'Add'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="ingredient-list-section">
        <h2>Pantry Essentials</h2>
        <div className="predefined-ingredients">
          {predefinedIngredients.map((ingredient, index) => (
            <button
              key={index}
              className={`ingredient-button ${selectedIngredients.includes(ingredient) ? 'selected' : ''}`}
              onClick={() => handleSelect(ingredient)}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>

      <div className="selected-ingredients-section">
        <h2>Selected Ingredients</h2>
        <div className="selected-ingredients">
          {selectedIngredients.map((ingredient, index) => (
            <span key={index} className="selected-ingredient">
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div className="recipe-list-section">
        <h2>Recipes</h2>
        <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
      </div>
    </div>
  );
};

export default GetRecipes;
