import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css';

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Home from "./routes/Home";
import Contact from './routes/Contact';
import ErrorPage from "./routes/ErrorPage";
import ContactDetails from "./routes/ContactDetails";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: "contact",
//     element: <Contact />
//   }
// ])

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
        path: "/contact/:id",
        element: <ContactDetails />
      },
      {
        path: "oldcontact",
        element: <Navigate to="/contact" />
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
