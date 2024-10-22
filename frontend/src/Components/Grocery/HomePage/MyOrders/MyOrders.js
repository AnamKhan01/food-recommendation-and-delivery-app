import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import "./MyOrders.css";
import axios from "axios";
import orderBag from "../vegetable.png";
import CartHeader from '../Cart/CartHeader';
import ShoppingFooter from '../ShoppingFooter';
import Login from '../../../LoginSignup/Login';
import ForgotPassword from '../../../LoginSignup/ForgotPassword';
import burger from "./burger.gif";

const MyOrders = () => {

    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    const [showLogin, setShowLogin] = useState(0);

    return (
        <>
            {showLogin === 2 ? <Login setShowLogin={setShowLogin} /> : <></>}
            {showLogin === 3 ? <ForgotPassword setShowLogin={setShowLogin} /> : <></>}
            <CartHeader setShowLogin={setShowLogin} />
            <div className='my-orders'>
                <h2>My Orders</h2>
                <div className='order-container'>
                    {data.length === 0 ? (
                        <div className='no-orders'>
                            <p>No orders found.</p>
                            <img src={burger} alt=""></img>
                        </div>
                    ) : (
                        data.map((order, index) => {
                            return (
                                <div key={index} className='my-orders-order'>
                                    <img src={orderBag} alt="" />
                                    <p>{order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        } else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}</p>
                                    <p>₹{order.amount}</p>
                                    <p>Items: {order.items.length}</p>
                                    <p><span>&#x25cf; &nbsp;</span><b>{order.status}</b></p>
                                    <button onClick={fetchOrders}>Track Order</button>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
            <ShoppingFooter />
        </>
    )
}

export default MyOrders;
