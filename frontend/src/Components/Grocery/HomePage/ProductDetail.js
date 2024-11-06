import React, { useContext} from 'react';
import './ProductDetail.css';
import { StoreContext } from '../Context/StoreContext';

const ProductDetail = ({ product, onClose }) => {
  const { addToCart, removeFromCart, cartItems, url } = useContext(StoreContext);

  if (!product) return null; 

  const currentQuantity = cartItems[product.id] || 0;

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleIncrease = (e) => {
    e.stopPropagation(); 
    addToCart(product.id);
  };

  const handleDecrease = (e) => {
    e.stopPropagation(); 
    removeFromCart(product.id);
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="product-detail-content">
          <img src={product.image} className="product-detail-image" alt={product.name} /> 
          {/* src={url + "/images/" + product.image} */}
          <div className="product-info">
            <h2 className="product-detail-title">{product.name}</h2>
            <p className="product-detail-quantity"><strong>Quantity:</strong> {product.quantity}</p>
            <p className="product-detail-price"><strong>Price:</strong> {product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            
            {currentQuantity > 0 ? (
              <div className="item-quantity-control">
                <button className="quantity-btn" onClick={handleDecrease}>
                  -
                </button>
                <span className="item-count">{currentQuantity}</span>
                <button className="quantity-btn" onClick={handleIncrease}>
                  +
                </button>
              </div>
            ) : (
              <button className="item-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
