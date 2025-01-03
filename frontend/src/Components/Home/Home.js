import React from "react";
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleGetRecipesClick = () => {
        navigate('/get-recipes');
    };

    return (
        <div className="sub-heading">
            <p className="slogan">Tasty Delights</p>
            <p className="slogan swift">Swiftly Arrived...</p>
            <p className="about">Discover delicious recipe suggestions tailored to your tastes with <em>FlashFeast</em>.<br/>
                Get fresh ingredients delivered right to your door and enjoy cooking made easy.
                Download now and start your culinary journey today!</p>
            <button onClick={handleGetRecipesClick} className="getRecipes"><span>Get Recipes</span></button>
        </div>
    );
}

export default Home;