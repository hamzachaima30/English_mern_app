import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {FaArrowLeft,FaClock,FaEye,FaStar,FaHeart,FaPlus,FaVideo,} from "react-icons/fa";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";
function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { colors } = useTheme();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState(null);
    const [progress, setProgress] = useState(0);
    const getYoutubeId = (url) => {
        if (!url) return "";
        if (url.includes("v=")) { return url.split("v=")[1].split("&")[0];}
        if (url.includes("youtu.be/")) {return url.split("youtu.be/")[1].split("?")[0];}
        if (url.includes("/embed/")) {return url.split("/embed/")[1].split("?")[0];}
        return url.split("/").pop();};
    useEffect(() => {
        const fetchCourse = async () => {
        try {
            const res = await api.get(`/courses/${id}`);
            setCourse(res.data);
        } catch (error) {
        console.log(error);
        } finally {
        setLoading(false);}};
    fetchCourse();}, [id]);
    useEffect(() => {
        if (!course) return;
        const loadYouTubeAPI = () => {
        if (window.YT) {
            createPlayer();
        return;}
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = createPlayer; };
        const createPlayer = () => {
        const ytPlayer = new window.YT.Player("youtube-player", {
        videoId: getYoutubeId(course.youtubeUrl),
        events: {
            onReady: (event) => {
            setPlayer(event.target);},},
        });};
    loadYouTubeAPI();
    }, [course]);
    useEffect(() => {
        if (!player) return;
        const interval = setInterval(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const duration = player.getDuration();
            const currentTime = player.getCurrentTime();
            if (!duration || duration === 0) return;
            const newProgress = Math.round( (currentTime / duration) * 100);
            if (newProgress > progress) {
                setProgress(newProgress);
            await api.put(
                `/my-courses/${id}/progress`,
                { progress: newProgress,},
                {
                    headers: {
                    Authorization: `Bearer ${token}`,}, });}
            } catch (error) { console.log(error);}}, 10000);
    return () => clearInterval(interval);
    }, [player, progress, id]);
    const addToMyCourses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        navigate("/login");
        return; }
    try {
            await api.post(
            `/my-courses/${id}`,
            {},
            {
                headers: {Authorization:`Bearer ${token}`,},});
            alert("Course added to My Courses");
            } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");}};
    const addToFavorites = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;}
    try {
        await api.post(
        `/favorites/${id}`,
        {},
        {
            headers: {
            Authorization: `Bearer ${token}`,},
        });
        alert("Course added to Favorites");
        } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");}};
    if (loading) {
        return (
            <main className="min-h-screen px-5 py-16 text-center">
            <h2 className="text-2xl font-black" style={{ color: colors.primary }}>
                Loading course...
            </h2>
            </main>);}
    if (!course) {
        return (
            <main className="min-h-screen px-5 py-16 text-center">
            <h2 className="text-2xl font-black" style={{ color: colors.text }}>
                Course not found
            </h2>
            </main>);}
return (
    <main className="min-h-screen px-5 pb-16 pt-10 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl">
        <Link
            to="/courses"
            className="mb-8 inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-bold transition hover:-translate-y-1"
            style={{
                backgroundColor: colors.border,
                color: colors.primary,}} >
            <FaArrowLeft />
                Back to Courses
        </Link>
        <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <div
                    className="overflow-hidden rounded-3xl border shadow-2xl"
                    style={{
                        backgroundColor: colors.navbarBg,
                        borderColor: colors.border,
                        boxShadow: `0 25px 60px ${colors.shadow}`,}}>
                <div className="aspect-video w-full">
                <div id="youtube-player" className="h-full w-full"></div>
            </div>
        </div>
        <div className="mt-8">
            <span
                className="rounded-full px-4 py-2 text-sm font-bold"
                style={{
                    backgroundColor: colors.border,
                    color: colors.primary, }}>
                    {course.category}
            </span>
            <h1
                className="mt-5 text-3xl font-black md:text-5xl"
                style={{ color: colors.text }}>
                {course.title}
            </h1>
            <p
                className="mt-5 max-w-3xl text-lg leading-8"
                style={{ color: colors.muted }}>
                {course.description}
            </p>
        </div>
        </div>
        <aside
            className="h-fit rounded-3xl border p-6 shadow-xl"
            style={{
                backgroundColor: colors.navbarBg,
                borderColor: colors.border,
                boxShadow: `0 20px 50px ${colors.shadow}`,}}>
            <h2
                className="mb-5 text-2xl font-black"
                style={{ color: colors.text }}>
                Course Info
            </h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                <span style={{ color: colors.muted }}>Level</span>
                <strong style={{ color: colors.primary }}>
                    {course.level}
                </strong>
                </div>
                <div className="flex items-center justify-between">
                <span
                    className="flex items-center gap-2"
                    style={{ color: colors.muted }}>
                    <FaClock />
                    Duration
                </span>
                <strong style={{ color: colors.text }}>
                    {course.duration}
                </strong>
            </div>
            <div className="flex items-center justify-between">
                <span
                    className="flex items-center gap-2"
                    style={{ color: colors.muted }}>
                    <FaVideo />
                    Videos
                </span>
                <strong style={{ color: colors.text }}>
                    {course.videoCount}
                </strong>
            </div>
            <div className="flex items-center justify-between">
                <span
                    className="flex items-center gap-2"
                    style={{ color: colors.muted }}>
                    <FaEye />
                    Views
                </span>
                <strong style={{ color: colors.text }}>
                    {course.views}
                </strong>
            </div>
            <div className="flex items-center justify-between">
                <span
                    className="flex items-center gap-2"
                    style={{ color: colors.muted }}>
                    <FaStar />
                    Rating
                </span>
                <strong className="text-yellow-500">
                    {course.rating}
                </strong>
            </div>
            <div className="pt-4">
                <div className="mb-2 flex justify-between">
                    <span
                        className="font-bold"
                        style={{ color: colors.text }}>
                        Progress
                    </span>
                    <span
                        className="font-black"
                        style={{ color: colors.primary }}>
                        {progress}%
                    </span>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-200">
                    <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: colors.primary,}}></div>
                </div>
            </div>
            </div>
            <div className="mt-8 grid gap-3">
                <button
                    onClick={addToMyCourses}
                    className="flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-black shadow-lg transition hover:-translate-y-1 hover:scale-105"
                    style={{
                        backgroundColor: colors.secondary,
                        color: "#14324A", }}>
                    <FaPlus />
                    Add to My Courses
                </button>
                <button
                    onClick={addToFavorites}
                    className="flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 font-bold transition hover:-translate-y-1 hover:scale-105"
                    style={{
                                borderColor: colors.primary,
                                color: colors.primary,}}>
                    <FaHeart />
                    Add to Favorites
                </button>
            </div>
            </aside>
        </div>
    </section>
    </main>);}
export default CourseDetails;