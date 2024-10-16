import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import StoreContextProvider from './Components/Grocery/Context/StoreContext';
import { GoogleOAuthProvider } from "@react-oauth/google";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='750271533146-gsmnb8il6mue3i7pkfhnlb3qtbeleamv.apps.googleusercontent.com'>
    <React.StrictMode>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
