const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,},
        description: {
            type: String,
            required: true,},
        level: {
            type: String,
            enum: ["A1", "A2", "B1", "B2", "C1"],
            required: true,},
        category: {
            type: String,
            enum: ["Cartoon", "Grammar", "Vocabulary", "Speaking", "Listening"],
            required: true,},
        youtubeUrl: {
            type: String,
            required: true,
            unique: true, },
        thumbnail: {
            type: String,
            required: true, },
        duration: {
            type: String,
            default: "5 min", },
        videoCount :{
            type: Number,
            default:1
        },
        views: {
            type: Number,
            default: 0,},
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,},},
    { timestamps: true,}
);
module.exports = mongoose.model("Course", courseSchema);