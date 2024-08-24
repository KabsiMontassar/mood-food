
import React, {useState} from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoutesWithTransitions from './Routes';
function App() {

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  return (
    <>
      <Router>
        <Navbar  isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} />
          <RoutesWithTransitions  /> 
      </Router>
    </>
  )
}

export default App
