import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🔐 Login</h2>

        <input type="email" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />

        <button>Login</button>

        <p>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "#3b82f6" }}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}