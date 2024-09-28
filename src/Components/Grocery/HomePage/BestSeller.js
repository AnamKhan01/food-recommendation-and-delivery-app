import React, { useState } from 'react';
import { products } from './products.js';
import "./BestSeller.css";

const BestSeller = () => {
    // Store the quantity for each product by their index
    const [quantities, setQuantities] = useState({});

    const handleAddToCart = (index) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [index]: 1, // Set initial quantity to 1 when first added
        }));
    };

    const increaseQuantity = (index) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [index]: (prevQuantities[index] || 0) + 1, // Increment quantity
        }));
    };

    const decreaseQuantity = (index) => {
        setQuantities((prevQuantities) => {
            const newQuantity = (prevQuantities[index] || 0) - 1;
            if (newQuantity <= 0) {
                const updatedQuantities = { ...prevQuantities };
                delete updatedQuantities[index]; // Remove item if quantity reaches 0
                return updatedQuantities;
            }
            return {
                ...prevQuantities,
                [index]: newQuantity, // Decrease quantity
            };
        });
    };

    return (
        <>
            <div className='items-container'>
                {products.map((card, index) => (
                    <div className="item-card" key={index}>
                        <img src={card.image} className="item-image" alt={card.name} />
                        <div className="item-details">
                            <h5 className="item-title">{card.name}</h5>
                            <p className="item-quantity">{card.quantity}</p>
                            <p className='item-price'>{card.price}</p>
                        </div>

                        {quantities[index] ? (
                            // If item is in cart, show quantity controls
                            <div className="item-quantity-control">
                                <button 
                                    className="quantity-btn" 
                                    onClick={() => decreaseQuantity(index)}
                                >
                                    -
                                </button>
                                <span className="item-count">{quantities[index]}</span>
                                <button 
                                    className="quantity-btn" 
                                    onClick={() => increaseQuantity(index)}
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            // Show Add to Cart button if not in cart
                            <button 
                                className='item-button' 
                                onClick={() => handleAddToCart(index)}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default BestSeller;
