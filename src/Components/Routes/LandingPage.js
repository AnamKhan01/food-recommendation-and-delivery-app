import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import GetRecipes from '../GetRecipes/GetRecipes';
import RecipeDetail from '../GetRecipes/RecipeDetail';
import MainLayout from '../Layout/MainLayout';
import Homepage from '../Grocery/HomePage/HomePage';
import Cart from '../Grocery/HomePage/Cart/Cart';
import PlaceOrder from '../Grocery/HomePage/PlaceOrder';
import Verify from '../Grocery/HomePage/Verify/Verify';
import ResetPassword from '../LoginSignup/ResetPassword';

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Routes>
      <Route path="/get-recipes" element={<GetRecipes />} />
      <Route 
        path="/grocery-home" 
        element={<Homepage selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />} 
      />
      <Route path='/cart' element={<Cart />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path='/verify' element={<Verify/>} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route 
        path="/" 
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        } 
      />
    </Routes>
  );
};

export default LandingPage;
