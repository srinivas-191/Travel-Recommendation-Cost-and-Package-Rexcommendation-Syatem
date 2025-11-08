// import React from "react";
// import { usePackageData } from "./PackageProvider";
// import { Link } from "react-router-dom";
// import { useDestinationData } from "../destinations/DestinationContext";

// const PackageType = () => {
//   const { Package } = usePackageData();
//   console.log("pckg", Package);
//   const { destination } = useDestinationData();
//   console.log(destination);
//   const { type, budget, duration, recommendations } = Package || {};

//   const safeRecommendations = Array.isArray(recommendations)
//     ? recommendations
//     : (() => {
//         try {
//           return JSON.parse(recommendations); // if it’s a stringified JSON
//         } catch {
//           return []; // fallback
//         }
//       })();

//   console.log(budget);
//   console.log(duration);
//   console.log(type);
//   console.log("rrr", recommendations);
//   return (
//     <>
//       <h3 className="text-center">
//         {safeRecommendations.length > 0 ? "Top Recommendations" : ""}
//       </h3>
//       <div
//         className="container-fluid text-center"
//         style={{
//           backgroundImage: `url(./src/assets/assets1/${destination}_${type
//             .toLowerCase()
//             .replaceAll(" ", "")}.jpg)`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "center center",
//         }}
//       >
//         <div className="row">
//           {safeRecommendations.map((ele, i) => (
//             <div className="col-6" key={i}>
//               <div className="card mx-auto my-5 w-50 ">
//                 <div className="card-body">
//                   <p className="card-text fw-bold fs-6 text-danger">
//                     {ele.Package_Id}
//                   </p>
//                   <p className="card-text fs-5">
//                     <span className="fw-bold fs-4">Budget: </span>
//                     {ele.Budget}
//                   </p>
//                   <p className="card-text fs-5">
//                     <span className="fw-bold fs-4">Duration: </span>
//                     {ele.Trip_Duration_Days}
//                   </p>
//                   <h5 className="card-title fw-bold text-success">
//                     {ele.Package_Type}
//                   </h5>
//                   <Link
//                     to={`/${ele.Package_Id}`}
//                     className="btn btn-primary my-3"
//                   >
//                     Get Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PackageType;

import React, { useEffect, useState } from "react";
import { usePackageData } from "./PackageProvider";
import { Link } from "react-router-dom";
import { useDestinationData } from "../destinations/DestinationContext";
import AOS from "aos";
import "aos/dist/aos.css";

const PackageType = () => {
  const { Package } = usePackageData();
  const { destination } = useDestinationData();

  console.log(destination)

  // ✅ Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ Extract & safely parse data
  const { type = "", budget = "", duration = "", recommendations = [] } =
    Package || {};

  const safeRecommendations = Array.isArray(recommendations)
    ? recommendations
    : (() => {
        try {
          return JSON.parse(recommendations);
        } catch {
          return [];
        }
      })();
      console.log(type)
      console.log(`/assets1/${destination}_${type.toLowerCase().replaceAll(" ", "")}.jpg`)

      

  return (
    <div
      className="container-fluid text-center min-vh-100 py-4"
      data-aos="fade-up"
       style={{
            backgroundImage: `url(/assets1/${destination.replaceAll(" ","")}_${type.toLowerCase().replaceAll(" ", "")}.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
    >
      <h3 className="text-center text-dark fw-bold mb-4">
        {safeRecommendations.length > 0
          ? "Top Recommendations"
          : "No Packages Found"}
      </h3>

      <div className="row justify-content-center">
        {safeRecommendations.map((ele, i) => (
          <div className="col-md-4 col-sm-6 px-4" key={i} data-aos="zoom-in">
            <div className="card shadow-lg mx-auto my-3" style={{
              backgroundImage:"url(/assets/typeCard.jpg)",
              backgroundRepeat:"no-repeat",
              backgroundSize:"cover",
              backgroundPosition:"center center"
            }}>
              <div className="card-body">
                <p className="card-text fw-bold text-danger">
                  ID: {ele.Package_Id}
                </p>
                <p className="card-text fs-6">
                  <span className="fw-bold">Budget:</span> {ele.Budget}
                </p>
                <p className="card-text fs-6">
                  <span className="fw-bold">Duration:</span>{" "}
                  {ele.Trip_Duration_Days} Days
                </p>
                <h5 className="card-title fw-bold text-success">
                  {ele.Package_Type}
                </h5>
                <Link
                  to={`/packages/${ele.Package_Id}`}
                  className="btn btn-primary mt-3"
                >
                  Get Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageType;

