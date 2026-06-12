import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
function EditCourse() {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        level: "A1",
        category: "Grammar",
        youtubeUrl: "",
        thumbnail: "",
        duration: "5 min",
        videoCount: 1,
        views :0,
        rating: 0, });
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get(`/courses/${id}`);
                setFormData(res.data);
            } catch (error) {
        alert("Course not found");}};
    fetchCourse();}, [id]);
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,});};
    const handleSubmit = async (e) => {
        e.preventDefault();
    const token = localStorage.getItem("token");
    try {
        await api.put(`/courses/${id}`, formData, {
        headers: {  Authorization: `Bearer ${token}`,},});
        alert("Course updated successfully");
        navigate("/admin");
        } catch (error) {
        alert(error.response?.data?.message || "Update failed");}};
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
            Edit Course
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
                required />
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
                required/>
            <input
                name="thumbnail"
                placeholder="Thumbnail URL"
                value={formData.thumbnail}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none"
                required/> 
            <div className="grid gap-4 md:grid-cols-4">
            <input
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none"/>
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
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="rounded-2xl border p-3 outline-none"/>
            </div>
            <div className="mt-4 flex gap-4">
            <button
                type="submit"
                className="flex-1 rounded-2xl px-6 py-3 font-black shadow-lg transition hover:scale-105"
                style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A", }}>
                Save Changes
            </button>
            <button
                type="button"
                onClick={() => navigate("/admin")}
                className="flex-1 rounded-2xl border px-6 py-3 font-bold transition hover:scale-105"
                style={{
                    borderColor: colors.primary,
                    color: colors.primary,}} >
                Cancel
            </button>
            </div>
        </form>
    </section>
    </main>);
}
export default EditCourse;