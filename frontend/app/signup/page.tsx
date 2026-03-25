export default function SignupPage() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>📝 Signup</h2>

        <input type="text" placeholder="Enter Name" />
        <input type="email" placeholder="Enter Email" />
        <input type="password" placeholder="Enter Password" />

        <button>Signup</button>
      </div>
    </div>
  );
}