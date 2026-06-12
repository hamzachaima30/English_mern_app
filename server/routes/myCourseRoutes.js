const express = require("express");
const MyCourse = require("../models/MyCourse");
const Course = require("../models/Course");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
// Add course to My Courses
router.post("/:courseId", protect, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" }); }
        const exists = await MyCourse.findOne({
            user: req.user.id,
            course: req.params.courseId,});
        if (exists) {
            return res.status(400).json({
                message: "Course already in My Courses List",});}
        const myCourse = await MyCourse.create({
            user: req.user.id,
            course: req.params.courseId,
            progress: 0, });
        res.status(201).json({
            message: "Course added to My Courses",
            myCourse, });} 
        catch (error) { res.status(500).json({ message: error.message });}});
// Get My Courses
router.get("/", protect, async (req, res) => {
    try {
        const myCourses = await MyCourse.find({ user: req.user.id }).populate("course");
        res.json(myCourses);
        } catch (error) { res.status(500).json({ message: error.message });}
});
// Update course progress
router.put("/:courseId/progress", protect, async (req, res) => {
    try {
        const { progress } = req.body;
        if (progress === undefined) {
            return res.status(400).json({
                message: "Progress is required", }); }
        if (progress < 0 || progress > 100) {
            return res.status(400).json({
                message: "Progress must be between 0 and 100",});}
        const myCourse = await MyCourse.findOneAndUpdate(
            {
                user: req.user.id,
                course: req.params.courseId,},
            { progress },
            { new: true }).populate("course");
        if (!myCourse) {
            return res.status(404).json({
                message: "Course not found in My Courses", });}
        res.json({
            message: "Progress updated successfully",
            myCourse,});
        } catch (error) {
            res.status(500).json({ message: error.message });}});
// Remove course from My Courses
router.delete("/:courseId", protect, async (req, res) => {
    try {
        const myCourse = await MyCourse.findOneAndDelete({
            user: req.user.id,
            course: req.params.courseId, });
        if (!myCourse) {
            return res.status(404).json({
                message: "Course not found in My Courses",});}
        res.json({
            message: "Course removed from My Courses", });
        } catch (error) {
            res.status(500).json({ message: error.message });}
});
module.exports = router;