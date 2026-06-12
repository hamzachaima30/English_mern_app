import {FaUser,FaEnvelope,FaShieldAlt,FaEdit,FaKey,FaCamera,} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { useState } from "react";
function Profile() {
    const { colors } = useTheme();
    const user = JSON.parse(localStorage.getItem("user"));
    const [showEdit, setShowEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [editData, setEditData] = useState({
        username: user?.username || "",
        email: user?.email || "", });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",});
    if (!user) {
    return (
        <main className="flex min-h-screen items-center justify-center px-5">
            <h2 className="text-2xl font-black" style={{ color: colors.primary }}>
                Please login first
            </h2>
        </main>);}
    const initials = user.username
        ? user.username.slice(0, 2).toUpperCase()
        : "US";
    const uploadProfileImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    const token = localStorage.getItem("token");
    try {
        const res = await axios.put(
        "http://localhost:5000/api/auth/profile-image",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",},
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Image upload failed"); }   };
    const updateProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(
            "http://localhost:5000/api/auth/profile",
            editData,
        {
            headers: {
                Authorization: `Bearer ${token}`,},
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Profile update failed");}};
        const changePassword = async () => {
        if (!passwordData.currentPassword || !passwordData.newPassword) {
        alert("Please fill all password fields");
        return;}
    try {
        const token = localStorage.getItem("token");
        await axios.put(
        "http://localhost:5000/api/auth/change-password",
        passwordData,
        {
            headers: {
            Authorization: `Bearer ${token}`, },
        });
        alert("Password changed successfully ✔");
        setShowPassword(false);
        setPasswordData({
        currentPassword: "",
        newPassword: "",});
        } catch (error) {
        alert(error.response?.data?.message || "Password change failed ×"); }
    };
return (
    <main className="min-h-screen px-5 py-20 md:px-10 lg:px-20">
        <section className="mx-auto max-w-3xl">
        <div
            className="rounded-[32px] border p-8 shadow-xl"
            style={{
                backgroundColor: colors.navbarBg,
                borderColor: colors.border,
                boxShadow: `0 20px 50px ${colors.shadow}`, }}>
            <div className="flex flex-col items-center text-center">
            <div className="relative">
                {user.profileImage ? (
                    <img
                        src={`http://localhost:5000${user.profileImage}`}
                        alt="Profile"
                        className="h-28 w-28 rounded-full object-cover shadow-lg" />
                ) : (
                <div
                    className="flex h-28 w-28 items-center justify-center rounded-full text-4xl font-black shadow-lg"
                    style={{
                        backgroundColor: colors.primary,
                        color: "white", }}>
                    {initials}
                </div> )}
            <label
                className="absolute bottom-0 right-0 cursor-pointer rounded-full p-3 shadow-md transition hover:scale-110"
                style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A",}}>
                <FaCamera />
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadProfileImage}/>
            </label>
            </div>
            <h1
                className="mt-5 text-3xl font-black"
                style={{ color: colors.text }}>
                {user.username}
            </h1>
            <p
                className="mt-1"
                style={{ color: colors.muted }}>
                English Academy Student
            </p>
            </div>
            <div className="mt-8 space-y-4">
            <div
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{ backgroundColor: colors.border }} >
                <FaUser style={{ color: colors.primary }} />
                <div className="text-left">
                <p
                    className="text-sm"
                    style={{ color: colors.muted }}>
                    Username
                </p>
                <h3
                    className="font-black"
                    style={{ color: colors.text }}>
                    {user.username}
                </h3>
                </div>
            </div>
            <div
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{ backgroundColor: colors.border }} >
                <FaEnvelope style={{ color: colors.primary }} />
                <div className="text-left">
                <p
                    className="text-sm"
                    style={{ color: colors.muted }}>
                        Email
                </p>
                <h3
                    className="break-words font-black"
                    style={{ color: colors.text }}>
                    {user.email}
                </h3>
                </div>
            </div>
            <div
                className="flex items-center gap-4 rounded-2xl p-4"
                style={{ backgroundColor: colors.border }}>
                <FaShieldAlt style={{ color: colors.primary }} />
                <div className="text-left">
                <p
                    className="text-sm"
                    style={{ color: colors.muted }}>
                    Role
                </p>
                <h3
                    className="font-black capitalize"
                    style={{ color: colors.text }} >
                    {user.role}
                </h3>
                </div>
            </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
            <button
                onClick={() => setShowEdit(true)}
                className="flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-black shadow-md transition hover:-translate-y-1 hover:scale-105"
                style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A",}}>
                <FaEdit />
                Edit Profile
            </button>
            <button
                onClick={() => setShowPassword(true)}
                className="flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 font-bold transition hover:-translate-y-1 hover:scale-105"
                style={{
                    borderColor: colors.primary,
                    color: colors.primary,}}>
                <FaKey />
                Change Password
            </button>
            </div>
            </div>
        </section>
      {/* Edit Profile Modal */}
    {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                className="w-full max-w-md rounded-3xl p-6"
                style={{
                    backgroundColor: colors.navbarBg, }} >
            <h2
                className="mb-5 text-2xl font-black"
                style={{ color: colors.text }} >
                Edit Profile
            </h2>
            <input
                type="text"
                placeholder="Username"
                value={editData.username}
                onChange={(e) =>
                    setEditData({
                    ...editData,
                    username: e.target.value,})}
                className="mb-4 w-full rounded-xl border p-3 outline-none"/>
            <input
                type="email"
                placeholder="Email"
                value={editData.email}
                onChange={(e) =>
                    setEditData({
                        ...editData,
                        email: e.target.value,})}
                className="mb-5 w-full rounded-xl border p-3 outline-none" />
            <div className="flex gap-3">
                <button
                    onClick={updateProfile}
                    className="flex-1 rounded-xl py-3 font-black"
                style={{
                    backgroundColor: colors.secondary,
                    color: "#14324A",}}>
                    Save
                </button>
                <button
                    onClick={() => setShowEdit(false)}
                    className="flex-1 rounded-xl border py-3 font-bold"
                    style={{
                        borderColor: colors.primary,
                        color: colors.primary,}}>
                    Cancel
                </button>
            </div>
            </div>
        </div>)}
      {/* Change Password Modal */}
    {showPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                className="w-full max-w-md rounded-3xl p-6"
                style={{
                    backgroundColor: colors.navbarBg, }}>
            <h2
                className="mb-5 text-2xl font-black"
                style={{ color: colors.text }}>
                Change Password
            </h2>
            <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                    setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,})}
                className="mb-4 w-full rounded-xl border p-3 outline-none"/>
            <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                    setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,})}
                className="mb-5 w-full rounded-xl border p-3 outline-none" />
            <div className="flex gap-3">
                <button
                    onClick={changePassword}
                    className="flex-1 rounded-xl py-3 font-black"
                    style={{
                        backgroundColor: colors.secondary,
                        color: "#14324A",}}>
                    Change
                </button>
                <button
                    onClick={() => setShowPassword(false)}
                    className="flex-1 rounded-xl border py-3 font-bold"
                    style={{
                        borderColor: colors.primary,
                        color: colors.primary,}}>
                    Cancel
                </button>
            </div>
            </div>
        </div>)}
    </main>);}

export default Profile;
