import React, { useEffect } from "react";
import "./homehero.css";
import AOS from "aos";

const HomeHero = ({ header, caption }) => {
  useEffect(() => {
    AOS.init({
      // Global settings for AOS
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });
    AOS.refresh(); // Recalculate positions of elements
  }, []);

  // ... rest of your component
  return (
    <>
      <div className="container-fluid" data-aos="fade-up">
        <div className="row homeHero">
          <div className="col-sm-12 col-md-12 col-sm-12 d-flex flex-column justify-content-end">
            <p
              className="text-danger text-center fw-bold"
              style={{ fontSize: "4.73rem" }}
            >
              {header}
            </p>
          </div>
          <p className="text-center text-white fw-bold fs-4 my-auto">
            {caption}
          </p>
        </div>
      </div>
    </>
  );
};

export default HomeHero;
