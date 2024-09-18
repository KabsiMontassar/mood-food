import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Rendezvousprompt from '../components/RendezVousPrompt';
import ExpertsList from '../components/ExpertsList';
import { Transition } from 'react-transition-group';


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




const Rendezvous = () => {
  const [showlist, setShowlist] = useState(false);
  const [issue, setIssue] = useState('');
  const [type, setType] = useState('');
  const [visible, setVisible] = useState(true);

  return (
    <Box p={4} overflow="hidden" >

      {
        !showlist && (
          <Transition in={visible} timeout={500}>
            {(state) => (
              <Box style={{ ...defaultStyle, ...transitionStyles[state] }}>
                <Rendezvousprompt
                  setShowlist={setShowlist}
                  setIssue={setIssue}
                  setType={setType}
                  setVisible={setVisible}
                />
              </Box>
            )}
          </Transition>
        )
      }

      {showlist && (
        <ExpertsList issue={issue} type={type} />
      )}
    </Box>
  );
};

export default Rendezvous;
