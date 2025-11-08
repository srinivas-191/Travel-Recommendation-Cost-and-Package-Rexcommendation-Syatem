import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Avatar } from "antd";
import useTravelCost from "./context/TravelContext";
import { toast } from "react-toastify";
import "./navlink.css";
import AOS from "aos";

const Navbar = () => {
  const [showPackagesLink, setShowPackagesLink] = useState(false);

  useEffect(() => {
    AOS.init({
      // Global settings for AOS
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });
    AOS.refresh(); // Recalculate positions of elements
  }, []);
    useEffect(() => {
  const handleStorageChange = () => {
    const flag = localStorage.getItem("showPackagesLink");
    setShowPackagesLink(flag === "true");
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);




  const [isToggle, setToggle] = useState(true);
  const updatedToggle = () => {
    setToggle(!isToggle);
  };
  const { user, loginWithGoogle, logout } = useTravelCost();
  let navigate = useNavigate();

  const handleAuth = async () => {
    if (!user) {
      await loginWithGoogle();
      navigate("/home");
      toast("user logged in successfully");
    } else {
      await logout();
      navigate("/");
      toast("user logged out successfully");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-aos="fade-down">
      <div className="container-fluid">
        {/* Bootstrap brand/logo class */}
        <NavLink to="/" className="navbar-brand fs-4 text-primary">
          MARGHADHARSHI
        </NavLink>

        {/* Bootstrap toggler button for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={updatedToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content for the navigation links */}
        <div
          className={`collapse navbar-collapse ${isToggle ? "" : "show"}`}
          id="navbarNav"
        >
          {/* Bootstrap class for unordered list of links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
  <li className="nav-item">
    <NavLink to="/home" className="nav-link">
      Home
    </NavLink>
  </li>
  <li className="nav-item">
    <NavLink to="/destinations" className="nav-link">
      Destinations
    </NavLink>
  </li>
  {showPackagesLink && (
  <li className="nav-item">
    <NavLink to="/packages" className="nav-link">
      Packages
    </NavLink>
  </li>
)}

  {/* Show favourites link only if logged in */}
  {user && (
    <li className="nav-item">
      <NavLink to="/favourites" className="nav-link">
        Favourites
      </NavLink>
    </li>
  )}
</ul>

          <div className="d-flex gap-3 align-items-center">
            {user && (
              <div className="d-flex align-items-center gap-1">
                <Avatar src={user.photo || "u"} />
                <p>{user.name || "user"}</p>
              </div>
            )}
            <Button onClick={handleAuth}>
              {user ? "logout" : "login with google"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
