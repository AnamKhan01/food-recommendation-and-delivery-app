import React, { useContext, useState, useEffect} from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { MdDelete } from "react-icons/md";
import CartHeader from './CartHeader';
import ShoppingFooter from '../ShoppingFooter';
import { useNavigate } from 'react-router-dom';
import Login from '../../../LoginSignup/Login';
import './Cart.css';
import ForgotPassword from '../../../LoginSignup/ForgotPassword';
import { toast } from 'react-toastify';
import emptyCart from './empty-cart.gif';

const Cart = () => {
    const { token, cartItems, products, removeFromCart, getTotalCartAmount, url, unavailableIngredients } = useContext(StoreContext);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });  
      }, []);

    const handleOrderClick = () => {
        if (!token) {
            toast.error('Please log in to proceed.');
            return;
        } else {
            navigate("/place-order");
        }
    }

    const totalCartItems = Object.keys(cartItems).reduce((sum, itemId) => sum + cartItems[itemId], 0);

    return (
        <>
            {showLogin === 2 ? <Login setShowLogin={setShowLogin} /> : <></>}
            {showLogin === 3 ? <ForgotPassword setShowLogin={setShowLogin} /> : <></>}
            <CartHeader setShowLogin={setShowLogin} />
            <div className='cart-footer-container'>
            {Object.keys(cartItems).length > 0 ? 
                <div className='cart-container'>
                    <div className='cart-items'>
                        <div className='cart-items-title'>
                            <p>Items</p>
                            <p>Title</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Remove</p>
                        </div>
                        {products.map((item, index) => {
                            const priceVal = parseFloat(item.price.replace(/[^\d.]/g, ''));
                            if (cartItems[item.id] > 0) {
                                return (
                                    <div key={item.id} className='cart-items-title cart-items-item'>
                                        <img src={url + "/images/" + item.image} alt=" "></img>
                                        <p>{item.name}</p>
                                        <p>{item.price}</p>
                                        <p>{cartItems[item.id]}</p>
                                        <p>₹{priceVal * (cartItems[item.id])}</p>
                                        <p onClick={() => removeFromCart(item.id)}><MdDelete /></p>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {unavailableIngredients.length > 0 && (
                        <div className='unavailable-ingredients'>
                            <p>Unavailable Ingredients: <span> {unavailableIngredients.join(', ')}</span> </p>
                        </div>
                    )}

                    <div className='cart-bottom'>
                        <div className='cart-total-details'>
                            <b>Subtotal ({totalCartItems} Items)</b>
                            <b className='totalPrice'>₹{getTotalCartAmount()}</b>
                        </div>
                        <button onClick={handleOrderClick} className='checkout-btn'>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
                :
                <div className='empty-cart-container'>
                    <h3>Oops!! Your cart is empty.</h3>
                <img src={emptyCart} className='empty-cart' alt="Your cart is empty"></img>
                </div>
            }
                <ShoppingFooter />
            </div>
        </>
    );
};

export default Cart;
