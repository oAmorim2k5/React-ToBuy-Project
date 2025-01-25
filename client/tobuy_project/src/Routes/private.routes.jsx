import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Pricing from '../Pages/Home/index';
import Contact from '../Pages/Contact/index.jsx';
import Profile from '../Pages/Profile/index.jsx';

const PrivateRoutes = () => {
    return (
            <Routes>
                <Route path='/Home' element={<Pricing />} />
                <Route path='/Contact' element={<Contact />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/' element={<Navigate to="/home" />} />
            </Routes>
    )
}

export default PrivateRoutes;