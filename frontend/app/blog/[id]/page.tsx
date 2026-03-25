"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const params = useParams();
  const id = params.id;

  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data.blog || data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blog.title}</h1>

      <img
        src={blog.image}
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <p>{blog.content}</p>
    </div>
  );
}