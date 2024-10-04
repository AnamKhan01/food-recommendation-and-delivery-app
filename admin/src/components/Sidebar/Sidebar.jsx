import React from 'react'
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import plus from '../../assets/plus.png';
import list from '../../assets/checklist.png';
import order from '../../assets/shopping-cart.png';

const Sidebar = () => {
    return (
        <div className='side-bar'>
            <div className="sidebar-options">
                <NavLink to="/add" className="sidebar-option">
                <img src={plus} alt="" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option">
                <img src={list} alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/orders' className="sidebar-option">
                <img src={order} alt="" className='option-icon'/>
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;