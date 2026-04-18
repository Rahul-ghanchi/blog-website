"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:5000/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
    });
    fetchBlogs();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 All Blogs</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          margin: "20px 0",
          width: "300px",
          borderRadius: "8px",
        }}
      />

      {/* GRID */}
      <div className="blog-grid">
        {blogs
          .filter((blog) =>
            blog.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((blog) => (
            <div className="blog-card" key={blog._id}>
              {blog.image && (
                <img
                  src={`http://localhost:5000/uploads/${blog.image}`}
                  alt="blog"
                />
              )}

              <h3>{blog.title}</h3>
              <p>{blog.content.slice(0, 80)}...</p>

              <div className="btn-group">
                <button
                  className="view"
                  onClick={() => router.push(`/blog/${blog._id}`)}
                >
                  View
                </button>

                <button
                  className="edit"
                  onClick={() => router.push(`/edit-blog/${blog._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}