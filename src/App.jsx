
import React, {useState} from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoutesWithTransitions from './Routes';
import Footer from './components/Footer';
function App() {

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  return (
    <>
      <Router>
        <Navbar  isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} />
          <RoutesWithTransitions  /> 
        <Footer />
      </Router>
    </>
  )
}

export default App
