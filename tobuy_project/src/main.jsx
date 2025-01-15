import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css';

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Home from "./routes/Home";
import Contact from './routes/Contact';
import Login from "./routes/Login";
import Register from "./routes/Register";
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
