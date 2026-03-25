"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
    });

    alert("Deleted ✅");
    fetchBlogs();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 All Blogs</h1>

      {blogs.map((blog: any) => (
        <div
          key={blog._id}
          style={{
            background: "#1f2937",
            padding: "20px",
            margin: "20px 0",
            borderRadius: "10px",
          }}
        >
          <img
            src={blog.image}
            alt=""
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          <h2>{blog.title}</h2>
          <p>{blog.content}</p>

          {/* ✅ BUTTONS BACK */}
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => router.push(`/blog/${blog._id}`)}
              style={{ marginRight: "10px" }}
            >
              View
            </button>

            <button
              onClick={() => router.push(`/edit-blog/${blog._id}`)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(blog._id)}
              style={{ background: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}