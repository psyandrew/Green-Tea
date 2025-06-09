import React, { StrictMode } from "react";
import { createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard/CustomerDashboard';

/*
import ProductPage  from './ProductPage'
*/

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  { 
    path: '/',
    element: <HomePage />
  },
  { 
    path: '/dashboard', 
    element: <AdminDashboard />
  },
  { 
    path: '/catalogue', 
    element: <CustomerDashboard />
  }
  ]);

root.render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>
);



