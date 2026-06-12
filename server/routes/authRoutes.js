const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();
// Register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });}
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters",}); }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
            return res.status(400).json({ 
                message: "Password must contain uppercase, lowercase and number",});}
        const userExists = await User.findOne({ email });
        if (userExists) { return res.status(400).json({ message: "Email already exists" });}
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: "user", });
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" });
    res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role, },});} 
        catch (error) { res.status(500).json({ message: error.message }); }});
// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
            message: "Email and password are required",});}
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password",});}
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",});}
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,},}); } 
        catch (error) { res.status(500).json({ message: error.message });}});
// Profile protected route
router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Private profile",
        user: req.user,});});
// Update Profile
router.put("/profile", protect, async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { username, email },
            { new: true }
        ).select("-password");
        res.json({
            message: "Profile updated successfully",
            user,});
    } catch (error) { res.status(500).json({ message: error.message });}
});
// Upload Image
router.put(
    "/profile-image",
    protect,
    upload.single("image"),
    async (req, res) => {
        try {
            if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });}
            const imagePath = `/uploads/${req.file.filename}`;
            const user = await User.findByIdAndUpdate(
            req.user.id,
            { profileImage: imagePath },
            { new: true }
            ).select("-password");
            res.json({
                    message: "Profile image updated",
                    user, });
        } catch (error) {
            res.status(500).json({ message: error.message });} }
);
module.exports = router;