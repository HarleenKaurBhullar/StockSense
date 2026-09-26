import { useState } from "react";
import "./auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend/authentication will be connected later
    console.log(isLogin ? "Login submitted" : "Signup submitted");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        {/* Logo / Brand */}
        <div className="auth-brand">
          <div className="brand-mark">
            S
          </div>

          <h1>
            Stock<span>Sense</span>
          </h1>

          <p>Inventory Management System</p>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h2>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p>
            {isLogin
              ? "Sign in to manage your inventory"
              : "Create an account to get started"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {/* Login options */}
          {isLogin && (
            <div className="login-options">
              <label>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

        </form>

        {/* Switch Login / Signup */}
        <div className="switch-auth">

          <span>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Auth;