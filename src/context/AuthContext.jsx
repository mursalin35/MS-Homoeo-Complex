"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  signOut
} from "@/lib/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Signup
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logOut = () => signOut(auth);

  // Update profile
  const updateUser = (profile) =>
    auth.currentUser
      ? updateProfile(auth.currentUser, profile)
      : Promise.reject("No user logged in");

  // Google Sign-in
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  // Auth State Tracking
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) =>
      setUser(currentUser)
    );
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, createUser, login, logOut, updateUser, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook (always use this in components)
export const useAuth = () => useContext(AuthContext);
