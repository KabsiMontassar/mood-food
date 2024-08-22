
import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
// import RoutesWithTransitions from './Routes';
function App() {

  return (
    <>
      <Router>
      <Navbar />
      {/* <RoutesWithTransitions /> */}
      
   
    </Router>
    </>
  )
}

export default App
