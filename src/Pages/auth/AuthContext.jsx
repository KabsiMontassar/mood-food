import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = createContext();

// Attach the global variable to the window object
window.globalUserEmail = false;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserSignedIn(true);
        window.globalUserEmail = user.email; // Set window variable to user email
      } else {
        setIsUserSignedIn(false);
        window.globalUserEmail = false; // Reset window variable to false when signed out
      }
      setLoading(false); // Auth check done, stop loading
    });
    return () => unsubscribe();
  }, [auth]);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setIsUserSignedIn(false);
      window.globalUserEmail = false; // Reset window variable on sign-out
    } catch (error) {
      console.error("Sign-out failed", error);
    }
  };

  const value = {
    isUserSignedIn,
    signIn,
    signOut,
    authError,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
