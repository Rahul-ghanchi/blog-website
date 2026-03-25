"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="navbar">
      <h2>🚀 Blog App</h2>

      <div>
        <Link href="/">Home</Link>
        <Link href="/create-blog">Create</Link>
        <Link href="/login">Login</Link>

        <button
          onClick={handleLogout}
          style={{
            marginLeft: "10px",
            background: "red",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}