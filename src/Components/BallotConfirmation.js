import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Voting-system.css";
import "./BallotConfirmation.css"

const randomWords = ["sheep", "tree", "moon", "star", "river", "cloud"];
const randomEmojis = ["🌟", "🍀", "🔥", "🎈", "🌸", "⚡"];
const randomColors = ["#2E8B57", "#3CB371", "#20B2AA", "#008080", "#66CDAA", "#5F9EA0"];

const BallotConfirmation = ({ type = "card", ballotNumber = 12345 }) => {
  const navigate = useNavigate();
  const now = new Date();
  const dateTime = now.toLocaleString();

  const wordRef = randomWords[Math.floor(Math.random() * randomWords.length)];
  const emojiRef = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
  const colorRef = randomColors[Math.floor(Math.random() * randomColors.length)];

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="welcome-main">
       <h1>Confirmation</h1>
       <div className="confirmation-desc">
          You have cast your ballot succesfully!
				</div>
         <div className="confirmation-desc">
  Below is a visual presentation of your ballot that you have just cast.<br />
  <span>
    This is for your reference only and you need to remember this in the case you want to update your vote.
  </span>
  <br /><br />
  <span>
    <strong>OBS!</strong> For security reasons, you should <u><strong>not</strong></u> share this information with anyone and you should not save this visual presentation anywhere.
  </span>
</div>

        <div className="card" style={{ maxWidth: 600, width: "100%" }}>

          <div className="confirmation-visual">
            {type === "words" && (
              <div className="confirmation-words">
                <span className="confirmation-main">{wordRef}</span>
                <div className="confirmation-date">{dateTime}</div>
              </div>
            )}

            {type === "images" && (
              <div className="confirmation-images">
                <img
                  src={`https://via.placeholder.com/80?text=${wordRef}`}
                  alt="ballot icon"
                  className="confirmation-img"
                />
                <div className="confirmation-date">{dateTime}</div>
              </div>
            )}

            {type === "patterns" && (
              <div
                className="confirmation-pattern"
                style={{
                  background: `repeating-linear-gradient(45deg, #${Math.floor(Math.random() * 16777215).toString(
                    16
                  )}, #${Math.floor(Math.random() * 16777215).toString(16)} 10px)`
                }}
              >
                <span className="confirmation-date">{dateTime}</span>
              </div>
            )}

            {type === "card" && (
              <div
                className="confirmation-card"
                style={{
                  backgroundColor: colorRef
                }}
              >
                <span className="confirmation-main" style={{ fontSize: 32 }}>{emojiRef}</span>
                <div className="confirmation-date">{dateTime}</div>
              </div>
            )}
          </div>

          <button className="button" style={{ marginTop: 40 }} onClick={() => navigate("/studyinfo2")}>
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BallotConfirmation;
