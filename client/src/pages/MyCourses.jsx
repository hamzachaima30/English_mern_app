import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaPlay,
  FaTrash,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

import api from "../services/api";
import { useTheme } from "../context/ThemeContext";

function MyCourses() {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchMyCourses = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.get("/my-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyCourses(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const removeCourse = async (courseId) => {
    try {
      await api.delete(`/my-courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyCourses(myCourses.filter((item) => item.course._id !== courseId));
    } catch (error) {
      alert(error.response?.data?.message || "Remove failed");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen px-5 py-20 text-center">
        <h2 className="text-2xl font-black" style={{ color: colors.primary }}>
          Loading your courses...
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-5 py-20 md:px-10 lg:px-20">
      <section className="mx-auto max-w-7xl">
        <div className="text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-md"
            style={{
              backgroundColor: colors.border,
              color: colors.primary,
            }}
          >
            <FaBookOpen />
            My Learning Space
          </span>

          <h1
            className="mt-5 text-4xl font-black md:text-5xl"
            style={{ color: colors.text }}
          >
            My Courses
          </h1>

          <p className="mt-3" style={{ color: colors.muted }}>
            Continue learning and track your progress.
          </p>
        </div>

        {myCourses.length === 0 ? (
          <div
            className="mx-auto mt-12 max-w-xl rounded-3xl border p-8 text-center shadow-xl"
            style={{
              backgroundColor: colors.navbarBg,
              borderColor: colors.border,
            }}
          >
            <h2 className="text-2xl font-black" style={{ color: colors.text }}>
              No courses yet
            </h2>

            <p className="mt-3" style={{ color: colors.muted }}>
              Start adding courses to your learning list.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-block rounded-2xl px-6 py-3 font-black"
              style={{
                backgroundColor: colors.secondary,
                color: "#14324A",
              }}
            >
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((item) => {
              const course = item.course;
              const progress = item.progress || 0;

              return (
                <div
                  key={item._id}
                  className="group flex h-[560px] flex-col overflow-hidden rounded-3xl border shadow-xl transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02]"
                  style={{
                    backgroundColor: colors.navbarBg,
                    borderColor: colors.border,
                    boxShadow:` 0 20px 50px ${colors.shadow}`,
                  }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-black text-[#14324A] shadow-md">
                      {course.level}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span
                      className="w-fit rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        backgroundColor: colors.border,
                        color: colors.primary,
                      }}
                    >
                      {course.category}
                    </span>

                    <h2
                      className="mt-4 line-clamp-2 min-h-[58px] text-xl font-black"
                      style={{ color: colors.text }}
                    >
                      {course.title}
                    </h2>

                    <p
                      className="mt-3 line-clamp-2 text-sm leading-6"
                      style={{ color: colors.muted }}
                    >
                      {course.description}
                    </p>

                    <div
                      className="mt-4 flex items-center gap-4 text-sm font-bold"
                      style={{ color: colors.muted }}
                    >
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {course.duration}
                      </span>

                      <span>🎬 {course.videoCount} videos</span>
                    </div>

                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span
                          className="flex items-center gap-2 text-sm font-bold"
                          style={{ color: colors.text }}
                        >
                          <FaChartLine />
                          Progress
                        </span>

                        <span
                          className="text-sm font-black"
                          style={{ color: colors.primary }}
                        >
                          {progress}%
                        </span>
                      </div>

                      <div className="h-3 w-full rounded-full bg-gray-200">
                        <div
                          className="h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: colors.primary,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-auto flex gap-3 pt-6">
                      <Link
                        to={`/courses/${course._id}`}
                        className="flex-1 rounded-2xl px-4 py-3 text-center font-black shadow-md transition hover:scale-105"
                        style={{
                          backgroundColor: colors.secondary,
                          color: "#14324A",
                        }}
                      >
                        <FaPlay className="mr-1 inline" />
                        Continue
                      </Link>

                      <button
                        onClick={() => removeCourse(course._id)}
                        className="rounded-2xl border px-4 py-3 font-bold transition hover:scale-105"
                        style={{
                          borderColor: colors.primary,
                          color: colors.primary,
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default MyCourses;