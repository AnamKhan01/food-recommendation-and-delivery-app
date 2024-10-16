import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import CartHeader from './Cart/CartHeader';
import ShoppingFooter from './ShoppingFooter';
import './PlaceOrder.css';
import Login from '../../LoginSignup/Login';
import ForgotPassword from '../../LoginSignup/ForgotPassword';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const { getTotalCartAmount, token, products, cartItems, url } = useContext(StoreContext);

    const [data,setData] = useState(
        {
            firstName:"",
            lastName:"",
            email:"",
            street:"",
            city:"",
            state:"",
            zipcode:"",
            country:"",
            phone:""
        }
    )

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]:value}))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        products.map((item)=>{
            if(cartItems[item.id] > 0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item.id];
                orderItems.push(itemInfo);
            }
        })
        let orderData = {
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+10,
        }
        let response = await axios.post(url + "/api/order/place",orderData,{headers:{token}})
        if(response.data.success)
        {
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else{
            toast.error('Error occured');
        }
    }


    const [showLogin,setShowLogin] = useState(0);

    return (
        <>
            {showLogin === 2 ? <Login setShowLogin={setShowLogin} /> : <></>}
            {showLogin===3 ? <ForgotPassword setShowLogin={setShowLogin} /> : <></>}
            <CartHeader setShowLogin={setShowLogin} />
            <form onSubmit={placeOrder} className='place-order-container'>
                <div className='place-order-left'>
                    <p className='order-title'>Delivery Information</p>
                    <div className='multi-fields'>
                        <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
                        <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
                    </div>
                    <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email address' />
                    <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder='Street' />
                    <div className='multi-fields'>
                        <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder='City' />
                        <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder='State' />
                    </div>
                    <div className='multi-fields'>
                        <input required type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
                        <input required type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder='Country' />
                    </div>
                    <input required type="text" name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Contact Number' />
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
                    <button type="submit" className='order-btn'>PROCEED TO PAYMENT</button>
                </div>
            </form >
            <ShoppingFooter />
        </>
    );
};

export default PlaceOrder;