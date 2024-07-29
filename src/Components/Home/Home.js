import React from "react";
import './Home.css';
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleGetRecipesClick = () => {
        navigate('/get-recipes');
    };

    return (
        <div className="sub-heading">
            <p className="slogan">Tasty Delights</p>
            <p className="slogan swift">Swiftly Arrived</p>
            <p className="about">Discover delicious recipe suggestions tailored to your tastes with <em>FlashFeast</em>.
                Get fresh ingredients delivered right to your door and enjoy cooking made easy.
                Download now and start your culinary journey today!</p>
<<<<<<< Updated upstream
            <button onClick={handleGetRecipesClick} className="getRecipes">Get Recipes<FaPlayCircle className='arrowicon'/></button>
=======
            <button class="getRecipes"><span>Get Recipes</span></button>
>>>>>>> Stashed changes
        </div>
    );
}

export default Home;
