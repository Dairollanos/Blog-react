import React, { useContext, createContext, useState, useEffect } from "react";
import { auth, database } from "../firebase";

//context
export const AuthContext = createContext();

//Hook
export function useAuthContext() {
  return useContext(AuthContext);
}
//provider
export const AuthProvider = ({ children }) => {
  const [CurrentUser, setCurrentUser] = useState();
  const [Loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updatePassword(password) {
    return CurrentUser.updatePassword(password);
  }

  function updateEmail(email) {
    return CurrentUser.updateEmail(email);
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

      return unsuscribe;
    });
  }, []);

  const value = {
    CurrentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!Loading && children}
    </AuthContext.Provider>
  );
};
