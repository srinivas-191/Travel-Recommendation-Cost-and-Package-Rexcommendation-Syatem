import React, {useEffect} from "react";
import "./airesults.css";
import img1 from "../../../../assets/banglorePckg1.avif";
import img2 from "../../../../assets/banglorePckg2.avif";
import img3 from "../../../../assets/banglorePckg3.avif";
import img4 from "../../../../assets/banglorePckg4.avif";
import AOS from "aos";

const AiResults = () => {
  useEffect(() => {
          AOS.init({ duration: 1000, once: true });
          AOS.refresh();
        }, []);
  return (
    <div className="container-fluid aiResults py-5">
      <div className="container">
        <div className="row" data-aos="zoom-in-down">
          <div className="col-12 col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card pckgCard border-0 outline-0">
              <div className="position-relative">
                <img
                  src={img1}
                  className="card-img-top "
                  alt="..."
                  style={{ height: "200px" }}
                />
                <p className="position-absolute bottom-0 start-0 fw-bold ms-3 text-white">
                  <i className="bi bi-clock"></i> 2D/1N
                </p>
              </div>
              <div className="card-body">
                {[...Array(4)].map((_, i) => (
                  <i className="bi bi-star-fill mx-1 text-warning" key={i}></i>
                ))}
                <i className="bi bi-star mx-1 text-warning"></i>
                3151 Ratings
                <h5 className="card-title" style={{ height: "60px" }}>
                  Kanva Lake Camping
                </h5>
                <p className="card-text fs-6">
                  <del>
                    <i className="bi bi-currency-rupee"></i> 2280.00
                  </del>
                </p>
                <p className="fw-bold">
                  <i className="bi bi-currency-rupee"></i> 1249.00{" "}
                  <sub className="fw-light">per adult</sub>
                </p>
                <div className="border">
                  <a
                    href="#"
                    className="btn btn-danger px-4 text-center d-block"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card pckgCard border-0 outline-0">
              <div className="position-relative">
                <img
                  src={img2}
                  className="card-img-top "
                  alt="..."
                  style={{ height: "200px" }}
                />
                <p className="position-absolute bottom-0 start-0 fw-bold ms-3 text-white">
                  <i className="bi bi-clock"></i> 7H
                </p>
              </div>
              <div className="card-body">
                {[...Array(4)].map((_, i) => (
                  <i className="bi bi-star-fill mx-1 text-warning" key={i}></i>
                ))}
                <i className="bi bi-star mx-1 text-warning"></i>
                1643 Ratings
                <h5 className="card-title" style={{ height: "60px" }}>
                  Ramanagara Adventure Camp
                </h5>
                <p className="card-text fs-6">
                  <del>
                    <i className="bi bi-currency-rupee"></i> 1499.00
                  </del>
                </p>
                <p className="fw-bold">
                  <i className="bi bi-currency-rupee"></i> 1349.00{" "}
                  <sub className="fw-light">per adult</sub>
                </p>
                <div className="border">
                  <a
                    href="#"
                    className="btn btn-danger px-4 text-center d-block"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card pckgCard border-0 outline-0">
              <div className="position-relative">
                <img
                  src={img3}
                  className="card-img-top "
                  alt="..."
                  style={{ height: "200px" }}
                />
                <p className="position-absolute bottom-0 start-0 fw-bold ms-3 text-white">
                  <i className="bi bi-clock"></i> 2D/1N
                </p>
              </div>
              <div className="card-body">
                {[...Array(4)].map((_, i) => (
                  <i className="bi bi-star-fill mx-1 text-warning" key={i}></i>
                ))}
                <i className="bi bi-star mx-1 text-warning"></i>
                5739 Ratings
                <h5 className="card-title" style={{ height: "60px" }}>
                  Nature Adventure Camping In Kanakapura
                </h5>
                <p className="card-text fs-6">
                  <del>
                    <i className="bi bi-currency-rupee"></i> 2599.00
                  </del>
                </p>
                <p className="fw-bold">
                  <i className="bi bi-currency-rupee"></i> 2399.00{" "}
                  <sub className="fw-light">per adult</sub>
                </p>
                <div className="border">
                  <a
                    href="#"
                    className="btn btn-danger px-4 text-center d-block"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card pckgCard border-0 outline-0">
              <div className="position-relative">
                <img
                  src={img4}
                  className="card-img-top "
                  alt="..."
                  style={{ height: "200px" }}
                />
                <p className="position-absolute bottom-0 start-0 fw-bold ms-3 text-white">
                  <i className="bi bi-clock"></i> 7H
                </p>
              </div>
              <div className="card-body">
                {[...Array(4)].map((_, i) => (
                  <i className="bi bi-star-fill mx-1 text-warning" key={i}></i>
                ))}
                <i className="bi bi-star mx-1 text-warning"></i>
                3367 Ratings
                <h5 className="card-title" style={{ height: "60px" }}>
                  Camping in Nandi Hills
                </h5>
                <p className="card-text fs-6">
                  <del>
                    <i className="bi bi-currency-rupee"></i> 1499.00
                  </del>
                </p>
                <p className="fw-bold">
                  <i className="bi bi-currency-rupee"></i> 1399.00{" "}
                  <sub className="fw-light">per adult</sub>
                </p>
                <div className="border">
                  <a
                    href="#"
                    className="btn btn-danger px-4 text-center d-block"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiResults;
