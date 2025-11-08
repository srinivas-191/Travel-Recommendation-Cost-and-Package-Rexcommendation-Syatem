import React, { createContext, useContext, useState, useEffect } from "react";

export const DestinationContext = createContext();

const DestinationProvider = ({ children }) => {
  const [destination, setDestination] = useState("");
  useEffect(() => {
    if (!destination) {
      const saved = localStorage.getItem("lastDestination");
      setDestination(saved);
    }
  }, []);
  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};

export default DestinationProvider;

export const useDestinationData = () => useContext(DestinationContext);
