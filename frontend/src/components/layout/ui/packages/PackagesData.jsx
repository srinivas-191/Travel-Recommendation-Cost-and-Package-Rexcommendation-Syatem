import React, { useState, useEffect } from "react";
import { useDestinationData } from "../destinations/DestinationContext";
import packageData from "../../data/packageData";
import { usePackageData } from "./PackageProvider";
import { useFromcityData } from "../destinations/FromcityContext";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
import useTravelCost from "../../context/TravelContext";
import Login from "../../../../pages/Login";

const PackagesData = () => {
  const [favorites, setFavorites] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [rangeValue, setRangeValue] = useState(3000);
  const [duration, setDuration] = useState(2);

  // 🔥 PER-BUTTON LOADING STATE
  const [loadingType, setLoadingType] = useState(null);

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();
  const { Fromcity } = useFromcityData();
  const { destination } = useDestinationData();
  const { setPackage } = usePackageData();
  const { user } = useTravelCost();

  const data = packageData[destination] || {};
  const { destinationTypes = [] } = data;

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    const stored = localStorage.getItem("favoritePackageTypes");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (!destinationTypes.length) return;

    const stored = localStorage.getItem("destinationFeedback");
    const existing = stored ? JSON.parse(stored) : {};
    const updated = { ...existing };

    destinationTypes.forEach((ele) => {
      if (!updated[ele.type]) {
        updated[ele.type] = {
          baseLikes: Math.floor(Math.random() * 500) + 100,
          baseDislikes: Math.floor(Math.random() * 300) + 50,
          liked: false,
          disliked: false,
        };
      }
    });

    setFeedback(updated);
    localStorage.setItem("destinationFeedback", JSON.stringify(updated));
  }, [destinationTypes]);

  /* ---------------- GET PACKAGE ---------------- */

  const getPackage = async (ele) => {
    setLoadingType(ele.type); // ✅ only this button loads

    const enrichedPackage = {
      ...ele,
      fromCity: Fromcity,
      toCity: destination,
      budget: rangeValue,
      duration,
    };

    setPackage(enrichedPackage);
    localStorage.setItem("lastPackage", JSON.stringify(enrichedPackage));

    try {
      const response = await fetch(
        "https://travel-backend-ttt9.onrender.com/api/recommend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromCity: Fromcity,
            toCity: destination,
            type: ele.type,
            duration,
            budget: rangeValue,
          }),
        }
      );

      if (!response.ok) throw new Error("Backend error");

      const result = await response.json();

      const finalPackage = {
        ...enrichedPackage,
        recommendations: result?.data?.recommendations || [],
      };

      setPackage(finalPackage);
      localStorage.setItem("lastPackage", JSON.stringify(finalPackage));
      localStorage.setItem("showPackagesLink", "true");
      window.dispatchEvent(new Event("storage"));

      navigate("/packages");
    } catch (err) {
      alert("Server is waking up. Please try again.");
      console.error(err);
    } finally {
      setLoadingType(null); // ✅ stop loading
    }
  };

  /* ---------------- FAVORITE ---------------- */

  const toggleFavorite = (destination, type) => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    const key = `${destination}_${type}`;
    const updatedFavorites = favorites.includes(key)
      ? favorites.filter((f) => f !== key)
      : [...favorites, key];

    setFavorites(updatedFavorites);
    localStorage.setItem(
      "favoritePackageTypes",
      JSON.stringify(updatedFavorites)
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="container-fluid my-4 position-relative">
      <div className="container">
        <h5>Enter Duration</h5>
        <input
          type="number"
          className="form-control my-3"
          value={duration}
          min={2}
          onChange={(e) => setDuration(e.target.value)}
        />

        <h5 className="text-center">Enter Budget</h5>
        <input
          type="range"
          className="form-range my-3"
          min={3000}
          max={100000}
          value={rangeValue}
          onChange={(e) => setRangeValue(Number(e.target.value))}
        />
        <div className="fw-medium">{rangeValue}</div>

        <div className="row">
          {destinationTypes.map((ele, i) => {
            const favKey = `${destination}_${ele.type}`;
            const imagePath = `/assets1/${destination.replaceAll(
              " ",
              ""
            )}_${ele.type.toLowerCase().replaceAll(" ", "")}.jpg`;

            return (
              <div key={i} className="col-lg-4 col-md-6 py-3" data-aos="fade-up">
                <div className="card shadow h-100">
                  <img
                    src={imagePath}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                    alt={ele.type}
                  />

                  <div className="card-body">
                    <h5>{ele.type}</h5>
                    <p>{ele.description}</p>

                    <button
                      className="btn btn-primary w-100"
                      disabled={loadingType === ele.type}
                      onClick={() => getPackage(ele)}
                    >
                      {loadingType === ele.type ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Fetching recommendations...
                        </>
                      ) : (
                        "Get Recommendations"
                      )}
                    </button>

                    <div className="text-center mt-3">
                      <button
                        className="btn"
                        onClick={() =>
                          toggleFavorite(destination, ele.type)
                        }
                      >
                        <i
                          className={`bi ${
                            favorites.includes(favKey)
                              ? "bi-heart-fill text-danger"
                              : "bi-heart"
                          }`}
                        ></i>
                      </button>
                    </div>

                    {loadingType === ele.type && (
                      <p className="text-muted text-center mt-2">
                        Waking up server ⏳ Please wait
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOGIN POPUP */}
      {showLoginPopup && (
        <div className="login-overlay">
          <div className="login-box">
            <h5 className="text-center mb-3">
              Please login to save favourites ❤️
            </h5>
            <Login onSuccess={() => setShowLoginPopup(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesData;
