// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoutesWithTransitions from './Routes';
import Footer from './components/Footer';
import SplitLayout from './Pages/auth/SplitLayout';
import { getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, signOut } from "firebase/auth";
import { AuthProvider } from './Pages/auth/AuthContext';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

function App() {

  const auth = getAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in");
        onClose();

      } else {
        console.log("No user signed in");

      }
    });
    return () => unsubscribe();
  }, [auth]);



  return (
    <AuthProvider>
      <Router>
        <Modal onClose={onClose} size="full" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <SplitLayout />
            <ModalFooter>
              <Button
                bg="none"
                _hover={{ bg: "none" }}
                fontSize={{ base: "sm", md: "md" }}
                onClick={onClose}
              >
                X
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Navbar OpenAuth={onOpen} />
        <RoutesWithTransitions />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
