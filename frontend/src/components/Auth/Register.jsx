import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, pickName] = useState("");
  const [password, pickPassword] = useState("");
  const [email, pickEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleClick = () => {
    if (password == "") {
      setError("Password Cannot be empty");
    } else {
      axios
        .post("http://localhost:5000/api/users/register", {
          name: name,
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          const token = localStorage.getItem("token");
          if (token) {
            localStorage.setItem(
              "userDetails",
              JSON.stringify(response.data.user)
            );
            navigate("/home");
          }
        })
        .catch((err) => {
          setError("User already exists");
        });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#303030",
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: 'hidden'
      }}
    >
      <Navbar />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            padding: 2,
            width: { lg: "25%", sm: "45%" },
            backgroundColor: "#3C3C3C",
            color: "#2BC59A",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
            Sign Up
          </Typography>

          <TextField
            onChange={(obj) => pickName(obj.target.value)}
            type="text"
            placeholder="Enter Your Name"
            variant="outlined"
            sx={{
              width: "75%",
              marginBottom: 2,
              backgroundColor: "transparent",
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2BC59A" },
            }}
          />

          <TextField
            onChange={(obj) => pickEmail(obj.target.value)}
            type="text"
            placeholder="Enter Your Email"
            variant="outlined"
            sx={{
              width: "75%",
              marginBottom: 2,
              backgroundColor: "transparent",
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2BC59A" },
            }}
          />

          <br />

          <TextField
            onChange={(obj) => pickPassword(obj.target.value)}
            type="password"
            placeholder="Enter Your Password"
            variant="outlined"
            sx={{
              width: "75%",
              marginBottom: 2,
              backgroundColor: "transparent",
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2BC59A" },
            }}
          />

          <Typography variant="body2" sx={{ color: "red", marginBottom: 2 }}>
            {error}
          </Typography>

          <Button
            onClick={handleClick}
            variant="contained"
            sx={{
              width: "40%",
              marginBottom: 2,
              backgroundColor: "#2BC59A",
              "&:hover": { backgroundColor: "#1AB49A" },
            }}
          >
            Sign Up
          </Button>

          <Typography variant="body2" sx={{ color: "#c4c4c4" }}>
            Already Registered?
            <Button
              onClick={() => navigate("/")}
              sx={{
                color: "#c4c4c4",
                fontWeight: "bold",
                paddingLeft: 1,
                paddingRight: 0,
                "&:hover": { color: "white" },
              }}
            >
              Sign In Now
            </Button>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
