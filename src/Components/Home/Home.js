import React from "react";
import './Home.css';
import { FaPlayCircle } from "react-icons/fa";

const Home = () => {
    return (
        <div className="sub-heading">
            <p className="slogan">Tasty Delights</p>
            <p className="slogan swift">Swiftly Arrived</p>
            <p className="about">Discover delicious recipe suggestions tailored to your tastes with <em>FlashFeast</em>.
                Get fresh ingredients delivered right to your door and enjoy cooking made easy.
                Download now and start your culinary journey today!</p>
            <button class="getRecipes">Get Recipes<FaPlayCircle className='arrowicon'/></button>
        </div>
    )
}

export default Home;