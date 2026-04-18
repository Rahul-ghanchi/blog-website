"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("FULL RESPONSE:", data);
      console.log("LOGIN RESPONSE:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful ✅");
        router.push("/");
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch (error) {
      alert("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-box">
        <h2>🔐 Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ✅ SIGNUP LINK ADD KIYA */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account?{" "}
          <span
            style={{
              color: "#60a5fa",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}