const express = require("express");
const Favorite = require("../models/Favorite");
const Course = require("../models/Course");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
// Add course to favorites
router.post("/:courseId", protect, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" }); }
        const exists = await Favorite.findOne({
                user: req.user.id,
                course: req.params.courseId,});
        if (exists) {
            return res.status(400).json({ message: "Course already in favorites",});}
        const favorite = await Favorite.create({
            user: req.user.id,
            course: req.params.courseId, });
        res.status(201).json({
            message: "Course added to favorites",
            favorite, }); } catch (error) {
        res.status(500).json({ message: error.message }); }});
// Get my favorites
router.get("/", protect, async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id }).populate(
            "course");
        res.json(favorites);} catch (error) {
        res.status(500).json({ message: error.message }); }});
// Remove course from favorites
router.delete("/:courseId", protect, async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({
            user: req.user.id,
            course: req.params.courseId,});
        if (!favorite) {
            return res.status(404).json({message: "Favorite not found",}); }
        res.json({ message: "Course removed from favorites", });} 
        catch (error) { res.status(500).json({ message: error.message }); }
});
module.exports = router;