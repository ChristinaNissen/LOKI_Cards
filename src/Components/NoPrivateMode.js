import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PrivateModeWarning.css";
import Footer from "./Footer";
import "./Voting-system.css";
import video from "../Assets/private1.mp4";

const NoPrivateMode = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginModal(true);
  };

  const handleConfirmLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <h1>Private Browsing Recommended</h1>
        <div className="text-main text-main-private">See below how to enable private browsing mode when using the voting platform.</div>

        <div className="security-box">
          <p className="text-small">
           <strong>Security Feature:</strong><br/>
          For your security and privacy, please use your browser's private (incognito)
          browsing mode when using the voting platform. This ensures that your session is
          protected and your browsing data is not retained.
          </p>
        </div>
        <div className="card">
          <h2 style={{ width: "100%", textAlign: "left", margin: "0 0 10px 0px" }}>
            How to Enable Private Browsing
          </h2>
          <p className="text-small" style={{textAlign:"left", marginTop:"0px", marginBottom:"10px"}}>
            Below are two simple methods to open a private browsing window in popular web browsers.
          </p>
          
          {/* Improved video layout */}
          <div style={{ marginBottom: "30px", marginTop: "20px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <video
              src={video}
              loop
              muted
              playsInline
              controls
             className= "private-video"
              onTimeUpdate={e => {
                if (e.target.currentTime >= 5) {
                  e.target.currentTime = 0;
                  e.target.play();
                }
              }}
            />
            <p className="text-small" style={{fontStyle: "italic"}}>
              How to enable private browsing using method 1.
            </p>
          </div>

          {/* Two instruction methods */}
          <div style={{ display: "flex", gap: "30px", marginBottom: "20px", flexWrap: "wrap" }}>
            
           

            {/* Method 2: Right-click */}
            <div className="method-box" style={{ flex: 1, padding: "20px", backgroundColor: "#f7f7f7", borderRadius: "8px", textAlign: "center" }}>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "5px", color: "#444" }}>
                Method 1
              </p>
              <p style={{ fontWeight: "600", marginBottom: "15px", fontSize: "1.1rem", color: "#444", marginTop: "0px" }}>
                Right-Click Login Button
              </p>
              <div style={{ textAlign: "left" , fontSize: "1rem", color: "#444"}}>
                <ul style={{ margin: "20px 0 15px 15px", padding: 0 }}>
                  <li>Right-click the <em>"Login"</em> button below</li>
                  <li>Select: <strong>"Open link in incognito window"</strong></li>
                </ul>
                <p>
                  <em>Note: This feature may not be available in all browsers.</em>
                </p>
              </div>
            </div>

             {/* Method 1: Keyboard shortcuts */}
            <div className="method-box" style={{ flex: 1, padding: "20px", backgroundColor: "#f7f7f7", borderRadius: "8px", textAlign: "center" }}>
              <p style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "5px", color: "#444" }}>
                Method 2
              </p>
              <p style={{ fontWeight: "600", fontSize: "1.1rem", color: "#444", marginTop: "0px", marginBottom: "15px" }}>
                Use Keyboard Shortcuts
              </p>
              <div style={{ textAlign: "left", fontSize: "1rem", color: "#444" }}>
                <ul style={{ margin: "20px 0 15px 15px", padding: 0 }}>
                  <li><strong>Chrome:</strong> Cmd+Shift+N (Mac) / Ctrl+Shift+N (Windows)</li>
                  <li><strong>Safari:</strong> Cmd+Shift+N (Mac only)</li>
                  <li><strong>Firefox:</strong> Cmd+Shift+P (Mac) / Ctrl+Shift+P (Windows)</li>
                </ul>
                <p>
                  Then navigate to: <strong>localhost:3000/login</strong>
                </p>
              </div>
            </div>
            
          </div>
        </div>
        
        <a
          href="/login"
          className="button private-next-button"
         
          onClick={handleLoginClick}
          onContextMenu={e => e.preventDefault()}
        >
          Login
        </a>
        {showLoginModal && (
          <div className="study-modal-backdrop">
            <div className="study-modal">
              <h2>Before You Continue</h2>
              <p>
                For the purposes of this study, please do not use private browsing or open the login in a new window or tab.<br /><br />
                To ensure your interaction is properly registered, simply click the <span className="blue-bg-highlight">Login</span> button below to proceed.
              </p>
              <div className="study-modal-actions">
                <button style={{ fontWeight: "bold" }} className="study-button" onClick={handleConfirmLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NoPrivateMode;