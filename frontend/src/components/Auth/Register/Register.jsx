import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_SECRET_KEY;
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, [])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleRegister = async () => {
    if (password === "") {
      setError("Password cannot be empty");
    } else if (password !== confirmPassword) {
      setError("Password does not match");
    } else {
      try {
        const requestBody = {
          name,
          email,
          password,
        };

        const response = await fetch(`${apiUrl}/api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("User already exists");
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("userDetails", JSON.stringify(data.user));
        navigate("/home");
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    }
  };

  return (
    <RegisterForm
      name={name}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      error={error}
      handleRegister={handleRegister}
      navigate={navigate}
    />
  );
};

export default Register;
