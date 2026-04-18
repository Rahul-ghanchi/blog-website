"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/blog/${id}`);
        const data = await res.json();

        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/update-blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      alert(data.message);

      router.push("/");
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>✏️ Edit Blog</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          placeholder="Enter content"
          style={{ marginTop: "10px" }}
        />

        <button onClick={handleUpdate}>Update Blog</button>
      </div>
    </div>
  );
}