const express = require("express");
const Course = require("../models/Course");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const router = express.Router();

// Get all courses & search & filters
router.get("/", async (req, res) => {
    try {
        const { search, level, category } = req.query;
        let filter = {};
    // search by course title
        if (search) { filter.title = { $regex: search, $options: "i" };}
    // filter by level
        if (level) { filter.level = level;}
    // filter by category
        if (category) { filter.category = category; }
        const courses = await Course.find(filter).sort({ createdAt: -1 });
        res.json(courses);
        } catch (error) {res.status(500).json({ message: error.message });}
});
// Get top courses
router.get("/top", async (req, res) => {
    try {
        const topCourses = await Course.find()
            .sort({ rating: -1, views: -1 })
            .limit(4);
        res.json(topCourses);
        } catch (error) {
        res.status(500).json({ message: error.message }); }
});
// Get latest courses
router.get("/latest", async (req, res) => {
    try {
        const latestCourses = await Course.find()
            .sort({ createdAt: -1 })
            .limit(4);
        res.json(latestCourses);
        } catch (error) {
            res.status(500).json({ message: error.message });}
});
// Get all categories
router.get("/categories", async (req, res) => {
    try {
        const categories = await Course.distinct("category");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });}});
// Get one course
router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });}
        res.json(course);} 
        catch (error) {
        res.status(500).json({ message: error.message }); } });
// Add course - Admin only
router.post("/", protect, admin, async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            message: "Course created successfully",
            course, });} 
        catch (error) {
            res.status(500).json({ message: error.message }); } });
// Update course - Admin only
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });}
        res.json({
            message: "Course updated successfully",
            course, }); } 
        catch (error) {
            res.status(500).json({ message: error.message });} });
// Delete course - Admin only
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });}
        res.json({
            message: "Course deleted successfully",});}
        catch (error) {
            res.status(500).json({ message: error.message });}
});
module.exports = router;