import React, { useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Navbar from "../../Navbar/Navbar";
import { styles } from "./styles";

const RegisterForm = ({
  name,
  email,
  password,
  confirmPassword,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  error,
  handleRegister,
  navigate,
}) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
      }, [])
  return (
    <>
      <Navbar />
      <Box sx={styles.container}>
        <Box sx={styles.form}>
          <Typography variant="h4" sx={styles.title}>
            Sign Up
          </Typography>

          <TextField
            type="text"
            placeholder="Enter Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={styles.input}
          />

          <TextField
            type="email"
            placeholder="Enter Your Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={styles.input}
          />

          <TextField
            type="password"
            placeholder="Enter Your Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={styles.input}
          />

          <TextField
            type="password"
            placeholder="Confirm Your Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={styles.input}
          />

          {error && (
            <Typography variant="body2" sx={styles.errorText}>
              {error}
            </Typography>
          )}

          <Button
            onClick={handleRegister}
            variant="contained"
            sx={styles.button}
          >
            Sign Up
          </Button>

          <Typography variant="body2" sx={styles.footerText}>
            Already Registered?
            <Button onClick={() => navigate("/")} sx={styles.linkButton}>
              Sign In Now
            </Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;
