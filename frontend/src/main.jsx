import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { TravelProvider } from "./components/layout/context/TravelContext.jsx";
import { ToastContainer } from "react-toastify";
import "aos/dist/aos.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TravelProvider>
      <App />
      <ToastContainer />
    </TravelProvider>
  </BrowserRouter>
);
