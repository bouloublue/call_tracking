import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_URL;
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!username || !password) {
    toast.error("Username and password are required");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        password: password,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data?.error || "Login failed");
      return;
    }

    const decoded = jwtDecode(data.token);

    console.log("role", decoded.role)

    const authData = {
      isAuthenticated: true,
      token: data.token,
      role: decoded.role,
    };

    // Save token to localStorage (or cookies)
    localStorage.setItem("token", JSON.stringify(authData));

    toast.success("Login successful!");

     if (decoded.role === "admin") {
      navigate("/");
    } else if (decoded.role === "buyer") {
      navigate("/campaign-report");
    } else {
      navigate("/unauthorized");
    }
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Something went wrong. Please try again.");
  }
};

  const containerStyle = {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  };

  const leftStyle = {
    width: "50%",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "40px",
  };

  const rightStyle = {
    width: "50%",
    backgroundColor: "#2E6F6E",
    height: "100vh",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "40px",
    position: "relative",
    overflow: "hidden",
  };

  const formStyle = {
    backgroundColor: "#f9f9f9",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const labelStyle = {
    fontWeight: "600",
    fontSize: "14px",
    display: "block",
    textAlign: "left",
    marginTop: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#2E6F6E",
    color: "white",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    fontSize: "13px",
    verticalAlign: "top",
  };

  const cornerImageStyleTopRight = {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "250px",
    opacity: 0.3,
  };

  const cornerImageStyleBottomLeft = {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    width: "250px",
    opacity: 0.3,
  };

  return (
    <div style={containerStyle}>
      {/* Left Side */}
      <div style={leftStyle}>
        {/* Login Form */}
        <div style={formStyle}>
          <div style={{ textAlign: "center", marginBottom: "20px"}}>
            <img
              src="/assets/images/logo-main2.png"
              alt="Logo"
              style={{ height: "60px", marginBottom: "20px" }}
            />
          </div>
          <h2 style={{ fontWeight: "600" }}>Welcome Back!</h2>
          <p style={{ color: "#888" }}>Please log in to continue</p>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            placeholder="Email or Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <div
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#666",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          {error && (
            <div style={{ color: "red", marginTop: "8px", fontSize: "13px" }}>
              {error}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              marginTop: "10px",
            }}
          >
            <label>
              <input type="checkbox" style={{ marginRight: "6px" }} />
              Remember me
            </label>
            <a href="#" style={{ color: "#2E6F6E", textDecoration: "none" }}>
              Forgot Password
            </a>
          </div>

          <button style={buttonStyle} onClick={handleLogin}>
            Login
          </button>

          <div style={{ marginTop: "20px", fontSize: "16px" }}>
            Don't have an account?{" "}
            <a 
              href="/signup" 
              style={{ 
                color: "#2E6F6E", 
                textDecoration: "none",
                fontWeight: "600"
              }}
            >
              Sign up
            </a>
          </div>

          <hr style={{ margin: "30px 0" }} />

          {/* <p style={{ fontWeight: "600" }}>Demo account login credentials</p>
          <table style={{ width: "100%", marginTop: "10px", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                <th style={tdStyle}>Details</th>
                <th style={tdStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {["admin", "Buyer"].map((role) => (
                <tr key={role}>
                  <td style={tdStyle}>
                    <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong><br />
                    Username: <strong>{role}</strong><br />
                    Password: <strong>{role}@123</strong>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => useDemoCredentials(role)}
                      style={{
                        backgroundColor: "#2E6F6E",
                        color: "white",
                        padding: "6px 12px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Use
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>

      {/* Right Side */}
      <div style={rightStyle}>
        <img
          src="/assets/images/scale.png"
          alt="Analytics"
          style={{ width: "480px", marginBottom: "20px" }}
        />
        <h2 style={{ fontSize: "24px", fontWeight: "600", color: "white" }}>
          Very Simple Way You can Engage
        </h2>
        <p style={{ fontSize: "16px", maxWidth: "400px", textAlign: "center", color: "#cfcdcd" }}>
          Welcome to Call Tracking Management System! Efficiently track and manage your data with ease.
        </p>

        {/* Decorative Corner Images */}
        <img
          src="/assets/images/Right-top.png"
          alt="Decor Top Right"
          style={cornerImageStyleTopRight}
        />
        <img
          src="/assets/images/bottom-left.png"
          alt="Decor Bottom Left"
          style={cornerImageStyleBottomLeft}
        />
      </div>
    </div>
  );
}

export default Login;