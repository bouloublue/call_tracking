// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiEye, FiEyeOff, FiChevronDown } from "react-icons/fi";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_URL;

// function SignUp() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     companyName: "",
//     country: "United States",
//     countryCode: "+1", // Default country code
//     address: "", // Changed from city to address
//     phone: "",
//     zip: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     if (!Object.values(formData).every(Boolean)) {
//       toast.error("Please fill in all fields", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Prepare the data for API
//       const payload = {
//         name: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//         company: formData.companyName,
//         country: formData.country,
//         address: formData.address,
//         phone: formData.phone,
//         zip: formData.zip,
//         countryCode: formData.countryCode,
//         role: "buyer" // Assuming you want default role as user
//       };

//       // Make API call
//       const response = await axios.post(`${API_BASE_URL}/api/user`, payload);

//       if (response.status === 201) {
//         toast.success("Account created successfully!", {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       let errorMessage = "Failed to create account";
      
//       if (error.response) {
//         if (error.response.status === 400) {
//           errorMessage = error.response.data.message || "Validation error";
//         } else if (error.response.status === 409) {
//           errorMessage = "Email already exists";
//         }
//       }

//       toast.error(errorMessage, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div
//       className="signup-container"
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         fontFamily: "'Inter', sans-serif",
//         backgroundColor: "#f8fafc",
//       }}
//     >
//       {/* Left Column - Form */}
//       <div
//         style={{
//           width: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "2rem",
//           background: "white",
//           "@media (maxWidth: 768px)": {
//             width: "100%",
//           },
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             maxWidth: "800px",
//             padding: "2.5rem",
//             borderRadius: "1rem",
//             background: "white",
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "2rem",
//           }}
//         >
//           <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
//             <h2
//               style={{
//                 fontSize: "1.75rem",
//                 fontWeight: "700",
//                 color: "#1e293b",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               Create an Account
//             </h2>
//             <p
//               style={{
//                 color: "#64748b",
//                 fontSize: "1rem",
//               }}
//             >
//               Join us today
//             </p>
//           </div>

//           {/* Left Form Column */}
//           <div>
//             {/* Full Name */}
//             <div style={{ marginBottom: "1.5rem" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                   color: "#475569",
//                   marginBottom: "0.5rem",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 FULL NAME
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem 1rem",
//                   borderRadius: "0.5rem",
//                   border: "1px solid #e2e8f0",
//                   fontSize: "0.875rem",
//                   backgroundColor: "#f8fafc",
//                 }}
//               />
//             </div>

//             {/* Email */}
//             <div style={{ marginBottom: "1.5rem" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                   color: "#475569",
//                   marginBottom: "0.5rem",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 EMAIL ADDRESS
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem 1rem",
//                   borderRadius: "0.5rem",
//                   border: "1px solid #e2e8f0",
//                   fontSize: "0.875rem",
//                   backgroundColor: "#f8fafc",
//                 }}
//               />
//             </div>

//             {/* Password */}
//             <div style={{ marginBottom: "1.5rem" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                   color: "#475569",
//                   marginBottom: "0.5rem",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 PASSWORD
//               </label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Create password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     borderRadius: "0.5rem",
//                     border: "1px solid #e2e8f0",
//                     fontSize: "0.875rem",
//                     backgroundColor: "#f8fafc",
//                     paddingRight: "2.5rem",
//                   }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: "absolute",
//                     right: "0.75rem",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     background: "transparent",
//                     border: "none",
//                     cursor: "pointer",
//                     color: "#94a3b8",
//                   }}
//                 >
//                   {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Company Name */}
//             <div style={{ marginBottom: "1.5rem" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                   color: "#475569",
//                   marginBottom: "0.5rem",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 COMPANY NAME
//               </label>
//               <input
//                 type="text"
//                 name="companyName"
//                 placeholder="Your company"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem 1rem",
//                   borderRadius: "0.5rem",
//                   border: "1px solid #e2e8f0",
//                   fontSize: "0.875rem",
//                   backgroundColor: "#f8fafc",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Right Form Column */}
//           <div>
//             <div>
//               {/* Phone Number */}
//               <div style={{ marginBottom: "1.5rem" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "0.75rem",
//                     fontWeight: "600",
//                     color: "#475569",
//                     marginBottom: "0.5rem",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   PHONE NUMBER
//                 </label>
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <select
//                     style={{
//                       width: "30%",
//                       padding: "0.75rem 1rem",
//                       borderRadius: "0.5rem 0 0 0.5rem",
//                       border: "1px solid #e2e8f0",
//                       fontSize: "0.875rem",
//                       backgroundColor: "#f8fafc",
//                       appearance: "none",
//                       marginRight: "-1px",
//                     }}
//                   >
//                     <option value="+1">+1 (US)</option>
//                     <option value="+44">+44 (UK)</option>
//                     <option value="+61">+61 (AU)</option>
//                     <option value="+49">+49 (DE)</option>
//                   </select>
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="123-456-7890"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     style={{
//                       width: "70%",
//                       padding: "0.75rem 1rem",
//                       borderRadius: "0 0.5rem 0.5rem 0",
//                       border: "1px solid #e2e8f0",
//                       fontSize: "0.875rem",
//                       backgroundColor: "#f8fafc",
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
            
//             {/* Address (changed from City) */}
//             <div style={{ marginBottom: "1.5rem" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                   color: "#475569",
//                   marginBottom: "0.5rem",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 ADDRESS
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Your full address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem 1rem",
//                   borderRadius: "0.5rem",
//                   border: "1px solid #e2e8f0",
//                   fontSize: "0.875rem",
//                   backgroundColor: "#f8fafc",
//                 }}
//               />
//             </div>

//             {/* Country */}
//             <div style={{ marginBottom: "1.5rem" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                   color: "#475569",
//                   marginBottom: "0.5rem",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 COUNTRY
//               </label>
//               <div style={{ position: "relative" }}>
//                 <select
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   style={{
//                     width: "100%",
//                     padding: "0.75rem 1rem",
//                     borderRadius: "0.5rem",
//                     border: "1px solid #e2e8f0",
//                     fontSize: "0.875rem",
//                     backgroundColor: "#f8fafc",
//                     appearance: "none",
//                   }}
//                 >
//                   <option value="United States">United States</option>
//                   <option value="Canada">Canada</option>
//                   <option value="United Kingdom">United Kingdom</option>
//                   <option value="Australia">Australia</option>
//                 </select>
//                 <FiChevronDown
//                   size={18}
//                   style={{
//                     position: "absolute",
//                     right: "1rem",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     pointerEvents: "none",
//                     color: "#94a3b8",
//                   }}
//                 />
//               </div>
//             </div>

//             {/* ZIP Code */}
//             <div style={{ marginBottom: "1.5rem" }}>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "0.75rem",
//                   fontWeight: "600",
//                   color: "#475569",
//                   marginBottom: "0.5rem",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 ZIP CODE
//               </label>
//               <input
//                 type="text"
//                 name="zip"
//                 placeholder="ZIP/Postal code"
//                 value={formData.zip}
//                 onChange={handleChange}
//                 style={{
//                   width: "100%",
//                   padding: "0.75rem 1rem",
//                   borderRadius: "0.5rem",
//                   border: "1px solid #e2e8f0",
//                   fontSize: "0.875rem",
//                   backgroundColor: "#f8fafc",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             style={{
//               gridColumn: "1 / -1",
//               padding: "0.75rem",
//               borderRadius: "0.5rem",
//               border: "none",
//               backgroundColor: isSubmitting ? "#cccccc" : "#2E6F6E",
//               color: "white",
//               fontSize: "0.875rem",
//               fontWeight: "600",
//               cursor: isSubmitting ? "not-allowed" : "pointer",
//               marginTop: "1rem",
//             }}
//           >
//             {isSubmitting ? "Creating Account..." : "Sign Up"}
//           </button>
//           <div
//             style={{ marginTop: "10px", fontSize: "16px", textAlign: "center" }}
//           >
//             Already have an account?{" "}
//             <a
//               href="/login"
//               style={{
//                 color: "#2E6F6E",
//                 textDecoration: "none",
//                 fontWeight: "600",
//               }}
//             >
//               Log in
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Right Column - Visual */}
//       <div
//         style={{
//           width: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "2rem",
//           background: "linear-gradient(135deg, #2E6F6E 0%, #1e4d4c 100%)",
//           color: "white",
//           "@media (maxWidth: 768px)": {
//             display: "none",
//           },
//         }}
//       >
//         <div
//           style={{
//             maxWidth: "480px",
//             textAlign: "center",
//           }}
//         >
//           <img
//             src="/assets/images/scale.png"
//             alt="Analytics"
//             style={{
//               width: "100%",
//               maxWidth: "480px",
//               marginBottom: "2rem",
//             }}
//           />
//           <h2
//             style={{
//               fontSize: "1.75rem",
//               fontWeight: "700",
//               marginBottom: "1rem",
//               lineHeight: "1.25",
//             }}
//           >
//             Very Simple Way You can Engage
//           </h2>
//           <p
//             style={{
//               fontSize: "1rem",
//               opacity: "0.9",
//               lineHeight: "1.5",
//             }}
//           >
//             Welcome to Call Tracking Management System! Efficiently track and
//             manage your data with ease.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { HiBadgeCheck } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    companyName: "",
    country: "United States",
    countryCode: "+1",
    address: "",
    phone: "",
    zip: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOtp = async () => {
    const phone = formData.phone;
    const countryCode = formData.countryCode;

    if (!phone || !countryCode) {
      toast.error("Phone number and country code are required");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/send-otp`, {
        phone_number: `${countryCode}${phone}`,
      });
      toast.success(res.data.message);
      setOtpSent(true);
      setCountdown(60);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const verifyOtp = async () => {
    setVerifying(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/verify-otp`, {
        phone_number: `${formData.countryCode}${formData.phone}`,
        otp: otp,
      });
      toast.success(res.data.message);
      setOtpVerified(true);
      setOtpSent(false);
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!Object.values(formData).every(Boolean)) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsSubmitting(false);
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify your phone number with OTP first");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        company: formData.companyName,
        country: formData.country,
        address: formData.address,
        phone: formData.phone,
        zip: formData.zip,
        countryCode: formData.countryCode,
        role: "buyer"
      };

      const response = await axios.post(`${API_BASE_URL}/api/user`, payload);

      if (response.status === 201) {
        toast.success("Account created successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Failed to create account";
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Validation error";
        } else if (error.response.status === 409) {
          errorMessage = "Email already exists";
        }
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
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
                {otpVerified && (
                  <span
                    style={{
                      color: "green",
                      marginLeft: "8px",
                      fontSize: "14px",
                      fontWeight: "normal",
                    }}
                  >
                    ✓ Verified
                  </span>
                )}
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  disabled={otpVerified}
                  style={{
                    width: "30%",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem 0 0 0.5rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    backgroundColor: "#f8fafc",
                    appearance: "none",
                    marginRight: "-1px",
                  }}
                >
                  <option value="+1">+1 (US)</option>
                  <option value="+91">+91 (IN)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (AU)</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="123-456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={otpVerified}
                  style={{
                    width: "70%",
                    padding: "0.75rem 1rem",
                    borderRadius: "0 0.5rem 0.5rem 0",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    backgroundColor: "#f8fafc",
                  }}
                />
                {!otpVerified ? (
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={!formData.phone || countdown > 0}
                    style={{
                      marginLeft: "10px",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      backgroundColor: countdown > 0 ? "#cccccc" : "#2E6F6E",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: !formData.phone || countdown > 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Get OTP"}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    style={{
                      marginLeft: "10px",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.5rem",
                      border: "none",
                      backgroundColor: "#4BB543",
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <HiBadgeCheck size={18} />
                    Verified
                  </button>
                )}
              </div>
            </div>
            
            {/* Address */}
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
                ADDRESS
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your full address"
                value={formData.address}
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
            disabled={isSubmitting || !otpVerified}
            style={{
              gridColumn: "1 / -1",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              backgroundColor: isSubmitting || !otpVerified ? "#cccccc" : "#2E6F6E",
              color: "white",
              fontSize: "0.875rem",
              fontWeight: "600",
              cursor: isSubmitting || !otpVerified ? "not-allowed" : "pointer",
              marginTop: "1rem",
            }}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="spin" style={{ marginRight: "8px" }} />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
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

      {/* OTP Verification Modal */}
      {otpSent && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1060,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "25px",
              width: "400px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ margin: 0 }}>Verify OTP</h4>
              <button
                onClick={() => setOtpSent(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
            <p style={{ marginBottom: "20px" }}>
              We've sent a 6-digit OTP to {formData.countryCode}{" "}
              {formData.phone}
            </p>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#666" }}>
                {countdown > 0 ? `Resend OTP in ${countdown}s` : ""}
              </span>
              {countdown === 0 && (
                <button
                  onClick={sendOtp}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2E6F6E",
                    cursor: "pointer",
                  }}
                >
                  Resend OTP
                </button>
              )}
            </div>
            <button
              onClick={verifyOtp}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#2E6F6E",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {verifying ? (
                <>
                  <FaSpinner className="spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;