import React, { useContext, createContext, useState, useEffect } from "react";

export const HomeSearchContext = createContext();
const HomeSearchProvider = ({ children }) => {
  const [Search, setSearch] = useState([]);
  console.log(Search);
  useEffect(() => {
    if (!Search || Object.keys(Search).length === 0) {
      const saved = localStorage.getItem("lastHomeSearch");
      if (saved) {
        setSearch(JSON.parse(saved));
      }
    }
  }, []);
  return (
    <HomeSearchContext.Provider value={{ Search, setSearch }}>
      {children}
    </HomeSearchContext.Provider>
  );
};

export default HomeSearchProvider;

export const useHomeSearchData = () => useContext(HomeSearchContext);
