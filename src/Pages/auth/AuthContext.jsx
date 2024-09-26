import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth"; // Import Firebase functions

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [authError, setAuthError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserSignedIn(!!user);
    });
    return () => unsubscribe();
  }, [auth]);

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthError(null);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth); 
      setIsUserSignedIn(false);
    } catch (error) {
      console.error("Sign-out failed", error);
    }
  };

  const value = {
    isUserSignedIn,
    signIn,
    signOut,
    authError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
