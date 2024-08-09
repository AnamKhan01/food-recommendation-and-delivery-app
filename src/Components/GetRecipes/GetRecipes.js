import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from './RecipeList';
import { getIngredients, getRecipes } from './api/recipeApi';
import './GetRecipes.css';
import Header from '../Header/Header';
import bread from './images/dancing-bread.gif';
import { SlArrowRightCircle } from "react-icons/sl";
import { SlArrowLeftCircle } from "react-icons/sl";

const predefinedIngredients = [
  "butter", "egg", "garlic", "milk", "onion", "sugar", "flour", "olive oil",
  "garlic powder", "white rice", "cinnamon", "ketchup", "soy sauce",
  "vegetable oil", "bread", "baking powder", "potato",
  "honey", "paprika", "tomato", "avocado", "mango", "coriander", "lemon", "ginger", "cumin", "apple"
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
    setManualInput('');
    setSuggestions([]);
  };

  const handleRemoveSelect = () =>{
    setSelectedIngredients([]);
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
      <Header isFixed={false} />
      <div className='main-container'>
        {/* <h1>Recipe Finder</h1> */}

        <div className="manual-input-section">
          <input
            type="text"
            value={manualInput}
            onChange={handleManualInputChange}
            placeholder="Search ingredients"
            className='manual-input-field'
            ref={inputRef}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <span onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</span>
                  <button
                    className={`suggestion-button ${selectedIngredients.includes(suggestion) ? 'remove-button' : 'add-button'}`}
                    onClick={() => handleSelect(suggestion)}
                  >
                    {selectedIngredients.includes(suggestion) ? 'Remove' : 'Add'}
                  </button>

                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="main-grid">
          <div className="left-panel">
            <h2>Everyday Ingredients</h2>
            <div className="pantry-essentials">
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

          <div className="right-panel">

            {/* <h2>Recipes</h2> */}
            <div className={`recipe-list ${recipes.length > 0 ? 'has-recipes' : ''}`}>
              {recipes.length === 0 ? (
                <div className='quote-content'>
                  <img src={bread} alt="bread" className='bread'></img>
                  <h2 className='quote'>Sprinkle your ingredients, let the journey start, Each one a key to new recipes, a culinary art.</h2>
                </div>
              ) : (
                <div>
                  <div className="selected-ingredients-container">

                    <h2>Selected Ingredients</h2>
                    <div className="selected-ingredients">
                      {selectedIngredients.map((ingredient, index) => (
                        <button key={index} className="selected-ingredient" onClick={() => handleSelect(ingredient)}>
                          {ingredient}
                        </button>
                      ))}
                      <button className='remove-all-button' onClick={() => handleRemoveSelect()}>Remove All</button>
                    </div>
                  </div>
                  <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
                </div>
              )}
            </div>
            <div className="nav-dot-container">
              <SlArrowLeftCircle className='arrow-icon-left'/>
              <label for="slide1" class="nav-dot"></label>
              <label for="slide2" class="nav-dot"></label>
              <label for="slide3" class="nav-dot"></label>
              <SlArrowRightCircle className='arrow-icon-right'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetRecipes;
