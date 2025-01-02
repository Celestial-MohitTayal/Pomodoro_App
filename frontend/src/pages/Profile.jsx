import { Box, Button, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import Navbar from "../components/Navbar/Navbar";
import React, { useState } from "react";
import { profileStyles } from "./styles";

const Profile = () => {
  const [toggle, setToggle] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user?.email);
  const token = localStorage.getItem("token");

  const updatePassword = async () => {
    if (!newPassword) {
      setError("Password Cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, oldPassword, newPassword }),
      });

      if (!response.ok) throw new Error("Incorrect Old Password");

      const data = await response.json();
      localStorage.setItem("userDetails", JSON.stringify(data.user));
      alert("Password updated successfully!");
      setToggle(!toggle);
      setError("");

      // Dispatch new user data
      dispatch(addUser(data.user));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={profileStyles.container}>
      <Navbar />
      <Box sx={profileStyles.boxWrapper}>
        <Box sx={profileStyles.formBox}>
          <Typography variant="h4" sx={profileStyles.title}>
            User Profile
          </Typography>
          <Typography variant="h6" sx={profileStyles.email}>
            Email: {email}
          </Typography>

          {toggle ? (
            <Button
              onClick={() => setToggle(!toggle)}
              sx={profileStyles.button}
            >
              Change Password
            </Button>
          ) : (
            <>
              <TextField
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
                placeholder="Enter Old Password"
                variant="outlined"
                sx={profileStyles.textField}
              />

              <TextField
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                placeholder="Enter New Password"
                variant="outlined"
                sx={profileStyles.textField}
              />

              <Typography variant="body2" sx={profileStyles.errorText}>
                {error}
              </Typography>
              <br />
              <Button
                onClick={() => setToggle(!toggle)}
                sx={profileStyles.button}
              >
                Cancel
              </Button>
              <Button onClick={updatePassword} sx={profileStyles.button}>
                Submit
              </Button>
            </>
          )}
          <br />
          <Button
            onClick={() => navigate("/home")}
            variant="contained"
            sx={profileStyles.submitButton}
          >
            Back
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
