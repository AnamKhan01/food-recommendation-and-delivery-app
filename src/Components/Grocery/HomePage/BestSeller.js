import React, { useContext, useState } from 'react';
import { products } from './products.js';
import './BestSeller.css';
import { StoreContext } from '../Context/StoreContext.js';
import ProductDetail from './ProductDetail';

const BestSeller = () => {
  const { addToCart, removeFromCart, cartItems } = useContext(StoreContext); 
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  const increaseQuantity = (id) => {
    addToCart(id);
  };

  const decreaseQuantity = (id) => {
    removeFromCart(id);
  };

  const showProductDetail = (product) => {
    setSelectedProduct(product); 
  };

  const closeProductDetail = () => {
    setSelectedProduct(null); 
  };

  return (
    <div className='items-container'>
      {products.slice(0, 24).map((card, index) => {
        const currentQuantity = cartItems[card.id] || 0; 

        return (
          <div className='item-card' key={index} onClick={() => showProductDetail(card)}>
            <img src={card.image} className='item-image' alt={card.name} />
            <div className='item-details'>
              <h5 className='item-title'>{card.name}</h5>
              <p className='item-quantity'>{card.quantity}</p>
              <p className='item-price'>{card.price}</p>
            </div>

            {currentQuantity > 0 ? (
              <div className='item-quantity-control'>
                <button
                  className='quantity-btn'
                  onClick={(e) => {
                    e.stopPropagation(); 
                    decreaseQuantity(card.id);
                  }}
                >
                  -
                </button>
                <span className='item-count'>{currentQuantity}</span>
                <button
                  className='quantity-btn'
                  onClick={(e) => {
                    e.stopPropagation(); 
                    increaseQuantity(card.id);
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className='item-button'
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToCart(card.id);
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={closeProductDetail} />
      )}
    </div>
  );
};

export default BestSeller;
