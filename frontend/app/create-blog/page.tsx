"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<any>(null);

  const router = useRouter();

  // ✅ LOGIN CHECK (TOP PE)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required ❌");
      router.push("/login");
    }
  }, []);

  const handleCreate = async () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    const res = await fetch("http://localhost:5000/create-blog", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    router.push("/");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🚀 Create Blog</h2>

        <input
          type="text"
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter Content"
          rows={5}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          onChange={(e: any) => setImage(e.target.files[0])}
        />

        <button onClick={handleCreate}>Create Blog</button>
      </div>
    </div>
  );
}