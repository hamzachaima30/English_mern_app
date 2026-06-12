import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
function AddCourse() {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level: "A1",
        category: "Grammar",
        youtubeUrl: "",
        thumbnail: "",
        duration: "5 min",
        videoCount: 1,
        views : 0,
        rating: 0,});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,}); };
    const handleSubmit = async (e) => {
        e.preventDefault();
    const token = localStorage.getItem("token");
    try {
        await api.post("/courses", formData, {
            headers: { Authorization:` Bearer ${token}`,}, });
        alert("Course added successfully");
        navigate("/admin");
        } catch (error) {
        alert(error.response?.data?.message || "Add course failed");}};
return (
    <main className="min-h-screen px-5 py-16 md:px-10 lg:px-20">
        <section
            className="mx-auto max-w-3xl rounded-3xl border p-8 shadow-xl"
            style={{
                backgroundColor: colors.navbarBg,
                borderColor: colors.border,}}>
        <h1
            className="mb-8 text-center text-4xl font-black"
            style={{ color: colors.text }}>
            Add New Course
        </h1>
        <form onSubmit={handleSubmit} className="grid gap-4">
            <input
                name="title"
                placeholder="Course title"
                value={formData.title}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none"
                required/>
            <textarea
                name="description"
                placeholder="Course description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-32 rounded-2xl border p-3 outline-none"
                required/>
            <div className="grid gap-4 md:grid-cols-2">
            <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="rounded-2xl border p-3">
                <option>A1</option>
                <option>A2</option>
                <option>B1</option>
                <option>B2</option>
                <option>C1</option>
            </select>
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="rounded-2xl border p-3">
                <option>Cartoon</option>
                <option>Grammar</option>
                <option>Vocabulary</option>
                <option>Speaking</option>
                <option>Listening</option>
            </select>
            </div>
            <input
                name="youtubeUrl"
                placeholder="YouTube URL"
                value={formData.youtubeUrl}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none"
                required />
            <input
                name="thumbnail"
                placeholder="Thumbnail URL"
                value={formData.thumbnail}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none"
                required />
            <div className="grid gap-4 md:grid-cols-4">
            <input
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none" />
            <input
                type="number"
                name="videoCount"
                placeholder="Videos"
                value={formData.videoCount}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none" />
            <input
                type="number"
                name="views"
                placeholder="Views"
                value={formData.views}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none"/>
            <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={formData.rating}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none"/>
            </div>
            <button
                type="submit"
                className="mt-4 rounded-2xl px-6 py-3 font-black shadow-lg transition hover:scale-105"
                style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A",}}>
                Add Course
            </button>
        </form>
    </section>
    </main> );
}

export default AddCourse;