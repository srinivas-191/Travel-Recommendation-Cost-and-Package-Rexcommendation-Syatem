// PackageSidebar.jsx
import React, { useEffect } from "react";
import "./destinationSidebar.css";
import { useFromcityData } from "./FromcityContext";
import AOS from "aos";

const DestinationSidebar = () => {
  const { Fromcity, setFromcity } = useFromcityData();
  console.log("Fromcity in Sidebar:", Fromcity);
  useEffect(() => {
    AOS.init({
      // Global settings for AOS
      duration: 1000, // values from 0 to 3000, with step 50ms
      once: true, // whether animation should happen only once - while scrolling down
    });
    AOS.refresh(); // Recalculate positions of elements
  }, []);
  return (
    <div
      className="w-100 sidebar text-primary text-center p-3"
      data-aos="flip-down"
    >
      <h5 className="mb-3">Enter Your Travel Preferences</h5>
      <div className="form">
        <div className="my-3">
          <label htmlFor="fromCity" className="my-1">
            Select From_City
          </label>
          <select
            className="form-select my-3 w-50 mx-auto"
            value={Fromcity}
            onChange={(e) => setFromcity(e.target.value)}
          >
            {[
              "Madurai",
              "Jaipur",
              "Lucknow",
              "Kochi",
              "Varanasi",
              "Delhi",
              "Pune",
              "Nagpur",
              "Goa",
              "Hyderabad",
              "Bhubaneswar",
              "Chandigarh",
              "Kolkata",
              "Chennai",
              "Coimbatore",
              "Visakhapatnam",
              "Mumbai",
              "Bengaluru",
              "Indore",
              "Ahmedabad",
            ]
              .sort()
              .map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default DestinationSidebar;
