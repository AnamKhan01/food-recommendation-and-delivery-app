import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import GetRecipes from '../GetRecipes/GetRecipes';
import RecipeDetail from '../GetRecipes/RecipeDetail';
import MainLayout from '../Layout/MainLayout';
import Homepage from '../Grocery/HomePage/HomePage';
import Cart from '../Grocery/HomePage/Cart/Cart';
import PlaceOrder from '../Grocery/HomePage/PlaceOrder';

const LandingPage = () => {
  return (
    <Routes>
      <Route path="/get-recipes" element={<GetRecipes />} />
      <Route path="/grocery-home" element={<Homepage />} />
      <Route path='/cart' element={<Cart/>}/>
      <Route path="/place-order" element = {<PlaceOrder/>}/>
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/" element={
        <MainLayout>
            <Home />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default LandingPage;
