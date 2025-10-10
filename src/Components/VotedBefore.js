import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Voting-system.css";
import Footer from "./Footer";


const VotedBefore = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/selection");
  };

  const handleNo = () => {
    navigate("/voting");
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="welcome-main">
        <h1>Welcome!</h1>
        <p className="votedbefore-desc">
          You have successfully logged in. Please proceed with your voting process below.
        </p>
        <div className="card">
          <p className="votedbefore-question">
            Have you voted in this specific election before?
          </p>
          <div className="card-actions">
            <button
              onClick={handleYes}
              className="button"
              type="button"
            >
              Yes
            </button>
            <button
              onClick={handleNo}
              className="button"
              type="button"
            >
              No
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VotedBefore;

