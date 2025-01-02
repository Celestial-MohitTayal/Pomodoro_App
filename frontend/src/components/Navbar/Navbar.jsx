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
import { removeUser, addUser } from "../../store/userSlice";
import { styles } from "./styles"

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user?.name);

  useEffect(() => {
    const userDetails = token
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;
    dispatch(userDetails ? addUser(userDetails) : removeUser());
  }, [token, dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <AppBar sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h4" sx={styles.title}>
          PoMoDoRo
        </Typography>
        {token && (
          <Box sx={styles.userActions}>
            <Button
              onClick={() => navigate("/profile")}
              sx={styles.profileButton}
            >
              {userName}
            </Button>
            <IconButton onClick={handleLogout} sx={styles.logoutButton}>
              <ExitToAppIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
