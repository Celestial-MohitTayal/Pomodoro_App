import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Navbar from "../../Navbar/Navbar";
import { styles } from "./styles";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  error,
  handleLogin,
  navigate,
}) => {
  return (
    <>
      <Navbar />
      <Box sx={styles.container}>
        <Box sx={styles.form}>
          <Typography variant="h4" sx={styles.title}>
            Sign In
          </Typography>

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

          {error && (
            <Typography variant="body2" sx={styles.errorText}>
              {error}
            </Typography>
          )}

          <Button onClick={handleLogin} variant="contained" sx={styles.button}>
            Sign In
          </Button>

          <Typography variant="body2" sx={styles.footerText}>
            New to PoMoDoRo App?
            <Button
              onClick={() => navigate("/register")}
              sx={styles.linkButton}
            >
              Sign Up Now
            </Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
