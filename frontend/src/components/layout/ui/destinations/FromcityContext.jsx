import React, { useContext, createContext, useState, useEffect } from "react";

export const FromcityContext = createContext();
const FromcityProvider = ({ children }) => {
  const [Fromcity, setFromcity] = useState("Ahmedabad");
  console.log(Fromcity);
  useEffect(() => {
    if (!Fromcity || Object.keys(Fromcity).length === 0) {
      const saved = localStorage.getItem("lastFromcity");
      if (saved) {
        setFromcity(JSON.parse(saved));
      }
    }
  }, []);
  return (
    <FromcityContext.Provider value={{ Fromcity, setFromcity }}>
      {children}
    </FromcityContext.Provider>
  );
};

export default FromcityProvider;

export const useFromcityData = () => useContext(FromcityContext);
