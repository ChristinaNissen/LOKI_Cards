import React, { useState } from "react";
import Footer from "./Footer";
import "./Login.css";
import "./Voting-system.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // install with: npm install react-icons


const Login = ({ setIsLoggedIn }) => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userIDError, setUserIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  



  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!userID.trim()) {
      setUserIDError("Please enter your user ID");
      hasError = true;
    } else {
      setUserIDError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      setIsLoggedIn(true); // Set logged in status
      navigate("/votedbefore");
    }
  };

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <h1>Login to your account</h1>
        <div className="text-main">
          Please enter your details below to access the online voting system.
        </div>
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="userID">User ID</label>
            <input
              id="userID"
              type="text"
              placeholder ="Enter user ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="login-input"
              autoComplete="username"
            />
            {userIDError && <div className="login-error">{userIDError}</div>}

            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
            <input
              id="password"
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder = "Enter password"
              autoComplete="current-password"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
            {passwordError && <div className="login-error">{passwordError}</div>}

            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;