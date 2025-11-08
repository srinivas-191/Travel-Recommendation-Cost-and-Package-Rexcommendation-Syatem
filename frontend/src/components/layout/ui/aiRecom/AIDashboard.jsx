import React, { useState, useEffect } from "react";
import "./aidashboard.css";
import AOS from "aos";

// -----------------------------------------
// 🏙️ Static Data Lists
// -----------------------------------------
let destinations = [
  "Munnar",
  "Mysuru",
  "Shimla",
  "Rann of Kutch",
  "Andaman",
  "Auli",
  "Kochi",
  "Ooty",
  "Alleppey",
  "Varanasi",
  "Pondicherry",
  "Darjeeling",
  "Goa",
  "Chennai",
  "Leh-Ladakh",
  "Bengaluru",
  "Rishikesh",
  "Kodaikanal",
  "Jaipur",
  "Mumbai",
  "Coorg",
  "Agra",
  "Delhi",
  "Jaisalmer",
];

let cities = [
  "Ahmedabad",
  "Bengaluru",
  "Chennai",
  "Delhi",
  "Goa",
  "Hyderabad",
  "Jaipur",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Pune",
  "Surat",
  "Visakhapatnam",
];

let TravelType = [
  "Mountain",
  "Historical",
  "Island",
  "Adventure",
  "Coastal",
  "City",
  "Beach",
  "Backwater",
  "Cultural",
  "Hill Station",
  "Desert",
];

// -----------------------------------------
// ⚙️ React Component
// -----------------------------------------
const AIDashboard = () => {
  // 🧭 State Variables
  const [rangeValue, setRangeValue] = useState(3000);
  const [destination, setDestination] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [travelType, setTravelType] = useState("");
  const [duration, setDuration] = useState(1);
  const [formData, setFormData] = useState(null); // store API results
  const [loading, setLoading] = useState(false);

  // -----------------------------------------
  // 🪄 Fetch Recommendations from Flask API
  // -----------------------------------------
  const handleGenerate = async () => {
    const data = {
      departureCity: departureCity,
      destination: destination,
      travelType: travelType,
      duration: duration,
      budgetRange: rangeValue,
    };

    console.log("📤 Sending Data to Flask:", data);

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Recommendations Received:", result.recommendations);
        setFormData(result.recommendations);
      } else {
        console.error("❌ Server Error:", result.error);
        alert("Server Error: " + result.error);
      }
    } catch (error) {
      console.error("⚠️ Request Failed:", error);
      alert(
        "Error connecting to Flask server. Make sure it's running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // ♻️ Reset Form
  // -----------------------------------------
  const handleReset = () => {
    setDepartureCity("");
    setDestination("");
    setTravelType("");
    setRangeValue(3000);
    setDuration(1);
    setFormData(null);
  };

  // -----------------------------------------
  // ➕/➖ Helper Controls
  // -----------------------------------------
  const increaseDuration = () => setDuration((prev) => prev + 1);
  const decreaseDuration = () =>
    setDuration((prev) => (prev > 1 ? prev - 1 : 1));
  const increaseBudget = () => setRangeValue((prev) => prev + 1000);
  const decreaseBudget = () =>
    setRangeValue((prev) => (prev > 1000 ? prev - 1000 : 1000));

   useEffect(() => {
      AOS.init({ duration: 1000, once: true });
      AOS.refresh();
    }, []);

  // -----------------------------------------
  // 🖥️ UI Render
  // -----------------------------------------
  return (
    <>
      {/* 🌍 Form Section */}
      <div className="form w-50 mx-auto p-3 my-4 bg-light rounded-4 shadow-sm" data-aos="fade-down">
        <div className="my-3 px-sm-4">
          {/* Departure City */}
          <label htmlFor="departureCity" className="my-3 fw-bold fs-5">
            ✈️ Select your Departure City:
          </label>
          <select
            id="departureCity"
            className="form-select"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          >
            <option value="">-- Select --</option>
            {cities.sort().map((ele, i) => (
              <option value={ele} key={i}>
                {ele}
              </option>
            ))}
          </select>

          {/* Destination */}
          <label htmlFor="destination" className="my-3 fw-bold fs-5">
            📍 Select your Destination:
          </label>
          <select
            id="destination"
            className="form-select"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">-- Select --</option>
            {destinations.sort().map((ele, i) => (
              <option value={ele} key={i}>
                {ele}
              </option>
            ))}
          </select>

          {/* Destination Type */}
          <label htmlFor="travelType" className="my-3 fw-bold fs-5">
            🏖️ Select Destination Type:
          </label>
          <select
            id="travelType"
            className="form-select"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
          >
            <option value="">-- Select --</option>
            {TravelType.map((ele, i) => (
              <option value={ele} key={i}>
                {ele}
              </option>
            ))}
          </select>

          {/* Duration */}
          <label htmlFor="duration" className="my-3 fw-bold fs-5">
            ⏱️ Trip Duration (Days):
          </label>
          <div className="input-group">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={decreaseDuration}
            >
              –
            </button>
            <input
              type="number"
              id="duration"
              min={1}
              className="form-control text-center"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={increaseDuration}
            >
              +
            </button>
          </div>

          {/* Budget */}
          <label htmlFor="budget" className="my-3 fw-bold fs-5">
            💰 Budget:
          </label>
          <div className="input-group">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={decreaseBudget}
            >
              –
            </button>
            <input
              type="number"
              id="budget"
              min={1000}
              className="form-control text-center"
              value={rangeValue}
              onChange={(e) => setRangeValue(Number(e.target.value))}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={increaseBudget}
            >
              +
            </button>
          </div>

          {/* Buttons */}
          <div className="text-center mt-4 py-2">
            <button
              className="reset btn btn-success px-4 py-2 mx-2"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              type="button"
              className="btn btn-warning px-4 py-2 aiGnt mx-2"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Generating...
                </>
              ) : (
                <>
                  <i className="bi bi-magic"></i> AI Generate
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 🧾 Recommendations Section */}
      {formData && Array.isArray(formData) && (
        <div className="results container my-5">
          <h3 className="text-center mb-3 fw-bold text-primary">
            🌍 Recommended Travel Packages
          </h3>

          <div className="table-responsive">
            <table className="table table-striped table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Package Type</th>
                  <th>From City</th>
                  <th>Destination</th>
                  <th>Type</th>
                  <th>Duration (Days)</th>
                  <th>Budget</th>
                  <th>Accommodation</th>
                  <th>Transport</th>
                  <th>Activities</th>
                  <th>Season</th>
                  <th>Similarity</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((pkg, index) => (
                  <tr key={index}>
                    <td>{pkg.Package_Type || "-"}</td>
                    <td>{pkg.From_City || "-"}</td>
                    <td>{pkg.Destination || "-"}</td>
                    <td>{pkg.Destination_Type || "-"}</td>
                    <td>{pkg.Trip_Duration_Days || "-"}</td>
                    <td>{pkg.Budget || "-"}</td>
                    <td>{pkg.Accommodation || "-"}</td>
                    <td>{pkg.Transport_Mode || "-"}</td>
                    <td>{pkg.Activities_Count || "-"}</td>
                    <td>{pkg.Season || "-"}</td>
                    <td>{pkg.Similarity ? pkg.Similarity.toFixed(3) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AIDashboard;
