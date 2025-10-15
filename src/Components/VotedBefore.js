import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import VoteContext from "../Contexts/VoteContext";
import ProcessBar from "./ProcessBar";
import Footer from "./Footer";
import "./Voting-system.css";
import "./VotedBefore.css";

const VotedBefore = () => {
  const navigate = useNavigate();
  const { setUserSelectedYes } = useContext(VoteContext);
  const [selected, setSelected] = useState(null); // null means none selected yet
  const [showError, setShowError] = useState(false);

  const handleSelect = (value) => {
    if (selected === value) {
      setSelected(null); // unselect if clicked again
    } else {
      setSelected(value);
    }
  };

  const handleNext = () => {
     if (selected === null) {
      setShowError(true);
      return;
    }
    if (selected === true) {
      setUserSelectedYes(true);
      navigate("/selection");
    } else if (selected === false) {
      setUserSelectedYes(false);
      navigate("/voting");
    }
  };

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = ["Voted Before", "Identification of Previous Ballots", "Voting", "Confirmation"];

  return (
    <div className="page-wrapper">
      <main className="welcome-main" style={{ marginTop: "70px" }}>
        <ProcessBar steps={selected ? stepsYes : stepsNo} currentStep={1} />
        <h1 style={{ marginTop: "70px" }}>Have you voted in this election before?</h1>
        <p className="text-main" style={{ marginBottom: "1px" }}>
          Please select below whether you have voted in this election before or not.
        </p>
        <div className="card-wide" style={{ padding: "40px 20px" }}>
          <div className="box-container">
            <div
              className={`yellow-box ${selected === false ? "selected" : ""}`}
              onClick={() => handleSelect(false)}
            >
              <p className="text-small">
                <strong>No</strong>
                <br />
                This is my first time voting in this election
              </p>
            </div>

             <div
              className={`yellow-box ${selected === true ? "selected" : ""}`}
              onClick={() => handleSelect(true)}
            >
              <p className="text-small">
                <strong>Yes</strong>
                <br />
                I have voted before in this election
              </p>
            </div>
          </div>
        </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <button className="button" onClick={handleNext}>
            Next
          </button>
           </div>



        {showError && (
          <div className="error-overlay">
            <div className="error-message">
              <p>Please select an option before clicking Next.</p>
              <button className="button" onClick={() => setShowError(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VotedBefore;

