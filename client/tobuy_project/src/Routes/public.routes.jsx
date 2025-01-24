import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../Pages/Login/index.jsx';
import RegisterPage from '../Pages/Register/index.jsx';
import Pricing from '../Pages/Home/index.jsx';
import Contact from '../Pages/Contact/index.jsx';

const PublicRoutes = () => {
    return (
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path='/home' element={<Pricing />} />
                <Route path='/' element={<Navigate to="/home" />} />
            </Routes>
    );
};

export default PublicRoutes;
