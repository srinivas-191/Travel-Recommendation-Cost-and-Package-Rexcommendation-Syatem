import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark text-white pt-5 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <h5 className="text-uppercase mb-4 fw-bold text-primary">
                Explore
              </h5>
              <ul className="list-unstyled">
                <li>
                  <Link
                    to="/packages"
                    className="text-white text-decoration-none"
                  >
                    Travel Packages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/destinations"
                    className="text-white text-decoration-none"
                  >
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white text-decoration-none">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-white text-decoration-none">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-5 col-sm-6 mb-4">
              <h5 className="text-uppercase mb-4 fw-bold text-primary">
                Get In Touch
              </h5>
              <p>
                <i className="fas fa-map-marker-alt me-3"></i> 123 Marga Darshi,
                Adventure City
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> +1 (555) 123-4567
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                <a className="text-white text-decoration-none">
                  margadarshi@travelsite.com
                </a>
              </p>
            </div>
            <div className="col-md-4 col-sm-12 mb-4">
              <h5 className="text-uppercase mb-4 fw-bold text-primary">
                Follow Us
              </h5>
              <div className="d-flex social-links">
                <a className="text-white me-4 fs-4">
                  <i className="bi text-white bi-facebook"></i>
                </a>
                <a className="text-white me-4 fs-4">
                  <i className="bi text-white bi-twitter"></i>
                </a>
                <a className="text-white me-4 fs-4">
                  <i className="bi text-white bi-instagram"></i>
                </a>
                <a className="text-white fs-4">
                  <i className="bi text-white bi-pinterest"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="mb-4 mt-0 border-secondary" />
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-8">
              <p className="text-md-start text-center mb-md-0">
                &copy; {new Date().getFullYear()} Margadharshi.Co. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 col-lg-4 text-md-end text-center">
              <Link
                to="/privacy"
                className="text-white text-decoration-none me-3"
              >
                Privacy Policy
              </Link>
              |
              <Link
                to="/terms"
                className="text-white text-decoration-none ms-3"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
