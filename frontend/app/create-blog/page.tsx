"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      if (!title || !content || !image) {
        alert("All fields required ❌");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);

      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Blog created successfully ✅");
        router.push("/");
      } else {
        console.log(data);
        alert(data.message || "Error creating blog ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 Create Blog</h1>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
      />

      <textarea
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <br /><br />

      <button onClick={handleSubmit} className="btn">
        Create Blog
      </button>
    </div>
  );
}