const express = require("express");
const {
  registerUser,
  loginUser,
  updatePassword,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, updatePassword);

module.exports = router;
