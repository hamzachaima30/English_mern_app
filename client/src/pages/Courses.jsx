import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaSearch,FaClock,FaEye,FaStar,FaHeart,FaPlay,FaFilter,FaPlus,} from "react-icons/fa";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
function Courses() {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [level, setLevel] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search.trim()) params.append("search", search.trim());
            if (level) params.append("level", level);
            if (category) params.append("category", category);
            const res = await api.get(`/courses?${params.toString()}`);
            setCourses(res.data);
            } catch (error) {
            console.log(error);
            } finally {
            setLoading(false); }};
        useEffect(() => { fetchCourses();}, []);
        const handleSubmit = (e) => {
            e.preventDefault();
            fetchCourses();};
        const resetFilters = async () => {
            setSearch("");
            setLevel("");
            setCategory("");
        try {
            setLoading(true);
            const res = await api.get("/courses");
            setCourses(res.data);
            } catch (error) {
            console.log(error);
            } finally { setLoading(false);}};
        const addToMyCourses = async (courseId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first!");
            navigate("/login");
        return; }
        try {
            await api.post(
            `/my-courses/${courseId}`,
            {},
            {
                headers: {
                Authorization:` Bearer ${token}`,},});
            alert("Course added to My Courses");
            } catch (error) { alert(error.response?.data?.message || "Something went wrong"); }};
        const addToFavorites = async (courseId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;}
        try {
            await api.post(
            `/favorites/${courseId}`,
            {},
            {
                headers: {Authorization: `Bearer ${token}`,},});
            alert("Course added to favorites");
            } catch (error) {
            alert(error.response?.data?.message || "Something went wrong"); }};
return (
    <main className="min-h-screen px-5 pb-16 pt-10 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl">
            <div className="text-center">
            <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-md"
                style={{
                    backgroundColor: colors.border,
                    color: colors.primary,}}>
            <FaFilter />
                Search by name, level or category
            </span>
            <h1
                className="mt-5 text-4xl font-black md:text-5xl"
                style={{ color: colors.text }} >
                Explore{" "}
            <span style={{ color: colors.primary }}>English Courses</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: colors.muted }}>
                Find the right course for your level and improve your English step
                by step.
            </p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto mt-10 grid max-w-6xl gap-4 rounded-3xl border p-4 shadow-xl md:grid-cols-4"
                style={{
                    backgroundColor: colors.navbarBg,
                    borderColor: colors.border,
                    boxShadow: `0 20px 50px ${colors.shadow}`, }}>
            <div className="relative md:col-span-2">
            <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: colors.primary }}/>
            <input
                type="text"
                placeholder="Search course name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-2xl border bg-white pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:scale-[1.01]"/>
            </div>
            <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="h-12 rounded-2xl border bg-white px-4 text-sm text-slate-800 outline-none">
            <option value="">All Levels</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            </select>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 rounded-2xl border bg-white px-4 text-sm text-slate-800 outline-none">
            <option value="">All Categories</option>
            <option value="Grammar">Grammar</option>
            <option value="Speaking">Speaking</option>
            <option value="Listening">Listening</option>
            <option value="Vocabulary">Vocabulary</option>
            <option value="Cartoon">Cartoon</option>
            </select>
            <button
                type="submit"
                className="rounded-2xl px-5 py-3 font-black shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105 md:col-span-2"
                style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A",}}>
                Search
            </button>
            <button
                type="button"
                onClick={resetFilters}
                className="rounded-2xl border px-5 py-3 font-bold transition duration-300 hover:-translate-y-1 hover:scale-105 md:col-span-2"
                style={{
                    borderColor: colors.primary,
                    color: colors.primary,}}>
                Reset Filters
            </button>
            </form>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
            <p
                className="col-span-full text-center text-lg font-bold"
                style={{ color: colors.primary }}>
                Loading courses...
            </p>
            ) : courses.length === 0 ? (
            <p
                className="col-span-full text-center text-lg font-bold"
                style={{ color: colors.muted }}>
                No courses found.
            </p>
            ) : (
            courses.map((course) => (
                <div
                    key={course._id}
                    className="group flex h-[560px] flex-col overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-2xl"
                    style={{
                        backgroundColor: colors.navbarBg,
                        borderColor: colors.border,
                        boxShadow: `0 20px 50px ${colors.shadow}`,}}>
                <div className="relative h-52 w-full overflow-hidden">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"/>
                    <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-[#14324A] shadow-md">
                        {course.level}
                    </div>
                    <button
                        onClick={() => addToFavorites(course._id)}
                        className="absolute right-4 top-4 rounded-full bg-white p-3 text-red-500 shadow-md transition hover:scale-110">
                    <FaHeart />
                    </button>
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center justify-between">
                    <span
                        className="rounded-full px-3 py-1 text-xs font-bold"
                        style={{
                            backgroundColor: colors.border,
                            color: colors.primary, }}>
                        {course.category}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                        <FaStar />
                        {course.rating}
                    </span>
                    </div>
                    <h2
                    className="line-clamp-2 min-h-[58px] text-xl font-black"
                    style={{ color: colors.text }}>
                    {course.title}
                    </h2>
                    <p
                        className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6"
                        style={{ color: colors.muted }} >
                    {course.description}
                    </p>
                    <div
                    className="mt-5 grid grid-cols-3 gap-2 text-xs font-bold"
                    style={{ color: colors.muted }}>
                    <div className="flex items-center gap-1">
                        <FaClock />
                        {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                        <FaEye />
                        {course.views}
                    </div>
                    <div className="flex items-center gap-1">
                        🎬
                        {course.videoCount} videos
                    </div>
                    </div>
                    <div className="mt-auto flex gap-3 pt-6">
                    <button
                        onClick={() => addToMyCourses(course._id)}
                        className="flex-1 rounded-2xl border px-3 py-3 text-sm font-bold transition hover:scale-105"
                        style={{
                            borderColor: colors.primary,
                            color: colors.primary,}}>
                        <FaPlus className="mr-1 inline" />
                        My Courses
                    </button>
                    <Link
                        to={`/courses/${course._id}`}
                        className="flex-1 rounded-2xl px-3 py-3 text-center text-sm font-black shadow-md transition hover:scale-105"
                        style={{
                            backgroundColor: colors.secondary,
                            color: "#14324A", }}>
                        <FaPlay className="mr-1 inline" />
                        View
                    </Link>
                    </div>
                </div>
            </div>)))}
        </div>
    </section>
    </main>);}
export default Courses;