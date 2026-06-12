import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaGlobe, FaHeart, FaGraduationCap, FaMoon, FaSun, FaBars, FaTimes,} from "react-icons/fa";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";
function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode, colors, toggleTheme } = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";};
  return (
    <header
      className="sticky top-4 z-50 mx-auto mb-6 w-[92%] rounded-3xl border px-5 py-3 backdrop-blur-md transition-all duration-300"
      style={{
        backgroundColor: colors.navbarBg,
        color: colors.text,
        borderColor: colors.border,
        boxShadow: `0 18px 45px ${colors.shadow}`,}}>
      <nav className="flex items-center justify-between">
        <Link to={user?.role === "admin" ? "/admin" : "/"} className="flex items-center gap-3">
          <img
            src={logo}
            alt="English Academy"
            className="h-11 w-11 rounded-2xl object-cover cursor-pointer transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:drop-shadow-lg"/>
          <div className="leading-tight">
            <h1 className="text-lg font-black">
              <span style={{ color: colors.primary }}>English</span>{" "}
              <span style={{ color: colors.secondary }}>Academy</span>
            </h1>
            <p className="text-[11px] font-medium" style={{ color: colors.muted }}>
              Learn English smartly
            </p>
          </div>
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          {user?.role === "admin" ? (
            <>
              <Link className="nav-link" to="/admin">
                🛠️ Dashboard
              </Link>
              <Link className="nav-link" to="/profile">
                👤 Profile
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/">
                <FaHome /> Home
              </Link>
              <Link className="nav-link" to="/courses">
                <FaGlobe /> All Courses
              </Link>
              <Link className="nav-link" to="/favorites">
                <FaHeart /> My Favorite
              </Link>
              <Link className="nav-link" to="/my-courses">
                <FaGraduationCap /> My Courses
              </Link>
            </>
          )}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="rounded-2xl p-3 transition hover:rotate-12"
            style={{
              backgroundColor: colors.border,
              color: colors.primary,}}>
            {mode === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          {user ? (
            <>
              <span
                className="rounded-2xl px-3 py-2 text-sm font-bold"
                style={{
                  backgroundColor: colors.border,
                  color: colors.primary,}}>
                Hi, {user.username} 
              </span>
              {user.role !== "admin" && (
                <Link
                  to="/profile"
                  className="rounded-2xl border px-4 py-2 text-sm font-bold transition hover:scale-105"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary, }}>
                  Profile
                </Link>)}
              <button
                onClick={logout}
                className="rounded-2xl px-4 py-2 text-sm font-black shadow-md transition hover:scale-105"
                style={{
                  backgroundColor: colors.secondary,
                  color: "#14324A", }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-2xl border px-4 py-2 text-sm font-bold transition hover:scale-105"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary, }}>
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-2xl px-5 py-2 text-sm font-black shadow-md transition hover:scale-105"
                style={{
                  backgroundColor: colors.secondary,
                  color: "#14324A", }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl md:hidden"
          style={{ color: colors.primary }} >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      {open && (
        <div
          className="mt-4 space-y-3 border-t pt-4 md:hidden"
          style={{ borderColor: colors.border }} >
          {user?.role === "admin" ? (
            <>
              <Link className="mobile-link" to="/admin">
                🛠️ Dashboard
              </Link>
              <Link className="mobile-link" to="/profile">
                👤 Profile
              </Link>
            </>
          ) : (
            <>
              <Link className="mobile-link" to="/">
                <FaHome /> Home
              </Link>
              <Link className="mobile-link" to="/courses">
                <FaGlobe /> All Courses
              </Link>
              <Link className="mobile-link" to="/favorites">
                <FaHeart /> My Favorite
              </Link>
              <Link className="mobile-link" to="/my-courses">
                <FaGraduationCap /> My Courses
              </Link>
            </> )}
          <div className="flex gap-2 pt-2">
            {user ? (
              <>
                <div
                  className="flex-1 rounded-xl border px-3 py-2 text-center text-sm font-bold"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,}}>
                  Hi, {user.username}
                </div>
                <button
                  onClick={logout}
                  className="flex-1 rounded-xl px-4 py-2 text-center font-black"
                  style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A",}}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex-1 rounded-xl border px-4 py-2 text-center font-bold"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,}}>
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex-1 rounded-xl px-4 py-2 text-center font-black"
                  style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A", }}>
                  Sign Up
                </Link>
              </>)}
            <button
              onClick={toggleTheme}
              className="rounded-xl px-4"
              style={{
                backgroundColor: colors.border,
                color: colors.primary,}}>
              {mode === "dark" ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;