import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientList from './IngredientList';
import RecipeList from './RecipeList';
import { getIngredients, getRecipes } from './api/recipeApi';
import './GetRecipes.css';

const GetRecipes = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [manualInput, setManualInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientsData = await getIngredients();
        console.log('Ingredients fetched:', ingredientsData);
        setIngredients(ingredientsData.map(ingredient => ingredient.name));
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };
    fetchIngredients();
  }, []);

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

  const handleSelect = (event) => {
    const ingredient = event.target.value;
    setSelectedIngredients(prevSelected =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter(i => i !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const handleManualInputChange = (event) => {
    setManualInput(event.target.value);
  };

  const handleManualInputSubmit = () => {
    const ingredientsArray = manualInput.split(',').map(ingredient => ingredient.trim()).filter(Boolean);
    setSelectedIngredients(prevSelected => [...new Set([...prevSelected, ...ingredientsArray])]);
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
          placeholder="Enter ingredients separated by commas"
          className='manual-input-field'
        />
        <button className='manual-input-button' onClick={handleManualInputSubmit}>Add Ingredients</button>
      </div>

      <div className="content-section">
        <div className="ingredient-list-section">
          <h2>Select Ingredients</h2>
          <IngredientList
            ingredients={ingredients}
            selectedIngredients={selectedIngredients}
            handleSelect={handleSelect}
          />
        </div>

        <div className="recipe-list-section">
          <h2>Recipes</h2>
          <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
        </div>
      </div>
    </div>
  );
};

export default GetRecipes;
