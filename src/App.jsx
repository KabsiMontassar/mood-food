import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoutesWithTransitions from './Routes';
import Footer from './components/Footer';
import SplitLayout from './Pages/auth/SplitLayout';
import { useAuth, AuthProvider } from './Pages/auth/AuthContext'; // Use updated Auth Context
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

function AppContent() {
  const { isUserSignedIn, loading } = useAuth(); // Access auth state using useAuth
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (loading) return null; // Render nothing while loading (optional: show a loading spinner)

  return (
    <>
      {/* Show modal if user is not signed in */}
      <Modal onClose={onClose} size="full" isOpen={!isUserSignedIn && isOpen}>
        <ModalOverlay />
        <ModalContent>
          <SplitLayout />
          <ModalFooter>
            <Button
              bg="none"
              _hover={{ bg: 'none' }}
              fontSize={{ base: 'sm', md: 'md' }}
              onClick={onClose}
            >
              X
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Render Navbar, Routes, and Footer */}
      <Navbar OpenAuth={onOpen} />
      <RoutesWithTransitions />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider> {/* AuthProvider wraps the entire app */}
      <Router>
        <AppContent /> {/* App content that needs authentication */}
      </Router>
    </AuthProvider>
  );
}

export default App;
