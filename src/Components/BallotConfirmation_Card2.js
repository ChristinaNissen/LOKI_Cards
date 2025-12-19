import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./BallotConfirmation.css";
import ProcessBar from "./ProcessBar.js"; 
import VoteContext from "../Contexts/VoteContext";
import { saveVisuaRepresentation } from "../API/Voter";


// Static card - generated using the same logic as VisualSelection_Card.js
const staticCard2 = {
  numberOfEmojis: 5,
  emojiRef: "🌸",
  colorRef: "#ffa500", // orange background
  config: {
    columns: 3,
    rows: 3,
    positions: [
      [0, 0], [2, 0], // top corners
      [1, 1],         // center
      [0, 2], [2, 2]  // bottom corners
    ]
  }
};

const BallotConfirmation_Card2 = ({ type = "card", ballotNumber = 12345, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSelectedYes } = useContext(VoteContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Retrieve candidate name from navigation state; fallback if not set.
  const votedCandidate = location.state?.votedCandidate || "Candidate Unknown";

  const now = new Date();
  const dateTime = now.toLocaleString();

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Visual Selection", "Voting", "Confirmation"];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 4 : 3;

  const handleLogout = async () => {
    try {
      // Extract only the needed properties
      const {  colorRef, emojiRef, numberOfEmojis } = staticCard2;
      await saveVisuaRepresentation({ numberOfEmojis, emojiRef, colorRef });
      navigate("/studyinfo2");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const cardLabel = `${staticCard2.colorRef === "#ffa500" ? "Orange" : ""} card with ${staticCard2.numberOfEmojis} ${staticCard2.emojiRef} emoji${staticCard2.numberOfEmojis > 1 ? "s" : ""}`;

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
         <div className="intro-container">
          <h1 className="intro-title">Confirmation</h1>
          <div className="text-main text-main-confirmation">
            You have cast your ballot succesfully! Below is a visual presentation of your cast ballot. 
          </div>
          <div className="security-box">
            <p className="text-small">
              <strong>Security Feature:</strong><br/>
              This part of the voting system ensures that you can vote freely without any outside pressure.        
            </p>
          </div>
        </div>
        <div className="card-wide card-confirmation">
          <h1 className="card-title" style={{ width: "100%", textAlign: "left", margin: "0 0 10px 40px" }}>
            Card 
          </h1>
          <div
    className="instruction-list"
    style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left", paddingLeft: "35px" }}
  >
    <ul>
      <li> 
        You need to <strong>remember</strong> this card if you want to update your vote later in the election.
      </li>
      <li>
        You should <strong>not share</strong> your card with anyone, and you should <strong>not save</strong> it anywhere.
      </li>
    </ul>
  </div>
          <div className="confirmation-visual card-visual">
            {type === "card" && (
              <div
                className="confirmation-card"
                style={{
                  backgroundColor: staticCard2.colorRef,
                  position: "relative"
                }}
              >
                <span className="card-corner card-corner-top-left">
                  {staticCard2.numberOfEmojis}
                </span>
                <span className="card-corner card-corner-bottom-right">
                  {staticCard2.numberOfEmojis}
                </span>
                <div className="emoji-area">
                  <div
                    className="confirmation-emoji-grid"
                    style={{
                      gridTemplateColumns: `repeat(${staticCard2.config.columns}, 1fr)`,
                      gridTemplateRows: `repeat(${staticCard2.config.rows}, 1fr)`
                    }}
                  >
                    {staticCard2.config.positions.map(([x, y], i) => (
                      <span
                        key={i}
                        className="confirmation-emoji"
                        style={{
                          fontSize: "45px",
                          gridColumn: x + 1,
                          gridRow: y + 1,
                          justifySelf: "center"
                        }}
                      >
                        {staticCard2.emojiRef}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="confirmation-info">
              <div className="confirmation-card-label" style={{ textAlign: "center", fontWeight: "bold", marginTop: "10px", fontSize: "1.5rem" }}>
              {cardLabel}
            </div>
              <div className="confirmation-datetime">{dateTime}</div>
              <div className="confirmation-candidate"> {votedCandidate}</div>
            </div>
          </div>
        </div>
         <button className="button logout-button-confirmation" style={{marginTop: "40px"}} onClick={() => setShowLogoutConfirm(true)}>
  Logout
</button>
{showLogoutConfirm && (
  <div className="modal-backdrop-confirmation">
    <div className="modal-confirmation">
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>Are you sure you want to log out?</p>
      <p>
        When you log out, you will not be able to view your card again.<br />
        Make sure you have memorised your card before proceeding.
      </p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "8px" }}>
        <button className="button" onClick={handleLogout}>Yes</button>
        <button className="button" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
      </main>
      <Footer />
    </div>
  );
};

export default BallotConfirmation_Card2;

