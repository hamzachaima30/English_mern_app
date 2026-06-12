const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const path = require ("path");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/my-courses", require("./routes/myCourseRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin", require("./routes/adminRoutes"));
app.get("/", (req, res) => {
    res.send("Backend is working");});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);});