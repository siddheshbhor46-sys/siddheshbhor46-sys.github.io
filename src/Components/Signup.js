// // Signup.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signup({ setUser }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = () => {
//     if (email && password) {
//               setUser({ name: email });
//       navigate("/");
//     } else {
//       alert("Please fill all fields");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Signup</h3>
//       <input
//         type="email"
//         className="form-control my-2"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         className="form-control my-2"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className="btn btn-success" onClick={handleSignup}>
//         Signup
//       </button>
//     </div>
//   );
// }
