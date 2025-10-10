import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Login.css";
import "./Voting-system.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [userIDError, setUserIDError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  



  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!userID.trim()) {
      setUserIDError("Please enter your user ID.");
      hasError = true;
    } else {
      setUserIDError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!hasError) {
      navigate("/votedbefore");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="welcome-main">
        <h1>Login</h1>
        <div className="welcome-desc">
XXXXXX				</div>
        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="userID">User ID</label>
            <input
              id="userID"
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="login-input"
              autoComplete="username"
            />
            {userIDError && <div className="login-error">{userIDError}</div>}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              autoComplete="current-password"
            />
            {passwordError && <div className="login-error">{passwordError}</div>}

            <button type="submit" className="welcome-login-btn">
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