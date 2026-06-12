const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "uploads/");},
filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)); },
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else { cb(new Error("Only images are allowed"), false); }};
const upload = multer({
    storage,
    fileFilter,});
module.exports = upload;