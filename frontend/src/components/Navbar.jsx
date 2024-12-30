import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import { addUser } from "../store/userSlice";
import store from "../store/store";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((store) => store?.user?.name);

  useEffect(() => {
    if (!token) {
      dispatch(removeUser());
    } else {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      dispatch(addUser(userDetails));
    }
  }, []);

  return (
    <AppBar
      sx={{
        backgroundColor: "#3C3C3C",
        padding: "8px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{
            fontFamily: "Times New Roman, serif",
            fontWeight: "bold",
            letterSpacing: "0.1rem",
            color: "#2BC59A",
          }}
        >
          PoMoDoRo
        </Typography>
        {token && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              onClick={() => {
                navigate("/profile");
              }}
              sx={{
                fontFamily: "Times New Roman, serif",
                fontWeight: "bold",
                letterSpacing: "0.1rem",
                color: "#2BC59A",
                fontSize: "1.5rem",
                transition: "transform 0.075s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              {userName}
            </Button>

            <IconButton
              onClick={() => {
                localStorage.removeItem("userDetails");
                localStorage.removeItem("token");
                localStorage.removeItem("taskId");
                navigate("/");
              }}
              sx={{
                color: "#D3D3D3",
                transition: "transform 0.075s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
