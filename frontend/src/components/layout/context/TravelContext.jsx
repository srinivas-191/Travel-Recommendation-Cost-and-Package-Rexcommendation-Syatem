//using firebase authentication feature
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../../firebaseconfig";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

//creating an instance of the feature
const getGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
};

//creating the context
const TravelContext = createContext();
export const TravelProvider = ({ children }) => {
  //for storing/getting the user localstorage
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      return null;
    }
  });
  //function for tracking the changes of the user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        const uobj = {
          uid: u.uid,
          name: u.displayName,
          photo: u.photoURL,
        };
        //updating the state variable with user info
        setUser(uobj);
        //storing the logged user information into local storage
        localStorage.setItem("user", JSON.stringify(uobj));
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return unsub;
  }, []);
  //function to handle googlelogin
  const loginWithGoogle = async () => {
    try {
      let provider = getGoogleProvider();
      let res = await signInWithPopup(auth, provider);
      //The signed-in user info
      const u = res.user;
      console.log("userinfo:", u);
      const uobj = {
        uid: u.uid,
        name: u.displayName,
        photo: u.photoURL,
      };
      //updating the state variable with user info
      setUser(uobj);
      //storing the logged user information into local storage
      localStorage.setItem("user", JSON.stringify(uobj));
    } catch (error) {
      console.log("failed to log", error);
      return error;
    }
  };
  //function to logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      alert("error in logout");
    }
  };
  return (
    <TravelContext.Provider value={{ user, setUser, loginWithGoogle, logout }}>
      {children}
    </TravelContext.Provider>
  );
};

//custom hook
const useTravelCost = () => useContext(TravelContext);
export default useTravelCost;
