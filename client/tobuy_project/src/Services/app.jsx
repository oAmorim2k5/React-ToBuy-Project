import React, { useContext } from 'react';
import PublicRoutes from '../Routes/public.routes';
import PrivateRoutes from '../Routes/private.routes';
import { AuthContext } from '../Contexts/AuthContext';
import Navbar from '../Components/Navbar/index.jsx';

function App() {
    const { auth } = useContext(AuthContext);
    return (
        <>
            <Navbar/>
            {auth ? <PrivateRoutes /> : <PublicRoutes />}
        </>
    );
}

export default App;
