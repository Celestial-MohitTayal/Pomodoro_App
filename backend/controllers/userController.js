const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error: error });
  }
};


module.exports = {registerUser, loginUser};