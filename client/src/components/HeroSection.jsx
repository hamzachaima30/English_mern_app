import { Link } from "react-router-dom";
import { FaRocket,  FaBookOpen, FaHeart, FaChartLine, FaStar, FaGraduationCap, FaCheckCircle,} from "react-icons/fa";
import student from "../assets/student.jpg";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import api from "../services/api";
function HeroSection() {
    const { colors } = useTheme();
    const [topCourses, setTopCourses] = useState([]);
    const [latestCourses, setLatestCourses] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
    try {
        const topRes = await api.get("/courses/top");
        const latestRes = await api.get("/courses/latest");
        setTopCourses(topRes.data);
        setLatestCourses(latestRes.data);
        } catch (error) {
        console.log(error);}};
    fetchData();}, []);
    const features = [
        {
            icon: "📚",
            title: "Structured Learning",
            text: "Organized English courses from beginner to advanced.",},
        {
            icon: "❤️",
            title: "Save Favorites",
            text: "Keep your favorite lessons and courses in one place.",},
        {
            icon: "📈",
            title: "Track Progress",
            text: "Follow your learning journey and stay motivated.",},];
return (
    <main className="min-h-screen overflow-hidden px-5 pb-16 pt-10 md:px-10 lg:px-20">
        <section className="relative mx-auto grid max-w-7xl items-center gap-14 py-10 lg:grid-cols-2">
        <div
            className="absolute -left-32 top-10 h-80 w-80 rounded-full blur-3xl"
            style={{
                backgroundColor: colors.primary,
                opacity: 0.16, }}/>
        <div
            className="absolute -right-32 bottom-0 h-80 w-80 rounded-full blur-3xl"
            style={{
                backgroundColor: colors.secondary,
                opacity: 0.2, }} />
        <div className="relative z-10 text-center lg:text-left">
            <span
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold shadow-md transition duration-300 hover:-translate-y-1"
                style={{
                    backgroundColor: colors.border,
                    color: colors.primary, }}>
                <FaGraduationCap />
                    Learn English from A1 to C1
            </span>
            <h1
                className="mt-6 text-4xl font-black leading-tight md:text-6xl lg:text-7xl"
                style={{ color: colors.text }} >
                Master{" "}
            <span style={{ color: colors.primary }}>English</span>
                <br />
            with{" "}
            <span style={{ color: colors.secondary }}>Confidence</span>
            <br />
                and Fluency
            </h1>
            <p
                className="mx-auto mt-6 max-w-xl text-base leading-8 md:text-lg lg:mx-0"
                style={{ color: colors.muted }} >
                Improve your speaking, listening, grammar and vocabulary through
                carefully selected English courses.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
                to="/login"
                className="group flex items-center gap-2 rounded-2xl px-6 py-4 font-black shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105"
                style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A",}}>
            <FaRocket />
                Start Learning
            </Link>
            <Link
                to="/courses"
                className="group flex items-center gap-2 rounded-2xl border px-6 py-4 font-bold transition duration-300 hover:-translate-y-1 hover:scale-105"
                style={{
                    borderColor: colors.primary,
                    color: colors.primary, }}>
            <FaBookOpen className="transition duration-300 group-hover:scale-125" />
                Explore Courses
            </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
            ✓ Beginner Friendly
            </span>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
            ✓ A1 → C1 Levels
            </span>
            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">
            ✓ Video Courses
            </span>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                    ["A1-C1", "Levels"],
                    ["Courses", "Selected"],
                    ["Progress", "Tracking"],
                ].map((item, index) => (
                    <div
                        key={index}
                        className="rounded-3xl p-4 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 md:p-5"
                style={{
                    backgroundColor: colors.navbarBg,
                    boxShadow: `0 18px 40px ${colors.shadow}`,}}>
                <h3
                    className="text-lg font-black md:text-2xl"
                    style={{ color: colors.primary }}>
                    {item[0]}
                </h3>
                <p
                    className="text-xs md:text-base"
                    style={{ color: colors.muted }} >
                    {item[1]}
                </p>
                </div>  ))}
            </div>
            </div>
        {/* Right */}
        <div className="relative z-10 flex justify-center">
            <div
                className="absolute top-8 h-[300px] w-[300px] rounded-full blur-xl md:h-[430px] md:w-[430px]"
                style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    opacity: 0.3,}}/>
            <div
            className="relative z-10 flex h-[300px] w-[300px] items-center justify-center rounded-full p-4 shadow-2xl transition-all duration-500 hover:scale-105 md:h-[430px] md:w-[430px]"
            style={{
                backgroundColor: colors.border,
                boxShadow:` 0 30px 70px ${colors.shadow}`, }}>
            <img
                src={student}
                alt="Student"
                className="h-full w-full rounded-full object-cover transition-all duration-500 hover:scale-110"/>
            </div>
            <div
                className="float-animation absolute left-0 top-10 z-20 rounded-2xl px-4 py-3 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-110"
                style={{
                    backgroundColor: colors.navbarBg,
                    color: colors.text,  }}>
            <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                Rating 4.9
            </div>
        </div>
        <div
            className="float-animation absolute right-0 top-28 z-20 rounded-2xl px-4 py-3 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-110"
            style={{
                backgroundColor: colors.navbarBg,
                color: colors.text,}} >
                📚 Selected Courses
        </div>
        <div
            className="float-animation absolute bottom-24 left-4 z-20 rounded-2xl px-4 py-3 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-110"
            style={{
                backgroundColor: colors.navbarBg,
                color: colors.text, }} >
            <div className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                Save Favorites
            </div>
        </div>
        <div
            className="float-animation absolute bottom-8 right-4 z-20 rounded-2xl px-4 py-3 text-sm font-bold shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-110"
            style={{
                backgroundColor: colors.navbarBg,
                color: colors.text,}}>
            <div className="flex items-center gap-2">
                <FaChartLine style={{ color: colors.primary }} />
                Track Progress
            </div>
        </div>
        </div>
        </section>
        {/* Top Courses */}
        <section className="mx-auto mt-20 max-w-7xl">
        <h2
            className="mb-8 text-3xl font-black"
            style={{ color: colors.text }}>
            🔥 Top Courses
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {topCourses.map((course) => (
        <Link
        key={course._id}
        to={`/courses/${course._id}`}
        className="group overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
        style={{
            backgroundColor: colors.navbarBg,
            borderColor: colors.border, }}>
        <img
            src={course.thumbnail}
            alt={course.title}
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"/>
        <div className="p-4">
            <span
                className="rounded-full px-3 py-1 text-xs font-bold"
                style={{
                    backgroundColor: colors.border,
                    color: colors.primary,}}>
            {course.level}
            </span>
        <h3
            className="mt-3 line-clamp-2 min-h-[55px] text-lg font-black"
            style={{ color: colors.text }}>
            {course.title}
        </h3>
        <div
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl py-3 font-bold transition hover:scale-105"
            style={{
                backgroundColor: colors.secondary,
                color: "#14324A", }}>
            <FaPlay />
            View Course
        </div>
        </div>
        </Link>))}
        </div>
        </section>
        {/* Latest Courses */}
    <section className="mx-auto mt-20 max-w-7xl">
    <h2
        className="mb-8 text-3xl font-black"
        style={{ color: colors.text }} >
        🖤 Latest Courses
    </h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    {latestCourses.map((course) => (
        <Link
            key={course._id}
            to={`/courses/${course._id}`}
        className="group overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
        style={{
            backgroundColor: colors.navbarBg,
            borderColor: colors.border,}}>
        <img
            src={course.thumbnail}
            alt={course.title}
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"/>
        <div className="p-4">
            <span
                className="rounded-full px-3 py-1 text-xs font-bold"
            style={{
                backgroundColor: colors.border,
                color: colors.primary, }}>
            {course.level}
            </span>
            <h3
                className="mt-3 line-clamp-2 min-h-[55px] text-lg font-black"
                style={{ color: colors.text }}>
            {course.title}
            </h3>
        <div
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl py-3 font-bold transition hover:scale-105"
            style={{
                backgroundColor: colors.secondary,
                color: "#14324A",}}>
            <FaPlay />
            View Course
        </div>
        </div>
        </Link>))}
        </div>
        </section>
      {/* Features Section */}
        <section className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
            <div
            key={index}
            className="group rounded-3xl border p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            style={{
                backgroundColor: colors.navbarBg,
                borderColor: colors.border,
                boxShadow: `0 20px 50px ${colors.shadow}`, }} >
            <div className="mb-4 text-4xl transition duration-300 group-hover:scale-125">
                {feature.icon}
            </div>
            <h3
                className="mb-2 text-xl font-black"
                style={{ color: colors.text }}>
                {feature.title}
            </h3>
            <p style={{ color: colors.muted }}>
                {feature.text}
            </p>
            <div
                className="mt-5 flex items-center gap-2 text-sm font-bold"
                style={{ color: colors.primary }} >
            <FaCheckCircle />
                Included in platform
            </div>
            </div> ))}
        </section>
    </main>);
}
export default HeroSection;