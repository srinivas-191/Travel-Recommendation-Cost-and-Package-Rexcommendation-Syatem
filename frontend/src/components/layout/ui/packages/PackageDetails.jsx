import React, {useEffect} from "react";
import AOS from "aos";
import { useParams } from "react-router-dom";
import { usePackageData } from "./PackageProvider";
import { useDestinationData } from "../destinations/DestinationContext";
import "./packageData.css"

const PackageDetails = () => {
  const { packageID } = useParams();
  const { Package } = usePackageData();
  const { destination } = useDestinationData();

  // ✅ Fallback to localStorage if context is empty
  const storedPackage = JSON.parse(localStorage.getItem("lastPackage") || "{}");
  const activePackage = Object.keys(Package || {}).length
    ? Package
    : storedPackage;

  const {
    type = "",
    budget = 0,
    duration = 0,
    recommendations = [],
  } = activePackage;

  // ✅ Ensure recommendations is always an array
  const safeRecommendations = Array.isArray(recommendations)
    ? recommendations
    : (() => {
        try {
          return JSON.parse(recommendations);
        } catch {
          return [];
        }
      })();

  const packageDetails = safeRecommendations.find(
    (pkg) => String(pkg.Package_Id) === String(packageID)
  );

  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        AOS.refresh();
      }, []);

  return (
    <div className="container-fluid PackageDetails">
      <div className="container">
        <div className="row" data-aos="zoom-in-up">
          <div className="col-12">
            {packageDetails ? (
              <div className="card m-3 m-md-5">
                <div className="row g-0"></div>
                  <img src={`/assets1/${destination.replaceAll(" ","")}_${type
          .toLowerCase()
          .replaceAll(" ", "")}.jpg`} class="card-img-top" alt="..." style={{height:"400px"}}/>
                  <div className="card-header">
                    <h5 className="card-title fw-bold text-center">
                            <span className="fw-bold fs-3">
                              {capitalize(packageDetails.Destination)}{" "}
                              {packageDetails.Destination_Type}
                            </span>
                          </h5>
                  </div>
                  <div className="card-body py-5">
                  {/* <div className="d-flex justify-content-center my-5">
                    <table className="tableBg w-50">
                      <tbody className="">
                        <tr className="">
                          <th scope="col" className="card-text fw-bold fs-5 text-success border-0 px-sm-5 py-3"> From City:{" "}</th>
                          <td className="fw-medium fs-5 border-0 px-sm-5 py-3 text-warning">{packageDetails.From_City}</td>
                        </tr>
                        <tr className="">
                          <th scope="col" className="card-text fw-bold fs-5 text-success border-0 px-sm-5 py-3"> Cost:{" "}</th>
                          <td className="fw-medium fs-5 border-0 px-sm-5 py-3 text-warning">{packageDetails.Budget}</td>
                        </tr>
                        <tr className="">
                          <th scope="col" className="card-text fw-bold fs-5 text-success border-0 px-sm-5 py-3"> Trip Duration Days:{" "}</th>
                          <td className="fw-medium fs-5 border-0 px-sm-5 py-3 text-warning">{packageDetails.Trip_Duration_Days} Days</td>
                        </tr>
                        <tr className="">
                          <th scope="col" className="card-text fw-bold fs-5 text-success border-0 px-sm-5 py-3"> Accomodation:{" "}</th>
                          <td className="fw-medium fs-5 border-0 px-sm-5 py-3 text-warning">{packageDetails.Accommodation}</td>
                        </tr>
                        <tr className="">
                          <th scope="col" className="card-text fw-bold fs-5 text-success border-0 px-sm-5 py-3"> Package Type:{" "}</th>
                          <td className="fw-medium fs-5 border-0 px-sm-5 py-3 text-warning">{packageDetails.Package_Type}</td>
                        </tr>
                        <tr className="">
                          <th scope="col" className="card-text fw-bold fs-5 text-success border-0 px-sm-5 py-3"> Transport Mode:{" "}</th>
                          <td className="fw-medium fs-5 border-0 px-sm-5 py-3 text-warning">{packageDetails.Transport_Mode}</td>
                        </tr>
                        <tr className="">
                          <th scope="col" className="card-text fw-bold fs-5 text-success border-0 px-sm-5 py-3"> Season:{" "}</th>
                          <td className="fw-medium fs-5 border-0 px-sm-5 py-3 text-warning">{packageDetails.Season}</td>
                        </tr>
                        <tr className="">
                          <th scope="col" className="card-text fw-bold fs-5 text-success border-0 px-sm-5 py-3"> Activities Count:{" "}</th>
                          <td className="fw-medium fs-5 border-0 px-sm-5 py-3 text-warning">{packageDetails.Activities_Count}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}
                  
                  {/* <p className="card-text fw-bold fs-5 text-success text-center">
                    From City:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.From_City}
                    </span>
                  </p> */}
                  {/* <p className="card-text fw-bold fs-5 text-success">
                    Trip Duration Days:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Trip_Duration_Days} Days
                    </span>
                  </p> */}
                  <div className="d-flex justify-content-around">
                    <div>
                    <p className="card-text fw-bold fs-5 text-success">
                    Accomodation:{" "}
                    <span className="fw-light text-dark mx-3">
                      <img src={`/assets/${packageDetails.Accommodation}.png`} alt="" className="img-fluid mx-1" style={{height:"30px", width:"30px"}}/>
                      {packageDetails.Accommodation}
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Package Type:{" "}
                    <span className="fw-light text-dark mx-3">
                      <img src={`/assets/${packageDetails.Package_Type}.png`} alt="" className="img-fluid mx-1" style={{height:"30px", width:"30px"}}/>
                      {packageDetails.Package_Type}
                    </span>
                  </p>
                  </div>
                  <div>
                    <p className="card-text fw-bold fs-5 text-success">
                    Transport Mode:{" "}
                    <span className="fw-light text-dark mx-3">
                      <img src={`/assets/${packageDetails.Transport_Mode}.png`} alt="" className="img-fluid mx-1" style={{height:"30px", width:"30px"}}/>
                      {packageDetails.Transport_Mode}
                    </span>
                  </p>
                  <p className="card-text fw-bold fs-5 text-success">
                    Season:{" "}
                    <span className="fw-light text-dark mx-3">
                      <img src={`/assets/${packageDetails.Season}.png`} alt="" className="img-fluid mx-1" style={{height:"30px", width:"30px"}}/>
                      {packageDetails.Season}
                    </span>
                  </p>
                  </div>
                  </div>
                  {/* <p className="card-text fw-bold fs-5 text-success">
                    Activities Count:{" "}
                    <span className="fw-light text-dark mx-3">
                      {packageDetails.Activities_Count}
                    </span>
                  </p> */}
                </div>

                <div className="card-footer text-center">
                  <div className="d-md-flex justify-content-around">
                    <p className="text-dark fw-medium fs-5">Duration: <span className="text-secondary fs-6">
                        {packageDetails.Trip_Duration_Days} Days
                      </span>
                    </p>
                    <p className="card-text fw-bold fs-5 text-success">
                      {/* Cost:{" "} */}
                      <span className="fw-bold text-dark mx-3">
                        <i className="bi bi-currency-rupee"></i> {packageDetails.Budget}
                      </span>
                    </p>
                    <p className="text-dark fw-medium fs-5">
                      Activities Count: <span className="text-secondary fs-6">
                        {packageDetails.Trip_Duration_Days} Days
                      </span>
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              <p className="text-white text-center mt-5">
                No package details found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
