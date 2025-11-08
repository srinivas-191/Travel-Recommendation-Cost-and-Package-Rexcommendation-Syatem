import React from "react";
import { useEffect } from "react";
import AOS from "aos";

const animateCounter = (id, target, duration) => {
  let start = 0;
  const element = document.getElementById(id);
  const intervalTime = 10; // ms
  const steps = Math.ceil(duration / intervalTime);
  const increment = target / steps;

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      clearInterval(counter);
      element.textContent = target;
    } else {
      element.textContent = Math.ceil(start);
    }
  }, intervalTime);
};

const HomeIndicators = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      animateCounter("travellers", 100, 2000);
      animateCounter("destinations", 500, 2000);
      animateCounter("rate", 95, 2000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    AOS.init({
      // Global settings for AOS
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });
    AOS.refresh(); // Recalculate positions of elements
  }, []);
  return (
    <>
      {/* Numbers Section */}
      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "papayawhip" }}
        data-aos="fade-down"
      >
        <div className="container">
          <div className="row text-center">
            <div className="col-12 col-md-4">
              <div className="d-flex justify-content-center">
                <p id="travellers" className="fw-bold fs-1 number">
                  0
                </p>
                <p className="fw-bold fs-1">K+</p>
              </div>
              <p className="fw-bold">Happy Travellers</p>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex justify-content-center">
                <p id="destinations" className="fw-bold fs-1 number">
                  0
                </p>
                <p className="fw-bold fs-1">K+</p>
              </div>
              <p className="fw-bold">Destinations</p>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex justify-content-center">
                <p id="rate" className="fw-bold fs-1 number">
                  0
                </p>
                <p className="fs-1 fw-bold">%</p>
              </div>
              <p className="fw-bold">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeIndicators;
