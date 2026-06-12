import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",});
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,});};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "admin") {
      navigate("/admin");
      } else {navigate("/");}
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"/>
        <button
          type="submit"
          className="w-full bg-yellow-400 py-3 rounded-xl font-bold">
          Login
        </button>
        <p className="text-center mt-4">
          No account?
          <Link to="/register" className="text-blue-500 ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;