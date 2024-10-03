import React, { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { MdDelete } from "react-icons/md";
import CartHeader from './CartHeader';
import ShoppingFooter from '../ShoppingFooter';
import { useNavigate } from 'react-router-dom';
import Login from '../../../LoginSignup/Login';
import './Cart.css';
import ForgotPassword from '../../../LoginSignup/ForgotPassword';

const Cart = () => {

    const { cartItems, products, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate("/place-order");
    }

    const [showLogin, setShowLogin] = useState(0);

    const totalCartItems = Object.values(cartItems).length;

    return (
        <>
            {showLogin === 2 ? <Login setShowLogin={setShowLogin} /> : <></>}
            {showLogin === 3 ? <ForgotPassword setShowLogin={setShowLogin} /> : <></>}
            <CartHeader setShowLogin={setShowLogin} />
            <div className='cart-footer-container'>
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
                                    <div className='cart-items-title cart-items-item'>
                                        <img src={item.image} alt=" "></img>
                                        <p>{item.name}</p>
                                        <p>{item.price}</p>
                                        <p>{cartItems[item.id]}</p>
                                        <p>₹{priceVal * (cartItems[item.id])}</p>
                                        <p onClick={() => removeFromCart(item.id)}><MdDelete /></p>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                    <div className='cart-bottom'>
                        <div className='cart-total-details'>
                            <b>Subtotal (
                            {totalCartItems}
                            &nbsp; Items)</b>
                            <b className='totalPrice'>₹{getTotalCartAmount()}</b>
                        </div>
                        
                        <button onClick={handleOrderClick} className='checkout-btn'>PROCEED TO CHECKOUT</button>
                    </div>

                </div>
                <ShoppingFooter />
            </div>
        </>
    );
};

export default Cart;