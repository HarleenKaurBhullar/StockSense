import { useState } from "react";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  // UI feedback state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic frontend validation for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    // Prepare endpoint and payload based on mode
    const endpoint = isLogin ? "login" : "register";
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      if (isLogin) {
        // Handle successful login
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Login successful:", data);
        
        // TODO: Redirect user to dashboard or trigger auth state update
        alert("Logged in successfully!"); 
      } else {
        // Handle successful registration
        console.log("Registration successful:", data);
        alert("Account created! Please log in.");
        setIsLogin(true); // Switch to login view
        setFormData({ ...formData, password: "", confirmPassword: "" }); // Clear passwords
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        {/* Logo / Brand */}
        <div className="auth-brand">
          <div className="brand-mark">S</div>
          <h1>Stock<span>Sense</span></h1>
          <p>Inventory Management System</p>
        </div>

        {/* Heading */}
        <div className="auth-heading">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Sign in to manage your inventory"
              : "Create an account to get started"}
          </p>
        </div>

        {/* Error Message Display */}
        {error && <div className="error-message" style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required={!isLogin}
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
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Switch Login / Signup */}
        <div className="switch-auth">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(""); // Clear errors when switching modes
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;