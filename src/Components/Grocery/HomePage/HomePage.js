import React, { useState } from "react";
import ShoppingHeader from "../ShoppingHeader/ShoppingHeader";
import "./HomePage.css";
import grocery from "./grocery-bag.png";
import Categories from "./Categories";
import BestSeller from "./BestSeller";
import Login from "../../LoginSignup/Login";
import ForgotPassword from "../../LoginSignup/ForgotPassword";
import ShoppingFooter from "./ShoppingFooter";
import { useLocation } from "react-router-dom";

const HomePage = ({ selectedCategory, onCategorySelect }) => {
    const [showLogin, setShowLogin] = useState(0);

    const location = useLocation();
    const shoppingCategory = location.state?.category;

    const handleCategorySelect = (category) => {
        onCategorySelect(category);
    };

    return (
        <>
            {showLogin === 2 ? <Login setShowLogin={setShowLogin} /> : <></>}
            {showLogin === 3 ? <ForgotPassword setShowLogin={setShowLogin} /> : <></>}
            <div className="homepage-container">
                <ShoppingHeader setShowLogin={setShowLogin} />
                <div className="intro">
                    <div className="intro-text">
                        <h3 className="heading">Skip the line, <br />We deliver in no time.</h3>
                        <p className="shop-quote">Shop organic and sustainable groceries—delivered fast and up to 10% off.<br /><span> Nourish your home with nature’s best, effortlessly.</span></p>
                    </div>
                    <div className="svg-div">
                        <svg className="pattern" xmlns="http://www.w3.org/2000/svg" viewBox="350 0 1100 320">
                            <defs>
                                <clipPath id="clipPath">
                                    <rect x="0" y="0" width="1440" height="320" rx="20" ry="20" />
                                </clipPath>
                            </defs>
                            <path clipPath="url(#clipPath)" fill="#f0be49" fillOpacity="1" d="M0,256L60,234.7C120,213,240,171,360,176C480,181,600,235,720,261.3C840,288,960,288,1080,272C1200,256,1320,224,1380,208L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                        </svg>
                        <img className="grocery-bag" src={grocery} alt=""></img>
                    </div>
                </div>
                <Categories onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
                {shoppingCategory ? (
                    selectedCategory ? (
                        <h3 className="picks-heading">{selectedCategory.title}</h3>)
                    : 
                       ( <h3 className="picks-heading">{shoppingCategory.title}</h3>
                    ))
                    :
                    (
                        selectedCategory ? (
                            <h3 className="picks-heading">{selectedCategory.title}</h3>)
                        : 
                           ( <h3 className="picks-heading">Top Picks For You</h3>
                        )
                    
                )}

                <BestSeller selectedCategory={selectedCategory ? selectedCategory : shoppingCategory} />
                <ShoppingFooter />
            </div>
        </>
    );
}

export default HomePage;