import React, { useState, useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Transition } from 'react-transition-group';
import Rendezvousprompt from '../components/RendezVousPrompt';
import ExpertsList from '../components/ExpertsList';

const Rendezvous = () => {
  const [showlist, setShowlist] = useState(false);
  const [issue, setIssue] = useState('');
  const [type, setType] = useState('');
  const [visible, setVisible] = useState(true);
  const nodeRef = useRef(null);

  return (
    <Box>
      <Transition
        in={visible && !showlist}
        timeout={500}
        nodeRef={nodeRef}
        onExited={() => setVisible(false)}
        unmountOnExit
      >
        {(state) => (
          <div
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <Rendezvousprompt
              setShowlist={(value) => {
                setVisible(false);
                setTimeout(() => setShowlist(value), 500);
              }}
              setIssue={setIssue}
              setType={setType}
            />
          </div>
        )}
      </Transition>

      {showlist && (
        <>
          <Text textAlign="center" fontSize="xl" fontWeight="bold" p={4}>
            Available 
            {
              type === 'Psychology' ? ' Psychologists' : type === 'Nutrition' ? ' Nutritionists' : ''
            }
            {' '}
            for
            {' '}
            {issue}
          </Text>
          <ExpertsList />
        </>
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
