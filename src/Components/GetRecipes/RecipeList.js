import React, { useContext } from 'react';
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import './GetRecipes.css';
import { StoreContext } from '../Grocery/Context/StoreContext';

const filterWords = ["yolk", "red", "green", "kosher", "white", "basmati", "pieces", "fresh", "leaves", "pods", "piece of", "confectioner's", "long grain", "frozen", "unsalted", "ice", "water", "chutney"];

const filterIngredient = (ingredient) => {
    return ingredient.split(' ').filter(word => !filterWords.includes(word)).join(' ');
};

const RecipeList = ({ recipes, onRecipeClick }) => {
    const { addToCart, products, setUnavailableIngredients } = useContext(StoreContext); 
    const navigate = useNavigate(); 

    const handleBuyNowClick = (recipe) => {
        const unavailableIngredients = [];

        recipe.recipe.missedIngredients.forEach((ingredient) => {
            const filteredIngredient = filterIngredient(ingredient.toLowerCase());

            const matchingProduct = products.find((product) => {
                const productName = product.name.toLowerCase();
                return productName.includes(filteredIngredient) || filteredIngredient.includes(productName);
            });

            if (matchingProduct) {
                addToCart(matchingProduct.id, matchingProduct); 
            } else {
                unavailableIngredients.push(filteredIngredient); 
            }
        });

        setUnavailableIngredients(unavailableIngredients); 

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
                    <button className='buy-button' onClick={(e) =>{ e.stopPropagation(); handleBuyNowClick(recipe);}}>
                        Buy Now<FaBasketShopping className="ms-2 mb-1" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
