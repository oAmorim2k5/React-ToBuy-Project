import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from '../Contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import UserProvider from '../Contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
)