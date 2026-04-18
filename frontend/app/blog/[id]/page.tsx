"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/blog/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  if (!blog) return <h2 style={{ padding: "20px" }}>Blog not found ❌</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h1>{blog.title}</h1>
      <p style={{ marginTop: "10px" }}>{blog.content}</p>

      {blog.image && (
        <img
          src={`http://localhost:5000/uploads/${blog.image}`}
          width="400"
          style={{ marginTop: "20px", borderRadius: "10px" }}
        />
      )}
    </div>
  );
}