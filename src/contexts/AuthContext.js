import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(); //gets current user which is initially empty
  const [loading, setLoading] = useState(true); // loads till the user is there
  
  //User is set not created
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  //this makes the function run only once
  //unsubscribes from the method onAuthStateChanged listener when we unmount the component
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };
  //value provides all the information of authentication
  // returns current user inside AuthContext
  return (
    <AuthContext.Provider value={value}>
      {/* makes sure the user is there */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
