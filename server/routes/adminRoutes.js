const express = require("express");
const User = require("../models/User");
const Course = require("../models/Course");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();
// Admin statistics
router.get("/stats", protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCourses = await Course.countDocuments();
        res.json({
            totalUsers,
            totalCourses,});
        } catch (error) {
        res.status(500).json({ message: error.message });}
});
module.exports = router;