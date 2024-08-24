// src/RoutesWithTransitions.js
import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Home from './Pages/Home';
import Bienetre from './Pages/Bienetre';
import Cuisine from './Pages/Cuisine';
import Propos from './Pages/Propos';
import Contact from './Pages/Contact';
import Repas from './Pages/Repas';
import Equipement from './Pages/Equipement';
import Commande from './Pages/Commande';
import User from './Pages/User';
import Experts from './Pages/Experts';
import Rendezvous from './Pages/Rendezvous';
import Profile from './Pages/Profile';



const routes = [
  { path: "/", element: <Home /> },
  { path: "/Bien", element: <Bienetre /> },
  { path: "/Cuisine", element: <Cuisine /> },
  { path: "/Propos", element: <Propos /> },
  { path: "/Contact", element: <Contact /> },
  { path: "/Rendezvous", element: <Rendezvous /> },

  { path: "profile", element: <Profile /> },


  { path: "/Repas", element: <Repas /> },
  { path: "/Equipement", element: <Equipement /> },
  { path: "/Commande", element: <Commande /> },
  { path: "/Experts", element: <Experts /> },
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