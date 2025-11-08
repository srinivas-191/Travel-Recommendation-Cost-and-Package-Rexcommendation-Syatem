import React, { Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import DestinationProvider from "./components/layout/ui/destinations/DestinationContext";
import PackageProvider from "./components/layout/ui/packages/PackageProvider";
import FromcityProvider from "./components/layout/ui/destinations/FromcityContext";
import HomeSearchProvider from "./components/layout/ui/home/HomeSearchContext";
import ProtectedRoute from "./components/layout/protected route/ProtectedRoute";

import "./app.css";

let Home = React.lazy(() => import("./pages/Home"));
let Packages = React.lazy(() => import("./pages/Packages"));
let Recommendations = React.lazy(() => import("./pages/Recommendations"));
let Destinations = React.lazy(() => import("./pages/Destinations"));
let Login = React.lazy(() => import("./pages/Login"));
let PackageDetails = React.lazy(() =>
  import("./components/layout/ui/packages/PackageDetails")
);
let Favourites = React.lazy(() => import("./pages/Favourites"));
let PageNotFound = React.lazy(() => import("./pages/PageNotFound"));

const App = () => {
  return (
    <>
      <Navbar />
      <HomeSearchProvider>
        <FromcityProvider>
          <PackageProvider>
            <DestinationProvider>
              <Suspense fallback={<p className="loader"></p>}>
                <Routes>
                  {/* Default redirect */}
                  <Route path="/" element={<Navigate to="/home" />} />

                    {/* Home is public */}
                    {/* <Route path="/home" element={<Home />} /> */}
                    
                    <Route
                        path="/home"
                        element={
                          <ProtectedRoute>
                            <Home />
                          </ProtectedRoute>
                        }
                      />

                    {/* Protected routes */}
                    <Route
                      path="/destinations"
                      element={
                        // <ProtectedRoute>
                          <Destinations />
                        // </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/packages"
                      element={
                        // <ProtectedRoute>
                          <Packages />
                        // </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/packages/:packageID"
                      element={
                        // <ProtectedRoute>
                          <PackageDetails />
                        // </ProtectedRoute>
                      }
                    />
                    {/* <Route
                      path="/recommendation"
                      element={
                        <ProtectedRoute>
                          <Recommendations />
                        </ProtectedRoute>
                      }
                    /> */}
                    <Route
                      path="/favourites"
                      element={
                        <ProtectedRoute>
                          <Favourites />
                        </ProtectedRoute>
                      }
                    />


                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </DestinationProvider>
          </PackageProvider>
        </FromcityProvider>
      </HomeSearchProvider>
      <Footer />
    </>
  );
};

export default App;
