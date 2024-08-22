// src/RoutesWithTransitions.js
import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Home from './Pages/Home';
import Second from './Pages/Second';
import Third from './Pages/Third';
import Propos from './Pages/Propos';
import Contact from './Pages/Contact';
import Repas from './Pages/Repas';
import Equipement from './Pages/Equipement';
import Commande from './Pages/Commande';
import User from './Pages/User';



const routes = [
  { path: "/", element: <Home /> },
  { path: "/Second", element: <Second /> },
  { path: "/Third", element: <Third /> },
  { path: "/Propos", element: <Propos /> },
  { path: "/Contact", element: <Contact /> },
  { path: "/Repas", element: <Repas /> },
  { path: "/Equipement", element: <Equipement /> },
  { path: "/Commande", element: <Commande /> },
  { path: "/User", element: <User /> },
  { path: "*", element: <h1>error</h1> },
];

const RRoutes = () => {




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