"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>📝 Signup</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}