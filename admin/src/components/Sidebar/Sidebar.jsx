import React from 'react'
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { MdAddBox } from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi";

const Sidebar = () => {
    return (
        <div className='side-bar'>
            <div className="sidebar-options">
                <NavLink to="/add" className="sidebar-option">
                <MdAddBox className='sidebar-logo'/>
                    <p>Add Items</p>
                </NavLink>
                <NavLink to="/list" className="sidebar-option">
                <IoIosListBox className='sidebar-logo'/>
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/orders' className="sidebar-option">
                <HiShoppingCart className='sidebar-logo'/>
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar;