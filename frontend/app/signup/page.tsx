"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    console.log("🔥 Signup clicked");

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Rahul",
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log("RESPONSE:", data);

      if (res.ok) {
        alert("Signup Successful ✅");
        router.push("/login");
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSignup} className="login-box">
        <h2>✏️ Signup</h2>

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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}