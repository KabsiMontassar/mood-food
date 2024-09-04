import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Bienetre from './Pages/Bienetre';
import PageTransition from './components/PageTransition';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/Bien" element={<PageTransition><Bienetre /></PageTransition>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
