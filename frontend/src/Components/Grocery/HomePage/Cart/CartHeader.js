import React, { useState, useContext, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './CartHeader.css';
import logo from '../../ShoppingHeader/grocery-basket.png';
import { ShoppingCart } from 'lucide-react';
import { FaUserCircle } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";
import { StoreContext } from '../../Context/StoreContext';

const CartHeader = ({ setShowLogin }) => {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { token, settoken, username, setUsername } = useContext(StoreContext);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [setUsername]);

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        settoken("");
        setUsername("");
        navigate("/");
    }

    const handleNavLinkClick = (sectionId) => {
        navigate('/', { replace: true });
        setIsMenuOpen(false);
        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCartClick = () => {
        navigate('/grocery-home');
    };


    return (
        <>
            <header className="header-section">
                <nav className="shopping-bar">
                    <div className="shopping-bar-container">

                        <div className="brand" onClick={() => handleNavLinkClick('home')}>
                            <img src={logo} alt="FlashFeast Logo" className="logo" />
                            <span className="brand-name">FlashFeast</span>
                        </div>

                        <button className="toggle-button" onClick={toggleMenu} aria-label="Toggle navigation">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </button>

                        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>

                            <div className="nav-items">
                                <button onClick={handleCartClick} className="nav-shopping-icon">
                                    <ShoppingCart className='nav-shop-cart' />SHOPPING
                                </button>
                                <button className="home-button" onClick={() => handleNavLinkClick('home')}>
                                    🏠︎ HOME
                                </button>
                                {!token ?
                                    <button className="login-button" onClick={() => setShowLogin(2)}>
                                        <FaSignInAlt className="icon" /> LOGIN
                                    </button>
                                    :
                                    <div className="cart-navbar-profile">
                                        <p className='cart-profile-name'>{username}<FaUserCircle className="cart-profile-image" /></p>
                                        <ul className="cart-nav-profile-dropdown">
                                            <li onClick={()=>navigate('/myOrders')}><HiShoppingBag /><p>Your Orders</p></li>
                                            <li onClick={logOut}><VscSignOut /> <p>Logout</p></li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default CartHeader;
