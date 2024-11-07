import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/AdminLogin/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/add'); // Redirect to an admin page after login
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="admin-app-content">
        <Sidebar />
        <Routes>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          {isLoggedIn ? (
            <>
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
            </>
          ) : (
            <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
