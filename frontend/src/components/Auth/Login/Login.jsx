import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_SECRET_KEY;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const requestBody = {
        email,
        password,
      };

      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("userDetails", JSON.stringify(data.user));

      navigate("/home");
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/home");
  }, [navigate]);

  return (
    <LoginForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      handleLogin={handleLogin}
      navigate={navigate}
    />
  );
};

export default Login;
