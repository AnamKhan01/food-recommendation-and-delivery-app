import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import CartHeader from './Cart/CartHeader';
import ShoppingFooter from './ShoppingFooter';
import './PlaceOrder.css';
import Login from '../../LoginSignup/Login';
import ForgotPassword from '../../LoginSignup/ForgotPassword';

const PlaceOrder = () => {

    const { getTotalCartAmount } = useContext(StoreContext);

    const [showLogin,setShowLogin] = useState(0);

    return (
        <>
            {showLogin === 2 ? <Login setShowLogin={setShowLogin} /> : <></>}
            {showLogin===3 ? <ForgotPassword setShowLogin={setShowLogin} /> : <></>}
            <CartHeader setShowLogin={setShowLogin} />
            <form className='place-order-container'>
                <div className='place-order-left'>
                    <p className='order-title'>Delivery Information</p>
                    <div className='multi-fields'>
                        <input type="text" placeholder='First Name' />
                        <input type="text" placeholder='Last Name' />
                    </div>
                    <input type="email" placeholder='Email address' />
                    <input type="text" placeholder='Street' />
                    <div className='multi-fields'>
                        <input type="text" placeholder='City' />
                        <input type="text" placeholder='State' />
                    </div>
                    <div className='multi-fields'>
                        <input type="text" placeholder='Zip code' />
                        <input type="text" placeholder='Country' />
                    </div>
                    <input type="text" placeholder='Contact Number' />
                </div>
                <div className='place-order-right'>
                    <div className='cart-total-order'>
                        <h2>Cart Totals</h2>
                    </div>
                    <div className='cart-total-details-order'>
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr className="divider"/>
                    <div className='cart-total-details-order'>
                        <p>Delivery Fee</p>
                        <p>₹{10}</p>
                    </div>
                    <hr className="divider"/>
                    <div className='cart-total-details-order'>
                        <b>Total</b>
                        <b>₹{getTotalCartAmount() + 10}</b>
                    </div>
                    <button className='order-btn'>PROCEED TO PAYMENT</button>
                </div>
            </form >
            <ShoppingFooter />
        </>
    );
};

export default PlaceOrder;