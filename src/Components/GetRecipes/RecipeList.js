import React, { useContext } from 'react';
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import './GetRecipes.css';
import { StoreContext } from '../Grocery/Context/StoreContext';

const RecipeList = ({ recipes, onRecipeClick }) => {
  const { addToCart, products } = useContext(StoreContext); // Use addToCart function from context
  const navigate = useNavigate(); // Use useNavigate hook

  // Function to handle Buy Now button click
  const handleBuyNowClick = (recipe) => {
    // Add all missing ingredients to the cart
    recipe.recipe.missedIngredients.forEach((ingredient) => {
      const matchingProduct = products.find((product) =>
        product.name.toLowerCase().includes(ingredient.toLowerCase())
      );
      if (matchingProduct) {
        addToCart(matchingProduct.id, matchingProduct); // Add the product to the cart
      }
    });

    // Navigate to the cart page
    navigate('/cart');
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.recipe.uri} className="recipe-item" onClick={() => onRecipeClick(recipe.recipe.uri)}>
          <h4>{recipe.recipe.label}</h4>
          <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          <h5>Missing Ingredients</h5>
          <ul>
            {recipe.recipe.missedIngredients.length > 0 ? (
              recipe.recipe.missedIngredients.map((missingIngredient, index) => (
                <li key={index}>{missingIngredient}</li>
              ))
            ) : (
              <li>None! You have everything.</li>
            )}
          </ul>
          <button className='buy-button' onClick={() => handleBuyNowClick(recipe)}>
            Buy Now<FaBasketShopping className="ms-2 mb-1" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
