import React, { useState, useRef } from 'react';
import { Box, Text,useColorModeValue } from '@chakra-ui/react';
// import { Transition } from 'react-transition-group';
import Rendezvousprompt from '../components/RendezVousPrompt';
import ExpertsList from '../components/ExpertsList';

const Rendezvous = () => {
  const [showlist, setShowlist] = useState(false);
  const [issue, setIssue] = useState('');
  const [type, setType] = useState('');
  const [visible, setVisible] = useState(true);
  const nodeRef = useRef(null);

  return (
    <Box bg={useColorModeValue('#FFFCF6', '#1A202C')} p={4}  overflow="hidden" >
     
    
         
            <Rendezvousprompt
              setShowlist={(value) => {
                setVisible(false);
                setTimeout(() => setShowlist(value), 500);
              }}
              setIssue={setIssue}
              setType={setType}
            />
        
    
    
      {showlist && (
          <ExpertsList  issue={issue} type={type}/>
      )}
    </Box>
  );
};

export default Rendezvous;

const defaultStyle = {
  transition: `opacity 500ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
