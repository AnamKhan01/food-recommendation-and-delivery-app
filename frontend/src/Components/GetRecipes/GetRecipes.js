import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from './RecipeList';
import { getIngredients, getRecipes } from './api/recipeApi';
import './GetRecipes.css';
import RecipeHeader from './RecipeHeader';
import bread from './images/bread.gif';
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";
import SignUp from '../LoginSignup/SignUp';
import Login from '../LoginSignup/Login';
import ForgotPassword from '../LoginSignup/ForgotPassword';

const predefinedIngredients = [
    "butter", "egg", "garlic", "milk", "onion", "sugar", "paprika", "tomato",
    "avocado", "mango", "coriander", "lemon", "ginger", "cumin", "apple", "flour",
    "olive oil", "bread", "potato", "cinnamon", "ketchup", "cheese",
    "chicken", "rajma", "paneer", "rice", "honey"
];

const recipesPerPage = 9;

const normalizeIngredient = (ingredient) => ingredient.toLowerCase().trim();
const isIngredientMatch = (ingredient, selectedIngredient) =>
    normalizeIngredient(ingredient).includes(normalizeIngredient(selectedIngredient));

const GetRecipes = () => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [manualInput, setManualInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [noRecipesFound, setNoRecipesFound] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef();
    const suggestionsRef = useRef(null);

    const [showLogin, setShowLogin] = useState(0);

    useEffect(() => {
        const savedIngredients = JSON.parse(localStorage.getItem('selectedIngredients'));
        if (savedIngredients) {
            setSelectedIngredients(savedIngredients);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
    }, [selectedIngredients]);

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
                    const recipesWithMissingIngredients = recipesData.map((recipeData) => {
                        const recipeIngredients = recipeData.recipe.ingredients.map(ingredient => ingredient.food.toLowerCase());
                        const missingIngredients = recipeIngredients.filter(ingredient =>
                            !selectedIngredients.some(selected => isIngredientMatch(ingredient, selected))
                        );
                        return {
                            ...recipeData,
                            recipe: { ...recipeData.recipe, missedIngredients: missingIngredients },
                        };
                    });
                    setRecipes(recipesWithMissingIngredients);
                    setNoRecipesFound(recipesWithMissingIngredients.length === 0);
                    setCurrentPage(0);
                } else {
                    setRecipes([]);
                    setNoRecipesFound(false);
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

    const handleRemoveSelect = () => {
        setSelectedIngredients([]);
        setNoRecipesFound(false);
        localStorage.removeItem('selectedIngredients');
    };

    const handleManualInputChange = (event) => setManualInput(event.target.value);

    const handleSuggestionClick = (suggestion) => {
        setSelectedIngredients(prevSelected => [...new Set([...prevSelected, suggestion])]);
        setManualInput('');
        setSuggestions([]);
    };

    const handleRecipeClick = (recipeId) => {
        const encodedRecipeId = encodeURIComponent(recipeId);
        navigate(`/recipe/${encodedRecipeId}`);
    };

    const totalPages = Math.ceil(recipes.length / recipesPerPage);
    const startIndex = currentPage * recipesPerPage;
    const currentRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'left' && currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'right' && currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDotClick = (index) => setCurrentPage(index);

    const showNavControls = selectedIngredients.length > 0 && recipes.length > 0;

    return (
        <>
            {showLogin === 1 ? <SignUp setShowLogin={setShowLogin} /> : <></>}
            {showLogin === 2 ? <Login setShowLogin={setShowLogin} /> : <></>}
            {showLogin === 3 ? <ForgotPassword setShowLogin={setShowLogin} /> : <></>}
            <div className="get-recipes-container">
                <RecipeHeader setShowLogin={setShowLogin} />
                <div className='main-container'>
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
                            <ul className="suggestions-list" ref={suggestionsRef}>
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
                            <div className={`recipe-list ${recipes.length > 0 ? 'has-recipes' : ''}`}>
                                {recipes.length === 0 ? (
                                    <div className='quote-content'>
                                        <img src={bread} alt="bread" className='bread'></img>
                                        <h2 className='quote'>Sprinkle your ingredients, let the journey start, Each one a key to new recipes, a culinary art.</h2>
                                        {noRecipesFound && <p className="no-recipes-message">No recipes available for the selected ingredients.</p>} {/* Display message if no recipes */}
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
                                                <button className='remove-all-button' onClick={handleRemoveSelect}>Remove All</button>
                                            </div>
                                        </div>
                                        <RecipeList recipes={currentRecipes} onRecipeClick={handleRecipeClick} />
                                    </div>
                                )}
                            </div>
                            {showNavControls && (
                                <div className="nav-dot-container">
                                    <SlArrowLeftCircle className='arrow-icon-left' onClick={() => handlePageChange('left')} />
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <label
                                            key={index}
                                            htmlFor={`slide${index}`}
                                            className={`nav-dot ${currentPage === index ? 'active' : ''}`}
                                            onClick={() => handleDotClick(index)}
                                        ></label>
                                    ))}
                                    <SlArrowRightCircle className='arrow-icon-right' onClick={() => handlePageChange('right')} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetRecipes;
