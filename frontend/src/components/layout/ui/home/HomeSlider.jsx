import React from "react";
import { useState, useEffect } from "react";
import "./homeslider.css";
import AOS from "aos";
import img1 from "../../../../assets/Goa.webp"
import img2 from "../../../../assets/ooty.jpg"
import img3 from "../../../../assets/jaisalmer.jpeg"
import img4 from "../../../../assets/udaipur.jpeg"
import img5 from "../../../../assets/varanasi.jpg"
import img6 from "../../../../assets/manali.jpeg"

const HomeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev == 0
          ? 1
          : prev == 1
          ? 2
          : prev == 2
          ? 3
          : prev == 3
          ? 4
          : prev == 4
          ? 5
          : 0
      );
    }, 5000);
    return () => clearInterval(interval);
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
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide "
        data-bs-ride="carousel"
        data-aos="fade-up"
      >
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex == 0 ? "active" : ""}`}>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <p className="my-5 fs-5 w-50 mx-auto fw-meduium text-dark">
                  Goa is a state in western India with coastlines stretching
                  along the Arabian Sea. Its long history as a Portuguese colony
                  prior to 1961 is evident in its preserved 17th-century
                  churches and the area’s tropical spice plantations. Goa is
                  also known for its beaches, ranging from popular stretches at
                  Baga and Palolem to those in laid-back fishing villages such
                  as Agonda.
                </p>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <img
                  src={img1}
                  className="d-block w-100 img-fluid"
                  alt="..."
                  style={{ height: "500px" }}
                />
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeIndex == 1 ? "active" : ""}`}>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <img
                  src={img2}
                  className="d-block w-100 img-fluid"
                  alt="..."
                  style={{ height: "500px" }}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <p className="my-5 fs-5 w-50 mx-auto fw-meduium text-dark">
                  Ooty (short for Udhagamandalam) is a resort town in the
                  Western Ghats mountains, in southern India's Tamil Nadu state.
                  Founded as a British Raj summer resort, it retains a working
                  steam railway line. Other reminders of its colonial past
                  include Stone House, a 19th-century residence, and the
                  circa-1829 St. Stephen’s Church. Its 55-acre Government
                  Botanical Garden lies on the slopes of Doddabetta Peak.
                </p>
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeIndex == 2 ? "active" : ""}`}>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <p className="my-5 fs-5 w-50 mx-auto fw-meduium text-dark">
                  Jaisalmer is a former medieval trading center and a princely
                  state in the western Indian state of Rajasthan, in the heart
                  of the Thar Desert. Known as the "Golden City," it's
                  distinguished by its yellow sandstone architecture. Dominating
                  the skyline is Jaisalmer Fort, a sprawling hilltop citadel
                  buttressed by 99 bastions. Behind its massive walls stand the
                  ornate Maharaja's Palace and intricately carved Jain temples.
                </p>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <img
                  src={img3}
                  className="d-block w-100 img-fluid"
                  alt="..."
                  style={{ height: "500px" }}
                />
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeIndex == 3 ? "active" : ""}`}>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <img
                  src={img4}
                  className="d-block w-100 img-fluid"
                  alt="..."
                  style={{ height: "500px" }}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <p className="my-5 fs-5 w-50 mx-auto fw-meduium text-dark">
                  Udaipur, formerly the capital of the Mewar Kingdom, is a city
                  in the western Indian state of Rajasthan. Founded by Maharana
                  Udai Singh II in 1559, it’s set around a series of artificial
                  lakes and is known for its lavish royal residences. City
                  Palace, overlooking Lake Pichola, is a monumental complex of
                  11 palaces, courtyards and gardens, famed for its intricate
                  peacock mosaics.
                </p>
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeIndex == 4 ? "active" : ""}`}>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <p className="my-5 fs-5 w-50 mx-auto fw-meduium text-dark">
                  Varanasi is a city in the northern Indian state of Uttar
                  Pradesh dating to the 11th century B.C. Regarded as the
                  spiritual capital of India, the city draws Hindu pilgrims who
                  bathe in the Ganges River’s sacred waters and perform funeral
                  rites. Along the city's winding streets are some 2,000
                  temples, including Kashi Vishwanath, the “Golden Temple,”
                  dedicated to the Hindu god Shiva.
                </p>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <img
                  src={img5}
                  className="d-block w-100 img-fluid"
                  alt="..."
                  style={{ height: "500px" }}
                />
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeIndex == 5 ? "active" : ""}`}>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <img
                  src={img6}
                  className="d-block w-100 img-fluid"
                  alt="..."
                  style={{ height: "500px" }}
                />
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <p className="my-5 fs-5 w-50 mx-auto fw-meduium text-dark">
                  Manali is a high-altitude Himalayan resort town in India’s
                  northern Himachal Pradesh state. It has a reputation as a
                  backpacking center and honeymoon destination. Set on the Beas
                  River, it’s a gateway for skiing in the Solang Valley and
                  trekking in Parvati Valley. It's also a jumping-off point for
                  paragliding, rafting and mountaineering in the Pir Panjal
                  mountains, home to 4,000m-high Rohtang Pass.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 fs-5 start-50 translate-middle-x">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              className="btn border-0 bg-transparent"
              onClick={() => setActiveIndex(index)}
            >
              <i
                className={`bi ${
                  activeIndex == index ? "bi-circle-fill" : "bi-circle"
                }`}
                style={{ fontSize: ".75rem", color: "red" }}
              ></i>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeSlider;
