import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import GetRecipes from '../GetRecipes/GetRecipes';
import RecipeDetail from '../GetRecipes/RecipeDetail';
import MainLayout from '../Layout/MainLayout';

const LandingPage = () => {
  return (
    <Routes>
      <Route path="/get-recipes" element={<GetRecipes />} />
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
