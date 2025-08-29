import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { toast } from "react-toastify";

const MySwal = withReactContent(Swal);

const OtpModal = ({ phone, countryCode, onVerified, API_BASE_URL }) => {
  const [timer, setTimer] = useState(60);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [resendCount, setResendCount] = useState(0);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-box-${index + 1}`).focus();
    }
  };

//   const handleVerify = async () => {
//     const otp = otpDigits.join("");
//     console.log("Verifying OTP:", otp);
//     if (otp.length < 6) {
//       toast.error("Enter full 6-digit OTP");
//       return;
//     }
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/user/verify-otp`, {
//         phone,
//         countryCode,
//         otp,
//       });
//       toast.success(res.data.message);
//       onVerified(true);
//       Swal.close();
//     } catch (err) {
//       toast.error(res.data.error || "OTP verification failed");
//     }
//   };

const handleVerify = async () => {
  const otp = otpDigits.join("");
  console.log("Verifying OTP:", otp);
  if (otp.length < 6) {
    toast.error("Enter full 6-digit OTP");
    return false;
  }

  try {
    const res = await axios.post(`${API_BASE_URL}/api/user/verify-otp`, {
      phone,
      countryCode,
      otp,
    });
    toast.success(res.data.message);

    // Defer the unmount
    setTimeout(() => {
      onVerified(true); // triggers parent state change
      Swal.close();     // closes modal safely outside React render
    }, 0);

    return true;
  } catch (err) {
    toast.error(
      err.response?.data?.error || "OTP verification failed"
    );
    return false; // Prevent SweetAlert from auto-closing
  }
};

  const handleResendOtp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/user/send-otp`, {
        phone,
      });
      toast.success("OTP resent successfully");
      setOtpDigits(["", "", "", "", "", ""]);
      setTimer(60);
      setResendCount(resendCount + 1);
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  const showOtpSwal = () => {
  MySwal.fire({
    title: <strong>Enter OTP</strong>,
    html: (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          {otpDigits.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-box-${idx}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleInputChange(e, idx)}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "20px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: "14px" }}>
          {timer > 0 ? (
            <span>Resend OTP in {timer}s</span>
          ) : (
            <button className="btn btn-link p-0" onClick={handleResendOtp}>
              Resend OTP
            </button>
          )}
        </div>
      </div>
    ),
    showConfirmButton: true,
    confirmButtonText: "Verify",
    confirmButtonColor: "#28a745",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    preConfirm: () => handleVerify(),
    allowOutsideClick: false,
    didOpen: () => {
      setTimer(60);
      setTimeout(() => document.getElementById("otp-box-0")?.focus(), 100);
    },
  });

  };


  useEffect(() => {
    showOtpSwal();
  }, []);

  return null; // Component does not render anything in DOM
};

export default OtpModal;
// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MySwal = withReactContent(Swal);

// const OtpModal = ({ phone, countryCode, onVerified, API_BASE_URL, onClose }) => {
//   const [timer, setTimer] = useState(60);
//   const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
//   const [resendCount, setResendCount] = useState(0);

//   // Timer effect
//   useEffect(() => {
//     if (timer <= 0) return;
    
//     const interval = setInterval(() => {
//       setTimer(prev => prev - 1);
//     }, 1000);
    
//     return () => clearInterval(interval);
//   }, [timer, resendCount]);

//   // Initialize modal
//   useEffect(() => {
//     const swalInstance = MySwal.fire({
//       title: <strong>Enter OTP</strong>,
//       html: renderOtpInputs(),
//       showConfirmButton: true,
//       confirmButtonText: "Verify",
//       confirmButtonColor: "#28a745",
//       showCancelButton: true,
//       cancelButtonText: "Cancel",
//       allowOutsideClick: false,
//       didOpen: () => {
//         setTimer(60);
//         setTimeout(() => document.getElementById("otp-box-0")?.focus(), 100);
//       },
//     });

//     swalInstance.then((result) => {
//       if (result.isConfirmed) {
//         handleVerify().then((success) => {
//           if (success) {
//             onVerified(true);
//           }
//         });
//       } else {
//         onClose();
//       }
//     });

//     return () => {
//       if (swalInstance.isActive()) {
//         swalInstance.close();
//       }
//     };
//   }, []);

//   // Update modal content when state changes
//   useEffect(() => {
//     if (MySwal.isVisible()) {
//       MySwal.update({
//         html: renderOtpInputs()
//       });
//     }
//   }, [otpDigits, timer]);

//   const renderOtpInputs = () => {
//     return (
//       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//         <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
//           {otpDigits.map((digit, idx) => (
//             <input
//               key={idx}
//               id={`otp-box-${idx}`}
//               type="text"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleInputChange(e, idx)}
//               onKeyDown={(e) => handleKeyDown(e, idx)}
//               style={{
//                 width: "40px",
//                 height: "40px",
//                 fontSize: "20px",
//                 textAlign: "center",
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//               }}
//             />
//           ))}
//         </div>
//         <div style={{ textAlign: "center", fontSize: "14px" }}>
//           {timer > 0 ? (
//             <span>Resend OTP in {timer}s</span>
//           ) : (
//             <button
//               type="button"
//               className="btn btn-link p-0"
//               onClick={handleResendOtp}
//               style={{ color: "#2E6F6E" }}
//             >
//               Resend OTP
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const handleInputChange = (e, index) => {
//     const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
//     const newOtp = [...otpDigits];
//     newOtp[index] = value;
//     setOtpDigits(newOtp);

//     // Move focus to next input
//     if (value && index < 5) {
//       setTimeout(() => {
//         document.getElementById(`otp-box-${index + 1}`)?.focus();
//       }, 10);
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
//       setTimeout(() => {
//         document.getElementById(`otp-box-${index - 1}`)?.focus();
//       }, 10);
//     }
//   };

//   const handleVerify = async () => {
//     const otp = otpDigits.join("");
//     console.log("Verifying OTP:", otp);
//     if (otp.length < 6) {
//       toast.error("Enter full 6-digit OTP");
//       return false;
//     }
//     try {
//       const res = await axios.post(`${API_BASE_URL}/api/user/verify-otp`, {
//         phone,
//         countryCode,
//         otp,
//       });
//       toast.success(res.data.message);
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.error || "OTP verification failed");
//       return false;
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       await axios.post(`${API_BASE_URL}/api/user/send-otp`, { phone });
//       toast.success("OTP resent successfully");
//       setOtpDigits(["", "", "", "", "", ""]);
//       setTimer(60);
//       setResendCount(prev => prev + 1);
//       setTimeout(() => document.getElementById("otp-box-0")?.focus(), 100);
//     } catch (error) {
//       toast.error("Failed to resend OTP");
//     }
//   };

//   return null;
// };

// export default OtpModal;