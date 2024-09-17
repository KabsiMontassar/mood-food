import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

import Home from './Pages/Home';
import Bienetre from './Pages/Bienetre';
import Cuisine from './Pages/Cuisine';
import Propos from './Pages/Propos';
import Contact from './Pages/Contact';
import Product from './Pages/Product';
import Repas from './Pages/Admin/Repas';
import Equipement from './Pages/Admin/Equipement';
import Commande from './Pages/Admin/Commande';
import User from './Pages/Admin/User';
import Rendezvous from './Pages/Rendezvous';
import Profile from './Pages/Profile';
import FAQ from './Pages/FAQ';
import Recipes from './Pages/Recipes'; // Import the Recipes component




const routes = [
  { path: "/", element: <Home /> },
  { path: "/Bien", element: <Bienetre /> },
  { path: "/Cuisine", element: <Cuisine /> },
  { path: "/Propos", element: <Propos /> },
  { path: "/Product", element: <Product /> },
  { path: "/Contact", element: <Contact /> },
  { path: "/Rendezvous", element: <Rendezvous /> },
  { path: "/FAQ", element: <FAQ /> },

  { path: "profile", element: <Profile /> },


  { path: "/Repas", element: <Repas /> },
  { path: "/Equipement", element: <Equipement /> },
  { path: "/Commande", element: <Commande /> },
  
  { path: "/User", element: <User /> },

  


  { path: "/recipes", element: <Recipes /> }, // Added route for Recipes
  { path: "*", element: <h1>error</h1> },
];

const RRoutes = () => {




  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/bienetre" element={<Bienetre />} />
        <Route path="/cuisine" element={<Cuisine />} />
        <Route path="/propos" element={<Propos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rendezvous" element={<Rendezvous />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipes" element={<Recipes />} />

        {/* Admin Routes */}
        <Route path="/repas" element={<Repas />} />
        <Route path="/equipement" element={<Equipement />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/user" element={<User />} />

        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUpPage />} />

        {/* Catch-all Route for Unknown Paths */}
        <Route path="*" element={<h1>Error: Page Not Found</h1>} />
      </Routes>
    </AnimatePresence>
  );
};

export default RoutesComponent;
