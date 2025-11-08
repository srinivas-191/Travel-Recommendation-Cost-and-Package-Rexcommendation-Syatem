import React, { useContext, createContext, useState, useEffect } from "react";

export const PackageContext = createContext();
const PackageProvider = ({ children }) => {
  const [Package, setPackage] = useState([]);
  console.log(Package);
  useEffect(() => {
    if (!Package || Object.keys(Package).length === 0) {
      const saved = localStorage.getItem("lastPackage");
      if (saved) {
        setPackage(JSON.parse(saved));
      }
    }
  }, []);
  return (
    <PackageContext.Provider value={{ Package, setPackage }}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;

export const usePackageData = () => useContext(PackageContext);
