import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

function AdminDashboard() {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await api.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const coursesRes = await api.get("/courses");

      setStats(statsRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1
          className="animate-pulse text-3xl font-black"
          style={{ color: colors.primary }}
        >
          Loading Dashboard...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-16 md:px-10 lg:px-20">
      <section className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1
              className="text-4xl font-black md:text-5xl"
              style={{ color: colors.text }}
            >
              Admin Dashboard
            </h1>

            <p
              className="mt-2"
              style={{ color: colors.muted }}
            >
              Manage your English Academy platform.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/add-course")}
              className="rounded-2xl bg-green-500 px-6 py-3 font-black text-white shadow-lg transition hover:-translate-y-1 hover:scale-105"
            >
              Add Course
            </button>

            <button
              onClick={logout}
              className="rounded-2xl bg-red-500 px-6 py-3 font-black text-white shadow-lg transition hover:-translate-y-1 hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-2">

          <div
            className="rounded-3xl border p-8 shadow-xl transition hover:-translate-y-2 hover:scale-[1.02]"
            style={{
              backgroundColor: colors.navbarBg,
              borderColor: colors.border,
              boxShadow: `0 20px 50px ${colors.shadow}`,
            }}
          >
            <h3
              className="text-lg font-bold"
              style={{ color: colors.muted }}
            >
              Total Users
            </h3>

            <p
              className="mt-4 text-5xl font-black"
              style={{ color: colors.primary }}
            >
              {stats.totalUsers}
            </p>
          </div>

          <div
            className="rounded-3xl border p-8 shadow-xl transition hover:-translate-y-2 hover:scale-[1.02]"
            style={{
              backgroundColor: colors.navbarBg,
              borderColor: colors.border,
              boxShadow: `0 20px 50px ${colors.shadow}`,
            }}
          >
            <h3
              className="text-lg font-bold"
              style={{ color: colors.muted }}
            >
              Total Courses
            </h3>

            <p
              className="mt-4 text-5xl font-black"
              style={{ color: colors.primary }}
            >
              {stats.totalCourses}
            </p>
          </div>

        </div>
        <h2
          className="mb-6 text-3xl font-black"
          style={{ color: colors.text }}
        >
          Courses Management
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="overflow-hidden rounded-3xl shadow-xl transition hover:-translate-y-2 hover:scale-[1.02]"
              style={{
                backgroundColor: colors.navbarBg,
                border: `1px solid ${colors.border}`,
                boxShadow: `0 20px 50px ${colors.shadow}`,
              }}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3
                  className="line-clamp-2 text-xl font-black"
                  style={{ color: colors.text }}
                >
                  {course.title}
                </h3>

                <p
                  className="mt-2 text-sm"
                  style={{ color: colors.muted }}
                >
                  {course.level} • {course.category}
                </p>

                <p
                  className="mt-2 text-sm"
                  style={{ color: colors.muted }}
                >
                  {course.duration} • {course.videoCount} videos
                </p>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-course/${course._id}`)
                    }
                    className="flex-1 rounded-2xl bg-blue-500 py-3 font-bold text-white transition hover:scale-105"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="flex-1 rounded-2xl bg-red-500 py-3 font-bold text-white transition hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;