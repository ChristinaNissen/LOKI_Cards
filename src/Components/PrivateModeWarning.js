import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PrivateModeWarning.css";
import Footer from "./Footer";
import "./Voting-system.css";
import video from "../Assets/private1.mp4";

const PrivateModeWarning = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <main className="welcome-main ">
        <h1>Private Browsing Recommended</h1>
        <div className="text-main text-main-private">See below how to enable private browsing mode when using the voting platform.</div>
        <div className="security-box">
          <p className="text-small">
           <strong>Security Feature:</strong><br/>
          For your security and privacy, please use your browser's private (incognito)
          mode when using the voting platform. This ensures that your session is
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
            <div style={{ flex: 1, padding: "20px", backgroundColor: "#f7f7f7", borderRadius: "8px", textAlign: "center" }}>
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
            <div style={{ flex: 1, padding: "20px", backgroundColor: "#f7f7f7", borderRadius: "8px", textAlign: "center" }}>
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
        >
          Login
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default PrivateModeWarning;