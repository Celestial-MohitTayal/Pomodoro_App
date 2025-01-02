const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("MongoDB connection error: ", err));
// Middlewares
app.use(express.json());
app.use(cors({
  // origin: 'http://localhost:5173',
  origin: 'https://pomodoro01.netlify.app',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to the Focus Sessions API");
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.send({ message: "Protected Profile", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
