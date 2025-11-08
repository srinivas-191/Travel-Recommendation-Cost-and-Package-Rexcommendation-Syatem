import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import useTravelCost from "../components/layout/context/TravelContext";

const Login = () => {
  const { loginWithGoogle } = useTravelCost();
  let navigate = useNavigate();

  let startLogin = async () => {
    await loginWithGoogle();
    navigate("/home");
  };

  return (
    <div className="text-center">
      <h2 className="text-primary mb-3">Welcome to Marghadharshi</h2>
      <p className="mb-4">
        To access this application, please log in using your Google account.
      </p>
      <Button
        type="primary"
        size="large"
        onClick={startLogin}
        style={{
          width: "100%",
          borderRadius: "8px",
          fontWeight: "500",
        }}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default Login;
