import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

import packageData from "../../data/packageData";
import { useHomeSearchData } from "./HomeSearchContext";
import useTravelCost from "../../context/TravelContext";
import Login from "../../../../pages/Login";
import travelImage from "../../../../assets/travel.webp";

const HomeSearchWidget = () => {
  const { setSearch } = useHomeSearchData();
  const { user } = useTravelCost(); // ✅ get user state
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [citySelected, setCitySelected] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const typeDropdownRef = useRef(null);
  const navigate = useNavigate();

  const citiesList = [
    "Munnar","Mysuru","Shimla","Rann of Kutch","Andaman","Auli","Kochi","Ooty",
    "Alleppey","Varanasi","Pondicherry","Darjeeling","Goa","Chennai","Leh-Ladakh",
    "Bengaluru","Rishikesh","Kodaikanal","Jaipur","Mumbai","Coorg","Agra","Delhi","Jaisalmer",
  ].sort();

  const destinationTypeList = packageData[searchTerm] || {};
  const { destinationTypes = [] } = destinationTypeList;

  // ✅ city + type navigate logic (only if logged in)
  useEffect(() => {
    if (user && searchTerm && searchType) {
      const searchTerms = { city: searchTerm, type: searchType };
      setSearch(searchTerms);
      localStorage.setItem("lastHomeSearch", JSON.stringify(searchTerms));
      navigate("/favourites");
    }
  }, [user, searchTerm, searchType]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSelect = (city) => {
    if (!user) return setShowLoginPopup(true); // prevent city select
    setSearchTerm(city);
    setCitySelected(true);
    setTimeout(() => {
      typeDropdownRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    toast.success(`City selected: ${city}`, { position: "top-center", autoClose: 2000 });
  };

  const handleInputChange = (e) => {
    if (!user) return setShowLoginPopup(true); // prevent typing before login
    setSearchTerm(e.target.value);
    setCitySelected(false);
  };

  const handleTypeChange = (e) => {
    if (!user) return setShowLoginPopup(true); // prevent selecting type
    setSearchType(e.target.value);
  };

  const cities = citiesList.filter((city) =>
    city.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <>
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 className="text-center px-5 my-4">
              Know Your Favourite Destination & Type{" "}
            </h1>

            {/* --- City Input --- */}
            <div className="px-5 py-2">
              <label className="form-label fs-5">Trip (please select the city.)</label>
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                placeholder="select the destination city"
                onChange={handleInputChange}
              />

              {/* List of cities */}
              {searchTerm.trim() !== "" && !citySelected && (
                <div className="card my-3 p-3 w-50 mx-auto text-center">
                  {cities.map((ele, index) => (
                    <p
                      key={index}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelect(ele)}
                      onKeyDown={(e) => e.key === "Enter" && handleSelect(ele)}
                      style={{ cursor: "pointer", margin: "0.25rem 0" }}
                    >
                      {ele}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* --- Type Dropdown --- */}
            <div className="px-5 py-2">
              <label className="form-label fs-5">
                Type (please select the destination type.)
              </label>
              <select
                className="form-control"
                ref={typeDropdownRef}
                value={searchType}
                onChange={handleTypeChange}
              >
                <option value="">-- Select a type --</option>
                {destinationTypes.map((ele, i) => (
                  <option key={i} value={ele.type}>
                    {ele.type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-6 px-0 order-1 order-lg-2">
            <img src={travelImage} alt="Travel" className="img-fluid h-100" />
          </div>
        </div>
      </div>

      {/* ✅ Login Popup (same design as ProtectedRoute) */}
      {showLoginPopup && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("login-overlay")) {
              setShowLoginPopup(false);
            }
          }}
          className="login-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              width: "420px",
              boxShadow: "0 4px 25px rgba(0,0,0,0.2)",
              padding: "30px 40px",
              position: "relative",
              animation: "popIn 0.3s ease",
            }}
          >
            <Login onSuccess={() => setShowLoginPopup(false)} />
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default HomeSearchWidget;
