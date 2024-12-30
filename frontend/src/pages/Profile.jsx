import { Box, Button, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import store from "../store/store";
import axios from "axios";

const Profile = () => {
  const [toggle, setToggle] = useState(true);
  const [oldPassword, pickOldPassword] = useState("");
  const [newPassword, pickNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((store) => store?.user?.email);
  const token = localStorage.getItem("token");

  const matchPassword = () => {
    axios
      .put(
        "http://localhost:5000/api/users/profile",
        {
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: { Authorization: "Bearer " + token } }
      )
      .then((response) => {
        localStorage.setItem("userDetails", JSON.stringify(response.data.user));
        alert("Password updated successfully!");
        setToggle((prev) => !prev);
        setError("");
      })
      .catch((err) => {
        setError("Incorrect Old Password");
      });

    const newUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    dispatch(addUser(newUserDetails));
  };

  return (
    <div
      style={{
        backgroundColor: "#303030",
        height: "100vh",
        width: "100vw",
        display: "flex",
      }}
    >
      <Navbar />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
          <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
            User Profile
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: 3, color: "#c4c4c4" }}>
            Email: {email}
          </Typography>

          {toggle ? (
            <Button
              onClick={() => setToggle((prev) => !prev)}
              sx={{
                color: "#c4c4c4",
                fontWeight: "bold",
                paddingLeft: 1,
                paddingRight: 0,
                "&:hover": { color: "white" },
              }}
            >
              Change Password
            </Button>
          ) : (
            <>
              <TextField
                onChange={(obj) => pickOldPassword(obj.target.value)}
                type="password"
                placeholder="Enter Old Password"
                variant="outlined"
                sx={{
                  width: "75%",
                  marginBottom: 2,
                  backgroundColor: "transparent",
                  color: "white",
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2BC59A",
                  },
                }}
              />

              <TextField
                onChange={(obj) => pickNewPassword(obj.target.value)}
                type="password"
                placeholder="Enter New Password"
                variant="outlined"
                sx={{
                  width: "75%",
                  marginBottom: 2,
                  backgroundColor: "transparent",
                  color: "white",
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2BC59A",
                  },
                }}
              />

              <Typography variant="body2" sx={{ color: "red" }}>
                {error}
              </Typography>
              <br />
              <Button
                onClick={() => {
                  setToggle((prev) => !prev);
                  setError("");
                }}
                sx={{
                  color: "#c4c4c4",
                  fontWeight: "bold",
                  paddingLeft: 1,
                  paddingRight: 0,
                  marginRight: 2,
                  "&:hover": { color: "white" },
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={matchPassword}
                sx={{
                  color: "#c4c4c4",
                  fontWeight: "bold",
                  paddingLeft: 1,
                  paddingRight: 0,
                  "&:hover": { color: "white" },
                }}
              >
                Submit
              </Button>
            </>
          )}
          <br />
          <Button
            onClick={() => navigate("/home")}
            variant="contained"
            sx={{
              width: "30%",
              marginBottom: 2,
              backgroundColor: "#2BC59A",
              marginTop: 3,
              "&:hover": { backgroundColor: "#1AB49A" },
            }}
          >
            Back
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
