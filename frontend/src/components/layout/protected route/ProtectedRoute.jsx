// src/components/layout/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import useTravelCost from "../context/TravelContext";
import Login from "../../../pages/Login";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useTravelCost();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [redirectedFromProtected, setRedirectedFromProtected] = useState(false);

  // ✅ Detect unauthorized access attempt
  useEffect(() => {
    if (!user && location.pathname === "/favourites") {
      // mark that we tried to access protected route
      setRedirectedFromProtected(true);
      navigate("/home", { replace: true, state: { from: "favourites" } });
    }

    // show popup if redirected from protected route
    if (location.state?.from === "favourites" && !user) {
      setShowLoginPopup(true);
      // remove the state so it doesn't trigger again
      navigate("/home", { replace: true, state: {} });
    }
  }, [user, location, navigate]);

  // ✅ Prevent access if not logged in
  if (!user && location.pathname !== "/home") {
    return <Navigate to="/home" replace />;
  }

  // ✅ Show login popup after redirect
  return (
    <>
      {children}
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
            animation: "fadeIn 0.4s ease",
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
    </>
  );
};

export default ProtectedRoute;
