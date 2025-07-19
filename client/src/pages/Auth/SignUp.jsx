import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    companyName: "",
    country: "United States",
    city: "",
    phone: "",
    zip: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(formData).every(Boolean)) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    toast.success("Account created successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate("/login");
  };

  return (
    <div
      className="signup-container"
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Left Column - Form */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "white",
          "@media (maxWidth: 768px)": {
            width: "100%",
          },
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            padding: "2.5rem",
            borderRadius: "1rem",
            background: "white",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "0.5rem",
              }}
            >
              Create an Account
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "1rem",
              }}
            >
              Join us today
            </p>
          </div>

          {/* Left Form Column */}
          <div>
            {/* Full Name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                FULL NAME
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "#f8fafc",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "#f8fafc",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    backgroundColor: "#f8fafc",
                    paddingRight: "2.5rem",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                  }}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Company Name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                COMPANY NAME
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Your company"
                value={formData.companyName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "#f8fafc",
                }}
              />
            </div>
          </div>

          {/* Right Form Column */}
          <div>
            <div>
              {/* Phone Number */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#475569",
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  PHONE NUMBER
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <select
                    style={{
                      width: "30%",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.5rem 0 0 0.5rem",
                      border: "1px solid #e2e8f0",
                      fontSize: "0.875rem",
                      backgroundColor: "#f8fafc",
                      appearance: "none",
                      marginRight: "-1px", // Remove double border
                    }}
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+49">+49 (DE)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="123-456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: "70%",
                      padding: "0.75rem 1rem",
                      borderRadius: "0 0.5rem 0.5rem 0",
                      border: "1px solid #e2e8f0",
                      fontSize: "0.875rem",
                      backgroundColor: "#f8fafc",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* City */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                CITY
              </label>
              <input
                type="text"
                name="city"
                placeholder="Your city"
                value={formData.city}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "#f8fafc",
                }}
              />
            </div>

            {/* State/Region */}
            {/* <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                STATE/REGION
              </label>
              <input
                type="text"
                name="state"
                placeholder="State/Region"
                value={formData.state}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "#f8fafc",
                }}
              />
            </div> */}

            {/* Country */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                COUNTRY
              </label>
              <div style={{ position: "relative" }}>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    backgroundColor: "#f8fafc",
                    appearance: "none",
                  }}
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
                <FiChevronDown
                  size={18}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#94a3b8",
                  }}
                />
              </div>
            </div>

            {/* ZIP Code */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#475569",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                }}
              >
                ZIP CODE
              </label>
              <input
                type="text"
                name="zip"
                placeholder="ZIP/Postal code"
                value={formData.zip}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "#f8fafc",
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              gridColumn: "1 / -1",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: "#2E6F6E",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Sign Up
          </button>
          <div
            style={{ marginTop: "10px", fontSize: "16px", textAlign: "center" }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#2E6F6E",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Log in
            </a>
          </div>
        </div>
      </div>

      {/* Right Column - Visual */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "linear-gradient(135deg, #2E6F6E 0%, #1e4d4c 100%)",
          color: "white",
          "@media (maxWidth: 768px)": {
            display: "none",
          },
        }}
      >
        <div
          style={{
            maxWidth: "480px",
            textAlign: "center",
          }}
        >
          <img
            src="/assets/images/scale.png"
            alt="Analytics"
            style={{
              width: "100%",
              maxWidth: "480px",
              marginBottom: "2rem",
            }}
          />
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              marginBottom: "1rem",
              lineHeight: "1.25",
            }}
          >
            Very Simple Way You can Engage
          </h2>
          <p
            style={{
              fontSize: "1rem",
              opacity: "0.9",
              lineHeight: "1.5",
            }}
          >
            Welcome to Call Tracking Management System! Efficiently track and
            manage your data with ease.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
