"use client";

import Link from "next/link";

export default function BlogCard({ blog, onDelete }: any) {
  return (
    <div style={{
      background: "#1e293b",
      padding: "20px",
      marginTop: "20px",
      borderRadius: "10px"
    }}>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>

      <div style={{ marginTop: "10px" }}>
        <Link href={`/blog/${blog._id}`}>
          <button>View</button>
        </Link>

        <Link href={`/edit-blog/${blog._id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={() => onDelete(blog._id)}>Delete</button>
      </div>
    </div>
  );
}