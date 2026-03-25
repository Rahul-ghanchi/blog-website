"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        const blog = data.blog || data;
        setTitle(blog.title);
        setContent(blog.content);
      });
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("✅ Blog Updated!");
      router.push("/");
    } else {
      alert("❌ Error updating blog");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>✏️ Edit Blog</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button onClick={handleUpdate} className="btn">
        Update Blog
      </button>
    </div>
  );
}