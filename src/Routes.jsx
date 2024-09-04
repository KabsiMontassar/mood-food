import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Bienetre from './Pages/Bienetre';
import Cuisine from './Pages/Cuisine';
import Propos from './Pages/Propos';
import Contact from './Pages/Contact';
import Repas from './Pages/Admin/Repas';
import Equipement from './Pages/Admin/Equipement';
import Commande from './Pages/Admin/Commande';
import User from './Pages/Admin/User';
import Rendezvous from './Pages/Rendezvous';
import Profile from './Pages/Profile';
import FAQ from './Pages/FAQ';
import SignIn from './components/SignInPage';  
import SignUpPage1 from './components/SignUpPage';
import SignUpPage2 from './components/SignUpPage2';
import SignUpPage3 from './components/SignUpPage3';

const RoutesComponent = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/Pages/Bienetre" element={<Bienetre />} />
      <Route path="/Cuisine" element={<Cuisine />} />
      <Route path="/Propos" element={<Propos />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Rendezvous" element={<Rendezvous />} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin Routes */}
      <Route path="/Repas" element={<Repas />} />
      <Route path="/Equipement" element={<Equipement />} />
      <Route path="/Commande" element={<Commande />} />
      <Route path="/User" element={<User />} />

      {/* Auth Routes */}
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUpPage1" element={<SignUpPage1 />} />  {/* First Signup Step */}
      <Route path="/SignUpPage2" element={<SignUpPage2 />} />  {/* Second Signup Step */}
      <Route path="/SignUpPage3" element={<SignUpPage3 />} />  {/* Third Signup Step */}

      {/* Catch-all Route for Unknown Paths */}
      <Route path="*" element={<h1>Error: Page Not Found</h1>} />
    </Routes>
  );
};

export default RoutesComponent;
