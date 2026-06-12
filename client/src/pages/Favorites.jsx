import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaHeart,FaTrash,FaPlay,FaClock,FaEye,FaStar,} from "react-icons/fa";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
function Favorites() {
    const { colors } = useTheme();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const fetchFavorites = async () => {
        if (!token) {
            navigate("/login");
            return;}
    try {
        const res = await api.get("/favorites", {
            headers: {Authorization: `Bearer ${token}`,},});
        setFavorites(res.data);
        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);}};
        useEffect(() => {
        fetchFavorites();}, []);
    const removeFavorite = async (courseId) => {
    try {
        await api.delete(`/favorites/${courseId}`, {
        headers: {
            Authorization: `Bearer ${token}`,},});
        setFavorites(
        favorites.filter((item) => item.course._id !== courseId));
        } catch (error) { alert(error.response?.data?.message || "Remove failed");}};
    if (loading) {
        return (
            <main className="min-h-screen px-5 py-20 text-center">
            <h2 className="text-2xl font-black" style={{ color: colors.primary }}>
                Loading favorites...
            </h2>
            </main>);}
return (
    <main className="min-h-screen px-5 py-20 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl">
        <div className="text-center">
            <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-md"
                style={{
                    backgroundColor: colors.border,
                    color: colors.primary, }}>
            <FaHeart className="text-red-500" />
            🗃️ Your Learning Collection 
            </span>
            <h1
                className="mt-5 text-4xl font-black md:text-5xl"
                style={{ color: colors.text }} >
                My Favorites 
            </h1>
            <p className="mt-3" style={{ color: colors.muted }}>
            All your favorite courses in one place 
            </p>
        </div>
        {favorites.length === 0 ? (
            <div
                className="mx-auto mt-12 max-w-xl rounded-3xl border p-8 text-center shadow-xl"
                style={{
                    backgroundColor: colors.navbarBg,
                    borderColor: colors.border,}}>
            <h2 className="text-2xl font-black" style={{ color: colors.text }}>
                No favorite courses yet
            </h2>
            <p className="mt-3" style={{ color: colors.muted }}>
                Add courses to favorites and find them here quickly.
            </p>
            <Link
                to="/courses"
                className="mt-6 inline-block rounded-2xl px-6 py-3 font-black"
                style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A",}}>
                Explore Courses
            </Link>
            </div>
            ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => {
                const course = item.course;
                return (
                <div
                    key={item._id}
                    className="group flex h-[540px] flex-col overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02]"
                    style={{
                        backgroundColor: colors.navbarBg,
                        borderColor: colors.border,
                        boxShadow:` 0 20px 50px ${colors.shadow}`,}}>
                    <div className="relative h-52 overflow-hidden">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"/>
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-[#14324A] shadow-md">
                        {course.level}
                    </span>
                    <button
                        onClick={() => removeFavorite(course._id)}
                        className="absolute right-4 top-4 rounded-full bg-white p-3 text-red-500 shadow-md transition hover:scale-110">
                        <FaTrash />
                    </button>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                    <span
                        className="w-fit rounded-full px-3 py-1 text-xs font-bold"
                        style={{
                            backgroundColor: colors.border,
                            color: colors.primary,}}>
                        {course.category}
                    </span>
                    <h2
                        className="mt-4 line-clamp-2 min-h-[58px] text-xl font-black"
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
                        style={{ color: colors.muted }} >
                        <div className="flex items-center gap-1">
                        <FaClock />
                        {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                        <FaEye />
                        {course.views}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />
                        {course.rating}
                        </div>
                    </div>
                    <div className="mt-auto pt-6">
                        <Link
                            to={`/courses/${course._id}`}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-black shadow-md transition hover:scale-105"
                            style={{
                                backgroundColor: colors.secondary,
                                color: "#14324A",}}>
                        <FaPlay />
                        View Course
                        </Link>
                    </div>
                    </div>
                    </div>); })}
        </div>
        )}
    </section>
    </main>);}
export default Favorites;