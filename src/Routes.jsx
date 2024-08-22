// src/RoutesWithTransitions.js
import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransitions'
import Home from './Pages/Home';


const routes = [
  { path: "/", element: <Home /> },

];

const RRoutes = () => {


const objet = [

    {
        id : 1 ,
        name : "Home",
        
    }, 
    {
        id : 2 ,
        name : "About",
        
    }, 
    {
        id : 3 ,
        name : "Services",
        
    }, 
    {
        id : 4 ,
        name : "Contact",
    }
]















  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PageTransition>{element}</PageTransition>}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default RRoutes;